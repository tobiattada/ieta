<!-- <script>
document.addEventListener('DOMContentLoaded', () => {
  // Only run if body has class "main"
  if (!document.body.classList.contains('section-resource-center-listing')) return;

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
    if (index === 2) wrapper.classList.add('bg-white', 'article-back');
    if (index === 3) wrapper.classList.add('bg-light', 'feature-posts');
  });
});
</script> -->