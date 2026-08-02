/* domestic.js
   Handles deck, shuffle, modes: flashcard/audio/quiz/spelling
*/
 (function () {
  const img_location = '../assets/img/domestic-animals/';

  const animals = [
    { name: 'Cat', src: img_location + 'cat.svg' },
    { name: 'Dog', src: img_location + 'dog.svg' },
    { name: 'Cow', src: img_location + 'cow.svg' },
    { name: 'Sheep', src: img_location + 'sheep.svg' },
    { name: 'Pig', src: img_location + 'pig.svg' },
    { name: 'Horse', src: img_location + 'horse.svg' }
  ];

  let deck = animals.slice();
  let idx = 0;
  let visited = new Array(animals.length).fill(false);
  let currentQuestionSolved = false;
  let spellingMessageTimeout = null;

  const $card = document.getElementById('card');
  const $image = document.getElementById('image');
  const $caption = document.getElementById('caption');
  const $prev = document.getElementById('prevBtn');
  const $next = document.getElementById('nextBtn');
  const $quiz = document.getElementById('quizArea');
  const $spellingArea = document.getElementById('spellingArea');
  const $spellingInput = document.getElementById('spellingInput');
  const $checkSpelling = document.getElementById('checkSpellingBtn');
  const $spellingResult = document.getElementById('spellingResult');

  function fisherYates(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  function render() {
    const card = deck[idx];
    const mode = getMode();
    currentQuestionSolved = (mode !== 'quiz' && mode !== 'spelling');
    if ($image) {
      $image.src = card.src;
      $image.alt = card.name;
    }
    if ($caption) $caption.textContent = card.name;
    if ($card) {
      $card.classList.add('current');
    }
    if (mode === 'flashcard') markVisited(idx);
    updateProgressUI();
    updateModeVisibility(mode);
    updateNavigationState();
    clearSpellingMessage();
    if (mode === 'spelling' && $spellingInput) {
      $spellingInput.focus();
    }
    // If global setting requests playing image names on open, do that now
    try{
      const play = (window.MASettings && MASettings.getPlayImageName && MASettings.getPlayImageName());
      if(play){ speakCurrent(); }
    }catch(e){}
  }

  function createProgressUI(){
    const container = document.getElementById('progress');
    if(!container) return;
    container.innerHTML = '';
    animals.forEach((a,i)=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.index = i;
      btn.textContent = (i+1);
      btn.addEventListener('click', ()=>{ idx = i; render(); });
      container.appendChild(btn);
    });
  }

  function markVisited(i){ visited[i]=true; }

  function updateProgressUI(){
    const container = document.getElementById('progress');
    if(!container) return;
    const mode = getMode();
    const lockProgress = (mode === 'quiz' || mode === 'spelling') && !currentQuestionSolved;
    Array.from(container.children).forEach((el, i)=>{
      const isDone = !!visited[i];
      const isCurrent = i===idx;
      el.classList.toggle('current', isCurrent);
      el.classList.toggle('done', isDone && !isCurrent);
      el.classList.toggle('pending', !isDone && !isCurrent);
      el.setAttribute('aria-current', isCurrent ? 'true' : 'false');
      el.disabled = lockProgress && !isCurrent;
    });
  }

  function allVisited(){ return visited.every(Boolean); }

  function canAdvance(){
    const mode = getMode();
    if (mode === 'quiz' || mode === 'spelling') return currentQuestionSolved;
    return true;
  }

  function updateNavigationState(){
    if (!$next) return;
    const mode = getMode();
    $next.disabled = (mode === 'quiz' || mode === 'spelling') && !currentQuestionSolved;
  }

  

  function prev() {
    idx = (idx - 1 + deck.length) % deck.length;
    render();
  }

  function next() {
    if (!canAdvance()) return;
    idx = (idx + 1) % deck.length;
    render();
  }

  function getMode() {
    if (window.MASettings && MASettings.getMode) return MASettings.getMode();
    return 'flashcard';
  }

  function shouldShowLabel() {
    if (window.MASettings && MASettings.getShowLabels) return MASettings.getShowLabels();
    return true;
  }

  function updateModeVisibility(m) {
    if ($quiz) $quiz.classList.add('hidden');
    if ($spellingArea) $spellingArea.classList.add('hidden');
    const labelVisible = (m === 'flashcard' || m === 'quiz' || m === 'spelling') && shouldShowLabel();
    if ($caption) $caption.style.display = labelVisible ? 'block' : 'none';
    if (m === 'quiz') buildQuiz();
    if (m === 'spelling' && $spellingArea) $spellingArea.classList.remove('hidden');
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function playSuccess(){
    if(!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance('Well done');
    u.rate = 1.0; u.pitch = 1.1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function playFailure(){
    if(!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance('Wrong, try again');
    u.rate = 0.95;
    u.pitch = 0.85;
    window.speechSynthesis.speak(u);
  }

  function clearSpellingMessage() {
    if (!$spellingResult) return;
    if (spellingMessageTimeout) {
      clearTimeout(spellingMessageTimeout);
      spellingMessageTimeout = null;
    }
    $spellingResult.textContent = '';
  }

  function speakCurrent() {
    speak(deck[idx].name);
  }

  function buildQuiz() {
    if (!$quiz) return;
    $quiz.innerHTML = '';
    $quiz.classList.remove('hidden');
    const correct = deck[idx];
    const choices = [correct.name];
    const pool = animals.filter(a => a.name !== correct.name).map(a => a.name);
    fisherYates(pool);
    while (choices.length < 4 && pool.length) choices.push(pool.shift());
    fisherYates(choices);
    let answeredCorrect = false;
    currentQuestionSolved = false;
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = choice;
      btn.addEventListener('click', () => {
        if (currentQuestionSolved) return;

        // clear any temporary selection highlight from other buttons
        Array.from($quiz.querySelectorAll('button.option')).forEach(b => {
          b.classList.remove('selected');
        });

        // mark this button as selected for immediate feedback
        btn.classList.add('selected');

        if (choice === correct.name) {
          // correct path
          Array.from($quiz.querySelectorAll('button.option')).forEach(b => b.classList.remove('wrong'));
          btn.classList.remove('selected');
          btn.classList.add('correct');
          playSuccess();
          currentQuestionSolved = true;
          markVisited(idx);
          updateProgressUI();
          updateNavigationState();
          Array.from($quiz.querySelectorAll('button.option')).forEach(b => b.setAttribute('disabled', ''));
          setTimeout(()=>{ next(); }, 1500);
        } else {
          btn.classList.remove('selected');
          btn.classList.add('wrong');
          btn.setAttribute('disabled', '');
          playFailure();
        }
      });
      $quiz.appendChild(btn);
    });
  }

  function checkSpelling() {
    if (!$spellingInput || !$spellingResult) return;
    const answer = deck[idx].name.toLowerCase().trim();
    const guess = $spellingInput.value.toLowerCase().trim();
    if (!guess) return;
    if (guess === answer) {
      $spellingResult.textContent = 'Well done';
      $spellingResult.style.color = 'green';
      playSuccess();
      currentQuestionSolved = true;
      markVisited(idx);
      updateProgressUI();
      updateNavigationState();
      $spellingInput.value = '';
      spellingMessageTimeout = setTimeout(clearSpellingMessage, 1200);
      setTimeout(()=>{ next(); }, 1500);
    } else {
      $spellingResult.textContent = 'Wrong answer, try again';
      $spellingResult.style.color = 'red';
      playFailure();
      $spellingInput.value = '';
      $spellingInput.focus();
      spellingMessageTimeout = setTimeout(clearSpellingMessage, 2000);
    }
  }

  // Event bindings
  if ($prev) $prev.addEventListener('click', prev);
  if ($next) $next.addEventListener('click', next);
  if ($checkSpelling) $checkSpelling.addEventListener('click', checkSpelling);
  if ($spellingInput) $spellingInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkSpelling(); });

  // image click/keyboard speaks the current item
  if ($image) {
    $image.addEventListener('click', () => speakCurrent());
    $image.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); speakCurrent(); } });
  }

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === ' ') { e.preventDefault(); speakCurrent(); }
  });

  // init
  (function init() {
    deck = animals.slice();
    fisherYates(deck);
    createProgressUI();
    render();
  })();
})();
