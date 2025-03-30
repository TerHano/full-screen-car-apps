export interface SiteInfo {
  name: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
  type: SiteType;
}

export enum SiteType {
  MEDIA = "media",
  GAMES = "game",
  WEB_PAGES = "web_page",
}

import maxLogo from "../assets/images/max_logo.jpeg";
import crunchyRollLogo from "../assets/images/crunchyroll_logo.webp";
import amazonPrimeLogo from "../assets/images/amazon_prime_logo.webp";
import paramountLogo from "../assets/images/paramount_logo.png";
import plexLogo from "../assets/images/plex_logo.jpeg";
import geforceNowLogo from "../assets/images/geforce_now_logo.webp";
import xboxCloudLogo from "../assets/images/xbox_cloud_logo.png";
import lunaLogo from "../assets/images/luna_logo.png";
import redditLogo from "../assets/images/reddit_logo.svg";

export const useAvailableSites = (siteType?: SiteType) => {
  const mediaSites: SiteInfo[] = [
    {
      name: "Max",
      link: "https://www.max.com",
      imageSrc: maxLogo,
      imageAlt: "Max Logo",
      type: SiteType.MEDIA,
    },
    {
      name: "Crunchyroll",
      link: "https://www.crunchyroll.com",
      imageSrc: crunchyRollLogo,
      imageAlt: "Crunchyroll Logo",
      type: SiteType.MEDIA,
    },
    {
      name: "Prime Video",
      link: "https://www.primevideo.com",
      imageSrc: amazonPrimeLogo,
      imageAlt: "Amazon Prime Video Logo",
      type: SiteType.MEDIA,
    },
    {
      name: "Paramount+",
      link: "https://www.paramountplus.com/",
      imageSrc: paramountLogo,
      imageAlt: "Paramount+ Logo",
      type: SiteType.MEDIA,
    },
    {
      name: "Plex",
      link: "https://app.plex.tv",
      imageSrc: plexLogo,
      imageAlt: "Plex Logo",
      type: SiteType.MEDIA,
    },
  ];

  const gameSites: SiteInfo[] = [
    {
      name: "GeForce NOW",
      link: "https://play.geforcenow.com/",
      imageSrc: geforceNowLogo,
      imageAlt: "GeForce NOW Logo",
      type: SiteType.GAMES,
    },
    {
      name: "Xbox Cloud",
      link: "https://www.xbox.com/en-us/play",
      imageSrc: xboxCloudLogo,
      imageAlt: "Xbox Cloud Logo",
      type: SiteType.GAMES,
    },
    {
      name: "Luna",
      link: "https://luna.amazon.com/",
      imageSrc: lunaLogo,
      imageAlt: "Luna Logo",
      type: SiteType.GAMES,
    },
  ];

  const webPageSites: SiteInfo[] = [
    {
      name: "Reddit",
      link: "https://www.reddit.com",
      imageSrc: redditLogo,
      imageAlt: "Reddit Logo",
      type: SiteType.WEB_PAGES,
    },
  ];

  switch (siteType) {
    case SiteType.MEDIA:
      return { sites: mediaSites };
    case SiteType.GAMES:
      return { sites: gameSites };
    case SiteType.WEB_PAGES:
      return { sites: webPageSites };
    default:
      return { sites: [...mediaSites, ...gameSites, ...webPageSites] };
  }
};
