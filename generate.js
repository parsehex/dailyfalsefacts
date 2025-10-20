import fs from "fs";
import path from "path";
import facts from "./src/data/old-false-facts.json" with { type: "json" };

const outDir = path.resolve("src/data/blog/old-false-facts");
fs.mkdirSync(outDir, { recursive: true });

const numPerPost = 4;
const posts = Math.floor(facts.length / numPerPost);
const startDate = new Date("2025-10-18");

for (let i = 0; i < posts; i++) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + i);

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  const filename = `${y}-${m}-${d}.md`;
  const filePath = path.join(outDir, filename);

  const fact1 = facts[i * numPerPost];
  const fact2 = facts[i * numPerPost + 1];
  const fact3 = facts[i * numPerPost + 2];
  const fact4 = facts[i * numPerPost + 3];

  const md = `---
pubDatetime: ${y}-${m}-${d}T12:00:00Z
title: "False Facts"
tags: [old-false-facts]
---

- ${fact1}
- ${fact2}
- ${fact3}
- ${fact4}
`;

  fs.writeFileSync(filePath, md, "utf8");
}

console.log(`✅ Generated ${posts} posts in ${outDir}`);
