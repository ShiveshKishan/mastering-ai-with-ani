(function(window){
  const dailyActivities = {
    id: 'dailyActivities',
    title: 'Daily Activities',
    description: 'Learn about familiar everyday actions.',
    thumbnail: '../assets/img/domestic-animals/dog.jpg',
    items: [
      {
        id: 'daily-activities-placeholder-001',
        title: 'Everyday Watching',
        videoId: 'aqz-KE-bpKQ',
        questions: [
          {
            id: 'q1', enabled: true, question: 'What should you do while learning?',
            options: ['Watch carefully', 'Close your eyes', 'Skip the video', 'Leave the page'], answer: 'Watch carefully'
          }
        ]
      }
    ]
  };
  window.MAVideoContent = window.MAVideoContent || { categories: {} };
  window.MAVideoContent.categories[dailyActivities.id] = dailyActivities;
})(window);
