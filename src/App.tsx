import { useMemo, useState } from "react";
import "@mantine/core/styles.css";
import { Card, Flex, SegmentedControl, Stack, Text } from "@mantine/core";
import { SiteType } from "./hooks/useAvailableSites";
import {
  IconDeviceGamepad2,
  IconDeviceTv,
  IconProps,
  IconWorldStar,
  IconWorldWww,
} from "@tabler/icons-react";
import { FullscreenButton } from "./components/FullscreenButton";
import { SiteList } from "./components/SiteList";
import { useMediaQuery } from "@mantine/hooks";
import { useCheckAPIHealth } from "./hooks/useCheckAPIHealth";
import { FullscreenNotification } from "./components/FullscreenNotification";

function App() {
  useCheckAPIHealth();
  const [currentSiteView, setCurrentSiteView] = useState(SiteType.MEDIA);
  const showLabelName = useMediaQuery("(min-width: 31rem)");
  console.log("showLabelName", showLabelName);
  const options = useMemo(() => {
    const iconProps: IconProps = {
      size: showLabelName ? 18 : 24,
    };
    return [
      {
        label: (
          <SegmentedControlLabel
            showLabelName={showLabelName}
            icon={<IconDeviceTv {...iconProps} />}
            label="Media"
          />
        ),
        value: SiteType.MEDIA,
      },
      {
        label: (
          <SegmentedControlLabel
            showLabelName={showLabelName}
            icon={<IconDeviceGamepad2 {...iconProps} />}
            label="Games"
          />
        ),
        value: SiteType.GAMES,
      },
      {
        label: (
          <SegmentedControlLabel
            showLabelName={showLabelName}
            icon={<IconWorldWww {...iconProps} />}
            label="Web"
          />
        ),
        value: SiteType.WEB_PAGES,
      },
      {
        label: (
          <SegmentedControlLabel
            showLabelName={showLabelName}
            icon={<IconWorldStar {...iconProps} />}
            label="Custom"
          />
        ),
        value: SiteType.CUSTOM,
      },
    ];
  }, [showLabelName]);
  return (
    <Stack p="xl" align="center">
      <FullscreenNotification />
      <SegmentedControl
        size="lg"
        defaultValue={currentSiteView}
        onChange={(val) => setCurrentSiteView(val as SiteType)}
        data={options}
      />
      <Card withBorder shadow="xs" p="xl" w="100%">
        <SiteList siteType={currentSiteView} />
      </Card>

      <FullscreenButton />
      <Text size="sm" fs="italic" c="dimmed">
        Developed By Terry Hanoman
      </Text>
    </Stack>
  );
}

export default App;

export interface SegmentedControlLabelProps {
  showLabelName?: boolean;
  label: string;
  icon: React.ReactNode;
}
export const SegmentedControlLabel = ({
  showLabelName = true,
  label,
  icon,
}: SegmentedControlLabelProps) => {
  return (
    <Flex align="center" justify="center" gap={5}>
      {icon}
      {showLabelName ? <Text fw="bold">{label}</Text> : null}
    </Flex>
  );
};
