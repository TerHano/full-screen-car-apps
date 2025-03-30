import { Card, Flex, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconWorldPlus } from "@tabler/icons-react";
import { CustomSiteModal } from "./CustomSiteModal";

export interface AddCustomSiteButtonProps {
  animationDelay?: number;
}

export const AddCustomSiteButton = ({
  animationDelay,
}: AddCustomSiteButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card
        onClick={open}
        shadow="sm"
        padding="xl"
        radius="lg"
        component="button"
        className="cardAnimation"
        style={{ animationDelay: `${animationDelay}ms` }}
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
      <CustomSiteModal opened={opened} close={close} />
    </>
  );
};
