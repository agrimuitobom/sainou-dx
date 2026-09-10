/*
 * Issue フォームの内容を data/*.js に追記するスクリプト
 *   使い方（GitHub Actions から呼ばれます）:
 *     ISSUE_KIND=link|achievement ISSUE_BODY="..." node scripts/issue-to-data.mjs
 *   結果の文言は標準出力へ、Issue に返すコメントは RESULT_FILE に書き出します。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kind = process.env.ISSUE_KIND;
const body = process.env.ISSUE_BODY || "";
const resultFile = process.env.RESULT_FILE;

/* --- Issue フォームの本文をラベルごとに分解する ------------------ */
function parseIssueForm(text) {
  const out = {};
  const blocks = text.split(/^### +/m).slice(1);
  for (const block of blocks) {
    const nl = block.indexOf("\n");
    const label = (nl === -1 ? block : block.slice(0, nl)).trim();
    const value = (nl === -1 ? "" : block.slice(nl + 1)).trim();
    out[label] = value === "_No response_" || value === "_未入力_" ? "" : value;
  }
  return out;
}

const fields = parseIssueForm(body);
const get = (label) => (fields[label] || "").trim();
const checked = (label) => /- \[[xX]\]/.test(fields[label] || "");
const splitTags = (s) =>
  s.split(/[,、]/).map((t) => t.trim()).filter(Boolean).slice(0, 8);

/* --- データファイルを読んで、いまの状態を把握する ---------------- */
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["data/links.js", "data/achievements.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
}
const CATEGORIES = sandbox.window.CATEGORIES || [];
const LINKS = sandbox.window.LINKS || [];

const CATEGORY_BY_NAME = new Map(CATEGORIES.map((c) => [c.name, c.id]));
const KIND_BY_NAME = new Map([
  ["リポジトリ", "github"], ["サイト", "site"], ["スライド", "slide"],
  ["資料", "doc"], ["動画", "video"], ["フォーム", "form"], ["アプリ", "app"],
]);

function fail(message) {
  if (resultFile) fs.writeFileSync(resultFile, message);
  console.error(message);
  process.exit(1);
}

function checkUrl(url, label) {
  if (!/^https:\/\/[^\s"'<>]+$/i.test(url) && !/^http:\/\/[^\s"'<>]+$/i.test(url)) {
    fail(`${label} が「https://」で始まる形になっていません（入力: ${url || "空欄"}）。`);
  }
}

/* --- 追記する 1 件分のコードを組み立てる ------------------------- */
const S = (v) => JSON.stringify(String(v)); // 引用符や改行を安全に処理する
const arr = (list) => "[" + list.map(S).join(", ") + "]";

let file, marker, entry, summary;

if (kind === "link") {
  const title = get("表示名");
  const url = get("URL");
  const categoryName = get("カテゴリ");
  const kindName = get("種類");
  const description = get("説明").replace(/\s*\n\s*/g, " ");
  const tags = splitTags(get("タグ"));
  const year = get("年");
  const featured = checked("目立たせる");

  if (!title) fail("「表示名」が空欄です。");
  checkUrl(url, "URL");
  if (LINKS.some((l) => l.url === url)) {
    fail(`この URL はすでにリンク集にあります（${url}）。追加は見送りました。`);
  }

  const lines = ["  {", `    title: ${S(title)},`, `    url: ${S(url)},`];
  lines.push(`    category: ${S(CATEGORY_BY_NAME.get(categoryName) || "other")},`);
  if (description) lines.push(`    description: ${S(description)},`);
  lines.push(`    kind: ${S(KIND_BY_NAME.get(kindName) || "site")},`);
  if (tags.length) lines.push(`    tags: ${arr(tags)},`);
  if (year) lines.push(`    year: ${S(year)},`);
  if (featured) lines.push("    featured: true,");
  lines.push("  },");

  file = "data/links.js";
  marker = "/* AUTO-INSERT:LINKS */";
  entry = lines.join("\n");
  summary = `リンク「${title}」を ${categoryName || "その他"} に追加`;
} else if (kind === "achievement") {
  const date = get("時期");
  const title = get("見出し");
  const text = get("内容").replace(/\s*\n\s*/g, " ");
  const tags = splitTags(get("タグ"));
  const linkUrl = get("関連リンクの URL");
  const linkLabel = get("関連リンクの表示名") || "リンク";

  if (!date) fail("「時期」が空欄です。");
  if (!title) fail("「見出し」が空欄です。");
  if (linkUrl) checkUrl(linkUrl, "関連リンクの URL");

  const lines = ["  {", `    date: ${S(date)},`, `    title: ${S(title)},`];
  if (text) lines.push(`    body: ${S(text)},`);
  if (tags.length) lines.push(`    tags: ${arr(tags)},`);
  if (linkUrl) lines.push(`    links: [{ label: ${S(linkLabel)}, url: ${S(linkUrl)} }],`);
  lines.push("  },");

  file = "data/achievements.js";
  marker = "/* AUTO-INSERT:ACHIEVEMENTS */";
  entry = lines.join("\n");
  summary = `実績「${title}」（${date}）を年表に追加`;
} else {
  fail(`種類が判別できませんでした（ISSUE_KIND=${kind}）。`);
}

/* --- 目印の場所へ差し込む ---------------------------------------- */
const target = path.join(root, file);
const source = fs.readFileSync(target, "utf8");
if (!source.includes(marker)) {
  fail(`${file} の目印（${marker}）が見つかりませんでした。手で消してしまったかもしれません。`);
}
fs.writeFileSync(target, source.replace(marker, `${marker}\n${entry}`));

if (resultFile) fs.writeFileSync(resultFile, summary);
console.log(summary);
