import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import { SiteInfo } from "./useAvailableSites";

export const useCustomSitesModal = () => {
  const [siteDetails, setSiteDetails] = useState<SiteInfo | null>(null);
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const open = useCallback(
    (site?: SiteInfo) => {
      setSiteDetails(site ?? null);
      openModal();
    },
    [openModal]
  );

  const close = useCallback(() => {
    setSiteDetails(null);
    closeModal();
  }, [closeModal]);

  return {
    isOpen: opened,
    open,
    close,
    siteDetails,
  };
};
