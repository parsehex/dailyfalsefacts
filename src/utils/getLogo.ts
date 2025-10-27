import fs from "fs";
import path from "path";

export function getLogoDataUri() {
	const logoPath = path.resolve("./public/logo-150px.png");
	const logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
	return `data:image/png;base64,${logoBase64}`;
}