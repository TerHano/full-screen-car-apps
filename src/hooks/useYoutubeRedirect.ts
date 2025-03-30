import { useMemo } from "react";

export const useYoutubeRedirect = (currentWindow: Window) => {
  const youtubeRedirectUrl = useMemo(() => {
    const currentSite = currentWindow.location.href;
    const fullScreenParam = "isFullscreen";
    return `https://www.youtube.com/redirect?q=${currentSite}?${fullScreenParam}=true`;
  }, [currentWindow.location.href]);

  return {
    youtubeRedirectUrl,
  };
};
