export function useFetch<T>(url: string, options?: RequestInit) {
  const data = ref<T | null>(null);
  const loading = ref(true);

  const fetchData = async () => {
    loading.value = true;

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      data.value = json;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, fetchData };
}
