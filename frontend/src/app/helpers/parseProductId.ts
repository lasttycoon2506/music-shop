export function ParseProductId(url: string): Number {
  return Number(url.match(/\d+$/)![0]);
}
