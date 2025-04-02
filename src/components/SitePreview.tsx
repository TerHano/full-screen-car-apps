import {
  LoadingOverlay,
  Image,
  Box,
  Text,
  Stack,
  Card,
  Flex,
} from "@mantine/core";
import { useGetSiteImage } from "../hooks/useGetSiteImage";
import { useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { AddCustomSiteFormValues } from "./CustomSiteModal";

const imagePreviewHeight = 150;
const imagePreviewWidth = 300;

export const SitePreview = ({
  imageQuery,
  form,
}: {
  imageQuery: ReturnType<typeof useGetSiteImage>;
  form: UseFormReturnType<AddCustomSiteFormValues>;
}) => {
  const [siteName, setSiteName] = useState<string>(form.getValues().name);
  const {
    data: { imageUrl },
    isLoading,
  } = imageQuery;
  form.watch("name", ({ value }) => {
    setSiteName(value);
  });

  return (
    <Stack gap="xs" align="center">
      <Text fs="italic" fw="bold">
        Site Preview
      </Text>
      <Card withBorder>
        <Stack gap="xs" w="100%" justify="center" align="center">
          <Box h={imagePreviewHeight} w={imagePreviewWidth} pos="relative">
            {imageUrl ? (
              <Image
                h={imagePreviewHeight}
                w={imagePreviewWidth}
                src={imageUrl}
                fallbackSrc="https://placehold.co/800x400?text=Image+Here"
                radius="lg"
              />
            ) : (
              <Card
                radius="lg"
                bg="black"
                h={imagePreviewHeight}
                w={imagePreviewWidth}
              >
                <Flex align="center" justify="center" h="100%">
                  <SiteNamePreview siteNameInput={siteName} />
                </Flex>
              </Card>
            )}

            <LoadingOverlay
              loaderProps={{ color: "blue", type: "bars" }}
              overlayProps={{ radius: "lg" }}
              w={imagePreviewWidth}
              visible={isLoading}
            />
          </Box>
          <SiteNamePreview siteNameInput={siteName} />
        </Stack>
      </Card>
    </Stack>
  );
};

const SiteNamePreview = ({
  siteNameInput,
}: {
  siteNameInput: string | null;
}) => {
  const isSiteInputEmpty = siteNameInput === null || siteNameInput === "";

  return isSiteInputEmpty ? (
    <Text fs="italic" c="dark">
      Site Name Here
    </Text>
  ) : (
    <Text maw={imagePreviewWidth} truncate="end" fw="bold">
      {siteNameInput}
    </Text>
  );
};
