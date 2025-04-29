export function ParseProductId(url: string): number {
  return Number(url.match(/\d+$/)![0]);
}
