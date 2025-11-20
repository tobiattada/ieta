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

    if (index === 1) wrapper.classList.add("about-us-header', 'pushdown');
    if (index === 3) wrapper.classList.add('white-card', 'bg-light');

    // You can also run arbitrary code for this row here
    // e.g., row.style.backgroundColor = '#f9f9f9';
  });

});

</script>