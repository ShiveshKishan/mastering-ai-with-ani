(function(window){
  const folder = '../assets/img/vehicles/';
  const vehicles = {
    title: 'Vehicles',
    items: [
      { name: 'Car', src: folder + 'car.svg' },
      { name: 'Bus', src: folder + 'bus.svg' }
    ]
  };
  window.MAContent = window.MAContent || { categories: {} };
  window.MAContent.categories.vehicles = vehicles;
})(window);
