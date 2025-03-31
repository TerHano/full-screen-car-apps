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

  return (
    <Stack gap="xs" w="100%" justify="center" align="center">
      <Text>Site Preview</Text>
      <Box h={100} w={200} pos="relative">
        {imageUrl ? (
          <Image
            h={100}
            w={200}
            src={imageUrl}
            fallbackSrc="https://placehold.co/800x400?text=Image+Here"
            radius="lg"
          />
        ) : (
          <Card radius="lg" bg="black" h={100} w={200}>
            <Flex align="center" justify="center" h="100%">
              <SiteNamePreview siteNameInput={siteNameInputValue} />
            </Flex>
          </Card>
        )}

        <LoadingOverlay
          loaderProps={{ color: "blue", type: "bars" }}
          overlayProps={{ radius: "lg" }}
          w={200}
          visible={isLoading}
        />
      </Box>
      <SiteNamePreview siteNameInput={siteNameInputValue} />

      {siteTitle ? (
        <Button onClick={onSuggestedTitleClick} variant="subtle" size="xs">
          <Text
            maw={300}
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
    <Text maw={300} truncate="end" fw="bold">
      {siteNameInput}
    </Text>
  );
};
