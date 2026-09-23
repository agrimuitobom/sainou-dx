/* =====================================================================
 * DX の実績・あゆみ（年表として表示されます）
 * ---------------------------------------------------------------------
 * 新しいものを上に足していくと、そのままの順で表示されます。
 *   date   … "2025.04" や "2025年度" など自由な文字列（必須）
 *   title  … 見出し（必須）
 *   body   … 何をして、何が変わったのか
 *   tags   … ["スマート農業"] のような目印
 *   links  … [{ label: "リポジトリ", url: "https://..." }] 関連リンク（省略可）
 *   sample … サンプル行の印。書き換えたら消してください
 * ===================================================================== */

window.ACHIEVEMENTS = [
  // ↓ この目印の行は消さないでください（Issue から追加された項目がここに入ります）
  /* AUTO-INSERT:ACHIEVEMENTS */
  {
    date: "2026.09",
    title: "取り組みをまとめた公開ポータルを開設",
    body: "これまでの実践と公開しているアプリ・資料を 1 つの URL に集約し、QR コードから誰でも見られるようにしました。",
    tags: ["情報発信"],
    links: [{ label: "ソースコード", url: "https://github.com/agrimuitobom/sainou-dx" }],
  },
  {
    date: "2026年度",
    title: "作業記録もアプリで管理（GAP Tracker）",
    body: "FileMaker 版では扱えなかった播種記録・肥料使用記録などを、ブラウザから入力・管理できるようにしました。書類だけでなく日々の記録まで紙から離れました。",
    tags: ["GLOBAL G.A.P", "作業記録", "Web アプリ"],
    links: [{ label: "GAP Tracker", url: "https://gaptracker-a5fa0.web.app/" }],
  },
  {
    date: "2026.03",
    title: "第8回中高生情報学研究コンテストで全国大会に出場",
    body: "GGAP の書類管理を DX した取り組みを、情報処理学会全国大会のポスターセッションで発表しました。",
    tags: ["発表", "コンテスト"],
    links: [
      { label: "発表ページ", url: "https://sites.google.com/view/88postersession" },
      { label: "ポスター（PDF）", url: "https://agrimuitobom.github.io/sainou-dx/assets/docs/ggap-filemaker-poster.pdf" },
    ],
  },
  {
    date: "2025年度",
    title: "GLOBAL G.A.P の書類管理を FileMaker でアプリ化",
    body: "年 1 回の審査に向けた膨大な書類を、科目「農業と情報」で学んだリレーショナルデータベースでカスタムアプリにしました。審査準備の時間を 74.8% 短縮、紙を 1200 枚ほど削減、審査そのものも 2 日から 1 日に短くなりました。",
    tags: ["GLOBAL G.A.P", "FileMaker", "業務改善"],
    links: [{ label: "発表ポスター（PDF）", url: "https://agrimuitobom.github.io/sainou-dx/assets/docs/ggap-filemaker-poster.pdf" }],
  },
  {
    date: "令和5年度",
    title: "GLOBAL G.A.P 認証への取り組みを開始",
    body: "サラダナを品目として、国際的な農業生産工程管理の認証に取り組みはじめました。ここで生まれた「書類が多すぎる」という課題が、その後の DX の出発点になっています。",
    tags: ["GLOBAL G.A.P"],
  },
];
