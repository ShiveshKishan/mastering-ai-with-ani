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
  let messageTimeout = null;
  const solved = new Array(items.length).fill(false);
  const $image = document.getElementById('image');
  const $message = document.getElementById('message');
  const $caption = document.getElementById('caption');
  const $progress = document.getElementById('progress');
  const $spellingInput = document.getElementById('spellingInput');
  const $checkSpelling = document.getElementById('checkSpellingBtn');
  const $spellingResult = document.getElementById('spellingResult');

  function speak(text){
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function clearMessage(){
    if (!$message) return;
    if (messageTimeout) {
      clearTimeout(messageTimeout);
      messageTimeout = null;
    }
    $message.innerHTML = '';
    $message.classList.remove('visible');
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

  function shouldShowLabel(){
    if (window.MASettings && MASettings.getShowLabels) return MASettings.getShowLabels();
    return true;
  }

  function playImagesOnOpen(){
    if (window.MASettings && MASettings.getPlayImageName) return MASettings.getPlayImageName();
    return false;
  }

  function render(){
    const item = items[idx];
    if (!$image || !$caption || !$progress) return;
    $image.src = item.src;
    $image.alt = item.name;
    $caption.textContent = item.name;
    $caption.style.display = shouldShowLabel() ? 'block' : 'none';
    $spellingInput.value = '';
    clearMessage();
    updateProgressUI();
    if (playImagesOnOpen()) speak(item.name);
    if ($spellingInput) $spellingInput.focus();
  }

  function createProgressUI(){
    if (!$progress) return;
    $progress.innerHTML = '';
    items.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.index = i;
      btn.textContent = i + 1;
      btn.addEventListener('click', () => {
        idx = i;
        render();
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

  function playSuccess(){ speak('Well done'); }
  function playFailure(){ speak('Wrong answer, try again'); }

  function checkSpelling(){
    if (!$spellingInput) return;
    const answer = items[idx].name.toLowerCase().trim();
    const guess = $spellingInput.value.toLowerCase().trim();
    if (!guess) return;
    if (guess === answer) {
      solved[idx] = true;
      playSuccess();
      if (solved.every(Boolean)) {
        showCompletionModal();
      } else {
        showMessage('Well done', 'green');
        setTimeout(() => {
          idx = (idx + 1) % items.length;
          render();
        }, 1400);
      }
    } else {
      showMessage('Wrong answer, try again', 'red');
      playFailure();
      $spellingInput.value = '';
      $spellingInput.focus();
    }
  }

  if ($checkSpelling) $checkSpelling.addEventListener('click', checkSpelling);
  if ($spellingInput) $spellingInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkSpelling(); });

  if ($image) {
    $image.addEventListener('click', () => speak(items[idx].name));
    $image.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); speak(items[idx].name); } });
  }

  const $help = document.getElementById('helpBtn');
  if ($help) {
    $help.addEventListener('click', () => {
      const item = items[idx];
      showMessage(item.name, '#333');
      speak(item.name);
    });
  }

  createProgressUI();
  render();
})();
