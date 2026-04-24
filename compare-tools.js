(function () {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  if (!data) {
    return;
  }

  const STORAGE_KEY = "easyaistack_compare_tools";
  const MAX_COMPARE_TOOLS = 3;

  function normalizeSlugs(values) {
    return (Array.isArray(values) ? values : [])
      .map((value) => data.toSlug(value))
      .filter(Boolean)
      .filter((slug, index, allValues) => allValues.indexOf(slug) === index)
      .filter((slug) => data.TOOLS.some((toolConfig) => data.toSlug(toolConfig.name) === slug))
      .slice(0, MAX_COMPARE_TOOLS);
  }

  function getCompareSlugs() {
    try {
      return normalizeSlugs(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch (error) {
      return [];
    }
  }

  function writeStoredSlugs(slugs) {
    const normalized = normalizeSlugs(slugs);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch (error) {
      return normalized;
    }
    document.dispatchEvent(new CustomEvent("eas:compare-updated", { detail: { slugs: normalized } }));
    return normalized;
  }

  function getToolBySlug(slug) {
    return data.TOOLS.find((toolConfig) => data.toSlug(toolConfig.name) === data.toSlug(slug)) || null;
  }

  function addToolToCompare(slug) {
    const normalizedSlug = data.toSlug(slug);
    const current = getCompareSlugs();

    if (!normalizedSlug || current.includes(normalizedSlug)) {
      return current;
    }

    if (current.length >= MAX_COMPARE_TOOLS) {
      window.alert("You can compare up to 3 tools. Remove one first on the comparison page.");
      return current;
    }

    return writeStoredSlugs([...current, normalizedSlug]);
  }

  function clearCompareTools() {
    return writeStoredSlugs([]);
  }

  function buildCompareUrl(slugs) {
    const compareSlugs = normalizeSlugs(slugs && slugs.length ? slugs : getCompareSlugs());
    const nextUrl = new URL("./compare-tools.html", window.location.href);
    if (compareSlugs.length > 0) {
      nextUrl.searchParams.set("tools", compareSlugs.join(","));
    }
    return `${nextUrl.pathname}${nextUrl.search}`;
  }

  function syncCompareButtons(root) {
    const selectedSlugs = new Set(getCompareSlugs());

    root.querySelectorAll("[data-compare-tool]").forEach((button) => {
      const toolSlug = data.toSlug(button.getAttribute("data-compare-tool"));
      const isSelected = selectedSlugs.has(toolSlug);

      if (button.dataset.compareDefaultLabel && button.dataset.compareAddedLabel) {
        button.textContent = isSelected ? button.dataset.compareAddedLabel : button.dataset.compareDefaultLabel;
      }

      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });

    root.querySelectorAll("[data-compare-count]").forEach((node) => {
      node.textContent = String(selectedSlugs.size);
    });
  }

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-compare-tool]");
    if (addButton) {
      event.preventDefault();
      addToolToCompare(addButton.getAttribute("data-compare-tool"));
      syncCompareButtons(document);
      return;
    }

    const openButton = event.target.closest("[data-compare-open]");
    if (openButton) {
      event.preventDefault();
      window.location.href = buildCompareUrl();
    }
  });

  document.addEventListener("eas:compare-updated", () => {
    syncCompareButtons(document);
  });

  syncCompareButtons(document);

  window.EASCompare = {
    MAX_COMPARE_TOOLS,
    addToolToCompare,
    buildCompareUrl,
    clearCompareTools,
    getCompareSlugs,
    getToolBySlug,
    writeStoredSlugs
  };
})();
