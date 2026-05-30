// Konfigurasi terpusat semua endpoint Jikan API v4
export const API_CONFIG = {
  BASE_URL: 'https://api.jikan.moe/v4',
  ENDPOINTS: {
    SEARCH: '/anime',
    ANIME_DETAIL: (id: number | string) => `/anime/${id}/full`,
    CHARACTERS: (id: number | string) => `/anime/${id}/characters`,
    STAFF: (id: number | string) => `/anime/${id}/staff`,
    RECOMMENDATIONS: (id: number | string) => `/anime/${id}/recommendations`,
    RELATIONS: (id: number | string) => `/anime/${id}/relations`,
    SCHEDULES: '/schedules',
    SEASONAL_NOW: '/seasons/now',
    SEASONAL: (year: number, season: string) => `/seasons/${year}/${season}`,
    SEASONAL_UPCOMING: '/seasons/upcoming',
    TOP_ANIME: '/top/anime',
    GENRES: '/genres/anime',
  },
} as const;

async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${path}`;
  const res = await fetch(url, { ...init, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Jikan API error ${res.status}`);
  return res.json();
}

export const jikan = {
  search: (q: string, limit = 20) =>
    fetcher<any>(`${API_CONFIG.ENDPOINTS.SEARCH}?q=${encodeURIComponent(q)}&limit=${limit}&order_by=popularity`),
  detail: (id: number | string) => fetcher<any>(API_CONFIG.ENDPOINTS.ANIME_DETAIL(id)),
  characters: (id: number | string) => fetcher<any>(API_CONFIG.ENDPOINTS.CHARACTERS(id)),
  staff: (id: number | string) => fetcher<any>(API_CONFIG.ENDPOINTS.STAFF(id)),
  recommendations: (id: number | string) => fetcher<any>(API_CONFIG.ENDPOINTS.RECOMMENDATIONS(id)),
  relations: (id: number | string) => fetcher<any>(API_CONFIG.ENDPOINTS.RELATIONS(id)),
  schedule: (day?: string) =>
    fetcher<any>(`${API_CONFIG.ENDPOINTS.SCHEDULES}${day ? `?filter=${day}` : ''}`),
  seasonNow: () => fetcher<any>(API_CONFIG.ENDPOINTS.SEASONAL_NOW),
  seasonUpcoming: () => fetcher<any>(API_CONFIG.ENDPOINTS.SEASONAL_UPCOMING),
  season: (year: number, season: string) => fetcher<any>(API_CONFIG.ENDPOINTS.SEASONAL(year, season)),
  topAnime: (page = 1) => fetcher<any>(`${API_CONFIG.ENDPOINTS.TOP_ANIME}?page=${page}`),
};
