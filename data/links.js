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

  {
    title: "ラズパイ学習用サイト",
    url: "https://agrimuitobom.github.io/rasp/",
    category: "material",
    description: "Raspberry Pi を学ぶときの基本的な電子工作とプログラムをまとめた学習用サイト。LED やセンサーの配線から、動かすところまで順に追えます。",
    kind: "site",
    tags: ["Raspberry Pi", "電子工作", "Python", "教材"],
    year: "2026",
    featured: true,
  },
  {
    title: "GLOBAL G.A.P 書類管理アプリ（FileMaker）",
    url: "https://agrimuitobom.github.io/sainou-dx/assets/docs/ggap-filemaker-poster.pdf",
    category: "school-dx",
    description: "GGAP 審査の膨大な書類を、FileMaker Pro のリレーショナルデータベースで管理。iPad の FileMaker Go から扱えます。審査準備の時間を 74.8%、紙を 1200 枚ほど削減しました（発表ポスター PDF）。",
    kind: "doc",
    tags: ["FileMaker", "GLOBAL G.A.P", "データベース", "iPad"],
    year: "2026",
    featured: true,
  },
  {
    title: "GGAP 書類管理アプリ（FileMaker ファイル）",
    url: "https://agrimuitobom.github.io/sainou-dx/assets/files/ggap-filemaker-template.fmp12",
    category: "school-dx",
    description: "上のアプリ本体を、データを空にした状態で配布しています。FileMaker Pro で開けば、テーブル構成やレイアウトをそのまま見られます。",
    kind: "app",
    tags: ["FileMaker", "GLOBAL G.A.P", "配布用"],
    year: "2026",
  },
  {
    title: "GAP Tracker（管理記録アプリ）",
    url: "https://gaptracker-a5fa0.web.app/",
    category: "school-dx",
    description: "播種記録や肥料使用記録など、FileMaker 版では扱えなかった作業記録をブラウザから入力・管理できるようにしたアプリ。",
    kind: "app",
    tags: ["GLOBAL G.A.P", "作業記録", "Web アプリ"],
    year: "2026",
    featured: true,
  },
  {
    title: "第8回中高生情報学研究コンテスト 発表ページ",
    url: "https://sites.google.com/view/88postersession",
    category: "material",
    description: "GGAP 書類管理アプリの取り組みで全国大会に出場したときのポスターセッションのページ。",
    kind: "site",
    tags: ["発表", "コンテスト", "全国大会"],
    year: "2026",
  },

  // === ここから下に Issue から追加された項目が入ります ===
  // ↓ この目印の行は消さないでください（自動追加の目印です）
  /* AUTO-INSERT:LINKS */
];
