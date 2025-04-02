import {
  Modal,
  TextInput,
  Button,
  Group,
  Text,
  Flex,
  Stack,
} from "@mantine/core";
import { useForm, matches } from "@mantine/form";
import { SiteInfo, SiteType } from "../hooks/useAvailableSites";
import { v4 as uuidv4 } from "uuid";
import { useCallback } from "react";
import {
  IconCornerRightUp,
  IconWorldMinus,
  IconWorldStar,
} from "@tabler/icons-react";
import { useGetSiteImage } from "../hooks/useGetSiteImage";
import { SitePreview } from "./SitePreview";
import { useCustomSites } from "../hooks/useCustomSites";
import { validUrlRegex } from "../util";
import { useDebouncedState } from "@mantine/hooks";

export interface AddCustomSiteFormValues {
  name: string;
  url: string;
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
  return (
    <Modal
      size="lg"
      transitionProps={{ transition: "slide-up" }}
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
          <Text fw="bold">{site ? "Edit Custom Site" : "Add Custom Site"}</Text>
        </Group>
      }
    >
      <CustomSiteModalBody close={close} site={site} />
    </Modal>
  );
};

interface CustomSiteModalBodyProps {
  site?: SiteInfo;
  close: () => void;
}

const CustomSiteModalBody = ({ site, close }: CustomSiteModalBodyProps) => {
  const {
    add: addCustomSite,
    remove: removeCustomSite,
    update: updateCustomSite,
  } = useCustomSites();
  const [imageUrl, setImageUrl] = useDebouncedState<string | null>(null, 800, {
    leading: true,
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: site?.name ?? "",
      url: site?.link ?? "",
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Name must be at least 3 characters" : null,
      url: matches(validUrlRegex, "Invalid URL"),
    },
    onValuesChange(values) {
      setImageUrl(values.url);
    },
  });

  const imageQuery = useGetSiteImage(imageUrl, {
    initialValue: site?.imageSrc
      ? {
          success: true,
          siteTitle: "",
          imageUrl: site.imageSrc,
        }
      : undefined,
  });
  const {
    data: { imageUrl: openGraphImageUrl, siteTitle },

    isLoading: isImageLoading,
  } = imageQuery;

  const deleteSite = useCallback(() => {
    if (site) {
      removeCustomSite(site.id);
      close();
    }
  }, [close, removeCustomSite, site]);

  const handleSubmit = useCallback(
    async (values: AddCustomSiteFormValues) => {
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
        imageSrc: openGraphImageUrl ?? undefined,
        imageAlt: openGraphImageUrl ? `${values.name} Logo` : undefined,
        link: values.url,
        type: SiteType.CUSTOM,
      };
      if (!site) {
        addCustomSite(newSite);
      } else {
        updateCustomSite(site.id, newSite);
      }
      form.setInitialValues(values);
      close();
    },
    [site, openGraphImageUrl, form, close, addCustomSite, updateCustomSite]
  );

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap="md">
        <SitePreview form={form} imageQuery={imageQuery} />
        <TextInput
          withAsterisk
          key={form.key("url")}
          label="Url"
          placeholder="https://www.google.com"
          size="md"
          {...form.getInputProps("url")}
        />
        <Stack align="flex-start" gap={2}>
          <TextInput
            w="100%"
            withAsterisk
            key={form.key("name")}
            label="Name"
            placeholder="Google"
            size="md"
            {...form.getInputProps("name")}
          />
          {siteTitle ? (
            <Group gap="xs">
              <Text fz="xs">Suggested Title:</Text>
              <Button
                onClick={() => {
                  form.setValues({ name: siteTitle });
                }}
                variant="transparent"
                size="compact-sm"
                rightSection={<IconCornerRightUp size={12} />}
              >
                <Text truncate size="xs" fw="unset">
                  {siteTitle}
                </Text>
              </Button>
            </Group>
          ) : null}
        </Stack>
        <Group mt="md" justify={site ? "space-between" : "end"}>
          {site ? (
            <Button
              leftSection={<IconWorldMinus size={16} />}
              onClick={deleteSite}
              color="red"
            >
              Delete Site
            </Button>
          ) : null}

          <Group gap="xs">
            <Button color="gray" variant="light" onClick={close}>
              Cancel
            </Button>
            <Button disabled={isImageLoading} type="submit">
              {site ? "Update Site" : " Add Site"}
            </Button>
          </Group>
        </Group>
      </Flex>
    </form>
  );
};
