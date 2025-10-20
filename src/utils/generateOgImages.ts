import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

import { initWasm, Resvg } from "@resvg/resvg-wasm";
import path from "path";
import fs from "fs";

const wasmPath = path.resolve(
  process.cwd(),
  "node_modules/@resvg/resvg-wasm/index_bg.wasm"
);
const wasmBytes = fs.readFileSync(wasmPath);
await initWasm(wasmBytes);

export async function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}
