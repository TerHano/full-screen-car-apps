import { Modal, TextInput, Button, Group, Text, Flex } from "@mantine/core";
import { useForm, matches } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { SiteInfo, SiteType } from "../hooks/useAvailableSites";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useState } from "react";
import { IconWorldStar } from "@tabler/icons-react";
import { useGetSiteImage } from "../hooks/useGetSiteImage";
import { SitePreview } from "./SitePreview";

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
  const [imageUrl, setImageUrl] = useState<string | null>(site?.link ?? null);
  const [siteNameInputValue, setSiteNameInputValue] = useState<string | null>(
    site?.name ?? null
  );
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
        /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi,
        "Invalid URL"
      ),
    },
  });

  form.watch("name", ({ value }) => {
    setSiteNameInputValue(value);
  });

  const getImageUrl = useCallback(() => {
    const urlVal = form.getValues().url;
    if (urlVal) {
      setImageUrl(urlVal);
    }
  }, [form]);

  const imageQuery = useGetSiteImage(imageUrl);
  const {
    data: { imageUrl: openGraphImageUrl, siteTitle },
    isLoading: isImageLoading,
  } = imageQuery;

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
        setCustomSites((prevSites) => [...prevSites, newSite]);
      } else {
        setCustomSites((prevSites) =>
          prevSites.map((s) => (s.id === site.id ? newSite : s))
        );
      }
      form.setInitialValues(values);
      close();
    },
    [close, form, openGraphImageUrl, setCustomSites, site]
  );

  return (
    <Modal
      transitionProps={{ transition: "slide-up" }}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      onExitTransitionEnd={() => {
        form.reset();
      }}
      title={
        <Group gap="xs" justify="center" align="center">
          <IconWorldStar size={20} />
          <Text fw="bold">{site ? "Edit Site" : "Add Custom Site"}</Text>
        </Group>
      }
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap="sm">
          <SitePreview
            onSuggestedTitleClick={() => {
              if (siteTitle) form.setFieldValue("name", siteTitle);
            }}
            siteNameInputValue={siteNameInputValue}
            imageQuery={imageQuery}
          />
          <TextInput
            onBlurCapture={getImageUrl}
            withAsterisk
            key={form.key("url")}
            label="Url"
            placeholder="https://www.google.com"
            size="md"
            {...form.getInputProps("url")}
          />
          <TextInput
            withAsterisk
            key={form.key("name")}
            label="Name"
            placeholder="Google"
            size="md"
            {...form.getInputProps("name")}
          />

          <Group justify="end">
            <Button color="gray" variant="light" onClick={close} size="md">
              Cancel
            </Button>

            <Button disabled={isImageLoading} size="md" type="submit">
              {site ? "Update Site" : " Add Site"}
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  );
};
