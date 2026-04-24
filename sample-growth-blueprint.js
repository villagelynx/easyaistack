(function initializeGrowthBlueprintSamplePage() {
  const PAGE_CONFIG = [
    {
      theme: "report-page-theme-cover",
      title: "Cover and business snapshot",
      copy: "What this Growth Blueprint preview is built around.",
      items: ["__cover__", "__tags__"]
    },
    {
      theme: "report-page-theme-cover",
      title: "Table of contents",
      copy: "A quick guide to what is included in this Growth Blueprint preview.",
      items: ["Table of Contents"]
    },
    {
      theme: "report-page-theme-impact",
      title: "First actions and quick ROI",
      copy: "The first recommendations and why they should feel worth it quickly.",
      items: ["Executive Summary", "Quick Wins", "ROI Snapshot"]
    },
    {
      theme: "report-page-theme-impact",
      title: "Pilot and early measurement",
      copy: "How to test the stack, measure it, and keep the rollout lean.",
      items: ["Measurement + Pilot", "Improvement Score", "Beginner vs Advanced"]
    },
    {
      theme: "report-page-theme-playbooks",
      title: "Use cases and recommended stack",
      copy: "How the stack is meant to work for the business in practice.",
      items: ["Use Case Playbooks", "Recommended Stack"]
    },
    {
      theme: "report-page-theme-stack",
      title: "Buying order and workflow changes",
      copy: "What to buy next, what to delay, and how the workflow should improve.",
      items: ["Buying Order", "What Not To Buy Yet", "Workflow Snapshot"]
    },
    {
      theme: "report-page-theme-budget",
      title: "Budget and implementation reality",
      copy: "Where to spend, where to hold back, and who should own setup.",
      items: ["Subscription Waste Check", "Budget Map", "Implementation Reality"]
    },
    {
      theme: "report-page-theme-workflows",
      title: "Implementation module preview",
      copy: "A sample of the paid setup guidance without revealing the full playbook.",
      items: ["Tool Implementation Modules"]
    },
    {
      theme: "report-page-theme-workflows",
      title: "Operational workflows",
      copy: "The first execution paths and automation flows to bring online.",
      items: ["First 3 Workflows", "Automation Flows"]
    },
    {
      theme: "report-page-theme-prompts",
      title: "Risk and prompt pack",
      copy: "Where to be careful with AI and what the team can use right away.",
      items: ["Workflow Risk", "Prompt Pack"]
    },
    {
      theme: "report-page-theme-final",
      title: "Alternatives and 90-day plan",
      copy: "The longer path, backup options, and what to watch as the stack evolves.",
      items: ["Tool Alternatives", "90-Day Action Plan", "Fit and Risks"]
    }
  ];

  function getSectionEyebrow(section) {
    return section.querySelector(".results-header .eyebrow")?.textContent.trim() || "";
  }

  function renderPageProgress(pageNumber, totalPages) {
    return `
      <div class="report-page-progress" aria-hidden="true">
        ${Array.from({ length: totalPages }, (_, index) => `
          <span class="report-page-dot${index + 1 === pageNumber ? " is-active" : index + 1 < pageNumber ? " is-complete" : ""}"></span>
        `).join("")}
      </div>
    `;
  }

  function renderPreviewPageHeader(pageNumber, totalPages, metaTitle, metaCopy) {
    return `
      <div class="report-page-top">
        <span class="report-page-number">Page ${pageNumber} of ${totalPages}</span>
        <div class="report-page-meta">
          <div class="report-page-meta-main">
            <span class="report-page-meta-icon"><span class="report-page-meta-letter">G</span></span>
            <div class="report-page-meta-copy">
              <strong>${metaTitle}</strong>
              <p>${metaCopy}</p>
            </div>
          </div>
          ${renderPageProgress(pageNumber, totalPages)}
        </div>
      </div>
    `;
  }

  function renderPreviewPageFooter(pageNumber) {
    return `
      <div class="report-page-footer">
        <span>Growth Blueprint Preview</span>
        <strong>EasyAIStack Page ${pageNumber}</strong>
      </div>
    `;
  }

  function updateTableOfContentsPageNumbers(root, pageMap) {
    const tocSection = root.querySelector(".report-toc");
    if (!tocSection) {
      return;
    }

    Array.from(tocSection.querySelectorAll(".report-toc-row")).forEach((row) => {
      const key = row.getAttribute("data-toc-key");
      const page = key ? pageMap.get(key) : null;
      const pageNode = row.querySelector(".report-toc-page-number");
      if (!pageNode) {
        return;
      }

      pageNode.textContent = page ? `Page ${page}` : "Included";
    });
  }

  function paginateReportPreview(root) {
    const shell = root.querySelector(".fulfillment-plan-shell");
    if (!shell) {
      return;
    }

    const directChildren = Array.from(shell.children);
    const cover = directChildren.find((node) => node.classList?.contains("fulfillment-plan-cover"));
    const tags = directChildren.find((node) => node.classList?.contains("fulfillment-tag-grid"));
    const sectionMap = new Map(
      directChildren
        .filter((node) => node.classList?.contains("results-panel"))
        .map((node) => [getSectionEyebrow(node), node])
    );

    const usedNodes = new Set();
    const previewStack = document.createElement("div");
    previewStack.className = "report-preview-stack";

    function takeNode(key) {
      let node = null;
      if (key === "__cover__") {
        node = cover;
      } else if (key === "__tags__") {
        node = tags;
      } else {
        node = sectionMap.get(key);
      }

      if (!node || usedNodes.has(node)) {
        return null;
      }

      usedNodes.add(node);
      return node;
    }

    const resolvedPages = PAGE_CONFIG.map((page) => ({
      ...page,
      nodes: page.items
        .map((key) => takeNode(key))
        .filter(Boolean)
    })).filter((page) => page.nodes.length > 0);

    const totalPages = resolvedPages.length;
    const sectionPageMap = new Map();

    resolvedPages.forEach((page, index) => {
      page.items.forEach((key) => {
        if (key.startsWith("__") || sectionPageMap.has(key)) {
          return;
        }
        sectionPageMap.set(key, index + 1);
      });
    });

    resolvedPages.forEach((page, index) => {
      const pageEl = document.createElement("article");
      pageEl.className = `report-page report-preview-page ${page.theme}`;
      pageEl.innerHTML = `
        ${renderPreviewPageHeader(index + 1, totalPages, page.title, page.copy)}
        <div class="report-preview-page-body"></div>
        ${renderPreviewPageFooter(index + 1)}
      `;

      const body = pageEl.querySelector(".report-preview-page-body");
      page.nodes.forEach((node) => {
        body.appendChild(node);
      });

      previewStack.appendChild(pageEl);
    });

    const leftovers = directChildren.filter((node) => !usedNodes.has(node));
    if (leftovers.length > 0) {
      const lastBody = previewStack.lastElementChild?.querySelector(".report-preview-page-body");
      leftovers.forEach((node) => {
        lastBody?.appendChild(node);
      });
    }

    shell.replaceWith(previewStack);
    updateTableOfContentsPageNumbers(previewStack, sectionPageMap);
  }

  function redactImplementationPreview(root) {
    const sections = Array.from(root.querySelectorAll(".results-panel"));
    const implementationSection = sections.find((section) => {
      const eyebrow = section.querySelector(".results-header .eyebrow");
      return eyebrow && eyebrow.textContent.trim() === "Tool Implementation Modules";
    });

    if (!implementationSection) {
      return;
    }

    const sectionChildren = Array.from(implementationSection.children);
    const summaryNode = implementationSection.querySelector(":scope > .summary-copy");
    const firstStep = implementationSection.querySelector(".paid-plan-list li");
    const teaserText = firstStep
      ? firstStep.textContent.trim()
      : "See the paid blueprint for the full tool-by-tool setup sequence, ownership notes, and rollout guidance.";

    const teaser = document.createElement("div");
    teaser.className = "preview-implementation-teaser";
    teaser.innerHTML = `
      <span class="paid-plan-section-label">Preview Line</span>
      <p class="summary-copy">${teaserText}</p>
    `;

    const redactedBody = document.createElement("div");
    redactedBody.className = "preview-redacted-body";

    const startIndex = summaryNode ? sectionChildren.indexOf(summaryNode) + 1 : 1;
    sectionChildren.slice(startIndex).forEach((node) => {
      redactedBody.appendChild(node);
    });

    const lockedNote = document.createElement("div");
    lockedNote.className = "preview-redacted-note";
    lockedNote.innerHTML = `
      <span class="premium-text premium-text-tight"><span class="premium-star" aria-hidden="true">&#9733;</span><span>Paid Blueprint Detail</span></span>
      <p>The full report includes the complete setup steps, rollout sequence, and ownership notes for the tools in this stack.</p>
    `;
    redactedBody.appendChild(lockedNote);

    implementationSection.classList.add("report-preview-redacted");
    if (summaryNode) {
      summaryNode.insertAdjacentElement("afterend", teaser);
    } else {
      implementationSection.appendChild(teaser);
    }
    implementationSection.appendChild(redactedBody);
  }

  const generator = window.EASYAISTACK_PLAN_GENERATOR;
  const mount = document.getElementById("sampleGrowthBlueprintRoot");
  const printButton = document.getElementById("sampleGrowthPrintButton");

  if (!generator || !mount) {
    return;
  }

  const baseIntake = typeof generator.getSampleIntake === "function"
    ? generator.getSampleIntake()
    : {};

  const sampleIntake = {
    ...baseIntake,
    blueprintTier: "Growth Blueprint",
    businessName: "Bluebird Plumbing",
    businessType: "Local Service",
    businessAddress: "123 Main St, Vancouver, BC",
    businessPhone: "604-555-0199",
    businessWebsite: "https://bluebirdplumbing.example",
    teamSize: "2-5",
    monthlyBudget: "$100-$300/mo",
    techComfort: "Medium",
    integrationPlatform: "Google Workspace, Calendly, HubSpot",
    supportChannel: "Email",
    salesNeed: "Follow-Up",
    automationNeed: "Helpful",
    aiAgents: "Not Needed",
    meetingNotes: "Helpful",
    designContent: "Not Needed",
    citedResearch: "Not Needed",
    knowledgeBase: "Not Needed",
    leadVolume: "Medium",
    contentVolume: "Low",
    meetingVolume: "Low",
    implementationOwner: "Owner / founder",
    primaryBottleneck: "Leads & Follow-Up",
    mainGoal: "Close More Leads",
    firstWorkflowToFix: "Lead form to same-day follow-up and booking handoff",
    currentTools: "Google Workspace, Calendly, QuickBooks, website contact form",
    specialFocus: "General Small Business",
    mainPlatforms: "Google Workspace, Calendly",
    usesShopify: "No",
    usesOracle: "No",
    usesHealthcareSystems: "No",
    phoneSupportPriority: "Helpful",
    weeklyLeadVolume: "10-20 leads per week",
    weeklyMeetingVolume: "1-5 meetings per week",
    weeklySupportVolume: "Low",
    complianceSensitivity: "Low",
    securityAiNeed: "Not Important",
    planDeliveryEmail: "owner@bluebirdplumbing.example",
    notes: "The owner wants the right next tools, a simple rollout, and a clear purchase order without overbuilding the stack too early."
  };

  const plan = generator.generatePlan(sampleIntake);
  mount.innerHTML = generator.renderGeneratedPlan(plan);
  redactImplementationPreview(mount);
  paginateReportPreview(mount);

  printButton?.addEventListener("click", () => {
    window.print();
  });
})();
