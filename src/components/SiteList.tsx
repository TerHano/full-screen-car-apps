import { Group, Stack, Text } from "@mantine/core";
import { SiteType, useAvailableSites } from "../hooks/useAvailableSites";
import { SiteCard } from "./SiteCard/SiteCard";
import { AddCustomSiteButton } from "./AddCustomSiteButton";
import { useCustomSitesModal } from "../hooks/useCustomSitesModal";
import { CustomSiteModal } from "./CustomSiteModal";
import { SiteOption } from "../hooks/useSiteOptions";

export const SiteList = ({
  siteOptions,
  siteType,
}: {
  siteOptions: SiteOption[];
  siteType: SiteType;
}) => {
  const siteInfo = siteOptions.find((option) => option.type === siteType);
  const { siteDetails, open, close, isOpen } = useCustomSitesModal();
  const { sites } = useAvailableSites(siteType);

  return (
    <Stack>
      {siteInfo ? (
        <Group gap="xs" align="center" justify="center">
          <siteInfo.icon size={36} />
          <Text fw="bold" fz="h1">
            {siteInfo?.label}
          </Text>
        </Group>
      ) : null}
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
    </Stack>
  );
};
