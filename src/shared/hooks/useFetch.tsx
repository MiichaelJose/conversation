import { useState, useEffect } from "react";

const useFetch =  (url: string, config: { method: string; bod?: any; filters?: any }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, config);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { data, loading, error };
};

export default useFetch;
