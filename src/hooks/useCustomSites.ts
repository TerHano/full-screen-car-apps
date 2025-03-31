import { useLocalStorage } from "@mantine/hooks";
import { SiteInfo } from "./useAvailableSites";
import { useCallback } from "react";

export const useCustomSites = () => {
  const [customSites, setCustomSites] = useLocalStorage<SiteInfo[]>({
    key: "customSites",
    defaultValue: [],
  });

  const add = useCallback(
    (newSite: SiteInfo) => {
      setCustomSites((prevSites) => [...prevSites, newSite]);
    },
    [setCustomSites]
  );

  const remove = useCallback(
    (siteId: string) => {
      setCustomSites((prevSites) => prevSites.filter((s) => s.id !== siteId));
    },
    [setCustomSites]
  );

  const update = useCallback(
    (siteId: string, updatedSite: SiteInfo) =>
      setCustomSites((prevSites) =>
        prevSites.map((s) => (s.id === siteId ? updatedSite : s))
      ),
    [setCustomSites]
  );

  return {
    sites: customSites,
    add,
    remove,
    update,
  };
};
