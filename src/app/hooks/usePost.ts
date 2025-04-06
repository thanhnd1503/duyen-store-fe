// hooks/usePost.ts
import { useState } from "react";
import api from "../../lib/api";

type UsePostOptions<T, D> = {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
};

export function usePost<T = any, D = any>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (
    url: string,
    payload: D,
    options?: UsePostOptions<T, D>
  ) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await api.post<T>(url, payload);
      setData(response.data);
      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      if (options?.onError) {
        options.onError(errorMessage);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    post: postData,
  };
}
