// <div class="load-more"> <button id="load-more-btn">Load More</button></div>

document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  const loadBtn = document.getElementById("load-more-btn");
  const container = document.querySelector(".listing-container");

  // --- INITIAL SETUP: SHOW 6, HIDE THE REST ---
  const allInitialArticles = Array.from(
    container.querySelectorAll("div.entry.resource-entry")
  );

  // Hide anything after the first 6
  allInitialArticles.forEach((article, index) => {
    if (index >= 6) article.style.display = "none";
  });

  // Hide Load More button if <=6 articles on first page
  if (allInitialArticles.length <= 6) {
    loadBtn.style.display = "none";
  }

  // Track hidden first-page articles
  let hiddenArticles = allInitialArticles.slice(6);

  // --- LOAD MORE / SHOW LESS HANDLER ---
  loadBtn.addEventListener("click", () => {
    // --- SHOW LESS MODE ---
    if (loadBtn.dataset.mode === "show-less") {
      const visibleArticles = Array.from(
        container.querySelectorAll("div.entry.resource-entry")
      ).filter(a => a.style.display !== "none");

      // Don't hide below the initial 6
      if (visibleArticles.length <= 6) {
        loadBtn.textContent = "Load More";
        delete loadBtn.dataset.mode; // back to normal mode
        return;
      }

      // Hide the last 3 visible articles
      const toHide = visibleArticles.slice(-3);
      toHide.forEach(article => (article.style.display = "none"));

      // If after hiding, only 6 left, switch back to Load More
      const remaining = visibleArticles.length - 3;
      if (remaining <= 6) {
        loadBtn.textContent = "Load More";
        delete loadBtn.dataset.mode;
      }

      return; // Prevent further loading
    }

    // --- REVEAL NEXT 3 HIDDEN ITEMS FROM FIRST PAGE ---
    if (hiddenArticles.length > 0) {
      const toShow = hiddenArticles.splice(0, 3);
      toShow.forEach(item => (item.style.display = ""));
      return;
    }

    // --- FETCH NEXT PAGINATED PAGE ---
    currentPage++;

    fetch(`https://israeledtravelalliance.fedwebpreview.org/news-and-events?page=${currentPage}`)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const newArticles = Array.from(
          doc.querySelectorAll("div.entry.resource-entry")
        );

        if (newArticles.length === 0) {
          // No more articles → switch to SHOW LESS mode
          loadBtn.textContent = "Show Less";
          loadBtn.dataset.mode = "show-less";
          loadBtn.classList.add("arrow-reverse"); 
          return;
        }

        // Append the next 3 new items
        newArticles.slice(0, 3).forEach(article => {
          container.appendChild(article);
        });

        // Save leftover items for future clicks
        hiddenArticles = newArticles.slice(3);
      })
      .catch(err => console.error("Lazy load error:", err));
  });
});
