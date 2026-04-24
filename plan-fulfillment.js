(function initializeEasyAiStackPlanFulfillmentPage() {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  const generator = window.EASYAISTACK_PLAN_GENERATOR;
  if (!data || !generator) {
    return;
  }

  const form = document.getElementById("planFulfillmentForm");
  const orderJsonInput = document.getElementById("orderJsonInput");
  const importJsonButton = document.getElementById("importJsonButton");
  const loadSampleButton = document.getElementById("loadSampleOrderButton");
  const clearButton = document.getElementById("clearFulfillmentButton");
  const printButton = document.getElementById("printPlanButton");
  const copyEmailButton = document.getElementById("copyDeliveryEmailButton");
  const copyJsonButton = document.getElementById("copyPlanJsonButton");
  const adminSummaryMount = document.getElementById("adminSummaryMount");
  const generatedPlanMount = document.getElementById("generatedPlanMount");
  const fulfillmentStatus = document.getElementById("fulfillmentStatus");

  if (!form || !generatedPlanMount) {
    return;
  }

  let currentPlan = null;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    generatePlan("Plan generated from the current intake.");
  });

  importJsonButton?.addEventListener("click", () => {
    importOrderJson(true);
  });

  loadSampleButton?.addEventListener("click", () => {
    loadSampleOrder(true, true);
  });

  clearButton?.addEventListener("click", () => {
    form.reset();
    if (orderJsonInput) {
      orderJsonInput.value = "";
    }
    currentPlan = null;
    generatedPlanMount.innerHTML = `
      <article class="empty-state">
        Paste a Shopify order JSON export or complete the intake form, then generate the plan preview here.
      </article>
    `;
    if (adminSummaryMount) {
      adminSummaryMount.innerHTML = `
        <article class="empty-state">
          Derived planner filters, warnings, and delivery helpers will appear here after you generate a plan.
        </article>
      `;
    }
    syncActionButtons();
    setStatus("Cleared the intake and plan preview.");
  });

  printButton?.addEventListener("click", () => {
    if (!currentPlan) {
      return;
    }
    window.print();
  });

  copyEmailButton?.addEventListener("click", async () => {
    if (!currentPlan) {
      return;
    }

    const emailText = `Subject: ${currentPlan.deliveryEmail.subject}\n\n${currentPlan.deliveryEmail.body}`;
    await copyText(emailText, "Copied the delivery email draft.");
  });

  copyJsonButton?.addEventListener("click", async () => {
    if (!currentPlan) {
      return;
    }

    await copyText(JSON.stringify(currentPlan, null, 2), "Copied the generated plan JSON.");
  });

  loadSampleOrder(true, false);

  function loadSampleOrder(autoGenerate, setStatusMessage) {
    const sampleOrder = generator.getSampleShopifyOrder();
    if (orderJsonInput) {
      orderJsonInput.value = JSON.stringify(sampleOrder, null, 2);
    }
    populateForm(generator.extractIntakeFromShopify(sampleOrder));

    if (autoGenerate) {
      generatePlan(setStatusMessage ? "Loaded the sample Shopify order and generated a sample plan." : "");
    }
  }

  function importOrderJson(autoGenerate) {
    if (!orderJsonInput) {
      return;
    }

    const rawValue = String(orderJsonInput.value || "").trim();
    if (!rawValue) {
      setStatus("Paste a Shopify order JSON object before importing.", "error");
      return;
    }

    try {
      const parsed = JSON.parse(rawValue);
      const intake = generator.extractIntakeFromShopify(parsed);
      populateForm(intake);

      if (autoGenerate) {
        generatePlan("Imported the Shopify order JSON and generated the plan.");
      } else {
        setStatus("Imported the Shopify order JSON into the intake form.");
      }
    } catch (error) {
      setStatus(`Could not parse the JSON: ${error.message}`, "error");
    }
  }

  function populateForm(intake) {
    Object.entries(intake).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (!field) {
        return;
      }
      field.value = value;
    });
  }

  function collectFormData() {
    const formData = new FormData(form);
    return Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, String(value || "").trim()]));
  }

  function generatePlan(successMessage) {
    currentPlan = generator.generatePlan(collectFormData());
    generatedPlanMount.innerHTML = generator.renderGeneratedPlan(currentPlan);
    renderAdminSummary(currentPlan);
    syncActionButtons();
    if (successMessage) {
      setStatus(successMessage, "success");
    }
  }

  function renderAdminSummary(plan) {
    if (!adminSummaryMount) {
      return;
    }

    const activeFilters = data.FILTERS
      .map((filter) => {
        const value = plan.state[filter.key];
        if (Array.isArray(value)) {
          return value.length > 0 ? { label: filter.label, value: value.join(", ") } : null;
        }
        return value && value !== "Any" && value !== "All" ? { label: filter.label, value } : null;
      })
      .filter(Boolean);

    adminSummaryMount.innerHTML = `
      <div class="action-card-grid">
        <article class="action-card">
          <p class="eyebrow">Derived Planner State</p>
          <h3>Filters the generator inferred from the intake</h3>
          <div class="tag-grid">
            ${activeFilters.map((entry) => `
              <span class="tag"><strong>${data.escapeHtml(entry.label)}:</strong> ${data.escapeHtml(entry.value)}</span>
            `).join("")}
          </div>
        </article>

        <article class="action-card">
          <p class="eyebrow">Top Matches</p>
          <h3>Best-fit tools before the plan is grouped into tiers</h3>
          <ul class="paid-plan-list">
            ${plan.rankedEntries.slice(0, 6).map((entry) => `
              <li><strong>${data.escapeHtml(entry.tool.name)}</strong> (${data.escapeHtml(entry.tool.category)})</li>
            `).join("")}
          </ul>
        </article>

        <article class="action-card">
          <p class="eyebrow">Warnings</p>
          <h3>Manual checks before delivery</h3>
          ${plan.warnings.length > 0
            ? `<ul class="paid-plan-list">${plan.warnings.map((warning) => `<li>${data.escapeHtml(warning)}</li>`).join("")}</ul>`
            : `<p class="summary-copy">No special warnings were triggered from this intake.</p>`}
        </article>
      </div>
    `;
  }

  function syncActionButtons() {
    const disabled = !currentPlan;
    [printButton, copyEmailButton, copyJsonButton].forEach((button) => {
      if (button) {
        button.disabled = disabled;
      }
    });
  }

  function setStatus(message, tone) {
    if (!fulfillmentStatus) {
      return;
    }

    const cleanMessage = String(message || "").trim();
    fulfillmentStatus.textContent = cleanMessage;
    fulfillmentStatus.hidden = !cleanMessage;
    fulfillmentStatus.dataset.tone = cleanMessage ? (tone || "info") : "";
  }

  async function copyText(value, successMessage) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        throw new Error("Clipboard API not available in this browser.");
      }
      setStatus(successMessage, "success");
    } catch (error) {
      setStatus(`Copy failed: ${error.message}`, "error");
    }
  }
})();
