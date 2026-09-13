(function(){
  const categories = [
    'getting-started'
  ];

  const scriptUrl = document.currentScript && document.currentScript.src;
  const base = scriptUrl ? scriptUrl.replace(/\/[^/]*$/, '/') : './';
  if (!window.MAVideoContent) window.MAVideoContent = { categories: {} };

  categories.forEach(name => {
    document.write(`<script src="${base}categories/${name}.js"><\/script>`);
  });
})();
