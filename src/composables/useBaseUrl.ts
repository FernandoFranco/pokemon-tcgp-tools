export function useBaseUrl() {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl.endsWith("/") ? baseUrl.replace(/\/$/, "") : baseUrl;
}
