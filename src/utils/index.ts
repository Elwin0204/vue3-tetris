/**
 * @description check value type
 * @param value {any}
 * @returns string
 */
export function checkType(value: any) {
  return Object.prototype.toString.call(value);
}

/**
 * @description Prevent xss attacks
 * @param value
 * @returns string
 */
export function handleXss(value: string) {
  value = value.replace(/&nbsp;/gi, "");
  value = value.replace(/\s$/, "");
  return value;
}
