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
    <Stack align="center" justify="center" gap="xs">
      <Card
        onClick={() => {
          setLoading(true);
        }}
        shadow="sm"
        padding="xl"
        radius="lg"
        component="a"
        href={link}
        className="cardAnimation"
        style={{ animationDelay: `${animationDelay}ms` }}
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
              <Text size="lg" fw="bold">
                {name}
              </Text>
            </Flex>
          )}
        </Card.Section>
      </Card>
      <Group gap="xs" justify="center">
        <Text fw="bold">{name}</Text>
        {type === SiteType.CUSTOM ? (
          <EditCustomSiteButton siteInfo={site} />
        ) : null}
      </Group>
    </Stack>
  );
};
