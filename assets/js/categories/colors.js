(function(window){
  const folder = '../assets/img/colors/';
  const colors = {
    title: 'Colors',
    items: [
      { name: 'Black', src: folder + 'black.jpeg', spelling: 1 },
      { name: 'Blue', src: folder + 'blue.jpeg', spelling: 1 },
      { name: 'Brown', src: folder + 'brown.jpeg', spelling: 1 },
      { name: 'Green', src: folder + 'green.jpeg', spelling: 1 },
      { name: 'Grey', src: folder + 'grey.jpeg', spelling: 1 },
      { name: 'Orange', src: folder + 'orange.jpeg', spelling: 1 },
      { name: 'Pink', src: folder + 'pink.jpeg', spelling: 1 },
      { name: 'Purple', src: folder + 'purple.jpeg', spelling: 1 },
      { name: 'Red', src: folder + 'red.jpeg', spelling: 1 },
      { name: 'White', src: folder + 'white.jpeg', spelling: 1 },
      { name: 'Yellow', src: folder + 'yellow.jpeg', spelling: 1 }
    ]
  };
  window.MAContent = window.MAContent || { categories: {} };
  window.MAContent.categories.colors = colors;
})(window);
