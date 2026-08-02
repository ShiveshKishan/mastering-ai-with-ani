(function(window){
  const folder = '../assets/img/domestic-animals/';
  const domesticAnimals = {
    title: 'Domestic Animals',
    items: [
      { name: 'Cat', src: folder + 'cat.jpg', spelling: 1 },
      { name: 'Chicken', src: folder + 'chicken.jpg', spelling: 1 },
      { name: 'Cow', src: folder + 'cow.jpg', spelling: 1 },
      { name: 'Dog', src: folder + 'dog.jpg', spelling: 1 },
      { name: 'Donkey', src: folder + 'donkey.jpg', spelling: 0 },
      { name: 'Duck', src: folder + 'duck.jpg', spelling: 1 },
      { name: 'Goat', src: folder + 'goat.jpg', spelling: 1 },
      { name: 'Horse', src: folder + 'horse.jpg', spelling: 1 },
      { name: 'Pig', src: folder + 'pig.jpg', spelling: 1 },
      { name: 'Rabbit', src: folder + 'rabbit.jpg', spelling: 0 },
      { name: 'Rooster', src: folder + 'rooster.jpg', spelling: 1 },
      { name: 'Sheep', src: folder + 'sheep.jpg', spelling: 1 }
    ]
  };
  window.MAContent = window.MAContent || { categories: {} };
  window.MAContent.categories.domesticAnimals = domesticAnimals;
})(window);
