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
  const items = category.items.slice();
  let idx = 0;
  let currentSolved = false;
  const solved = new Array(items.length).fill(false);
  let completionShown = false;
  const $message = document.getElementById('message');
  let messageTimeout = null;

  const $card = document.getElementById('card');
  const $image = document.getElementById('image');
  const $caption = document.getElementById('caption');
  const $progress = document.getElementById('progress');
  const $quiz = document.getElementById('quizArea');

  function shouldShowLabel(){
    if (window.MASettings && MASettings.getShowLabels) return MASettings.getShowLabels();
    return true;
  }
  function playImagesOnOpen(){
    if (window.MASettings && MASettings.getPlayImageName) return MASettings.getPlayImageName();
    return false;
  }
  function speak(text){
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
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
    completionShown = true;
    showMessage('Task completed! Great job.', '#111', {
      timeout: 0,
      buttons: [
        { label: 'Repeat', secondary: true, onClick: () => {
          clearMessage();
          solved.fill(false);
          completionShown = false;
          idx = 0;
          render();
        }},
        { label: 'Dashboard', onClick: () => { window.location.href = '../index.html'; }}
      ]
    });
  }

  function playSuccess(){ speak('Well done'); }
  function playFailure(){ speak('Wrong, try again'); }

  function render(){
    const item = items[idx];
    if (!$image || !$caption || !$progress || !$quiz) return;
    $image.src = item.src;
    $image.alt = item.name;
    $caption.textContent = item.name;
    $caption.style.display = shouldShowLabel() ? 'block' : 'none';
    currentSolved = false;
    updateProgressUI();
    buildQuiz();
    if (playImagesOnOpen()) speak(item.name);
    if (solved.every(Boolean) && !completionShown) {
      showCompletionModal();
    }
  }

  function createProgressUI(){
    if (!$progress) return;
    $progress.innerHTML = '';
    items.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.index = i;
      btn.textContent = i + 1;
      btn.addEventListener('click', () => { idx = i; render(); });
      $progress.appendChild(btn);
    });
  }

  function updateProgressUI(){
    if (!$progress) return;
    Array.from($progress.children).forEach((el, i)=>{
      const isCurrent = i === idx;
      const isDone = solved[i] && !isCurrent;
      el.classList.toggle('current', isCurrent);
      el.classList.toggle('done', isDone);
      el.classList.toggle('pending', !isCurrent && !isDone);
      el.setAttribute('aria-current', isCurrent ? 'true' : 'false');
    });
  }

  function getChoices(correct){
    const pool = items.filter(item => item.name !== correct.name).map(item => item.name);
    function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} }
    shuffle(pool);
    const choices = [correct.name];
    while (choices.length < 4 && pool.length) choices.push(pool.shift());
    shuffle(choices);
    return choices;
  }

  function buildQuiz(){
    if (!$quiz) return;
    $quiz.innerHTML = '';
    const correct = items[idx];
    const choices = getChoices(correct);
    currentSolved = false;
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.type = 'button';
      btn.textContent = choice;
      btn.addEventListener('click', () => {
        if (currentSolved) return;
        Array.from($quiz.querySelectorAll('button.option')).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        if (choice === correct.name) {
          currentSolved = true;
          solved[idx] = true;
          btn.classList.remove('selected');
          btn.classList.add('correct');
          playSuccess();
          Array.from($quiz.querySelectorAll('button.option')).forEach(b => b.setAttribute('disabled', ''));
          updateProgressUI();
          if (solved.every(Boolean)) {
            setTimeout(showCompletionModal, 400);
          } else {
            setTimeout(() => next(), 1400);
          }
        } else {
          btn.classList.remove('selected');
          btn.classList.add('wrong');
          btn.setAttribute('disabled', '');
          playFailure();
          showMessage('Wrong answer, try again', 'red');
        }
      });
      $quiz.appendChild(btn);
    });
  }

  function next(){
    if (!currentSolved) return;
    idx = (idx + 1) % items.length;
    render();
  }
  function prev(){ idx = (idx - 1 + items.length) % items.length; render(); }

  function speakCurrent(){ speak(items[idx].name); }

  if ($image) {
    $image.addEventListener('click', speakCurrent);
    $image.addEventListener('keydown', (e)=>{ if (e.key==='Enter'||e.key===' '){ e.preventDefault(); speakCurrent(); }});
  }
  document.addEventListener('keydown', (e)=>{
    if (e.key==='ArrowRight') next();
    if (e.key==='ArrowLeft') prev();
    if (e.key===' ') { e.preventDefault(); speakCurrent(); }
  });

  createProgressUI();
  render();
})();
