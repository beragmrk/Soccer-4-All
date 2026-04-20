export function cleanString(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function requireString(value: unknown, field: string, maxLength = 5000) {
  const cleaned = cleanString(value, maxLength);

  if (!cleaned) {
    throw new Error(`${field} is required.`);
  }

  return cleaned;
}

export function requireEmail(value: unknown) {
  const email = requireString(value, "Email", 320).toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    throw new Error("Please provide a valid email address.");
  }

  return email;
}

export function requirePositiveNumber(value: unknown, field: string) {
  const number = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${field} must be greater than 0.`);
  }

  return number;
}
