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
  let visited = new Array(items.length).fill(false);
  let completionShown = false;

  const $card = document.getElementById('card');
  const $image = document.getElementById('image');
  const $caption = document.getElementById('caption');
  const $progress = document.getElementById('progress');
  const $message = document.getElementById('message');
  let messageTimeout = null;

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
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
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
          visited.fill(false);
          completionShown = false;
          idx = 0;
          render();
        }},
        { label: 'Dashboard', onClick: () => { window.location.href = '../index.html'; }}
      ]
    });
  }

  function render(){
    const item = items[idx];
    if (!$image || !$caption || !$progress) return;
    $image.src = item.src;
    $image.alt = item.name;
    $caption.textContent = item.name;
    $caption.style.display = shouldShowLabel() ? 'block' : 'none';
    markVisited(idx);
    updateProgressUI();
    if (!completionShown && visited.every(Boolean)) {
      completionShown = true;
      showCompletionModal();
    }
    if (playImagesOnOpen()) speak(item.name);
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

  function markVisited(index){ visited[index] = true; }

  function updateProgressUI(){
    if (!$progress) return;
    Array.from($progress.children).forEach((el, i) => {
      const isDone = visited[i] && i !== idx;
      const isCurrent = i === idx;
      el.classList.toggle('current', isCurrent);
      el.classList.toggle('done', isDone);
      el.classList.toggle('pending', !isDone && !isCurrent);
      el.setAttribute('aria-current', isCurrent ? 'true' : 'false');
    });
  }

  function prev(){
    idx = (idx - 1 + items.length) % items.length;
    render();
  }

  function next(){
    idx = (idx + 1) % items.length;
    render();
  }

  function speakCurrent(){
    speak(items[idx].name);
  }

  if ($image) {
    $image.addEventListener('click', speakCurrent);
    $image.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        speakCurrent();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === ' ') {
      e.preventDefault();
      speakCurrent();
    }
  });

  createProgressUI();
  render();
})();
