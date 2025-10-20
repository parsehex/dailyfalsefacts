import fs from "fs";
import path from "path";

export default async function loadGoogleFonts() {
  const fontsDir = path.resolve("./src/assets/fonts");

  const loadFont = (file: string) => {
    const buffer = fs.readFileSync(path.join(fontsDir, file));
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  };

  const fonts = [
    {
      name: "IBM Plex Mono",
      data: loadFont("IBMPlexMono-Regular.ttf"),
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: loadFont("IBMPlexMono-Bold.ttf"),
      weight: 700,
      style: "bold",
    },
  ];

  return fonts;
}
