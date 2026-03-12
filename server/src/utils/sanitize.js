function sanitizeText(value, maxLength, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().slice(0, maxLength);
  return normalized || fallback;
}

module.exports = {
  sanitizeText,
};
