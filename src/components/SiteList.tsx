import { Group } from "@mantine/core";
import { SiteType, useAvailableSites } from "../hooks/useAvailableSites";
import { SiteCard } from "./SiteCard/SiteCard";

export const SiteList = ({ siteType }: { siteType: SiteType }) => {
  const { sites } = useAvailableSites(siteType);
  return (
    <Group align="center" justify="center" gap="lg">
      {sites.map((site, index) => (
        <SiteCard animationDelay={index * 40} key={site.name} site={site} />
      ))}
    </Group>
  );
};
