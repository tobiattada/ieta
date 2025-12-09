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

  if (allInitialArticles.length <= 6) {
    loadBtn.style.display = "none";
  }

  // Track hidden first-page articles
  let hiddenArticles = allInitialArticles.slice(6);

  // --- LOAD MORE HANDLER ---
  loadBtn.addEventListener("click", () => {
    // Reveal next 3 hidden items from first page
    if (hiddenArticles.length > 0) {
      const toShow = hiddenArticles.splice(0, 3);
      toShow.forEach(item => (item.style.display = ""));
      return;
    }

    // Otherwise fetch next paginated page
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
          loadBtn.style.display = "none";
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