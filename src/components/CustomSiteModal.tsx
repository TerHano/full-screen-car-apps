import { Modal, TextInput, Button, Group, Text, Flex } from "@mantine/core";
import { useForm, matches } from "@mantine/form";
import { SiteInfo, SiteType } from "../hooks/useAvailableSites";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useState } from "react";
import { IconWorldMinus, IconWorldStar } from "@tabler/icons-react";
import { useGetSiteImage } from "../hooks/useGetSiteImage";
import { SitePreview } from "./SitePreview";
import { useCustomSites } from "../hooks/useCustomSites";
import { validUrlRegex } from "../util";

interface AddCustomSiteFormValues {
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
  const {
    add: addCustomSite,
    remove: removeCustomSite,
    update: updateCustomSite,
  } = useCustomSites();
  const [imageUrl, setImageUrl] = useState<string | null>(site?.link ?? null);
  const [siteNameInputValue, setSiteNameInputValue] = useState<string | null>(
    site?.name ?? null
  );
  const form = useForm<AddCustomSiteFormValues>({
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
  });

  form.watch("name", ({ value }) => {
    setSiteNameInputValue(value);
  });

  const imageQuery = useGetSiteImage(imageUrl, {
    enabled: opened,
  });
  const {
    data: { imageUrl: openGraphImageUrl, siteTitle },
    clearData,
    isLoading: isImageLoading,
  } = imageQuery;

  const deleteSite = useCallback(() => {
    if (site) {
      removeCustomSite(site.id);
    }
    close();
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

  useEffect(() => {
    form.setValues({
      name: site?.name ?? "",
      url: site?.link ?? "",
    });
    setImageUrl(site?.link ?? "");
    console.log(site);
  }, [site]);

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
      onExitTransitionEnd={() => {
        setImageUrl(null);
        clearData();
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
            onBlurCapture={() => {
              console.log("cap", form.getValues().url);

              setImageUrl(form.getValues().url);
            }}
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

          <Group justify={site ? "space-between" : "end"}>
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
    </Modal>
  );
};
