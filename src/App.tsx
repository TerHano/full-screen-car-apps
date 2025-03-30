import { useMemo, useState } from "react";
import "@mantine/core/styles.css";
import { Card, Flex, SegmentedControl, Stack, Text } from "@mantine/core";
import { SiteType } from "./hooks/useAvailableSites";
import {
  IconDeviceGamepad2,
  IconDeviceTv,
  IconWorldWww,
} from "@tabler/icons-react";
import { FullscreenButton } from "./components/FullscreenButton";
import { SiteList } from "./components/SiteList";

function App() {
  const [currentSiteView, setCurrentSiteView] = useState(SiteType.MEDIA);
  const options = useMemo(() => {
    return [
      {
        label: (
          <SegmentedControlLabel
            icon={<IconDeviceTv size={18} />}
            label="Media"
          />
        ),
        value: SiteType.MEDIA,
      },
      {
        label: (
          <SegmentedControlLabel
            icon={<IconDeviceGamepad2 size={18} />}
            label="Games"
          />
        ),
        value: SiteType.GAMES,
      },
      {
        label: (
          <SegmentedControlLabel
            icon={<IconWorldWww size={18} />}
            label="Web Pages"
          />
        ),
        value: SiteType.WEB_PAGES,
      },
    ];
  }, []);
  return (
    <Stack p="lg" align="center">
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
  label: string;
  icon: React.ReactNode;
}
export const SegmentedControlLabel = ({
  label,
  icon,
}: SegmentedControlLabelProps) => {
  return (
    <Flex align="center" justify="center" gap={5}>
      {icon}
      <Text fw="bold">{label}</Text>
    </Flex>
  );
};
