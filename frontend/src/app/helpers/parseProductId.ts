export function ParseProductId(url: string): number {
  return parseInt(url.match(/\d+$/)![0]);
}
