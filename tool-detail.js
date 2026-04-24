(function initializeAiToolDetailPage() {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  if (!data) {
    return;
  }

  const mount = document.getElementById("toolDetailMount");
  const titleNode = document.getElementById("toolDetailTitle");
  const introNode = document.getElementById("toolDetailIntro");
  const metaDescription = document.querySelector('meta[name="description"]');

  if (!mount) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedTool = (params.get("tool") || "").trim().toLowerCase();
  const toolConfig = data.TOOLS.find((tool) => data.toSlug(tool.name) === requestedTool);

  if (!toolConfig) {
    mount.innerHTML = `
      <article class="empty-state">
        We could not find that tool detail page. Try going back to the database and choosing another tool.
      </article>
    `;
    return;
  }

  const bestFor = toolConfig.businessTypes.join(", ");
  const implementationLabel = data.getImplementationLabel ? data.getImplementationLabel(toolConfig) : toolConfig.setupDifficulty;
  const creatorPlatforms = (toolConfig.creatorPlatforms || []).join(", ");
  const integrationPlatforms = (toolConfig.integrationPlatforms || []).join(", ");
  const languageUseCases = (toolConfig.languageUseCases || []).join(", ");
  const financeUseCases = (toolConfig.financeUseCases || []).join(", ");
  const supportChannels = (toolConfig.supportChannels || []).join(", ");
  const salesUseCases = (toolConfig.salesUseCases || []).join(", ");
  const aiAgents = toolConfig.agentFit && toolConfig.agentFit !== "Not Focused" ? toolConfig.agentFit : "";
  const companyUrl = String(toolConfig.companyUrl || "").trim();
  const worksBestWith = (toolConfig.worksBestWith || [])
    .map((toolName) => {
      const slug = data.toSlug(toolName);
      return `<a class="tool-mini-pill" href="./tool-detail.html?tool=${encodeURIComponent(slug)}">${data.escapeHtml(toolName)}<small>Related Tool</small></a>`;
    })
    .join("");

  if (titleNode) {
    titleNode.textContent = toolConfig.name;
  }
  if (introNode) {
    introNode.textContent = toolConfig.summary;
  }
  document.title = `${toolConfig.name} | EasyAIStack`;
  if (metaDescription) {
    metaDescription.setAttribute("content", `${toolConfig.name}: ${toolConfig.summary}`);
  }

  mount.innerHTML = `
    <article class="tool-detail-shell">
      <div class="tool-detail-top">
        <div class="tool-detail-hero">
          ${renderArtwork(toolConfig)}
          <div class="tool-detail-hero-copy">
            <p class="eyebrow">${data.escapeHtml(toolConfig.category)}</p>
            <h2>${data.escapeHtml(toolConfig.name)}</h2>
            <p class="summary-copy">${data.escapeHtml(toolConfig.summary)}</p>
            <div class="tag-grid">
              ${renderTag("Budget", data.getDisplayPrice(toolConfig))}
              ${renderTag("Setup", toolConfig.setupDifficulty)}
              ${renderTag("Implementation", implementationLabel)}
              ${renderTag("Time To Value", toolConfig.timeToValue)}
              ${renderTag("Best For", bestFor)}
              ${creatorPlatforms ? renderTag("Creator Platforms", creatorPlatforms) : ""}
              ${integrationPlatforms ? renderTag("Platform / Integrations", integrationPlatforms) : ""}
              ${languageUseCases ? renderTag("Language Need", languageUseCases) : ""}
              ${financeUseCases ? renderTag("Finance / Bookkeeping", financeUseCases) : ""}
              ${supportChannels ? renderTag("Support / Chat Channel", supportChannels) : ""}
              ${salesUseCases ? renderTag("Sales Need", salesUseCases) : ""}
              ${aiAgents ? renderTag("AI Agents", aiAgents) : ""}
            </div>
          </div>
        </div>

        <aside class="tool-detail-card">
          <p class="eyebrow">Best First Use</p>
          <h3>${data.escapeHtml(toolConfig.firstUseCase)}</h3>
          <p class="summary-copy"><strong>Main downside:</strong> ${data.escapeHtml(toolConfig.downside)}</p>
          <div class="result-link-row">
            ${companyUrl ? `<a class="guide-button" href="${data.escapeHtml(companyUrl)}" target="_blank" rel="noopener noreferrer">Official Site</a>` : ""}
            <button class="secondary-button compact-button" type="button" data-compare-tool="${data.escapeHtml(data.toSlug(toolConfig.name))}" data-compare-default-label="Add to Compare" data-compare-added-label="In Compare" aria-pressed="false">Add to Compare</button>
            <a class="guide-button" href="./browse.html?view=all&q=${encodeURIComponent(toolConfig.name)}">See In Database</a>
            <a class="guide-button" href="./index.html?businessType=${encodeURIComponent(toolConfig.businessTypes[0] || "Any")}">Run Planner</a>
          </div>
        </aside>
      </div>

      <div class="tool-detail-grid">
        <article class="paid-plan-section-card">
          <span class="paid-plan-section-label">Where It Fits</span>
          <h4>Best-fit stack role</h4>
          <p class="summary-copy">${data.escapeHtml(getRoleCopy(toolConfig))}</p>
        </article>

        <article class="paid-plan-section-card">
          <span class="paid-plan-section-label">Workload Fit</span>
          <h4>Good workloads for this tool</h4>
          <ul class="paid-plan-list">
            ${toolConfig.bottlenecks.map((item) => `<li>${data.escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>

        <article class="paid-plan-section-card">
          <span class="paid-plan-section-label">Goals</span>
          <h4>What it helps with most</h4>
          <ul class="paid-plan-list">
            ${toolConfig.goals.map((item) => `<li>${data.escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>

        <article class="paid-plan-section-card">
          <span class="paid-plan-section-label">Team Fit</span>
          <h4>Who usually gets value first</h4>
          <ul class="paid-plan-list">
            <li><strong>Team sizes:</strong> ${data.escapeHtml(toolConfig.teamSizes.join(", "))}</li>
            <li><strong>Tech comfort:</strong> ${data.escapeHtml(toolConfig.techComfort)}</li>
            <li><strong>Compliance fit:</strong> ${data.escapeHtml(toolConfig.complianceFit)}</li>
          </ul>
        </article>

        <article class="paid-plan-section-card">
          <span class="paid-plan-section-label">Implementation</span>
          <h4>What setup usually looks like</h4>
          <ul class="paid-plan-list">
            <li><strong>Who can usually implement it:</strong> ${data.escapeHtml(implementationLabel)}</li>
            <li><strong>Setup difficulty:</strong> ${data.escapeHtml(toolConfig.setupDifficulty)}</li>
            <li><strong>Time to value:</strong> ${data.escapeHtml(toolConfig.timeToValue)}</li>
          </ul>
          <p class="summary-copy">${data.escapeHtml(getImplementationCopy(toolConfig, implementationLabel))}</p>
          <div class="result-link-row">
            <a class="guide-button" href="./how-hard-are-ai-tools-to-implement.html">Read Implementation Guide</a>
          </div>
        </article>
      </div>

      ${worksBestWith
        ? `
          <section class="tool-detail-card">
            <p class="eyebrow">Works Best With</p>
            <h3>Related tools in the same stack</h3>
            <div class="stack-tool-list">
              ${worksBestWith}
            </div>
          </section>
        `
        : ""}
    </article>
  `;

  function renderTag(label, value) {
    return `<span class="tag"><strong>${data.escapeHtml(label)}:</strong> ${data.escapeHtml(value)}</span>`;
  }

  function renderArtwork(tool) {
    const colors = getCategoryColors(tool.category);
    const badge = tool.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    return `
      <div class="tool-artwork tool-detail-artwork" style="--tool-start:${data.escapeHtml(colors.start)}; --tool-end:${data.escapeHtml(colors.end)};">
        <span class="tool-artwork-badge" aria-hidden="true">${data.escapeHtml(badge)}</span>
        <small>${data.escapeHtml(tool.category)}</small>
      </div>
    `;
  }

  function getCategoryColors(category) {
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

    return colors[category] || { start: "#2f7cff", end: "#123b9c" };
  }

  function getRoleCopy(tool) {
    if (tool.category === "CRM") {
      return "This is strongest when the business needs a place to organize leads, follow-up, audience activity, or customer context instead of leaving everything in inboxes and DMs.";
    }
    if (tool.category === "Automation") {
      return "This tool fits best as the connective tissue in the stack, moving information between forms, audience channels, content steps, and the systems the team already uses.";
    }
    if (tool.category === "Content Studio" || tool.category === "Design") {
      return "This works best in the content-production layer of the stack, helping the team create, repurpose, package, or publish faster.";
    }
    if (tool.category === "Finance") {
      return "This belongs in the money layer of the stack, helping the business keep books cleaner, move invoices faster, and make better decisions from finance data.";
    }
    if (tool.category === "Analytics / BI") {
      return "This sits in the reporting layer of the stack, helping the business turn scattered data into KPI summaries, dashboards, and faster decisions.";
    }
    if (tool.category === "Research") {
      return "This is usually the research and planning layer, helping with topic discovery, source gathering, channel planning, or more confident decision-making before the work is created.";
    }
    if (tool.category === "Meetings") {
      return "This belongs in the meeting and follow-up layer of the stack, reducing recap work and turning calls into cleaner next steps.";
    }
    if (tool.category === "Voice / Phone AI") {
      return "This belongs in the phone and conversation layer of the stack, helping the business capture calls, coach teams, route follow-up, and reduce manual call cleanup.";
    }
    if (tool.category === "Security / Compliance") {
      return "This fits in the trust and governance layer of the stack, helping the business handle evidence collection, vendor reviews, questionnaires, and compliance work with less manual effort.";
    }
    if (tool.category === "Recruiting / HR") {
      return "This belongs in the hiring layer of the stack, helping the team source, screen, and manage recruiting work more efficiently when growth creates staffing needs.";
    }
    if (tool.category === "Ecommerce Personalization") {
      return "This sits in the ecommerce revenue layer of the stack, helping the store personalize recommendations, offers, and shopper journeys to improve conversion quality.";
    }
    if (tool.category === "Workspace" || tool.category === "Project Ops") {
      return "This is part of the operating system for the business, helping the team store knowledge, track work, or standardize handoffs.";
    }
    return "This tool works best as a practical layer inside a lean AI stack, not as a standalone replacement for every other system.";
  }

  function getImplementationCopy(tool, implementation) {
    if (implementation === "Owner Can Set Up") {
      return "Most small businesses can get useful value from this without technical help. The main work is choosing one clear use case, setting a few team rules, and actually using it consistently.";
    }
    if (implementation === "Admin / Ops Can Set Up") {
      return "This usually works best when an admin, ops-minded teammate, or implementation owner sets up the workflow, templates, and handoff rules so the rest of the team can follow a cleaner process.";
    }

    return "This is usually a heavier implementation. It tends to pay off more once the business has a clear owner, stronger process discipline, and someone comfortable with integrations, automation logic, or technical setup.";
  }
})();
