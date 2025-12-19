// validators.js
function isNonEmptyString(v) { return typeof v === 'string' && v.trim().length > 0; }
function isEmail(v) { return isNonEmptyString(v) && /^\S+@\S+\.\S+$/.test(v); }
function normalizePhone(v) { if (!isNonEmptyString(v)) return ''; return v.replace(/[^\d+]/g, ''); }
function isPhoneValid(v) { const p = normalizePhone(v); const digits = p.replace(/\D/g, ''); return digits.length >= 7 && digits.length <= 15; }

module.exports = { isNonEmptyString, isEmail, normalizePhone, isPhoneValid };
