(function(window){
  const nature = {
    id: 'nature',
    title: 'Nature',
    description: 'Look closely at the world around us.',
    thumbnail: '../assets/img/wild-animals/lion.jpeg',
    items: [
      {
        id: 'nature-placeholder-001',
        title: 'Nature Watching',
        videoId: 'M7lc1UVf-VE',
        questions: [
          {
            id: 'q1', enabled: true, question: 'How do you learn from a video?',
            options: ['Watch and think', 'Guess without watching', 'Skip the questions', 'Close the lesson'], answer: 'Watch and think'
          }
        ]
      }
    ]
  };
  window.MAVideoContent = window.MAVideoContent || { categories: {} };
  window.MAVideoContent.categories[nature.id] = nature;
})(window);
