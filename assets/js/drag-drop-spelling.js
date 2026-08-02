(function(){
  function getQueryParam(name){
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function getCategory(){
    const key = getQueryParam('category') || 'domesticAnimals';
    const categories = window.MAContent && MAContent.categories;
    return (categories && categories[key]) || (categories && categories.domesticAnimals) || { title: 'Domestic Animals', items: [] };
  }

  const category = getCategory();
  const words = category.items.slice();
  let idx = 0;
  let currentWord = words[idx];
  let dragSource = null;
  let messageTimeout = null;
  let wordSolved = false;  let completionShown = false;  const solved = new Array(words.length).fill(false);
  const $message = document.getElementById('message');

  const $image = document.getElementById('image');
  const $caption = document.getElementById('caption');
  const $progress = document.getElementById('progress');
  const $slots = document.getElementById('slots');
  const $letterBank = document.getElementById('letterBank');
  const $clearBtn = document.getElementById('clearBtn');
  const $checkBtn = document.getElementById('checkBtn');
  const $message = document.getElementById('message');

  function speak(text){
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function shouldShowLabel(){
    if (window.MASettings && MASettings.getShowLabels) return MASettings.getShowLabels();
    return true;
  }

  function playImageNameOnOpen(){
    if (window.MASettings && MASettings.getPlayImageName) return MASettings.getPlayImageName();
    return false;
  }

  function clearMessage(){
    if (!$message) return;
    if (messageTimeout) clearTimeout(messageTimeout);
    $message.innerHTML = '';
    $message.classList.remove('visible');
    messageTimeout = null;
  }

  function showMessage(text, color, options = {}){
    if (!$message) return;
    clearMessage();
    const messageText = document.createElement('span');
    messageText.className = 'message-text';
    messageText.textContent = text;
    if (color) messageText.style.color = color;
    $message.appendChild(messageText);

    if (options.buttons && options.buttons.length) {
      const actionContainer = document.createElement('div');
      actionContainer.className = 'modal-actions';
      options.buttons.forEach(btn => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = btn.label;
        if (btn.secondary) button.classList.add('secondary');
        button.addEventListener('click', () => {
          if (btn.onClick) btn.onClick();
        });
        actionContainer.appendChild(button);
      });
      $message.appendChild(actionContainer);
    }

    $message.classList.add('visible');
    if (!options.buttons || !options.buttons.length) {
      messageTimeout = setTimeout(clearMessage, options.timeout || 2200);
    }
  }

  function showCompletionModal(){
    showMessage('Task completed! Great job.', '#111', {
      timeout: 0,
      buttons: [
        { label: 'Repeat', secondary: true, onClick: () => {
          clearMessage();
          solved.fill(false);
          wordSolved = false;
          idx = 0;
          buildBoard();
        }},
        { label: 'Dashboard', onClick: () => { window.location.href = '../index.html'; }}
      ]
    });
  }

  function createProgressUI(){
    if (!$progress) return;
    $progress.innerHTML = '';
    words.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.index = i;
      btn.textContent = i + 1;
      btn.addEventListener('click', () => {
        idx = i;
        buildBoard();
      });
      $progress.appendChild(btn);
    });
  }

  function updateProgressUI(){
    if (!$progress) return;
    Array.from($progress.children).forEach((el, i) => {
      const isCurrent = i === idx;
      const isDone = solved[i] && !isCurrent;
      el.classList.toggle('current', isCurrent);
      el.classList.toggle('done', isDone);
      el.classList.toggle('pending', !isCurrent && !isDone);
      el.setAttribute('aria-current', isCurrent ? 'true' : 'false');
    });
  }

  function shuffle(array){
    for(let i=array.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [array[i],array[j]]=[array[j],array[i]];
    }
  }

  function createSlot(index){
    const slot = document.createElement('div');
    slot.className = 'drop-slot';
    slot.dataset.index = index;
    slot.setAttribute('aria-label', `Slot ${index + 1}`);
    slot.addEventListener('dragover', e=>{ e.preventDefault(); slot.classList.add('over'); });
    slot.addEventListener('dragleave', ()=>slot.classList.remove('over'));
    slot.addEventListener('drop', onDrop);
    slot.addEventListener('click', ()=>{
      if(slot.firstChild) {
        slot.firstChild.classList.remove('used');
        clearSlotState(slot);
        $letterBank.appendChild(slot.firstChild);
      }
    });
    return slot;
  }

  function createLetter(char){
    const letter = document.createElement('button');
    letter.className = 'letter-card';
    letter.type = 'button';
    letter.textContent = char;
    letter.draggable = true;
    letter.addEventListener('dragstart', e => {
      dragSource = letter;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', char);
    });
    letter.addEventListener('click', () => {
      if (letter.parentElement !== $letterBank) return;
      const emptySlot = Array.from($slots.children).find(slot => !slot.firstChild);
      if (!emptySlot) return;
      emptySlot.appendChild(letter);
      letter.classList.add('used');
      updateSlotState(emptySlot);
    });
    letter.addEventListener('keydown', e => {
      if (wordSolved) return;
      if (letter.parentElement !== $letterBank) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const emptySlot = Array.from($slots.children).find(slot => !slot.firstChild);
        if (emptySlot) {
          emptySlot.appendChild(letter);
          letter.classList.add('used');
          updateSlotState(emptySlot);
        }
      }
    });
    return letter;
  }

  function onDrop(e){
    if (wordSolved) return;
    e.preventDefault();
    const slot = e.currentTarget;
    slot.classList.remove('over');
    if (!dragSource) return;
    if (slot.firstChild) {
      const existing = slot.firstChild;
      existing.classList.remove('used');
      clearSlotState(slot);
      $letterBank.appendChild(existing);
    }
    slot.appendChild(dragSource);
    dragSource.classList.add('used');
    dragSource = null;
    updateSlotState(slot);
  }

  function updateSlotState(slot){
    slot.classList.remove('correct', 'wrong');
    const child = slot.firstChild;
    if (!child) return;
    const index = Number(slot.dataset.index);
    const expected = currentWord.name.toUpperCase()[index];
    if (child.textContent === expected) {
      slot.classList.add('correct');
    } else {
      slot.classList.add('wrong');
    }
    validateCompletion();
  }

  function validateCompletion(){
    if (wordSolved) return;
    const slots = Array.from($slots.children);
    if (slots.some(slot => !slot.firstChild)) return;
    const allCorrect = slots.every(slot => slot.classList.contains('correct'));
    if (allCorrect) {
      handleCorrectWord();
    }
  }

  function handleCorrectWord(){
    wordSolved = true;
    solved[idx] = true;
    updateProgressUI();
    if (solved.every(Boolean)) {
      showCompletionModal();
    } else {
      showMessage('Well done', 'green');
      speak('Well done');
      setTimeout(() => {
        idx = (idx + 1) % words.length;
        buildBoard();
      }, 1000);
    }
  }

  function clearSlotState(slot){
    slot.classList.remove('correct', 'wrong');
  }

  function buildBoard(){
    wordSolved = false;
    currentWord = words[idx];
    if ($image) { $image.src = currentWord.src; $image.alt = currentWord.name; }
    if ($caption) {
      $caption.textContent = currentWord.name;
      $caption.style.display = shouldShowLabel() ? 'block' : 'none';
    }
    clearMessage();
    updateProgressUI();

    $slots.innerHTML = '';
    $letterBank.innerHTML = '';

    const letters = Array.from(currentWord.name.toUpperCase());
    const extras = ['O','P','X','I','B','G','R','L','N'].filter(ch => !letters.includes(ch));
    shuffle(extras);
    const choices = letters.concat(extras.slice(0, Math.max(3, letters.length))).slice(0, 10);
    shuffle(choices);

    letters.forEach((_, index) => $slots.appendChild(createSlot(index)));
    choices.forEach(char => $letterBank.appendChild(createLetter(char)));

    if (playImageNameOnOpen()) {
      speak(currentWord.name);
    }
  }

  function collectAnswer(){
    return Array.from($slots.children).map(slot => slot.firstChild ? slot.firstChild.textContent : '').join('');
  }

  function checkAnswer(){
    const guess = collectAnswer();
    if (guess.length !== currentWord.name.length) {
      showMessage('Fill all the boxes first', 'orange');
      return;
    }
    if (guess === currentWord.name.toUpperCase()) {
      solved[idx] = true;
      updateProgressUI();
      if (solved.every(Boolean)) {
        showCompletionModal();
      } else {
        showMessage('Well done', 'green');
        speak('Well done');
        setTimeout(()=>{
          idx = (idx + 1) % words.length;
          buildBoard();
        }, 1400);
      }
    } else {
      showMessage('Wrong answer, try again', 'red');
      speak('Wrong answer, try again');
      setTimeout(()=>{
        clearMessage();
        $slots.querySelectorAll('.drop-slot').forEach(slot => {
          if (slot.firstChild) $letterBank.appendChild(slot.firstChild);
        });
      }, 1400);
    }
  }

  function clearBoard(){
    $slots.querySelectorAll('.drop-slot').forEach(slot => {
      if (slot.firstChild) {
        slot.firstChild.classList.remove('used');
        clearSlotState(slot);
        $letterBank.appendChild(slot.firstChild);
      }
    });
    clearMessage();
  }

  if ($clearBtn) $clearBtn.addEventListener('click', clearBoard);
  if ($checkBtn) $checkBtn.addEventListener('click', checkAnswer);

  const $help = document.getElementById('helpBtn');
  if ($help) {
    $help.addEventListener('click', () => {
      showMessage(currentWord.name, '#333');
      speak(currentWord.name);
    });
  }

  createProgressUI();
  buildBoard();
})();
