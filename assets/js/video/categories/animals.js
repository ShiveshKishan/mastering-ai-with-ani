(function(window){
  const animals = {
    id: 'animals',
    title: 'Animals',
    description: 'Notice animals and what they do.',
    thumbnail: '../assets/img/wild-animals/elephant.jpeg',
    items: [
      {
        id: 'animals-placeholder-001',
        title: 'Animal Watching',
        videoId: 'M7lc1UVf-VE',
        questions: [
          {
            id: 'q1', enabled: true, question: 'What are you watching?',
            options: ['An animal video', 'A recipe', 'A map', 'A song'], answer: 'An animal video'
          }
        ]
      }
    ]
  };
  window.MAVideoContent = window.MAVideoContent || { categories: {} };
  window.MAVideoContent.categories[animals.id] = animals;
})(window);
