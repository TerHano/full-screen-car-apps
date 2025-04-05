import { Portal, Transition, Notification, Container } from "@mantine/core";
import appConfig from "../../app.config.json";
import { useEffect, useRef, useState } from "react";
import { IconMaximize } from "@tabler/icons-react";

export const FullscreenNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const isFullscreen = params.get(appConfig.fullscreenParam);
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isFullscreen) {
      setTimeout(() => {
        setShowNotification(true);
      }, 200);

      timeoutIdRef.current = setTimeout(() => {
        setShowNotification(false);
      }, 10000);
    }
  }, [isFullscreen]);
  return !isFullscreen ? (
    <Portal>
      <Transition
        mounted={showNotification}
        transition="slide-left"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <Container
            fluid
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 9999,
              overflow: "hidden",
            }}
          >
            <Notification
              withBorder
              color="yellow"
              icon={<IconMaximize size={16} />}
              style={{
                margin: "1rem",
                ...styles,
              }}
              onClose={() => {
                setShowNotification(false);
                if (timeoutIdRef.current) {
                  clearTimeout(timeoutIdRef.current);
                }
              }}
              title="You May Not Be In Fullscreen!
"
            >
              Press the 'GO FULLSCREEN' button before selecting any apps
            </Notification>{" "}
          </Container>
        )}
      </Transition>
    </Portal>
  ) : null;
};
