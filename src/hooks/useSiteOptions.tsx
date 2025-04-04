import { useMemo } from "react";
import {
  Icon,
  IconDeviceGamepad2,
  IconDeviceTv,
  IconProps,
  IconWorldStar,
  IconWorldWww,
} from "@tabler/icons-react";
import { SiteType } from "./useAvailableSites";

export interface SiteOption {
  label: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  type: SiteType;
}
export const useSiteOptions = () => {
  const options = useMemo<SiteOption[]>(() => {
    return [
      {
        label: "Media",
        icon: IconDeviceTv,
        type: SiteType.MEDIA,
      },
      {
        label: "Games",
        icon: IconDeviceGamepad2,
        type: SiteType.GAMES,
      },
      {
        label: "Web",
        icon: IconWorldWww,
        type: SiteType.WEB_PAGES,
      },
      {
        label: "Custom",
        icon: IconWorldStar,
        type: SiteType.CUSTOM,
      },
    ];
  }, []);

  return {
    options,
  };
};
