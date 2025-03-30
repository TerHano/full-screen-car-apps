import { Group } from "@mantine/core";
import { SiteType, useAvailableSites } from "../hooks/useAvailableSites";
import { SiteCard } from "./SiteCard/SiteCard";
import { AddCustomSiteButton } from "./AddCustomSiteButton";

export const SiteList = ({ siteType }: { siteType: SiteType }) => {
  const { sites } = useAvailableSites(siteType);
  return (
    <Group align="center" justify="center" gap="lg">
      {sites.map((site, index) => (
        <SiteCard animationDelay={index * 40} key={site.id} site={site} />
      ))}
      {siteType === SiteType.CUSTOM ? (
        <AddCustomSiteButton animationDelay={sites.length * 40} />
      ) : null}
    </Group>
  );
};
