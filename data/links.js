/* =====================================================================
 * リンク集（このファイルを編集すれば、そのままサイトに反映されます）
 * ---------------------------------------------------------------------
 * ■ 追加のしかた
 *   1. 下の window.LINKS = [ ... ] の中に、{ } のかたまりを 1 つ足す
 *   2. 前のかたまりの最後に , （カンマ）があるか確認する
 *   3. 保存して push（GitHub のウェブ画面から直接編集しても OK）
 *
 * ■ 書ける項目
 *   title       … 表示名（必須）
 *   url         … リンク先（必須。QR コードもこの URL から作られます）
 *   category    … 下の CATEGORIES の id から選ぶ（無い場合は "other"）
 *   description … 1〜2 行の説明
 *   kind        … "github" / "site" / "slide" / "doc" / "video" / "form" / "app"
 *   tags        … ["Python", "M5Stack"] のような目印。検索でも引っかかります
 *   year        … "2025" など。新しい順に並べたいときの目安
 *   featured    … true にすると先頭の「注目」欄にも出ます
 *   sample      … サンプル行の印。自分のものを書いたら消してください
 * ===================================================================== */

/* カテゴリ（並び順＝タブの並び順）。増やす・減らすのも自由です。 */
window.CATEGORIES = [
  { id: "smart-agri", name: "スマート農業", icon: "🌱", description: "センサー・IoT・データ活用で栽培や飼育を支える取り組み" },
  { id: "school-dx",  name: "校内 DX",      icon: "🏫", description: "実習記録・出席・在庫管理など、学校の仕事をデジタルに" },
  { id: "student",    name: "生徒プロジェクト", icon: "🧑‍🌾", description: "課題研究・部活動で生徒が作ったもの" },
  { id: "material",   name: "資料・スライド", icon: "📚", description: "発表資料、手順書、授業で使える教材" },
  { id: "other",      name: "その他",        icon: "🔗", description: "上のどれにも当てはまらないもの" },
];

window.LINKS = [
  {
    title: "西農 DX アーカイブ（このサイト）",
    url: "https://github.com/agrimuitobom/sainou-dx",
    category: "other",
    description: "この展示サイトのソースコード。データファイルを書き換えるだけでリンクを追加できます。",
    kind: "github",
    tags: ["HTML", "GitHub Pages"],
    year: "2026",
    featured: true,
  },

  /* ↓ ここから下はサンプルです。中身を自分の取り組みに書き換えるか、
        丸ごと削除してから公開してください。 */
  {
    title: "ハウス環境モニタリング",
    url: "https://example.com/replace-me",
    category: "smart-agri",
    description: "温度・湿度・CO2 を計測してグラフ化する仕組み。（サンプル：URL と説明を差し替えてください）",
    kind: "github",
    tags: ["M5Stack", "センサー", "Ambient"],
    year: "2025",
    featured: true,
    sample: true,
  },
  {
    title: "実習日誌のデジタル化",
    url: "https://example.com/replace-me",
    category: "school-dx",
    description: "紙で書いていた実習日誌をフォームと表計算で置き換えた事例。（サンプル）",
    kind: "doc",
    tags: ["Google Workspace", "業務改善"],
    year: "2024",
    sample: true,
  },
  {
    title: "課題研究：画像で果実の熟度を判定",
    url: "https://example.com/replace-me",
    category: "student",
    description: "スマホで撮った写真から収穫適期を推定する試み。（サンプル）",
    kind: "github",
    tags: ["Python", "画像処理", "課題研究"],
    year: "2025",
    sample: true,
  },
  {
    title: "さんフェア発表スライド",
    url: "https://example.com/replace-me",
    category: "material",
    description: "全国産業教育フェアでの発表資料。（サンプル）",
    kind: "slide",
    tags: ["発表", "さんフェア"],
    year: "2026",
    sample: true,
  },

  // === ここから下に Issue から追加された項目が入ります ===
  // ↓ この目印の行は消さないでください（自動追加の目印です）
  /* AUTO-INSERT:LINKS */
];
