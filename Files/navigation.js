<script>
document.addEventListener("DOMContentLoaded", function() {
  const path = window.location.pathname;

  const linkMap = {
    "/our-research": "research-link",
    "/trip-planning-resources": "trip-link",
    "/news-and-events": "news-events-link",
    "/who-we-are": "who-link"
  };

  for (const [urlPath, id] of Object.entries(linkMap)) {
    if (path.includes(urlPath)) {
      const el = document.getElementById(id);
      if (el) el.classList.add("active");
      break; // stop after finding the first match
    }
  }
});


// wait for page to load before executing
window.addEventListener('load', function () {

  const toggleButton = document.querySelector('.navbar__toggle .nav-trigger');
  const toggleBar = document.querySelector('.navbar__toggle');
  const toggleBack = document.querySelector('.navbar__toggle .back-button');
  const navMenu = document.querySelector('.nav-menu');

  toggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    toggleBar.classList.toggle('open-menu');
    toggleBack.classList.remove('visible');
    document.querySelectorAll('.has-dropdown').forEach(dropdown => {
        dropdown.classList.remove('open');
      });

    // Body scroll lock toggle
    if (navMenu.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    } 
  });

  const searchToggle = document.querySelector('.search-toggle');
  const searchContainer = document.querySelector('.search-container');
  const navItems = document.querySelectorAll('.nav-item'); // select all nav items


  console.log('Toggle button:', searchToggle);
  console.log('Search container:', searchContainer);

  searchToggle.addEventListener('click', () => {
      searchContainer.classList.toggle('active');
          // toggle visibility of all nav items
      navItems.forEach(item => item.classList.toggle('hidden')); // add/remove a 'hidden' class

    });
});
</script>