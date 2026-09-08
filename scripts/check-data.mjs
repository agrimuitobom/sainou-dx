/*
 * data/*.js の書きかたをチェックするスクリプト
 *   使い方: node scripts/check-data.mjs
 * カンマの付け忘れや、必須項目の抜け、カテゴリ名の打ち間違いを見つけます。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = ["data/site.js", "data/links.js", "data/achievements.js"];

const sandbox = { window: {}, location: { href: "" } };
sandbox.globalThis = sandbox;
const context = vm.createContext(sandbox);

const errors = [];
const warnings = [];

for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  try {
    vm.runInContext(source, context, { filename: file });
  } catch (e) {
    errors.push(`${file} を読み込めませんでした: ${e.message}\n  → カンマ , や 引用符 " の閉じ忘れがないか確認してください。`);
  }
}

const { SITE = {}, LINKS = [], CATEGORIES = [], ACHIEVEMENTS = [] } = sandbox.window;
const KINDS = ["github", "site", "slide", "doc", "video", "form", "app"];
const categoryIds = CATEGORIES.map((c) => c.id);

if (!SITE.url || !/^https?:\/\//.test(SITE.url)) {
  errors.push('data/site.js: url は "https://..." の形で書いてください（QR コードのもとになります）。');
}
if (!SITE.title) errors.push("data/site.js: title が空です。");

const seen = new Map();
LINKS.forEach((link, i) => {
  const where = `data/links.js の ${i + 1} 番目（${link.title || "無題"}）`;
  if (!link.title) errors.push(`${where}: title がありません。`);
  if (!link.url || !/^https?:\/\//.test(link.url)) {
    errors.push(`${where}: url は "https://..." の形で書いてください。`);
  } else if (seen.has(link.url) && !link.sample) {
    warnings.push(`${where}: ${seen.get(link.url)} と URL が重複しています。`);
  } else if (!link.sample) {
    seen.set(link.url, where);
  }
  if (link.category && !categoryIds.includes(link.category)) {
    errors.push(`${where}: category "${link.category}" は CATEGORIES にありません（使えるのは ${categoryIds.join(", ")}）。`);
  }
  if (link.kind && !KINDS.includes(link.kind)) {
    warnings.push(`${where}: kind "${link.kind}" は未対応です（${KINDS.join(", ")}）。`);
  }
  if (/example\.com/.test(link.url || "")) {
    warnings.push(`${where}: サンプルの URL のままです。`);
  }
});

ACHIEVEMENTS.forEach((item, i) => {
  const where = `data/achievements.js の ${i + 1} 番目（${item.title || "無題"}）`;
  if (!item.title) errors.push(`${where}: title がありません。`);
  if (!item.date) warnings.push(`${where}: date（"2025.04" など）を入れると並びが分かりやすくなります。`);
});

const ids = new Set();
CATEGORIES.forEach((c) => {
  if (!c.id || !c.name) errors.push(`data/links.js の CATEGORIES: id と name は必須です。`);
  if (ids.has(c.id)) errors.push(`data/links.js の CATEGORIES: id "${c.id}" が重複しています。`);
  ids.add(c.id);
});

console.log(`リンク ${LINKS.length} 件 / カテゴリ ${CATEGORIES.length} 件 / 実績 ${ACHIEVEMENTS.length} 件`);
warnings.forEach((w) => console.log(`⚠ ${w}`));
errors.forEach((e) => console.error(`✖ ${e}`));

if (errors.length) {
  console.error(`\n${errors.length} 件の問題があります。上の行を直してください。`);
  process.exit(1);
}
console.log("✔ データの書きかたに問題はありません。");
