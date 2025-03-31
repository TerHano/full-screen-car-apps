import {
  LoadingOverlay,
  Image,
  Box,
  Text,
  Stack,
  Button,
  Card,
  Flex,
} from "@mantine/core";
import { useGetSiteImage } from "../hooks/useGetSiteImage";

const imagePreviewHeight = 150;
const imagePreviewWidth = 300;

export const SitePreview = ({
  imageQuery,
  siteNameInputValue,
  onSuggestedTitleClick,
}: {
  onSuggestedTitleClick: () => void;
  siteNameInputValue: string | null;
  imageQuery: ReturnType<typeof useGetSiteImage>;
}) => {
  const {
    data: { imageUrl, siteTitle },
    isLoading,
  } = imageQuery;
  console.log(imageUrl);
  return (
    <Stack gap="xs" w="100%" justify="center" align="center">
      <Text>Site Preview</Text>
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
              <SiteNamePreview siteNameInput={siteNameInputValue} />
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
      <SiteNamePreview siteNameInput={siteNameInputValue} />

      {siteTitle ? (
        <Button onClick={onSuggestedTitleClick} variant="subtle" size="xs">
          <Text
            maw={imagePreviewWidth}
            truncate
            size="xs"
            fw="unset"
          >{`Use suggested title: '${siteTitle}'`}</Text>
        </Button>
      ) : null}
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
