import {
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
import { EditCustomSiteButton } from "../EditCustomSiteButton";

export interface SiteCardProps {
  site: SiteInfo;
  animationDelay?: number;
}

export const SiteCard = ({ site, animationDelay = 0 }: SiteCardProps) => {
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
          <EditCustomSiteButton siteInfo={site} />
        ) : null}
      </Group>
    </Stack>
  );
};
