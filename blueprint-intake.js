(function initializeEasyAiStackBlueprintIntake() {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  const generator = window.EASYAISTACK_PLAN_GENERATOR;
  if (!data || !generator) {
    return;
  }

  const form = document.getElementById("blueprintIntakeForm");
  const generatedPlanMount = document.getElementById("generatedPlanMount");
  const statusLine = document.getElementById("blueprintIntakeStatus");
  const printButton = document.getElementById("printPlanButton");
  const editButton = document.getElementById("editIntakeButton");

  if (!form || !generatedPlanMount) {
    return;
  }

  const RECOMMENDED_FIELDS = [
    { name: "businessType", label: "Business Type" },
    { name: "integrationPlatform", label: "Platform / Integrations" },
    { name: "primaryBottleneck", label: "Primary Bottleneck" },
    { name: "mainGoal", label: "Main Goal" },
    { name: "firstWorkflowToFix", label: "First Workflow To Fix" },
    { name: "currentTools", label: "Current Tools" },
    { name: "teamSize", label: "Team Size" },
    { name: "monthlyBudget", label: "Monthly Budget" }
  ];

  let currentPlan = null;

  // Intake should still generate even when some fields are blank.
  form.noValidate = true;

  hydrateMultiCheckboxGroups();
  attachRecommendedFieldListeners();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const intake = collectFormData();
    const missing = markMissingRecommendedFields(intake);
    generatePlan(intake, missing);
  });

  printButton?.addEventListener("click", () => {
    if (!currentPlan) {
      return;
    }
    window.print();
  });

  editButton?.addEventListener("click", () => {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  function hydrateMultiCheckboxGroups() {
    const groups = Array.from(form.querySelectorAll("[data-sync-hidden]"));
    groups.forEach((group) => {
      const hiddenName = group.getAttribute("data-sync-hidden");
      if (!hiddenName) {
        return;
      }

      const hiddenField = form.elements.namedItem(hiddenName);
      if (!hiddenField || typeof hiddenField.value !== "string") {
        return;
      }

      const selected = new Set(
        hiddenField.value
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      );

      Array.from(group.querySelectorAll("[data-multi-option]")).forEach((checkbox) => {
        if (!(checkbox instanceof HTMLInputElement) || checkbox.type !== "checkbox") {
          return;
        }
        checkbox.checked = selected.has(checkbox.value);
        syncMultiCheckboxOptionVisual(checkbox);
      });

      group.addEventListener("change", () => {
        Array.from(group.querySelectorAll("[data-multi-option]")).forEach((checkbox) => {
          if (!(checkbox instanceof HTMLInputElement) || checkbox.type !== "checkbox") {
            return;
          }
          syncMultiCheckboxOptionVisual(checkbox);
        });
        syncMultiCheckboxGroup(group);
      });
      syncMultiCheckboxGroup(group);
    });
  }

  function syncMultiCheckboxOptionVisual(checkbox) {
    const option = checkbox.closest(".filter-checkbox-option");
    if (!option) {
      return;
    }

    option.classList.toggle("is-active", checkbox.checked);
  }

  function syncMultiCheckboxGroup(group) {
    const hiddenName = group.getAttribute("data-sync-hidden");
    if (!hiddenName) {
      return;
    }

    const hiddenField = form.elements.namedItem(hiddenName);
    if (!hiddenField) {
      return;
    }

    const checkedValues = Array.from(group.querySelectorAll("[data-multi-option]"))
      .filter((checkbox) => checkbox instanceof HTMLInputElement && checkbox.checked)
      .map((checkbox) => checkbox.value)
      .filter(Boolean);

    hiddenField.value = checkedValues.join(", ");

    const wrapper = group.closest(".field");
    if (wrapper && hiddenField.value.trim()) {
      wrapper.classList.remove("is-missing");
    }
  }

  function collectFormData() {
    const multiGroups = Array.from(form.querySelectorAll("[data-sync-hidden]"));
    multiGroups.forEach((group) => syncMultiCheckboxGroup(group));

    const formData = new FormData(form);
    return Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value || "").trim()])
    );
  }

  function clearMissingHighlights() {
    form.querySelectorAll(".field.is-missing").forEach((field) => field.classList.remove("is-missing"));
  }

  function getFieldElement(fieldName) {
    const node = form.elements.namedItem(fieldName);
    if (!node) {
      return null;
    }

    if (node instanceof HTMLElement) {
      return node;
    }

    // Handle RadioNodeList (when multiple inputs share the same name).
    if (typeof node === "object" && "length" in node) {
      const first = Array.from(node).find((entry) => entry instanceof HTMLElement);
      return first || null;
    }

    return null;
  }

  function attachRecommendedFieldListeners() {
    RECOMMENDED_FIELDS.forEach(({ name }) => {
      const element = getFieldElement(name);
      if (!element) {
        return;
      }

      const wrapper = element.closest(".field");
      if (!wrapper) {
        return;
      }

      const clear = () => wrapper.classList.remove("is-missing");
      element.addEventListener("input", clear);
      element.addEventListener("change", clear);
    });
  }

  function markMissingRecommendedFields(intake) {
    clearMissingHighlights();
    const missingLabels = [];

    RECOMMENDED_FIELDS.forEach(({ name, label }) => {
      const value = String(intake && intake[name] ? intake[name] : "").trim();
      if (value) {
        return;
      }

      const element = getFieldElement(name) || form.querySelector(`[name="${name}"]`);
      const wrapper = element ? element.closest(".field") : null;
      if (wrapper) {
        wrapper.classList.add("is-missing");
      }
      missingLabels.push(label);
    });

    return missingLabels;
  }

  function setStatus(message, tone) {
    if (!statusLine) {
      return;
    }

    const cleanMessage = String(message || "").trim();
    statusLine.textContent = cleanMessage;
    statusLine.hidden = !cleanMessage;
    statusLine.dataset.tone = cleanMessage ? (tone || "info") : "";
  }

  function generatePlan(intake, missingFields) {
    try {
      setStatus("Generating your report...", "info");
      currentPlan = generator.generatePlan(intake || {});
      generatedPlanMount.innerHTML = generator.renderGeneratedPlan(currentPlan);

      if (printButton) {
        printButton.disabled = false;
      }

      const hasMissing = Array.isArray(missingFields) && missingFields.length > 0;
      setStatus(
        hasMissing
          ? "Generated your report. Tip: complete the highlighted fields for a more precise blueprint."
          : "Generated your blueprint report from the intake.",
        "success"
      );

      generatedPlanMount.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      setStatus(`Could not generate the report: ${error.message}`, "error");
    }
  }
})();
