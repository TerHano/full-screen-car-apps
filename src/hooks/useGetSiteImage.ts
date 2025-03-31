import { useEffect, useState } from "react";
import { OpenGraphImageResponse } from "../models/OpenGraphImageResponse";

const getSiteImageUrl = `${
  import.meta.env.VITE_OPEN_GRAPH_SERVER_URL
}/site-image-url`;

type GetSiteImageUrlOptions = {
  enabled?: boolean;
};

export const useGetSiteImage = (
  siteUrl: string | null,
  { enabled = true }: GetSiteImageUrlOptions = {}
) => {
  const [data, setData] = useState<OpenGraphImageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const fetchSiteImage = async (url: string) => {
    if (
      !url.toLowerCase().startsWith("http://") &&
      !url.toLowerCase().startsWith("https://")
    ) {
      url = `https://${url}`;
    }
    setIsLoading(true);
    try {
      const response = await fetch(getSiteImageUrl, {
        method: "POST",
        body: JSON.stringify({ siteUrl: url }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      response.json().then((data: OpenGraphImageResponse) => {
        if (data.success) {
          setData(data);
        } else {
          setIsError(true);
          setData(null);
          console.error("Failed to fetch site image");
        }
      });
    } catch {
      setData(null);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (siteUrl && enabled) {
      fetchSiteImage(siteUrl);
    }
  }, [enabled, siteUrl]);

  return {
    data: {
      imageUrl: data?.imageUrl,
      siteTitle: data?.siteTitle,
    },
    isLoading,
    isError,
  };
};
