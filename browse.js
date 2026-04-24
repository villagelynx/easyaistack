(function initializeAiStackPlannerBrowse() {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  if (!data) {
    return;
  }

  const browseTitle = document.getElementById("browseTitle");
  const browseCopy = document.getElementById("browseCopy");
  const browseHeading = document.getElementById("browseHeading");
  const browseCount = document.getElementById("browseCount");
  const browseDatabaseCount = document.getElementById("browseDatabaseCount");
  const browseResultsList = document.getElementById("browseResultsList");
  const browseSearchInput = document.getElementById("browseSearchInput");

  initializeBrowseSearchForms();
  renderBrowseResults();

  function initializeBrowseSearchForms() {
    const currentParams = new URLSearchParams(window.location.search);
    const currentView = (currentParams.get("view") || "all").trim() || "all";

    document.querySelectorAll("form[data-browse-search-form]").forEach((form) => {
      if (form.dataset.searchReady === "true") {
        return;
      }

      form.dataset.searchReady = "true";
      const initialViewInput = form.querySelector('input[name="view"]');
      if (initialViewInput) {
        initialViewInput.value = currentView;
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const searchInput = form.querySelector('input[name="q"], input[type="search"]');
        const viewInput = form.querySelector('input[name="view"]');
        const nextUrl = new URL(form.getAttribute("action") || "./browse.html", window.location.href);
        const query = (searchInput?.value || "").trim();
        const view = (viewInput?.value || "all").trim() || "all";

        nextUrl.search = "";
        nextUrl.searchParams.set("view", view);
        if (query) {
          nextUrl.searchParams.set("q", query);
        }

        window.location.assign(nextUrl.toString());
      });
    });
  }

  function renderBrowseResults() {
    if (!browseResultsList || !browseCount || !browseDatabaseCount) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const view = params.get("view") || "all";
    const query = (params.get("q") || "").trim();
    const visibleTools = data.filterToolsBySearch(data.filterToolsForView(data.TOOLS, view), query);
    const sortedTools = query
      ? [...visibleTools].sort((left, right) =>
          data.getToolSearchRank(left, query) - data.getToolSearchRank(right, query)
          || right.featuredWeight - left.featuredWeight
          || left.name.localeCompare(right.name)
        )
      : [...visibleTools].sort((left, right) => right.featuredWeight - left.featuredWeight || left.name.localeCompare(right.name));
    const groupedEntries = data.groupEntriesByCategory(
      sortedTools
        .map((toolConfig) => ({ tool: toolConfig, score: 0, matchedReasons: [] }))
    );

    if (browseTitle) {
      browseTitle.textContent = data.getViewLabel(view);
    }
    if (browseCopy) {
      browseCopy.textContent = data.getViewCopy(view);
    }
    if (browseHeading) {
      browseHeading.textContent = query ? `Results for "${query}"` : data.getViewLabel(view);
    }
    if (browseSearchInput) {
      browseSearchInput.value = query;
    }

    browseCount.textContent = `${visibleTools.length} tools`;
    browseDatabaseCount.textContent = `${data.TOOLS.length} tools in database`;

    if (visibleTools.length === 0) {
      browseResultsList.innerHTML = `
        <article class="empty-state">
          No tools matched this collection and search phrase yet. Try a broader collection or a shorter search.
        </article>
      `;
      return;
    }

    browseResultsList.innerHTML = Object.entries(groupedEntries)
      .map(([category, entries]) => `
        <section class="section-group">
          <article class="section-heading-card">
            <h3 class="category-title">${data.escapeHtml(category)}</h3>
            <p class="summary-copy">${entries.length} tools in this category for the current view.</p>
          </article>
          ${entries.map((entry) => data.renderToolCard(entry.tool, 0, [], false, false)).join("")}
        </section>
      `)
      .join("");
  }
})();
