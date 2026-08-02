(function(){
  function getModeLinks(categoryKey){
    return [
      { label: 'Flashcard', href: `modules/flashcard.html?category=${categoryKey}` },
      { label: 'Quiz', href: `modules/quiz.html?category=${categoryKey}` },
      { label: 'Spelling', href: `modules/spelling.html?category=${categoryKey}` },
      { label: 'Drag & Spell', href: `modules/drag-drop-spelling.html?category=${categoryKey}` }
    ];
  }

  function buildDashboard(){
    const categories = window.MAContent && MAContent.categories;
    const container = document.getElementById('dashboardCategories');
    if (!container || !categories) return;
    container.innerHTML = '';

    Object.entries(categories).forEach(([key, category]) => {
      const card = document.createElement('div');
      card.className = 'category-card';

      const title = document.createElement('h3');
      title.textContent = category.title || key;
      card.appendChild(title);

      const links = document.createElement('div');
      links.className = 'category-links';
      getModeLinks(key).forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.label;
        anchor.className = 'mode-link';
        links.appendChild(anchor);
      });
      card.appendChild(links);
      container.appendChild(card);
    });
  }

  document.addEventListener('DOMContentLoaded', buildDashboard);
})();
