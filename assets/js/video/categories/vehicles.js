(function(window){
  const vehicles = {
    id: 'vehicles',
    title: 'Vehicles',
    description: 'Watch movement, travel, and transport.',
    thumbnail: '../assets/img/domestic-animals/horse.jpg',
    items: [
      {
        id: 'vehicles-placeholder-001',
        title: 'Moving Things',
        videoId: 'ScMzIvxBSi4',
        questions: [
          {
            id: 'q1', enabled: true, question: 'What is this lesson about?',
            options: ['Watching a video', 'Planting a tree', 'Cooking food', 'Reading a menu'], answer: 'Watching a video'
          }
        ]
      }
    ]
  };
  window.MAVideoContent = window.MAVideoContent || { categories: {} };
  window.MAVideoContent.categories[vehicles.id] = vehicles;
})(window);
