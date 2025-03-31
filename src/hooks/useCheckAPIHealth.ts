import { useCallback, useEffect, useState } from "react";

const getHealthService = `${import.meta.env.VITE_OPEN_GRAPH_SERVER_URL}/health`;

type HealthStatus = "healthy" | "unhealthy" | "error";

export const useCheckAPIHealth = () => {
  const [data, setData] = useState<HealthStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const checkHealth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(getHealthService, {
        signal: AbortSignal.timeout(60 * 1000),
      });
      if (!response.ok) {
        setData("unhealthy");
      } else {
        setData("healthy");
      }
    } catch {
      setData("error");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return {
    data,
    isLoading,
    isError,
  };
};
