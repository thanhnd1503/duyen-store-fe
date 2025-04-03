// hooks/useGet.ts
import { useState, useEffect } from "react";
import api from "../../lib/api";

type UseGetOptions<T> = {
  initialData?: T;
  enabled?: boolean;
};

export function useGet<T = any>(url: string, options: UseGetOptions<T> = {}) {
  const { initialData, enabled = true } = options;
  const [data, setData] = useState<T>(initialData as T);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<T>(url);
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, enabled]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}
