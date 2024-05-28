export const DECIMAL_MULTIPLIER = 1000;

export function pad( n: number){
  return n * DECIMAL_MULTIPLIER;
}

export function unPad(n: number){
  return Math.floor(n/DECIMAL_MULTIPLIER);
}
