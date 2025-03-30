import { Card, Image, LoadingOverlay } from "@mantine/core";
import { SiteInfo } from "../../hooks/useAvailableSites";
import { useState } from "react";
import styles from "./SiteCard.module.css";

export interface SiteCardProps {
  site: SiteInfo;
  animationDelay?: number;
}

export const SiteCard = ({
  site: { imageAlt, imageSrc, link },
  animationDelay = 0,
}: SiteCardProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <Card
      onClick={() => {
        setLoading(true);
      }}
      shadow="sm"
      padding="xl"
      radius="lg"
      component="a"
      href={link}
      className={styles.cardAnimation}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <Card.Section>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "blue", type: "bars" }}
        />
        <Image src={imageSrc} h={150} w={300} alt={imageAlt} />
      </Card.Section>
    </Card>
  );
};
