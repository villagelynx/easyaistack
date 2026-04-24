(function initializeEasyAiStackLeadCapture() {
  const forms = document.querySelectorAll("form[data-demo-form]");

  if (!forms.length) {
    return;
  }

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const statusNode = form.querySelector("[data-form-status]");
      const formData = new FormData(form);
      const record = {
        formType: form.dataset.demoForm || "unknown",
        submittedAt: new Date().toISOString()
      };

      formData.forEach((value, key) => {
        record[key] = String(value).trim();
      });

      try {
        const storageKey = form.dataset.storageKey || "easyaistack-demo-submissions";
        const existing = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
        existing.push(record);
        window.localStorage.setItem(storageKey, JSON.stringify(existing));
        form.reset();

        if (statusNode) {
          statusNode.hidden = false;
          statusNode.textContent = "Saved locally in this browser for prototype testing. Connect this form to Shopify, Klaviyo, or your CRM before launch.";
        }
      } catch (error) {
        if (statusNode) {
          statusNode.hidden = false;
          statusNode.textContent = "The form could not save locally in this browser. The layout is ready, but you still need a live capture endpoint for launch.";
        }
      }
    });
  });
})();
