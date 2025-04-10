import {
  ActionIcon,
  Card,
  Flex,
  Group,
  Image,
  LoadingOverlay,
  Stack,
  Text,
} from "@mantine/core";
import { SiteInfo, SiteType } from "../../hooks/useAvailableSites";
import { useState } from "react";
import { IconEditCircle } from "@tabler/icons-react";
import { useWindowEvent } from "@mantine/hooks";

export interface SiteCardProps {
  site: SiteInfo;
  animationDelay?: number;
  onEdit?: (site: SiteInfo) => void;
}

export const SiteCard = ({
  site,
  animationDelay = 0,
  onEdit,
}: SiteCardProps) => {
  useWindowEvent("pageshow", (event) => {
    if (event.persisted) {
      setLoading(false);
    }
  });
  const { imageAlt, imageSrc, link, name, type } = site;
  const [loading, setLoading] = useState(false);
  return (
    <Stack
      className="cardAnimation"
      style={{ animationDelay: `${animationDelay}ms` }}
      align="center"
      justify="center"
      gap="xs"
    >
      <Card
        onClick={() => {
          setLoading(true);
        }}
        shadow="sm"
        padding="xl"
        radius="lg"
        component="a"
        href={link}
      >
        <Card.Section>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "blue", type: "bars" }}
          />
          {imageSrc ? (
            <Image src={imageSrc} h={150} w={300} alt={imageAlt} />
          ) : (
            <Flex bg="black" h={150} w={300} align="center" justify="center">
              <Text truncate="end" size="lg" fw="bold">
                {name}
              </Text>
            </Flex>
          )}
        </Card.Section>
      </Card>
      <Group maw={300} gap="xs" wrap="nowrap" justify="center">
        <Text truncate="end" fw="bold">
          {name}
        </Text>
        {type === SiteType.CUSTOM ? (
          <ActionIcon
            variant="light"
            size="lg"
            onClick={() => {
              if (onEdit) {
                onEdit(site);
              }
            }}
          >
            <IconEditCircle size={20} />
          </ActionIcon>
        ) : null}
      </Group>
    </Stack>
  );
};
