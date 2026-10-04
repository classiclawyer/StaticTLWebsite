import { lang } from "../core/language.js";

async function submitInquiry(form, status, messages, extra = {}) {
  const button = form.querySelector('button[type="submit"]'),
    original = button.textContent;
  button.disabled = true;
  status.hidden = false;
  status.classList.remove("error");
  status.textContent = messages.pending;
  try {
    const payload = new FormData(form);
    payload.set("language", lang === "ko" ? "Korean" : "English");
    for (const [key, value] of Object.entries(extra)) payload.set(key, value);
    const response = await fetch(form.action, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Form submission failed");
    status.textContent = messages.sent;
    form.reset();
  } catch (_) {
    status.classList.add("error");
    status.textContent = messages.error;
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

export { submitInquiry };
