(function(window){
  const folder = '../assets/img/vegetables/';
  const vegetables = {
    title: 'Vegetables',
    items: [
      { name: 'Beans', src: folder + 'beans.jpeg', spelling: 1 },
      { name: 'Beetroot', src: folder + 'beetroot.jpeg', spelling: 1 },
      { name: 'Bittergourd', src: folder + 'bittergourd.jpeg', spelling: 0 },
      { name: 'Broccoli', src: folder + 'broccoli.jpeg', spelling: 1 },
      { name: 'Cabbage', src: folder + 'cabbage.jpeg', spelling: 1 },
      { name: 'Capsicum', src: folder + 'capsicum.jpeg', spelling: 1 },
      { name: 'Carrot', src: folder + 'carrot.jpeg', spelling: 1 },
      { name: 'Cauliflower', src: folder + 'cauliflower.jpeg', spelling: 0 },
      { name: 'Chili', src: folder + 'chili.jpeg', spelling: 1 },
      { name: 'Corn', src: folder + 'corn.jpeg', spelling: 1 },
      { name: 'Cucumber', src: folder + 'cucumber.jpeg', spelling: 1 },
      { name: 'Eggplant', src: folder + 'eggplant.jpeg', spelling: 1 },
      { name: 'Garlic', src: folder + 'garlic.jpeg', spelling: 1 },
      { name: 'Ginger', src: folder + 'ginger.jpeg', spelling: 1 },
      { name: 'Onion', src: folder + 'onion.jpeg', spelling: 1 },
      { name: 'Peas', src: folder + 'peas.jpeg', spelling: 1 },
      { name: 'Potato', src: folder + 'potato.jpeg', spelling: 1 },
      { name: 'Pumpkin', src: folder + 'pumpkin.jpeg', spelling: 1 },
      { name: 'Spinach', src: folder + 'spinach.jpeg', spelling: 1 },
      { name: 'Tomato', src: folder + 'tomato.jpeg', spelling: 1 }
    ]
  };
  window.MAContent = window.MAContent || { categories: {} };
  window.MAContent.categories.vegetables = vegetables;
})(window);
