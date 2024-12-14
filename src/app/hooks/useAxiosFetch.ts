import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
export const baseUrl = "https://api.eeveegoldsavings.com:8800";
interface UseAxiosFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (url: string, options?: AxiosRequestConfig) => Promise<T | null>;
}

const useAxiosFetch = <T>(): UseAxiosFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (url: string, options?: AxiosRequestConfig): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const response: AxiosResponse<T> = await axios(url, options);
        setData(response.data);
        return response.data;
      } catch (err: any) {
        setError(err.message || "An error occurred");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { data, loading, error, fetchData };
};

export default useAxiosFetch;
