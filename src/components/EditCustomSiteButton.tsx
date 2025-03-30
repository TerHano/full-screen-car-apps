import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CustomSiteModal } from "./CustomSiteModal";
import { SiteInfo } from "../hooks/useAvailableSites";
import { IconEditCircle } from "@tabler/icons-react";

export interface EditCustomSiteButtonProps {
  siteInfo: SiteInfo;
}

export const EditCustomSiteButton = ({
  siteInfo,
}: EditCustomSiteButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon variant="light" size="lg" onClick={open}>
        <IconEditCircle size={20} />
      </ActionIcon>
      <CustomSiteModal site={siteInfo} opened={opened} close={close} />
    </>
  );
};
