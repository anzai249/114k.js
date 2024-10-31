import abbreviations from "./abbr.json" assert { type: "json" };

/**
 * Simple number formatting function.
 *
 * @param {Number} num The number to be formatted.
 * @returns {String} The formatted number.
 * @example
 * formatNumber(1145141919810); // '1,145,141,919,810'
 * formatNumber(-114514); // '-114,514'
 * formatNumber(0); // '0'
 * formatNumber(1234.5678); // '1,234.5678'
 *
 */
function formatNumber(num) {
  if (isNaN(num)) return NaN;
  if (Math.abs(num) < 1000) return num;
  let strNum = String(num);
  let decimal = "";
  if (strNum.includes(".")) {
    decimal = strNum.slice(strNum.indexOf("."));
    strNum = strNum.slice(0, strNum.indexOf("."));
  }
  let result = "";
  let count = 0;
  for (let i = strNum.length - 1; i >= 0; i--) {
    result = strNum[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = "," + result;
    }
  }
  result += decimal;
  return result;
}

/**
 * Abbreviate a number.
 * Maximum number of zh-CN, zh-TW, ja and ko is 1e25-1.
 * Maximum number of en and ru is 1e16-1.
 * Maximum number of vi is 1e13-1.
 * 
 * @param {Number} num The number to be abbreviated.
 * @param {Number} digits The number of digits after the decimal point. Default is 1.
 * @param {String} rounding The rounding method. Default is "round". Can be "round", "ceil" or "floor".
 * @param {String} locale The locale to be used. Default is "en".
 * @returns {String} The abbreviated number.
 * @example
 * abbreviateNumber(114514, 0); // '114k'
 * abbreviateNumber(1145141919); // '1.1B'
 * abbreviateNumber(1145141919, 2); // '1.15B'
 * abbreviateNumber(11.45, 1, "ceil"); // '11.5'
 * abbreviateNumber(114514, 1, "floor", "zh-CN"); // '11.4万'
 *
 */

function abbreviateNumber(
  num,
  digits = 1,
  rounding = "round",
  locale = "en",
  _suffix = ""
) {
  if (isNaN(num)) return NaN;

  const localeAbbr = abbreviations[locale] || abbreviations["en"];
  const thresholds = Object.keys(localeAbbr)
    .map(Number)
    .sort((a, b) => b - a);

  let abbreviated = num;
  let suffix = "";

  for (const threshold of thresholds) {
    if (num >= threshold) {
      const factor = Math.pow(10, Math.floor(Math.log10(threshold)));
      switch (rounding) {
        case "round":
          abbreviated =
            Math.round((num / factor) * Math.pow(10, digits)) /
            Math.pow(10, digits);
          break;
        case "floor":
          abbreviated =
            Math.floor((num / factor) * Math.pow(10, digits)) /
            Math.pow(10, digits);
          break;
        case "ceil":
          abbreviated =
            Math.ceil((num / factor) * Math.pow(10, digits)) /
            Math.pow(10, digits);
          break;
        default:
          break;
      }
      suffix = localeAbbr[threshold] + _suffix;
      break;
    }
  }

  if (abbreviated >= thresholds[thresholds.length - 1])
    return abbreviateNumber(abbreviated, digits, rounding, locale, suffix);

  return `${abbreviated}${suffix}`;
}

export default formatNumber;
export { abbreviateNumber, formatNumber };
