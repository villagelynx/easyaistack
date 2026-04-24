(function initializeSmallBizAiStackUtils() {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  if (!data) {
    return;
  }

  const SHOPIFY_BLUEPRINT_PRODUCT_URL = "https://utility-split-pro.myshopify.com/products/ai-blueprints?variant=47570889244902";
  const SHOPIFY_BLUEPRINT_UNLOCK_VARIANT_URL = "https://utility-split-pro.myshopify.com/products/ai-blueprints?variant=47570889244902";

  const ORDERED_SCALES = {
    teamSize: ["Solo", "2-5", "6-20", "21+"],
    monthlyBudget: ["Under $100/mo", "$100-$300/mo", "$300-$1000/mo", "$1000+/mo"],
    techComfort: ["Low", "Medium", "High"],
    complianceSensitivity: ["Low", "Medium", "High"],
    leadVolume: ["Low", "Medium", "High"],
    contentVolume: ["Low", "Medium", "High"],
    meetingVolume: ["Low", "Medium", "High"]
  };

  const NEED_LEVELS = {
    "Not Needed": 0,
    Helpful: 1,
    Essential: 2
  };

  const CAPABILITY_LEVELS = {
    "Not Focused": 0,
    Helpful: 1,
    Core: 2
  };

  const CATEGORY_COLORS = {
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

  const SALES_CHANNEL_OPTIONS = [
    "Email list / newsletter",
    "Instagram / DMs / social",
    "Online store / Shopify / Etsy",
    "Bookings / inquiries / commissions",
    "In-person / gallery / events"
  ];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatNaturalList(items) {
    const values = items.filter(Boolean);
    if (values.length === 0) {
      return "";
    }
    if (values.length === 1) {
      return values[0];
    }
    if (values.length === 2) {
      return `${values[0]} and ${values[1]}`;
    }
    return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
  }

  function isNoFilterValue(value) {
    return value == null
      || value === ""
      || value === "Any"
      || value === "All"
      || (Array.isArray(value) && value.length === 0);
  }

  function getSelectedValues(value) {
    if (Array.isArray(value)) {
      return value
        .filter(Boolean)
        .filter((entry, index, values) => values.indexOf(entry) === index && entry !== "Any" && entry !== "All");
    }

    if (isNoFilterValue(value)) {
      return [];
    }

    return [value];
  }

  function hasSelectedValue(value, candidate) {
    return getSelectedValues(value).includes(candidate);
  }

  function toSlug(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function normalizeFreeText(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ");
  }

  function getBusinessDescriptionText(state) {
    return normalizeFreeText(state && state.businessDescription).toLowerCase();
  }

  function matchesDescriptionSignal(text, pattern) {
    return Boolean(text) && pattern.test(text);
  }

  function getBusinessDescriptionSignals(state) {
    const text = getBusinessDescriptionText(state);

    return {
      text,
      hasText: Boolean(text),
      sales: matchesDescriptionSignal(text, /sell|sales|buyer|buyers|lead|leads|prospect|prospects|conversion|conversions|follow-up|followup|close more|commission|commissions|inquir(?:y|ies)|quote|quotes/),
      email: matchesDescriptionSignal(text, /newsletter|email list|email marketing|email campaign|campaign|campaigns|launch|launches|broadcast|broadcasts/),
      social: matchesDescriptionSignal(text, /instagram|tiktok|youtube|social|dm|dms|followers|audience|creator|reels|shorts/),
      store: matchesDescriptionSignal(text, /shopify|etsy|shop|store|storefront|product|products|catalog|checkout|cart/),
      bookings: matchesDescriptionSignal(text, /booking|bookings|appointment|appointments|calendar|schedule|scheduling|consultation|consultations|discovery call|call booking|quote request|commissions|inquir(?:y|ies)/),
      events: matchesDescriptionSignal(text, /gallery|galleries|event|events|booth|market|markets|fair|fairs|show|shows|pop-up|popup|exhibit|exhibits/),
      support: matchesDescriptionSignal(text, /support|customer service|customer support|help desk|helpdesk|ticket|tickets|faq|faqs|help center|chat/),
      phone: matchesDescriptionSignal(text, /phone|call|calls|voicemail|voicemails|voice/),
      meetings: matchesDescriptionSignal(text, /meeting|meetings|transcript|transcripts|notes|note cleanup|recap|recaps/),
      content: matchesDescriptionSignal(text, /content|blog|blogs|post|posts|caption|captions|video|videos|podcast|podcasts|script|scripts|repurpose|repurposing|marketing/),
      design: matchesDescriptionSignal(text, /design|creative|graphics|visual|visuals|brand|branding|thumbnail|thumbnails/),
      automation: matchesDescriptionSignal(text, /automate|automation|workflow|workflows|handoff|handoffs|integrate|integration|sync|system|systems/),
      docs: matchesDescriptionSignal(text, /sop|sops|documentation|docs|knowledge base|knowledgebase|wiki|internal docs|proposal|proposals|brief|briefs/),
      research: matchesDescriptionSignal(text, /research|analysis|analy(?:s|z)e|insight|insights|competitive|market research/),
      analytics: matchesDescriptionSignal(text, /dashboard|dashboards|reporting|reports|kpi|kpis|metrics|analytics/),
      finance: matchesDescriptionSignal(text, /bookkeeping|bookkeeper|invoice|invoices|cash flow|cashflow|expense|expenses|billing|payments|finance|financial/),
      compliance: matchesDescriptionSignal(text, /compliance|security|secure|privacy|hipaa|regulated|risk|legal review/),
      hiring: matchesDescriptionSignal(text, /hire|hiring|recruit|recruiting|candidate|candidates|resume|resumes|applicant|applicants/),
      internalOps: matchesDescriptionSignal(text, /admin|administrative|operations|ops|process|processes|cleanup|clean-up|back office/)
    };
  }

  function hasCreatorSalesIntent(state) {
    const signals = getBusinessDescriptionSignals(state);
    return state.businessType === "Creator"
      && (
        state.mainGoal === "Close More Leads"
        || signals.sales
        || signals.email
        || signals.store
        || signals.events
        || /collector|collectors|print|prints/.test(signals.text)
      );
  }

  function hasStorefrontSalesIntent(state) {
    const signals = getBusinessDescriptionSignals(state);
    return signals.store || /print|prints/.test(signals.text);
  }

  function getBudgetBand(toolConfig) {
    if (!toolConfig || typeof toolConfig.monthlyMax !== "number") {
      return "$100-$300/mo";
    }
    if (toolConfig.monthlyMax <= 100) {
      return "Under $100/mo";
    }
    if (toolConfig.monthlyMax <= 300) {
      return "$100-$300/mo";
    }
    if (toolConfig.monthlyMax <= 1000) {
      return "$300-$1000/mo";
    }
    return "$1000+/mo";
  }

  function getDisplayPrice(toolConfig) {
    const min = toolConfig.monthlyMin || 0;
    const max = toolConfig.monthlyMax || 0;
    if (min && max) {
      return min === max ? `$${min}/mo` : `$${min}-$${max}/mo`;
    }
    return getBudgetBand(toolConfig);
  }

  function getArtworkMeta(toolConfig) {
    const categoryColors = CATEGORY_COLORS[toolConfig.category] || { start: "#2b7a4b", end: "#1f5b38" };
    const badge = toolConfig.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    return {
      badge,
      start: categoryColors.start,
      end: categoryColors.end
    };
  }

  function getCategoryOptions() {
    const uniqueCategories = Array.from(new Set(data.TOOLS.map((toolConfig) => toolConfig.category))).sort((left, right) => left.localeCompare(right));
    return [data.CATEGORY_FILTER_DEFAULT, ...uniqueCategories];
  }

  function pickNearestFit(allowedValues, selectedValue, scale) {
    if (!Array.isArray(allowedValues) || isNoFilterValue(selectedValue)) {
      return "";
    }

    if (allowedValues.includes(selectedValue)) {
      return selectedValue;
    }

    const selectedIndex = scale.indexOf(selectedValue);
    if (selectedIndex === -1) {
      return allowedValues[0];
    }

    return [...allowedValues].sort((left, right) => Math.abs(scale.indexOf(left) - selectedIndex) - Math.abs(scale.indexOf(right) - selectedIndex))[0];
  }

  function scoreArrayFilter(selectedValue, candidateValues, points, reasons, label, phrase) {
    const selectedValues = getSelectedValues(selectedValue);
    if (selectedValues.length === 0) {
      return { score: 0, max: 0 };
    }

    const matchedValues = selectedValues.filter((value) => Array.isArray(candidateValues) && candidateValues.includes(value));
    const matchedRatio = matchedValues.length / selectedValues.length;
    const awardedPoints = matchedValues.length > 0
      ? Math.max(3, Math.round(points * matchedRatio))
      : 0;

    if (matchedValues.length > 0) {
      reasons.push({ label, value: formatNaturalList(matchedValues), phrase, weight: awardedPoints });
    }

    return { score: awardedPoints, max: points };
  }

  function scoreOrderedFilter(selectedValue, actualValue, scale, exactPoints, nearPoints, reasons, label, phrase) {
    if (isNoFilterValue(selectedValue)) {
      return { score: 0, max: 0 };
    }

    const selectedIndex = scale.indexOf(selectedValue);
    const actualIndex = scale.indexOf(actualValue);
    if (selectedIndex === -1 || actualIndex === -1) {
      return { score: 0, max: exactPoints };
    }

    const distance = Math.abs(selectedIndex - actualIndex);
    if (distance === 0) {
      reasons.push({ label, value: actualValue, phrase, weight: exactPoints });
      return { score: exactPoints, max: exactPoints };
    }

    if (distance === 1) {
      return { score: nearPoints, max: exactPoints };
    }

    return { score: 0, max: exactPoints };
  }

  function scoreBudgetFilter(selectedValue, toolConfig, reasons) {
    if (isNoFilterValue(selectedValue)) {
      return { score: 0, max: 0 };
    }

    const selectedIndex = ORDERED_SCALES.monthlyBudget.indexOf(selectedValue);
    const toolIndex = ORDERED_SCALES.monthlyBudget.indexOf(getBudgetBand(toolConfig));
    if (selectedIndex === -1 || toolIndex === -1) {
      return { score: 0, max: 8 };
    }

    if (toolIndex === selectedIndex) {
      reasons.push({ label: "Budget", value: getBudgetBand(toolConfig), phrase: "budget fit", weight: 8 });
      return { score: 8, max: 8 };
    }

    if (toolIndex < selectedIndex) {
      reasons.push({ label: "Budget", value: getBudgetBand(toolConfig), phrase: "comfortable monthly cost", weight: 6 });
      return { score: 6, max: 8 };
    }

    if (toolIndex === selectedIndex + 1) {
      return { score: 3, max: 8 };
    }

    return { score: 0, max: 8 };
  }

  function scoreNeedFilter(selectedValue, capability, points, reasons, label, helpfulPhrase, essentialPhrase) {
    if (isNoFilterValue(selectedValue)) {
      return { score: 0, max: 0 };
    }

    const capabilityLevel = CAPABILITY_LEVELS[capability];
    if (selectedValue === "Not Needed") {
      if (capabilityLevel === 0) {
        reasons.push({ label, value: "Lean fit", phrase: `does not bloat the stack with ${label.toLowerCase()}`, weight: 4 });
        return { score: 4, max: points };
      }
      if (capabilityLevel === 1) {
        return { score: 2, max: points };
      }
      return { score: 0, max: points };
    }

    if (selectedValue === "Helpful") {
      if (capabilityLevel >= 1) {
        reasons.push({ label, value: capability, phrase: helpfulPhrase, weight: points - 2 });
        return { score: points - 2, max: points };
      }
      return { score: 0, max: points };
    }

    if (selectedValue === "Essential") {
      if (capabilityLevel === 2) {
        reasons.push({ label, value: capability, phrase: essentialPhrase, weight: points });
        return { score: points, max: points };
      }
      if (capabilityLevel === 1) {
        return { score: Math.max(3, points - 4), max: points };
      }
      return { score: 0, max: points };
    }

    return { score: 0, max: points };
  }

  function getImplementationLabel(toolConfig) {
    const setupDifficulty = String(toolConfig && toolConfig.setupDifficulty || "").trim();

    if (setupDifficulty === "Easy") {
      return "Owner Can Set Up";
    }
    if (setupDifficulty === "Medium") {
      return "Admin / Ops Can Set Up";
    }

    return "Technical Help Likely";
  }

  function scoreTool(toolConfig, state) {
    const reasons = [];
    let score = 0;
    let maxScore = 0;

    [
      scoreArrayFilter(state.businessType, toolConfig.businessTypes, 14, reasons, "Business Type", "business fit"),
      scoreArrayFilter(state.creatorPlatform, toolConfig.creatorPlatforms, 10, reasons, "Creator Platform", "creator workflow fit"),
      scoreArrayFilter(state.integrationPlatform, toolConfig.integrationPlatforms, 10, reasons, "Platform / Integrations", "platform workflow fit"),
      scoreArrayFilter(state.languageNeed, toolConfig.languageUseCases, 10, reasons, "Language Need", "language workflow fit"),
      scoreArrayFilter(state.financeNeed, toolConfig.financeUseCases, 10, reasons, "Finance / Bookkeeping", "finance workflow fit"),
      scoreArrayFilter(state.supportChannel, toolConfig.supportChannels, 10, reasons, "Support / Chat Channel", "support workflow fit"),
      scoreArrayFilter(state.salesNeed, toolConfig.salesUseCases, 10, reasons, "Sales Need", "sales workflow fit"),
      scoreArrayFilter(state.primaryBottleneck, toolConfig.bottlenecks, 14, reasons, "Primary Bottleneck", `${String(state.primaryBottleneck || "").toLowerCase()} relief`),
      scoreArrayFilter(state.mainGoal, toolConfig.goals, 10, reasons, "Main Goal", `${String(state.mainGoal || "").toLowerCase()} priority`),
      scoreOrderedFilter(state.teamSize, pickNearestFit(toolConfig.teamSizes, state.teamSize, ORDERED_SCALES.teamSize), ORDERED_SCALES.teamSize, 8, 5, reasons, "Team Size", "good team-size fit"),
      scoreBudgetFilter(state.monthlyBudget, toolConfig, reasons),
      scoreOrderedFilter(state.techComfort, toolConfig.techComfort, ORDERED_SCALES.techComfort, 6, 4, reasons, "Tech Comfort", "easy adoption curve"),
      scoreNeedFilter(state.automationNeed, toolConfig.automationFit, 8, reasons, "Automation", "useful automation support", "strong automation coverage"),
      scoreNeedFilter(state.aiAgents, toolConfig.agentFit, 8, reasons, "AI Agents", "helpful agent support", "strong agent support"),
      scoreNeedFilter(state.meetingNotes, toolConfig.meetingFit, 8, reasons, "Meeting Notes", "meeting capture support", "strong meeting capture"),
      scoreNeedFilter(state.designContent, toolConfig.contentFit, 8, reasons, "Design & Content", "helpful content support", "strong content creation support"),
      scoreNeedFilter(state.citedResearch, toolConfig.researchFit, 8, reasons, "Cited Research", "research support", "strong cited research support"),
      scoreNeedFilter(state.knowledgeBase, toolConfig.knowledgeFit, 8, reasons, "Knowledge Base", "knowledge support", "strong internal knowledge support"),
      scoreOrderedFilter(state.complianceSensitivity, toolConfig.complianceFit, ORDERED_SCALES.complianceSensitivity, 6, 3, reasons, "Compliance", "better compliance fit"),
      scoreOrderedFilter(state.leadVolume, toolConfig.leadVolumeFit, ORDERED_SCALES.leadVolume, 5, 3, reasons, "Lead Volume", "lead volume fit"),
      scoreOrderedFilter(state.contentVolume, toolConfig.contentVolumeFit, ORDERED_SCALES.contentVolume, 5, 3, reasons, "Content Volume", "content workload fit"),
      scoreOrderedFilter(state.meetingVolume, toolConfig.meetingVolumeFit, ORDERED_SCALES.meetingVolume, 5, 3, reasons, "Meeting Volume", "meeting load fit")
    ].forEach((result) => {
      score += result.score;
      maxScore += result.max;
    });

    return {
      tool: toolConfig,
      score: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
      matchedReasons: reasons.sort((left, right) => right.weight - left.weight).slice(0, 5)
    };
  }

  function getScorePresentation(toolConfig, score, matchedReasons, hasActiveFilters) {
    if (!hasActiveFilters) {
      return {
        className: "score-featured",
        eyebrow: "Starter Stack",
        headline: "Featured Tool",
        context: `${toolConfig.category} pick for teams building a practical first AI stack.`,
        reasons: []
      };
    }

    if (score >= 85) {
      return {
        className: "score-high",
        eyebrow: "Best Fit",
        headline: `Strong Match (${score}/100)`,
        context: matchedReasons.length
          ? `Built for your ${formatNaturalList(matchedReasons.slice(0, 3).map((reason) => reason.phrase))} priorities.`
          : "Strong overall fit for your selected filters.",
        reasons: matchedReasons
      };
    }

    if (score >= 70) {
      return {
        className: "score-good",
        eyebrow: "Good Fit",
        headline: `Good Match (${score}/100)`,
        context: matchedReasons.length
          ? `Good fit around your ${formatNaturalList(matchedReasons.slice(0, 3).map((reason) => reason.phrase))} needs.`
          : "Solid fit for the current stack requirements.",
        reasons: matchedReasons
      };
    }

    if (score >= 55) {
      return {
        className: "score-medium",
        eyebrow: "Maybe Fit",
        headline: `Worth Comparing (${score}/100)`,
        context: matchedReasons.length
          ? `Useful if your ${formatNaturalList(matchedReasons.slice(0, 2).map((reason) => reason.phrase))} work matters most.`
          : "Reasonable option to compare against stronger matches.",
        reasons: matchedReasons
      };
    }

    return {
      className: "score-low",
      eyebrow: "Stretch Fit",
      headline: `Lower Match (${score}/100)`,
      context: "Could help in a narrow role, but stronger fits are ranked above.",
      reasons: matchedReasons
    };
  }

  function renderTag(label, value) {
    return `<span class="tag"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</span>`;
  }

  function renderToolArtwork(toolConfig) {
    const artwork = getArtworkMeta(toolConfig);
    return `
      <div class="tool-artwork" style="--tool-start:${escapeHtml(artwork.start)}; --tool-end:${escapeHtml(artwork.end)};">
        <span class="tool-artwork-badge" aria-hidden="true">${escapeHtml(artwork.badge)}</span>
        <small>${escapeHtml(toolConfig.category)}</small>
      </div>
    `;
  }

  function renderToolMiniPill(toolConfig) {
    const artwork = getArtworkMeta(toolConfig);
    const detailHref = `./tool-detail.html?tool=${encodeURIComponent(toSlug(toolConfig.name))}`;
    return `
      <a class="tool-mini-pill" href="${detailHref}" style="--tool-pill-start:${escapeHtml(artwork.start)}; --tool-pill-end:${escapeHtml(artwork.end)};">
        ${escapeHtml(toolConfig.name)}
        <small>${escapeHtml(toolConfig.category)}</small>
      </a>
    `;
  }

  function renderToolCard(toolConfig, score, matchedReasons, hasActiveFilters, isHomeCard) {
    const scorePresentation = getScorePresentation(toolConfig, score, matchedReasons, hasActiveFilters);
    const bestFor = toolConfig.businessTypes.slice(0, 2).join(", ");

    return `
      <article class="result-card">
        <div class="plant-image">
          ${renderToolArtwork(toolConfig)}
        </div>
        <div class="result-content">
          <div class="result-top">
            <div class="result-title">
              <h3>${escapeHtml(toolConfig.name)}</h3>
              <p class="latin-name">${escapeHtml(toolConfig.category)} &middot; ${escapeHtml(getDisplayPrice(toolConfig))}</p>
            </div>
            <div class="result-score-stack">
              <div class="score-pill ${escapeHtml(scorePresentation.className)}">
                <small>${escapeHtml(scorePresentation.eyebrow)}</small>
                <span>${escapeHtml(scorePresentation.headline)}</span>
              </div>
              <p class="score-context">${escapeHtml(scorePresentation.context)}</p>
            </div>
          </div>
          <p class="summary-copy">${escapeHtml(toolConfig.summary)}</p>
          <p class="summary-copy tool-secondary-copy"><strong>Best first use case:</strong> ${escapeHtml(toolConfig.firstUseCase)}</p>
          ${scorePresentation.reasons.length > 0
            ? `<div class="match-reason-list">${scorePresentation.reasons.map((reason) => `
                <span class="match-reason">
                  <span class="match-reason-check" aria-hidden="true">&#10003;</span>
                  <span>${escapeHtml(reason.label)}: ${escapeHtml(reason.value)}</span>
                </span>
              `).join("")}</div>`
            : ""}
          <div class="tag-grid">
            ${renderTag("Category", toolConfig.category)}
            ${renderTag("Budget", getBudgetBand(toolConfig))}
            ${renderTag("Setup", toolConfig.setupDifficulty)}
            ${renderTag("Implementation", getImplementationLabel(toolConfig))}
            ${renderTag("Time To Value", toolConfig.timeToValue)}
            ${renderTag("Best For", bestFor)}
          </div>
          <div class="result-link-row">
            <a class="guide-button" href="./tool-detail.html?tool=${encodeURIComponent(toSlug(toolConfig.name))}">View Details</a>
            <button class="secondary-button compact-button" type="button" data-compare-tool="${escapeHtml(toSlug(toolConfig.name))}" data-compare-default-label="Add to Compare" data-compare-added-label="In Compare" aria-pressed="false">Add to Compare</button>
            ${isHomeCard ? `<a class="guide-button" href="./articles.html">Use Cases</a>` : `<a class="guide-button" href="./index.html?businessType=${encodeURIComponent(toolConfig.businessTypes[0] || "Any")}">Run Planner</a>`}
          </div>
        </div>
      </article>
    `;
  }

  function groupEntriesByCategory(entries) {
    return entries.reduce((groups, entry) => {
      const category = entry.tool.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(entry);
      return groups;
    }, {});
  }

  function buildToolCategoryPalette() {
    const categories = getCategoryOptions().filter((category) => category !== data.CATEGORY_FILTER_DEFAULT);

    return `
      <div class="tool-category-browser-grid">
        ${categories.map((category) => {
          const categoryColors = CATEGORY_COLORS[category] || { start: "#2b7a4b", end: "#1f5b38" };
          const tools = data.TOOLS
            .filter((toolConfig) => toolConfig.category === category)
            .sort((left, right) => left.name.localeCompare(right.name));
          const badge = category
            .split(/\s+/)
            .filter(Boolean)
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return `
            <article class="tool-category-browser-card" style="--category-start:${escapeHtml(categoryColors.start)}; --category-end:${escapeHtml(categoryColors.end)};">
              <div class="tool-category-browser-head">
                <span class="tool-category-browser-badge" aria-hidden="true">${escapeHtml(badge)}</span>
                <div class="tool-category-browser-heading">
                  <h3>${escapeHtml(category)}</h3>
                  <p>${tools.length} tool${tools.length === 1 ? "" : "s"}</p>
                </div>
              </div>
              <div class="tool-category-browser-chips">
                ${tools.map((toolConfig) => `
                  <a
                    class="tool-category-browser-chip"
                    href="./tool-detail.html?tool=${encodeURIComponent(toSlug(toolConfig.name))}"
                    style="--tool-pill-start:${escapeHtml(categoryColors.start)}; --tool-pill-end:${escapeHtml(categoryColors.end)};"
                  >${escapeHtml(toolConfig.name)}</a>
                `).join("")}
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function getDefaultHomeResults() {
    return [...data.TOOLS]
      .sort((left, right) => right.featuredWeight - left.featuredWeight || left.name.localeCompare(right.name))
      .slice(0, data.DEFAULT_HOME_RESULTS_LIMIT)
      .map((toolConfig) => ({ tool: toolConfig, score: 0, matchedReasons: [] }));
  }

  function normalizeSearchText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function compactSearchText(value) {
    return normalizeSearchText(value).replace(/\s+/g, "");
  }

  function getToolSearchRank(toolConfig, query) {
    const normalizedQuery = normalizeSearchText(query);
    const compactQuery = compactSearchText(query);

    if (!normalizedQuery) {
      return 99;
    }

    const nameText = normalizeSearchText(toolConfig.name);
    const compactName = compactSearchText(toolConfig.name);
    const categoryText = normalizeSearchText(toolConfig.category);
    const summaryText = normalizeSearchText([
      toolConfig.summary,
      toolConfig.firstUseCase,
      getImplementationLabel(toolConfig),
      toolConfig.setupDifficulty,
      (toolConfig.creatorPlatforms || []).join(" "),
      (toolConfig.integrationPlatforms || []).join(" "),
      (toolConfig.languageUseCases || []).join(" "),
      (toolConfig.financeUseCases || []).join(" "),
      (toolConfig.supportChannels || []).join(" "),
      (toolConfig.salesUseCases || []).join(" "),
      toolConfig.agentFit || "",
      toolConfig.businessTypes.join(" "),
      toolConfig.bottlenecks.join(" "),
      toolConfig.goals.join(" ")
    ].join(" "));

    if (nameText === normalizedQuery || compactName === compactQuery) {
      return 0;
    }
    if (nameText.startsWith(normalizedQuery)) {
      return 1;
    }
    if (nameText.includes(normalizedQuery) || compactName.includes(compactQuery)) {
      return 2;
    }
    if (categoryText.startsWith(normalizedQuery)) {
      return 3;
    }
    if (categoryText.includes(normalizedQuery)) {
      return 4;
    }
    if (summaryText.includes(normalizedQuery)) {
      return 5;
    }

    return 99;
  }

  function filterToolsBySearch(tools, query) {
    const normalizedQuery = String(query || "").trim().toLowerCase();
    if (!normalizedQuery) {
      return [...tools];
    }

    return tools
      .filter((toolConfig) => [
        toolConfig.name,
        toolConfig.category,
        toolConfig.summary,
        toolConfig.firstUseCase,
        getImplementationLabel(toolConfig),
        toolConfig.setupDifficulty,
        (toolConfig.creatorPlatforms || []).join(" "),
        (toolConfig.integrationPlatforms || []).join(" "),
        (toolConfig.languageUseCases || []).join(" "),
        (toolConfig.financeUseCases || []).join(" "),
        (toolConfig.supportChannels || []).join(" "),
        (toolConfig.salesUseCases || []).join(" "),
        toolConfig.agentFit || "",
        toolConfig.businessTypes.join(" "),
        toolConfig.bottlenecks.join(" "),
        toolConfig.goals.join(" ")
      ].join(" ").toLowerCase().includes(normalizedQuery))
      .sort((left, right) =>
        getToolSearchRank(left, normalizedQuery) - getToolSearchRank(right, normalizedQuery)
        || right.featuredWeight - left.featuredWeight
        || left.name.localeCompare(right.name)
      );
  }

  function filterToolsForView(tools, view) {
    if (!view || view === "all") {
      return [...tools];
    }

    if (view === "service") {
      return tools.filter((toolConfig) => toolConfig.businessTypes.includes("Local Service"));
    }
    if (view === "agency") {
      return tools.filter((toolConfig) => toolConfig.businessTypes.includes("Agency"));
    }
    if (view === "consultant") {
      return tools.filter((toolConfig) => toolConfig.businessTypes.includes("Consultant") || toolConfig.businessTypes.includes("Coach"));
    }
    if (view === "creator") {
      return tools.filter((toolConfig) => toolConfig.businessTypes.includes("Creator") || (toolConfig.creatorPlatforms || []).length > 0);
    }
    if (view === "solo") {
      return tools.filter((toolConfig) => toolConfig.teamSizes.includes("Solo"));
    }
    if (view === "automation") {
      return tools.filter((toolConfig) => toolConfig.category === "Automation" || toolConfig.automationFit === "Core");
    }
    if (view === "meetings") {
      return tools.filter((toolConfig) => toolConfig.category === "Meetings" || toolConfig.meetingFit === "Core");
    }
    if (view === "content") {
      return tools.filter((toolConfig) => toolConfig.contentFit === "Core" || toolConfig.category === "Design" || toolConfig.category === "Content Studio");
    }
    if (view === "support") {
      return tools.filter((toolConfig) => toolConfig.category === "Support" || toolConfig.category === "Voice / Phone AI" || toolConfig.bottlenecks.includes("Customer Support"));
    }

    return [...tools];
  }

  function getViewLabel(view) {
    const match = data.COLLECTION_VIEWS.find((entry) => entry.value === view);
    return match ? match.label : "All AI Tools";
  }

  function getViewCopy(view) {
    if (view === "service") {
      return "This view highlights AI tools that help local service teams handle leads faster, automate follow-up, and reduce admin drag.";
    }
    if (view === "agency") {
      return "This view emphasizes tools that help agencies move faster on content, delivery, meetings, and internal ops.";
    }
    if (view === "consultant") {
      return "This view focuses on solo and advisory teams that need better research, cleaner writing, and less meeting follow-up work.";
    }
    if (view === "creator") {
      return "This view highlights tools that help creators plan, clip, publish, automate, and monetize TikTok, Instagram, and YouTube workflows faster.";
    }
    if (view === "solo") {
      return "This view filters toward tools with lighter setup and faster time-to-value for solo founders and lean teams.";
    }
    if (view === "automation") {
      return "This view surfaces the tools most useful for connecting systems and replacing repetitive back-office steps.";
    }
    if (view === "meetings") {
      return "This view prioritizes tools that capture call notes, reduce meeting recap work, and route decisions into systems.";
    }
    if (view === "content") {
      return "This view centers on content, design, repurposing, and marketing execution for teams that ship often.";
    }
    if (view === "support") {
      return "This view collects tools that help with inbound questions, phone conversations, customer service, and support-side automation.";
    }
    return "Browse the full AI stack database, grouped by role so small businesses can compare the tools without guessing.";
  }

  function getWorkflowSuggestion(state, stackTools) {
    if (state.financeNeed === "Bookkeeping") {
      return "Transactions and receipts -> AI categorization -> quick review -> cleaner books and month-end snapshot";
    }
    if (state.financeNeed === "Invoices & Payments") {
      return "Estimate or invoice -> AI reminder -> payment follow-up -> cash collected update";
    }
    if (state.financeNeed === "Cash Flow Insights") {
      return "Books and payments data -> AI analysis -> cash flow insight -> owner action plan";
    }
    if (state.financeNeed === "Tax / Sales Tax") {
      return "Transactions -> AI categorization and tax check -> flagged issues -> compliance follow-up";
    }
    if (state.supportChannel === "Website Chat") {
      return "Website question -> AI answer or triage -> human handoff -> CRM or ticket update";
    }
    if (state.supportChannel === "Email") {
      return "Inbound email -> AI draft -> agent review -> ticket or follow-up";
    }
    if (state.supportChannel === "Phone") {
      return "Call or voicemail -> AI transcript and summary -> owner handoff -> CRM or next step";
    }
    if (state.supportChannel === "DMs / Social") {
      return "Social message or DM -> AI reply draft -> lead or support route -> follow-up";
    }
    if (state.supportChannel === "Help Center") {
      return "Help-center question -> AI answer -> fallback to team -> content improvement loop";
    }
    if (state.salesNeed === "Lead Capture") {
      return "New inquiry -> AI qualification -> CRM record -> owner response";
    }
    if (state.salesNeed === "Lead Follow-Up") {
      return "New lead -> AI summary -> CRM update -> owner follow-up task";
    }
    if (state.salesNeed === "Proposal Drafting") {
      return "Discovery notes -> AI proposal draft -> human edits -> send and follow-up reminder";
    }
    if (state.salesNeed === "Pipeline Updates") {
      return "Meeting or inquiry -> AI summary -> pipeline update -> next-step task";
    }
    if (state.languageNeed === "Text Translation") {
      return "Source text or document -> AI translation -> quick human review -> publish or send";
    }
    if (state.languageNeed === "Multilingual Writing") {
      return "Draft -> multilingual AI polish -> brand or legal review -> send or publish";
    }
    if (state.languageNeed === "Live Meeting Translation") {
      return "Live meeting or conversation -> translated captions or speech -> summary -> follow-up notes";
    }
    if (state.languageNeed === "Video Dubbing") {
      return "Source video -> dubbed version -> proofread script -> publish to the target audience";
    }
    if (state.languageNeed === "Subtitles / Localization") {
      return "Transcript -> translated captions -> localized edit -> export and publish";
    }
    if (hasSelectedValue(state.integrationPlatform, "Shopify")) {
      return "Product or offer update -> AI copy and creative -> store or email sync -> customer follow-up";
    }
    if (hasSelectedValue(state.integrationPlatform, "Meta")) {
      return "Offer or content idea -> AI ad and post variants -> Meta creative and DM capture -> follow-up workflow";
    }
    if (hasSelectedValue(state.integrationPlatform, "LinkedIn")) {
      return "Idea -> LinkedIn draft -> visual asset -> publish queue -> lead capture or meeting booking";
    }
    if (hasSelectedValue(state.integrationPlatform, "Google Workspace")) {
      return "Inbox or doc draft -> AI summary -> shared workspace update -> next-step task";
    }
    if (hasSelectedValue(state.integrationPlatform, "Microsoft 365")) {
      return "Meeting or inbox thread -> AI summary -> document or CRM update -> owner follow-up";
    }
    if (hasSelectedValue(state.integrationPlatform, "Slack")) {
      return "Inbound update -> AI summary -> Slack alert -> task or customer handoff";
    }
    if (hasSelectedValue(state.integrationPlatform, "HubSpot")) {
      return "New inquiry -> AI summary -> HubSpot record -> pipeline task and follow-up";
    }
    if (hasSelectedValue(state.integrationPlatform, "Calendly")) {
      return "Lead capture -> booking link -> reminder sequence -> meeting notes and next steps";
    }
    if (hasSelectedValue(state.integrationPlatform, "Notion")) {
      return "Source material -> AI summary -> Notion workspace update -> team execution checklist";
    }
    if (state.aiAgents === "Helpful" || state.aiAgents === "Essential") {
      return "Customer request or internal trigger -> AI agent triage -> system lookup -> draft action or human handoff";
    }
    const selectedCreatorPlatforms = getSelectedValues(state.creatorPlatform)
      .filter((platform) => ["TikTok", "Instagram", "YouTube"].includes(platform));
    if (selectedCreatorPlatforms.length > 0) {
      return `Long-form idea or recording -> ${formatNaturalList(selectedCreatorPlatforms)} content draft and assets -> publish queue -> lead or audience follow-up`;
    }
    if (state.primaryBottleneck === "Lead Follow-Up") {
      return "New lead -> AI summary -> CRM update -> owner follow-up task";
    }
    if (state.primaryBottleneck === "Meetings") {
      return "Meeting transcript -> action items -> project update -> client recap";
    }
    if (state.primaryBottleneck === "Content Creation") {
      return "Brief -> AI draft -> design pass -> publish checklist";
    }
    if (state.primaryBottleneck === "Customer Support") {
      return "Inbound question -> AI answer draft -> handoff or booking link";
    }
    if (state.primaryBottleneck === "Scheduling") {
      return "Lead form -> booking link -> reminder sequence -> meeting notes";
    }

    if (stackTools.some((toolConfig) => toolConfig.category === "Automation")) {
      return "Form submission -> AI summary -> task creation -> owner notification";
    }

    return "Inbox or form -> AI draft -> team review -> next-step task";
  }

  function mergePriorityCategories(...groups) {
    const merged = [];
    const seen = new Set();

    groups.flat().forEach((category) => {
      if (!category || seen.has(category)) {
        return;
      }

      seen.add(category);
      merged.push(category);
    });

    return merged;
  }

  function getBottleneckPriorityCategories(state) {
    if (state.primaryBottleneck === "Lead Follow-Up") {
      return ["Core Assistant", "CRM", "Automation", "Scheduling", "Support", "Meetings"];
    }
    if (state.primaryBottleneck === "Content Creation") {
      if (hasCreatorSalesIntent(state)) {
        return ["Core Assistant", "CRM", "Design", "Content Studio", "Automation", "Research", "Workspace"];
      }
      return ["Core Assistant", "Design", "Content Studio", "Research", "Workspace"];
    }
    if (state.primaryBottleneck === "Admin Work") {
      return ["Automation", "Project Ops", "Workspace", "Scheduling", "Meetings"];
    }
    if (state.primaryBottleneck === "Meetings") {
      return ["Meetings", "Core Assistant", "Workspace", "Project Ops", "Scheduling"];
    }
    if (state.primaryBottleneck === "Research") {
      return ["Research", "Core Assistant", "Workspace", "Content Studio"];
    }
    if (state.primaryBottleneck === "Customer Support") {
      return ["Support", "Voice / Phone AI", "Core Assistant", "CRM", "Automation", "Workspace"];
    }
    if (state.primaryBottleneck === "Internal Docs") {
      return ["Workspace", "Core Assistant", "Project Ops", "Meetings", "Automation"];
    }
    if (state.primaryBottleneck === "Scheduling") {
      return ["Scheduling", "CRM", "Automation", "Meetings", "Core Assistant"];
    }

    return [];
  }

  function getBusinessPriorityCategories(state) {
    if (state.businessType === "Local Service") {
      return ["CRM", "Scheduling", "Automation", "Core Assistant", "Support"];
    }
    if (state.businessType === "Agency") {
      return ["Core Assistant", "Project Ops", "Meetings", "Workspace", "Content Studio", "Design", "Analytics / BI"];
    }
    if (state.businessType === "Consultant" || state.businessType === "Coach") {
      return ["Core Assistant", "Research", "Meetings", "Workspace", "Scheduling"];
    }
    if (state.businessType === "Creator") {
      if (hasCreatorSalesIntent(state)) {
        return ["CRM", "Design", "Content Studio", "Automation", "Core Assistant", "Scheduling", "Research"];
      }
      return ["Content Studio", "Design", "Automation", "CRM", "Core Assistant", "Scheduling", "Research"];
    }
    if (state.businessType === "Ecommerce") {
      return ["Automation", "Support", "Ecommerce Personalization", "Content Studio", "Design", "CRM", "Analytics / BI"];
    }
    if (state.businessType === "Real Estate") {
      return ["CRM", "Meetings", "Core Assistant", "Automation", "Scheduling", "Research"];
    }
    if (state.businessType === "Legal") {
      return ["Core Assistant", "Research", "Workspace", "Meetings", "Scheduling"];
    }
    if (state.businessType === "Medical/Dental") {
      return ["Scheduling", "CRM", "Automation", "Core Assistant", "Workspace"];
    }
    if (state.businessType === "SaaS") {
      return ["Support", "Project Ops", "Workspace", "Automation", "Security / Compliance", "Core Assistant", "Analytics / BI"];
    }

    return [];
  }

  function getGoalPriorityCategories(state) {
    if (state.mainGoal === "Save Time") {
      return ["Automation", "Core Assistant", "Project Ops", "Meetings", "Workspace"];
    }
    if (state.mainGoal === "Close More Leads") {
      if (state.businessType === "Creator") {
        return ["CRM", "Design", "Content Studio", "Automation", "Core Assistant", "Support"];
      }
      return ["CRM", "Scheduling", "Automation", "Core Assistant", "Support"];
    }
    if (state.mainGoal === "Create Content Faster") {
      return ["Core Assistant", "Content Studio", "Design", "Research", "Workspace"];
    }
    if (state.mainGoal === "Improve Service") {
      return ["Support", "Voice / Phone AI", "Scheduling", "CRM", "Meetings", "Core Assistant"];
    }
    if (state.mainGoal === "Reduce Busywork") {
      return ["Automation", "Workspace", "Project Ops", "Meetings", "Core Assistant"];
    }

    return [];
  }

  function getNeedDrivenPriorityCategories(state) {
    const categories = [];
    const descriptionSignals = getBusinessDescriptionSignals(state);

    if (hasCreatorSalesIntent(state)) {
      categories.push("CRM", "Design", "Automation", "Content Studio");
      if (hasStorefrontSalesIntent(state)) {
        categories.push("Ecommerce Personalization");
      }
    }

    if (state.salesChannelFocus === "Email list / newsletter") {
      categories.push("CRM", "Automation", "Content Studio", "Design");
    }
    if (state.salesChannelFocus === "Instagram / DMs / social") {
      categories.push("CRM", "Automation", "Content Studio", "Design", "Support");
    }
    if (state.salesChannelFocus === "Online store / Shopify / Etsy") {
      categories.push("Ecommerce Personalization", "CRM", "Automation", "Design", "Content Studio");
    }
    if (state.salesChannelFocus === "Bookings / inquiries / commissions") {
      categories.push("CRM", "Scheduling", "Automation", "Support", "Core Assistant");
    }
    if (state.salesChannelFocus === "In-person / gallery / events") {
      categories.push("CRM", "Content Studio", "Design", "Automation");
    }

    if (!isNoFilterValue(state.creatorPlatform)) {
      categories.push("Content Studio", "Design", "Automation", "CRM", "Scheduling", "Research");
    }
    if (state.financeNeed === "Bookkeeping") {
      categories.push("Finance", "Automation", "Workspace");
    }
    if (state.financeNeed === "Invoices & Payments") {
      categories.push("Finance", "Automation", "CRM");
    }
    if (state.financeNeed === "Cash Flow Insights") {
      categories.push("Finance", "Workspace", "Research");
    }
    if (state.financeNeed === "Tax / Sales Tax") {
      categories.push("Finance", "Workspace");
    }
    if (state.supportChannel === "Website Chat" || state.supportChannel === "Email" || state.supportChannel === "Help Center") {
      categories.push("Support", "CRM", "Automation");
    }
    if (state.supportChannel === "Phone") {
      categories.push("Voice / Phone AI", "Support", "CRM", "Scheduling", "Automation");
    }
    if (state.supportChannel === "DMs / Social") {
      categories.push("Support", "CRM", "Automation", "Content Studio");
    }
    if (state.salesNeed === "Lead Capture") {
      categories.push("CRM", "Support", "Scheduling", "Automation");
    }
    if (state.salesNeed === "Lead Follow-Up") {
      categories.push("CRM", "Automation", "Scheduling", "Core Assistant");
    }
    if (state.salesNeed === "Proposal Drafting") {
      categories.push("Core Assistant", "CRM", "Workspace", "Content Studio");
    }
    if (state.salesNeed === "Pipeline Updates") {
      categories.push("CRM", "Automation", "Meetings");
    }
    if (state.languageNeed === "Text Translation") {
      categories.push("Content Studio", "Workspace", "Research");
    }
    if (state.languageNeed === "Multilingual Writing") {
      categories.push("Content Studio", "Workspace");
    }
    if (state.languageNeed === "Live Meeting Translation") {
      categories.push("Meetings", "Workspace");
    }
    if (state.languageNeed === "Video Dubbing" || state.languageNeed === "Subtitles / Localization") {
      categories.push("Content Studio", "Design", "Research");
    }
    if (state.aiAgents === "Helpful" || state.aiAgents === "Essential") {
      categories.push("Automation", "Core Assistant", "Support", "Research", "Workspace");
    }
    if (hasSelectedValue(state.integrationPlatform, "Shopify")) {
      categories.push("Ecommerce Personalization", "CRM", "Automation", "Design", "Content Studio");
    }
    if (hasSelectedValue(state.integrationPlatform, "Meta")) {
      categories.push("Content Studio", "Design", "CRM", "Automation", "Core Assistant");
    }
    if (hasSelectedValue(state.integrationPlatform, "LinkedIn")) {
      categories.push("Content Studio", "Core Assistant", "Design", "CRM", "Scheduling", "Recruiting / HR");
    }
    if (hasSelectedValue(state.integrationPlatform, "Instagram") || hasSelectedValue(state.integrationPlatform, "TikTok") || hasSelectedValue(state.integrationPlatform, "YouTube")) {
      categories.push("Content Studio", "Design", "Automation", "Research", "CRM", "Scheduling");
    }
    if (hasSelectedValue(state.integrationPlatform, "Google Workspace")) {
      categories.push("Workspace", "Core Assistant", "Automation", "Meetings");
    }
    if (hasSelectedValue(state.integrationPlatform, "Microsoft 365")) {
      categories.push("Workspace", "Meetings", "Core Assistant", "Analytics / BI");
    }
    if (hasSelectedValue(state.integrationPlatform, "Slack")) {
      categories.push("Workspace", "Automation", "Meetings", "Project Ops");
    }
    if (hasSelectedValue(state.integrationPlatform, "HubSpot")) {
      categories.push("CRM", "Automation", "Meetings", "Scheduling");
    }
    if (hasSelectedValue(state.integrationPlatform, "Notion")) {
      categories.push("Workspace", "Core Assistant", "Project Ops");
    }
    if (hasSelectedValue(state.integrationPlatform, "Calendly")) {
      categories.push("Scheduling", "CRM", "Automation", "Meetings");
    }

    if (state.automationNeed === "Helpful" || state.automationNeed === "Essential") {
      categories.push("Automation");
    }
    if (state.meetingNotes === "Helpful" || state.meetingNotes === "Essential") {
      categories.push("Meetings");
    }
    if (state.designContent === "Helpful" || state.designContent === "Essential") {
      categories.push("Content Studio", "Design");
    }
    if (state.citedResearch === "Helpful" || state.citedResearch === "Essential") {
      categories.push("Research");
    }
    if (state.knowledgeBase === "Helpful" || state.knowledgeBase === "Essential") {
      categories.push("Workspace", "Project Ops");
    }
    if (state.complianceSensitivity === "High") {
      categories.push("Security / Compliance", "Workspace", "Core Assistant");
    }

    if (descriptionSignals.email) {
      categories.push("CRM", "Automation", "Content Studio");
    }
    if (descriptionSignals.social) {
      categories.push("CRM", "Automation", "Content Studio", "Design");
    }
    if (descriptionSignals.store) {
      categories.push("Ecommerce Personalization", "CRM", "Automation", "Design");
    }
    if (descriptionSignals.bookings) {
      categories.push("Scheduling", "CRM", "Automation");
    }
    if (descriptionSignals.events) {
      categories.push("CRM", "Content Studio", "Design");
    }
    if (descriptionSignals.support) {
      categories.push("Support", "CRM", "Automation");
    }
    if (descriptionSignals.phone) {
      categories.push("Voice / Phone AI", "Support", "CRM");
    }
    if (descriptionSignals.meetings) {
      categories.push("Meetings", "Core Assistant", "Workspace");
    }
    if (descriptionSignals.docs || descriptionSignals.internalOps) {
      categories.push("Workspace", "Project Ops", "Core Assistant");
    }
    if (descriptionSignals.automation) {
      categories.push("Automation", "Project Ops", "Workspace");
    }
    if (descriptionSignals.content) {
      categories.push("Content Studio", "Design", "Core Assistant");
    }
    if (descriptionSignals.design) {
      categories.push("Design", "Content Studio");
    }
    if (descriptionSignals.research) {
      categories.push("Research", "Core Assistant");
    }
    if (descriptionSignals.analytics) {
      categories.push("Analytics / BI", "Research", "Workspace");
    }
    if (descriptionSignals.finance) {
      categories.push("Finance", "Automation", "Workspace");
    }
    if (descriptionSignals.compliance) {
      categories.push("Security / Compliance", "Workspace", "Core Assistant");
    }
    if (descriptionSignals.hiring) {
      categories.push("Recruiting / HR", "CRM", "Automation");
    }

    return categories;
  }

  function getPriorityCategories(state) {
    return mergePriorityCategories(
      getBottleneckPriorityCategories(state),
      getNeedDrivenPriorityCategories(state),
      getBusinessPriorityCategories(state),
      getGoalPriorityCategories(state),
      ["Core Assistant", "Automation", "Workspace", "Meetings", "CRM"]
    );
  }

  function getBudgetTierAdjustment(toolConfig, state, tierName) {
    const toolBand = getBudgetBand(toolConfig);
    const toolBandIndex = ORDERED_SCALES.monthlyBudget.indexOf(toolBand);
    const selectedBandIndex = ORDERED_SCALES.monthlyBudget.indexOf(state.monthlyBudget);

    if (selectedBandIndex === -1 || toolBandIndex === -1) {
      if (toolConfig.monthlyMax <= 100) {
        return 5;
      }
      if (toolConfig.monthlyMax <= 300) {
        return 2;
      }
      return tierName === "starter" ? -4 : 0;
    }

    const distance = toolBandIndex - selectedBandIndex;
    const overPenalty = tierName === "starter" ? 12 : tierName === "growth" ? 8 : 5;
    const underBudgetBoost = tierName === "starter" ? 6 : tierName === "growth" ? 5 : 3;

    if (distance === 0) {
      return 4;
    }

    if (distance < 0) {
      return Math.min(8, underBudgetBoost + Math.abs(distance) * 2);
    }

    return -distance * overPenalty;
  }

  function getSetupFrictionPenalty(toolConfig, state) {
    if (state.techComfort === "Low") {
      if (toolConfig.setupDifficulty === "Hard") {
        return 10;
      }
      if (toolConfig.setupDifficulty === "Medium") {
        return 3;
      }
      return 0;
    }

    if (state.techComfort === "Medium" && toolConfig.setupDifficulty === "Hard") {
      return 5;
    }

    return 0;
  }

  function getNeedTierBoost(toolConfig, state) {
    let boost = 0;

    if (state.automationNeed === "Essential") {
      boost += toolConfig.automationFit === "Core" ? 8 : toolConfig.automationFit === "Helpful" ? 4 : 0;
      boost += toolConfig.category === "Automation" ? 3 : 0;
    } else if (state.automationNeed === "Helpful") {
      boost += toolConfig.automationFit === "Core" ? 5 : toolConfig.automationFit === "Helpful" ? 2 : 0;
    }

    if (state.meetingNotes === "Essential") {
      boost += toolConfig.meetingFit === "Core" ? 8 : toolConfig.meetingFit === "Helpful" ? 4 : 0;
      boost += toolConfig.category === "Meetings" ? 3 : 0;
    } else if (state.meetingNotes === "Helpful") {
      boost += toolConfig.meetingFit === "Core" ? 5 : toolConfig.meetingFit === "Helpful" ? 2 : 0;
    }

    if (state.designContent === "Essential") {
      boost += toolConfig.contentFit === "Core" ? 8 : toolConfig.contentFit === "Helpful" ? 4 : 0;
      boost += toolConfig.category === "Design" || toolConfig.category === "Content Studio" ? 3 : 0;
    } else if (state.designContent === "Helpful") {
      boost += toolConfig.contentFit === "Core" ? 5 : toolConfig.contentFit === "Helpful" ? 2 : 0;
    }

    if (state.citedResearch === "Essential") {
      boost += toolConfig.researchFit === "Core" ? 8 : toolConfig.researchFit === "Helpful" ? 4 : 0;
      boost += toolConfig.category === "Research" ? 3 : 0;
    } else if (state.citedResearch === "Helpful") {
      boost += toolConfig.researchFit === "Core" ? 5 : toolConfig.researchFit === "Helpful" ? 2 : 0;
    }

    if (state.knowledgeBase === "Essential") {
      boost += toolConfig.knowledgeFit === "Core" ? 8 : toolConfig.knowledgeFit === "Helpful" ? 4 : 0;
      boost += toolConfig.category === "Workspace" || toolConfig.category === "Project Ops" ? 3 : 0;
    } else if (state.knowledgeBase === "Helpful") {
      boost += toolConfig.knowledgeFit === "Core" ? 5 : toolConfig.knowledgeFit === "Helpful" ? 2 : 0;
    }

    return boost;
  }

  function getComplianceTierBoost(toolConfig, state) {
    if (state.complianceSensitivity === "High") {
      if (toolConfig.complianceFit === "High") {
        return 8;
      }
      if (toolConfig.complianceFit === "Medium") {
        return 3;
      }
      return -6;
    }

    if (state.complianceSensitivity === "Medium") {
      if (toolConfig.complianceFit === "High") {
        return 4;
      }
      if (toolConfig.complianceFit === "Medium") {
        return 2;
      }
    }

    return 0;
  }

  function getDescriptionTierBoost(toolConfig, state, tierName) {
    const descriptionSignals = getBusinessDescriptionSignals(state);
    const isStarter = tierName === "starter";

    if (!descriptionSignals.hasText) {
      return 0;
    }

    let boost = 0;

    if (hasCreatorSalesIntent(state)) {
      if (toolConfig.name === "Mailchimp") {
        boost += isStarter ? 14 : 10;
      }

      if (toolConfig.category === "CRM") {
        boost += isStarter ? 8 : 5;
      }

      if (toolConfig.category === "Automation") {
        boost += 3;
      }

      if (toolConfig.category === "Content Studio" && state.mainGoal === "Close More Leads" && !descriptionSignals.social) {
        boost -= isStarter ? 3 : 1;
      }
    }

    if (descriptionSignals.email) {
      if (toolConfig.name === "Kit") {
        boost += isStarter ? 18 : 12;
      }
      if (toolConfig.name === "Mailchimp") {
        boost += isStarter ? 14 : 10;
      }
      if (toolConfig.name === "Klaviyo") {
        boost += isStarter ? 12 : 9;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 6 : 4;
      }
      if (toolConfig.category === "Automation") {
        boost += 3;
      }
    }

    if (descriptionSignals.social) {
      if (toolConfig.name === "ManyChat") {
        boost += isStarter ? 18 : 12;
      }
      if (toolConfig.name === "Opus Clip") {
        boost += isStarter ? 10 : 7;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 6 : 4;
      }
      if (toolConfig.category === "Automation") {
        boost += isStarter ? 5 : 3;
      }
      if (toolConfig.category === "Content Studio") {
        boost += 4;
      }
      if (toolConfig.category === "Design") {
        boost += 3;
      }
    }

    if (descriptionSignals.store) {
      if (toolConfig.name === "Shopify Magic") {
        boost += isStarter ? 18 : 12;
      }
      if (toolConfig.name === "Rebuy") {
        boost += isStarter ? 15 : 11;
      }
      if (toolConfig.name === "Gorgias" || toolConfig.name === "Klaviyo") {
        boost += isStarter ? 12 : 9;
      }
      if (toolConfig.category === "Ecommerce Personalization") {
        boost += isStarter ? 8 : 6;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 5 : 4;
      }
      if (toolConfig.category === "Automation") {
        boost += 3;
      }
    }

    if (descriptionSignals.bookings) {
      if (toolConfig.name === "Calendly") {
        boost += isStarter ? 15 : 10;
      }
      if (toolConfig.category === "Scheduling") {
        boost += isStarter ? 10 : 7;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 8 : 5;
      }
      if (toolConfig.category === "Automation") {
        boost += 4;
      }
    }

    if (descriptionSignals.support) {
      if (toolConfig.name === "Intercom Fin" || toolConfig.name === "Zendesk AI Agents") {
        boost += isStarter ? 16 : 12;
      }
      if (toolConfig.name === "Gorgias") {
        boost += isStarter ? 13 : 10;
      }
      if (toolConfig.category === "Support") {
        boost += isStarter ? 10 : 7;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 5 : 4;
      }
    }

    if (descriptionSignals.phone) {
      if (toolConfig.name === "Dialpad AI") {
        boost += isStarter ? 16 : 12;
      }
      if (toolConfig.category === "Voice / Phone AI") {
        boost += isStarter ? 10 : 7;
      }
      if (toolConfig.category === "Support") {
        boost += 4;
      }
    }

    if (descriptionSignals.meetings) {
      if (toolConfig.name === "Otter" || toolConfig.name === "Fireflies") {
        boost += isStarter ? 15 : 10;
      }
      if (toolConfig.category === "Meetings") {
        boost += isStarter ? 10 : 7;
      }
      if (toolConfig.category === "Workspace" || toolConfig.category === "Core Assistant") {
        boost += 3;
      }
    }

    if (descriptionSignals.docs || descriptionSignals.internalOps) {
      if (toolConfig.name === "Notion AI") {
        boost += isStarter ? 14 : 10;
      }
      if (toolConfig.category === "Workspace") {
        boost += isStarter ? 8 : 6;
      }
      if (toolConfig.category === "Project Ops") {
        boost += isStarter ? 7 : 5;
      }
      if (toolConfig.category === "Core Assistant") {
        boost += 3;
      }
    }

    if (descriptionSignals.automation) {
      if (toolConfig.name === "Zapier") {
        boost += isStarter ? 14 : 10;
      }
      if (toolConfig.category === "Automation") {
        boost += isStarter ? 10 : 7;
      }
      if (toolConfig.category === "Project Ops") {
        boost += 3;
      }
    }

    if (descriptionSignals.content) {
      if (toolConfig.category === "Content Studio") {
        boost += isStarter ? 7 : 5;
      }
      if (toolConfig.name === "Canva") {
        boost += isStarter ? 6 : 4;
      }
    }

    if (descriptionSignals.design) {
      if (toolConfig.name === "Canva") {
        boost += isStarter ? 12 : 9;
      }
      if (toolConfig.category === "Design") {
        boost += isStarter ? 8 : 6;
      }
    }

    if (descriptionSignals.research) {
      if (toolConfig.name === "Perplexity") {
        boost += isStarter ? 15 : 10;
      }
      if (toolConfig.category === "Research") {
        boost += isStarter ? 9 : 7;
      }
      if (toolConfig.category === "Core Assistant") {
        boost += 3;
      }
    }

    if (descriptionSignals.analytics) {
      if (toolConfig.name === "Power BI Copilot") {
        boost += isStarter ? 16 : 12;
      }
      if (toolConfig.category === "Analytics / BI") {
        boost += isStarter ? 10 : 7;
      }
    }

    if (descriptionSignals.finance) {
      if (toolConfig.category === "Finance") {
        boost += isStarter ? 10 : 7;
      }
      if (toolConfig.category === "Automation") {
        boost += 3;
      }
    }

    if (descriptionSignals.compliance) {
      if (toolConfig.name === "Vanta AI") {
        boost += isStarter ? 16 : 12;
      }
      if (toolConfig.category === "Security / Compliance") {
        boost += isStarter ? 10 : 8;
      }
    }

    if (descriptionSignals.hiring) {
      if (toolConfig.name === "LinkedIn Hiring Assistant") {
        boost += isStarter ? 16 : 12;
      }
      if (toolConfig.category === "Recruiting / HR") {
        boost += isStarter ? 10 : 7;
      }
    }

    return boost;
  }

  function getSalesChannelTierBoost(toolConfig, state, tierName) {
    const isStarter = tierName === "starter";
    let boost = 0;

    if (state.salesChannelFocus === "Email list / newsletter") {
      if (toolConfig.name === "Kit") {
        boost += isStarter ? 18 : 12;
      }
      if (toolConfig.name === "Mailchimp") {
        boost += isStarter ? 14 : 10;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 7 : 5;
      }
      if (toolConfig.category === "Automation") {
        boost += 3;
      }
    }

    if (state.salesChannelFocus === "Instagram / DMs / social") {
      if (toolConfig.name === "ManyChat") {
        boost += isStarter ? 18 : 12;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 7 : 5;
      }
      if (toolConfig.category === "Automation") {
        boost += isStarter ? 6 : 4;
      }
      if (toolConfig.category === "Content Studio") {
        boost += 4;
      }
    }

    if (state.salesChannelFocus === "Online store / Shopify / Etsy") {
      if (toolConfig.name === "Shopify Magic") {
        boost += isStarter ? 18 : 12;
      }
      if (toolConfig.name === "Rebuy") {
        boost += isStarter ? 15 : 11;
      }
      if (toolConfig.category === "Ecommerce Personalization") {
        boost += isStarter ? 8 : 6;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 5 : 4;
      }
      if (toolConfig.name === "Kit" || toolConfig.name === "Mailchimp") {
        boost += 4;
      }
    }

    if (state.salesChannelFocus === "Bookings / inquiries / commissions") {
      if (toolConfig.name === "Calendly") {
        boost += isStarter ? 15 : 10;
      }
      if (toolConfig.category === "Scheduling") {
        boost += isStarter ? 10 : 7;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 8 : 5;
      }
      if (toolConfig.category === "Automation") {
        boost += 4;
      }
    }

    if (state.salesChannelFocus === "In-person / gallery / events") {
      if (toolConfig.name === "Kit" || toolConfig.name === "Mailchimp") {
        boost += isStarter ? 10 : 7;
      }
      if (toolConfig.category === "CRM") {
        boost += isStarter ? 7 : 5;
      }
      if (toolConfig.category === "Design") {
        boost += 5;
      }
      if (toolConfig.category === "Content Studio") {
        boost += 3;
      }
    }

    return boost;
  }

  function getTierCandidateScore(entry, state, tierName) {
    const toolConfig = entry.tool;
    const categoryPriority = getPriorityCategories(state);
    const categoryIndex = categoryPriority.indexOf(toolConfig.category);
    const categoryBoost = categoryIndex === -1 ? 0 : Math.max(0, 12 - categoryIndex * 2);
    const setupBoost = toolConfig.setupDifficulty === "Easy" ? 10 : toolConfig.setupDifficulty === "Medium" ? 5 : 0;
    const speedBoost = toolConfig.timeToValue === "Today" ? 8 : toolConfig.timeToValue === "This Week" ? 4 : 0;
    const budgetAdjustment = getBudgetTierAdjustment(toolConfig, state, tierName);
    const setupFrictionPenalty = getSetupFrictionPenalty(toolConfig, state);
    const needBoost = getNeedTierBoost(toolConfig, state);
    const complianceBoost = getComplianceTierBoost(toolConfig, state);
    const descriptionBoost = getDescriptionTierBoost(toolConfig, state, tierName);
    const salesChannelBoost = getSalesChannelTierBoost(toolConfig, state, tierName);
    const hoursSavedBoost = Math.min(8, toolConfig.hoursSaved || 0);

    if (tierName === "starter") {
      return entry.score + categoryBoost + setupBoost + speedBoost + budgetAdjustment + needBoost + complianceBoost + descriptionBoost + salesChannelBoost + Math.round(hoursSavedBoost / 2) - setupFrictionPenalty;
    }

    if (tierName === "growth") {
      return entry.score + categoryBoost + budgetAdjustment + needBoost + complianceBoost + descriptionBoost + salesChannelBoost + Math.round(hoursSavedBoost / 1.5) + (toolConfig.automationFit === "Core" ? 8 : 0) + (toolConfig.knowledgeFit === "Core" ? 5 : 0) - Math.round(setupFrictionPenalty / 2);
    }

    return entry.score + categoryBoost + budgetAdjustment + needBoost + complianceBoost + descriptionBoost + salesChannelBoost + hoursSavedBoost + (toolConfig.automationFit === "Core" ? 6 : 0) + (toolConfig.contentFit === "Core" ? 4 : 0) + (toolConfig.knowledgeFit === "Core" ? 4 : 0) - Math.round(setupFrictionPenalty / 3);
  }

  function addTierToolIfPossible(collection, entry, seenNames, seenCategories, allowDuplicateCategories) {
    if (!entry || seenNames.has(entry.tool.name)) {
      return false;
    }
    if (!allowDuplicateCategories && seenCategories.has(entry.tool.category)) {
      return false;
    }

    collection.push(entry.tool);
    seenNames.add(entry.tool.name);
    seenCategories.add(entry.tool.category);
    return true;
  }

  function pickStackTierTools(entries, state, options) {
    const scoredEntries = entries
      .map((entry) => ({
        ...entry,
        tierScore: getTierCandidateScore(entry, state, options.name)
      }))
      .sort((left, right) => right.tierScore - left.tierScore || right.score - left.score || right.tool.featuredWeight - left.tool.featuredWeight || left.tool.name.localeCompare(right.tool.name));

    const chosenTools = [];
    const seenNames = new Set();
    const seenCategories = new Set();
    const priorityCategories = getPriorityCategories(state);

    if (options.preferCoreAssistant) {
      const coreAssistantEntry = scoredEntries.find((entry) => entry.tool.category === "Core Assistant");
      addTierToolIfPossible(chosenTools, coreAssistantEntry, seenNames, seenCategories, options.allowDuplicateCategories);
    }

    priorityCategories.forEach((category) => {
      if (chosenTools.length >= options.limit) {
        return;
      }

      const categoryEntry = scoredEntries.find((entry) => entry.tool.category === category && !seenNames.has(entry.tool.name));
      addTierToolIfPossible(chosenTools, categoryEntry, seenNames, seenCategories, options.allowDuplicateCategories);
    });

    scoredEntries.forEach((entry) => {
      if (chosenTools.length >= options.limit) {
        return;
      }
      addTierToolIfPossible(chosenTools, entry, seenNames, seenCategories, options.allowDuplicateCategories);
    });

    return chosenTools;
  }

  function summarizeTierTools(tierName, tools, state) {
    const monthlyMin = tools.reduce((sum, toolConfig) => sum + (toolConfig.monthlyMin || 0), 0);
    const monthlyMax = tools.reduce((sum, toolConfig) => sum + (toolConfig.monthlyMax || 0), 0);
    const weeklySavings = tools.reduce((sum, toolConfig) => sum + (toolConfig.hoursSaved || 0), 0);

    if (tierName === "starter") {
      return {
        label: "Starter Stack",
        title: "Fastest useful setup",
        description: "Start here when you want a lean stack that solves one important workflow quickly.",
        rangeText: `$${monthlyMin}-$${monthlyMax}/mo`,
        savingsText: `${weeklySavings}-${weeklySavings + 3} hrs/week`,
        workflowText: getWorkflowSuggestion(state, tools),
        accentClass: "stack-tier-starter"
      };
    }

    if (tierName === "growth") {
      return {
        label: "Growth Blueprint",
        title: "Stronger cross-tool system",
        description: "Add this layer after the starter workflow works and the team wants more consistency across handoffs.",
        rangeText: `$${monthlyMin}-$${monthlyMax}/mo`,
        savingsText: `${weeklySavings}-${weeklySavings + 4} hrs/week`,
        workflowText: "Lead, meeting, or content workflow with cleaner routing between tools",
        accentClass: "stack-tier-growth"
      };
    }

    return {
      label: "Scale Blueprint",
      title: "Deeper operating stack",
      description: "Best once the team wants fuller CRM, support, operations, or content coverage without rebuilding from scratch.",
      rangeText: `$${monthlyMin}-$${monthlyMax}/mo`,
      savingsText: `${weeklySavings}-${weeklySavings + 5} hrs/week`,
      workflowText: "Connected systems for execution, reporting, and less manual cleanup across the team",
      accentClass: "stack-tier-advanced"
    };
  }

  function getStackTierSet(entries, state) {
    return {
      starterTools: pickStackTierTools(entries, state, {
        name: "starter",
        limit: 3,
        preferCoreAssistant: true,
        allowDuplicateCategories: false
      }),
      growthTools: pickStackTierTools(entries, state, {
        name: "growth",
        limit: 4,
        preferCoreAssistant: true,
        allowDuplicateCategories: false
      }),
      advancedTools: pickStackTierTools(entries, state, {
        name: "advanced",
        limit: 6,
        preferCoreAssistant: true,
        allowDuplicateCategories: false
      })
    };
  }

  function getSelectedStateValue(value, fallback) {
    const selectedValues = getSelectedValues(value);
    return selectedValues.length > 0 ? formatNaturalList(selectedValues) : fallback;
  }

  function getToolNames(tools, limit) {
    return tools.slice(0, limit).map((toolConfig) => toolConfig.name);
  }

  function getNewTools(baseTools, nextTools) {
    const baseNames = new Set(baseTools.map((toolConfig) => toolConfig.name));
    return nextTools.filter((toolConfig) => !baseNames.has(toolConfig.name));
  }

  function getPlanWorkflowIdeas(state, starterTools, growthTools, advancedTools) {
    const workflows = [];
    const allTools = [...starterTools, ...growthTools, ...advancedTools];
    const categories = Array.from(new Set(allTools.map((toolConfig) => toolConfig.category)));

    function addWorkflow(workflow) {
      if (workflow && !workflows.includes(workflow)) {
        workflows.push(workflow);
      }
    }

    addWorkflow(getWorkflowSuggestion(state, starterTools));

    if (categories.includes("Automation")) {
      addWorkflow("Trigger -> AI summary -> routed task -> owner notification");
    }
    if (categories.includes("CRM")) {
      addWorkflow("New inquiry -> CRM stage update -> follow-up reminder -> next action");
    }
    if (categories.includes("Meetings")) {
      addWorkflow("Meeting notes -> action items -> CRM or project update -> recap email");
    }
    if (categories.includes("Research")) {
      addWorkflow("Source pack -> cited brief -> internal review -> client-ready draft");
    }
    if (categories.includes("Analytics / BI")) {
      addWorkflow("Business data -> AI KPI summary -> owner insight -> next action");
    }
    if (categories.includes("Voice / Phone AI")) {
      addWorkflow("Inbound call -> AI summary -> CRM update -> callback or booking");
    }
    if (categories.includes("Security / Compliance")) {
      addWorkflow("Evidence and vendor docs -> AI review -> flagged gap -> remediation owner");
    }
    if (categories.includes("Recruiting / HR")) {
      addWorkflow("Role brief -> AI sourcing -> outreach -> applicant review");
    }
    if (categories.includes("Ecommerce Personalization")) {
      addWorkflow("Shopper behavior -> AI recommendations -> cart offer -> conversion review");
    }
    if (categories.includes("Content Studio") || categories.includes("Design")) {
      addWorkflow("Brief -> draft -> visual asset -> publish checklist");
    }
    if (categories.includes("Workspace") || categories.includes("Project Ops")) {
      addWorkflow("SOP -> reusable template -> task handoff -> team follow-through");
    }
    if (state.mainGoal === "Close More Leads") {
      addWorkflow("Lead form -> qualification -> booking link -> follow-up sequence");
    }
    if (state.mainGoal === "Improve Service") {
      addWorkflow("Inbound question -> AI-assisted answer -> escalation or booking decision");
    }

    return workflows.slice(0, 3);
  }

  function getPlanRolloutMilestones(state, starterTools, growthTools, workflows) {
    const starterNames = formatNaturalList(getToolNames(starterTools, 2)) || "your starter tools";
    const documentationTool = [...starterTools, ...growthTools].find((toolConfig) => toolConfig.category === "Workspace" || toolConfig.category === "Project Ops");
    const handoffTool = [...growthTools, ...starterTools].find((toolConfig) => toolConfig.category === "Automation" || toolConfig.category === "Meetings" || toolConfig.category === "CRM");
    const growthAdditions = getNewTools(starterTools, growthTools);
    const growthNames = formatNaturalList(getToolNames(growthAdditions.length ? growthAdditions : growthTools, 2)) || "the next growth layer";

    return [
      `Week 1: confirm the owner, success metric, and core setup for ${starterNames}.`,
      `Week 2: build and test your first workflow: ${workflows[0] || getWorkflowSuggestion(state, starterTools)}.`,
      `Week 3: document prompts, permissions, and handoffs in ${documentationTool ? documentationTool.name : "one shared workspace"} and connect ${handoffTool ? handoffTool.name : "the main handoff tool"}.`,
      `Week 4: review adoption, clean the workflow, and decide whether to add ${growthNames}.`
    ];
  }

  function getPlanPitfalls(state) {
    const pitfalls = [];

    function addPitfall(copy) {
      if (copy && !pitfalls.includes(copy)) {
        pitfalls.push(copy);
      }
    }

    if (!state.primaryBottleneck || state.primaryBottleneck === "Any") {
      addPitfall("Adding software before deciding which single workflow should improve first.");
    }
    if (state.monthlyBudget === "Under $100/mo") {
      addPitfall("Trying to force a full CRM, meeting, and automation stack into a starter budget instead of sequencing tools.");
    }
    if (state.complianceSensitivity === "High") {
      addPitfall("Rolling AI into sensitive client or patient work before review, approval, and logging rules exist.");
    }
    if (state.meetingNotes === "Essential" || state.meetingVolume === "High") {
      addPitfall("Capturing every meeting without deciding where summaries, tasks, and follow-up notes should land.");
    }
    if (state.automationNeed === "Essential") {
      addPitfall("Automating a broken handoff before the team agrees on owners, triggers, and success metrics.");
    }

    addPitfall("Buying overlapping assistants before someone owns prompts, templates, and final review.");
    addPitfall("Expanding the stack before the first workflow is measured and actually used every week.");

    return pitfalls.slice(0, 3);
  }

  function getPlanUpgradePath(starterTools, growthTools, advancedTools) {
    const growthAdditions = getNewTools(starterTools, growthTools);
    const advancedAdditions = getNewTools(growthTools, advancedTools);

    return {
      now: formatNaturalList(getToolNames(starterTools, 3)) || "your starter stack",
      next: formatNaturalList(getToolNames(growthAdditions.length ? growthAdditions : growthTools, 3)) || "the growth stack",
      later: formatNaturalList(getToolNames(advancedAdditions.length ? advancedAdditions : advancedTools, 3)) || "the advanced stack"
    };
  }

  function renderPaidPlanTierRows(tierSummaries) {
    return tierSummaries.map((tierSummary) => `
      <div class="paid-plan-tier-row">
        <div>
          <strong>${escapeHtml(tierSummary.label)}</strong>
          <small>${escapeHtml(tierSummary.savingsText)}</small>
        </div>
        <span>${escapeHtml(tierSummary.rangeText)}</span>
      </div>
    `).join("");
  }

  function buildPaidPlanPreview(entries, state) {
    if (!entries || entries.length === 0) {
      return "";
    }

    const selectedFilters = data.FILTERS.filter((filter) => !isNoFilterValue(state[filter.key])).length;
    const businessType = getSelectedStateValue(state.businessType, "Small teams");
    const bottleneck = getSelectedStateValue(state.primaryBottleneck, "general operations");
    const budget = getSelectedStateValue(state.monthlyBudget, "Flexible budget");
    const mainGoal = getSelectedStateValue(state.mainGoal, "Save Time");
    const tierSet = getStackTierSet(entries, state);
    const starterSummary = summarizeTierTools("starter", tierSet.starterTools, state);
    const growthSummary = summarizeTierTools("growth", tierSet.growthTools, state);
    const advancedSummary = summarizeTierTools("advanced", tierSet.advancedTools, state);
    const workflows = getPlanWorkflowIdeas(state, tierSet.starterTools, tierSet.growthTools, tierSet.advancedTools);
    const rolloutMilestones = getPlanRolloutMilestones(state, tierSet.starterTools, tierSet.growthTools, workflows);
    const pitfalls = getPlanPitfalls(state);
    const upgradePath = getPlanUpgradePath(tierSet.starterTools, tierSet.growthTools, tierSet.advancedTools);
    const previewCopy = selectedFilters > 0
      ? `Your free Starter Stack is already shaped around ${businessType.toLowerCase()} needs, a ${bottleneck.toLowerCase()} bottleneck, and a ${mainGoal.toLowerCase()} goal. Growth Blueprint is the next step when you want the exact software picks, the right purchase order, and a rollout you can actually follow.`
      : "Growth Blueprint is the step after the free Starter Stack. It tells the buyer what to buy first, what to delay, and how to roll out the next stack without overspending.";

    return `
      <section class="paid-plan-preview-card">
        <div class="paid-plan-preview-head">
          <div class="paid-plan-preview-copy">
            <p class="eyebrow premium-text premium-text-tight"><span class="premium-star" aria-hidden="true">&#9733;</span><span>Growth Blueprint</span></p>
            <h3>Growth Blueprint gives you the right next tools and rollout order</h3>
            <p class="summary-copy">${escapeHtml(previewCopy)}</p>
          </div>
          <aside class="paid-plan-price-card">
            <span class="paid-plan-price">$29</span>
            <p>Best for solo owners and lean teams that need exact next-tool picks, budget guardrails, and a practical 30-day rollout.</p>
            <div class="paid-plan-action-row">
              <a class="hero-link hero-link-primary-action" href="${SHOPIFY_BLUEPRINT_PRODUCT_URL}" data-shopify-product-handle="ai-blueprints" data-shopify-cta="buy-growth-preview">Buy Growth Blueprint</a>
            </div>
          </aside>
        </div>

        <section class="post-quiz-conversion-card">
          <div class="post-quiz-conversion-copy">
            <span class="paid-plan-section-label">Use this when the free stack looks right</span>
            <h4>Upgrade when the real question is "What should we implement next?"</h4>
            <ul class="post-quiz-conversion-points">
              <li><strong>Exact software picks</strong> for ${escapeHtml(businessType.toLowerCase())} needs, a ${escapeHtml(bottleneck.toLowerCase())} bottleneck, and a ${escapeHtml(mainGoal.toLowerCase())} goal.</li>
              <li><strong>8-12 page buying blueprint</strong> with what to buy now, what to delay, and the first workflows to launch.</li>
              <li><strong>Implementation modules</strong> with step-by-step setup guidance, launch order, and clear rollout ownership for the highest-leverage tools.</li>
              <li><strong>Second detailed intake</strong> that makes the final report sharper before you spend more on tools or add overlapping software.</li>
            </ul>
          </div>
          <div class="post-quiz-conversion-proof">
            <div class="post-quiz-proof-card">
              <span>Best For</span>
              <strong>Lean teams that need a confident next-step plan</strong>
            </div>
            <div class="post-quiz-proof-card">
              <span>Budget Map</span>
              <strong>${escapeHtml(growthSummary.rangeText)}</strong>
            </div>
            <div class="post-quiz-proof-card">
              <span>Expected Weekly Savings</span>
              <strong>${escapeHtml(growthSummary.savingsText)}</strong>
            </div>
            <div class="post-quiz-proof-card">
              <span>Setup Guidance</span>
              <strong>Step-by-step setup guides + rollout framework</strong>
            </div>
            <div class="post-quiz-proof-card">
              <span>First Rollout</span>
              <strong>${escapeHtml(growthSummary.workflowText)}</strong>
            </div>
            <div class="post-quiz-conversion-actions">
              <a class="secondary-button" href="./sample-growth-blueprint.html"><span class="premium-text premium-text-tight"><span class="premium-star" aria-hidden="true">&#9733;</span><span>See Premium Growth Blueprint Preview</span></span></a>
              <a class="secondary-button" href="./sample-scale-blueprint.html"><span class="premium-text premium-text-tight"><span class="premium-star" aria-hidden="true">&#9733;</span><span>See Premium Scale Blueprint Preview</span></span></a>
              <a class="secondary-button" href="./sample-ai-stack-plans.html"><span class="premium-text premium-text-tight"><span class="premium-star" aria-hidden="true">&#9733;</span><span>See 6 Premium Sample Plans</span></span></a>
            </div>
          </div>
        </section>

        <div class="tag-grid paid-plan-tag-grid">
          ${renderTag("Business Type", businessType)}
          ${renderTag("Main Bottleneck", bottleneck)}
          ${renderTag("Budget Target", budget)}
          ${renderTag("First Win", starterSummary.workflowText)}
        </div>

        <div class="paid-plan-section-grid">
          <article class="paid-plan-section-card">
            <span class="paid-plan-section-label">Included in Growth Blueprint</span>
            <h4>Plan snapshot</h4>
            <p class="summary-copy">Start with ${escapeHtml(formatNaturalList(getToolNames(tierSet.starterTools, 3)) || "a lean starter stack")}, then layer in the right growth tools only after the first workflow works.</p>
            <div class="stack-tool-list">
              ${tierSet.starterTools.map((toolConfig) => renderToolMiniPill(toolConfig)).join("")}
            </div>
            <p class="paid-plan-note">The paid version expands this into exact purchase order, ownership notes, and fit reasoning.</p>
          </article>

          <article class="paid-plan-section-card">
            <span class="paid-plan-section-label">Included in Growth Blueprint</span>
            <h4>Budget map</h4>
            <div class="paid-plan-tier-list">
              ${renderPaidPlanTierRows([starterSummary, growthSummary, advancedSummary])}
            </div>
            <p class="paid-plan-note">This helps the buyer decide what to buy now, what to delay, and what a fuller stack looks like later.</p>
          </article>

          <article class="paid-plan-section-card">
            <span class="paid-plan-section-label">Included in Growth Blueprint</span>
            <h4>30-day rollout</h4>
            <ul class="paid-plan-list">
              ${rolloutMilestones.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>

          <article class="paid-plan-section-card">
            <span class="paid-plan-section-label">Included in Growth Blueprint</span>
            <h4>First 3 workflows</h4>
            <ul class="paid-plan-list">
              ${workflows.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>

          <article class="paid-plan-section-card">
            <span class="paid-plan-section-label">Included in Growth Blueprint</span>
            <h4>Mistakes to avoid</h4>
            <ul class="paid-plan-list">
              ${pitfalls.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>

          <article class="paid-plan-section-card">
            <span class="paid-plan-section-label">Included in Growth Blueprint</span>
            <h4>Upgrade path</h4>
            <ul class="paid-plan-list paid-plan-phase-list">
              <li><strong>Now:</strong> ${escapeHtml(upgradePath.now)}</li>
              <li><strong>Next:</strong> ${escapeHtml(upgradePath.next)}</li>
              <li><strong>Later:</strong> ${escapeHtml(upgradePath.later)}</li>
            </ul>
            <p class="paid-plan-note">This keeps the buyer from overbuilding the stack on day one.</p>
          </article>
        </div>
      </section>
    `;
  }

  function buildStackSummary(entries, state) {
    if (!entries || entries.length === 0) {
      return "";
    }

    const businessType = getSelectedStateValue(state.businessType, "small teams");
    const selectedFilters = data.FILTERS.filter((filter) => !isNoFilterValue(state[filter.key])).length;
    const title = selectedFilters > 0
      ? `Recommended stacks for ${businessType.toLowerCase()}`
      : "Three stack levels for most small teams";
    const tierSet = getStackTierSet(entries, state);

    const tiers = [
      { key: "starter", tools: tierSet.starterTools },
      { key: "growth", tools: tierSet.growthTools },
      { key: "advanced", tools: tierSet.advancedTools }
    ].filter((tier) => tier.tools.length > 0);

    return `
      <section class="stack-summary-card quiz-stack-summary-card">
        <div class="stack-summary-top">
          <div>
            <p class="eyebrow">Quiz Results</p>
            <h3>${escapeHtml(title)}</h3>
            <p class="summary-copy">Starter Stack is free. Growth Blueprint helps you choose the right next tools and rollout. Scale Blueprint adds systems, automation, ownership, and scale logic.</p>
          </div>
        </div>
        <div class="stack-tier-grid">
          ${tiers.map((tier) => {
            const tierSummary = summarizeTierTools(tier.key, tier.tools, state);
            const isLocked = tier.key !== "starter";
            const badgeText = isLocked ? "Premium" : "Free";
            const cardClasses = `stack-tier-card ${escapeHtml(tierSummary.accentClass)}${isLocked ? " stack-tier-locked" : ""}`;
            const lockedPrice = tier.key === "growth" ? "$29" : "$59";
            const lockedTitle = tier.key === "growth"
              ? "Unlock Growth Blueprint"
              : "Unlock Scale Blueprint";
            const lockedHeading = tier.key === "growth"
              ? "Choose the right next stack and rollout"
              : "Turn the stack into an AI operating system";
            const lockedCtaHref = SHOPIFY_BLUEPRINT_UNLOCK_VARIANT_URL;
            const lockedPreviewHref = tier.key === "growth"
              ? "./sample-growth-blueprint.html"
              : "./sample-scale-blueprint.html";
            const lockedPreviewText = tier.key === "growth"
              ? "See Premium Growth Blueprint Preview"
              : "See Premium Scale Blueprint Preview";
            const lockedTierNote = tier.key === "advanced"
              ? "Includes everything in Growth Blueprint"
              : "";
            const lockedPoints = tier.key === "growth"
              ? [
                  "Exact software picks for your current bottleneck, budget, and first goal.",
                  "An 8-12 page buying blueprint with what to buy now, what to delay, and the first workflows to launch.",
                  "Step-by-step setup guides for the highest-leverage tools, plus implementation guidance for the rest of the stack.",
                  "Best for solo owners and lean teams that need a confident next-step plan."
                ]
              : [
                  "Everything in Growth Blueprint, plus deeper guidance on automation, approvals, handoffs, and cross-tool coordination.",
                  "More detailed operating recommendations for ownership, KPI tracking, and a 90-day scale roadmap.",
                  "More detailed step-by-step implementation modules for how the stack should actually be set up, owned, and expanded.",
                  "Best for teams with more volume, more people, or more workflow complexity than a simple next-tool decision.",
                  "Stronger guidance on what should stay human-reviewed, what can be automated, and what to add later."
                ];
            const cardBody = `
              <div class="stack-tier-head">
                <div class="stack-tier-kicker">
                  <span class="stack-tier-label">${escapeHtml(tierSummary.label)}</span>
                  <span class="stack-tier-access-badge ${isLocked ? "stack-tier-badge-premium" : "stack-tier-badge-free"}">${badgeText}</span>
                </div>
                <h4>${escapeHtml(tierSummary.title)}</h4>
                <p>${escapeHtml(tierSummary.description)}</p>
              </div>
              <div class="stack-tool-list">
                ${tier.tools.map((toolConfig) => renderToolMiniPill(toolConfig)).join("")}
              </div>
              <div class="stack-tier-stat-list">
                <div class="stack-summary-stat">
                  <span class="stack-summary-label">Estimated Monthly Range</span>
                  <strong>${escapeHtml(tierSummary.rangeText)}</strong>
                  <p>Planning range for this stack level.</p>
                </div>
                <div class="stack-summary-stat">
                  <span class="stack-summary-label">Expected Weekly Savings</span>
                  <strong>${escapeHtml(tierSummary.savingsText)}</strong>
                  <p>Rough gain once this layer is set up and used consistently.</p>
                </div>
                <div class="stack-summary-stat">
                  <span class="stack-summary-label">Best First Workflow</span>
                  <strong>${escapeHtml(tierSummary.workflowText)}</strong>
                  <p>Use this as the implementation focus before expanding further.</p>
                </div>
              </div>
            `;
            return `
              <article class="${cardClasses}">
                ${isLocked
                  ? `
                    <div class="stack-tier-blur" aria-hidden="true">
                      ${cardBody}
                    </div>
                    <div class="stack-tier-overlay">
                      <div class="stack-tier-overlay-top">
                        <div class="stack-tier-overlay-intro">
                          <span class="stack-tier-overlay-label">${escapeHtml(tierSummary.label)}</span>
                          <h4>${escapeHtml(lockedHeading)}</h4>
                          ${lockedTierNote ? `<p class="stack-tier-includes-note">${escapeHtml(lockedTierNote)}</p>` : ""}
                        </div>
                        <span class="stack-tier-price-pill">${escapeHtml(lockedPrice)}</span>
                      </div>
                      <ul class="stack-tier-overlay-list">
                        ${lockedPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
                      </ul>
                      <div class="stack-tier-overlay-actions">
                        <a class="secondary-button stack-tier-preview-cta" href="${escapeHtml(lockedPreviewHref)}"><span class="premium-text premium-text-tight"><span class="premium-star" aria-hidden="true">&#9733;</span><span>${escapeHtml(lockedPreviewText)}</span></span></a>
                        <a class="hero-link stack-tier-locked-cta" href="${escapeHtml(lockedCtaHref)}" data-shopify-product-handle="ai-blueprints" data-shopify-cta="locked-tier-buy">${escapeHtml(lockedTitle)}</a>
                      </div>
                    </div>
                  `
                  : cardBody}
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function getFilterDefaultValue(filter) {
    if (!filter) {
      return "Any";
    }

    return filter.multiple ? [] : (filter.defaultValue || "Any");
  }

  function normalizePlannerState(inputState) {
    const nextState = {};

    data.FILTERS.forEach((filter) => {
      const rawValue = inputState && Object.prototype.hasOwnProperty.call(inputState, filter.key)
        ? inputState[filter.key]
        : getFilterDefaultValue(filter);

      if (filter.multiple) {
        const values = Array.isArray(rawValue)
          ? rawValue
          : String(rawValue || "")
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean);

        nextState[filter.key] = values.filter((value, index, allValues) => filter.options.includes(value) && allValues.indexOf(value) === index);
        return;
      }

      if (isNoFilterValue(rawValue)) {
        nextState[filter.key] = getFilterDefaultValue(filter);
        return;
      }

      nextState[filter.key] = filter.options.includes(rawValue)
        ? rawValue
        : getFilterDefaultValue(filter);
    });

    nextState.toolCategory = inputState && getCategoryOptions().includes(inputState.toolCategory)
      ? inputState.toolCategory
      : data.CATEGORY_FILTER_DEFAULT;

    nextState.businessDescription = normalizeFreeText(inputState && inputState.businessDescription);
    nextState.salesChannelFocus = SALES_CHANNEL_OPTIONS.includes(inputState && inputState.salesChannelFocus)
      ? inputState.salesChannelFocus
      : "";

    return nextState;
  }

  function getDefaultPlannerState() {
    return normalizePlannerState({});
  }

  function getActiveFilterCountForState(state) {
    const normalizedState = normalizePlannerState(state);
    return data.FILTERS.filter((filter) => !isNoFilterValue(normalizedState[filter.key])).length;
  }

  function getRankedResultsForState(state, options) {
    const normalizedState = normalizePlannerState(state);
    const activeFilterCount = getActiveFilterCountForState(normalizedState);
    let ranked = activeFilterCount === 0
      ? getDefaultHomeResults()
      : data.TOOLS
        .map((toolConfig) => data.scoreTool(toolConfig, normalizedState))
        .filter((entry) => entry.score > 0)
        .sort((left, right) => right.score - left.score || right.tool.featuredWeight - left.tool.featuredWeight || left.tool.name.localeCompare(right.tool.name));

    if (options && options.category && options.category !== data.CATEGORY_FILTER_DEFAULT) {
      ranked = ranked.filter((entry) => entry.tool.category === options.category);
    }

    return ranked;
  }

  Object.assign(data, {
    formatNaturalList,
    escapeHtml,
    filterToolsBySearch,
    filterToolsForView,
    getActiveFilterCountForState,
    getBudgetBand,
    getCategoryOptions,
    getDefaultPlannerState,
    getDefaultHomeResults,
    getDisplayPrice,
    getFilterDefaultValue,
    getImplementationLabel,
    getPlanPitfalls,
    getPlanRolloutMilestones,
    getPlanUpgradePath,
    getPlanWorkflowIdeas,
    getRankedResultsForState,
    getStackTierSet,
    getToolSearchRank,
    getViewCopy,
    getViewLabel,
    groupEntriesByCategory,
    buildToolCategoryPalette,
    normalizePlannerState,
    renderToolCard,
    buildPaidPlanPreview,
    buildStackSummary,
    scoreTool,
    summarizeTierTools,
    toSlug
  });
})();
