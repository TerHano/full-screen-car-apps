import { Button, Group, Modal, Progress, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandYoutube,
  IconExternalLink,
  IconWindowMaximize,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useYoutubeRedirect } from "../hooks/useYoutubeRedirect";

const timeInSeconds = 5;
// const fullscreenNotificationId = "fullscreenWarning";

export const FullscreenButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { youtubeRedirectUrl } = useYoutubeRedirect(window);

  const [progressVal, setProgressVal] = useState(0);

  const redirectToYoutube = () => {
    window.location.href = youtubeRedirectUrl;
  };

  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        setProgressVal(100);
      }, 10);
    } else {
      setProgressVal(0);
    }
  }, [opened]);

  return (
    <>
      <Button
        rightSection={<IconWindowMaximize />}
        size="xl"
        onClick={open}
        variant="light"
      >
        GO FULLSCREEN
      </Button>

      <Modal
        transitionProps={{ transition: "pop" }}
        centered
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <Stack>
          <Progress
            color="red"
            size="md"
            radius="xs"
            value={progressVal}
            w="full"
            transitionDuration={5000}
            onTransitionEnd={() => {
              console.log("Transition End");
              redirectToYoutube();
            }}
          />
          <Stack align="center">
            <Group gap="xs" justify="center">
              <IconExternalLink size={14} /> <Text>Redirecting to Youtube</Text>
            </Group>
            <Text fz="md">
              You will be redirected to{" "}
              <a href={youtubeRedirectUrl}>
                Youtube <IconBrandYoutube color="#FF0000" />
              </a>
              in {timeInSeconds} seconds, please click 'GO TO SITE' when asked
              to enable fullscreen
            </Text>
          </Stack>
          <Button onClick={close}>Cancel</Button>
        </Stack>
      </Modal>
    </>
  );
};
