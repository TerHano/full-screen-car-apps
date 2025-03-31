import { Group } from "@mantine/core";
import { SiteType, useAvailableSites } from "../hooks/useAvailableSites";
import { SiteCard } from "./SiteCard/SiteCard";
import { AddCustomSiteButton } from "./AddCustomSiteButton";
import { useCustomSitesModal } from "../hooks/useCustomSitesModal";
import { CustomSiteModal } from "./CustomSiteModal";

export const SiteList = ({ siteType }: { siteType: SiteType }) => {
  const { siteDetails, open, close, isOpen } = useCustomSitesModal();
  const { sites } = useAvailableSites(siteType);

  return (
    <>
      <Group align="center" justify="center" gap="lg">
        {sites.map((site, index) => (
          <SiteCard
            animationDelay={index * 40}
            key={site.id}
            site={site}
            onEdit={open}
          />
        ))}
        {siteType === SiteType.CUSTOM ? (
          <AddCustomSiteButton
            openModal={open}
            animationDelay={sites.length * 40}
          />
        ) : null}
      </Group>
      <CustomSiteModal
        site={siteDetails ?? undefined}
        opened={isOpen}
        close={close}
      />
    </>
  );
};
