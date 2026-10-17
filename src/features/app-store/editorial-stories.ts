import { artwork, type ArtworkImage } from "./artwork-assets";
import { kings, cod, youtube, type App } from "./app-store-data";

export type StorySection = {
  title: string;
  body: string;
  image?: ArtworkImage;
  caption?: string;
};
export type EditorialStory = {
  id: string;
  art: ArtworkImage;
  color: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  badge?: string;
  app: App;
  introduction: string;
  sections: StorySection[];
};

export const stories: Record<string, EditorialStory> = {
  kings: {
    id: "kings",
    art: artwork.kingsArt,
    color: "#6d4bd2",
    eyebrow: "INCREDIBLE INDIE",
    title: "Vanquish royal rivals in\n9 Kings",
    subtitle:
      "Try to outlast your adversaries in this strategic kingdom builder.",
    app: kings,
    introduction:
      "Build a kingdom that can withstand anything. In 9 Kings, every decision shapes your next battle — and no two reigns are the same.",
    sections: [
      {
        title: "Build your own strategy",
        body: "Combine buildings, troops, and powerful upgrades to create a kingdom that plays your way. Make every tile count as your rivals grow stronger.",
      },
      {
        title: "One more reign",
        body: "Try a different king, experiment with a new combination, and see how long your kingdom can stand. Each run is another chance to discover a winning strategy.",
      },
    ],
  },
  cod: {
    id: "cod",
    art: artwork.codArt,
    color: "#202636",
    eyebrow: "SPECIAL EVENT",
    title: "It’s vampires v werewolves in Call of Duty: Mobile",
    subtitle: "Season 9’s got teeth!",
    badge: "HAPPENING NOW",
    app: cod,
    introduction:
      "The hunt is on. Step into a supernatural showdown as vampires and werewolves take over the battlefield in Call of Duty: Mobile.",
    sections: [
      {
        title: "Choose your side",
        body: "Join your squad and take on a new seasonal challenge. Bring your favourite loadout and keep an eye on the shadows.",
      },
      {
        title: "Make every match count",
        body: "Explore the seasonal event, discover new rewards, and put your teamwork to the test in fast-paced multiplayer battles.",
      },
    ],
  },
  shorts: {
    id: "shorts",
    art: artwork.shortsArt,
    color: "#ffa8a1",
    eyebrow: "TRY NOW",
    title: "5 tips and tricks for\nYouTube Shorts",
    app: youtube,
    introduction:
      "YouTube’s short-form video platform connects creators with audiences around the globe. Take your videos to the next level with the app’s handy features.",
    sections: [
      {
        title: "Keep everything in line",
        body: "Use the guidelines in the Shorts editor to line up your text, stickers, and clips. A few small adjustments can make your whole video feel more polished.",
        image: {
          source: require("../../../assets/app-store/shorts-editor.png"),
          aspectRatio: 931 / 1086,
        },
        caption:
          "Quickly align your elements using the guidelines in the Shorts editor.",
      },
      {
        title: "Create transitions quickly",
        body: "Want to pull off a seamless, almost magical transition between two shots? Use the Align feature. It creates a ghost overlay so you can position the subject of one video in the same spot as another. It’s an easy way to create your own blink-and-you’ll-miss-it Short.",
      },
      {
        title: "Easily add captions",
        body: "The Timeline feature makes adding text to sections of your video super-simple. Add helpful how-to steps, pithy captions, silly descriptions and more. You’ll see the Timeline option after you’ve selected your video clips and added your filters.",
        image: {
          source: require("../../../assets/app-store/capybara.png"),
          aspectRatio: 1056 / 611,
        },
        caption: "Find a new perspective with Green Screen.",
      },
      {
        title: "Find your soundtrack",
        body: "Find songs from the charts and original sounds by creators all over the world. After you’ve uploaded a clip, tap Add Sound or use the bookmark button to save a song for later.",
      },
      {
        title: "Get in the mix",
        body: "Remixing other creators’ Shorts with some of yours is a great way to put your own spin on the latest trends. When you come across a Short that inspires you, tap the Remix button to use its audio, splice it into a clip of your own or overlay a video of yourself.",
      },
    ],
  },
};
