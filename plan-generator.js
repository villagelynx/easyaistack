(function initializeEasyAiStackPlanGenerator() {
  const data = window.SMALLBIZ_AI_STACK_DATA;
  if (!data) {
    return;
  }

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

  const FIELD_MAP = {
    blueprintTier: ["Blueprint Tier", "Plan Tier", "blueprintTier", "blueprint_tier", "Variant", "variant_title"],
    businessName: ["Business Name", "businessName", "business_name", "Company", "company"],
    businessType: ["Business Type", "businessType", "business_type"],
    creatorPlatform: ["Creator Platform", "creatorPlatform", "creator_platform"],
    integrationPlatform: ["Platform / Integrations", "Integration Platform", "integrationPlatform", "integration_platform"],
    languageNeed: ["Language Need", "languageNeed", "language_need"],
    financeNeed: ["Finance / Bookkeeping", "Finance Need", "financeNeed", "finance_need"],
    supportChannel: ["Support / Chat Channel", "Support Channel", "supportChannel", "support_channel"],
    salesNeed: ["Sales Need", "salesNeed", "sales_need"],
    businessAddress: ["Business Address", "businessAddress", "business_address", "Address", "address"],
    businessPhone: ["Business Phone", "businessPhone", "business_phone", "Phone", "phone"],
    businessWebsite: ["Business Website", "Website", "website", "businessWebsite", "business_website", "url", "URL"],
    teamSize: ["Team Size", "teamSize", "team_size"],
    monthlyBudget: ["Monthly Budget", "Budget", "monthlyBudget", "monthly_budget"],
    techComfort: ["Tech Comfort", "techComfort", "tech_comfort"],
    automationNeed: ["Automation Need", "automationNeed", "automation_need"],
    aiAgents: ["AI Agents", "aiAgents", "ai_agents"],
    meetingNotes: ["Meeting Notes", "meetingNotes", "meeting_notes"],
    designContent: ["Design & Content", "Design Content", "designContent", "design_content"],
    citedResearch: ["Cited Research", "citedResearch", "cited_research"],
    knowledgeBase: ["Internal Knowledge Base", "Knowledge Base", "knowledgeBase", "knowledge_base"],
    leadVolume: ["Lead Volume", "leadVolume", "lead_volume"],
    contentVolume: ["Content Volume", "contentVolume", "content_volume"],
    meetingVolume: ["Meeting Volume", "meetingVolume", "meeting_volume"],
    implementationOwner: ["Implementation Owner", "implementationOwner", "implementation_owner"],
    primaryBottleneck: ["Primary Bottleneck", "primaryBottleneck", "primary_bottleneck"],
    mainGoal: ["Main Goal", "mainGoal", "main_goal"],
    firstWorkflowToFix: ["First Workflow To Fix", "firstWorkflowToFix", "first_workflow_to_fix"],
    currentTools: ["Current Tools", "currentTools", "current_tools"],
    specialFocus: ["Special Focus", "specialFocus", "special_focus"],
    mainPlatforms: ["Main Platforms", "mainPlatforms", "main_platforms"],
    usesShopify: ["Already Uses Shopify", "Uses Shopify", "usesShopify", "uses_shopify"],
    usesOracle: ["Already Uses Oracle", "Uses Oracle", "usesOracle", "uses_oracle"],
    usesHealthcareSystems: ["Already Uses Healthcare Systems", "Uses Healthcare Systems", "usesHealthcareSystems", "uses_healthcare_systems"],
    phoneSupportPriority: ["Phone Support Priority", "phoneSupportPriority", "phone_support_priority"],
    weeklyLeadVolume: ["Weekly Lead Volume", "weeklyLeadVolume", "weekly_lead_volume"],
    weeklyMeetingVolume: ["Weekly Meeting Volume", "weeklyMeetingVolume", "weekly_meeting_volume"],
    weeklySupportVolume: ["Weekly Support Volume", "weeklySupportVolume", "weekly_support_volume"],
    complianceSensitivity: ["Compliance Sensitivity", "complianceSensitivity", "compliance_sensitivity"],
    securityAiNeed: ["Security / Regulated AI Need", "Security AI Need", "securityAiNeed", "security_ai_need"],
    planDeliveryEmail: ["Plan Delivery Email", "planDeliveryEmail", "plan_delivery_email", "Delivery Email", "delivery_email", "email", "Email"],
    notes: ["Notes", "notes", "Extra Notes", "extra_notes", "note"]
  };

  const PLATFORM_KEYWORDS = {
    Shopify: ["shopify"],
    LinkedIn: ["linkedin"],
    Meta: ["meta", "facebook", "fb ads", "facebook ads", "instagram ads"],
    Instagram: ["instagram", "ig"],
    YouTube: ["youtube", "youtube shorts"],
    TikTok: ["tiktok", "tik tok"],
    "Google Workspace": ["google workspace", "gmail", "google docs", "google drive", "google sheets", "google meet"],
    "Microsoft 365": ["microsoft 365", "office 365", "outlook", "teams", "excel", "word", "sharepoint"],
    Slack: ["slack"],
    HubSpot: ["hubspot"],
    Notion: ["notion"],
    Calendly: ["calendly"]
  };

  const SAMPLE_INTAKE = {
    blueprintTier: "Growth Blueprint",
    businessName: "Bluebird Plumbing",
    businessType: "Local Service",
    creatorPlatform: "All",
    integrationPlatform: "Google Workspace, Calendly, Meta",
    languageNeed: "Any",
    financeNeed: "Invoices & Payments",
    supportChannel: "Phone",
    salesNeed: "Lead Follow-Up",
    businessAddress: "123 Main St, Vancouver, BC",
    businessPhone: "604-555-0199",
    businessWebsite: "https://bluebirdplumbing.example",
    teamSize: "2-5",
    monthlyBudget: "$100-$300/mo",
    techComfort: "Medium",
    automationNeed: "Helpful",
    aiAgents: "Helpful",
    meetingNotes: "Helpful",
    designContent: "Not Needed",
    citedResearch: "Not Needed",
    knowledgeBase: "Helpful",
    leadVolume: "Medium",
    contentVolume: "Low",
    meetingVolume: "Low",
    implementationOwner: "Owner / founder",
    primaryBottleneck: "Lead Follow-Up",
    mainGoal: "Close More Leads",
    firstWorkflowToFix: "Lead form to callback and estimate follow-up",
    currentTools: "Google Workspace, Jobber, Calendly",
    specialFocus: "General Small Business",
    mainPlatforms: "Google Workspace, phone, Calendly, Meta",
    usesShopify: "No",
    usesOracle: "No",
    usesHealthcareSystems: "No",
    phoneSupportPriority: "Helpful",
    weeklyLeadVolume: "12-18 leads per week",
    weeklyMeetingVolume: "3-5 calls per week",
    weeklySupportVolume: "Low",
    complianceSensitivity: "Low",
    securityAiNeed: "Not Important",
    planDeliveryEmail: "owner@bluebirdplumbing.example",
    notes: "The owner wants something simple that improves response time without adding a complicated CRM on day one."
  };

  function normalizeWhitespace(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  }

  function normalizeKey(value) {
    return normalizeWhitespace(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
  }

  function toTitleCase(value) {
    return normalizeWhitespace(value)
      .split(/[\s/-]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  function toSentence(value) {
    const nextValue = normalizeWhitespace(value);
    if (!nextValue) {
      return "";
    }

    return nextValue.charAt(0).toUpperCase() + nextValue.slice(1);
  }

  function formatNaturalList(values) {
    const items = values.filter(Boolean);
    if (items.length === 0) {
      return "";
    }
    if (items.length === 1) {
      return items[0];
    }
    if (items.length === 2) {
      return `${items[0]} and ${items[1]}`;
    }
    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
  }

  function getTodayLabel() {
    return new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function parsePropertiesObject(rawProperties) {
    const properties = {};

    if (!rawProperties) {
      return properties;
    }

    if (Array.isArray(rawProperties)) {
      rawProperties.forEach((entry) => {
        if (!entry || typeof entry !== "object") {
          return;
        }

        const key = normalizeWhitespace(entry.name || entry.key);
        const value = normalizeWhitespace(entry.value || entry.val);
        if (key) {
          properties[key] = value;
        }
      });
      return properties;
    }

    if (typeof rawProperties === "object") {
      Object.entries(rawProperties).forEach(([key, value]) => {
        if (value == null || typeof value === "object") {
          return;
        }
        const cleanKey = normalizeWhitespace(key);
        if (cleanKey) {
          properties[cleanKey] = normalizeWhitespace(value);
        }
      });
    }

    return properties;
  }

  function formatAddress(address) {
    if (!address || typeof address !== "object") {
      return "";
    }

    return [
      address.company,
      address.address1,
      address.address2,
      [address.city, address.province || address.province_code].filter(Boolean).join(", "),
      address.zip,
      address.country || address.country_code
    ]
      .map((part) => normalizeWhitespace(part))
      .filter(Boolean)
      .join(", ");
  }

  function pickField(properties, fieldName) {
    const labels = FIELD_MAP[fieldName] || [];
    const entries = Object.entries(properties);

    for (let index = 0; index < labels.length; index += 1) {
      const labelKey = normalizeKey(labels[index]);
      const matchedEntry = entries.find(([key]) => normalizeKey(key) === labelKey);
      if (matchedEntry) {
        return normalizeWhitespace(matchedEntry[1]);
      }
    }

    return "";
  }

  function normalizeIntake(rawIntake) {
    const intake = {};
    Object.keys(FIELD_MAP).forEach((fieldName) => {
      intake[fieldName] = normalizeWhitespace(rawIntake && rawIntake[fieldName]);
    });
    return intake;
  }

  function findPlanLineItem(rawOrder) {
    if (!rawOrder || typeof rawOrder !== "object" || !Array.isArray(rawOrder.line_items)) {
      return null;
    }

    const matchingItem = rawOrder.line_items.find((lineItem) => {
      const lineItemText = normalizeWhitespace([
        lineItem.title,
        lineItem.name,
        lineItem.sku,
        lineItem.variant_title
      ].join(" ")).toLowerCase();
      const properties = parsePropertiesObject(lineItem.properties);
      return lineItemText.includes("ai stack plan")
        || lineItemText.includes("growth blueprint")
        || lineItemText.includes("scale blueprint")
        || Boolean(properties["Business Name"])
        || Boolean(properties["Plan Delivery Email"]);
    });

    return matchingItem || rawOrder.line_items.find((lineItem) => Object.keys(parsePropertiesObject(lineItem.properties)).length > 0) || null;
  }

  function extractIntakeFromShopify(rawOrder) {
    if (!rawOrder || typeof rawOrder !== "object") {
      return normalizeIntake({});
    }

    const lineItem = findPlanLineItem(rawOrder) || rawOrder;
    const properties = parsePropertiesObject(lineItem.properties || rawOrder.properties || rawOrder);
    const shippingAddress = rawOrder.shipping_address || rawOrder.billing_address || {};
    const fallbackCompany = normalizeWhitespace(shippingAddress.company || rawOrder.company || rawOrder.name);
    const fallbackAddress = formatAddress(shippingAddress);
    const fallbackPhone = normalizeWhitespace(shippingAddress.phone || rawOrder.phone);
    const fallbackEmail = normalizeWhitespace(rawOrder.email || rawOrder.contact_email || (rawOrder.customer && rawOrder.customer.email));

    return normalizeIntake({
      blueprintTier: pickField(properties, "blueprintTier") || normalizeBlueprintTier(lineItem.variant_title || lineItem.title || lineItem.name),
      businessName: pickField(properties, "businessName") || fallbackCompany,
      businessType: pickField(properties, "businessType"),
      creatorPlatform: pickField(properties, "creatorPlatform"),
      integrationPlatform: pickField(properties, "integrationPlatform"),
      languageNeed: pickField(properties, "languageNeed"),
      financeNeed: pickField(properties, "financeNeed"),
      supportChannel: pickField(properties, "supportChannel"),
      salesNeed: pickField(properties, "salesNeed"),
      businessAddress: pickField(properties, "businessAddress") || fallbackAddress,
      businessPhone: pickField(properties, "businessPhone") || fallbackPhone,
      businessWebsite: pickField(properties, "businessWebsite"),
      teamSize: pickField(properties, "teamSize"),
      monthlyBudget: pickField(properties, "monthlyBudget"),
      techComfort: pickField(properties, "techComfort"),
      automationNeed: pickField(properties, "automationNeed"),
      aiAgents: pickField(properties, "aiAgents"),
      meetingNotes: pickField(properties, "meetingNotes"),
      designContent: pickField(properties, "designContent"),
      citedResearch: pickField(properties, "citedResearch"),
      knowledgeBase: pickField(properties, "knowledgeBase"),
      leadVolume: pickField(properties, "leadVolume"),
      contentVolume: pickField(properties, "contentVolume"),
      meetingVolume: pickField(properties, "meetingVolume"),
      implementationOwner: pickField(properties, "implementationOwner"),
      primaryBottleneck: pickField(properties, "primaryBottleneck"),
      mainGoal: pickField(properties, "mainGoal"),
      firstWorkflowToFix: pickField(properties, "firstWorkflowToFix"),
      currentTools: pickField(properties, "currentTools"),
      specialFocus: pickField(properties, "specialFocus"),
      mainPlatforms: pickField(properties, "mainPlatforms"),
      usesShopify: pickField(properties, "usesShopify"),
      usesOracle: pickField(properties, "usesOracle"),
      usesHealthcareSystems: pickField(properties, "usesHealthcareSystems"),
      phoneSupportPriority: pickField(properties, "phoneSupportPriority"),
      weeklyLeadVolume: pickField(properties, "weeklyLeadVolume"),
      weeklyMeetingVolume: pickField(properties, "weeklyMeetingVolume"),
      weeklySupportVolume: pickField(properties, "weeklySupportVolume"),
      complianceSensitivity: pickField(properties, "complianceSensitivity"),
      securityAiNeed: pickField(properties, "securityAiNeed"),
      planDeliveryEmail: pickField(properties, "planDeliveryEmail") || fallbackEmail,
      notes: pickField(properties, "notes")
    });
  }

  function getSampleShopifyOrder() {
    return {
      id: 1001,
      name: "#1001",
      email: SAMPLE_INTAKE.planDeliveryEmail,
      line_items: [
        {
          title: "AI Stack Plan",
          variant_title: "Growth Blueprint",
          quantity: 1,
          properties: [
            { name: "Blueprint Tier", value: SAMPLE_INTAKE.blueprintTier },
            { name: "Business Name", value: SAMPLE_INTAKE.businessName },
            { name: "Business Type", value: SAMPLE_INTAKE.businessType },
            { name: "Creator Platform", value: SAMPLE_INTAKE.creatorPlatform },
            { name: "Platform / Integrations", value: SAMPLE_INTAKE.integrationPlatform },
            { name: "Language Need", value: SAMPLE_INTAKE.languageNeed },
            { name: "Finance / Bookkeeping", value: SAMPLE_INTAKE.financeNeed },
            { name: "Support / Chat Channel", value: SAMPLE_INTAKE.supportChannel },
            { name: "Sales Need", value: SAMPLE_INTAKE.salesNeed },
            { name: "Business Address", value: SAMPLE_INTAKE.businessAddress },
            { name: "Business Phone", value: SAMPLE_INTAKE.businessPhone },
            { name: "Business Website", value: SAMPLE_INTAKE.businessWebsite },
            { name: "Team Size", value: SAMPLE_INTAKE.teamSize },
            { name: "Monthly Budget", value: SAMPLE_INTAKE.monthlyBudget },
            { name: "Tech Comfort", value: SAMPLE_INTAKE.techComfort },
            { name: "Automation Need", value: SAMPLE_INTAKE.automationNeed },
            { name: "AI Agents", value: SAMPLE_INTAKE.aiAgents },
            { name: "Meeting Notes", value: SAMPLE_INTAKE.meetingNotes },
            { name: "Design & Content", value: SAMPLE_INTAKE.designContent },
            { name: "Cited Research", value: SAMPLE_INTAKE.citedResearch },
            { name: "Internal Knowledge Base", value: SAMPLE_INTAKE.knowledgeBase },
            { name: "Lead Volume", value: SAMPLE_INTAKE.leadVolume },
            { name: "Content Volume", value: SAMPLE_INTAKE.contentVolume },
            { name: "Meeting Volume", value: SAMPLE_INTAKE.meetingVolume },
            { name: "Implementation Owner", value: SAMPLE_INTAKE.implementationOwner },
            { name: "Primary Bottleneck", value: SAMPLE_INTAKE.primaryBottleneck },
            { name: "Main Goal", value: SAMPLE_INTAKE.mainGoal },
            { name: "First Workflow To Fix", value: SAMPLE_INTAKE.firstWorkflowToFix },
            { name: "Current Tools", value: SAMPLE_INTAKE.currentTools },
            { name: "Special Focus", value: SAMPLE_INTAKE.specialFocus },
            { name: "Main Platforms", value: SAMPLE_INTAKE.mainPlatforms },
            { name: "Already Uses Shopify", value: SAMPLE_INTAKE.usesShopify },
            { name: "Already Uses Oracle", value: SAMPLE_INTAKE.usesOracle },
            { name: "Already Uses Healthcare Systems", value: SAMPLE_INTAKE.usesHealthcareSystems },
            { name: "Phone Support Priority", value: SAMPLE_INTAKE.phoneSupportPriority },
            { name: "Weekly Lead Volume", value: SAMPLE_INTAKE.weeklyLeadVolume },
            { name: "Weekly Meeting Volume", value: SAMPLE_INTAKE.weeklyMeetingVolume },
            { name: "Weekly Support Volume", value: SAMPLE_INTAKE.weeklySupportVolume },
            { name: "Compliance Sensitivity", value: SAMPLE_INTAKE.complianceSensitivity },
            { name: "Security / Regulated AI Need", value: SAMPLE_INTAKE.securityAiNeed },
            { name: "Plan Delivery Email", value: SAMPLE_INTAKE.planDeliveryEmail },
            { name: "Notes", value: SAMPLE_INTAKE.notes }
          ]
        }
      ]
    };
  }

  function matchFromOptions(options, value, fallbackValue) {
    const cleanValue = normalizeWhitespace(value);
    if (!cleanValue) {
      return fallbackValue;
    }

    const valueKey = normalizeKey(cleanValue);
    const directMatch = options.find((option) => normalizeKey(option) === valueKey);
    if (directMatch) {
      return directMatch;
    }

    return fallbackValue;
  }

  function normalizeBusinessType(value) {
    const businessTypeOptions = data.FILTERS.find((filter) => filter.key === "businessType").options;
    const directMatch = matchFromOptions(businessTypeOptions, value, "");
    if (directMatch) {
      return directMatch;
    }

    const lowerValue = normalizeWhitespace(value).toLowerCase();
    if (lowerValue.includes("service")) {
      return "Local Service";
    }
    if (lowerValue.includes("creator") || lowerValue.includes("influencer")) {
      return "Creator";
    }
    if (lowerValue.includes("agency")) {
      return "Agency";
    }
    if (lowerValue.includes("coach")) {
      return "Coach";
    }
    if (lowerValue.includes("consult")) {
      return "Consultant";
    }
    if (lowerValue.includes("ecom")) {
      return "Ecommerce";
    }
    if (lowerValue.includes("real estate")) {
      return "Real Estate";
    }
    if (lowerValue.includes("law") || lowerValue.includes("legal")) {
      return "Legal";
    }
    if (lowerValue.includes("medical") || lowerValue.includes("dental")) {
      return "Medical/Dental";
    }
    if (lowerValue.includes("saas") || lowerValue.includes("software")) {
      return "SaaS";
    }

    return "Any";
  }

  function normalizeBlueprintTier(value) {
    const lowerValue = normalizeWhitespace(value).toLowerCase();
    if (!lowerValue) {
      return "Growth Blueprint";
    }
    if (lowerValue.includes("scale") || lowerValue.includes("$59")) {
      return "Scale Blueprint";
    }
    if (lowerValue.includes("growth") || lowerValue.includes("$29") || lowerValue.includes("plan")) {
      return "Growth Blueprint";
    }
    return "Growth Blueprint";
  }

  function normalizeFilterValue(filterKey, value, fallbackValue) {
    const filter = data.FILTERS.find((candidate) => candidate.key === filterKey);
    if (!filter) {
      return fallbackValue;
    }

    return matchFromOptions(filter.options, value, fallbackValue || filter.options[0]);
  }

  function normalizeTeamSize(value) {
    const teamSizeOptions = data.FILTERS.find((filter) => filter.key === "teamSize").options;
    const directMatch = matchFromOptions(teamSizeOptions, value, "");
    if (directMatch) {
      return directMatch;
    }

    const numericMatch = String(value || "").match(/\d+/);
    if (!numericMatch) {
      return "Any";
    }

    const count = Number(numericMatch[0]);
    if (count <= 1) {
      return "Solo";
    }
    if (count <= 5) {
      return "2-5";
    }
    if (count <= 20) {
      return "6-20";
    }
    return "21+";
  }

  function normalizeBudget(value) {
    const budgetOptions = data.FILTERS.find((filter) => filter.key === "monthlyBudget").options;
    const directMatch = matchFromOptions(budgetOptions, value, "");
    if (directMatch) {
      return directMatch;
    }

    const numericMatch = String(value || "").replace(/,/g, "").match(/\d+/);
    if (!numericMatch) {
      return "Any";
    }

    const amount = Number(numericMatch[0]);
    if (amount < 100) {
      return "Under $100/mo";
    }
    if (amount <= 300) {
      return "$100-$300/mo";
    }
    if (amount <= 1000) {
      return "$300-$1000/mo";
    }
    return "$1000+/mo";
  }

  function normalizeScaleValue(value, options) {
    const directMatch = matchFromOptions(options, value, "");
    if (directMatch) {
      return directMatch;
    }

    const lowerValue = normalizeWhitespace(value).toLowerCase();
    if (lowerValue.includes("high")) {
      return "High";
    }
    if (lowerValue.includes("medium") || lowerValue.includes("mid")) {
      return "Medium";
    }
    if (lowerValue.includes("low")) {
      return "Low";
    }

    return options[0];
  }

  function isAffirmative(value) {
    const lowerValue = normalizeWhitespace(value).toLowerCase();
    return ["yes", "y", "true", "1"].includes(lowerValue);
  }

  function normalizeSpecialFocus(value) {
    const options = ["Any", "General Small Business", "Ecommerce", "Healthcare", "Enterprise Operations"];
    const directMatch = matchFromOptions(options, value, "");
    if (directMatch) {
      return directMatch;
    }

    const lowerValue = normalizeWhitespace(value).toLowerCase();
    if (lowerValue.includes("ecom") || lowerValue.includes("shopify")) {
      return "Ecommerce";
    }
    if (lowerValue.includes("health") || lowerValue.includes("medical") || lowerValue.includes("clinical")) {
      return "Healthcare";
    }
    if (lowerValue.includes("enterprise") || lowerValue.includes("oracle") || lowerValue.includes("operations")) {
      return "Enterprise Operations";
    }
    if (lowerValue.includes("general") || lowerValue.includes("small business")) {
      return "General Small Business";
    }

    return "Any";
  }

  function normalizePhoneSupportPriority(value) {
    const options = ["Any", "Not Important", "Helpful", "Major Channel"];
    const directMatch = matchFromOptions(options, value, "");
    if (directMatch) {
      return directMatch;
    }

    const lowerValue = normalizeWhitespace(value).toLowerCase();
    if (lowerValue.includes("major") || lowerValue.includes("primary") || lowerValue.includes("main")) {
      return "Major Channel";
    }
    if (lowerValue.includes("help")) {
      return "Helpful";
    }
    if (lowerValue.includes("not") || lowerValue.includes("none") || lowerValue.includes("no")) {
      return "Not Important";
    }

    return "Any";
  }

  function normalizeSecurityAiNeed(value) {
    const options = ["Any", "Not Important", "Helpful", "Required"];
    const directMatch = matchFromOptions(options, value, "");
    if (directMatch) {
      return directMatch;
    }

    const lowerValue = normalizeWhitespace(value).toLowerCase();
    if (lowerValue.includes("required") || lowerValue.includes("regulated") || lowerValue.includes("strict")) {
      return "Required";
    }
    if (lowerValue.includes("help")) {
      return "Helpful";
    }
    if (lowerValue.includes("not") || lowerValue.includes("none") || lowerValue.includes("no")) {
      return "Not Important";
    }

    return "Any";
  }

  function normalizeNeedValue(value) {
    const options = ["Any", "Not Needed", "Helpful", "Essential"];
    const directMatch = matchFromOptions(options, value, "");
    if (directMatch) {
      return directMatch;
    }

    const lowerValue = normalizeWhitespace(value).toLowerCase();
    if (lowerValue.includes("essential") || lowerValue.includes("required")) {
      return "Essential";
    }
    if (lowerValue.includes("help")) {
      return "Helpful";
    }
    if (lowerValue.includes("not") || lowerValue.includes("none") || lowerValue.includes("no")) {
      return "Not Needed";
    }

    return "Any";
  }

  function ensureUniqueValue(values, value) {
    if (value && !values.includes(value)) {
      values.push(value);
    }
  }

  function elevateNeed(currentValue, targetValue) {
    const scale = ["Any", "Not Needed", "Helpful", "Essential"];
    return scale.indexOf(targetValue) > scale.indexOf(currentValue) ? targetValue : currentValue;
  }

  function getIntakeSignals(intake) {
    const text = normalizeWhitespace([intake.currentTools, intake.mainPlatforms, intake.notes].join(" ")).toLowerCase();

    return {
      specialFocus: normalizeSpecialFocus(intake.specialFocus),
      usesShopify: isAffirmative(intake.usesShopify) || text.includes("shopify"),
      usesOracle: isAffirmative(intake.usesOracle) || text.includes("oracle"),
      usesHealthcareSystems: isAffirmative(intake.usesHealthcareSystems) || text.includes("ehr") || text.includes("emr"),
      phoneSupportPriority: normalizePhoneSupportPriority(intake.phoneSupportPriority),
      securityAiNeed: normalizeSecurityAiNeed(intake.securityAiNeed)
    };
  }

  function deriveComplianceFromSignals(baseCompliance, signals) {
    const scale = ["Any", "Low", "Medium", "High"];
    let nextCompliance = baseCompliance;

    function bump(target) {
      if (scale.indexOf(target) > scale.indexOf(nextCompliance)) {
        nextCompliance = target;
      }
    }

    if (signals.securityAiNeed === "Required") {
      bump("High");
    } else if (signals.securityAiNeed === "Helpful") {
      bump("Medium");
    }

    if (signals.specialFocus === "Healthcare" || signals.usesHealthcareSystems) {
      bump("High");
    }

    if (signals.specialFocus === "Enterprise Operations" || signals.usesOracle) {
      bump("Medium");
    }

    return nextCompliance;
  }

  function normalizeBottleneck(value, workflowText, notesText) {
    const bottleneckOptions = data.FILTERS.find((filter) => filter.key === "primaryBottleneck").options;
    const directMatch = matchFromOptions(bottleneckOptions, value, "");
    if (directMatch) {
      return directMatch;
    }

    const text = normalizeWhitespace([value, workflowText, notesText].join(" ")).toLowerCase();
    if (text.includes("lead") || text.includes("follow-up") || text.includes("follow up") || text.includes("proposal") || text.includes("estimate")) {
      return "Lead Follow-Up";
    }
    if (text.includes("content") || text.includes("video") || text.includes("social") || text.includes("creative")) {
      return "Content Creation";
    }
    if (text.includes("admin") || text.includes("busywork") || text.includes("back office")) {
      return "Admin Work";
    }
    if (text.includes("meeting") || text.includes("call recap") || text.includes("transcript")) {
      return "Meetings";
    }
    if (text.includes("research") || text.includes("analysis") || text.includes("source")) {
      return "Research";
    }
    if (text.includes("support") || text.includes("customer question") || text.includes("chat")) {
      return "Customer Support";
    }
    if (text.includes("docs") || text.includes("knowledge") || text.includes("sop")) {
      return "Internal Docs";
    }
    if (text.includes("schedule") || text.includes("booking")) {
      return "Scheduling";
    }

    return "Any";
  }

  function normalizeMainGoal(value, workflowText, notesText) {
    const goalOptions = data.FILTERS.find((filter) => filter.key === "mainGoal").options;
    const directMatch = matchFromOptions(goalOptions, value, "");
    if (directMatch) {
      return directMatch;
    }

    const text = normalizeWhitespace([value, workflowText, notesText].join(" ")).toLowerCase();
    if (text.includes("lead") || text.includes("close") || text.includes("book more")) {
      return "Close More Leads";
    }
    if (text.includes("content") || text.includes("publish") || text.includes("create faster")) {
      return "Create Content Faster";
    }
    if (text.includes("service") || text.includes("customer experience")) {
      return "Improve Service";
    }
    if (text.includes("busywork") || text.includes("admin")) {
      return "Reduce Busywork";
    }
    if (text.includes("save time") || text.includes("faster")) {
      return "Save Time";
    }

    return "Any";
  }

  function extractPlatforms(textValue) {
    const haystack = normalizeWhitespace(textValue).toLowerCase();
    const matches = Object.entries(PLATFORM_KEYWORDS)
      .filter(([, keywords]) => keywords.some((keyword) => haystack.includes(keyword)))
      .map(([platform]) => platform);

    return matches.filter((platform, index, values) => values.indexOf(platform) === index);
  }

  function deriveCreatorPlatform(intake, platforms) {
    const matchingPlatforms = ["TikTok", "Instagram", "YouTube"].filter((platform) => platforms.includes(platform));

    if (matchingPlatforms.length >= 2) {
      return "All";
    }
    if (matchingPlatforms.length === 1) {
      return matchingPlatforms[0];
    }
    if (normalizeBusinessType(intake.businessType) === "Creator") {
      return "All";
    }

    return "All";
  }

  function parseVolumeLevel(value, thresholds) {
    const text = normalizeWhitespace(value).toLowerCase();
    if (!text || text.includes("not relevant") || text.includes("n/a")) {
      return "Any";
    }
    if (text.includes("high")) {
      return "High";
    }
    if (text.includes("medium")) {
      return "Medium";
    }
    if (text.includes("low")) {
      return "Low";
    }

    const numberMatch = text.match(/\d+/);
    if (!numberMatch) {
      return "Any";
    }

    const amount = Number(numberMatch[0]);
    if (amount <= thresholds.lowMax) {
      return "Low";
    }
    if (amount <= thresholds.mediumMax) {
      return "Medium";
    }
    return "High";
  }

  function deriveSupportChannel(intake) {
    if (normalizePhoneSupportPriority(intake.phoneSupportPriority) === "Major Channel") {
      return "Phone";
    }

    const text = normalizeWhitespace([intake.mainPlatforms, intake.firstWorkflowToFix, intake.notes].join(" ")).toLowerCase();
    if (!text) {
      return "Any";
    }
    if (text.includes("phone") || text.includes("call")) {
      return "Phone";
    }
    if (text.includes("dm") || text.includes("instagram") || text.includes("facebook") || text.includes("messenger")) {
      return "DMs / Social";
    }
    if (text.includes("chat") || text.includes("website")) {
      return "Website Chat";
    }
    if (text.includes("help center") || text.includes("knowledge base")) {
      return "Help Center";
    }
    if (text.includes("email") || text.includes("inbox")) {
      return "Email";
    }
    return "Any";
  }

  function deriveSalesNeed(intake) {
    const text = normalizeWhitespace([intake.primaryBottleneck, intake.firstWorkflowToFix, intake.notes].join(" ")).toLowerCase();
    if (!text) {
      return "Any";
    }
    if (text.includes("proposal") || text.includes("quote") || text.includes("estimate")) {
      return "Proposal Drafting";
    }
    if (text.includes("pipeline") || text.includes("stage")) {
      return "Pipeline Updates";
    }
    if (text.includes("lead form") || text.includes("inquiry") || text.includes("capture")) {
      return "Lead Capture";
    }
    if (text.includes("lead") || text.includes("follow-up") || text.includes("follow up")) {
      return "Lead Follow-Up";
    }
    return "Any";
  }

  function deriveFinanceNeed(intake) {
    const text = normalizeWhitespace([intake.firstWorkflowToFix, intake.notes].join(" ")).toLowerCase();
    if (!text) {
      return "Any";
    }
    if (text.includes("bookkeeping")) {
      return "Bookkeeping";
    }
    if (text.includes("invoice") || text.includes("payment")) {
      return "Invoices & Payments";
    }
    if (text.includes("cash flow")) {
      return "Cash Flow Insights";
    }
    if (text.includes("tax") || text.includes("sales tax")) {
      return "Tax / Sales Tax";
    }
    return "Any";
  }

  function deriveLanguageNeed(intake) {
    const text = normalizeWhitespace([intake.firstWorkflowToFix, intake.notes, intake.mainPlatforms].join(" ")).toLowerCase();
    if (!text) {
      return "Any";
    }
    if (text.includes("translate") || text.includes("translation")) {
      return "Text Translation";
    }
    if (text.includes("multilingual") || text.includes("rewrite in") || text.includes("localized writing")) {
      return "Multilingual Writing";
    }
    if (text.includes("live translation") || text.includes("meeting translation")) {
      return "Live Meeting Translation";
    }
    if (text.includes("dub") || text.includes("voiceover")) {
      return "Video Dubbing";
    }
    if (text.includes("subtitle") || text.includes("caption") || text.includes("localization")) {
      return "Subtitles / Localization";
    }
    return "Any";
  }

  function deriveAutomationNeed(intake, platforms, leadVolume, meetingVolume, supportVolume, signals) {
    const text = normalizeWhitespace([intake.firstWorkflowToFix, intake.notes, intake.currentTools].join(" ")).toLowerCase();
    const platformCount = platforms.length;
    const hasHighVolume = [leadVolume, meetingVolume, supportVolume].includes("High");

    if (signals.specialFocus === "Enterprise Operations" || signals.usesOracle) {
      return "Essential";
    }
    if (text.includes("automation") || text.includes("route") || text.includes("handoff") || text.includes("sync")) {
      return "Essential";
    }
    if (signals.phoneSupportPriority === "Major Channel" || signals.specialFocus === "Ecommerce" || signals.usesShopify || platformCount >= 2 || hasHighVolume) {
      return "Helpful";
    }
    return "Any";
  }

  function deriveAgentNeed(intake, leadVolume, supportVolume, signals) {
    const text = normalizeWhitespace([intake.notes, intake.firstWorkflowToFix].join(" ")).toLowerCase();
    if (text.includes("agent") || text.includes("voice bot") || text.includes("chatbot")) {
      return "Essential";
    }
    if (signals.phoneSupportPriority === "Major Channel" || signals.specialFocus === "Enterprise Operations" || leadVolume === "High" || supportVolume === "High") {
      return "Helpful";
    }
    return "Any";
  }

  function deriveMeetingNotesNeed(intake, meetingVolume) {
    const text = normalizeWhitespace([intake.primaryBottleneck, intake.firstWorkflowToFix].join(" ")).toLowerCase();
    if (text.includes("meeting") || text.includes("call recap") || meetingVolume === "High") {
      return "Essential";
    }
    if (meetingVolume === "Medium") {
      return "Helpful";
    }
    return "Any";
  }

  function deriveDesignNeed(intake, creatorPlatform, platforms) {
    const businessType = normalizeBusinessType(intake.businessType);
    const text = normalizeWhitespace([intake.primaryBottleneck, intake.mainGoal, intake.firstWorkflowToFix].join(" ")).toLowerCase();

    if (text.includes("content") || text.includes("social") || text.includes("video")) {
      return "Essential";
    }
    if (businessType === "Creator" || businessType === "Agency" || businessType === "Ecommerce" || creatorPlatform !== "All" || ["Meta", "Instagram", "TikTok", "YouTube", "LinkedIn"].some((platform) => platforms.includes(platform))) {
      return "Helpful";
    }
    return "Any";
  }

  function deriveResearchNeed(intake) {
    const businessType = normalizeBusinessType(intake.businessType);
    const text = normalizeWhitespace([intake.primaryBottleneck, intake.notes].join(" ")).toLowerCase();

    if (text.includes("research") || text.includes("sources") || text.includes("analysis")) {
      return "Essential";
    }
    if (businessType === "Legal" || businessType === "Medical/Dental") {
      return "Helpful";
    }
    return "Any";
  }

  function deriveKnowledgeNeed(intake, signals) {
    const teamSize = normalizeTeamSize(intake.teamSize);
    const text = normalizeWhitespace([intake.primaryBottleneck, intake.notes].join(" ")).toLowerCase();

    if (text.includes("docs") || text.includes("sop") || text.includes("knowledge") || text.includes("handoff")) {
      return "Essential";
    }
    if (signals.specialFocus === "Enterprise Operations" || signals.usesOracle) {
      return "Essential";
    }
    if (signals.specialFocus === "Healthcare" || signals.usesHealthcareSystems) {
      return "Helpful";
    }
    if (teamSize === "2-5" || teamSize === "6-20" || teamSize === "21+") {
      return "Helpful";
    }
    return "Any";
  }

  function deriveContentVolume(intake, creatorPlatform, platforms) {
    const businessType = normalizeBusinessType(intake.businessType);
    const text = normalizeWhitespace([intake.primaryBottleneck, intake.mainGoal, intake.notes].join(" ")).toLowerCase();

    if (text.includes("content") || text.includes("publish") || businessType === "Creator") {
      return "High";
    }
    if (businessType === "Agency" || businessType === "Ecommerce" || creatorPlatform !== "All" || ["Meta", "Instagram", "TikTok", "YouTube", "LinkedIn"].some((platform) => platforms.includes(platform))) {
      return "Medium";
    }
    return "Any";
  }

  function buildPlannerStateFromIntake(rawIntake) {
    const intake = normalizeIntake(rawIntake);
    const signals = getIntakeSignals(intake);
    const mainPlatformsText = normalizeWhitespace([intake.integrationPlatform, intake.mainPlatforms, intake.currentTools].join(" "));
    const integrationPlatforms = extractPlatforms(mainPlatformsText);
    const baseCompliance = normalizeScaleValue(intake.complianceSensitivity, ["Any", "Low", "Medium", "High"]);
    let businessType = normalizeBusinessType(intake.businessType);

    if (signals.usesShopify) {
      ensureUniqueValue(integrationPlatforms, "Shopify");
    }

    if (signals.specialFocus === "Healthcare" || signals.usesHealthcareSystems) {
      businessType = "Medical/Dental";
    } else if ((signals.specialFocus === "Ecommerce" || signals.usesShopify) && businessType === "Any") {
      businessType = "Ecommerce";
    } else if (signals.specialFocus === "Enterprise Operations" && businessType === "Any") {
      businessType = "SaaS";
    }

    const explicitCreatorPlatform = normalizeFilterValue("creatorPlatform", intake.creatorPlatform, "All");
    const explicitLanguageNeed = normalizeFilterValue("languageNeed", intake.languageNeed, "Any");
    const explicitFinanceNeed = normalizeFilterValue("financeNeed", intake.financeNeed, "Any");
    const explicitSupportChannel = normalizeFilterValue("supportChannel", intake.supportChannel, "Any");
    const explicitSalesNeed = normalizeFilterValue("salesNeed", intake.salesNeed, "Any");
    const explicitLeadVolume = normalizeScaleValue(intake.leadVolume, ["Any", "Low", "Medium", "High"]);
    const explicitMeetingVolume = normalizeScaleValue(intake.meetingVolume, ["Any", "Low", "Medium", "High"]);
    const explicitContentVolume = normalizeScaleValue(intake.contentVolume, ["Any", "Low", "Medium", "High"]);
    const explicitAutomationNeed = normalizeNeedValue(intake.automationNeed);
    const explicitAiAgents = normalizeNeedValue(intake.aiAgents);
    const explicitMeetingNotes = normalizeNeedValue(intake.meetingNotes);
    const explicitDesignContent = normalizeNeedValue(intake.designContent);
    const explicitCitedResearch = normalizeNeedValue(intake.citedResearch);
    const explicitKnowledgeBase = normalizeNeedValue(intake.knowledgeBase);

    const creatorPlatform = explicitCreatorPlatform !== "All"
      ? explicitCreatorPlatform
      : deriveCreatorPlatform(intake, integrationPlatforms);
    const leadVolume = explicitLeadVolume !== "Any"
      ? explicitLeadVolume
      : parseVolumeLevel(intake.weeklyLeadVolume, { lowMax: 5, mediumMax: 20 });
    const meetingVolume = explicitMeetingVolume !== "Any"
      ? explicitMeetingVolume
      : parseVolumeLevel(intake.weeklyMeetingVolume, { lowMax: 4, mediumMax: 10 });
    const supportVolume = parseVolumeLevel(intake.weeklySupportVolume, { lowMax: 5, mediumMax: 20 });
    let automationNeed = explicitAutomationNeed !== "Any"
      ? explicitAutomationNeed
      : deriveAutomationNeed(intake, integrationPlatforms, leadVolume, meetingVolume, supportVolume, signals);
    let aiAgents = explicitAiAgents !== "Any"
      ? explicitAiAgents
      : deriveAgentNeed(intake, leadVolume, supportVolume, signals);
    let citedResearch = explicitCitedResearch !== "Any"
      ? explicitCitedResearch
      : deriveResearchNeed(intake);
    let knowledgeBase = explicitKnowledgeBase !== "Any"
      ? explicitKnowledgeBase
      : deriveKnowledgeNeed(intake, signals);

    if (signals.specialFocus === "Enterprise Operations") {
      automationNeed = elevateNeed(automationNeed, "Essential");
      aiAgents = elevateNeed(aiAgents, "Helpful");
      knowledgeBase = elevateNeed(knowledgeBase, "Essential");
    }

    if (signals.phoneSupportPriority === "Major Channel") {
      automationNeed = elevateNeed(automationNeed, "Helpful");
      aiAgents = elevateNeed(aiAgents, "Helpful");
    }

    if (signals.specialFocus === "Healthcare" || signals.usesHealthcareSystems || signals.securityAiNeed === "Required") {
      citedResearch = elevateNeed(citedResearch, "Helpful");
      knowledgeBase = elevateNeed(knowledgeBase, "Helpful");
    }

    return data.normalizePlannerState({
      businessType,
      creatorPlatform,
      integrationPlatform: integrationPlatforms,
      languageNeed: explicitLanguageNeed !== "Any" ? explicitLanguageNeed : deriveLanguageNeed(intake),
      financeNeed: explicitFinanceNeed !== "Any" ? explicitFinanceNeed : deriveFinanceNeed(intake),
      supportChannel: explicitSupportChannel !== "Any" ? explicitSupportChannel : deriveSupportChannel(intake),
      salesNeed: explicitSalesNeed !== "Any" ? explicitSalesNeed : deriveSalesNeed(intake),
      teamSize: normalizeTeamSize(intake.teamSize),
      primaryBottleneck: normalizeBottleneck(intake.primaryBottleneck, intake.firstWorkflowToFix, intake.notes),
      mainGoal: normalizeMainGoal(intake.mainGoal, intake.firstWorkflowToFix, intake.notes),
      monthlyBudget: normalizeBudget(intake.monthlyBudget),
      techComfort: normalizeScaleValue(intake.techComfort, ["Any", "Low", "Medium", "High"]),
      automationNeed,
      aiAgents,
      meetingNotes: explicitMeetingNotes !== "Any" ? explicitMeetingNotes : deriveMeetingNotesNeed(intake, meetingVolume),
      designContent: explicitDesignContent !== "Any" ? explicitDesignContent : deriveDesignNeed(intake, creatorPlatform, integrationPlatforms),
      citedResearch,
      knowledgeBase,
      complianceSensitivity: deriveComplianceFromSignals(baseCompliance, signals),
      leadVolume,
      contentVolume: explicitContentVolume !== "Any" ? explicitContentVolume : deriveContentVolume(intake, creatorPlatform, integrationPlatforms),
      meetingVolume
    });
  }

  function getToolEntryMap(entries) {
    return entries.reduce((map, entry) => {
      map[entry.tool.name] = entry;
      return map;
    }, {});
  }

  function addBoostReason(reasons, label, value, phrase, weight) {
    reasons.push({ label, value, phrase, weight });
  }

  function getPlanSpecificBoost(toolConfig, intake, signals, boostContext) {
    let boost = 0;
    const reasons = [];
    const toolName = toolConfig.name;
    const ecommerceFocus = signals.specialFocus === "Ecommerce";
    const healthcareFocus = signals.specialFocus === "Healthcare" || signals.usesHealthcareSystems;
    const enterpriseFocus = signals.specialFocus === "Enterprise Operations" || signals.usesOracle;
    const state = boostContext && boostContext.state ? boostContext.state : data.normalizePlannerState({});
    const rawText = boostContext && boostContext.rawText ? boostContext.rawText : "";
    const platformList = Array.isArray(state.integrationPlatform) ? state.integrationPlatform : [];
    const usesHubSpot = platformList.includes("HubSpot");
    const usesLinkedIn = platformList.includes("LinkedIn");
    const supportHeavy = state.primaryBottleneck === "Customer Support"
      || ["Website Chat", "Email", "Phone", "Help Center", "DMs / Social"].includes(state.supportChannel)
      || state.mainGoal === "Improve Service"
      || state.aiAgents === "Essential";
    const salesHeavy = state.primaryBottleneck === "Lead Follow-Up"
      || ["Lead Capture", "Lead Follow-Up", "Pipeline Updates"].includes(state.salesNeed)
      || state.mainGoal === "Close More Leads";
    const meetingHeavy = state.primaryBottleneck === "Meetings" || state.meetingVolume === "High" || state.meetingNotes === "Essential";
    const contentHeavy = state.primaryBottleneck === "Content Creation" || state.contentVolume === "High" || state.designContent === "Essential";
    const researchHeavy = state.primaryBottleneck === "Research" || state.citedResearch === "Essential";
    const docsHeavy = state.primaryBottleneck === "Internal Docs" || state.knowledgeBase === "Essential";
    const socialHeavy = ["Meta", "Instagram", "TikTok", "YouTube", "LinkedIn"].some((platform) => state.integrationPlatform.includes(platform));
    const videoHeavy = rawText.includes("video") || rawText.includes("youtube") || rawText.includes("shorts") || rawText.includes("reel") || rawText.includes("clip") || rawText.includes("ad creative");

    if (signals.usesShopify || ecommerceFocus) {
      if (toolName === "Rezolve Brain Commerce") {
        boost += 34;
        addBoostReason(reasons, "Special focus", "Ecommerce workflow", "commerce stack fit", 34);
      } else if (toolName === "Rezolve Brain Checkout") {
        boost += 30;
        addBoostReason(reasons, "Special focus", "Checkout optimization", "checkout workflow fit", 30);
      } else if (["Shopify Magic", "Sidekick"].includes(toolName)) {
        boost += 22;
        addBoostReason(reasons, "Platform", "Shopify", "shopify workflow fit", 22);
      } else if (["Klaviyo", "Gorgias", "Richpanel", "StoreSEO", "Yodel"].includes(toolName)) {
        boost += 16;
        addBoostReason(reasons, "Platform", "Shopify", "shopify integration fit", 16);
      }
    }

    if (enterpriseFocus) {
      if (toolName === "Oracle OCI Enterprise AI") {
        boost += signals.usesOracle ? 34 : 26;
        addBoostReason(reasons, "System signal", signals.usesOracle ? "Oracle environment" : "Enterprise operations", "enterprise security fit", signals.usesOracle ? 34 : 26);
      } else if (toolName === "Oracle Digital Assistant") {
        boost += signals.usesOracle ? 30 : 22;
        addBoostReason(reasons, "System signal", signals.usesOracle ? "Oracle environment" : "Enterprise operations", "enterprise assistant fit", signals.usesOracle ? 30 : 22);
      } else if (toolName === "Ask Sage") {
        boost += 24;
        addBoostReason(reasons, "Special focus", "Enterprise operations", "regulated knowledge fit", 24);
      } else if (toolName === "Veritone aiWARE") {
        boost += 20;
        addBoostReason(reasons, "Special focus", "Enterprise operations", "governed workflow fit", 20);
      } else if (toolName === "BigBear.ai ConductorOS") {
        boost += 18;
        addBoostReason(reasons, "Special focus", "Enterprise operations", "agent orchestration fit", 18);
      } else if (["Amazon Q Business", "Salesforce Agentforce"].includes(toolName)) {
        boost += 14;
        addBoostReason(reasons, "Special focus", "Enterprise operations", "scaled operations fit", 14);
      }
    }

    if (healthcareFocus) {
      if (toolName === "HEALWELL AI Clinical Co-Pilot (AIDX)") {
        boost += 40;
        addBoostReason(reasons, "Special focus", "Healthcare", "clinical workflow fit", 40);
      } else if (toolName === "SoundHound Amelia Platform") {
        boost += 18;
        addBoostReason(reasons, "Special focus", "Healthcare", "patient support fit", 18);
      } else if (toolName === "Oracle Digital Assistant") {
        boost += 16;
        addBoostReason(reasons, "Special focus", "Healthcare", "regulated assistant fit", 16);
      } else if (["Amazon Q Business", "DeepL Voice"].includes(toolName)) {
        boost += 10;
        addBoostReason(reasons, "Special focus", "Healthcare", "care-team support fit", 10);
      }
    }

    if (signals.phoneSupportPriority === "Major Channel") {
      if (toolName === "SoundHound Smart Answering") {
        boost += 38;
        addBoostReason(reasons, "Channel", "Phone support", "phone support fit", 38);
      } else if (toolName === "SoundHound Amelia Platform") {
        boost += 20;
        addBoostReason(reasons, "Channel", "Phone support", "voice agent fit", 20);
      } else if (toolName === "Aircall") {
        boost += 18;
        addBoostReason(reasons, "Channel", "Phone support", "call workflow fit", 18);
      } else if (["HubSpot", "Salesforce Agentforce", "Intercom", "Zendesk"].includes(toolName)) {
        boost += 10;
        addBoostReason(reasons, "Channel", "Phone support", "support routing fit", 10);
      }
    }

    if (signals.securityAiNeed === "Required") {
      if (toolName === "Oracle OCI Enterprise AI") {
        boost += 24;
        addBoostReason(reasons, "Security need", "Required", "regulated ai fit", 24);
      } else if (toolName === "Ask Sage") {
        boost += 20;
        addBoostReason(reasons, "Security need", "Required", "secure knowledge fit", 20);
      } else if (toolName === "Veritone aiWARE") {
        boost += 18;
        addBoostReason(reasons, "Security need", "Required", "governed content fit", 18);
      } else if (toolName === "BigBear.ai ConductorOS") {
        boost += 16;
        addBoostReason(reasons, "Security need", "Required", "orchestration control fit", 16);
      } else if (["Oracle Digital Assistant", "Amazon Q Business", "Salesforce Agentforce", "HEALWELL AI Clinical Co-Pilot (AIDX)"].includes(toolName)) {
        boost += 12;
        addBoostReason(reasons, "Security need", "Required", "approved vendor fit", 12);
      }
    }

    if (toolName === "HubSpot Breeze Customer Agent") {
      if (usesHubSpot) {
        boost += 28;
        addBoostReason(reasons, "Platform", "HubSpot", "hubspot customer agent fit", 28);
      }
      if (supportHeavy) {
        boost += 20;
        addBoostReason(reasons, "Support workflow", state.supportChannel === "Any" ? "Customer support" : state.supportChannel, "customer service agent fit", 20);
      }
      if (salesHeavy || state.leadVolume === "High") {
        boost += 14;
        addBoostReason(reasons, "Lead workflow", state.leadVolume === "High" ? "High lead volume" : state.salesNeed || state.mainGoal, "inbound qualification fit", 14);
      }
      if (state.aiAgents === "Helpful" || state.aiAgents === "Essential") {
        boost += 10;
        addBoostReason(reasons, "AI agents", state.aiAgents, "agent-led customer conversations", 10);
      }
    }

    if (toolName === "HubSpot Breeze Prospecting Agent") {
      if (usesHubSpot) {
        boost += 30;
        addBoostReason(reasons, "Platform", "HubSpot", "hubspot prospecting fit", 30);
      }
      if (salesHeavy) {
        boost += 22;
        addBoostReason(reasons, "Sales workflow", state.salesNeed === "Any" ? state.mainGoal : state.salesNeed, "prospecting workflow fit", 22);
      }
      if (state.leadVolume === "High") {
        boost += 16;
        addBoostReason(reasons, "Lead volume", "High", "high-volume outreach fit", 16);
      }
      if (usesLinkedIn) {
        boost += 8;
        addBoostReason(reasons, "Platform", "LinkedIn", "outbound contact fit", 8);
      }
      if (state.aiAgents === "Helpful" || state.aiAgents === "Essential") {
        boost += 8;
        addBoostReason(reasons, "AI agents", state.aiAgents, "sales agent fit", 8);
      }
    }

    if (toolName === "Intercom Fin") {
      if (supportHeavy) {
        boost += 24;
        addBoostReason(reasons, "Support workflow", state.supportChannel === "Any" ? "Customer support" : state.supportChannel, "customer agent fit", 24);
      }
      if (state.knowledgeBase === "Helpful" || state.knowledgeBase === "Essential") {
        boost += 16;
        addBoostReason(reasons, "Knowledge base", state.knowledgeBase, "knowledge-backed support fit", 16);
      }
      if (salesHeavy || state.leadVolume === "High") {
        boost += 12;
        addBoostReason(reasons, "Lead workflow", state.leadVolume === "High" ? "High lead volume" : state.salesNeed || state.mainGoal, "sales and support agent fit", 12);
      }
      if (state.aiAgents === "Helpful" || state.aiAgents === "Essential") {
        boost += 10;
        addBoostReason(reasons, "AI agents", state.aiAgents, "dedicated AI agent fit", 10);
      }
    }

    if (toolName === "Zendesk AI Agents") {
      if (supportHeavy) {
        boost += 26;
        addBoostReason(reasons, "Support workflow", state.supportChannel === "Any" ? "Customer support" : state.supportChannel, "zendesk agent fit", 26);
      }
      if (state.supportChannel === "Phone" || state.supportChannel === "Help Center" || state.supportChannel === "Email") {
        boost += 12;
        addBoostReason(reasons, "Channel", state.supportChannel, "multi-channel service fit", 12);
      }
      if (state.complianceSensitivity === "High" || signals.securityAiNeed === "Required") {
        boost += 10;
        addBoostReason(reasons, "Compliance", state.complianceSensitivity === "High" ? "High sensitivity" : "Security required", "controlled service automation", 10);
      }
      if (state.aiAgents === "Helpful" || state.aiAgents === "Essential") {
        boost += 10;
        addBoostReason(reasons, "AI agents", state.aiAgents, "agentic support fit", 10);
      }
    }

    if (toolName === "Voiceflow") {
      if (state.techComfort === "High") {
        boost += 18;
        addBoostReason(reasons, "Tech comfort", "High", "custom agent builder fit", 18);
      }
      if (state.automationNeed === "Essential") {
        boost += 18;
        addBoostReason(reasons, "Automation need", "Essential", "custom automation fit", 18);
      }
      if (state.aiAgents === "Helpful" || state.aiAgents === "Essential") {
        boost += 16;
        addBoostReason(reasons, "AI agents", state.aiAgents, "build-your-own agent fit", 16);
      }
      if (signals.phoneSupportPriority === "Major Channel" || state.supportChannel === "Phone") {
        boost += 14;
        addBoostReason(reasons, "Channel", "Phone or voice", "voice agent fit", 14);
      }
      if (usesHubSpot || state.integrationPlatform.includes("Shopify") || supportHeavy || salesHeavy) {
        boost += 8;
        addBoostReason(reasons, "Workflow", usesHubSpot ? "Connected business systems" : supportHeavy ? "Support workflow" : salesHeavy ? "Lead workflow" : "Platform integration", "orchestrated agent fit", 8);
      }
    }

    if (toolName === "Granola") {
      if (meetingHeavy) {
        const weight = state.meetingVolume === "High" ? 28 : 22;
        boost += weight;
        addBoostReason(reasons, "Meeting workflow", state.meetingVolume === "High" ? "High meeting volume" : "Meeting-heavy workflow", "meeting capture fit", weight);
      }
      if (["Save Time", "Close More Leads"].includes(state.mainGoal)) {
        boost += 8;
        addBoostReason(reasons, "Main goal", state.mainGoal, "follow-up speed fit", 8);
      }
      if (["Slack", "HubSpot", "Notion", "Google Workspace", "Microsoft 365"].some((platform) => state.integrationPlatform.includes(platform))) {
        boost += 6;
        addBoostReason(reasons, "Platform", "Team workflow tools", "meeting handoff fit", 6);
      }
    }

    if (toolName === "Miro AI") {
      if (docsHeavy || researchHeavy) {
        const weight = docsHeavy && researchHeavy ? 24 : 18;
        boost += weight;
        addBoostReason(reasons, "Planning workflow", docsHeavy && researchHeavy ? "Research and internal docs" : docsHeavy ? "Internal docs" : "Research", "visual planning fit", weight);
      }
      if (state.knowledgeBase === "Helpful" || state.knowledgeBase === "Essential") {
        boost += 10;
        addBoostReason(reasons, "Knowledge base", state.knowledgeBase, "shared knowledge fit", 10);
      }
      if (state.teamSize === "2-5" || state.teamSize === "6-20" || state.teamSize === "21+") {
        boost += 6;
        addBoostReason(reasons, "Team size", state.teamSize, "collaboration fit", 6);
      }
    }

    if (toolName === "Pomelli") {
      if (contentHeavy) {
        boost += 28;
        addBoostReason(reasons, "Content workflow", state.contentVolume === "High" ? "High content volume" : "Content creation bottleneck", "brand content fit", 28);
      }
      if (["Creator", "Agency", "Ecommerce"].includes(state.businessType)) {
        boost += 18;
        addBoostReason(reasons, "Business type", state.businessType, "brand marketing fit", 18);
      }
      if (socialHeavy || state.integrationPlatform.includes("Shopify")) {
        boost += 12;
        addBoostReason(reasons, "Platform", socialHeavy ? "Social content channels" : "Shopify", "campaign asset fit", 12);
      }
      if (["Create Content Faster", "Close More Leads"].includes(state.mainGoal)) {
        boost += 8;
        addBoostReason(reasons, "Main goal", state.mainGoal, "marketing output fit", 8);
      }
    }

    if (toolName === "Bird's Eye") {
      if (researchHeavy) {
        boost += 18;
        addBoostReason(reasons, "Research need", state.citedResearch === "Essential" ? "Essential research" : "Research bottleneck", "ai audit fit", 18);
      }
      if (state.complianceSensitivity === "High" || signals.securityAiNeed === "Required") {
        boost += 12;
        addBoostReason(reasons, "Compliance", state.complianceSensitivity === "High" ? "High sensitivity" : "Security required", "brand accuracy control fit", 12);
      }
      if (rawText.includes("brand") || rawText.includes("positioning") || rawText.includes("accuracy") || rawText.includes("audit") || rawText.includes("reputation") || rawText.includes("search visibility")) {
        boost += 20;
        addBoostReason(reasons, "Stated need", "Brand accuracy", "brand monitoring fit", 20);
      }
    }

    if (toolName === "Google Flow") {
      if (contentHeavy && (videoHeavy || socialHeavy || state.creatorPlatform !== "All")) {
        boost += 28;
        addBoostReason(reasons, "Content workflow", videoHeavy ? "Video-first content" : "High visual content", "cinematic content fit", 28);
      } else if (contentHeavy) {
        boost += 16;
        addBoostReason(reasons, "Content workflow", "Content creation bottleneck", "visual campaign fit", 16);
      }
      if (["Creator", "Agency", "Ecommerce", "Real Estate"].includes(state.businessType)) {
        boost += 14;
        addBoostReason(reasons, "Business type", state.businessType, "visual storytelling fit", 14);
      }
      if (["YouTube", "TikTok", "Instagram"].some((platform) => state.integrationPlatform.includes(platform)) || state.creatorPlatform !== "All") {
        boost += 12;
        addBoostReason(reasons, "Platform", "Video and creator channels", "short-form video fit", 12);
      }
      if (state.designContent === "Essential") {
        boost += 8;
        addBoostReason(reasons, "Design need", "Essential", "creative production fit", 8);
      }
    }

    if (toolName === "Power BI Copilot") {
      if (state.integrationPlatform.includes("Microsoft 365")) {
        boost += 22;
        addBoostReason(reasons, "Platform", "Microsoft 365", "microsoft analytics fit", 22);
      }
      if (rawText.includes("report") || rawText.includes("dashboard") || rawText.includes("analytics") || rawText.includes("kpi") || rawText.includes("data")) {
        boost += 24;
        addBoostReason(reasons, "Stated need", "Reporting or analytics", "kpi reporting fit", 24);
      }
      if (["Agency", "Ecommerce", "Real Estate", "SaaS"].includes(state.businessType)) {
        boost += 10;
        addBoostReason(reasons, "Business type", state.businessType, "business reporting fit", 10);
      }
      if (docsHeavy || researchHeavy || state.knowledgeBase === "Helpful" || state.knowledgeBase === "Essential") {
        boost += 8;
        addBoostReason(reasons, "Data context", docsHeavy ? "Internal docs" : researchHeavy ? "Research" : "Knowledge base", "decision-support fit", 8);
      }
    }

    if (toolName === "Dialpad AI") {
      if (signals.phoneSupportPriority === "Major Channel" || state.supportChannel === "Phone") {
        boost += 30;
        addBoostReason(reasons, "Channel", "Phone", "phone ai fit", 30);
      }
      if (supportHeavy) {
        boost += 18;
        addBoostReason(reasons, "Support workflow", state.supportChannel === "Any" ? "Customer support" : state.supportChannel, "conversation intelligence fit", 18);
      }
      if (meetingHeavy) {
        boost += 12;
        addBoostReason(reasons, "Meeting workflow", state.meetingVolume === "High" ? "High meeting volume" : "Meeting recap need", "call summary fit", 12);
      }
      if (salesHeavy || state.leadVolume === "High") {
        boost += 10;
        addBoostReason(reasons, "Lead workflow", state.leadVolume === "High" ? "High lead volume" : state.salesNeed || state.mainGoal, "sales call fit", 10);
      }
    }

    if (toolName === "Vanta AI") {
      if (signals.securityAiNeed === "Required") {
        boost += 30;
        addBoostReason(reasons, "Security need", "Required", "security governance fit", 30);
      }
      if (state.complianceSensitivity === "High") {
        boost += 24;
        addBoostReason(reasons, "Compliance", "High sensitivity", "compliance workflow fit", 24);
      }
      if (enterpriseFocus || healthcareFocus) {
        boost += 12;
        addBoostReason(reasons, "Operating environment", enterpriseFocus ? "Enterprise operations" : "Healthcare", "trust-program fit", 12);
      }
      if (docsHeavy || state.knowledgeBase === "Helpful" || state.knowledgeBase === "Essential") {
        boost += 8;
        addBoostReason(reasons, "Documentation", docsHeavy ? "Internal docs" : state.knowledgeBase, "evidence and questionnaire fit", 8);
      }
    }

    if (toolName === "LinkedIn Hiring Assistant") {
      if (usesLinkedIn) {
        boost += 26;
        addBoostReason(reasons, "Platform", "LinkedIn", "recruiting workflow fit", 26);
      }
      if (rawText.includes("hire") || rawText.includes("hiring") || rawText.includes("recruit") || rawText.includes("candidate") || rawText.includes("talent") || rawText.includes("interview")) {
        boost += 28;
        addBoostReason(reasons, "Stated need", "Hiring or recruiting", "candidate sourcing fit", 28);
      }
      if (state.teamSize === "6-20" || state.teamSize === "21+") {
        boost += 10;
        addBoostReason(reasons, "Team size", state.teamSize, "growing team hiring fit", 10);
      }
      if (["Save Time", "Reduce Busywork"].includes(state.mainGoal)) {
        boost += 6;
        addBoostReason(reasons, "Main goal", state.mainGoal, "recruiting admin reduction", 6);
      }
    }

    if (toolName === "Rebuy") {
      if (signals.usesShopify || ecommerceFocus || state.integrationPlatform.includes("Shopify")) {
        boost += 32;
        addBoostReason(reasons, "Platform", "Shopify ecommerce", "personalization fit", 32);
      }
      if (state.businessType === "Ecommerce") {
        boost += 18;
        addBoostReason(reasons, "Business type", "Ecommerce", "store personalization fit", 18);
      }
      if (state.leadVolume === "High" || supportHeavy) {
        boost += 8;
        addBoostReason(reasons, "Store activity", state.leadVolume === "High" ? "High shopper volume" : "Customer support", "conversion lift fit", 8);
      }
      if (["Close More Leads", "Improve Service"].includes(state.mainGoal)) {
        boost += 8;
        addBoostReason(reasons, "Main goal", state.mainGoal, "cart and recommendation fit", 8);
      }
    }

    return { boost, reasons };
  }

  function applyIntakeSpecificBoosts(baseEntries, intake) {
    const normalizedIntake = normalizeIntake(intake);
    const signals = getIntakeSignals(normalizedIntake);
    const boostContext = {
      state: buildPlannerStateFromIntake(normalizedIntake),
      rawText: normalizeWhitespace([
        normalizedIntake.primaryBottleneck,
        normalizedIntake.mainGoal,
        normalizedIntake.firstWorkflowToFix,
        normalizedIntake.notes,
        normalizedIntake.mainPlatforms,
        normalizedIntake.currentTools
      ].join(" ")).toLowerCase()
    };
    const entryMap = new Map(
      (baseEntries || []).map((entry) => [
        entry.tool.name,
        {
          tool: entry.tool,
          score: entry.score,
          matchedReasons: Array.isArray(entry.matchedReasons) ? [...entry.matchedReasons] : []
        }
      ])
    );

    data.TOOLS.forEach((toolConfig) => {
      const planBoost = getPlanSpecificBoost(toolConfig, normalizedIntake, signals, boostContext);
      if (!planBoost.boost) {
        return;
      }

      const existingEntry = entryMap.get(toolConfig.name) || { tool: toolConfig, score: 0, matchedReasons: [] };
      const nextReasons = [...existingEntry.matchedReasons, ...planBoost.reasons]
        .sort((left, right) => right.weight - left.weight)
        .slice(0, 6);

      entryMap.set(toolConfig.name, {
        tool: toolConfig,
        score: Math.min(100, (existingEntry.score || 0) + planBoost.boost),
        matchedReasons: nextReasons
      });
    });

    return Array.from(entryMap.values())
      .sort((left, right) => right.score - left.score || right.tool.featuredWeight - left.tool.featuredWeight || left.tool.name.localeCompare(right.tool.name));
  }

  function getTierAdditions(baseTools, nextTools) {
    const baseToolNames = new Set(baseTools.map((toolConfig) => toolConfig.name));
    return nextTools.filter((toolConfig) => !baseToolNames.has(toolConfig.name));
  }

  function getToolReason(entry, toolConfig) {
    if (!entry || !entry.matchedReasons || entry.matchedReasons.length === 0) {
      return toolConfig.firstUseCase;
    }

    const topReasons = entry.matchedReasons.slice(0, 2).map((reason) => `${reason.label.toLowerCase()} fit: ${reason.value}`);
    return `${toSentence(formatNaturalList(topReasons))}. Best first use: ${toolConfig.firstUseCase}`;
  }

  function getTierBudgetNotes(tierName, tools, additions, intake, tierSummary) {
    if (tierName === "starter") {
      return {
        notes: `This covers ${formatNaturalList(tools.map((toolConfig) => toolConfig.name))} and is enough to launch ${intake.firstWorkflowToFix || tierSummary.workflowText}.`,
        delay: `Delay ${formatNaturalList(additions.map((toolConfig) => toolConfig.name)) || "the next layer"} until the starter workflow is used consistently every week.`
      };
    }

    if (tierName === "growth") {
      return {
        notes: `This layer adds ${formatNaturalList(additions.map((toolConfig) => toolConfig.name)) || "the extra workflow tools"} so the business can improve handoffs, reporting, or follow-up reliability.`,
        delay: "Do not add the growth layer until the first workflow has a clear owner and a weekly success check."
      };
    }

    return {
      notes: "This layer is justified when the business needs deeper reporting, stronger routing, or more complete operating coverage across several workflows.",
      delay: "Skip the advanced layer until the starter and growth tools are actually adopted and the team is asking for the next bottleneck to be solved."
    };
  }

  function buildRenderedTool(toolConfig, entryMap) {
    const entry = entryMap ? entryMap[toolConfig.name] : null;
    const implementationLabel = data.getImplementationLabel
      ? data.getImplementationLabel(toolConfig)
      : toolConfig.setupDifficulty;
    return {
      name: toolConfig.name,
      category: toolConfig.category,
      price: data.getDisplayPrice(toolConfig),
      setupDifficulty: toolConfig.setupDifficulty,
      implementationLabel,
      firstUseCase: toolConfig.firstUseCase,
      whyFit: getToolReason(entry, toolConfig),
      detailUrl: `./tool-detail.html?tool=${encodeURIComponent(data.toSlug(toolConfig.name))}`,
      companyUrl: toolConfig.companyUrl || "",
      colors: CATEGORY_COLORS[toolConfig.category] || { start: "#2f7cff", end: "#123b9c" }
    };
  }

  function buildTierDetails(tierName, tools, previousTools, tierSummary, entryMap, intake) {
    const additions = tierName === "starter" ? tools : getTierAdditions(previousTools, tools);
    const budgetNotes = getTierBudgetNotes(tierName, tools, additions, intake, tierSummary);

    return {
      summary: tierSummary,
      tools: tools.map((toolConfig) => buildRenderedTool(toolConfig, entryMap)),
      additions,
      budgetNotes
    };
  }

  function summarizeTierSetup(tools) {
    const setupLevels = Array.from(new Set((tools || []).map((tool) => tool.setupDifficulty).filter(Boolean)));
    const orderedSetup = ["Easy", "Medium", "Hard", "Advanced"].filter((level) => setupLevels.includes(level));

    if (orderedSetup.length === 0) {
      return "Setup not specified";
    }
    if (orderedSetup.length === 1) {
      return orderedSetup[0];
    }

    return orderedSetup.join(" + ");
  }

  function summarizeTierImplementation(tools) {
    const labels = Array.from(new Set((tools || []).map((tool) => tool.implementationLabel).filter(Boolean)));

    if (labels.length === 0) {
      return "Implementation not specified";
    }
    if (labels.length === 1) {
      return labels[0];
    }
    if (labels.includes("Technical Help Likely")) {
      return labels.includes("Admin / Ops Can Set Up")
        ? "Admin / Ops + Technical"
        : "Mixed Implementation";
    }
    if (labels.includes("Owner Can Set Up") && labels.includes("Admin / Ops Can Set Up")) {
      return "Owner + Admin / Ops";
    }

    return "Mixed Implementation";
  }

  function guessWorkflowName(rawWorkflow, intake, index) {
    if (index === 0 && intake.firstWorkflowToFix) {
      return toTitleCase(intake.firstWorkflowToFix);
    }

    const pieces = normalizeWhitespace(rawWorkflow)
      .split("->")
      .map((piece) => normalizeWhitespace(piece))
      .filter(Boolean);

    if (pieces.length >= 2) {
      return `${toTitleCase(pieces[0])} to ${toTitleCase(pieces[pieces.length - 1])}`;
    }

    return `Workflow ${index + 1}`;
  }

  function pickWorkflowTools(rawWorkflow, allTools) {
    const workflowText = normalizeWhitespace(rawWorkflow).toLowerCase();
    let categories = [];

    if (workflowText.includes("lead") || workflowText.includes("crm") || workflowText.includes("follow-up") || workflowText.includes("follow up")) {
      categories = ["CRM", "Automation", "Core Assistant", "Scheduling"];
    } else if (workflowText.includes("meeting") || workflowText.includes("transcript") || workflowText.includes("recap")) {
      categories = ["Meetings", "Workspace", "Automation", "Core Assistant"];
    } else if (workflowText.includes("support") || workflowText.includes("question") || workflowText.includes("help-center") || workflowText.includes("help center")) {
      categories = ["Support", "Automation", "Core Assistant", "Workspace"];
    } else if (workflowText.includes("brief") || workflowText.includes("visual") || workflowText.includes("publish") || workflowText.includes("content")) {
      categories = ["Core Assistant", "Design", "Content Studio", "Automation"];
    } else {
      categories = ["Core Assistant", "Automation", "Workspace"];
    }

    const suggestedTools = categories
      .map((category) => allTools.find((toolConfig) => toolConfig.category === category))
      .filter(Boolean)
      .filter((toolConfig, index, tools) => tools.findIndex((candidate) => candidate.name === toolConfig.name) === index)
      .slice(0, 2);

    return suggestedTools;
  }

  function buildWorkflowDetails(rawWorkflow, intake, allTools, index) {
    const workflowTools = pickWorkflowTools(rawWorkflow, allTools);
    const owner = intake.implementationOwner || "Owner / founder";
    const title = guessWorkflowName(rawWorkflow, intake, index);
    const toolNames = formatNaturalList(workflowTools.map((toolConfig) => toolConfig.name));
    const description = normalizeWhitespace([
      toSentence(rawWorkflow),
      toolNames ? `Use ${toolNames} to make this step repeatable.` : "",
      `Recommended owner: ${owner}.`
    ].join(" "));

    return {
      title,
      description,
      tools: workflowTools
    };
  }

  function buildWhyItFits(intake, state, signals) {
    const reasons = [];

    function addReason(label, value) {
      if (value && value !== "Any" && value !== "All") {
        reasons.push(`${label}: ${value}`);
      }
    }

    addReason("Business type", state.businessType);
    addReason("Team size", state.teamSize);
    addReason("Main bottleneck", state.primaryBottleneck);
    addReason("Main goal", state.mainGoal);
    addReason("Budget", state.monthlyBudget);
    addReason("Tech comfort", state.techComfort);
    addReason("Platforms", formatNaturalList(state.integrationPlatform || []));
    addReason("Current tools", intake.currentTools);
    addReason("Special focus", signals.specialFocus !== "General Small Business" ? signals.specialFocus : "");
    addReason("Phone support", signals.phoneSupportPriority);
    addReason("Security / regulated AI", signals.securityAiNeed);
    addReason("Existing system", signals.usesShopify ? "Shopify" : "");
    addReason("Existing system", signals.usesOracle ? "Oracle" : "");
    addReason("Existing system", signals.usesHealthcareSystems ? "Healthcare systems" : "");
    addReason("Compliance", state.complianceSensitivity);

    return reasons.slice(0, 8);
  }

  function buildWarnings(intake, state, signals) {
    const warnings = [];

    if (state.complianceSensitivity === "High") {
      warnings.push("This plan assumes human review before AI touches sensitive customer, patient, or legal work.");
    }
    if (!intake.businessWebsite) {
      warnings.push("No website or primary URL was provided, so channel and integration choices may need a quick manual check.");
    }
    if (!intake.currentTools) {
      warnings.push("No current stack was provided, so the generator assumed a lean setup instead of a migration-heavy environment.");
    }
    if (!intake.firstWorkflowToFix) {
      warnings.push("No first workflow was supplied, so the generator used the planner's default workflow suggestion.");
    }
    if (signals.securityAiNeed === "Required") {
      warnings.push("Security or regulated-AI requirements were marked as required, so implementation should stay inside approved vendors, scoped permissions, and documented review steps.");
    }
    if (signals.specialFocus === "Healthcare" || signals.usesHealthcareSystems) {
      warnings.push("Healthcare signals were provided, so verify data boundaries, consent rules, and record-system access before connecting AI to patient-facing workflows.");
    }
    if (signals.usesOracle && state.techComfort !== "High") {
      warnings.push("Oracle is part of the current environment, so the rollout may need technical help or vendor support even if the starter stack stays lean.");
    }
    if (signals.phoneSupportPriority === "Major Channel") {
      warnings.push("Phone support is a major channel here, so test routing, fallback paths, and escalation rules before turning on any voice automation.");
    }

    return warnings;
  }

  function formatCurrency(value) {
    return `$${Math.round(Number(value || 0)).toLocaleString("en-US")}`;
  }

  function parseNumericRange(label, fallbackLow, fallbackHigh) {
    const values = String(label || "").match(/\d+/g) || [];
    const numbers = values.map((value) => Number(value)).filter((value) => Number.isFinite(value));
    if (numbers.length >= 2) {
      return { low: numbers[0], high: numbers[1] };
    }
    if (numbers.length === 1) {
      return { low: numbers[0], high: numbers[0] };
    }
    return { low: fallbackLow, high: fallbackHigh };
  }

  function parseVolumeNumber(value) {
    const match = String(value || "").replace(/,/g, "").match(/\d+/);
    return match ? Number(match[0]) : 0;
  }

  function getHourlyValueEstimate(state) {
    const baseByBusinessType = {
      "Local Service": 70,
      Agency: 95,
      Consultant: 100,
      Coach: 85,
      Creator: 60,
      Ecommerce: 75,
      "Real Estate": 90,
      Legal: 135,
      "Medical/Dental": 110,
      SaaS: 95
    };
    const teamMultiplier = {
      Solo: 1,
      "2-5": 1.05,
      "6-20": 1.15,
      "21+": 1.25
    };

    const baseValue = baseByBusinessType[state.businessType] || 75;
    const multiplier = teamMultiplier[state.teamSize] || 1;
    return Math.round(baseValue * multiplier);
  }

  function getRevenuePotentialCopy(plan, hourRange) {
    const leadCount = parseVolumeNumber(plan.intake.weeklyLeadVolume);

    if (plan.state.mainGoal === "Close More Leads" || plan.state.primaryBottleneck === "Lead Follow-Up") {
      if (leadCount >= 10) {
        return "If faster response and cleaner follow-up recover even 1-2 extra leads per month, the stack should pay for itself quickly.";
      }
      return "Even one extra booked call, estimate, or follow-up that would otherwise slip can justify the plan and the starter stack.";
    }

    if (plan.state.mainGoal === "Create Content Faster" || plan.state.primaryBottleneck === "Content Creation") {
      return "The biggest upside is usually more output from the same raw material, which can create more campaigns, posts, and lead capture without extra headcount.";
    }

    if (plan.state.primaryBottleneck === "Customer Support") {
      return "The main upside is better response speed and fewer dropped replies, which protects revenue and frees up the owner or team for higher-value work.";
    }

    if (plan.state.primaryBottleneck === "Meetings" || plan.state.primaryBottleneck === "Internal Docs") {
      return `Saving ${hourRange.low}-${hourRange.high} hours each week often shows up as faster decisions, fewer missed tasks, and more consistent delivery.`;
    }

    return "The main ROI usually comes from reclaimed owner time, cleaner handoffs, and fewer manual follow-ups getting lost.";
  }

  function buildRoiEstimate(plan) {
    const starterRange = parseNumericRange(plan.tiers.starter.summary.savingsText, 5, 8);
    const growthRange = parseNumericRange(plan.tiers.growth.summary.savingsText, starterRange.low + 2, starterRange.high + 3);
    const totalRange = {
      low: starterRange.low,
      high: Math.max(starterRange.high, growthRange.low)
    };
    const hourlyValue = getHourlyValueEstimate(plan.state);
    const monthlyCapacityLow = totalRange.low * 4 * hourlyValue;
    const monthlyCapacityHigh = totalRange.high * 4 * hourlyValue;

    return {
      timeSaved: `${totalRange.low}-${totalRange.high} hrs/week`,
      costSavings: `${formatCurrency(monthlyCapacityLow)}-${formatCurrency(monthlyCapacityHigh)}/month`,
      revenuePotential: getRevenuePotentialCopy(plan, totalRange),
      payback: "The $29 plan should pay back fast if it saves even a fraction of one owner hour or recovers one useful lead.",
      hourlyValue
    };
  }

  function clampScore(value) {
    return Math.max(35, Math.min(95, Math.round(value)));
  }

  function getScoreLabel(score) {
    if (score >= 85) {
      return "Excellent";
    }
    if (score >= 75) {
      return "Strong";
    }
    if (score >= 65) {
      return "Good";
    }
    if (score >= 50) {
      return "Moderate";
    }
    return "Early";
  }

  function buildImprovementScorecard(plan) {
    const timeRange = parseNumericRange(plan.roiEstimate.timeSaved, 6, 10);
    let timeSavings = 42 + (timeRange.low * 4.5);
    if (["Lead Follow-Up", "Content Creation", "Customer Support", "Admin Work"].includes(plan.state.primaryBottleneck)) {
      timeSavings += 6;
    }

    let revenuePotential = 48;
    if (plan.state.mainGoal === "Close More Leads") {
      revenuePotential += 20;
    } else if (plan.state.mainGoal === "Create Content Faster") {
      revenuePotential += 14;
    } else if (plan.state.mainGoal === "Improve Service") {
      revenuePotential += 12;
    } else if (plan.state.mainGoal === "Reduce Busywork" || plan.state.mainGoal === "Save Time") {
      revenuePotential += 8;
    }
    if (plan.state.leadVolume === "High") {
      revenuePotential += 10;
    } else if (plan.state.leadVolume === "Medium") {
      revenuePotential += 5;
    }
    if (plan.intakeSignals.specialFocus === "Ecommerce" || plan.intakeSignals.usesShopify) {
      revenuePotential += 8;
    }

    let implementationEase = 78;
    if (plan.state.techComfort === "High") {
      implementationEase += 8;
    } else if (plan.state.techComfort === "Medium") {
      implementationEase += 3;
    } else if (plan.state.techComfort === "Low") {
      implementationEase -= 10;
    }
    if (plan.state.complianceSensitivity === "High") {
      implementationEase -= 20;
    } else if (plan.state.complianceSensitivity === "Medium") {
      implementationEase -= 10;
    }
    if (plan.state.teamSize === "21+") {
      implementationEase -= 10;
    } else if (plan.state.teamSize === "6-20") {
      implementationEase -= 4;
    }
    if (plan.intakeSignals.specialFocus === "Healthcare" || plan.intakeSignals.usesOracle) {
      implementationEase -= 8;
    }

    let workflowReadiness = 50;
    if (plan.intake.firstWorkflowToFix) {
      workflowReadiness += 18;
    }
    if (plan.intake.currentTools) {
      workflowReadiness += 10;
    }
    if (plan.intake.implementationOwner) {
      workflowReadiness += 8;
    }
    if (plan.state.integrationPlatform && plan.state.integrationPlatform.length > 0) {
      workflowReadiness += 8;
    }
    if (plan.intake.notes) {
      workflowReadiness += 4;
    }

    let automationLeverage = 45;
    if (plan.state.automationNeed === "Essential") {
      automationLeverage += 20;
    } else if (plan.state.automationNeed === "Helpful") {
      automationLeverage += 10;
    }
    if (plan.state.integrationPlatform && plan.state.integrationPlatform.length >= 2) {
      automationLeverage += 8;
    }
    ["leadVolume", "contentVolume", "meetingVolume"].forEach((key) => {
      if (plan.state[key] === "High") {
        automationLeverage += 6;
      } else if (plan.state[key] === "Medium") {
        automationLeverage += 3;
      }
    });
    if (plan.intakeSignals.phoneSupportPriority === "Major Channel") {
      automationLeverage += 8;
    }

    const metrics = [
      {
        label: "Time Savings Potential",
        score: clampScore(timeSavings),
        reason: `Based on ${plan.roiEstimate.timeSaved} of estimated weekly savings from the starter workflow.`
      },
      {
        label: "Revenue Impact Potential",
        score: clampScore(revenuePotential),
        reason: "Reflects how directly this stack supports lead capture, conversion, retention, or content output."
      },
      {
        label: "Implementation Ease",
        score: clampScore(implementationEase),
        reason: "Higher when the stack is lean, the environment is less regulated, and the team can adopt changes quickly."
      },
      {
        label: "Workflow Readiness",
        score: clampScore(workflowReadiness),
        reason: "Higher when the business already knows the first workflow, current tools, owner, and operating context."
      },
      {
        label: "Automation Leverage",
        score: clampScore(automationLeverage),
        reason: "Higher when the business has enough volume, platforms, or repeated work to justify systemized flows."
      }
    ];

    const overall = clampScore(
      (metrics[0].score * 0.24)
      + (metrics[1].score * 0.24)
      + (metrics[2].score * 0.18)
      + (metrics[3].score * 0.17)
      + (metrics[4].score * 0.17)
    );

    const summary = overall >= 78
      ? "This is a strong fit for a paid plan because the business has a clear enough workflow and enough upside to benefit from guided implementation."
      : overall >= 62
        ? "This plan should still help, but the biggest win will come from tightening the first workflow and keeping the stack simple."
        : "The stack can help, but the first priority should be clarifying the workflow and keeping expectations very practical.";

    return {
      overall,
      label: getScoreLabel(overall),
      summary,
      metrics
    };
  }

  function getUniqueRenderedToolsByCategory(tools, categories, limit) {
    const picked = [];
    categories.forEach((category) => {
      const matchingTool = tools.find((tool) => tool.category === category && !picked.some((candidate) => candidate.name === tool.name));
      if (matchingTool) {
        picked.push(matchingTool);
      }
    });
    return picked.slice(0, limit);
  }

  function getAllRenderedTools(plan) {
    return [...plan.tiers.starter.tools, ...plan.tiers.growth.tools, ...plan.tiers.advanced.tools]
      .filter((tool, index, tools) => tools.findIndex((candidate) => candidate.name === tool.name) === index);
  }

  function buildQuickWins(plan) {
    const businessName = plan.intake.businessName || "This business";
    const allTools = getAllRenderedTools(plan);
    const assistantTool = getUniqueRenderedToolsByCategory(allTools, ["Core Assistant", "CRM", "Support", "Content Studio"], 1)[0];
    const workflowLabel = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;

    const presets = {
      "Lead Follow-Up": [
        {
          title: "Write one same-day follow-up template",
          detail: `Use ${assistantTool ? assistantTool.name : "the core assistant"} to turn every new inquiry into a fast reply and internal summary.`,
          outcome: "Cuts response delay without changing the whole stack."
        },
        {
          title: "Create a lead summary prompt",
          detail: `Standardize what ${businessName} captures from each inquiry so the next step is obvious.`,
          outcome: "Fewer dropped leads and cleaner callbacks."
        },
        {
          title: "Set one follow-up reminder rule",
          detail: "Make sure every open lead gets a next action within 24 hours.",
          outcome: "Immediate improvement in consistency."
        }
      ],
      "Customer Support": [
        {
          title: "Draft a reply library for common questions",
          detail: "Create 5 to 10 approved answer patterns before automating anything public-facing.",
          outcome: "Faster replies with less guesswork."
        },
        {
          title: "Add one escalation rule",
          detail: "Define when AI drafts are okay and when a human must take over.",
          outcome: "Protects tone and customer trust."
        },
        {
          title: "Tag incoming requests by urgency",
          detail: "Use a simple priority label so the team knows what needs attention first.",
          outcome: "Less inbox chaos in the first week."
        }
      ],
      "Content Creation": [
        {
          title: "Turn one source into a 30-day content seed list",
          detail: `Use ${assistantTool ? assistantTool.name : "the assistant"} to repurpose a transcript, recording, or note into post ideas.`,
          outcome: "Immediate content momentum."
        },
        {
          title: "Create one brand-voice prompt",
          detail: `Give ${businessName} a reusable prompt for tone, CTA style, and audience fit.`,
          outcome: "Cleaner output with less editing."
        },
        {
          title: "Build one publish-ready template",
          detail: "Set one repeatable format for captions, scripts, or briefs.",
          outcome: "Reduces blank-page time."
        }
      ]
    };

    return (presets[plan.state.primaryBottleneck] || [
      {
        title: "Pick one workflow to standardize today",
        detail: `Start with ${workflowLabel} and document the ideal before automating it.`,
        outcome: "Makes the rest of the stack easier to use."
      },
      {
        title: "Create one reusable AI prompt",
        detail: `Use ${assistantTool ? assistantTool.name : "the assistant"} for the most repeated task this week.`,
        outcome: "Quick time savings without more software."
      },
      {
        title: "Set one owner and one weekly check",
        detail: "Assign who owns the workflow and what success looks like.",
        outcome: "Turns the plan into a real operating habit."
      }
    ]).slice(0, 3);
  }

  function buildUseCasePlaybooks(plan) {
    const allTools = getAllRenderedTools(plan);
    const playbooks = [];

    function addPlaybook(title, result, steps, categories) {
      const tools = getUniqueRenderedToolsByCategory(allTools, categories, 3);
      playbooks.push({ title, result, steps, tools });
    }

    if (plan.state.primaryBottleneck === "Lead Follow-Up" || plan.state.mainGoal === "Close More Leads") {
      addPlaybook(
        "How to turn new inquiries into booked next steps faster",
        "The goal is cleaner speed-to-lead, fewer dropped follow-ups, and more consistent next actions.",
        [
          "Capture the lead in one place and summarize it immediately.",
          "Draft the reply and next-step message before the owner has to start from scratch.",
          "Track whether the lead was contacted, booked, or needs another touch."
        ],
        ["CRM", "Core Assistant", "Scheduling", "Automation"]
      );
    }

    if (plan.state.primaryBottleneck === "Customer Support" || plan.intakeSignals.phoneSupportPriority === "Major Channel" || plan.state.businessType === "Local Service") {
      addPlaybook(
        "How to automate customer replies without sounding robotic",
        "The goal is faster response time while keeping a clear human review path for anything sensitive or unusual.",
        [
          "Build approved reply patterns for the questions that show up every week.",
          "Use AI to draft replies and categorize urgency before a human sends or approves them.",
          "Escalate edge cases, billing issues, or sensitive conversations instead of forcing full automation."
        ],
        ["Support", "Core Assistant", "Automation", "CRM"]
      );
    }

    if (plan.state.primaryBottleneck === "Content Creation" || plan.state.businessType === "Creator" || plan.state.designContent === "Essential" || plan.state.designContent === "Helpful") {
      addPlaybook(
        "How to create 30 days of content from one source",
        "The goal is to turn one transcript, call, script, or note into a repeatable month of usable assets.",
        [
          "Start from one strong source instead of writing everything from zero.",
          "Use AI to extract hooks, angles, captions, scripts, or clip ideas in batches.",
          "Publish from a simple calendar before adding more channels or tools."
        ],
        ["Core Assistant", "Design", "Content Studio", "Automation"]
      );
    }

    if (playbooks.length < 3) {
      addPlaybook(
        "How to turn meetings into actions and SOPs",
        "The goal is fewer lost decisions, clearer ownership, and faster handoffs after calls or internal meetings.",
        [
          "Capture the meeting once and summarize only what matters.",
          "Convert action items into one shared handoff list.",
          "Turn repeated decisions into SOP notes instead of re-explaining them every week."
        ],
        ["Meetings", "Workspace", "Automation", "Core Assistant"]
      );
    }

    if (playbooks.length < 3) {
      addPlaybook(
        "How to reduce admin time without over-automating",
        "The goal is to remove copy-paste work first, then layer in more advanced automation only where it earns its place.",
        [
          "Pick the one repeated admin task that shows up every day.",
          "Use AI for drafting, summarizing, or categorizing before you build heavier flows.",
          "Measure the minutes saved and only then add routing or syncing."
        ],
        ["Core Assistant", "Automation", "Workspace"]
      );
    }

    return playbooks.slice(0, 3);
  }

  function buildAutomationFlows(plan) {
    const flows = [];

    function addFlow(title, flow, outcome) {
      flows.push({ title, flow, outcome });
    }

    if (plan.state.primaryBottleneck === "Lead Follow-Up" || plan.state.mainGoal === "Close More Leads") {
      addFlow(
        "Lead capture and follow-up",
        "Website form or inquiry -> AI summary -> CRM or inbox -> owner task -> follow-up email or text",
        "Keeps new leads moving instead of sitting in a mixed inbox."
      );
    }

    if (plan.state.primaryBottleneck === "Customer Support" || plan.intakeSignals.phoneSupportPriority === "Major Channel") {
      addFlow(
        "Customer replies and escalation",
        "Website chat, email, or phone message -> AI draft or triage -> support inbox -> human approval or escalation",
        "Speeds up first response while protecting quality on complex issues."
      );
    }

    if (plan.state.primaryBottleneck === "Content Creation" || plan.state.businessType === "Creator" || plan.state.designContent !== "Not Needed") {
      addFlow(
        "Content repurposing",
        "Transcript, note, or recording -> AI content brief -> design or clip tool -> scheduler -> email or CRM follow-up",
        "Turns one source into a repeatable publishing system."
      );
    }

    if (flows.length < 3) {
      addFlow(
        "Meeting to action flow",
        "Call or meeting -> transcript -> summary -> task list -> shared docs or SOP update",
        "Reduces forgotten tasks and makes knowledge reusable."
      );
    }

    return flows.slice(0, 3);
  }

  function buildPathOptions(plan) {
    const starterNames = formatNaturalList(plan.tiers.starter.tools.slice(0, 3).map((tool) => tool.name)) || "the starter stack";
    const growthNames = formatNaturalList(plan.tiers.growth.additions.slice(0, 3).map((toolConfig) => toolConfig.name)) || formatNaturalList(plan.tiers.growth.tools.slice(0, 3).map((tool) => tool.name)) || "the growth layer";
    const advancedNames = formatNaturalList(plan.tiers.advanced.additions.slice(0, 3).map((toolConfig) => toolConfig.name)) || formatNaturalList(plan.tiers.advanced.tools.slice(0, 3).map((tool) => tool.name)) || "the advanced layer";
    const firstWorkflow = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;

    return {
      simple: {
        title: "Simple version (start here)",
        description: `Start with ${starterNames} and fix ${firstWorkflow} before you add more software.`,
        bullets: [
          "Use the starter layer for one core workflow only.",
          "Keep one owner, one prompt set, and one weekly check.",
          "Delay extra tools until the first workflow works consistently."
        ]
      },
      advanced: {
        title: "Upgrade version (scale later)",
        description: `Add ${growthNames} next, and only move into ${advancedNames} when volume or complexity clearly justifies it.`,
        bullets: [
          "Add the second workflow once the first one is stable.",
          "Expand reporting, routing, or support layers only when they solve a real bottleneck.",
          "Treat advanced tooling as a scale move, not a launch move."
        ]
      }
    };
  }

  function buildPromptPack(plan) {
    const businessName = plan.intake.businessName || "the business";
    const firstWorkflow = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;

    return [
      {
        title: "Core workflow prompt",
        use: `Use this to support ${firstWorkflow}.`,
        text: `You are the operations assistant for ${businessName}. Help with ${firstWorkflow}.\n\nGoals:\n- be concise and accurate\n- keep the tone professional and human\n- suggest the clearest next step\n- flag missing information before guessing\n\nInput:\n{{paste raw notes, inquiry, or transcript here}}\n\nReturn:\n1. short summary\n2. recommended next action\n3. draft response or output\n4. missing info to request`
      },
      {
        title: "Email or reply draft prompt",
        use: "Use this for outbound follow-up or customer replies.",
        text: `Write a reply for ${businessName} using the details below.\n\nRequirements:\n- 80 to 140 words\n- sound natural, not robotic\n- confirm the request or issue in plain English\n- end with one clear call to action\n\nContext:\n{{paste inquiry or customer message}}\n\nReturn:\n1. customer-ready reply\n2. internal summary\n3. subject line if email is needed`
      },
      {
        title: "Weekly review prompt",
        use: "Use this every Friday to tighten the stack and prompts.",
        text: `Review this week's AI workflow results for ${businessName}.\n\nUse the notes below and tell me:\n- what saved the most time\n- where the workflow broke down\n- what prompt or step should change next week\n- what should not be automated yet\n\nNotes:\n{{paste weekly observations}}`
      },
      {
        title: "Content or FAQ expansion prompt",
        use: "Use this to turn one source into more usable assets.",
        text: `Turn the source below into useful business assets for ${businessName}.\n\nCreate:\n- 3 short-form content ideas or FAQ answers\n- 1 longer-form angle\n- 1 CTA that fits the business\n- 1 repurposing suggestion for email, social, or web\n\nSource:\n{{paste transcript, article, call notes, or product info}}`
      }
    ];
  }

  function buildToolAlternatives(plan, entryMap) {
    const targetCategories = [...new Set([
      ...plan.tiers.starter.tools.map((tool) => tool.category),
      plan.state.primaryBottleneck === "Lead Follow-Up" ? "CRM" : "",
      plan.state.primaryBottleneck === "Customer Support" ? "Support" : "",
      plan.state.primaryBottleneck === "Content Creation" ? "Content Studio" : "",
      "Core Assistant"
    ].filter(Boolean))].slice(0, 3);

    function sortByCheapest(left, right) {
      return (left.tool.monthlyMin || 0) - (right.tool.monthlyMin || 0) || right.score - left.score;
    }

    function sortByAdvanced(left, right) {
      return (right.tool.monthlyMax || 0) - (left.tool.monthlyMax || 0) || right.score - left.score;
    }

    return targetCategories.map((category) => {
      const entries = plan.rankedEntries.filter((entry) => entry.tool.category === category).slice(0, 8);
      if (entries.length === 0) {
        return null;
      }

      const bestEntry = entries[0];
      const cheapEntry = [...entries].sort(sortByCheapest).find((entry) => entry.tool.name !== bestEntry.tool.name) || bestEntry;
      const advancedEntry = [...entries].sort(sortByAdvanced).find((entry) => ![bestEntry.tool.name, cheapEntry.tool.name].includes(entry.tool.name)) || bestEntry;

      return {
        category,
        optionA: buildRenderedTool(cheapEntry.tool, entryMap),
        optionB: buildRenderedTool(bestEntry.tool, entryMap),
        optionC: buildRenderedTool(advancedEntry.tool, entryMap)
      };
    }).filter(Boolean);
  }

  function buildNinetyDayPlan(plan) {
    const firstWorkflow = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;
    const growthNames = formatNaturalList(plan.tiers.growth.additions.slice(0, 3).map((toolConfig) => toolConfig.name)) || "the growth layer";
    const advancedNames = formatNaturalList(plan.tiers.advanced.additions.slice(0, 3).map((toolConfig) => toolConfig.name)) || "the advanced layer";

    return [
      {
        phase: "Week 1",
        title: "Set the starter stack and owner",
        detail: `Buy or activate the starter tools, assign one owner, and set the first workflow around ${firstWorkflow}.`
      },
      {
        phase: "Week 2",
        title: "Launch the first workflow",
        detail: "Use the prompts, templates, and reply patterns with real work so the team is not just testing in theory."
      },
      {
        phase: "Month 1",
        title: "Tighten the first workflow",
        detail: "Measure time saved, fix weak handoffs, and remove steps that still depend on copying or guesswork."
      },
      {
        phase: "Month 2",
        title: "Add the next useful layer",
        detail: `Bring in ${growthNames} only if the starter workflow is running every week and the next bottleneck is obvious.`
      },
      {
        phase: "Month 3",
        title: "Scale with proof, not hype",
        detail: `Review ROI, decide whether ${advancedNames} is justified, and keep only the tools that clearly earn their place.`
      }
    ];
  }

  function buildBuyPriority(plan) {
    const businessName = plan.intake.businessName || "This business";
    const firstWorkflow = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;

    function getPriorityToolsForTier(tier) {
      const additionNames = new Set((tier.additions || []).map((toolConfig) => toolConfig.name));
      const preferred = tier.tools.filter((tool) => additionNames.has(tool.name));
      return (preferred.length > 0 ? preferred : tier.tools).slice(0, 3);
    }

    const starterTools = plan.tiers.starter.tools.slice(0, 3);
    const growthTools = getPriorityToolsForTier(plan.tiers.growth);
    const advancedTools = getPriorityToolsForTier(plan.tiers.advanced);
    const starterNames = formatNaturalList(starterTools.map((tool) => tool.name)) || "the starter stack";
    const growthNames = formatNaturalList(growthTools.map((tool) => tool.name)) || "the growth layer";
    const advancedNames = formatNaturalList(advancedTools.map((tool) => tool.name)) || "the scale layer";

    return [
      {
        label: "Buy First",
        timing: "Now",
        title: `Launch ${firstWorkflow} with ${starterNames}`,
        detail: `${businessName} should start with the leanest tools that improve ${firstWorkflow} immediately instead of buying more software than the team can use this month.`,
        gate: "Move on only after the workflow is used every week and someone owns the metric.",
        tools: starterTools
      },
      {
        label: "Buy Second",
        timing: plan.isScaleBlueprint ? "After the first workflow is steady" : "After the first win is proven",
        title: `Add ${growthNames}`,
        detail: "This second layer is for stronger handoffs, follow-up reliability, and cleaner cross-tool movement once the starter stack is already being used in real work.",
        gate: plan.isScaleBlueprint
          ? "Add this when the business wants a stronger operating rhythm, not just a faster draft."
          : "Add this when the starter layer already has a clear owner and a weekly review habit.",
        tools: growthTools
      },
      {
        label: "Buy Third",
        timing: "Only if volume earns it",
        title: `Delay ${advancedNames} until scale is real`,
        detail: "This layer is for deeper automation, operating control, approvals, and more complex handoffs after the first two layers are clearly adopted.",
        gate: "If the owner is still manually cleaning up the first workflow, wait before buying the scale layer.",
        tools: advancedTools
      }
    ];
  }

  function buildNotYetList(plan) {
    const currentMatches = getCurrentToolMatches(plan.intake.currentTools);
    const advancedNames = formatNaturalList(
      (plan.tiers.advanced.additions.length > 0 ? plan.tiers.advanced.additions : plan.tiers.advanced.tools)
        .slice(0, 3)
        .map((toolConfig) => toolConfig.name)
    ) || "the scale layer";

    const items = [
      {
        label: "Hold Off",
        title: `Do not buy ${advancedNames} too early`,
        detail: plan.isScaleBlueprint
          ? "Even Scale Blueprint should treat the scale layer as an earned move. Add it only after the starter workflow is stable, measured, and reviewed weekly."
          : "The biggest waste move is buying the deeper layer before the first workflow is running consistently every week."
      }
    ];

    if (currentMatches.length > 0) {
      items.push({
        label: "Watch Overlap",
        title: "Do not double-pay for categories the business already has",
        detail: `The current stack already includes ${formatNaturalList(currentMatches.slice(0, 3).map((toolConfig) => toolConfig.name))}. Review overlap before adding another assistant, CRM, support, or workspace layer.`
      });
    } else {
      items.push({
        label: "Keep It Lean",
        title: "Do not add more than one new layer at a time",
        detail: "The free and paid plans work best when the team launches the starter stack first, proves one workflow, and only then adds more software."
      });
    }

    items.push({
      label: "Protect Quality",
      title: plan.state.complianceSensitivity === "High" || ["Legal", "Medical/Dental"].includes(plan.state.businessType)
        ? "Do not automate sensitive or regulated decisions first"
        : "Do not automate approvals or final sending first",
      detail: "Use AI first for drafting, summaries, routing, and prep work before letting it quote, approve, publish, or send anything important on its own."
    });

    return items.slice(0, 3);
  }

  function buildSubscriptionWasteCheck(plan) {
    const currentMatches = getCurrentToolMatches(plan.intake.currentTools);
    const allRecommendedTools = getAllRenderedTools(plan);
    const recommendedNames = new Set(allRecommendedTools.map((tool) => tool.name));
    const recommendedCategories = new Set(allRecommendedTools.map((tool) => tool.category));
    const exactMatches = currentMatches.filter((toolConfig) => recommendedNames.has(toolConfig.name));
    const categoryMatches = currentMatches.filter((toolConfig) => recommendedCategories.has(toolConfig.category) && !recommendedNames.has(toolConfig.name));
    const reviewCandidates = [...exactMatches, ...categoryMatches]
      .filter((toolConfig, index, tools) => tools.findIndex((candidate) => candidate.name === toolConfig.name) === index);
    const reviewCount = reviewCandidates.length;

    if (currentMatches.length === 0) {
      return {
        summary: "No current subscriptions were listed, so the bigger risk is not overlap yet. The real risk is buying too much too early before the starter workflow proves itself.",
        cards: [
          {
            label: "Reuse First",
            title: "No current subscription overlap was flagged",
            copy: "That gives the business a clean launch path, but it also means each new tool should earn its place before another one is added."
          },
          {
            label: "Main Waste Risk",
            title: "Category sprawl is the first thing to avoid",
            copy: "The fastest way to waste money is to add two assistants, two support layers, or two content tools before the first workflow is measured."
          },
          {
            label: "Savings Move",
            title: "Review the stack again after 30 days",
            copy: "If the starter stack is creating a visible win, add the next layer. If not, tighten prompts and ownership before buying more."
          }
        ]
      };
    }

    return {
      summary: reviewCount > 0
        ? "The goal is to reuse what already works, avoid overlap, and cut anything that stays redundant after the first workflow is live."
        : `The current stack (${plan.intake.currentTools}) does not show heavy direct overlap yet, but the report should still protect against slow subscription drift.`,
      cards: [
        {
          label: "Reuse First",
          title: exactMatches.length > 0
            ? `${formatNaturalList(exactMatches.slice(0, 3).map((toolConfig) => toolConfig.name))} can stay in play`
            : "Keep the closest current tools before buying replacements",
          copy: exactMatches.length > 0
            ? "The business already has tools that match the recommended stack directly, so the first win may come from using them more deliberately."
            : "If a current tool already handles part of the starter workflow well enough, use the blueprint to tighten the workflow before swapping software."
        },
        {
          label: "Overlap Risk",
          title: categoryMatches.length > 0
            ? `${formatNaturalList(categoryMatches.slice(0, 3).map((toolConfig) => toolConfig.name))} may overlap with the new stack`
            : "The bigger risk is future category overlap",
          copy: categoryMatches.length > 0
            ? "Keep overlapping tools only long enough to compare value. Do not let two similar layers become permanent just because both are available."
            : "The safe move is to add one layer, prove it, and then review whether another subscription is actually filling a different role."
        },
        {
          label: "Savings Move",
          title: reviewCount > 0
            ? `Review ${reviewCount} current subscription${reviewCount === 1 ? "" : "s"} after the first month`
            : "Review spend before moving into the next layer",
          copy: reviewCount > 0
            ? `After 30 days, review ${formatNaturalList(reviewCandidates.slice(0, 4).map((toolConfig) => toolConfig.name))} and pause whatever is no longer clearly earning its place.`
            : "The best savings move is not buying extra software until the current workflow is clearly saving time or improving follow-up."
        }
      ]
    };
  }

  function buildFirstWeekChecklist(plan) {
    const firstWorkflow = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;
    const owner = plan.implementationReality.owner || plan.intake.implementationOwner || "Owner / founder";
    const starterNames = formatNaturalList(plan.tiers.starter.tools.slice(0, 3).map((tool) => tool.name)) || "the starter stack";

    return [
      {
        step: "Day 1",
        title: `Buy or activate ${starterNames}`,
        detail: `Keep the first week focused on ${firstWorkflow}, not on building every possible workflow at once.`
      },
      {
        step: "Day 1",
        title: `Assign ${owner} as the workflow owner`,
        detail: `This person owns ${plan.measurementPlan.primaryMetric} and the weekly review so the stack does not become shared wishful thinking.`
      },
      {
        step: "Day 2",
        title: "Set one prompt pack and one working template",
        detail: "Use the report prompts for the main workflow so the team starts from the same operating standard instead of improvising."
      },
      {
        step: "Day 3",
        title: `Connect only the minimum systems needed for ${firstWorkflow}`,
        detail: "Avoid extra automations or integrations until the first path works with real inputs and clear ownership."
      },
      {
        step: "Days 4-5",
        title: "Run 5 real examples through the stack",
        detail: "Use actual leads, content, support requests, or meeting notes so the team can see where handoffs still break."
      },
      {
        step: "End of Week 1",
        title: "Review the metric and decide what changes next",
        detail: `Use ${plan.measurementPlan.primaryMetric} and ${plan.measurementPlan.secondaryMetric} to decide whether to tighten the starter layer or move toward the next purchase.`
      }
    ];
  }

  function buildBeforeAfterSnapshot(plan) {
    const firstWorkflow = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;
    const presets = {
      "Lead Follow-Up": {
        before: [
          "New inquiries land in email, DMs, or voicemail with no clean summary.",
          "Someone rewrites the same follow-up from scratch each time.",
          "The next action depends on memory instead of a repeatable system."
        ],
        after: [
          "Each new inquiry gets summarized and routed into one clear next-step path.",
          "The owner starts from a drafted reply instead of a blank page.",
          "Follow-up status, reminders, and handoffs are visible instead of buried."
        ],
        outcome: "The first measurable win is faster same-day follow-up and fewer dropped leads."
      },
      "Content Creation": {
        before: [
          "Every asset starts from zero, even when the source material already exists.",
          "Ideas, scripts, and design steps live across too many tabs and notes.",
          "Publishing slips because the workflow depends on starting over each time."
        ],
        after: [
          "One transcript, note, or recording becomes a repeatable content source.",
          "AI creates briefs, hooks, captions, or scripts from the same source material.",
          "The team publishes from a cleaner system instead of rebuilding the process every week."
        ],
        outcome: "The first measurable win is more finished content per week with less editing drag."
      },
      Meetings: {
        before: [
          "Call notes live in scattered docs, inboxes, and memory.",
          "Action items get rewritten manually after every meeting.",
          "Decisions are lost because nobody owns the cleanup step."
        ],
        after: [
          "Meetings are captured once and summarized the same way every time.",
          "Action items and handoffs become visible within 24 hours.",
          "Repeated decisions start turning into reusable SOPs instead of one-off explanations."
        ],
        outcome: "The first measurable win is less recap time and fewer dropped action items after calls."
      },
      "Customer Support": {
        before: [
          "Common questions still get answered from scratch.",
          "Urgent and non-urgent issues mix together in the same inbox.",
          "The team has no clear line between what AI can help with and what needs a person."
        ],
        after: [
          "Repeat questions use approved answer patterns and faster triage.",
          "AI drafts and categorization reduce the first-response burden.",
          "Escalation paths stay human-controlled for anything sensitive or unusual."
        ],
        outcome: "The first measurable win is a faster first response without lowering quality."
      }
    };

    const preset = presets[plan.state.primaryBottleneck] || {
      before: [
        `The workflow around ${firstWorkflow} depends on scattered notes, copy-paste work, and manual follow-up.`,
        "Different people solve the same task in different ways every week.",
        "The business has no clear proof of what is actually saving time."
      ],
      after: [
        `The workflow around ${firstWorkflow} has a repeatable tool path and clearer ownership.`,
        "The team starts from prompts, templates, and summaries instead of blank work.",
        "The first win becomes measurable before the next software decision is made."
      ],
      outcome: "The first measurable win is a cleaner workflow with less manual rework."
    };

    return {
      title: `Before and after ${firstWorkflow}`,
      beforeLabel: "Before AI stack",
      afterLabel: plan.isScaleBlueprint ? "After Growth + Scale logic" : "After the starter stack",
      before: preset.before,
      after: preset.after,
      outcome: preset.outcome
    };
  }

  function getMeasurementPreset(plan) {
    const presets = {
      "Lead Follow-Up": {
        timeToSignal: "7-14 days",
        highControlTime: "14-21 days",
        metric: "Same-day lead response rate",
        secondaryMetric: "Booked calls or estimates from new inquiries",
        successLooksLike: "More leads receive a same-day reply and a clear next action without the owner manually chasing each one.",
        scaleGate: "the team sees cleaner follow-up for 2 straight weeks and the next missed handoff becomes obvious"
      },
      "Content Creation": {
        timeToSignal: "14-21 days",
        highControlTime: "21-30 days",
        metric: "Finished assets per week from one source",
        secondaryMetric: "Editing time per post, clip, or brief",
        successLooksLike: "One source reliably turns into several usable assets with less editing drag.",
        scaleGate: "the team can repeat the publishing workflow weekly without rebuilding prompts from scratch"
      },
      "Admin Work": {
        timeToSignal: "7-14 days",
        highControlTime: "14-21 days",
        metric: "Owner or admin hours reclaimed each week",
        secondaryMetric: "Manual copy-paste steps removed",
        successLooksLike: "Repeated admin work takes noticeably less time and fewer tasks get lost between systems.",
        scaleGate: "the owner trusts the new workflow enough to stop doing the same cleanup manually"
      },
      Meetings: {
        timeToSignal: "7-14 days",
        highControlTime: "14-21 days",
        metric: "Time spent on recaps and meeting cleanup",
        secondaryMetric: "Action items captured within 24 hours",
        successLooksLike: "Recaps, task handoffs, and next steps are cleaner without someone rewriting every meeting by hand.",
        scaleGate: "meeting notes are consistent for 2 weeks and tasks stop slipping after calls"
      },
      Research: {
        timeToSignal: "7-14 days",
        highControlTime: "14-21 days",
        metric: "Research-to-draft turnaround time",
        secondaryMetric: "Fewer hours spent gathering background before writing",
        successLooksLike: "The business can move from source material to a useful draft faster without lowering quality.",
        scaleGate: "the team is using the research layer every week and the next bottleneck shifts to production or review"
      },
      "Customer Support": {
        timeToSignal: "7-14 days",
        highControlTime: "14-21 days",
        metric: "First response time and backlog size",
        secondaryMetric: "Tickets or questions resolved without repeated rewrites",
        successLooksLike: "Common replies get out faster while escalation rules keep more complex issues with a human.",
        scaleGate: "response times stay lower for 2 weeks and support handoffs are cleaner"
      },
      "Internal Docs": {
        timeToSignal: "7-14 days",
        highControlTime: "14-21 days",
        metric: "Time to turn notes into SOPs, briefs, or internal answers",
        secondaryMetric: "How often the team can reuse the same internal guidance",
        successLooksLike: "Internal knowledge becomes easier to find and update instead of living in scattered notes.",
        scaleGate: "the team is reusing the same docs and prompts without re-explaining the workflow every week"
      },
      Scheduling: {
        timeToSignal: "7-14 days",
        highControlTime: "14-21 days",
        metric: "Completed bookings and fewer missed callbacks",
        secondaryMetric: "Time between inquiry and scheduled next step",
        successLooksLike: "Bookings move faster and the team spends less time manually sorting appointment handoffs.",
        scaleGate: "appointments are moving through one consistent path with fewer manual reminders"
      }
    };

    const preset = presets[plan.state.primaryBottleneck] || {
      timeToSignal: "7-14 days",
      highControlTime: "14-21 days",
      metric: "Time saved in the first workflow",
      secondaryMetric: "Fewer manual handoffs",
      successLooksLike: "The first workflow feels lighter and more repeatable within the first couple of weeks.",
      scaleGate: "the starter workflow runs every week without the owner patching it manually"
    };

    const highControl = plan.state.complianceSensitivity === "High" || plan.intakeSignals.usesOracle || plan.intakeSignals.usesHealthcareSystems;
    const timeToSignal = highControl ? preset.highControlTime : preset.timeToSignal;
    const reviewCadence = timeToSignal === "7-14 days"
      ? "Review at the end of week 1 and week 2."
      : "Review once during the first 2 weeks, then again at the end of the first month.";

    return {
      timeToSignal,
      metric: preset.metric,
      secondaryMetric: preset.secondaryMetric,
      successLooksLike: preset.successLooksLike,
      scaleGate: preset.scaleGate,
      reviewCadence
    };
  }

  function buildMeasurementPlan(plan) {
    const preset = getMeasurementPreset(plan);
    const firstWorkflow = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;

    return {
      timeToSignal: preset.timeToSignal,
      primaryMetric: preset.metric,
      secondaryMetric: preset.secondaryMetric,
      successLooksLike: preset.successLooksLike,
      reviewCadence: preset.reviewCadence,
      scaleGate: `Expand only when ${preset.scaleGate}.`,
      pilotSteps: [
        `Document the current baseline for ${preset.metric.toLowerCase()} before changing the workflow.`,
        `Launch only the starter stack around ${firstWorkflow}.`,
        "Run 5 to 10 real examples with human review and save the prompts or templates that actually work.",
        `Review ${preset.metric.toLowerCase()} on the cadence above instead of judging the stack after one good or bad day.`,
        "Keep, cut, or expand the stack based on whether the workflow feels repeatable without extra owner cleanup."
      ]
    };
  }

  function buildImplementationReality(plan) {
    const owner = plan.intake.implementationOwner || "Owner / founder";
    const platformCount = plan.state.integrationPlatform ? plan.state.integrationPlatform.length : 0;
    const highComplexity = plan.state.complianceSensitivity === "High"
      || plan.intakeSignals.usesOracle
      || plan.intakeSignals.usesHealthcareSystems
      || plan.intakeSignals.phoneSupportPriority === "Major Channel"
      || (plan.state.automationNeed === "Essential" && platformCount >= 3);
    const mediumComplexity = !highComplexity && (
      plan.state.automationNeed === "Essential"
      || platformCount >= 2
      || plan.state.teamSize === "6-20"
      || plan.state.teamSize === "21+"
      || plan.state.techComfort === "Low"
    );

    if (highComplexity) {
      return {
        mode: "Technical setup recommended",
        summary: "The starter layer can still stay lean, but this environment has enough integrations, controls, or workflow risk that a technical person should help with permissions, routing, and guardrails.",
        owner,
        adminTasks: [
          "Own the workflow rules, prompts, approvals, and weekly review.",
          "Decide what good output looks like before anything is automated further.",
          "Collect feedback from the people who actually use the workflow each week."
        ],
        technicalTasks: [
          "Connect systems, permissions, and sanctioned data sources safely.",
          "Handle routing, fallback logic, and access controls before rollout.",
          "Document what is automated, what is reviewed, and where the handoff happens."
        ]
      };
    }

    if (mediumComplexity) {
      return {
        mode: "Admin-led with light technical help",
        summary: "An operations lead, admin, or owner can run the starter rollout, but it helps to get technical support for the first integration or automation pass.",
        owner,
        adminTasks: [
          "Set the first workflow, prompts, and template outputs.",
          "Review quality, assign the weekly owner, and tighten the process.",
          "Handle the day-to-day use once the setup is live."
        ],
        technicalTasks: [
          "Help with the first integration, automation, or data mapping step.",
          "Check account permissions and reduce duplicate systems before scaling.",
          "Support troubleshooting if the workflow touches several platforms."
        ]
      };
    }

    return {
      mode: "Admin or owner can launch the starter layer",
      summary: "The starter stack is simple enough that a practical admin, operator, or founder should be able to get it running without dedicated technical help.",
      owner,
      adminTasks: [
        "Set up the starter tools, prompts, and approval rules.",
        "Run the first workflow manually with AI support before automating more.",
        "Review output quality and remove steps that still create confusion."
      ],
      technicalTasks: []
    };
  }

  function buildChatGptImplementation(plan) {
    const allTools = [
      ...plan.tiers.starter.tools,
      ...plan.tiers.growth.tools,
      ...plan.tiers.advanced.tools
    ];
    const includesChatGpt = allTools.some((tool) => tool.name === "ChatGPT");

    if (!includesChatGpt) {
      return null;
    }

    const businessName = plan.intake.businessName || "the business";
    const firstWorkflow = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;
    const implementationOwner = plan.implementationReality?.owner || plan.intake.implementationOwner || "Owner / founder";
    const platformList = formatNaturalList(plan.state.integrationPlatform.slice(0, 4)) || "the core business systems";
    const growthOrScaleLabel = plan.isScaleBlueprint ? "Scale Blueprint" : "Growth Blueprint";

    const commonSteps = [
      {
        step: "Step 1",
        title: "Set the first two or three approved ChatGPT jobs",
        detail: `Define the narrow first use cases for ${businessName} before inviting broader use. Start with practical work like draft replies, summaries, recap cleanup, SOP drafting, or planning support around "${firstWorkflow}".`
      },
      {
        step: "Step 2",
        title: "Create the company workspace and assign the right owner",
        detail: `Set ChatGPT up inside the business workspace, assign ${implementationOwner} as the day-to-day owner, and make sure the workspace name, seat setup, and member roles are clean before rollout.`
      },
      {
        step: "Step 3",
        title: "Write a simple internal AI use policy",
        detail: "Decide what information is allowed, what must stay out of prompts, which outputs need human review, and where employees should save final approved work."
      },
      {
        step: "Step 4",
        title: "Create one shared project for the first workflow",
        detail: `Use a shared ChatGPT project for the first priority workflow so prompts, files, context, and examples stay in one place instead of being scattered across private chats.`
      },
      {
        step: "Step 5",
        title: "Standardize prompts before the team improvises",
        detail: "Create a small starter prompt pack for the top recurring tasks and tell the team to start from those prompts first. This improves consistency faster than letting everyone freestyle."
      },
      {
        step: "Step 6",
        title: "Run a short pilot with human review",
        detail: "Pilot ChatGPT with a small group for 1 to 2 weeks. Review outputs, save the prompts that actually work, and tighten the approval path before rolling it out more broadly."
      }
    ];

    const scaleSteps = [
      {
        step: "Step 7",
        title: "Add role-specific GPTs and shared project structure",
        detail: "Create internal GPTs for the main jobs only after the base workflow is stable. Examples include a meeting recap GPT, content brief GPT, or customer reply draft GPT. Keep them workspace-only first."
      },
      {
        step: "Step 8",
        title: "Turn apps and company knowledge on intentionally",
        detail: `Review which apps should be available across ${platformList}, disable anything unnecessary, and only connect the sources that help the next operating layer without creating data sprawl.`
      },
      {
        step: "Step 9",
        title: "Assign ownership, KPI review, and handoff rules",
        detail: `Make ${implementationOwner} or the named workflow owner responsible for weekly quality review, adoption tracking, and deciding what can move from draft support into a more repeatable operating system.`
      },
      {
        step: "Step 10",
        title: "Expand only after the first workflow proves itself",
        detail: "Scale ChatGPT into more departments only when the first workflow is repeatable, measurable, and no longer creates cleanup work for the owner or ops lead."
      }
    ];

    const growthSteps = [
      {
        step: "Step 7",
        title: "Lock the starter workflow and document what worked",
        detail: `Once the pilot is working, document the approved prompts, project instructions, and output format for "${firstWorkflow}" so the team uses ChatGPT in one repeatable way instead of several different ways.`
      },
      {
        step: "Step 8",
        title: "Add one more workflow only after adoption is real",
        detail: `Use ${growthOrScaleLabel} to decide the next workflow, next tool purchase, and what to delay. Do not add more AI layers until the first ChatGPT workflow is clearly saving time every week.`
      }
    ];

    return {
      summary: plan.isScaleBlueprint
        ? "Because ChatGPT is part of this stack, it should be set up as a shared business system with workspace controls, projects, GPTs, apps, and ownership — not just as an individual prompt tool."
        : "Because ChatGPT is part of this stack, it should be set up as a business workspace with a clear first workflow, shared prompts, and a short pilot before more tools are added.",
      steps: plan.isScaleBlueprint ? [...commonSteps, ...scaleSteps] : [...commonSteps, ...growthSteps],
      checkpoints: plan.isScaleBlueprint
        ? [
            "Use standard ChatGPT seats for the people who need ChatGPT access; Codex-only seats do not include ChatGPT workspace access.",
            "Business workspace data is excluded from model training by default.",
            "Keep shared projects, GPTs, apps, and review ownership aligned to the workflows that already matter."
          ]
        : [
            "Start with one shared project and one prompt pack before building several GPTs.",
            "Keep the first rollout narrow enough that the owner can review real outputs.",
            "Do not add more paid tools until ChatGPT is already helping the first workflow every week."
      ]
    };
  }

  const EXACT_IMPLEMENTATION_TOOL_BUILDERS = {
    ChatGPT: buildChatGptImplementationModule,
    Claude: buildClaudeImplementationModule,
    HubSpot: buildHubSpotImplementationModule,
    Zapier: buildZapierImplementationModule,
    "Notion AI": buildNotionImplementationModule,
    Canva: buildCanvaImplementationModule,
    "Shopify Magic": buildShopifyMagicImplementationModule,
    Sidekick: buildSidekickImplementationModule
  };

  function toImplementationModule(tool, mode, headline, summary, steps, checkpoints) {
    return {
      toolName: tool.name,
      category: tool.category,
      tierLabel: tool.tierLabel,
      mode,
      headline,
      summary,
      steps,
      checkpoints,
      setupDifficulty: tool.setupDifficulty,
      implementationLabel: tool.implementationLabel
    };
  }

  function getImplementationFocusContext(plan) {
    return {
      businessName: plan.intake.businessName || "the business",
      firstWorkflow: plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText,
      owner: plan.implementationReality?.owner || plan.intake.implementationOwner || "Owner / founder",
      platforms: formatNaturalList(plan.state.integrationPlatform.slice(0, 4)) || "the core business systems"
    };
  }

  function appendScaleImplementationSteps(baseSteps, extraSteps, plan) {
    return plan.isScaleBlueprint ? [...baseSteps, ...extraSteps] : baseSteps;
  }

  function buildChatGptImplementationModule(plan, tool) {
    const module = buildChatGptImplementation(plan);
    return module
      ? toImplementationModule(tool, "Exact Module", "ChatGPT workspace rollout", module.summary, module.steps, module.checkpoints)
      : null;
  }

  function buildClaudeImplementationModule(plan, tool) {
    const { businessName, firstWorkflow, owner } = getImplementationFocusContext(plan);
    const baseSteps = [
      {
        step: "Step 1",
        title: "Define the approved Claude jobs first",
        detail: `Use Claude for the heavier writing and analysis work inside ${businessName}: proposals, scopes, summaries, policy-heavy writing, and turning messy material into a cleaner output around "${firstWorkflow}".`
      },
      {
        step: "Step 2",
        title: "Create one trusted source pack",
        detail: "Gather the files, notes, transcripts, briefs, and reference material Claude should work from so the team starts with good source inputs instead of improvising from memory."
      },
      {
        step: "Step 3",
        title: "Standardize output formats before rollout",
        detail: "Define the exact structure Claude should follow for summaries, proposals, briefs, or delivery documents so outputs look consistent across the team."
      },
      {
        step: "Step 4",
        title: "Build a small prompt library for long-form work",
        detail: "Create approved prompts for analysis, proposal drafting, summary writing, and document cleanup. The goal is repeatable quality, not novelty."
      },
      {
        step: "Step 5",
        title: "Pilot on real source-heavy work",
        detail: "Run Claude on 5 to 10 real documents or transcripts, compare the output against the team’s normal process, and tighten the prompts before wider adoption."
      },
      {
        step: "Step 6",
        title: "Save winning examples for the team",
        detail: `Have ${owner} or the named owner save a few approved prompt/output pairs so future users see what good Claude work actually looks like in this business.`
      }
    ];

    const scaleSteps = [
      {
        step: "Step 7",
        title: "Assign review ownership for high-trust outputs",
        detail: "If Claude is used for client deliverables, policies, or decision support, make one person responsible for quality review before anything leaves the team."
      },
      {
        step: "Step 8",
        title: "Turn the document workflow into a repeatable lane",
        detail: "Create a standard intake path for source docs, naming, output templates, and review timing so Claude becomes part of a system rather than a one-off writing helper."
      }
    ];

    return toImplementationModule(
      tool,
      "Exact Module",
      "Claude long-form analysis setup",
      plan.isScaleBlueprint
        ? "Claude should be implemented as a controlled long-form analysis and writing layer with standard source inputs, templates, and review ownership."
        : "Claude works best when the business uses it for a narrow set of higher-value writing and analysis jobs instead of general chat for everything.",
      appendScaleImplementationSteps(baseSteps, scaleSteps, plan),
      plan.isScaleBlueprint
        ? [
            "Use Claude where deeper reasoning and cleaner long-form outputs matter more than speed alone.",
            "Keep one approved output format per major document type.",
            "High-trust customer or policy outputs should stay human-reviewed."
          ]
        : [
            "Do not use Claude for every task just because it can handle long documents well.",
            "Save the best source materials and prompt examples early.",
            "Measure quality and edit time, not just speed."
          ]
    );
  }

  function buildHubSpotImplementationModule(plan, tool) {
    const { firstWorkflow, owner } = getImplementationFocusContext(plan);
    const baseSteps = [
      {
        step: "Step 1",
        title: "Clean the pipeline before adding more AI help",
        detail: "Review lifecycle stages, owner fields, mandatory properties, and duplicate handling first. HubSpot works best when the underlying pipeline is clean."
      },
      {
        step: "Step 2",
        title: "Map HubSpot to the first workflow",
        detail: `Define exactly how HubSpot should support "${firstWorkflow}" so the CRM becomes the system of record for the first real business win.`
      },
      {
        step: "Step 3",
        title: "Set lead routing and ownership rules",
        detail: `Make sure ${owner} or the named sales/ops owner knows who receives new leads, what happens when a lead is untouched, and what the next action should be.`
      },
      {
        step: "Step 4",
        title: "Build the first templates and AI-assisted drafts",
        detail: "Create the emails, follow-up templates, proposal outlines, and notes structure the team will actually use instead of expecting the CRM to improve outcomes on its own."
      },
      {
        step: "Step 5",
        title: "Track one dashboard first",
        detail: "Measure a small set of metrics such as response time, conversion to booked call, or pipeline movement before building a larger reporting layer."
      },
      {
        step: "Step 6",
        title: "Pilot with a small group and tighten the workflow",
        detail: "Run the new process with one owner or team slice first, then fix broken fields, bad routing, and noisy notifications before expanding."
      }
    ];

    const scaleSteps = [
      {
        step: "Step 7",
        title: "Add handoffs and SLA rules",
        detail: "For Scale Blueprint, define where leads move between sales, ops, and client delivery, and what the service-level expectation is at each handoff."
      },
      {
        step: "Step 8",
        title: "Layer in deeper automation only after the data is stable",
        detail: "Once the first pipeline is clean and measured, add sequences, automation, and richer reporting without turning HubSpot into an overbuilt operations project."
      }
    ];

    return toImplementationModule(
      tool,
      "Exact Module",
      "HubSpot CRM rollout",
      plan.isScaleBlueprint
        ? "HubSpot should become the owned operating layer for lead capture, routing, follow-up, and handoffs — not just a place where leads are stored."
        : "HubSpot should be implemented as a simple, owned lead and follow-up system before more automation is added.",
      appendScaleImplementationSteps(baseSteps, scaleSteps, plan),
      plan.isScaleBlueprint
        ? [
            "Clean data beats clever automation.",
            "Assign stage ownership before adding more routing.",
            "Use dashboards to review lead speed and handoff quality weekly."
          ]
        : [
            "Do not automate a messy pipeline.",
            "Start with one pipeline and one response standard.",
            "Make the CRM easier to use, not heavier."
          ]
    );
  }

  function buildZapierImplementationModule(plan, tool) {
    const { firstWorkflow, owner, platforms } = getImplementationFocusContext(plan);
    const baseSteps = [
      {
        step: "Step 1",
        title: "Map one automation path on paper first",
        detail: `Document the exact path for "${firstWorkflow}" before opening Zapier. Write the trigger, destination, owner, and fallback so the automation reflects a real process.`
      },
      {
        step: "Step 2",
        title: "Limit the first Zap to one clean business outcome",
        detail: `Connect only the apps needed across ${platforms} for the first automation win. Do not build a giant multi-app chain on day one.`
      },
      {
        step: "Step 3",
        title: "Define field mapping and required data",
        detail: "Check that names, emails, task owners, statuses, and timestamps are mapped correctly before anything runs live."
      },
      {
        step: "Step 4",
        title: "Create alerts and a manual fallback",
        detail: `Make sure ${owner} or the workflow owner can see when the automation fails and knows what to do manually while it is being fixed.`
      },
      {
        step: "Step 5",
        title: "Test on real examples before full release",
        detail: "Run the first Zap on 5 to 10 real cases and watch for duplicates, bad data, missing notifications, or accidental loops."
      },
      {
        step: "Step 6",
        title: "Name and document the automation clearly",
        detail: "Use a simple naming convention, document what the Zap does, and record who owns edits so future cleanup is easier."
      }
    ];

    const scaleSteps = [
      {
        step: "Step 7",
        title: "Add approvals and exception handling",
        detail: "Before expanding, decide which paths can stay automated and which need approval, especially if money, customer communication, or task ownership is involved."
      },
      {
        step: "Step 8",
        title: "Expand from one workflow lane into an automation system",
        detail: "Only after the first Zap is stable should the business add multi-step routing, richer notifications, and more cross-tool orchestration."
      }
    ];

    return toImplementationModule(
      tool,
      "Exact Module",
      "Zapier automation rollout",
      plan.isScaleBlueprint
        ? "Zapier should be treated as an owned automation layer with documentation, alerts, and approval logic."
        : "Zapier should be used to remove one repeated handoff first, not to automate the whole business in one pass.",
      appendScaleImplementationSteps(baseSteps, scaleSteps, plan),
      plan.isScaleBlueprint
        ? [
            "One stable Zap is worth more than five fragile ones.",
            "Always know who owns errors and exceptions.",
            "Approval rules matter before cross-tool scale."
          ]
        : [
            "Keep the first automation narrow and measurable.",
            "Log failures somewhere the owner actually sees.",
            "Do not automate around unclear business rules."
          ]
    );
  }

  function buildNotionImplementationModule(plan, tool) {
    const { firstWorkflow, owner } = getImplementationFocusContext(plan);
    const baseSteps = [
      {
        step: "Step 1",
        title: "Choose the exact Notion job first",
        detail: `Decide whether Notion will hold SOPs, meeting recaps, delivery docs, content planning, or internal knowledge for "${firstWorkflow}". Avoid making it everything at once.`
      },
      {
        step: "Step 2",
        title: "Create one clean workspace structure",
        detail: "Build the first pages, databases, and templates around the chosen job so the team lands in the same structure every time."
      },
      {
        step: "Step 3",
        title: "Standardize templates and naming",
        detail: "Create the recurring template formats for notes, recaps, SOPs, briefs, or task handoffs so Notion becomes more searchable and less messy."
      },
      {
        step: "Step 4",
        title: "Use AI inside one workflow lane",
        detail: "Apply Notion AI to summaries, draft cleanup, or internal writing inside the main template before expanding it into other databases."
      },
      {
        step: "Step 5",
        title: "Set permissions and owners",
        detail: `Make sure ${owner} or the internal owner knows which pages are editable, which are reference-only, and who maintains the source of truth.`
      },
      {
        step: "Step 6",
        title: "Review and archive every week",
        detail: "Run a weekly cleanup for stale pages, duplicate notes, and bad templates so the workspace gets clearer instead of noisier."
      }
    ];

    const scaleSteps = [
      {
        step: "Step 7",
        title: "Connect databases to the operating rhythm",
        detail: "For Scale Blueprint, use linked databases, handoff rules, and approval structure so Notion supports a repeatable operating system instead of becoming a passive wiki."
      },
      {
        step: "Step 8",
        title: "Add team review and documentation ownership",
        detail: "Assign clear owners for SOP quality, project templates, and knowledge hygiene so the system stays useful as the team grows."
      }
    ];

    return toImplementationModule(
      tool,
      "Exact Module",
      "Notion workspace setup",
      plan.isScaleBlueprint
        ? "Notion should become a maintained internal operating layer with templates, ownership, and review cadence."
        : "Notion should start as one structured workspace for the first important knowledge or delivery workflow.",
      appendScaleImplementationSteps(baseSteps, scaleSteps, plan),
      plan.isScaleBlueprint
        ? [
            "Use one owner per critical workspace area.",
            "Good templates matter more than more pages.",
            "Review and archive continuously."
          ]
        : [
            "Build one clean system, not five partial ones.",
            "Templates create adoption.",
            "Weekly cleanup keeps Notion useful."
          ]
    );
  }

  function buildCanvaImplementationModule(plan, tool) {
    const { firstWorkflow, owner } = getImplementationFocusContext(plan);
    const baseSteps = [
      {
        step: "Step 1",
        title: "Set the brand kit first",
        detail: "Before the team starts generating assets, define the colors, fonts, logos, and approved visual rules so Canva outputs stay on-brand."
      },
      {
        step: "Step 2",
        title: "Build a small template library",
        detail: `Create 3 to 5 templates for the actual workflow tied to "${firstWorkflow}" such as social graphics, client deliverables, promo assets, or one-page visuals.`
      },
      {
        step: "Step 3",
        title: "Create prompt and style rules for AI output",
        detail: "Document what kinds of visuals, copy tone, and layout styles the team should request so AI output feels usable instead of random."
      },
      {
        step: "Step 4",
        title: "Organize folders before volume increases",
        detail: "Set folders for campaigns, clients, or content themes so designs can be found and reused later."
      },
      {
        step: "Step 5",
        title: "Set a simple approval path",
        detail: `Make ${owner} or the named reviewer the person who approves templates and final assets before more people start using the tool heavily.`
      },
      {
        step: "Step 6",
        title: "Run one real content sprint",
        detail: "Use Canva for a single week or campaign batch, then review which templates, prompts, and asset types actually saved time."
      }
    ];

    const scaleSteps = [
      {
        step: "Step 7",
        title: "Turn templates into a repeatable production lane",
        detail: "Scale Blueprint should turn Canva into a reusable design system for ongoing campaigns, not just a one-off design tool."
      },
      {
        step: "Step 8",
        title: "Add role clarity for design and approval",
        detail: "Decide who creates, who reviews, and who publishes so content speed does not come at the cost of visual quality."
      }
    ];

    return toImplementationModule(
      tool,
      "Exact Module",
      "Canva content production setup",
      plan.isScaleBlueprint
        ? "Canva should become a reusable content system with brand rules, templates, and publishing ownership."
        : "Canva should start as a small template and brand system tied to one real content workflow.",
      appendScaleImplementationSteps(baseSteps, scaleSteps, plan),
      plan.isScaleBlueprint
        ? [
            "Templates reduce chaos faster than more one-off designs.",
            "Approval rules matter when more people use the tool.",
            "Keep the visual system simple enough to repeat."
          ]
        : [
            "Set the brand before the prompts.",
            "Templates create speed.",
            "Measure output volume and edit time, not just design variety."
          ]
    );
  }

  function buildShopifyMagicImplementationModule(plan, tool) {
    const { firstWorkflow, owner } = getImplementationFocusContext(plan);
    const baseSteps = [
      {
        step: "Step 1",
        title: "Choose the store jobs Shopify Magic will handle first",
        detail: `Use Shopify Magic for one narrow store layer first: product copy, customer-facing drafts, FAQ support, or campaign content tied to "${firstWorkflow}".`
      },
      {
        step: "Step 2",
        title: "Document voice rules and banned claims",
        detail: "Write simple tone, offer, and product-claim rules so generated store content stays on-brand and does not create risky promises."
      },
      {
        step: "Step 3",
        title: "Pilot on a small product or content set",
        detail: "Apply Shopify Magic to a limited set of SKUs, FAQs, or campaign assets before pushing it across the whole catalog."
      },
      {
        step: "Step 4",
        title: "Review generated output with merchandising in mind",
        detail: "Check whether the outputs actually improve clarity, search visibility, and customer understanding instead of just sounding longer."
      },
      {
        step: "Step 5",
        title: "Set one owner for ongoing review",
        detail: `Make ${owner} or the ecommerce owner responsible for checking copy quality, consistency, and where Magic should or should not be used.`
      },
      {
        step: "Step 6",
        title: "Expand by collection or content type",
        detail: "Once the first test works, roll it out by product family, FAQ area, or campaign type instead of changing the whole storefront at once."
      }
    ];

    const scaleSteps = [
      {
        step: "Step 7",
        title: "Connect Magic to the merchandising review cycle",
        detail: "Scale Blueprint should tie generated product and support content to a recurring review rhythm so conversion, support, and SEO insights are used together."
      },
      {
        step: "Step 8",
        title: "Decide what stays human-led",
        detail: "Keep final merchandising strategy, promotional claims, and high-impact customer messaging human-owned even if Magic drafts the first pass."
      }
    ];

    return toImplementationModule(
      tool,
      "Exact Module",
      "Shopify Magic store rollout",
      plan.isScaleBlueprint
        ? "Shopify Magic should support a store content and merchandising system with review cadence and clear boundaries."
        : "Shopify Magic works best when rolled out on a narrow store content job before it touches the whole catalog.",
      appendScaleImplementationSteps(baseSteps, scaleSteps, plan),
      plan.isScaleBlueprint
        ? [
            "Review product claims carefully.",
            "Scale by collection, not by full-catalog guesswork.",
            "Keep merchandising decisions human-led."
          ]
        : [
            "Test on a small SKU set first.",
            "Voice rules matter before rollout.",
            "Measure support and conversion impact, not just writing speed."
          ]
    );
  }

  function buildSidekickImplementationModule(plan, tool) {
    const { owner, platforms } = getImplementationFocusContext(plan);
    const baseSteps = [
      {
        step: "Step 1",
        title: "Define the approved Sidekick questions first",
        detail: "Decide what Sidekick should help with inside Shopify admin: store analysis, product content suggestions, basic operational questions, or merchandising support."
      },
      {
        step: "Step 2",
        title: "Clean the store data it will rely on",
        detail: "Before leaning on Sidekick, make sure products, collections, orders, and store settings are clean enough that the answers are useful."
      },
      {
        step: "Step 3",
        title: "Document what Sidekick can suggest vs. what humans approve",
        detail: "Use Sidekick for analysis and draft support first, not for unreviewed store changes or strategic decisions."
      },
      {
        step: "Step 4",
        title: "Create a small store-ops review loop",
        detail: `Have ${owner} or the ecommerce owner log the most useful Sidekick prompts, questions, and recommendations so the team learns what is actually worth repeating.`
      },
      {
        step: "Step 5",
        title: "Use it in one operating rhythm first",
        detail: `Tie Sidekick to one routine like weekly store review, product copy cleanup, or ops planning instead of treating it like a general chat companion.`
      },
      {
        step: "Step 6",
        title: "Expand only when the store team trusts the outputs",
        detail: `Once the first admin use case is proven, expand Sidekick into more store management questions across ${platforms} and adjacent workflows.`
      }
    ];

    const scaleSteps = [
      {
        step: "Step 7",
        title: "Use Sidekick as an ops decision-support layer",
        detail: "In Scale Blueprint, Sidekick should support recurring store review, merchandising meetings, and internal operating questions with a clear owner."
      },
      {
        step: "Step 8",
        title: "Tie it to KPI review and change control",
        detail: "Use Sidekick outputs as inputs to the review process, but keep actual store changes and high-impact decisions inside the human approval path."
      }
    ];

    return toImplementationModule(
      tool,
      "Exact Module",
      "Sidekick store-ops setup",
      plan.isScaleBlueprint
        ? "Sidekick should become a structured store-ops support layer with review ownership and KPI context."
        : "Sidekick works best when the business defines a narrow set of useful admin questions and repeatable prompts first.",
      appendScaleImplementationSteps(baseSteps, scaleSteps, plan),
      plan.isScaleBlueprint
        ? [
            "Use Sidekick to inform decisions, not silently make them.",
            "Store review cadence matters more than extra prompts.",
            "Keep major store changes inside human approval."
          ]
        : [
            "Start with one admin use case.",
            "Clean store data improves output quality.",
            "Save the prompts that actually help the team."
          ]
    );
  }

  function getToolImplementationCandidates(plan) {
    const candidates = [];
    const seen = new Set();

    function addTools(tools, tierLabel) {
      (tools || []).forEach((tool) => {
        if (!tool || seen.has(tool.name)) {
          return;
        }
        seen.add(tool.name);
        candidates.push({ ...tool, tierLabel });
      });
    }

    addTools(plan.tiers.starter.tools, "Starter Stack");
    addTools(plan.tiers.growth.tools, "Growth Blueprint");

    if (plan.isScaleBlueprint) {
      addTools(plan.tiers.advanced.tools, "Scale Blueprint");
    }

    return candidates;
  }

  function getFrameworkImplementationFocus(tool, plan) {
    const { firstWorkflow, owner, platforms } = getImplementationFocusContext(plan);

    switch (tool.category) {
      case "CRM":
      case "Support":
      case "Voice / Phone AI":
      case "Finance":
      case "Scheduling":
      case "Recruiting / HR":
        return {
          summary: `${tool.name} should be implemented around one owned business workflow with clean fields, routing, review rules, and a simple KPI check.`,
          configure: `Map the fields, routing, owner, and next-step logic the tool needs to support "${firstWorkflow}" before turning on more features.`,
          pilot: "Run the tool on a limited set of real cases and check whether the workflow gets cleaner, faster, or more consistent.",
          scale: `Once the core process is stable, expand handoffs and automation carefully across ${platforms}.`
        };
      case "Automation":
      case "Project Ops":
        return {
          summary: `${tool.name} should be set up as a controlled systems layer with clear ownership, documentation, and fallback handling.`,
          configure: "Document the trigger, destination, owner, and fallback path before connecting anything live.",
          pilot: "Test the first automation or ops workflow on a handful of real examples and log errors, duplicates, and approval needs.",
          scale: "Add more steps only after the first path is stable and someone clearly owns changes."
        };
      case "Content Studio":
      case "Design":
      case "Ecommerce Personalization":
        return {
          summary: `${tool.name} should be rolled out with brand rules, templates, and a simple approval path so output stays usable and on-brand.`,
          configure: "Set the style rules, template structure, and first asset types before the team starts generating at volume.",
          pilot: "Run one content or merchandising sprint and review what actually reduces production time or improves customer clarity.",
          scale: "Expand into more campaigns or storefront areas only after the first content lane is working consistently."
        };
      case "Core Assistant":
      case "Research":
      case "Workspace":
      default:
        return {
          summary: `${tool.name} should start as a narrow support layer for one approved workflow before the business treats it like a general-purpose AI system.`,
          configure: "Define the specific job, source materials, approved prompts, and output format the tool should follow first.",
          pilot: "Use the tool on 5 to 10 real examples with human review and keep only the prompts and outputs that clearly improve speed or quality.",
          scale: `Once ${owner} can see repeatable value, expand the tool into the next workflow instead of adding several new AI tools at once.`
        };
    }
  }

  function buildFrameworkImplementationModule(plan, tool) {
    const { firstWorkflow, owner } = getImplementationFocusContext(plan);
    const focus = getFrameworkImplementationFocus(tool, plan);
    const baseSteps = [
      {
        step: "Step 1",
        title: `Define ${tool.name}'s exact job in the stack`,
        detail: `Make ${tool.name} responsible for one narrow business job tied to "${firstWorkflow}" instead of several vague jobs at once.`
      },
      {
        step: "Step 2",
        title: "Set account access, permissions, and ownership",
        detail: `Assign ${owner} or the named workflow owner, confirm who needs access, and avoid turning the tool on for the whole team before the first use case is proven.`
      },
      {
        step: "Step 3",
        title: "Configure the first working layer",
        detail: focus.configure
      },
      {
        step: "Step 4",
        title: "Pilot with human review",
        detail: focus.pilot
      },
      {
        step: "Step 5",
        title: "Measure one success signal",
        detail: `Use ${plan.measurementPlan.primaryMetric.toLowerCase()} or another simple workflow metric to judge whether ${tool.name} is really helping.`
      },
      {
        step: "Step 6",
        title: "Keep, cut, or expand based on usage",
        detail: `If ${tool.name} is not improving the first workflow, tighten it or remove it before the business adds more AI layers.`
      }
    ];

    const scaleSteps = [
      {
        step: "Step 7",
        title: "Add governance for the next operating layer",
        detail: focus.scale
      }
    ];

    return toImplementationModule(
      tool,
      "Framework Module",
      `${tool.name} implementation framework`,
      focus.summary,
      appendScaleImplementationSteps(baseSteps, scaleSteps, plan),
      plan.isScaleBlueprint
        ? [
            "Assign one clear owner before scaling usage.",
            "Connect it to one KPI and one review cadence.",
            "Expand only after the first workflow is stable."
          ]
        : [
            "Start narrow.",
            "Pilot on real work.",
            "Keep only what actually saves time or improves quality."
          ]
    );
  }

  function buildToolImplementationModules(plan) {
    const candidates = getToolImplementationCandidates(plan);

    if (candidates.length === 0) {
      return null;
    }

    const exactCandidates = candidates.filter((tool) => EXACT_IMPLEMENTATION_TOOL_BUILDERS[tool.name]);
    const frameworkCandidates = candidates.filter((tool) => !EXACT_IMPLEMENTATION_TOOL_BUILDERS[tool.name]);
    const targetCount = plan.isScaleBlueprint ? 4 : 3;
    const selected = [];

    if (frameworkCandidates.length > 0) {
      const preferredExactCount = Math.max(0, targetCount - 1);
      selected.push(...exactCandidates.slice(0, preferredExactCount));
      selected.push(frameworkCandidates[0]);
    } else {
      selected.push(...exactCandidates.slice(0, targetCount));
    }

    if (selected.length < targetCount) {
      const remainingCandidates = [...exactCandidates, ...frameworkCandidates]
        .filter((tool) => !selected.some((selectedTool) => selectedTool.name === tool.name));
      selected.push(...remainingCandidates.slice(0, targetCount - selected.length));
    }

    const modules = selected
      .map((tool) => {
        const exactBuilder = EXACT_IMPLEMENTATION_TOOL_BUILDERS[tool.name];
        return exactBuilder ? exactBuilder(plan, tool) : buildFrameworkImplementationModule(plan, tool);
      })
      .filter(Boolean);

    return {
      summary: "These implementation modules focus on the highest-leverage tools in this stack. Exact playbooks are included for the top 8 priority tools, and the rest use the same structured rollout framework so the report stays useful without turning into a giant setup manual.",
      modules,
      omittedCount: Math.max(0, candidates.length - modules.length)
    };
  }

  function getCurrentToolMatches(currentTools) {
    const haystack = normalizeWhitespace(currentTools).toLowerCase();
    if (!haystack) {
      return [];
    }

    return data.TOOLS.filter((toolConfig) => haystack.includes(toolConfig.name.toLowerCase())).slice(0, 10);
  }

  function buildReplaceVsAdd(plan) {
    const currentMatches = getCurrentToolMatches(plan.intake.currentTools);
    const starterNames = new Set(plan.tiers.starter.tools.map((tool) => tool.name));
    const starterCategories = new Set(plan.tiers.starter.tools.map((tool) => tool.category));
    const sameTools = currentMatches.filter((toolConfig) => starterNames.has(toolConfig.name));
    const sameCategoryTools = currentMatches.filter((toolConfig) => starterCategories.has(toolConfig.category) && !starterNames.has(toolConfig.name));
    const manualReplacementMap = {
      "Lead Follow-Up": "manual inbox follow-up and spreadsheet tracking",
      "Content Creation": "manual repurposing and one-off drafting",
      "Admin Work": "copy-paste cleanup and repeated admin handoffs",
      Meetings: "manual recap writing and task cleanup",
      Research: "manual source gathering before drafting",
      "Customer Support": "repeat reply writing and triage cleanup",
      "Internal Docs": "scattered notes and ad hoc internal answers",
      Scheduling: "manual appointment routing and callback reminders"
    };
    const manualReplacement = manualReplacementMap[plan.state.primaryBottleneck] || "manual workflow cleanup";

    if (!plan.intake.currentTools) {
      return {
        headline: "Mostly a new add-on subscription at first",
        summary: "Treat the starter stack as a focused add-on layer first. Do not rip out core systems until the workflow is clearly earning its place.",
        addNow: `Add the starter tools to improve ${plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText}.`,
        replaceLater: `If the starter layer works, it can replace ${manualReplacement} before it replaces major software.`,
        watch: "Avoid paying for overlapping assistants or automation tools before someone owns the workflow."
      };
    }

    if (sameTools.length > 0) {
      return {
        headline: "Partly a better use of subscriptions the business already has",
        summary: `The current stack already includes ${formatNaturalList(sameTools.map((toolConfig) => toolConfig.name))}, so the biggest win may come from using those tools more deliberately before adding much more software.`,
        addNow: "Use the paid plan to tighten the workflow and prompts around the tools already in place.",
        replaceLater: "Only add new categories after the current subscription is clearly missing something important.",
        watch: "Do not pay twice for the same assistant or workspace layer if the existing tool can cover the job."
      };
    }

    if (sameCategoryTools.length > 0) {
      return {
        headline: "There is likely some consolidation opportunity",
        summary: `The business already uses ${formatNaturalList(sameCategoryTools.map((toolConfig) => toolConfig.name))}, which overlaps with the starter categories recommended here.`,
        addNow: "Add only the starter tools that fix the first workflow immediately.",
        replaceLater: "Review overlapping categories after 30 days and cut whichever layer is not earning its keep.",
        watch: "Keep both tools briefly if needed, but do not let category overlap become permanent subscription drift."
      };
    }

    return {
      headline: "Likely a focused add-on first, not a rip-and-replace",
      summary: `Because the current stack is ${plan.intake.currentTools}, the starter layer should act like a focused improvement on top of what already exists.`,
      addNow: "Use the starter stack to solve the first bottleneck without trying to redesign every system at once.",
      replaceLater: `Replace ${manualReplacement} first, then review whether a current subscription can be removed cleanly.`,
      watch: "The first 30 days should reduce overlap, not create new tool sprawl."
    };
  }

  function buildWorkflowRiskReview(plan) {
    const highControl = plan.state.complianceSensitivity === "High" || plan.intakeSignals.usesHealthcareSystems || ["Legal", "Medical/Dental"].includes(plan.state.businessType);
    const riskByBottleneck = {
      "Lead Follow-Up": {
        low: {
          title: "Lead summaries and call prep",
          copy: "Use AI first for summarizing inquiries, organizing notes, and preparing the next step before anything is sent externally."
        },
        medium: {
          title: "External follow-up drafts with review",
          copy: "AI can draft replies and estimate follow-up, but a human should check pricing, promises, and tone before sending."
        },
        high: {
          title: "Autonomous quoting or sending",
          copy: "Do not let AI send quotes, make commitments, or close follow-up loops on its own until the workflow is proven and clearly controlled."
        }
      },
      "Customer Support": {
        low: {
          title: "Triage, tagging, and FAQ drafts",
          copy: "Start with repeat questions, internal routing, and first-draft answers that save the team time."
        },
        medium: {
          title: "Customer replies with review",
          copy: "Use AI to draft responses, but keep a human in the loop for escalations, refunds, or unhappy customers."
        },
        high: {
          title: "Autonomous support decisions",
          copy: "Avoid letting AI approve exceptions, credits, or sensitive customer decisions without guardrails and review."
        }
      },
      "Content Creation": {
        low: {
          title: "Ideas, transcripts, and draft assets",
          copy: "Use AI for ideation, repurposing, and first drafts where speed matters more than final polish."
        },
        medium: {
          title: "Published content with human review",
          copy: "A person should still check claims, offers, tone, and final formatting before anything goes live."
        },
        high: {
          title: "Offer claims or regulated statements",
          copy: "Keep legal, medical, compliance, and hard-performance claims tightly human-controlled even if AI helps draft them."
        }
      },
      Meetings: {
        low: {
          title: "Recaps and action-item drafts",
          copy: "Meeting notes, summaries, and task lists are usually the safest fast win."
        },
        medium: {
          title: "Client follow-up based on meeting notes",
          copy: "A human should review AI-drafted follow-ups before they go out, especially when commitments or deadlines are involved."
        },
        high: {
          title: "Workflow changes based only on AI notes",
          copy: "Do not let AI rewrite scope, approvals, or delivery plans without someone checking the source conversation."
        }
      }
    };

    const preset = riskByBottleneck[plan.state.primaryBottleneck] || {
      low: {
        title: "Internal summaries and drafts",
        copy: "Start with internal work where AI can save time without directly affecting customers."
      },
      medium: {
        title: "Customer-facing drafts with review",
        copy: "Use AI for draft support, but keep a human check before anything important is sent out."
      },
      high: {
        title: "Autonomous decisions or sensitive outputs",
        copy: "Avoid giving AI full control over approvals, commitments, or regulated work until the workflow is tightly governed."
      }
    };

    return [
      {
        label: "Low Risk Now",
        title: preset.low.title,
        copy: preset.low.copy
      },
      {
        label: "Medium Risk With Review",
        title: preset.medium.title,
        copy: preset.medium.copy
      },
      {
        label: highControl ? "High Risk / Keep Human-Controlled" : "Higher Risk Later",
        title: preset.high.title,
        copy: highControl
          ? `${preset.high.copy} In this business context, anything regulated, high-trust, or customer-impacting should stay human-approved.`
          : preset.high.copy
      }
    ];
  }

  function buildScaleOperatingLayer(plan) {
    const firstWorkflow = plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText;
    const owner = plan.implementationReality.owner || plan.intake.implementationOwner || "Owner / founder";
    const platformList = formatNaturalList(plan.state.integrationPlatform.slice(0, 4)) || "your core systems";
    const growthNames = formatNaturalList(plan.tiers.growth.additions.slice(0, 3).map((toolConfig) => toolConfig.name))
      || formatNaturalList(plan.tiers.growth.tools.slice(0, 3).map((toolConfig) => toolConfig.name))
      || "the growth layer";
    const advancedNames = formatNaturalList(plan.tiers.advanced.additions.slice(0, 3).map((toolConfig) => toolConfig.name))
      || formatNaturalList(plan.tiers.advanced.tools.slice(0, 3).map((toolConfig) => toolConfig.name))
      || "the scale layer";
    const highestRisk = plan.workflowRiskReview[plan.workflowRiskReview.length - 1];

    return {
      summary: "Scale Blueprint adds the operating layer after the stack is chosen: who owns it, what gets automated, what stays reviewed, and what gates the next upgrade.",
      cards: [
        {
          label: "Ownership Map",
          title: `${owner} owns the weekly system review`,
          copy: `Scale Blueprint makes ${firstWorkflow} more durable by giving the workflow an owner, a review rhythm, and a clear rule for what gets tightened next.`,
          bullets: [
            `Primary owner: ${owner}.`,
            `Review cadence: ${plan.measurementPlan.reviewCadence}.`,
            `Primary KPI: ${plan.measurementPlan.primaryMetric}.`
          ]
        },
        {
          label: "Automation Layer",
          title: `Connect ${growthNames} without creating tool sprawl`,
          copy: `The next automation pass should only remove repeated handoffs across ${platformList}, not add more systems than the team can actually run.`,
          bullets: [
            `Start with one approval path around ${firstWorkflow}.`,
            "Automate repeated routing, summaries, and task handoff before expanding into broader orchestration.",
            `Delay ${advancedNames} until the first automation path is measured and stable.`
          ]
        },
        {
          label: "Guardrails",
          title: "Keep the stack scalable and reviewable",
          copy: "Scale should add control as well as speed. The report should make it obvious what can be automated, what still needs review, and what has not earned a subscription yet.",
          bullets: [
            plan.measurementPlan.scaleGate,
            highestRisk ? `Keep ${highestRisk.title.toLowerCase()} human-reviewed until the workflow is proven.` : "Keep higher-risk actions human-reviewed until the workflow is proven.",
            "Add the next layer only when ownership, prompts, and reporting are already clear."
          ]
        }
      ]
    };
  }

  function buildDeliveryEmail(plan) {
    const blueprintName = plan.blueprintTier || "Growth Blueprint";
    const bottleneckLabel = plan.state.primaryBottleneck !== "Any" ? plan.state.primaryBottleneck.toLowerCase() : "main operating bottleneck";
    const goalLabel = plan.state.mainGoal !== "Any" ? plan.state.mainGoal.toLowerCase() : "save time";
    const subject = `Your EasyAIStack ${blueprintName}`;
    const body = [
      `Hello ${plan.intake.businessName || "there"},`,
      "",
      `Your ${blueprintName} is ready.`,
      "",
      `This version is built around your ${bottleneckLabel}, a goal to ${goalLabel}, and the first workflow "${plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText}".`,
      "",
      plan.isScaleBlueprint
        ? "Start with the starter stack, then use the scale operating layer to add automation, ownership, and KPI tracking only where the workflow has already earned it."
        : "Start with the starter stack and the first workflow before adding the growth layer.",
      "",
      "If you want a more reviewed or custom version after this, reply to this email and we can scope the next step.",
      "",
      "Best,",
      "EasyAIStack"
    ].join("\n");

    return { subject, body };
  }

  function generatePlan(rawIntake) {
    const intake = normalizeIntake(rawIntake);
    const blueprintTier = normalizeBlueprintTier(intake.blueprintTier);
    const isScaleBlueprint = blueprintTier === "Scale Blueprint";
    const intakeSignals = getIntakeSignals(intake);
    const state = buildPlannerStateFromIntake(intake);
    const rankedEntries = applyIntakeSpecificBoosts(data.getRankedResultsForState(state), intake);
    const workingEntries = rankedEntries.length > 0 ? rankedEntries : data.getDefaultHomeResults();
    const entryMap = getToolEntryMap(workingEntries);
    const tierSet = data.getStackTierSet(workingEntries, state);
    const starterSummary = data.summarizeTierTools("starter", tierSet.starterTools, state);
    const growthSummary = data.summarizeTierTools("growth", tierSet.growthTools, state);
    const advancedSummary = data.summarizeTierTools("advanced", tierSet.advancedTools, state);
    const workflowIdeas = data.getPlanWorkflowIdeas(state, tierSet.starterTools, tierSet.growthTools, tierSet.advancedTools);
    const rolloutMilestones = data.getPlanRolloutMilestones(state, tierSet.starterTools, tierSet.growthTools, workflowIdeas);
    const pitfalls = data.getPlanPitfalls(state);
    const upgradePath = data.getPlanUpgradePath(tierSet.starterTools, tierSet.growthTools, tierSet.advancedTools);
    const allStackTools = [...tierSet.starterTools, ...tierSet.growthTools, ...tierSet.advancedTools]
      .filter((toolConfig, index, tools) => tools.findIndex((candidate) => candidate.name === toolConfig.name) === index);

    const tiers = {
      starter: buildTierDetails("starter", tierSet.starterTools, [], starterSummary, entryMap, intake),
      growth: buildTierDetails("growth", tierSet.growthTools, tierSet.starterTools, growthSummary, entryMap, intake),
      advanced: buildTierDetails("advanced", tierSet.advancedTools, tierSet.growthTools, advancedSummary, entryMap, intake)
    };

    const workflows = workflowIdeas.map((workflow, index) => buildWorkflowDetails(workflow, intake, allStackTools, index));
    const bottleneckLabel = state.primaryBottleneck !== "Any" ? state.primaryBottleneck.toLowerCase() : "the main operating bottleneck";
    const executiveSummary = isScaleBlueprint
      ? [
          `${intake.businessName || "This business"} is ready for a more systemized AI stack built around ${bottleneckLabel}, not just another round of tool selection.`,
          `The starter layer still begins with ${formatNaturalList(tiers.starter.tools.map((tool) => tool.name))}, but Scale Blueprint adds ownership, automation rules, and KPI tracking around ${intake.firstWorkflowToFix || starterSummary.workflowText}.`,
          `The next scale move is to connect ${formatNaturalList(tiers.growth.additions.map((toolConfig) => toolConfig.name)) || "the growth layer"} without adding ${formatNaturalList(tiers.advanced.additions.map((toolConfig) => toolConfig.name)) || "the advanced layer"} until the first workflow is stable and measurable.`
        ]
      : [
          `${intake.businessName || "This business"} should start with a lean AI stack focused on ${bottleneckLabel} instead of a broad software overhaul.`,
          `The best first move is to improve ${intake.firstWorkflowToFix || starterSummary.workflowText} using ${formatNaturalList(tiers.starter.tools.map((tool) => tool.name))}.`,
          `Once that workflow is stable, the growth layer can add ${formatNaturalList(tiers.growth.additions.map((toolConfig) => toolConfig.name)) || "the next layer"} without overbuilding the stack.`
        ];
    const quickWins = buildQuickWins({ intake, intakeSignals, state, tiers });
    const roiEstimate = buildRoiEstimate({ intake, state, tiers });
    const useCasePlaybooks = buildUseCasePlaybooks({ intake, intakeSignals, state, tiers });
    const automationFlows = buildAutomationFlows({ intake, intakeSignals, state, tiers });
    const pathOptions = buildPathOptions({ intake, state, tiers });
    const promptPack = buildPromptPack({ intake, state, tiers });
    const toolAlternatives = buildToolAlternatives({ rankedEntries: workingEntries, tiers, state }, entryMap);
    const ninetyDayPlan = buildNinetyDayPlan({ intake, state, tiers });
    const improvementScorecard = buildImprovementScorecard({ intake, intakeSignals, state, tiers, roiEstimate });
    const measurementPlan = buildMeasurementPlan({ intake, intakeSignals, state, tiers });
    const implementationReality = buildImplementationReality({ intake, intakeSignals, state, tiers });
    const buyPriority = buildBuyPriority({ intake, intakeSignals, state, tiers, isScaleBlueprint });
    const replaceVsAdd = buildReplaceVsAdd({ intake, intakeSignals, state, tiers });
    const notYetList = buildNotYetList({ intake, intakeSignals, state, tiers, isScaleBlueprint });
    const subscriptionWasteCheck = buildSubscriptionWasteCheck({ intake, intakeSignals, state, tiers });
    const firstWeekChecklist = buildFirstWeekChecklist({
      intake,
      intakeSignals,
      state,
      tiers,
      implementationReality,
      measurementPlan
    });
    const beforeAfterSnapshot = buildBeforeAfterSnapshot({ intake, intakeSignals, state, tiers, isScaleBlueprint });
    const workflowRiskReview = buildWorkflowRiskReview({ intake, intakeSignals, state, tiers });
    const scaleOperatingLayer = isScaleBlueprint
      ? buildScaleOperatingLayer({
          intake,
          intakeSignals,
          state,
          tiers,
          measurementPlan,
          implementationReality,
          workflowRiskReview
        })
      : null;
    const toolImplementationModules = buildToolImplementationModules({
      intake,
      intakeSignals,
      state,
      tiers,
      isScaleBlueprint,
      implementationReality,
      measurementPlan
    });

    const plan = {
      createdAt: getTodayLabel(),
      blueprintTier,
      isScaleBlueprint,
      intake,
      intakeSignals,
      state,
      warnings: buildWarnings(intake, state, intakeSignals),
      whyItFits: buildWhyItFits(intake, state, intakeSignals),
      rankedEntries: workingEntries,
      tiers,
      workflows,
      rolloutMilestones,
      ninetyDayPlan,
      improvementScorecard,
      quickWins,
      roiEstimate,
      measurementPlan,
      implementationReality,
      buyPriority,
      notYetList,
      subscriptionWasteCheck,
      firstWeekChecklist,
      beforeAfterSnapshot,
      toolImplementationModules,
      replaceVsAdd,
      workflowRiskReview,
      scaleOperatingLayer,
      useCasePlaybooks,
      automationFlows,
      pathOptions,
      promptPack,
      toolAlternatives,
      pitfalls,
      upgradePath,
      executiveSummary,
      deliveryEmail: null
    };

    plan.deliveryEmail = buildDeliveryEmail(plan);
    return plan;
  }

  function renderToolPill(tool) {
    return `
      <a class="tool-mini-pill" href="${data.escapeHtml(tool.detailUrl)}" style="--tool-pill-start:${data.escapeHtml(tool.colors.start)}; --tool-pill-end:${data.escapeHtml(tool.colors.end)};">
        ${data.escapeHtml(tool.name)}
        <small>${data.escapeHtml(tool.category)}</small>
      </a>
    `;
  }

  function renderReportTag(label, value) {
    return `<span class="tag"><strong>${data.escapeHtml(label)}:</strong> ${data.escapeHtml(value)}</span>`;
  }

  function getFlowParts(flow) {
    return String(flow || "")
      .split(/\s*->\s*/)
      .map((part) => part.trim())
      .filter(Boolean);
  }

  function renderStepFlow(flow) {
    const parts = getFlowParts(flow);
    if (parts.length === 0) {
      return "";
    }

    return `
      <div class="step-flow" role="list" aria-label="Flowchart">
        ${parts.map((part, index) => `
          <div class="step-flow-item" role="listitem">
            <div class="step-flow-card">
              <span class="step-flow-badge">Step ${index + 1}</span>
              <strong>${data.escapeHtml(part)}</strong>
            </div>
            ${index < parts.length - 1 ? `<span class="step-flow-arrow" aria-hidden="true">&rarr;</span>` : ""}
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderGeneratedPlan(plan) {
    const blueprintName = plan.blueprintTier || "Growth Blueprint";
    const blueprintTagline = plan.isScaleBlueprint
      ? "Built for businesses that now need automation, ownership, KPI tracking, and a stronger operating layer."
      : "Built for businesses that need the right next tools, purchase order, and rollout without overbuilding.";
    const stackSectionTitle = plan.isScaleBlueprint
      ? "Starter, growth, and scale operating layers"
      : "Starter, growth, and advanced layers";
    const ninetyDayTitle = plan.isScaleBlueprint
      ? "How to move from rollout into a repeatable operating system"
      : "How to move from setup to scale without losing focus";
    const coverLines = [
      plan.intake.businessAddress,
      plan.intake.businessPhone,
      plan.intake.businessWebsite
    ].filter(Boolean);
    const tableOfContents = [
      {
        key: "Executive Summary",
        title: "Executive Summary",
        detail: "What to do first and why this blueprint is pointing there."
      },
      plan.isScaleBlueprint
        ? {
            key: "Scale Operating Layer",
            title: "Scale Operating Layer",
            detail: "What Scale adds beyond simple tool selection."
          }
        : null,
      {
        key: "Quick Wins",
        title: "Quick Wins",
        detail: "Three actions to move on immediately."
      },
      {
        key: "ROI Snapshot",
        title: "ROI Snapshot",
        detail: "Why the stack should feel worth it quickly."
      },
      {
        key: "Measurement + Pilot",
        title: "Measurement + Pilot",
        detail: "How to test the stack and measure progress fast."
      },
      {
        key: "Improvement Score",
        title: "Improvement Score",
        detail: "How the business should improve if rollout goes well."
      },
      {
        key: "Recommended Stack",
        title: "Recommended Stack",
        detail: "The starter, growth, and advanced or scale layers."
      },
      {
        key: "Buying Order",
        title: "Buying Order",
        detail: "What to buy first, next, and later."
      },
      {
        key: "What Not To Buy Yet",
        title: "What Not To Buy Yet",
        detail: "Where to hold back before adding more spend."
      },
      {
        key: "Budget Map",
        title: "Budget Map",
        detail: "How the spend should phase in across the stack."
      },
      {
        key: "Implementation Reality",
        title: "Implementation Reality",
        detail: "Who should own setup and where the work really sits."
      },
      plan.toolImplementationModules
        ? {
            key: "Tool Implementation Modules",
            title: "Tool Implementation Modules",
            detail: "Step-by-step setup guidance for the highest-leverage tools."
          }
        : null,
      {
        key: "First 3 Workflows",
        title: "First 3 Workflows",
        detail: "The first practical workflows to bring online."
      },
      {
        key: "Automation Flows",
        title: "Automation Flows",
        detail: "How work should move between steps and tools."
      },
      {
        key: "Prompt Pack",
        title: "Prompt Pack",
        detail: "Prompts the team can use right away."
      },
      {
        key: "90-Day Action Plan",
        title: "90-Day Action Plan",
        detail: "The next 90 days of rollout and refinement."
      },
      {
        key: "Fit and Risks",
        title: "Fit and Risks",
        detail: "Why this stack fits and what to watch carefully."
      }
    ].filter(Boolean);

    return `
      <article class="fulfillment-plan-shell">
        <header class="fulfillment-plan-cover">
          <div class="fulfillment-plan-cover-main">
            <p class="eyebrow">EasyAIStack ${data.escapeHtml(blueprintName)}</p>
            <h2>${data.escapeHtml(blueprintName)} for ${data.escapeHtml(plan.intake.businessName || "This Business")}</h2>
            <p class="summary-copy">Prepared by EasyAIStack on ${data.escapeHtml(plan.createdAt)}.</p>
            <p class="summary-copy">${data.escapeHtml(blueprintTagline)}</p>
            ${coverLines.length > 0
              ? `<p class="summary-copy fulfillment-plan-cover-lines">${coverLines.map((line) => data.escapeHtml(line)).join("<br>")}</p>`
              : ""}
          </div>

          <aside class="tool-detail-card fulfillment-plan-cover-card">
            <p class="eyebrow">Prepared For</p>
            <ul class="paid-plan-list">
              <li><strong>Business Type:</strong> ${data.escapeHtml(plan.state.businessType)}</li>
              <li><strong>Team Size:</strong> ${data.escapeHtml(plan.state.teamSize)}</li>
              <li><strong>Main Bottleneck:</strong> ${data.escapeHtml(plan.state.primaryBottleneck)}</li>
              <li><strong>Main Goal:</strong> ${data.escapeHtml(plan.state.mainGoal)}</li>
              <li><strong>Budget:</strong> ${data.escapeHtml(plan.state.monthlyBudget)}</li>
              ${plan.intakeSignals.specialFocus && plan.intakeSignals.specialFocus !== "Any" && plan.intakeSignals.specialFocus !== "General Small Business"
                ? `<li><strong>Special Focus:</strong> ${data.escapeHtml(plan.intakeSignals.specialFocus)}</li>`
                : ""}
              <li><strong>Implementation Owner:</strong> ${data.escapeHtml(plan.intake.implementationOwner || "Owner / founder")}</li>
            </ul>
          </aside>
        </header>

        <div class="tag-grid fulfillment-tag-grid">
          <span class="tag"><strong>Blueprint:</strong> ${data.escapeHtml(blueprintName)}</span>
          <span class="tag"><strong>First Workflow:</strong> ${data.escapeHtml(plan.intake.firstWorkflowToFix || plan.tiers.starter.summary.workflowText)}</span>
          ${plan.state.integrationPlatform.length > 0 ? `<span class="tag"><strong>Platforms:</strong> ${data.escapeHtml(formatNaturalList(plan.state.integrationPlatform))}</span>` : ""}
          ${plan.intake.currentTools ? `<span class="tag"><strong>Current Tools:</strong> ${data.escapeHtml(plan.intake.currentTools)}</span>` : ""}
          ${plan.intakeSignals.phoneSupportPriority && plan.intakeSignals.phoneSupportPriority !== "Any" && plan.intakeSignals.phoneSupportPriority !== "Not Important"
            ? `<span class="tag"><strong>Phone Support:</strong> ${data.escapeHtml(plan.intakeSignals.phoneSupportPriority)}</span>`
            : ""}
          ${plan.intakeSignals.securityAiNeed && plan.intakeSignals.securityAiNeed !== "Any" && plan.intakeSignals.securityAiNeed !== "Not Important"
            ? `<span class="tag"><strong>Security Need:</strong> ${data.escapeHtml(plan.intakeSignals.securityAiNeed)}</span>`
            : ""}
          ${plan.intakeSignals.usesShopify ? `<span class="tag"><strong>Existing System:</strong> Shopify</span>` : ""}
          ${plan.intakeSignals.usesOracle ? `<span class="tag"><strong>Existing System:</strong> Oracle</span>` : ""}
          ${plan.intakeSignals.usesHealthcareSystems ? `<span class="tag"><strong>Existing System:</strong> Healthcare systems</span>` : ""}
        </div>

        <section class="results-panel standalone-panel fulfillment-print-panel report-toc">
          <div class="results-header">
            <div>
              <p class="eyebrow">Table of Contents</p>
              <h3>What is inside this blueprint</h3>
            </div>
          </div>
          <p class="summary-copy">Use this as a quick guide to the pages and sections inside the report.</p>
          <div class="report-toc-grid">
            ${tableOfContents.map((entry, index) => `
              <div class="report-toc-row" data-toc-key="${data.escapeHtml(entry.key)}">
                <div class="report-toc-copy">
                  <strong>${data.escapeHtml(entry.title)}</strong>
                  <small>${data.escapeHtml(entry.detail)}</small>
                </div>
                <span class="report-toc-page-number">Section ${index + 1}</span>
              </div>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Executive Summary</p>
              <h3>What to do first</h3>
            </div>
          </div>
          <div class="results-list">
            <article class="plant-card compact-card">
              <div class="plant-copy">
                ${plan.executiveSummary.map((paragraph) => `<p class="summary-copy">${data.escapeHtml(paragraph)}</p>`).join("")}
              </div>
            </article>
          </div>
        </section>

        ${plan.isScaleBlueprint && plan.scaleOperatingLayer
          ? `
            <section class="results-panel standalone-panel fulfillment-print-panel">
              <div class="results-header">
                <div>
                  <p class="eyebrow">Scale Operating Layer</p>
                  <h3>What Scale Blueprint adds beyond tool selection</h3>
                </div>
              </div>
              <p class="summary-copy">${data.escapeHtml(plan.scaleOperatingLayer.summary)}</p>
              <div class="action-card-grid">
                ${plan.scaleOperatingLayer.cards.map((card) => `
                  <article class="paid-plan-section-card">
                    <span class="paid-plan-section-label">${data.escapeHtml(card.label)}</span>
                    <h4>${data.escapeHtml(card.title)}</h4>
                    <p class="summary-copy">${data.escapeHtml(card.copy)}</p>
                    <ul class="paid-plan-list">
                      ${card.bullets.map((bullet) => `<li>${data.escapeHtml(bullet)}</li>`).join("")}
                    </ul>
                  </article>
                `).join("")}
              </div>
            </section>
          `
          : ""}

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Quick Wins</p>
              <h3>Three things to do in the next 24 hours</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.quickWins.map((item) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">Fast win</span>
                <h4>${data.escapeHtml(item.title)}</h4>
                <p class="summary-copy">${data.escapeHtml(item.detail)}</p>
                <p class="paid-plan-note"><strong>Why it matters:</strong> ${data.escapeHtml(item.outcome)}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">ROI Snapshot</p>
              <h3>Why this stack should feel worth it</h3>
            </div>
          </div>
          <div class="action-card-grid">
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Time Saved</span>
              <h4>${data.escapeHtml(plan.roiEstimate.timeSaved)}</h4>
              <p class="summary-copy">Expected weekly time savings after the first workflow is live and the starter stack is actually being used.</p>
            </article>
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Capacity Value</span>
              <h4>${data.escapeHtml(plan.roiEstimate.costSavings)}</h4>
              <p class="summary-copy">A rough monthly value estimate based on reclaimed hours for this business type and team size.</p>
            </article>
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Revenue Potential</span>
              <h4>Practical upside</h4>
              <p class="summary-copy">${data.escapeHtml(plan.roiEstimate.revenuePotential)}</p>
            </article>
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Payback Lens</span>
              <h4>Low bar to win</h4>
              <p class="summary-copy">${data.escapeHtml(plan.roiEstimate.payback)}</p>
            </article>
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Measurement + Pilot</p>
              <h3>How to tell if this is working fast enough</h3>
            </div>
          </div>
          <div class="action-card-grid">
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Time To Measure</span>
              <h4>${data.escapeHtml(plan.measurementPlan.timeToSignal)}</h4>
              <p class="summary-copy"><strong>Primary metric:</strong> ${data.escapeHtml(plan.measurementPlan.primaryMetric)}</p>
              <p class="paid-plan-note"><strong>Review cadence:</strong> ${data.escapeHtml(plan.measurementPlan.reviewCadence)}</p>
            </article>
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Success Signal</span>
              <h4>${data.escapeHtml(plan.measurementPlan.secondaryMetric)}</h4>
              <p class="summary-copy">${data.escapeHtml(plan.measurementPlan.successLooksLike)}</p>
              <p class="paid-plan-note"><strong>Scale gate:</strong> ${data.escapeHtml(plan.measurementPlan.scaleGate)}</p>
            </article>
          </div>
          <article class="paid-plan-section-card paid-plan-section-card-wide">
            <span class="paid-plan-section-label">Pilot Path</span>
            <h4>Run a lean proof-of-value test before buying more</h4>
            <ul class="paid-plan-list">
              ${plan.measurementPlan.pilotSteps.map((step) => `<li>${data.escapeHtml(step)}</li>`).join("")}
            </ul>
          </article>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Improvement Score</p>
              <h3>Business improvement scorecard</h3>
            </div>
          </div>
          <div class="action-card-grid">
            <article class="paid-plan-section-card scorecard-overall-card">
              <span class="paid-plan-section-label">Overall Score</span>
              <div class="scorecard-overall-value">${data.escapeHtml(String(plan.improvementScorecard.overall))}</div>
              <p class="scorecard-overall-label">${data.escapeHtml(plan.improvementScorecard.label)}</p>
              <p class="summary-copy">${data.escapeHtml(plan.improvementScorecard.summary)}</p>
            </article>

            <article class="paid-plan-section-card scorecard-detail-card">
              <span class="paid-plan-section-label">Score Breakdown</span>
              <div class="scorecard-list">
                ${plan.improvementScorecard.metrics.map((metric) => `
                  <div class="scorecard-row">
                    <div class="scorecard-row-top">
                      <strong>${data.escapeHtml(metric.label)}</strong>
                      <span>${data.escapeHtml(String(metric.score))}/100</span>
                    </div>
                    <div class="scorecard-bar">
                      <span class="scorecard-bar-fill" style="width:${data.escapeHtml(String(metric.score))}%"></span>
                    </div>
                    <p class="paid-plan-note">${data.escapeHtml(metric.reason)}</p>
                  </div>
                `).join("")}
              </div>
            </article>
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Beginner vs Advanced</p>
              <h3>How to start lean and scale later</h3>
            </div>
          </div>
          <div class="action-card-grid">
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Start Here</span>
              <h4>${data.escapeHtml(plan.pathOptions.simple.title)}</h4>
              <p class="summary-copy">${data.escapeHtml(plan.pathOptions.simple.description)}</p>
              <ul class="paid-plan-list">
                ${plan.pathOptions.simple.bullets.map((item) => `<li>${data.escapeHtml(item)}</li>`).join("")}
              </ul>
            </article>
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Scale Later</span>
              <h4>${data.escapeHtml(plan.pathOptions.advanced.title)}</h4>
              <p class="summary-copy">${data.escapeHtml(plan.pathOptions.advanced.description)}</p>
              <ul class="paid-plan-list">
                ${plan.pathOptions.advanced.bullets.map((item) => `<li>${data.escapeHtml(item)}</li>`).join("")}
              </ul>
            </article>
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Use Case Playbooks</p>
              <h3>What this stack actually helps the business do</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.useCasePlaybooks.map((playbook) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">Playbook</span>
                <h4>${data.escapeHtml(playbook.title)}</h4>
                <p class="summary-copy">${data.escapeHtml(playbook.result)}</p>
                <ul class="paid-plan-list">
                  ${playbook.steps.map((step) => `<li>${data.escapeHtml(step)}</li>`).join("")}
                </ul>
                ${playbook.tools.length > 0
                  ? `<div class="stack-tool-list">${playbook.tools.map((tool) => renderToolPill(tool)).join("")}</div>`
                  : ""}
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Recommended Stack</p>
              <h3>${data.escapeHtml(stackSectionTitle)}</h3>
            </div>
          </div>
          <div class="stack-tier-grid">
            ${["starter", "growth", "advanced"].map((tierName) => {
              const tier = plan.tiers[tierName];
              return `
                <article class="stack-tier-card ${data.escapeHtml(tier.summary.accentClass)}">
                  <div class="stack-tier-head">
                    <span class="stack-tier-label">${data.escapeHtml(tier.summary.label)}</span>
                    <h4>${data.escapeHtml(tier.summary.title)}</h4>
                    <p>${data.escapeHtml(tier.summary.description)}</p>
                  </div>
                  <div class="tag-grid fulfillment-tag-grid">
                    ${renderReportTag("Setup Mix", summarizeTierSetup(tier.tools))}
                    ${renderReportTag("Who Can Implement", summarizeTierImplementation(tier.tools))}
                  </div>
                  <div class="stack-tool-list">
                    ${tier.tools.map((tool) => renderToolPill(tool)).join("")}
                  </div>
                  <ul class="paid-plan-list">
                    ${tier.tools.map((tool) => `
                      <li>
                        <strong>${data.escapeHtml(tool.name)}</strong> (${data.escapeHtml(tool.price)} · ${data.escapeHtml(tool.setupDifficulty)} · ${data.escapeHtml(tool.implementationLabel)}):
                        ${data.escapeHtml(tool.whyFit)}
                      </li>
                    `).join("")}
                  </ul>
                </article>
              `;
            }).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Buying Order</p>
              <h3>What to buy first, second, and third</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.buyPriority.map((item) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">${data.escapeHtml(item.label)}</span>
                <h4>${data.escapeHtml(item.title)}</h4>
                <p class="summary-copy">${data.escapeHtml(item.detail)}</p>
                <p class="paid-plan-note"><strong>Timing:</strong> ${data.escapeHtml(item.timing)}</p>
                <p class="paid-plan-note"><strong>Move to the next layer when:</strong> ${data.escapeHtml(item.gate)}</p>
                ${item.tools.length > 0
                  ? `<div class="stack-tool-list">${item.tools.map((tool) => renderToolPill(tool)).join("")}</div>`
                  : ""}
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">What Not To Buy Yet</p>
              <h3>Where the business should hold back</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.notYetList.map((item) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">${data.escapeHtml(item.label)}</span>
                <h4>${data.escapeHtml(item.title)}</h4>
                <p class="summary-copy">${data.escapeHtml(item.detail)}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Workflow Snapshot</p>
              <h3>${data.escapeHtml(plan.beforeAfterSnapshot.title)}</h3>
            </div>
          </div>
          <div class="action-card-grid">
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">${data.escapeHtml(plan.beforeAfterSnapshot.beforeLabel)}</span>
              <h4>What the workflow feels like today</h4>
              <ul class="paid-plan-list">
                ${plan.beforeAfterSnapshot.before.map((item) => `<li>${data.escapeHtml(item)}</li>`).join("")}
              </ul>
            </article>
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">${data.escapeHtml(plan.beforeAfterSnapshot.afterLabel)}</span>
              <h4>What the workflow should look like after rollout</h4>
              <ul class="paid-plan-list">
                ${plan.beforeAfterSnapshot.after.map((item) => `<li>${data.escapeHtml(item)}</li>`).join("")}
              </ul>
            </article>
          </div>
          <article class="paid-plan-section-card paid-plan-section-card-wide">
            <span class="paid-plan-section-label">Expected First Improvement</span>
            <h4>What should feel better first</h4>
            <p class="summary-copy">${data.escapeHtml(plan.beforeAfterSnapshot.outcome)}</p>
          </article>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Subscription Waste Check</p>
              <h3>How to avoid paying for overlap</h3>
            </div>
          </div>
          <p class="summary-copy">${data.escapeHtml(plan.subscriptionWasteCheck.summary)}</p>
          <div class="action-card-grid">
            ${plan.subscriptionWasteCheck.cards.map((card) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">${data.escapeHtml(card.label)}</span>
                <h4>${data.escapeHtml(card.title)}</h4>
                <p class="summary-copy">${data.escapeHtml(card.copy)}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Budget Map</p>
              <h3>What to buy now and what to delay</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${["starter", "growth", "advanced"].map((tierName) => {
              const tier = plan.tiers[tierName];
              return `
                <article class="paid-plan-section-card">
                  <span class="paid-plan-section-label">${data.escapeHtml(tier.summary.label)}</span>
                  <h4>${data.escapeHtml(tier.summary.rangeText)}</h4>
                  <p class="summary-copy"><strong>What this covers:</strong> ${data.escapeHtml(tier.budgetNotes.notes)}</p>
                  <p class="summary-copy"><strong>What to delay:</strong> ${data.escapeHtml(tier.budgetNotes.delay)}</p>
                </article>
              `;
            }).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Implementation Reality</p>
              <h3>Who should own setup and what changes first</h3>
            </div>
          </div>
          <div class="action-card-grid">
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Best Owner</span>
              <h4>${data.escapeHtml(plan.implementationReality.mode)}</h4>
              <p class="summary-copy">${data.escapeHtml(plan.implementationReality.summary)}</p>
              <p class="paid-plan-note"><strong>Suggested owner:</strong> ${data.escapeHtml(plan.implementationReality.owner)}</p>
            </article>
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Admin / Ops Tasks</span>
              <h4>What the business can handle directly</h4>
              <ul class="paid-plan-list">
                ${plan.implementationReality.adminTasks.map((task) => `<li>${data.escapeHtml(task)}</li>`).join("")}
              </ul>
            </article>
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Technical Help</span>
              <h4>${plan.implementationReality.technicalTasks.length > 0 ? "Where setup support matters" : "Not required for the starter layer"}</h4>
              ${plan.implementationReality.technicalTasks.length > 0
                ? `<ul class="paid-plan-list">${plan.implementationReality.technicalTasks.map((task) => `<li>${data.escapeHtml(task)}</li>`).join("")}</ul>`
                : `<p class="summary-copy">A practical admin, operator, or founder should be able to launch the first layer without dedicated technical help.</p>`}
            </article>
          </div>
          <article class="paid-plan-section-card paid-plan-section-card-wide">
            <span class="paid-plan-section-label">Replace Or Add</span>
            <h4>${data.escapeHtml(plan.replaceVsAdd.headline)}</h4>
            <p class="summary-copy">${data.escapeHtml(plan.replaceVsAdd.summary)}</p>
            <ul class="paid-plan-list">
              <li><strong>Add now:</strong> ${data.escapeHtml(plan.replaceVsAdd.addNow)}</li>
              <li><strong>Replace later:</strong> ${data.escapeHtml(plan.replaceVsAdd.replaceLater)}</li>
              <li><strong>Watch for overlap:</strong> ${data.escapeHtml(plan.replaceVsAdd.watch)}</li>
            </ul>
          </article>
          <article class="paid-plan-section-card paid-plan-section-card-wide">
            <span class="paid-plan-section-label">First Week Checklist</span>
            <h4>What to do in the first 7 days</h4>
            <ul class="paid-plan-list">
              ${plan.firstWeekChecklist.map((item) => `<li><strong>${data.escapeHtml(item.step)}:</strong> ${data.escapeHtml(item.title)} - ${data.escapeHtml(item.detail)}</li>`).join("")}
            </ul>
          </article>
        </section>

        ${plan.toolImplementationModules
          ? `
            <section class="results-panel standalone-panel fulfillment-print-panel">
              <div class="results-header">
                <div>
                  <p class="eyebrow">Tool Implementation Modules</p>
                  <h3>How to set up the highest-leverage tools in this stack</h3>
                </div>
              </div>
              <p class="summary-copy">${data.escapeHtml(plan.toolImplementationModules.summary)}</p>
              ${plan.toolImplementationModules.modules.map((module) => `
                <article class="paid-plan-section-card paid-plan-section-card-wide">
                  <span class="paid-plan-section-label">${data.escapeHtml(module.mode)}</span>
                  <h4>${data.escapeHtml(module.headline)}</h4>
                  <div class="tag-grid fulfillment-tag-grid">
                    ${renderReportTag("Tool", module.toolName)}
                    ${renderReportTag("Layer", module.tierLabel)}
                    ${renderReportTag("Setup", module.setupDifficulty)}
                    ${renderReportTag("Who Can Implement", module.implementationLabel)}
                  </div>
                  <p class="summary-copy">${data.escapeHtml(module.summary)}</p>
                  <ul class="paid-plan-list">
                    ${module.steps.map((step) => `<li><strong>${data.escapeHtml(step.step)}:</strong> ${data.escapeHtml(step.title)} - ${data.escapeHtml(step.detail)}</li>`).join("")}
                  </ul>
                  <p class="paid-plan-note"><strong>Keep in mind:</strong></p>
                  <ul class="paid-plan-list">
                    ${module.checkpoints.map((item) => `<li>${data.escapeHtml(item)}</li>`).join("")}
                  </ul>
                </article>
              `).join("")}
              ${plan.toolImplementationModules.omittedCount > 0
                ? `<p class="paid-plan-note">This report prioritizes the highest-leverage setup modules first. ${data.escapeHtml(String(plan.toolImplementationModules.omittedCount))} additional tool${plan.toolImplementationModules.omittedCount === 1 ? "" : "s"} follow the same implementation framework once the first rollout is working.</p>`
                : ""}
            </section>
          `
          : ""}

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">First 3 Workflows</p>
              <h3>What the business should implement next</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.workflows.map((workflow) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">Workflow</span>
                <h4>${data.escapeHtml(workflow.title)}</h4>
                <p class="summary-copy">${data.escapeHtml(workflow.description)}</p>
                ${workflow.tools.length > 0
                  ? `<div class="stack-tool-list">${workflow.tools.map((toolConfig) => renderToolPill({
                    name: toolConfig.name,
                    category: toolConfig.category,
                    detailUrl: `./tool-detail.html?tool=${encodeURIComponent(data.toSlug(toolConfig.name))}`,
                    colors: CATEGORY_COLORS[toolConfig.category] || { start: "#2f7cff", end: "#123b9c" }
                  })).join("")}</div>`
                  : ""}
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Automation Flows</p>
              <h3>How the system should move work from one step to the next</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.automationFlows.map((flow) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">Flow</span>
                <h4>${data.escapeHtml(flow.title)}</h4>
                <p class="paid-plan-flow-kicker">Execution Sequence</p>
                ${renderStepFlow(flow.flow)}
                <p class="paid-plan-flow-line">${data.escapeHtml(flow.flow)}</p>
                <p class="summary-copy">${data.escapeHtml(flow.outcome)}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Workflow Risk</p>
              <h3>Where AI is safe first and where to stay cautious</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.workflowRiskReview.map((risk) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">${data.escapeHtml(risk.label)}</span>
                <h4>${data.escapeHtml(risk.title)}</h4>
                <p class="summary-copy">${data.escapeHtml(risk.copy)}</p>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Prompt Pack</p>
              <h3>Copy-and-paste prompts the team can use right away</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.promptPack.map((prompt) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">Prompt</span>
                <h4>${data.escapeHtml(prompt.title)}</h4>
                <p class="summary-copy">${data.escapeHtml(prompt.use)}</p>
                <pre class="paid-plan-prompt-block">${data.escapeHtml(prompt.text)}</pre>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Tool Alternatives</p>
              <h3>Option A, B, and C if the budget or complexity changes</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.toolAlternatives.map((lane) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">${data.escapeHtml(lane.category)}</span>
                <h4>Alternative paths</h4>
                <ul class="paid-plan-list paid-plan-phase-list">
                  <li><strong>Option A (cheap):</strong> ${data.escapeHtml(lane.optionA.name)} - ${data.escapeHtml(lane.optionA.price)}</li>
                  <li><strong>Option B (best fit):</strong> ${data.escapeHtml(lane.optionB.name)} - ${data.escapeHtml(lane.optionB.price)}</li>
                  <li><strong>Option C (advanced):</strong> ${data.escapeHtml(lane.optionC.name)} - ${data.escapeHtml(lane.optionC.price)}</li>
                </ul>
              </article>
            `).join("")}
          </div>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">90-Day Action Plan</p>
              <h3>${data.escapeHtml(ninetyDayTitle)}</h3>
            </div>
          </div>
          <div class="action-card-grid">
            ${plan.ninetyDayPlan.map((phase) => `
              <article class="paid-plan-section-card">
                <span class="paid-plan-section-label">${data.escapeHtml(phase.phase)}</span>
                <h4>${data.escapeHtml(phase.title)}</h4>
                <p class="summary-copy">${data.escapeHtml(phase.detail)}</p>
              </article>
            `).join("")}
          </div>
          <article class="paid-plan-section-card paid-plan-section-card-wide">
            <span class="paid-plan-section-label">First 30 Days Detail</span>
            <h4>Week-by-week implementation checkpoints</h4>
            <ul class="paid-plan-list fulfillment-rollout-list">
              ${plan.rolloutMilestones.map((milestone) => `<li>${data.escapeHtml(milestone)}</li>`).join("")}
            </ul>
          </article>
        </section>

        <section class="results-panel standalone-panel fulfillment-print-panel">
          <div class="results-header">
            <div>
              <p class="eyebrow">Fit and Risks</p>
              <h3>Why this stack fits and what to watch</h3>
            </div>
          </div>
          <div class="action-card-grid">
            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Why These Tools Fit</span>
              <h4>Decision signals used in this plan</h4>
              <ul class="paid-plan-list">
                ${plan.whyItFits.map((reason) => `<li>${data.escapeHtml(reason)}</li>`).join("")}
              </ul>
            </article>

            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Mistakes to Avoid</span>
              <h4>What usually creates waste</h4>
              <ul class="paid-plan-list">
                ${plan.pitfalls.map((pitfall) => `<li>${data.escapeHtml(pitfall)}</li>`).join("")}
              </ul>
            </article>

            <article class="paid-plan-section-card">
              <span class="paid-plan-section-label">Upgrade Path</span>
              <h4>What to add later</h4>
              <ul class="paid-plan-list paid-plan-phase-list">
                <li><strong>Now:</strong> ${data.escapeHtml(plan.upgradePath.now)}</li>
                <li><strong>Next:</strong> ${data.escapeHtml(plan.upgradePath.next)}</li>
                <li><strong>Later:</strong> ${data.escapeHtml(plan.upgradePath.later)}</li>
              </ul>
            </article>
          </div>
        </section>
      </article>
    `;
  }

  window.EASYAISTACK_PLAN_GENERATOR = {
    normalizeIntake,
    extractIntakeFromShopify,
    getSampleShopifyOrder,
    getSampleIntake() {
      return normalizeIntake(SAMPLE_INTAKE);
    },
    buildPlannerStateFromIntake,
    generatePlan,
    renderGeneratedPlan
  };
})();
