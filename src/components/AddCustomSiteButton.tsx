import { Card, Flex, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconWorldPlus } from "@tabler/icons-react";

export interface AddCustomSiteButtonProps {
  animationDelay?: number;
  openModal: () => void;
}

export const AddCustomSiteButton = ({
  animationDelay,
  openModal,
}: AddCustomSiteButtonProps) => {
  const theme = useMantineTheme();
  return (
    <>
      <Stack
        align="center"
        className="cardAnimation"
        style={{
          animationDelay: `${animationDelay}ms`,
        }}
      >
        <Card
          onClick={() => {
            openModal();
          }}
          shadow="sm"
          padding="xl"
          radius="lg"
          component="button"
          style={{
            backgroundColor: theme.colors.dark[8],
          }}
          h={150}
          w={300}
          withBorder
        >
          <Flex w="100%" h="100%" align="center" justify="center">
            <Stack align="center" justify="center" gap="xs">
              <IconWorldPlus size={42} />
              <Text fw="bold">Add New Site</Text>
            </Stack>
          </Flex>
        </Card>
        <Text fs="italic">Click To Add New Site</Text>
      </Stack>
    </>
  );
};
