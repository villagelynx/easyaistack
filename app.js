(function initializeAiStackPlannerHome() {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  if (!data) {
    return;
  }

  const resultsList = document.getElementById("resultsList");
  const resultsCount = document.getElementById("resultsCount");
  const databaseCount = document.getElementById("databaseCount");
  const resetButton = document.getElementById("resetButton");
  const stackSummary = document.getElementById("stackSummary");
  const paidPlanPreview = document.getElementById("paidPlanPreview");
  const resultsTitle = document.getElementById("resultsTitle");
  const toolCategoryPalette = document.getElementById("toolCategoryPalette");
  const toolCategorySummary = document.getElementById("toolCategorySummary");
  const heroToolCount = document.getElementById("heroToolCount");
  const heroToolCountMobile = document.getElementById("heroToolCountMobile");
  const quickOutputToolCount = document.getElementById("quickOutputToolCount");
  const browseToolDatabaseLink = document.getElementById("browseToolDatabaseLink");
  const heroDropdowns = Array.from(document.querySelectorAll("details.hero-dropdown"));

  const quizHeading = document.getElementById("quizHeading");
  const quizStepStatus = document.getElementById("quizStepStatus");
  const quizProgress = document.getElementById("quizProgress");
  const quizQuestionCard = document.getElementById("quizQuestionCard");
  const quizAnswerSummary = document.getElementById("quizAnswerSummary");
  const quizBackButton = document.getElementById("quizBackButton");
  const quizResultsLead = document.getElementById("quizResultsLead");
  const quizPanel = document.getElementById("quizPanel");
  const resultsSection = document.getElementById("resultsSection");

  const state = data.getDefaultPlannerState();
  state.toolCategory = data.CATEGORY_FILTER_DEFAULT;
  state.businessDescription = "";
  state.salesChannelFocus = "";

  const BASE_QUIZ_STEPS = [
    {
      key: "businessType",
      label: "Business Type",
      prompt: "",
      help: "",
      choices: [
        { value: "Local Service", title: "Local Service", copy: "Bookings, leads, reminders, and customer communication." },
        { value: "Agency", title: "Agency / Studio", copy: "Client delivery, content, meetings, and internal handoffs." },
        { value: "Consultant", title: "Consultant / Coach", copy: "Research, notes, proposals, and polished deliverables." },
        { value: "Creator", title: "Creator / Media", copy: "Content velocity, repurposing, and audience workflows." },
        { value: "Ecommerce", title: "Ecommerce / Shopify", copy: "Store operations, support, conversion, and retention." }
      ]
    },
    {
      key: "primaryBottleneck",
      label: "Main Bottleneck",
      prompt: "Where is the biggest bottleneck right now?",
      help: "Choose the one thing you want AI to improve first.",
      choices: [
        { value: "Lead Follow-Up", title: "Leads & Follow-Up", copy: "Too much delay, too much drop-off, not enough consistent follow-up." },
        { value: "Content Creation", title: "Content & Marketing", copy: "The team needs more output without more manual drafting." },
        { value: "Admin Work", title: "Admin & Operations", copy: "Summaries, cleanup, handoffs, and repetitive internal work." },
        { value: "Customer Support", title: "Support & Service", copy: "Faster replies, cleaner routing, and more consistency." }
      ]
    },
    {
      key: "mainGoal",
      label: "Main Goal",
      prompt: "What should the first win feel like?",
      help: "This keeps the recommendation outcome-first instead of feature-first.",
      choices: [
        { value: "Save Time", title: "Save Time", copy: "Reduce busywork and reclaim hours every week." },
        { value: "Close More Leads", title: "Close More Leads", copy: "Respond faster and improve the path from inquiry to action." },
        { value: "Create Content Faster", title: "Create More Content", copy: "Turn ideas into more output with less friction." },
        { value: "Improve Service", title: "Improve Service", copy: "Deliver faster, more consistent replies and follow-through." }
      ]
    },
    {
      key: "salesChannelFocus",
      label: "Sales Channel",
      prompt: "Where should AI help you win customers first?",
      help: "This helps us prioritize the right marketing or selling tool first.",
      choices: [
        { value: "Email list / newsletter", title: "Email List / Newsletter", copy: "Grow an owned audience, send launches, and stay in touch." },
        { value: "Instagram / DMs / social", title: "Instagram / DMs / Social", copy: "Move faster in social conversations, replies, and follow-up." },
        { value: "Online store / Shopify / Etsy", title: "Online Store / Shopify / Etsy", copy: "Improve store conversion, retention, and product follow-up." },
        { value: "Bookings / inquiries / commissions", title: "Bookings / Inquiries / Commissions", copy: "Turn interest into calls, inquiries, or paid custom work." },
        { value: "In-person / gallery / events", title: "In-Person / Gallery / Events", copy: "Support launches, shows, and event-driven customer follow-up." }
      ]
    },
    {
      key: "monthlyBudget",
      label: "Budget",
      prompt: "What budget feels realistic for phase one?",
      help: "We use this to keep the free starter stack practical, then show bigger premium tiers separately.",
      choices: [
        { value: "Under $100/mo", title: "Lean Start", copy: "One or two focused tools, no software sprawl." },
        { value: "$100-$300/mo", title: "Growth Layer", copy: "Enough budget for a realistic small-business starter stack." },
        { value: "$300-$1000/mo", title: "Operator Stack", copy: "More room for operations, meetings, and stronger specialty layers." }
      ]
    },
    {
      key: "businessDescription",
      label: "Business Context",
      type: "text",
      prompt: "Quickly describe your business and what you are looking to achieve with AI.",
      help: "One or two sentences is enough. This helps add useful context to the recommendation.",
      placeholder: "Example: We are a small agency that wants faster lead follow-up and easier proposal drafting without adding a lot of software."
    }
  ];

  let currentQuizStep = 0;
  const quizKeys = new Set(BASE_QUIZ_STEPS.map((step) => step.key));
  let lastQuizCompleteState = false;
  const loadedWithQuery = Boolean(window.location.search);

  initializeBrowseSearchForms();
  initializeHeroDropdowns();
  renderStaticCounts();
  renderToolCategoryPalette();
  loadStateFromQuery();
  syncConditionalQuizState();
  currentQuizStep = getNextIncompleteStepIndex();
  if (loadedWithQuery && currentQuizStep >= getVisibleQuizSteps().length) {
    currentQuizStep = 0;
  }
  syncStateToQuery();
  bindEvents();
  renderQuiz();
  renderResults();

  function bindEvents() {
    if (resetButton) {
      resetButton.addEventListener("click", resetPlanner);
    }

    if (quizBackButton) {
      quizBackButton.addEventListener("click", goToPreviousStep);
    }

    if (quizQuestionCard) {
      quizQuestionCard.addEventListener("click", (event) => {
        const choiceButton = event.target.closest("[data-quiz-choice]");
        if (choiceButton) {
          handleQuizChoice(choiceButton);
          return;
        }

        const actionButton = event.target.closest("[data-quiz-action]");
        if (!actionButton) {
          return;
        }

        const action = actionButton.dataset.quizAction;
        if (action === "skip") {
          skipCurrentStep();
        } else if (action === "next") {
          submitCurrentStep();
        } else if (action === "restart") {
          resetPlanner();
          quizPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (action === "edit-answer") {
          const stepIndex = Number(actionButton.dataset.quizStepIndex || 0);
          if (!Number.isNaN(stepIndex)) {
            currentQuizStep = Math.max(0, Math.min(getVisibleQuizSteps().length - 1, stepIndex));
            renderQuiz();
            quizPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });

      quizQuestionCard.addEventListener("input", (event) => {
        const textField = event.target.closest("[data-quiz-text-input]");
        if (!textField) {
          return;
        }

        const stepKey = textField.dataset.quizTextInput;
        state[stepKey] = textField.value;
      });
    }
  }

  function getFilterByKey(key) {
    return data.FILTERS.find((filter) => filter.key === key);
  }

  function getFilterDefaultValue(filter) {
    if (!filter) {
      return "Any";
    }

    return data.getFilterDefaultValue
      ? data.getFilterDefaultValue(filter)
      : (filter.multiple ? [] : (filter.defaultValue || "Any"));
  }

  function getParsedQueryValues(filter, params) {
    if (!filter.multiple) {
      return [];
    }

    return params.getAll(filter.key)
      .flatMap((value) => String(value || "").split(","))
      .map((value) => value.trim())
      .filter((value, index, values) => value && values.indexOf(value) === index && filter.options.includes(value));
  }

  function getSelectedValues(value) {
    if (Array.isArray(value)) {
      return value.filter(Boolean);
    }

    if (value == null || value === "" || value === "Any" || value === "All") {
      return [];
    }

    return [value];
  }

  function shouldShowSalesChannelQuestion() {
    return state.mainGoal === "Close More Leads"
      || ["Creator", "Ecommerce", "Local Service"].includes(state.businessType);
  }

  function syncConditionalQuizState() {
    if (!shouldShowSalesChannelQuestion()) {
      state.salesChannelFocus = "";
    }
  }

  function getVisibleQuizSteps() {
    return BASE_QUIZ_STEPS.filter((step) => {
      if (step.key === "salesChannelFocus") {
        return shouldShowSalesChannelQuestion();
      }

      return true;
    });
  }

  function isStepAnswered(step) {
    return getSelectedValues(state[step.key]).length > 0;
  }

  function getAnsweredStepCount() {
    return getVisibleQuizSteps().filter((step) => isStepAnswered(step)).length;
  }

  function getNextIncompleteStepIndex() {
    const visibleSteps = getVisibleQuizSteps();
    const firstIncompleteIndex = visibleSteps.findIndex((step) => !isStepAnswered(step));
    return firstIncompleteIndex === -1 ? visibleSteps.length : firstIncompleteIndex;
  }

  function isQuizComplete() {
    return currentQuizStep >= getVisibleQuizSteps().length;
  }

  function loadStateFromQuery() {
    const params = new URLSearchParams(window.location.search);

    data.FILTERS.forEach((filter) => {
      if (!quizKeys.has(filter.key)) {
        return;
      }

      if (filter.multiple) {
        state[filter.key] = getParsedQueryValues(filter, params);
        return;
      }

      const nextValue = params.get(filter.key);
      if (!nextValue) {
        return;
      }

      if (nextValue === "Any" || nextValue === "All") {
        state[filter.key] = getFilterDefaultValue(filter);
        return;
      }

      if (filter.options.includes(nextValue)) {
        state[filter.key] = nextValue;
      }
    });
  }

  function syncStateToQuery() {
    const nextUrl = new URL(window.location.href);
    nextUrl.search = "";
    nextUrl.hash = window.location.hash;
    window.history.replaceState({}, "", nextUrl.toString());
  }

  function resetPlanner() {
    data.FILTERS.forEach((filter) => {
      state[filter.key] = getFilterDefaultValue(filter);
    });

    BASE_QUIZ_STEPS.forEach((step) => {
      if (!getFilterByKey(step.key)) {
        state[step.key] = step.type === "text" ? "" : "";
      }
    });

    state.toolCategory = data.CATEGORY_FILTER_DEFAULT;
    syncConditionalQuizState();
    currentQuizStep = 0;
    syncStateToQuery();
    renderQuiz();
    renderResults();
  }

  function goToPreviousStep() {
    if (currentQuizStep <= 0) {
      return;
    }

    currentQuizStep -= 1;
    renderQuiz();
  }

  function goToNextStep() {
    const visibleSteps = getVisibleQuizSteps();

    if (currentQuizStep < visibleSteps.length - 1) {
      currentQuizStep += 1;
    } else {
      currentQuizStep = visibleSteps.length;
    }

    renderQuiz();
  }

  function skipCurrentStep() {
    const step = getVisibleQuizSteps()[currentQuizStep];
    if (!step) {
      return;
    }

    const filter = getFilterByKey(step.key);
    state[step.key] = step.type === "text" || !filter ? "" : getFilterDefaultValue(filter);
    syncConditionalQuizState();
    syncStateToQuery();
    renderResults();
    goToNextStep();
  }

  function setSingleValue(key, value) {
    state[key] = value;
    syncConditionalQuizState();
    syncStateToQuery();
    renderResults();
    goToNextStep();
  }

  function handleQuizChoice(choiceButton) {
    const stepIndex = Number(choiceButton.dataset.quizStepIndex || currentQuizStep);
    const value = choiceButton.dataset.quizChoice;
    const step = getVisibleQuizSteps()[stepIndex];
    if (!step || !value) {
      return;
    }

    setSingleValue(step.key, value);
  }

  function submitCurrentStep() {
    const step = getVisibleQuizSteps()[currentQuizStep];
    if (!step) {
      return;
    }

    if (step.type === "text") {
      const textField = quizQuestionCard?.querySelector(`[data-quiz-text-input="${step.key}"]`);
      state[step.key] = (textField?.value || state[step.key] || "").trim();
      syncConditionalQuizState();
      renderResults();
      goToNextStep();
      return;
    }

    goToNextStep();
  }

  function getStepChoices(step) {
    return Array.isArray(step.choices) ? step.choices : [];
  }

  function getChoiceTitleForStep(step, value) {
    const matchedChoice = getStepChoices(step).find((choice) => choice.value === value);
    return matchedChoice ? matchedChoice.title : value;
  }

  function renderQuizProgress() {
    if (!quizProgress) {
      return;
    }

    const visibleSteps = getVisibleQuizSteps();
    quizProgress.style.setProperty("--quiz-step-count", String(visibleSteps.length));

    quizProgress.innerHTML = visibleSteps.map((step, index) => {
      const stepClasses = ["quiz-progress-step"];
      if (isStepAnswered(step)) {
        stepClasses.push("is-complete");
      } else if (index === currentQuizStep || (isQuizComplete() && index === visibleSteps.length - 1)) {
        stepClasses.push("is-active");
      }

      return `<span class="${stepClasses.join(" ")}" aria-hidden="true"></span>`;
    }).join("");
  }

  function renderQuizAnswerSummary() {
    if (!quizAnswerSummary) {
      return;
    }

    const visibleSteps = getVisibleQuizSteps();
    const answeredMarkup = visibleSteps
      .map((step, index) => ({ step, index }))
      .filter((entry) => isStepAnswered(entry.step))
      .map((entry) => {
        const { step, index } = entry;
        const selectedLabel = data.formatNaturalList(
          getSelectedValues(state[step.key]).map((value) => getChoiceTitleForStep(step, value))
        );
        return `
          <button class="quiz-answer-chip" type="button" data-quiz-action="edit-answer" data-quiz-step-index="${index}">
            <strong>${data.escapeHtml(step.label || step.key)}:</strong>
            <span>${data.escapeHtml(selectedLabel)}</span>
          </button>
        `;
      })
      .join("");

    quizAnswerSummary.hidden = answeredMarkup.length === 0;
    quizAnswerSummary.innerHTML = answeredMarkup;
  }

  function renderQuizQuestionCard() {
    if (!quizQuestionCard) {
      return;
    }

    const visibleSteps = getVisibleQuizSteps();
    if (currentQuizStep > visibleSteps.length) {
      currentQuizStep = visibleSteps.length;
    }

    if (isQuizComplete()) {
      quizQuestionCard.innerHTML = `
        <div class="quiz-complete-card quiz-complete-card-compact">
          <div class="quiz-complete-inline">
            <strong>Quiz complete.</strong>
            <span>Your free starter stack is ready below.</span>
          </div>
          <button class="secondary-button compact-button" type="button" data-quiz-action="restart">Start over</button>
        </div>
      `;
      return;
    }

    const step = visibleSteps[currentQuizStep];
    const totalCount = visibleSteps.length;
    const questionTitle = step.prompt || step.label || `Question ${currentQuizStep + 1}`;
    const selectedValues = getSelectedValues(state[step.key]);
    const choices = getStepChoices(step);
    const choiceGridClasses = ["quiz-choice-grid"];
    if (choices.length >= 5) {
      choiceGridClasses.push("is-compact");
    }

    if (step.type === "text") {
      quizQuestionCard.innerHTML = `
        <div class="quiz-question-head">
          <div class="quiz-question-meta">
            <span class="quiz-question-number">Question ${currentQuizStep + 1}</span>
            <span class="quiz-question-total">of ${totalCount}</span>
          </div>
          <h3>${data.escapeHtml(questionTitle)}</h3>
          ${step.help ? `<p class="quiz-question-copy">${data.escapeHtml(step.help)}</p>` : ""}
        </div>
        <div class="quiz-text-shell">
          <textarea
            class="text-area quiz-text-area"
            data-quiz-text-input="${step.key}"
            placeholder="${data.escapeHtml(step.placeholder || "")}"
          >${data.escapeHtml(state[step.key] || "")}</textarea>
        </div>
        <div class="quiz-question-actions">
          <button class="secondary-button" type="button" data-quiz-action="next">Continue</button>
          <button class="secondary-button" type="button" data-quiz-action="skip">Skip for now</button>
        </div>
      `;
      return;
    }

    quizQuestionCard.innerHTML = `
      <div class="quiz-question-head">
        <div class="quiz-question-meta">
          <span class="quiz-question-number">Question ${currentQuizStep + 1}</span>
          <span class="quiz-question-total">of ${totalCount}</span>
        </div>
        <h3>${data.escapeHtml(questionTitle)}</h3>
        ${step.help ? `<p class="quiz-question-copy">${data.escapeHtml(step.help)}</p>` : ""}
      </div>
      <div class="${choiceGridClasses.join(" ")}">
        ${choices.map((choice, index) => {
          const isSelected = selectedValues.includes(choice.value);
          return `
            <button
              class="quiz-choice-button${isSelected ? " is-selected" : ""}"
              type="button"
              aria-pressed="${isSelected ? "true" : "false"}"
              data-quiz-choice="${data.escapeHtml(choice.value)}"
              data-quiz-step-index="${currentQuizStep}"
            >
              <span class="quiz-choice-button-top">
                <span class="quiz-choice-button-index" aria-hidden="true">${index + 1}</span>
                <span class="quiz-choice-button-title">${data.escapeHtml(choice.title)}</span>
              </span>
              ${choice.copy ? `<span class="quiz-choice-button-copy">${data.escapeHtml(choice.copy)}</span>` : ""}
            </button>
          `;
        }).join("")}
      </div>
      <div class="quiz-question-actions">
        <button class="secondary-button" type="button" data-quiz-action="skip">Keep it broad</button>
      </div>
    `;
  }

  function renderQuiz() {
    syncConditionalQuizState();
    const visibleSteps = getVisibleQuizSteps();
    if (currentQuizStep > visibleSteps.length) {
      currentQuizStep = visibleSteps.length;
    }

    const answeredCount = getAnsweredStepCount();
    const totalCount = visibleSteps.length;
    const complete = isQuizComplete();

    if (quizHeading) {
      quizHeading.textContent = complete
        ? "Quiz complete"
        : totalCount > 5
          ? "Answer a few fast questions to get free Starter Stack"
          : "Answer five fast questions to get free Starter Stack";
    }

    if (quizStepStatus) {
      quizStepStatus.textContent = complete
        ? "Done"
        : `Step ${currentQuizStep + 1} of ${totalCount}`;
    }

    if (quizBackButton) {
      quizBackButton.disabled = currentQuizStep <= 0;
    }

    if (quizPanel) {
      quizPanel.classList.toggle("quiz-panel-collapsed", complete);
    }

    renderQuizProgress();
    renderQuizQuestionCard();
    renderQuizAnswerSummary();

    if (complete && !lastQuizCompleteState && resultsSection) {
      window.requestAnimationFrame(() => {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    lastQuizCompleteState = complete;
  }

  function renderStaticCounts() {
    const count = data.TOOLS.length;

    if (heroToolCount) {
      heroToolCount.textContent = String(count);
    }

    if (heroToolCountMobile) {
      heroToolCountMobile.textContent = String(count);
    }

    if (quickOutputToolCount) {
      quickOutputToolCount.textContent = String(count);
    }

    if (browseToolDatabaseLink) {
      browseToolDatabaseLink.textContent = `Browse ${count} Tools`;
    }
  }

  function renderToolCategoryPalette() {
    const categories = data.getCategoryOptions().filter((category) => category !== data.CATEGORY_FILTER_DEFAULT);

    if (toolCategorySummary) {
      toolCategorySummary.textContent = `${data.TOOLS.length} tools across ${categories.length} categories. Click any tool to open its detail page.`;
    }

    if (toolCategoryPalette && data.buildToolCategoryPalette) {
      toolCategoryPalette.innerHTML = data.buildToolCategoryPalette();
    }
  }

  function initializeBrowseSearchForms() {
    document.querySelectorAll("form[data-browse-search-form]").forEach((form) => {
      if (form.dataset.searchReady === "true") {
        return;
      }

      form.dataset.searchReady = "true";
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const searchInput = form.querySelector('input[name="q"], input[type="search"]');
        const target = form.getAttribute("action") || "./browse.html";
        const nextUrl = new URL(target, window.location.href);
        const query = (searchInput && searchInput.value ? searchInput.value : "").trim();

        nextUrl.search = "";
        nextUrl.searchParams.set("view", "all");
        if (query) {
          nextUrl.searchParams.set("q", query);
        }

        window.location.assign(nextUrl.toString());
      });
    });
  }

  function initializeHeroDropdowns() {
    if (!heroDropdowns.length) {
      return;
    }

    heroDropdowns.forEach((dropdown) => {
      const summary = dropdown.querySelector("summary");
      if (!summary) {
        return;
      }

      summary.addEventListener("click", () => {
        heroDropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.open = false;
          }
        });
      });
    });

    document.addEventListener("click", (event) => {
      heroDropdowns.forEach((dropdown) => {
        if (dropdown.open && !dropdown.contains(event.target)) {
          dropdown.open = false;
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") {
        return;
      }

      let closedDropdown = false;
      heroDropdowns.forEach((dropdown) => {
        if (!dropdown.open) {
          return;
        }

        dropdown.open = false;
        if (!closedDropdown) {
          dropdown.querySelector("summary")?.focus();
        }
        closedDropdown = true;
      });

      if (closedDropdown) {
        event.preventDefault();
      }
    });
  }

  function buildResultsLead(activeFilterCount) {
    if (activeFilterCount === 0) {
      return "Answer the quiz to reveal a free Starter Stack. Growth Blueprint and Scale Blueprint are personalized behind the scenes and unlock in the premium report.";
    }

    const businessType = data.formatNaturalList(getSelectedValues(state.businessType)) || "small business";
    const bottleneck = data.formatNaturalList(getSelectedValues(state.primaryBottleneck)) || "your main bottleneck";
    const mainGoal = data.formatNaturalList(getSelectedValues(state.mainGoal)) || "a clearer first win";

    if (isQuizComplete()) {
      return `Starter Stack is free below for ${businessType.toLowerCase()} teams focused on ${bottleneck.toLowerCase()} and ${mainGoal.toLowerCase()}. Growth Blueprint and Scale Blueprint unlock with the premium plan and a second detailed questionnaire.`;
    }

    return `You are shaping a personalized stack for ${businessType.toLowerCase()} teams. Starter Stack updates live while Growth Blueprint and Scale Blueprint are previewed as locked premium tiers.`;
  }

  function getStarterEntries(rankedEntries, starterTools) {
    const lookup = new Map(rankedEntries.map((entry) => [entry.tool.name, entry]));
    const matchedEntries = starterTools
      .map((toolConfig) => lookup.get(toolConfig.name))
      .filter(Boolean);

    if (matchedEntries.length > 0) {
      return matchedEntries;
    }

    return rankedEntries.slice(0, 3);
  }

  function renderResults() {
    if (!resultsList) {
      return;
    }

    const activeFilterCount = data.getActiveFilterCountForState(state);
    if (databaseCount) {
      databaseCount.textContent = `${data.TOOLS.length} tools in database`;
    }

    if (activeFilterCount === 0) {
      if (resultsTitle) {
        resultsTitle.textContent = "Free Starter Stack";
      }

      if (quizResultsLead) {
        quizResultsLead.textContent = buildResultsLead(activeFilterCount);
      }

      if (resultsCount) {
        resultsCount.textContent = `${getVisibleQuizSteps().length}-step quiz`;
      }
      if (stackSummary) {
        stackSummary.innerHTML = "";
      }
      if (paidPlanPreview) {
        paidPlanPreview.innerHTML = "";
      }

      resultsList.innerHTML = `
        <article class="empty-state">
          Take the quiz above to see your free starter stack.
        </article>
      `;
      return;
    }

    const rankedEntries = data.getRankedResultsForState(state);
    if (!rankedEntries.length) {
      if (resultsTitle) {
        resultsTitle.textContent = "Free Starter Stack";
      }

      if (quizResultsLead) {
        quizResultsLead.textContent = "Nothing matched the current answer mix. Try broadening one of the quiz answers and the starter stack will update.";
      }

      if (resultsCount) {
        resultsCount.textContent = "0 starter tools";
      }
      if (stackSummary) {
        stackSummary.innerHTML = "";
      }
      if (paidPlanPreview) {
        paidPlanPreview.innerHTML = "";
      }
      resultsList.innerHTML = `
        <article class="empty-state">
          No AI tools matched this quiz path. Use the Back button above or restart the quiz and keep one or two answers broader.
        </article>
      `;
      return;
    }

    const tierSet = data.getStackTierSet(rankedEntries, state);
    const starterEntries = getStarterEntries(rankedEntries, tierSet.starterTools);

    if (resultsTitle) {
      resultsTitle.textContent = "Free Starter Stack";
    }

    if (quizResultsLead) {
      quizResultsLead.textContent = buildResultsLead(activeFilterCount);
    }

    if (resultsCount) {
      resultsCount.textContent = `${starterEntries.length} free starter tools`;
    }

    if (stackSummary) {
      stackSummary.innerHTML = data.buildStackSummary(rankedEntries, state);
    }

    if (paidPlanPreview) {
      paidPlanPreview.innerHTML = data.buildPaidPlanPreview(rankedEntries, state);
    }

    resultsList.innerHTML = starterEntries
      .map((entry) => data.renderToolCard(entry.tool, entry.score, entry.matchedReasons || [], true, true))
      .join("");
  }
})();
