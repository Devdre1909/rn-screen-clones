import { artwork, type ArtworkImage } from "./artwork-assets";

export type App = {
  name: string;
  subtitle: string;
  image: ArtworkImage;
  action?: "Open" | "Get" | "cloud";
};
export const kings: App = {
  name: "9 Kings",
  subtitle: "A roguelike kingdom builder",
  image: artwork.kingsIcon,
};
export const cod: App = {
  name: "Call of Duty®: Mobile",
  subtitle: "Battle Royale & PvP\nFPS Action",
  image: artwork.codIcon,
  action: "Open",
};
export const youtube: App = {
  name: "YouTube",
  subtitle: "Videos, Music and\nLive Streams",
  image: artwork.youtubeIcon,
  action: "Open",
};
export const games: App[] = [
  {
    name: "Genshin Impact 6th Anniversary",
    subtitle: "Explore a World of Adventure",
    image: artwork.genshinIcon,
    action: "cloud",
  },
  {
    name: "Clash of Clans",
    subtitle: "Base Building Battle Strategy",
    image: artwork.clashOfClansIcon,
    action: "cloud",
  },
  {
    name: "Clash Royale",
    subtitle: "PvP Battle in Card Tower Duel",
    image: artwork.clashRoyaleIcon,
    action: "cloud",
  },
  {
    name: "Roblox",
    subtitle: "Play Millions of Games",
    image: artwork.robloxIcon,
  },
];
export const sports: App[] = [
  {
    name: "EA SPORTS FC™ Football…",
    subtitle: "Play Football the World's Game",
    image: artwork.fcMobileIcon,
    action: "cloud",
  },
  {
    name: "Top Eleven Be Football Manager",
    subtitle: "Your Club, Your League Tactics",
    image: artwork.topElevenIcon,
  },
  {
    name: "8 Ball Pool™",
    subtitle: "Online Multiplayer Pool Game",
    image: artwork.poolIcon,
  },
  {
    name: "Fishing Clash: Sport Simulator",
    subtitle: "Enjoy reel simulator games",
    image: artwork.fishingIcon,
  },
  {
    name: "F1® Clash - Official 2026 Game",
    subtitle: "Build Your Ultimate F1® Team",
    image: artwork.f1Icon,
  },
];

export const snapchat: App = {
  name: "Snapchat: Chat with friends",
  subtitle: "Share the moment",
  image: artwork.snapchatIcon,
  action: "Open",
};
export const allApps = [kings, ...games, cod, youtube, ...sports];
