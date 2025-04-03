import { Button, Group, Modal, Progress, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandYoutubeFilled,
  IconExternalLink,
  IconWindowMaximize,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useYoutubeRedirect } from "../hooks/useYoutubeRedirect";

const timeInSeconds = 5;

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
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Stack>
          <Progress
            color="red"
            size="md"
            radius="xs"
            value={progressVal}
            w="full"
            transitionDuration={timeInSeconds * 1000}
            onTransitionEnd={() => {
              redirectToYoutube();
            }}
          />
          <Stack gap="sm" justify="center" align="center">
            <IconBrandYoutubeFilled size={48} color="red" />
            <Group gap="xs" justify="center">
              <IconExternalLink size={14} />
              <Text fw="bold">Redirecting to Youtube</Text>
            </Group>
            <Text ta="center" fz="md">
              You will be redirected to Youtube in {timeInSeconds} seconds,
              please click 'GO TO SITE' when asked to enable fullscreen
            </Text>
          </Stack>
          <Group justify="space-between">
            <Button variant="light" color="white" size="md" onClick={close}>
              Cancel
            </Button>
            <Button
              size="md"
              onClick={() => {
                redirectToYoutube();
              }}
            >
              Skip
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
