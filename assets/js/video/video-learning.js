(function(window, document){
  'use strict';

  const SESSION_SIZE = 10;
  const DEFAULT_PAUSE_SECONDS = 3;
  let player = null;
  let currentLesson = null;
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let selectedLessons = [];
  let lessonIndex = 0;
  let questionLocked = false;
  let pauseTimer = null;
  let playerInitialized = false;

  const elements = {
    shell: document.getElementById('videoShell'),
    videoError: document.getElementById('videoError'),
    videoFrame: document.getElementById('videoFrame'),
    videoStatus: document.getElementById('videoStatus'),
    lessonProgress: document.getElementById('lessonProgress'),
    categoryTitle: document.getElementById('categoryTitle'),
    replay: document.getElementById('replayButton'),
    questionPanel: document.getElementById('questionPanel'),
    questionProgress: document.getElementById('questionProgress'),
    questionText: document.getElementById('questionText'),
    answerList: document.getElementById('answerList'),
    feedback: document.getElementById('feedback'),
    completionPanel: document.getElementById('completionPanel'),
    completionText: document.getElementById('completionText'),
    repeat: document.getElementById('repeatButton')
  };

  function shuffle(items){
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }
    return copy;
  }

  function getPauseSeconds(){
    const value = window.MASettings && MASettings.getVideoPauseSeconds
      ? MASettings.getVideoPauseSeconds()
      : DEFAULT_PAUSE_SECONDS;
    return Number.isFinite(value) && value >= 0 && value <= 60 ? value : DEFAULT_PAUSE_SECONDS;
  }

  function setError(message){
    elements.videoError.textContent = message;
    elements.videoError.hidden = false;
    elements.shell.hidden = true;
  }

  function getLessons(){
    const registry = window.MAVideoContent && MAVideoContent.categories;
    const lessons = [];
    if (!registry) return lessons;

    Object.values(registry).forEach(category => {
      if (!category || !Array.isArray(category.items)) return;
      category.items.forEach(lesson => {
        if (!lesson || typeof lesson.id !== 'string' || !lesson.id.trim() ||
            typeof lesson.title !== 'string' || !lesson.title.trim() ||
            typeof lesson.videoId !== 'string' || !lesson.videoId.trim() ||
            !Array.isArray(lesson.questions)) {
          console.error('Skipping invalid video lesson:', lesson);
          return;
        }
        const questions = lesson.questions.filter(question => {
          const valid = question && typeof question.id === 'string' &&
            typeof question.enabled === 'boolean' && question.enabled === true &&
            typeof question.question === 'string' && question.question.trim() &&
            Array.isArray(question.options) && question.options.length === 4 &&
            question.options.every(option => typeof option === 'string') &&
            question.options.includes(question.answer);
          if (!valid && question && question.enabled === true) {
            console.error('Skipping invalid enabled video question:', question);
          }
          return valid;
        });
        if (questions.length) lessons.push({ lesson, questions, categoryTitle: category.title || category.id });
      });
    });
    return lessons;
  }

  function createPlayer(){
    if (playerInitialized) return;
    if (!window.YT || !window.YT.Player) {
      setError('The video player could not load. Check your internet connection and try again.');
      return;
    }
    playerInitialized = true;
    player = new window.YT.Player(elements.videoFrame, {
      width: '100%',
      height: '100%',
      playerVars: { modestbranding: 1, rel: 0, playsinline: 1 },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: function(){
          elements.videoStatus.textContent = 'This video is unavailable. Please choose another lesson.';
        }
      }
    });
  }

  function onPlayerReady(){
    elements.replay.disabled = false;
    loadLesson();
  }

  function onPlayerStateChange(event){
    if (!window.YT || event.data !== window.YT.PlayerState.ENDED) return;
    showQuestion();
  }

  function loadLesson(){
    clearTimeout(pauseTimer);
    currentLesson = selectedLessons[lessonIndex];
    if (!currentLesson) {
      showCompletion();
      return;
    }
    currentQuestions = currentLesson.questions;
    currentQuestionIndex = 0;
    questionLocked = false;
    elements.categoryTitle.textContent = currentLesson.categoryTitle;
    elements.lessonProgress.textContent = `Video ${lessonIndex + 1} of ${selectedLessons.length}`;
    elements.questionPanel.hidden = true;
    elements.feedback.textContent = '';
    elements.feedback.className = 'video-feedback';
    elements.answerList.innerHTML = '';
    elements.videoStatus.textContent = 'Watch the video. Your question will appear when it finishes.';
    player.loadVideoById(currentLesson.lesson.videoId);
  }

  function showQuestion(){
    if (!currentLesson || !currentQuestions.length) return;
    elements.videoStatus.textContent = 'The video is finished. Think about what you saw.';
    elements.questionPanel.hidden = false;
    renderQuestion();
  }

  function renderQuestion(){
    const question = currentQuestions[currentQuestionIndex];
    questionLocked = false;
    elements.questionProgress.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    elements.questionText.textContent = question.question;
    elements.feedback.textContent = '';
    elements.feedback.className = 'video-feedback';
    elements.answerList.innerHTML = '';

    shuffle(question.options).forEach(option => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-button';
      button.textContent = option;
      button.addEventListener('click', () => answerQuestion(button, option, question.answer));
      elements.answerList.appendChild(button);
    });
  }

  function answerQuestion(button, option, answer){
    if (questionLocked || button.disabled) return;
    if (option !== answer) {
      button.classList.add('wrong');
      button.disabled = true;
      elements.feedback.textContent = 'Try again';
      elements.feedback.className = 'video-feedback error';
      return;
    }

    questionLocked = true;
    button.classList.add('correct');
    elements.answerList.querySelectorAll('button').forEach(answerButton => { answerButton.disabled = true; });
    elements.feedback.textContent = 'Well done!';
    elements.feedback.className = 'video-feedback success';
    pauseTimer = window.setTimeout(nextQuestion, getPauseSeconds() * 1000);
  }

  function nextQuestion(){
    if (currentQuestionIndex < currentQuestions.length - 1) {
      currentQuestionIndex += 1;
      renderQuestion();
      return;
    }
    lessonIndex += 1;
    loadLesson();
  }

  function replayVideo(){
    if (!player || !currentLesson) return;
    player.seekTo(0, true);
    player.playVideo();
    elements.videoStatus.textContent = 'Watch the video again. Your current question stays ready.';
  }

  function startSession(){
    clearTimeout(pauseTimer);
    const lessons = getLessons();
    if (!lessons.length) {
      setError('No complete video lessons are available yet. Add a lesson with at least one enabled question.');
      return;
    }
    selectedLessons = shuffle(lessons).slice(0, SESSION_SIZE);
    lessonIndex = 0;
    elements.videoError.hidden = true;
    elements.completionPanel.hidden = true;
    elements.shell.hidden = false;
    if (player && player.loadVideoById) loadLesson();
  }

  function showCompletion(){
    clearTimeout(pauseTimer);
    elements.shell.hidden = true;
    elements.completionPanel.hidden = false;
    elements.completionText.textContent = `${selectedLessons.length} video${selectedLessons.length === 1 ? '' : 's'} completed.`;
  }

  function waitForYouTube(){
    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }
    window.setTimeout(waitForYouTube, 100);
  }

  elements.replay.addEventListener('click', replayVideo);
  elements.repeat.addEventListener('click', startSession);
  window.onYouTubeIframeAPIReady = waitForYouTube;
  startSession();
  waitForYouTube();
})(window, document);
