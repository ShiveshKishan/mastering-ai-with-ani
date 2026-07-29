/* domestic.js
   Handles deck, shuffle, modes: flashcard/audio/quiz/spelling
*/
(function(){
  const animals = [
    {name:'Cat', emoji:'🐱'},
    {name:'Dog', emoji:'🐶'},
    {name:'Cow', emoji:'🐮'},
    {name:'Sheep', emoji:'🐑'},
    {name:'Pig', emoji:'🐷'},
    {name:'Horse', emoji:'🐴'}
  ];

  let deck = animals.slice();
  let idx = 0;

  const $image = document.getElementById('image');
  const $caption = document.getElementById('caption');
  const $mode = document.getElementById('modeSelect');
  const $shuffle = document.getElementById('shuffleBtn');
  const $prev = document.getElementById('prevBtn');
  const $next = document.getElementById('nextBtn');
  const $speak = document.getElementById('speakBtn');
  const $quiz = document.getElementById('quizArea');
  const $spellingArea = document.getElementById('spellingArea');
  const $spellingInput = document.getElementById('spellingInput');
  const $checkSpelling = document.getElementById('checkSpellingBtn');
  const $spellingResult = document.getElementById('spellingResult');

  function fisherYates(a){
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];
    }
  }

  function render(){
    const card = deck[idx];
    $image.textContent = card.emoji;
    $caption.textContent = card.name;
    updateModeVisibility(getMode());
  }

  function prev(){ idx = (idx-1+deck.length)%deck.length; render(); }
  function next(){ idx = (idx+1)%deck.length; render(); }

  function getMode(){
    if(window.MASettings && MASettings.getMode) return MASettings.getMode();
    return $mode.value;
  }

  function setMode(m){
    $mode.value = m;
    if(window.MASettings && MASettings.setMode) MASettings.setMode(m);
    updateModeVisibility(m);
  }

  function updateModeVisibility(m){
    $quiz.classList.add('hidden');
    $spellingArea.classList.add('hidden');
    $caption.style.visibility = (m==='flashcard' || m==='quiz' || m==='spelling')? 'visible':'hidden';
    if(m==='audio') speakCurrent();
    if(m==='quiz') buildQuiz();
    if(m==='spelling') { $spellingArea.classList.remove('hidden'); }
  }

  function speak(text){
    if(!window.speechSynthesis) return;
    const u=new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function speakCurrent(){ speak(deck[idx].name); }

  function buildQuiz(){
    $quiz.innerHTML='';
    $quiz.classList.remove('hidden');
    const correct = deck[idx];
    const choices = [correct.name];
    const pool = animals.filter(a=>a.name!==correct.name).map(a=>a.name);
    fisherYates(pool);
    while(choices.length<4 && pool.length) choices.push(pool.shift());
    fisherYates(choices);
    choices.forEach(choice=>{
      const btn = document.createElement('button');
      btn.className='option'; btn.textContent = choice;
      btn.addEventListener('click', ()=>{
        if(choice===correct.name){ btn.classList.add('correct'); } else { btn.classList.add('wrong'); }
      });
      $quiz.appendChild(btn);
    });
  }

  function checkSpelling(){
    const answer = deck[idx].name.toLowerCase().trim();
    const guess = $spellingInput.value.toLowerCase().trim();
    if(!guess) return;
    if(guess===answer){ $spellingResult.textContent='Correct ✓'; $spellingResult.style.color='green'; }
    else{ $spellingResult.textContent='Try again'; $spellingResult.style.color='red'; }
  }

  // Event bindings
  $prev.addEventListener('click', prev);
  $next.addEventListener('click', next);
  $shuffle.addEventListener('click', ()=>{ fisherYates(deck); idx=0; render(); });
  $speak.addEventListener('click', ()=>speakCurrent());
  $mode.addEventListener('change', (e)=> setMode(e.target.value));
  $checkSpelling.addEventListener('click', checkSpelling);
  $spellingInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') checkSpelling(); });

  // keyboard navigation
  document.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight') next();
    if(e.key==='ArrowLeft') prev();
    if(e.key===' ') { e.preventDefault(); speakCurrent(); }
  });

  // init
  (function init(){
    deck = animals.slice();
    fisherYates(deck);
    // sync mode from settings
    try{ const m = (window.MASettings && MASettings.getMode && MASettings.getMode()) || 'flashcard'; $mode.value=m;}catch(e){}
    render();
  })();

})();
