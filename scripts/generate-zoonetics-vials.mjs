import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "images", "zoonetics-products");
const basePath = path.join(outDir, "vial-base-v2.png");
const logoPath = path.join(root, "public", "brand", "zoonetics-primary-reversed.svg");

const products = [
  { file: "k9-reforge.png", name: "K9 REFORGE", formula: "BPC-157", strength: "5 · 10 · 20 MG", accent: "#72A7FF" },
  { file: "k9-reload.png", name: "K9 RELOAD", formula: "TB-500", strength: "5 · 10 · 20 MG", accent: "#8FB4D5" },
  { file: "k9-rebuild.png", name: "K9 REBUILD", formula: "BPC-157 + TB-500", strength: "10 · 20 MG", accent: "#FF8A72" },
  { file: "k9-restore.png", name: "K9 RESTORE", formula: "GHK-CU", strength: "50 MG", accent: "#B7A0FF" },
  { file: "k9-reclaim.png", name: "K9 RECLAIM", formula: "KPV · INJECTABLE + ORAL", strength: "10 MG · 500 MCG", accent: "#77C9A1" },
  { file: "k9-recast.png", name: "K9 RECAST", formula: "GHK-CU + BPC-157 + TB-500", strength: "70 MG", accent: "#F0B76F" },
];

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

await mkdir(outDir, { recursive: true });
const logo = await sharp(await readFile(logoPath)).resize({ width: 470 }).png().toBuffer();

for (const product of products) {
  const label = Buffer.from(`
    <svg width="1024" height="1536" xmlns="http://www.w3.org/2000/svg">
      <style>
        .sans { font-family: Arial, Helvetica, sans-serif; }
      </style>
      <text x="512" y="812" text-anchor="middle" class="sans" fill="#AFC5E8" font-size="19" font-weight="700" letter-spacing="6">K9 RESEARCH SERIES</text>
      <rect x="326" y="846" width="372" height="2" fill="${product.accent}" opacity="0.8"/>
      <text x="512" y="930" text-anchor="middle" class="sans" fill="#FFFFFF" font-size="58" font-weight="800" letter-spacing="1">${escapeXml(product.name)}</text>
      <text x="512" y="995" text-anchor="middle" class="sans" fill="${product.accent}" font-size="31" font-weight="700" letter-spacing="1.5">${escapeXml(product.formula)}</text>
      <text x="512" y="1070" text-anchor="middle" class="sans" fill="#FFFFFF" font-size="45" font-weight="500" letter-spacing="2">${escapeXml(product.strength)}</text>
      <rect x="405" y="1110" width="214" height="4" rx="2" fill="${product.accent}"/>
      <text x="512" y="1164" text-anchor="middle" class="sans" fill="#E7ECF5" font-size="23" font-weight="600" letter-spacing="7">RESEARCH USE ONLY</text>
      <text x="512" y="1202" text-anchor="middle" class="sans" fill="#AFC5E8" font-size="16" font-weight="600" letter-spacing="4">LOT-LEVEL COA</text>
    </svg>
  `);

  await sharp(basePath)
    .composite([
      { input: logo, left: 277, top: 674 },
      { input: label, left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, product.file));
}

console.log(`Generated ${products.length} ZooNetics product vial assets in ${outDir}`);
