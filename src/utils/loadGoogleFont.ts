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
      name: "Merriweather",
      data: loadFont("Merriweather_24pt-Regular.ttf"),
      weight: 400,
      style: "normal",
    },
    {
      name: "Merriweather",
      data: loadFont("Merriweather_24pt-Bold.ttf"),
      weight: 700,
      style: "bold",
    },
  ];

  return fonts;
}
