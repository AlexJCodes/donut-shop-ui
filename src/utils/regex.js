/**
 * RegEx
 * Postal (Sweden) - 5 numbers, safe for space example 123 45.
 * Phone (Sweden) - Allow +46, 46 or 0 / space
 * Mail - Requires . and @, it wont allow any space
 * Swedish social security number - 10 or 12 numbers are ok. -,+ are also okay, or nothing.
 */

export const REGEX = {
    name: /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/,
    address: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+([ '.\-][A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*$/,
    postalSE: /^\d{3}\s?\d{2}$/,
    phoneSE: /^(?:\+46|46|0)\s?\d{1,3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ssnFormat: /^(\d{6}|\d{8})[-+]?(\d{4})$/ // YYMMDD-XXXX eller YYYYMMDD-XXXX (med -, + eller inget)
};