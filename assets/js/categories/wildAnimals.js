(function(window){
  const folder = '../assets/img/wild-animals/';
  const wildAnimals = {
    title: 'Wild Animals',
    items: [
      { name: 'Bear', src: folder + 'bear.jpeg', spelling: 1 },
      { name: 'Cheetah', src: folder + 'cheetah.jpeg', spelling: 1 },
      { name: 'Chimpanzee', src: folder + 'chimpanzee.jpeg', spelling: 0 },
      { name: 'Crocodile', src: folder + 'crocodile.jpeg', spelling: 0 },
      { name: 'Elephant', src: folder + 'elephant.jpeg', spelling: 1 },
      { name: 'Fox', src: folder + 'fox.jpeg', spelling: 1 },
      { name: 'Giraffe', src: folder + 'giraffe.jpeg', spelling: 1 },
      { name: 'Gorilla', src: folder + 'gorilla.jpeg', spelling: 1 },
      { name: 'Hippo', src: folder + 'hippo.jpeg', spelling: 1 },
      { name: 'Hyena', src: folder + 'hyena.jpeg', spelling: 1 },
      { name: 'Kangaroo', src: folder + 'kangaroo.jpeg', spelling: 0 },
      { name: 'Koala', src: folder + 'koala.jpeg', spelling: 1 },
      { name: 'Lion', src: folder + 'lion.jpeg', spelling: 1 },
      { name: 'Monkey', src: folder + 'monkey.jpeg', spelling: 1 },
      { name: 'Panda', src: folder + 'panda.jpeg', spelling: 1 },
      { name: 'Penguin', src: folder + 'penguin.jpeg', spelling: 1 },
      { name: 'Rhino', src: folder + 'rhino.jpeg', spelling: 1 },
      { name: 'Snake', src: folder + 'snake.jpeg', spelling: 1 },
      { name: 'Tiger', src: folder + 'tiger.jpeg', spelling: 1 },
      { name: 'Wolf', src: folder + 'wolf.jpeg', spelling: 1 },
      { name: 'Zebra', src: folder + 'zebra.jpeg', spelling: 1 }
    ]
  };
  window.MAContent = window.MAContent || { categories: {} };
  window.MAContent.categories.wildAnimals = wildAnimals;
})(window);


