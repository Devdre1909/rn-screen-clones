export type ArtworkImage = { source: number; aspectRatio: number };

export const artwork = {
  kingsArt: {
    source: require("../../../assets/app-store/kings-art.png"),
    aspectRatio: 1056 / 683,
  },
  codArt: {
    source: require("../../../assets/app-store/cod-art.png"),
    aspectRatio: 1053 / 715,
  },
  shortsArt: {
    source: require("../../../assets/app-store/shorts-art.png"),
    aspectRatio: 1056 / 776,
  },
  motorbikeArt: {
    source: require("../../../assets/app-store/motorbike-art.png"),
    aspectRatio: 1056 / 817,
  },
  avatar: {
    source: require("../../../assets/app-store/avatar.png"),
    aspectRatio: 131 / 131,
  },
  kingsIcon: {
    source: require("../../../assets/app-store/kings-icon.png"),
    aspectRatio: 142 / 142,
  },
  codIcon: {
    source: require("../../../assets/app-store/cod-icon.png"),
    aspectRatio: 142 / 142,
  },
  youtubeIcon: {
    source: require("../../../assets/app-store/youtube-icon.png"),
    aspectRatio: 142 / 142,
  },
  genshinIcon: {
    source: require("../../../assets/app-store/genshin-icon.png"),
    aspectRatio: 142 / 143,
  },
  clashOfClansIcon: {
    source: require("../../../assets/app-store/clash-of-clans-icon.png"),
    aspectRatio: 142 / 143,
  },
  clashRoyaleIcon: {
    source: require("../../../assets/app-store/clash-royale-icon.png"),
    aspectRatio: 142 / 142,
  },
  robloxIcon: {
    source: require("../../../assets/app-store/roblox-icon.png"),
    aspectRatio: 142 / 142,
  },
  fcMobileIcon: {
    source: require("../../../assets/app-store/fc-mobile-icon.png"),
    aspectRatio: 142 / 142,
  },
  topElevenIcon: {
    source: require("../../../assets/app-store/top-eleven-icon.png"),
    aspectRatio: 142 / 142,
  },
  poolIcon: {
    source: require("../../../assets/app-store/pool-icon.png"),
    aspectRatio: 142 / 143,
  },
  fishingIcon: {
    source: require("../../../assets/app-store/fishing-icon.png"),
    aspectRatio: 142 / 142,
  },
  f1Icon: {
    source: require("../../../assets/app-store/f1-icon.png"),
    aspectRatio: 142 / 142,
  },
  snapchatIcon: {
    source: require("../../../assets/app-store/snapchat-icon.png"),
    aspectRatio: 142 / 143,
  },
} satisfies Record<string, ArtworkImage>;
