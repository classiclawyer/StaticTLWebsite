import { lang } from "../core/language.js";

async function submitInquiry(form, status, messages, extra = {}) {
  const button = form.querySelector('button[type="submit"]'),
    original = button.textContent;
  button.disabled = true;
  status.hidden = false;
  status.classList.remove("error");
  status.setAttribute("role", "status");
  status.textContent = messages.pending;
  try {
    const payload = new FormData(form);
    payload.set("language", lang === "ko" ? "Korean" : "English");
    payload.set("currency", lang === "ko" ? "KRW" : "EUR");
    for (const [key, value] of Object.entries(extra)) payload.set(key, value);
    const response = await fetch(form.action, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error("Form submission failed");
    status.textContent = messages.sent;
    form.reset();
  } catch (_) {
    status.classList.add("error");
    status.setAttribute("role", "alert");
    status.textContent = messages.error;
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

export { submitInquiry };
