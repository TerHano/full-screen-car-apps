import { Modal, TextInput, Button, Group, Text, Flex } from "@mantine/core";
import { useForm, matches } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { SiteInfo, SiteType } from "../hooks/useAvailableSites";
import { v4 as uuidv4 } from "uuid";
import { useCallback } from "react";
import { IconWorldStar } from "@tabler/icons-react";

interface AddCustomSiteFormValues {
  name: string;
  url: string;
  imageSrc: string;
}

interface CustomSiteModalProps {
  opened: boolean;
  close: () => void;
  site?: SiteInfo;
}

export const CustomSiteModal = ({
  site,
  opened,
  close,
}: CustomSiteModalProps) => {
  const [, setCustomSites] = useLocalStorage<SiteInfo[]>({
    key: "customSites",
    defaultValue: [],
  });

  const form = useForm<AddCustomSiteFormValues>({
    mode: "uncontrolled",
    initialValues: {
      name: site?.name ?? "",
      url: site?.link ?? "",
      imageSrc: site?.imageSrc ?? "",
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Name must be at least 3 characters" : null,
      url: matches(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        "Invalid URL"
      ),
    },
  });

  const handleSubmit = useCallback(
    (values: AddCustomSiteFormValues) => {
      console.log("Form values:", values);
      if (
        !values.url.toLowerCase().startsWith("http://") &&
        !values.url.toLowerCase().startsWith("https://")
      ) {
        values.url = `https://${values.url}`;
      }
      const newSite: SiteInfo = {
        id: site?.id ?? uuidv4(),
        name: values.name,
        imageSrc: values.imageSrc,
        imageAlt: values.imageSrc ? `${values.name} Logo` : undefined,
        link: values.url,
        type: SiteType.CUSTOM,
      };
      if (!site) {
        setCustomSites((prevSites) => [...prevSites, newSite]);
      } else {
        setCustomSites((prevSites) =>
          prevSites.map((s) => (s.id === site.id ? newSite : s))
        );
      }
      //form.reset();
      close();
    },
    [close, setCustomSites, site]
  );
  return (
    <Modal
      transitionProps={{ transition: "slide-up" }}
      centered
      opened={opened}
      onClose={close}
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      title={
        <Group gap="xs" justify="center" align="center">
          <IconWorldStar size={20} />
          <Text fw="bold">Add Custom Site</Text>
        </Group>
      }
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap="sm">
          <TextInput
            withAsterisk
            key={form.key("name")}
            label="Name"
            placeholder="Google"
            size="md"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            key={form.key("url")}
            label="Url"
            placeholder="https://www.google.com"
            size="md"
            {...form.getInputProps("url")}
          />
          <TextInput
            key={form.key("imageSrc")}
            label="Image Url"
            placeholder="https://www.google.com/logo.png"
            size="md"
            {...form.getInputProps("imageSrc")}
          />
          <Button size="md" type="submit">
            Add Site
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
