(function () {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  const compare = window.EASCompare;
  if (!data || !compare) {
    return;
  }

  const compareForm = document.getElementById("compareBuilderForm");
  const compareSummary = document.getElementById("compareSummary");
  const compareTableMount = document.getElementById("compareTableMount");
  const compareNote = document.getElementById("compareNote");
  const compareCount = document.getElementById("compareCount");
  const compareCountBadge = document.getElementById("compareCountBadge");
  const compareTableHeading = document.getElementById("compareTableHeading");

  if (!compareForm || !compareSummary || !compareTableMount || !compareNote || !compareCount || !compareCountBadge || !compareTableHeading) {
    return;
  }

  const selectorNodes = Array.from(compareForm.querySelectorAll("[data-compare-slot]"));
  const params = new URLSearchParams(window.location.search);
  const initialSlugs = normalizeSlugs((params.get("tools") || "").split(","));
  const selectedSlugs = initialSlugs.length > 0 ? initialSlugs : compare.getCompareSlugs();
  const sortedTools = [...data.TOOLS].sort((left, right) => left.name.localeCompare(right.name));

  selectorNodes.forEach((node, index) => {
    node.innerHTML = `
      <option value="">Choose a tool</option>
      ${sortedTools.map((toolConfig) => `<option value="${data.escapeHtml(data.toSlug(toolConfig.name))}">${data.escapeHtml(toolConfig.name)}</option>`).join("")}
    `;
    node.value = selectedSlugs[index] || "";
  });

  syncFromSelectors();

  compareForm.addEventListener("change", () => {
    syncFromSelectors();
  });

  compareForm.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-slot]");
    if (removeButton) {
      event.preventDefault();
      const slotIndex = Number(removeButton.getAttribute("data-remove-slot"));
      if (!Number.isNaN(slotIndex) && selectorNodes[slotIndex]) {
        selectorNodes[slotIndex].value = "";
        syncFromSelectors();
      }
      return;
    }

    const clearButton = event.target.closest("[data-compare-clear]");
    if (clearButton) {
      event.preventDefault();
      selectorNodes.forEach((node) => {
        node.value = "";
      });
      compare.clearCompareTools();
      syncFromSelectors();
    }
  });

  function normalizeSlugs(values) {
    return (Array.isArray(values) ? values : [])
      .map((value) => data.toSlug(value))
      .filter(Boolean)
      .filter((slug, index, allValues) => allValues.indexOf(slug) === index)
      .slice(0, compare.MAX_COMPARE_TOOLS);
  }

  function syncFromSelectors() {
    const slugs = normalizeSlugs(selectorNodes.map((node) => node.value));
    compare.writeStoredSlugs(slugs);
    syncUrl(slugs);
    renderSummary(slugs);
    renderTable(slugs);
  }

  function syncUrl(slugs) {
    const nextUrl = new URL(window.location.href);
    nextUrl.search = "";
    if (slugs.length > 0) {
      nextUrl.searchParams.set("tools", slugs.join(","));
    }
    window.history.replaceState({}, "", nextUrl);
  }

  function renderSummary(slugs) {
    const tools = slugs.map((slug) => compare.getToolBySlug(slug)).filter(Boolean);
    compareCount.textContent = `${tools.length} of ${compare.MAX_COMPARE_TOOLS} selected`;
    compareCountBadge.textContent = String(tools.length);

    if (tools.length === 0) {
      compareSummary.innerHTML = `
        <article class="empty-state">
          Choose up to 3 tools to compare. You can stay inside one category, or mix categories when you are deciding which stack layer matters first.
        </article>
      `;
      return;
    }

    compareSummary.innerHTML = `
      <div class="compare-summary-grid">
        ${tools.map((toolConfig) => `
          <article class="compare-summary-card" style="${data.escapeHtml(getCompareColumnStyle(toolConfig))}">
            <div class="compare-summary-top">
              ${renderToolArtwork(toolConfig)}
              <div class="compare-summary-copy">
                <p class="eyebrow">${data.escapeHtml(toolConfig.category)}</p>
                <h3>${data.escapeHtml(toolConfig.name)}</h3>
                <p class="summary-copy">${data.escapeHtml(toolConfig.summary)}</p>
              </div>
            </div>
            <div class="result-link-row">
              <a class="guide-button" href="./tool-detail.html?tool=${encodeURIComponent(data.toSlug(toolConfig.name))}">View Details</a>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderTable(slugs) {
    const tools = slugs.map((slug) => compare.getToolBySlug(slug)).filter(Boolean);
    compareTableHeading.textContent = tools.length >= 2 ? "Side-by-side comparison" : "Choose at least 2 tools";

    if (tools.length < 2) {
      compareNote.innerHTML = `
        <article class="action-card">
          <p class="eyebrow">How I'd Use This</p>
          <h3>Free compare first, then planner or paid plan</h3>
          <p class="summary-copy">Use this page to narrow finalists. Same-category comparisons are more apples-to-apples. Mixed-category comparisons are useful when you are choosing the right stack role instead of picking between nearly identical products.</p>
        </article>
      `;
      compareTableMount.innerHTML = "";
      return;
    }

    const uniqueCategories = Array.from(new Set(tools.map((toolConfig) => toolConfig.category)));
    const mixedCategory = uniqueCategories.length > 1;
    compareNote.innerHTML = `
      <article class="action-card">
        <p class="eyebrow">${mixedCategory ? "Mixed Comparison" : "Same-Category Comparison"}</p>
        <h3>${mixedCategory ? "These tools serve different roles" : "These tools are in the same role family"}</h3>
        <p class="summary-copy">${mixedCategory
          ? "That is okay. Compare them based on which workflow they improve first. This is most useful when you are deciding what layer your business actually needs."
          : "This is the cleaner compare mode. Focus on budget, setup, time to value, and which tool fits the workload best."}
        </p>
      </article>
    `;

    compareTableMount.innerHTML = `
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Compare</th>
              ${tools.map((toolConfig) => `
                <th class="compare-tool-column-head" style="${data.escapeHtml(getCompareColumnStyle(toolConfig))}">
                  <div class="compare-tool-column-head-copy">
                    <strong>${data.escapeHtml(toolConfig.name)}</strong>
                    <span>${data.escapeHtml(toolConfig.category)}</span>
                  </div>
                </th>
              `).join("")}
            </tr>
          </thead>
          <tbody>
            ${getRows(tools).map((row) => `
              <tr>
                <th scope="row">${data.escapeHtml(row.label)}</th>
                ${tools.map((toolConfig) => `<td class="compare-tool-column-cell" style="${data.escapeHtml(getCompareColumnStyle(toolConfig))}">${row.render(toolConfig)}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="action-card-grid">
        <article class="action-card">
          <p class="eyebrow">Free Next Step</p>
          <h3>Use the planner when you want a recommendation</h3>
          <p class="summary-copy">The compare table is for narrowing the field. The planner is better when you want the site to make a stronger recommendation based on your business type, bottleneck, budget, and workload.</p>
          <div class="result-link-row">
            <a class="guide-button" href="./index.html#plannerSection">Run the Planner</a>
          </div>
        </article>

        <article class="action-card">
          <p class="eyebrow">Premium Upgrade</p>
          <h3>Need the site to tell you what to buy first?</h3>
          <p class="summary-copy">The $29 plan is where EasyAIStack stops comparing tools in isolation and tells you what to start with, what to delay, and which workflow to launch first.</p>
          <div class="result-link-row">
            <a class="guide-button" href="./ai-stack-plan.html">View $29 Plan Overview</a>
          </div>
        </article>
      </div>
    `;
  }

  function getRows(tools) {
    const rows = [
      { label: "Category", render: (toolConfig) => data.escapeHtml(toolConfig.category) },
      { label: "Budget", render: (toolConfig) => data.escapeHtml(data.getDisplayPrice(toolConfig)) },
      { label: "Setup", render: (toolConfig) => data.escapeHtml(toolConfig.setupDifficulty) },
      { label: "Who Can Implement", render: (toolConfig) => data.escapeHtml(data.getImplementationLabel ? data.getImplementationLabel(toolConfig) : toolConfig.setupDifficulty) },
      { label: "Time To Value", render: (toolConfig) => data.escapeHtml(toolConfig.timeToValue) },
      { label: "Best For", render: (toolConfig) => data.escapeHtml(toolConfig.businessTypes.join(", ")) },
      { label: "Best First Use Case", render: (toolConfig) => data.escapeHtml(toolConfig.firstUseCase) },
      { label: "Main Downside", render: (toolConfig) => data.escapeHtml(toolConfig.downside) },
      { label: "Primary Bottlenecks", render: (toolConfig) => renderPillCell(toolConfig.bottlenecks) },
      { label: "Main Goals", render: (toolConfig) => renderPillCell(toolConfig.goals) }
    ];

    if (tools.some((toolConfig) => (toolConfig.integrationPlatforms || []).length > 0)) {
      rows.push({ label: "Platform / Integrations", render: (toolConfig) => renderPillCell(toolConfig.integrationPlatforms) });
    }
    if (tools.some((toolConfig) => toolConfig.agentFit && toolConfig.agentFit !== "Not Focused")) {
      rows.push({ label: "AI Agent Fit", render: (toolConfig) => data.escapeHtml(toolConfig.agentFit || "Not Focused") });
    }
    if (tools.some((toolConfig) => (toolConfig.supportChannels || []).length > 0)) {
      rows.push({ label: "Support Channels", render: (toolConfig) => renderPillCell(toolConfig.supportChannels) });
    }
    if (tools.some((toolConfig) => (toolConfig.salesUseCases || []).length > 0)) {
      rows.push({ label: "Sales Use Cases", render: (toolConfig) => renderPillCell(toolConfig.salesUseCases) });
    }
    if (tools.some((toolConfig) => (toolConfig.financeUseCases || []).length > 0)) {
      rows.push({ label: "Finance Use Cases", render: (toolConfig) => renderPillCell(toolConfig.financeUseCases) });
    }
    if (tools.some((toolConfig) => (toolConfig.languageUseCases || []).length > 0)) {
      rows.push({ label: "Language Use Cases", render: (toolConfig) => renderPillCell(toolConfig.languageUseCases) });
    }
    if (tools.some((toolConfig) => (toolConfig.worksBestWith || []).length > 0)) {
      rows.push({ label: "Works Best With", render: (toolConfig) => renderPillCell(toolConfig.worksBestWith) });
    }

    return rows;
  }

  function renderPillCell(values) {
    if (!values || values.length === 0) {
      return `<span class="compare-muted">Not a focus</span>`;
    }
    return `<div class="compare-pill-cell">${values.map((value) => `<span class="compare-mini-pill">${data.escapeHtml(value)}</span>`).join("")}</div>`;
  }

  function renderToolArtwork(toolConfig) {
    const artwork = getArtworkMeta(toolConfig);
    return `
      <div class="tool-artwork compare-tool-artwork" style="--tool-start:${data.escapeHtml(artwork.start)}; --tool-end:${data.escapeHtml(artwork.end)};">
        <span class="tool-artwork-badge" aria-hidden="true">${data.escapeHtml(artwork.badge)}</span>
        <small class="compare-tool-artwork-label">${data.escapeHtml(toolConfig.category)}</small>
      </div>
    `;
  }

  function getArtworkMeta(toolConfig) {
    const colors = {
      "Core Assistant": { start: "#0d7f6f", end: "#0b4f50" },
      Research: { start: "#2160b0", end: "#173e76" },
      Workspace: { start: "#5b7d23", end: "#34561a" },
      Meetings: { start: "#7a4dc5", end: "#4f3285" },
      Automation: { start: "#c06e1c", end: "#864412" },
      Design: { start: "#e65d92", end: "#a93063" },
      CRM: { start: "#287e6e", end: "#145246" },
      Support: { start: "#4377d2", end: "#244b91" },
      Scheduling: { start: "#7a6d14", end: "#54480e" },
      "Content Studio": { start: "#c4456f", end: "#7e2745" },
      "Project Ops": { start: "#3d6a8f", end: "#21425b" },
      Finance: { start: "#1d8b6f", end: "#0f5c48" },
      "Analytics / BI": { start: "#2f7cff", end: "#123b9c" },
      "Voice / Phone AI": { start: "#1aa3a0", end: "#0c6f74" },
      "Security / Compliance": { start: "#7357d8", end: "#443091" },
      "Recruiting / HR": { start: "#2b9a72", end: "#176247" },
      "Ecommerce Personalization": { start: "#f08a2e", end: "#c55b1d" }
    };
    const categoryColors = colors[toolConfig.category] || { start: "#2f7cff", end: "#123b9c" };

    return {
      badge: toolConfig.name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase(),
      start: categoryColors.start,
      end: categoryColors.end
    };
  }

  function getCompareColumnStyle(toolConfig) {
    const artwork = getArtworkMeta(toolConfig);
    return [
      `--compare-column-bg:${hexToRgba(artwork.start, 0.08)}`,
      `--compare-column-bg-strong:${hexToRgba(artwork.start, 0.18)}`,
      `--compare-column-border:${hexToRgba(artwork.end, 0.18)}`,
      `--compare-column-text:${artwork.end}`
    ].join(";");
  }

  function hexToRgba(hex, alpha) {
    const normalized = String(hex || "").replace("#", "").trim();
    if (normalized.length !== 6) {
      return `rgba(47, 124, 255, ${alpha})`;
    }

    const red = Number.parseInt(normalized.slice(0, 2), 16);
    const green = Number.parseInt(normalized.slice(2, 4), 16);
    const blue = Number.parseInt(normalized.slice(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
})();
