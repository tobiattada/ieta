<script>
document.addEventListener('DOMContentLoaded', () => {

  function wrapRows(selector = 'section.row', wrapperTag = 'div', classCallback) {
    const rows = document.querySelectorAll(selector);
    rows.forEach((row, index) => {
      // Create wrapper
      const wrapper = document.createElement(wrapperTag);

      // Run callback to add custom classes or code
      if (typeof classCallback === 'function') {
        classCallback(wrapper, row, index); // pass wrapper, original row, and index
      }

      // Insert wrapper and move row inside it
      row.parentNode.insertBefore(wrapper, row);
      wrapper.appendChild(row);
    });
  }

  // --------- Use the function ---------

  wrapRows('section.row', 'div', (wrapper, row, index) => {
    // Add default classes
    wrapper.classList.add('wrapper');

    // Add per-row custom classes

    if (index === 3) wrapper.classList.add('bg-light', 'basic', 'text-image');

    // You can also run arbitrary code for this row here
    // e.g., row.style.backgroundColor = '#f9f9f9';
  });

});


document.addEventListener('DOMContentLoaded', () => {
  // Move .widget ul.headers into div.resource-header-content
  const widgetList = document.querySelector('.widget ul.headers');
  const headerContainer = document.querySelector('div.resource-header-content');

  if (widgetList && headerContainer) {
    headerContainer.appendChild(widgetList);
    console.log('Moved .widget ul.headers into div.resource-header-content');
  } else {
    console.warn('Could not find widget list or header container');
  }

  // Move .resource-center-style .resource-thumbnail-widget img into top of .resource-article-content
  const images = document.querySelectorAll('.resource-center-style .resource-thumbnail-widget img');
  const articleContent = document.querySelector('.resource-article-content');

  if (!articleContent) {
    console.warn('Target container .resource-article-content not found');
    return;
  }

  images.forEach(img => {
    articleContent.prepend(img);
    console.log('Moved image into .resource-article-content:', img);
  });
});

</script>