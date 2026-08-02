(function(){
  const categories = [
    'domesticAnimals',
    'wildAnimals',
    // 'vehicles',
    'fruits',
    'vegetables',
    'colors',
  ];

  const scriptUrl = document.currentScript && document.currentScript.src;
  const base = scriptUrl ? scriptUrl.replace(/\/[^/]*$/, '/') : './';
  if (!window.MAContent) window.MAContent = { categories: {} };

  categories.forEach(name => {
    document.write(`<script src="${base}categories/${name}.js"><\/script>`);
  });
})();