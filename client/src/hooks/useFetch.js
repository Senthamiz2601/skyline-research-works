import { useEffect, useState, useCallback } from 'react';

// Small data-fetching hook: returns { data, loading, error, refetch }
// so pages get consistent loading/error/empty handling without repeating boilerplate.

export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);

    fetcher()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message || 'Failed to load data'))
      .finally(() => setLoading(false));
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}