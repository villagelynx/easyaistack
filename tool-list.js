(function initializeAiToolMasterList() {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  if (!data) {
    return;
  }

  const alphaFilterBar = document.getElementById("alphaFilterBar");
  const masterToolSections = document.getElementById("masterToolSections");
  const masterToolHeading = document.getElementById("masterToolHeading");
  const masterToolIntro = document.getElementById("masterToolIntro");
  const masterToolCount = document.getElementById("masterToolCount");
  const masterToolDatabaseCount = document.getElementById("masterToolDatabaseCount");
  const masterViewBar = document.getElementById("masterViewBar");

  if (!alphaFilterBar || !masterToolSections || !masterToolCount || !masterToolDatabaseCount || !masterViewBar) {
    return;
  }

  const LETTERS = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  const CATEGORY_DEFAULT = "All Categories";
  const CATEGORY_OPTIONS = [CATEGORY_DEFAULT, ...data.getCategoryOptions().filter((category) => category !== data.CATEGORY_FILTER_DEFAULT)];
  const searchParams = new URLSearchParams(window.location.search);
  let activeLetter = normalizeLetter(searchParams.get("letter"));
  let activeView = normalizeView(searchParams.get("viewMode"));
  let activeCategory = normalizeCategory(searchParams.get("category"));

  renderViewBar();
  renderFilterBar();
  renderToolList();

  masterViewBar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-master-view]");
    if (!button) {
      return;
    }

    activeView = normalizeView(button.dataset.masterView);
    syncUrl();
    renderViewBar();
    renderFilterBar();
    renderToolList();
  });

  alphaFilterBar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-letter], [data-category]");
    if (!button) {
      return;
    }

    if (activeView === "category") {
      activeCategory = normalizeCategory(button.dataset.category);
    } else {
      activeLetter = normalizeLetter(button.dataset.letter);
    }
    syncUrl();
    renderViewBar();
    renderFilterBar();
    renderToolList();
  });

  function normalizeView(value) {
    return value === "category" ? "category" : "alphabetical";
  }

  function normalizeLetter(value) {
    const candidate = String(value || "All").trim().toUpperCase();
    return LETTERS.includes(candidate) ? candidate : "All";
  }

  function normalizeCategory(value) {
    const candidate = String(value || CATEGORY_DEFAULT).trim();
    return CATEGORY_OPTIONS.includes(candidate) ? candidate : CATEGORY_DEFAULT;
  }

  function getSortedTools() {
    return [...data.TOOLS].sort((left, right) => left.name.localeCompare(right.name));
  }

  function getFirstLetter(toolConfig) {
    const firstCharacter = String(toolConfig.name || "").trim().charAt(0).toUpperCase();
    return LETTERS.includes(firstCharacter) ? firstCharacter : "#";
  }

  function syncUrl() {
    const nextUrl = new URL(window.location.href);
    nextUrl.search = "";
    if (activeView !== "alphabetical") {
      nextUrl.searchParams.set("viewMode", activeView);
    }
    if (activeView === "alphabetical" && activeLetter !== "All") {
      nextUrl.searchParams.set("letter", activeLetter);
    }
    if (activeView === "category" && activeCategory !== CATEGORY_DEFAULT) {
      nextUrl.searchParams.set("category", activeCategory);
    }
    window.history.replaceState({}, "", nextUrl);
  }

  function renderViewBar() {
    Array.from(masterViewBar.querySelectorAll("[data-master-view]")).forEach((button) => {
      const isActive = button.dataset.masterView === activeView;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function renderFilterBar() {
    if (activeView === "category") {
      alphaFilterBar.setAttribute("aria-label", "Filter tools by category");
      alphaFilterBar.innerHTML = CATEGORY_OPTIONS.map((category) => `
        <button
          class="alpha-filter-button${activeCategory === category ? " is-active" : ""}"
          type="button"
          data-category="${data.escapeHtml(category)}"
          aria-pressed="${activeCategory === category ? "true" : "false"}"
        >
          ${data.escapeHtml(category)}
        </button>
      `).join("");
      return;
    }

    alphaFilterBar.setAttribute("aria-label", "Filter tools by letter");
    alphaFilterBar.innerHTML = ["All", ...LETTERS].map((letter) => `
      <button
        class="alpha-filter-button${activeLetter === letter ? " is-active" : ""}"
        type="button"
        data-letter="${letter}"
        aria-pressed="${activeLetter === letter ? "true" : "false"}"
      >
        ${letter}
      </button>
    `).join("");
  }

  function renderToolList() {
    const sortedTools = getSortedTools();
    const visibleTools = activeView === "category"
      ? (activeCategory === CATEGORY_DEFAULT
        ? sortedTools
        : sortedTools.filter((toolConfig) => toolConfig.category === activeCategory))
      : (activeLetter === "All"
        ? sortedTools
        : sortedTools.filter((toolConfig) => getFirstLetter(toolConfig) === activeLetter));

    masterToolCount.textContent = `${visibleTools.length} tools shown`;
    masterToolDatabaseCount.textContent = `${data.TOOLS.length} tools in database`;

    if (masterToolHeading) {
      if (activeView === "category") {
        masterToolHeading.textContent = activeCategory === CATEGORY_DEFAULT ? "AI Tool Database by Category" : `${activeCategory} Tools`;
      } else {
        masterToolHeading.textContent = activeLetter === "All" ? "A-Z AI Tool Database" : `${activeLetter} Tools`;
      }
    }
    if (masterToolIntro) {
      if (activeView === "category") {
        masterToolIntro.textContent = activeCategory === CATEGORY_DEFAULT
          ? "Every EasyAIStack tool, grouped by category and sorted alphabetically within each category."
          : `Showing the ${activeCategory} category from the tool database.`;
      } else {
        masterToolIntro.textContent = activeLetter === "All"
          ? "Every EasyAIStack tool, arranged alphabetically."
          : `Showing the ${activeLetter} section of the tool database.`;
      }
    }

    if (visibleTools.length === 0) {
      masterToolSections.innerHTML = `
        <article class="empty-state">
          ${activeView === "category"
            ? `No tools are filed under ${data.escapeHtml(activeCategory)} yet. Try another category or go back to all categories.`
            : `No tools are filed under ${data.escapeHtml(activeLetter)} yet. Try another letter or go back to All.`}
        </article>
      `;
      return;
    }

    if (activeView === "category") {
      const groupedTools = visibleTools.reduce((groups, toolConfig) => {
        const category = toolConfig.category;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(toolConfig);
        return groups;
      }, {});

      masterToolSections.innerHTML = Object.entries(groupedTools)
        .sort((left, right) => left[0].localeCompare(right[0]))
        .map(([category, tools]) => renderCategorySection(category, tools))
        .join("");
      return;
    }

    if (activeLetter === "All") {
      const groupedTools = visibleTools.reduce((groups, toolConfig) => {
        const letter = getFirstLetter(toolConfig);
        if (!groups[letter]) {
          groups[letter] = [];
        }
        groups[letter].push(toolConfig);
        return groups;
      }, {});

      masterToolSections.innerHTML = Object.entries(groupedTools)
        .sort((left, right) => left[0].localeCompare(right[0]))
        .map(([letter, tools]) => renderLetterSection(letter, tools))
        .join("");
      return;
    }

    masterToolSections.innerHTML = renderLetterSection(activeLetter, visibleTools);
  }

  function renderCategorySection(category, tools) {
    return `
      <section class="section-group">
        <article class="section-heading-card">
          <h3 class="category-title">${data.escapeHtml(category)}</h3>
          <p class="summary-copy">${tools.length} tools in this category.</p>
        </article>
        <div class="master-tool-list">
          ${tools.map((toolConfig) => renderToolRow(toolConfig)).join("")}
        </div>
      </section>
    `;
  }

  function renderLetterSection(letter, tools) {
    return `
      <section class="section-group">
        <article class="section-heading-card">
          <h3 class="category-title">${data.escapeHtml(letter)}</h3>
          <p class="summary-copy">${tools.length} tools in this section.</p>
        </article>
        <div class="master-tool-list">
          ${tools.map((toolConfig) => renderToolRow(toolConfig)).join("")}
        </div>
      </section>
    `;
  }

  function renderToolRow(toolConfig) {
    const implementationLabel = data.getImplementationLabel
      ? data.getImplementationLabel(toolConfig)
      : toolConfig.setupDifficulty;

    return `
      <article class="master-tool-row">
        <div class="master-tool-row-main">
          <strong class="master-tool-name">${data.escapeHtml(toolConfig.name)}</strong>
          <span class="master-tool-meta">${data.escapeHtml(toolConfig.category)} &middot; ${data.escapeHtml(data.getDisplayPrice(toolConfig))} &middot; ${data.escapeHtml(implementationLabel)}</span>
        </div>
        <div class="result-link-row">
          <button class="secondary-button compact-button" type="button" data-compare-tool="${data.escapeHtml(data.toSlug(toolConfig.name))}" data-compare-default-label="Add to Compare" data-compare-added-label="In Compare" aria-pressed="false">Add to Compare</button>
          <a class="master-tool-action" href="./tool-detail.html?tool=${encodeURIComponent(data.toSlug(toolConfig.name))}">View Details</a>
        </div>
      </article>
    `;
  }
})();
