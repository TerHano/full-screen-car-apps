import { useMemo, useState } from "react";
import "@mantine/core/styles.css";
import { Card, Flex, SegmentedControl, Stack, Text } from "@mantine/core";
import { SiteType } from "./hooks/useAvailableSites";
import { IconProps } from "@tabler/icons-react";
import { FullscreenButton } from "./components/FullscreenButton";
import { SiteList } from "./components/SiteList";
import { useMediaQuery } from "@mantine/hooks";
import { useCheckAPIHealth } from "./hooks/useCheckAPIHealth";
import { FullscreenNotification } from "./components/FullscreenNotification";
import { useSiteOptions } from "./hooks/useSiteOptions";

function App() {
  useCheckAPIHealth();
  const { options: siteOptions } = useSiteOptions();
  const [currentSiteView, setCurrentSiteView] = useState(SiteType.MEDIA);
  const showLabelName = useMediaQuery("(min-width: 31rem)");
  const options = useMemo(() => {
    const iconProps: IconProps = {
      size: showLabelName ? 18 : 24,
    };
    return siteOptions.map((option) => ({
      label: (
        <SegmentedControlLabel
          showLabelName={showLabelName}
          icon={<option.icon {...iconProps} />}
          label={option.label}
        />
      ),
      value: option.type,
    }));
  }, [showLabelName, siteOptions]);
  return (
    <Stack p="xl" align="center">
      <FullscreenNotification />
      <SegmentedControl
        size="lg"
        defaultValue={currentSiteView}
        onChange={(val) => setCurrentSiteView(val as SiteType)}
        data={options}
      />
      <Card withBorder shadow="xs" p="xl" pt="xs" w="100%">
        <SiteList siteOptions={siteOptions} siteType={currentSiteView} />
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
