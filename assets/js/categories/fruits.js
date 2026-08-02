(function(window){
  const folder = '../assets/img/fruits/';
  const fruits = {
    title: 'Fruits',
    items: [
      { name: 'Apple', src: folder + 'apple.jpeg', spelling: 1 },
      { name: 'Coconut', src: folder + 'coconut.jpeg', spelling: 1 },
      { name: 'Grapes', src: folder + 'grapes.jpeg', spelling: 1 },
      { name: 'Guava', src: folder + 'guava.jpeg', spelling: 1 },
      { name: 'Kiwi', src: folder + 'kiwi.jpeg', spelling: 1 },
      { name: 'Lemon', src: folder + 'lemon.jpeg', spelling: 1 },
      { name: 'Mango', src: folder + 'mango.jpeg', spelling: 1 },
      { name: 'Muskmelon', src: folder + 'muskmelon.jpeg', spelling: 0 },
      { name: 'Orange', src: folder + 'orange.jpeg', spelling: 1 },
      { name: 'Papaya', src: folder + 'papaya.jpeg', spelling: 1 },
      { name: 'Peach', src: folder + 'peach.jpeg', spelling: 1 },
      { name: 'Pear', src: folder + 'pear.jpeg', spelling: 1 },
      { name: 'Pineapple', src: folder + 'pineapple.jpeg', spelling: 0 },
      { name: 'Plum', src: folder + 'plum.jpeg', spelling: 1 },
      { name: 'Pomegranate', src: folder + 'pomegranate.jpeg', spelling: 0 },
      { name: 'Strawberry', src: folder + 'strawberry.jpeg', spelling: 0 },
      { name: 'Watermelon', src: folder + 'watermelon.jpeg', spelling: 0 },
      { name: 'Banana', src: folder + 'banana.jpeg', spelling: 1 }
    ]
  };
  window.MAContent = window.MAContent || { categories: {} };
  window.MAContent.categories.fruits = fruits;
})(window);
