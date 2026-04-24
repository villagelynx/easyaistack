(function initializeEasyAiStackSamplePage() {
  const generator = window.EASYAISTACK_PLAN_GENERATOR;
  const reportKey = window.EAS_SAMPLE_REPORT_KEY;
  const mount = document.getElementById("sampleReportRoot");
  const printButton = document.getElementById("sampleReportPrintButton");

  if (!generator || !mount || !reportKey) {
    return;
  }

  const GROWTH_PAGE_CONFIG = [
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

  const SCALE_PAGE_CONFIG = [
    {
      theme: "report-page-theme-cover",
      title: "Cover and business snapshot",
      copy: "What this Scale Blueprint preview is built around.",
      items: ["__cover__", "__tags__"]
    },
    {
      theme: "report-page-theme-cover",
      title: "Table of contents",
      copy: "A quick guide to what is included in this Scale Blueprint preview.",
      items: ["Table of Contents"]
    },
    {
      theme: "report-page-theme-impact",
      title: "Executive view and scale layer",
      copy: "What changes first and what Scale adds beyond tool selection.",
      items: ["Executive Summary", "Scale Operating Layer", "Quick Wins"]
    },
    {
      theme: "report-page-theme-impact",
      title: "Pilot and improvement score",
      copy: "How to test the new operating layer and measure progress quickly.",
      items: ["ROI Snapshot", "Measurement + Pilot", "Improvement Score"]
    },
    {
      theme: "report-page-theme-playbooks",
      title: "Start lean and grow deliberately",
      copy: "How to phase the rollout without overbuilding before the team is ready.",
      items: ["Beginner vs Advanced", "Use Case Playbooks"]
    },
    {
      theme: "report-page-theme-stack",
      title: "Stack and buying order",
      copy: "The recommended operating layers and what to bring in first.",
      items: ["Recommended Stack", "Buying Order"]
    },
    {
      theme: "report-page-theme-budget",
      title: "Delays, workflow changes, and spend control",
      copy: "Where to hold back and how the workflow should improve before more spend.",
      items: ["What Not To Buy Yet", "Workflow Snapshot", "Subscription Waste Check"]
    },
    {
      theme: "report-page-theme-budget",
      title: "Budget and implementation reality",
      copy: "What the team should own directly and where structure matters most.",
      items: ["Budget Map", "Implementation Reality"]
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
      copy: "The first execution paths and automation flows for the next operating layer.",
      items: ["First 3 Workflows", "Automation Flows"]
    },
    {
      theme: "report-page-theme-prompts",
      title: "Risk and prompt pack",
      copy: "Where to stay cautious and what the team can use right away.",
      items: ["Workflow Risk", "Prompt Pack"]
    },
    {
      theme: "report-page-theme-final",
      title: "Alternatives and 90-day scale plan",
      copy: "The longer path, backup options, and what to watch as the stack matures.",
      items: ["Tool Alternatives", "90-Day Action Plan", "Fit and Risks"]
    }
  ];

  const SAMPLE_REPORT_CONFIGS = {
    "local-service": {
      blueprintTier: "Growth Blueprint",
      heroEyebrow: "Growth Blueprint Preview",
      heroTitle: "Owner-led local service Growth Blueprint",
      heroCopy: "This sample uses the real Growth Blueprint report logic for a small local service business that needs the right next tools, the right purchase order, and a practical rollout without drifting into a larger operating-system build too early.",
      intakeOverrides: {
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
        salesNeed: "Lead Follow-Up",
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
        primaryBottleneck: "Lead Follow-Up",
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
      }
    },
    agency: {
      blueprintTier: "Scale Blueprint",
      heroEyebrow: "Scale Blueprint Preview",
      heroTitle: "Small agency Scale Blueprint",
      heroCopy: "This sample uses the real Scale Blueprint report logic for an agency that needs stronger meeting cleanup, clearer ownership, better handoffs, and a more repeatable operating system across the team.",
      intakeOverrides: {
        businessName: "Northshore Growth Agency",
        businessType: "Agency",
        businessAddress: "410 Water St, Vancouver, BC",
        businessPhone: "604-555-0138",
        businessWebsite: "https://northshoregrowth.example",
        teamSize: "6-20",
        monthlyBudget: "$300-$1000/mo",
        techComfort: "Medium",
        integrationPlatform: "Slack, Notion, HubSpot, Google Workspace",
        supportChannel: "Email",
        salesNeed: "Lead Follow-Up",
        automationNeed: "Essential",
        aiAgents: "Helpful",
        meetingNotes: "Essential",
        designContent: "Helpful",
        citedResearch: "Not Needed",
        knowledgeBase: "Helpful",
        leadVolume: "Medium",
        contentVolume: "High",
        meetingVolume: "High",
        implementationOwner: "Ops lead / project manager",
        primaryBottleneck: "Meetings",
        mainGoal: "Save Time",
        firstWorkflowToFix: "Client meeting recap to task handoff and approval routing",
        currentTools: "Slack, Notion, HubSpot, Google Workspace, Fathom",
        specialFocus: "General Small Business",
        mainPlatforms: "Slack, Notion, HubSpot, Google Workspace",
        usesShopify: "No",
        usesOracle: "No",
        usesHealthcareSystems: "No",
        phoneSupportPriority: "Not Important",
        weeklyLeadVolume: "15-25 leads per week",
        weeklyMeetingVolume: "12-18 meetings per week",
        weeklySupportVolume: "Low",
        complianceSensitivity: "Low",
        securityAiNeed: "Not Important",
        planDeliveryEmail: "ops@northshoregrowth.example",
        notes: "The agency already has tools in place and now needs clearer ownership, stronger handoffs, better automation between meeting notes and task routing, and a 90-day scale plan."
      }
    },
    consultant: {
      blueprintTier: "Growth Blueprint",
      heroEyebrow: "Growth Blueprint Preview",
      heroTitle: "Solo consultant Growth Blueprint",
      heroCopy: "This sample uses the real Growth Blueprint report logic for a solo consultant or coach who needs stronger research, cleaner note capture, and more polished output without maintaining a complex stack.",
      intakeOverrides: {
        businessName: "Cedar Advisory",
        businessType: "Consultant",
        businessAddress: "205 Cordova St, Vancouver, BC",
        businessPhone: "604-555-0161",
        businessWebsite: "https://cedaradvisory.example",
        teamSize: "Solo",
        monthlyBudget: "Under $100/mo",
        techComfort: "Low",
        integrationPlatform: "Notion, Google Workspace, LinkedIn",
        supportChannel: "Email",
        salesNeed: "Proposal Drafting",
        automationNeed: "Helpful",
        aiAgents: "Not Needed",
        meetingNotes: "Helpful",
        designContent: "Helpful",
        citedResearch: "Helpful",
        knowledgeBase: "Helpful",
        leadVolume: "Low",
        contentVolume: "Medium",
        meetingVolume: "Medium",
        implementationOwner: "Owner / founder",
        primaryBottleneck: "Research",
        mainGoal: "Create Content Faster",
        firstWorkflowToFix: "Research notes to polished client-ready draft",
        currentTools: "Google Workspace, LinkedIn, scattered notes",
        specialFocus: "General Small Business",
        mainPlatforms: "Google Workspace, LinkedIn, Notion",
        usesShopify: "No",
        usesOracle: "No",
        usesHealthcareSystems: "No",
        phoneSupportPriority: "Not Important",
        weeklyLeadVolume: "1-5 leads per week",
        weeklyMeetingVolume: "3-6 meetings per week",
        weeklySupportVolume: "Low",
        complianceSensitivity: "Low",
        securityAiNeed: "Not Important",
        planDeliveryEmail: "owner@cedaradvisory.example",
        notes: "The consultant wants a lean stack that turns research and client thinking into stronger deliverables with less blank-page time."
      }
    },
    "abc-company": {
      blueprintTier: "Scale Blueprint",
      heroEyebrow: "Scale Blueprint Preview",
      heroTitle: "ABC Company Scale Blueprint",
      heroCopy: "This sample uses the real Scale Blueprint report logic for an agency-style business that wants a stronger operating layer around content production, meeting recap handoffs, and execution ownership.",
      intakeOverrides: {
        businessName: "ABC Company",
        businessType: "Agency",
        businessAddress: "610 Richards St, Vancouver, BC",
        businessPhone: "604-555-0144",
        businessWebsite: "https://abc-company.example",
        teamSize: "2-5",
        monthlyBudget: "$300-$1000/mo",
        techComfort: "Medium",
        integrationPlatform: "Slack, Notion, Google Workspace, HubSpot",
        supportChannel: "Email",
        salesNeed: "Pipeline Updates",
        automationNeed: "Helpful",
        aiAgents: "Helpful",
        meetingNotes: "Essential",
        designContent: "Helpful",
        citedResearch: "Not Needed",
        knowledgeBase: "Helpful",
        leadVolume: "Medium",
        contentVolume: "High",
        meetingVolume: "High",
        implementationOwner: "Ops lead / project manager",
        primaryBottleneck: "Content Creation",
        mainGoal: "Save Time",
        firstWorkflowToFix: "Meeting recap to content brief and internal handoff",
        currentTools: "Google Workspace, Slack, Notion, Canva, HubSpot",
        specialFocus: "General Small Business",
        mainPlatforms: "Slack, Notion, Google Workspace",
        usesShopify: "No",
        usesOracle: "No",
        usesHealthcareSystems: "No",
        phoneSupportPriority: "Not Important",
        weeklyLeadVolume: "6-12 leads per week",
        weeklyMeetingVolume: "8-12 meetings per week",
        weeklySupportVolume: "Low",
        complianceSensitivity: "Low",
        securityAiNeed: "Not Important",
        planDeliveryEmail: "owner@abc-company.example",
        notes: "ABC Company needs clearer ownership, a better recap-to-content process, and a scale path that does not add random tools without proving the workflow first."
      }
    },
    creator: {
      blueprintTier: "Growth Blueprint",
      heroEyebrow: "Growth Blueprint Preview",
      heroTitle: "Creator Growth Blueprint",
      heroCopy: "This sample uses the real Growth Blueprint report logic for a creator business that wants stronger scripting, repurposing, and publishing consistency without a bloated production stack.",
      intakeOverrides: {
        businessName: "North Coast Creator Studio",
        businessType: "Creator",
        businessAddress: "Gastown, Vancouver, BC",
        businessPhone: "604-555-0128",
        businessWebsite: "https://northcoastcreator.example",
        teamSize: "Solo",
        monthlyBudget: "Under $100/mo",
        techComfort: "Medium",
        integrationPlatform: "Instagram, YouTube, TikTok",
        creatorPlatform: "YouTube",
        supportChannel: "DMs / Social",
        salesNeed: "Lead Capture",
        automationNeed: "Helpful",
        aiAgents: "Not Needed",
        meetingNotes: "Not Needed",
        designContent: "Essential",
        citedResearch: "Not Needed",
        knowledgeBase: "Helpful",
        leadVolume: "Low",
        contentVolume: "High",
        meetingVolume: "Low",
        implementationOwner: "Owner / founder",
        primaryBottleneck: "Content Creation",
        mainGoal: "Create Content Faster",
        firstWorkflowToFix: "Long-form recording to clips, captions, and weekly posts",
        currentTools: "Canva, phone camera, basic editing tools",
        specialFocus: "General Small Business",
        mainPlatforms: "Instagram, YouTube, TikTok",
        usesShopify: "No",
        usesOracle: "No",
        usesHealthcareSystems: "No",
        phoneSupportPriority: "Not Important",
        weeklyLeadVolume: "Low",
        weeklyMeetingVolume: "Low",
        weeklySupportVolume: "Low",
        complianceSensitivity: "Low",
        securityAiNeed: "Not Important",
        planDeliveryEmail: "hello@northcoastcreator.example",
        notes: "The creator wants a stack that turns one good source into more publishable assets without building a complex media operation too early."
      }
    },
    shopify: {
      blueprintTier: "Growth Blueprint",
      heroEyebrow: "Growth Blueprint Preview",
      heroTitle: "Shopify Growth Blueprint",
      heroCopy: "This sample uses the real Growth Blueprint report logic for a Shopify-first brand that wants stronger product content, smarter retention, cleaner support handling, and better store-side execution.",
      intakeOverrides: {
        businessName: "Harbor Home Goods",
        businessType: "Ecommerce",
        businessAddress: "Kitsilano, Vancouver, BC",
        businessPhone: "604-555-0170",
        businessWebsite: "https://harborhomegoods.example",
        teamSize: "2-5",
        monthlyBudget: "$100-$300/mo",
        techComfort: "Medium",
        integrationPlatform: "Shopify, Instagram, Klaviyo",
        supportChannel: "Email",
        salesNeed: "Lead Follow-Up",
        automationNeed: "Helpful",
        aiAgents: "Helpful",
        meetingNotes: "Not Needed",
        designContent: "Helpful",
        citedResearch: "Not Needed",
        knowledgeBase: "Helpful",
        leadVolume: "Medium",
        contentVolume: "Medium",
        meetingVolume: "Low",
        implementationOwner: "Ops lead / project manager",
        primaryBottleneck: "Customer Support",
        mainGoal: "Improve Service",
        firstWorkflowToFix: "Product content and retention follow-up for key collections",
        currentTools: "Shopify, Klaviyo, Canva",
        specialFocus: "Shopify Store",
        mainPlatforms: "Shopify, Instagram, Klaviyo",
        usesShopify: "Yes",
        usesOracle: "No",
        usesHealthcareSystems: "No",
        phoneSupportPriority: "Not Important",
        weeklyLeadVolume: "Medium",
        weeklyMeetingVolume: "Low",
        weeklySupportVolume: "Medium",
        complianceSensitivity: "Low",
        securityAiNeed: "Not Important",
        planDeliveryEmail: "team@harborhomegoods.example",
        notes: "The store wants a tighter mix of product content, retention, and support improvements without adding app sprawl too early."
      }
    }
  };

  function normalizeWhitespace(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  }

  function updateHeroContent(config) {
    const eyebrow = document.getElementById("sampleReportEyebrow");
    const title = document.getElementById("sampleReportTitle");
    const copy = document.getElementById("sampleReportCopy");
    const buyLink = document.querySelector('.hero-actions a[href*="buy-premium-plan"]');
    const footerCopy = document.querySelector(".site-footer-copy");

    if (eyebrow) {
      eyebrow.textContent = config.heroEyebrow;
    }
    if (title) {
      title.textContent = config.heroTitle;
    }
    if (copy) {
      copy.textContent = config.heroCopy;
    }
    if (buyLink) {
      const isScale = config.blueprintTier === "Scale Blueprint";
      buyLink.href = `./buy-premium-plan.html?tier=${isScale ? "scale-blueprint" : "growth-blueprint"}`;
      buyLink.textContent = isScale ? "Buy Scale Blueprint" : "Buy Growth Blueprint";
    }
    if (footerCopy) {
      footerCopy.textContent = `${config.blueprintTier} sample preview shown in the same report structure as the paid blueprint.`;
    }
  }

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

  function renderPreviewPageHeader(pageNumber, totalPages, metaTitle, metaCopy, blueprintTier) {
    const letter = blueprintTier === "Scale Blueprint" ? "S" : "G";
    return `
      <div class="report-page-top">
        <span class="report-page-number">Page ${pageNumber} of ${totalPages}</span>
        <div class="report-page-meta">
          <div class="report-page-meta-main">
            <span class="report-page-meta-icon"><span class="report-page-meta-letter">${letter}</span></span>
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

  function renderPreviewPageFooter(pageNumber, blueprintTier) {
    return `
      <div class="report-page-footer">
        <span>${blueprintTier} Preview</span>
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

  function paginateReportPreview(root, pageConfig, blueprintTier) {
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

    const resolvedPages = pageConfig.map((page) => ({
      ...page,
      nodes: page.items.map((key) => takeNode(key)).filter(Boolean)
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
        ${renderPreviewPageHeader(index + 1, totalPages, page.title, page.copy, blueprintTier)}
        <div class="report-preview-page-body"></div>
        ${renderPreviewPageFooter(index + 1, blueprintTier)}
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

  const config = SAMPLE_REPORT_CONFIGS[reportKey];
  if (!config) {
    return;
  }

  updateHeroContent(config);

  const baseIntake = typeof generator.getSampleIntake === "function"
    ? generator.getSampleIntake()
    : {};

  const sampleIntake = {
    ...baseIntake,
    blueprintTier: config.blueprintTier,
    ...config.intakeOverrides
  };

  const plan = generator.generatePlan(sampleIntake);
  mount.innerHTML = generator.renderGeneratedPlan(plan);
  redactImplementationPreview(mount);
  paginateReportPreview(
    mount,
    config.blueprintTier === "Scale Blueprint" ? SCALE_PAGE_CONFIG : GROWTH_PAGE_CONFIG,
    config.blueprintTier
  );

  printButton?.addEventListener("click", () => {
    window.print();
  });
})();
