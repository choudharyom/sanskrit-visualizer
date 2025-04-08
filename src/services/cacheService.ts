export class CacheService {
  private static CACHE_PREFIX = 'sanskrit-viz-';
  private static TTL = 24 * 60 * 60 * 1000; // 24 hours

  static async cacheAnalysisResult(key: string, data: any) {
    const cacheData = {
      timestamp: Date.now(),
      data
    };
    await localStorage.setItem(
      `${this.CACHE_PREFIX}${key}`,
      JSON.stringify(cacheData)
    );
  }

  static async getCachedAnalysis(key: string) {
    const cached = localStorage.getItem(`${this.CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp > this.TTL) {
      localStorage.removeItem(`${this.CACHE_PREFIX}${key}`);
      return null;
    }

    return data;
  }
}
