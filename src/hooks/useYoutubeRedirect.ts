import { useMemo } from "react";
import appConfig from "../../app.config.json";

export const useYoutubeRedirect = (currentWindow: Window) => {
  const youtubeRedirectUrl = useMemo(() => {
    const currentSite = currentWindow.location.href;
    const fullScreenParam = appConfig.fullscreenParam;
    return `https://www.youtube.com/redirect?q=${currentSite}?${fullScreenParam}=true`;
  }, [currentWindow.location.href]);

  return {
    youtubeRedirectUrl,
  };
};
