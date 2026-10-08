function readSelectedInquiry() {
  let selectedInquiry = null;
  try {
    const candidate = JSON.parse(sessionStorage.getItem("atelier-inquiry") || "null");
    if (
      candidate &&
      Number.isInteger(candidate.n) &&
      candidate.n >= 1 &&
      candidate.n <= 9 &&
      Date.now() - candidate.time < 30 * 60 * 1000
    )
      selectedInquiry = candidate;
  } catch (_) {}

  return selectedInquiry;
}
export { readSelectedInquiry };
