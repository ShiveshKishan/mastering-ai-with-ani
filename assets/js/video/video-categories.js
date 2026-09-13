(function(window, document){
  'use strict';

  const container = document.getElementById('videoCategories');
  const error = document.getElementById('categoryError');
  const categories = window.MAVideoContent && MAVideoContent.categories;

  function showError(message){
    error.textContent = message;
    error.hidden = false;
  }

  function validCategory(category){
    return category && typeof category.id === 'string' && category.id.trim() &&
      typeof category.title === 'string' && category.title.trim() &&
      typeof category.thumbnail === 'string' && category.thumbnail.trim() &&
      Array.isArray(category.items);
  }

  if (!categories || !Object.keys(categories).length) {
    showError('No video categories are available yet.');
  } else {
    Object.values(categories).forEach(category => {
      if (!validCategory(category)) {
        console.error('Skipping invalid video category:', category);
        return;
      }

      const link = document.createElement('a');
      link.className = 'video-category-card';
      link.href = `video-learning.html?category=${encodeURIComponent(category.id)}`;
      link.setAttribute('aria-label', `Open ${category.title}`);

      const image = document.createElement('img');
      image.src = category.thumbnail;
      image.alt = '';
      image.loading = 'lazy';

      const content = document.createElement('span');
      content.className = 'video-category-content';
      const title = document.createElement('strong');
      title.textContent = category.title;
      content.appendChild(title);
      if (category.description) {
        const description = document.createElement('span');
        description.textContent = category.description;
        content.appendChild(description);
      }

      link.appendChild(image);
      link.appendChild(content);
      container.appendChild(link);
    });
  }
})(window, document);
