import { Image } from "expo-image";
import { type ArtworkImage } from "./artwork-assets";

export function Artwork({
  image,
  width,
  radius = 0,
}: {
  image: ArtworkImage;
  width: number;
  radius?: number;
}) {
  return (
    <Image
      accessible={false}
      source={image.source}
      contentFit="cover"
      style={{ width, aspectRatio: image.aspectRatio, borderRadius: radius }}
    />
  );
}
