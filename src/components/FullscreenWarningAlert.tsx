import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import appConfig from "../../app.config.json";

export const FullscreenWarningAlert = () => {
  const params = new URLSearchParams(window.location.search);
  const isFullscreen = params.get(appConfig.fullscreenParam);
  if (!isFullscreen) {
    return (
      <Alert
        variant="light"
        color="yellow"
        title="You May Not Be In Fullscreen!"
        icon={<IconAlertTriangle />}
      >
        Press the GO FULLSCREEN button before selecting any apps
      </Alert>
    );
  } else {
    return null;
  }
};
