# 西農 DX アーカイブ

広島県立西条農業高等学校の DX（デジタル・トランスフォーメーション）実践と、公開しているリポジトリ・資料をまとめたポータルサイトです。
さんフェアなどの展示で、**1 枚の QR コードから全部の取り組みへたどり着ける**ことを目指しています。

- 公開 URL: <https://agrimuitobom.github.io/sainou-dx/>
- 展示用 QR ポスター: <https://agrimuitobom.github.io/sainou-dx/qr.html>（ブラウザからそのまま A4 印刷できます）

---

## 1. リンクを追加する（いちばんよく使う操作）

編集するのは **`data/links.js`** の 1 ファイルだけです。GitHub のウェブ画面で鉛筆アイコンから直接編集できます。

```js
  {
    title: "ハウス環境モニタリング",          // 表示名（必須）
    url: "https://github.com/xxx/yyy",       // リンク先（必須／QR もここから作られます）
    category: "smart-agri",                  // カテゴリ（下の一覧から選ぶ）
    description: "温度・湿度・CO2 を記録してグラフ化する仕組み。",
    kind: "github",                          // 見た目のアイコン
    tags: ["M5Stack", "センサー"],            // 検索にも使われる目印
    year: "2025",                            // 新しいものが上に並びます
    featured: true,                          // true にすると先頭に出ます（省略可）
  },
```

**手順**

1. `data/links.js` を開く
2. `window.LINKS = [` … `];` の中に、上のような `{ ... },` を 1 つ足す
3. 保存（コミット）する → 1 分ほどで公開サイトに反映されます

**つまずきやすいところ**

- かたまりの最後の `,`（カンマ）を忘れない
- 文字は `"` で囲む。文中に `"` を使いたいときは `「」` に置き換えると安全
- 迷ったら手元で `node scripts/check-data.mjs` を実行するとチェックできます（GitHub 上でも自動で走ります）

### 使えるカテゴリ

`data/links.js` の先頭 `window.CATEGORIES` で定義しています。増やすのも自由です。

| id | 表示名 |
| --- | --- |
| `smart-agri` | スマート農業 |
| `school-dx` | 校内 DX |
| `student` | 生徒プロジェクト |
| `material` | 資料・スライド |
| `other` | その他 |

### 使える `kind`（カードの種類アイコン）

`github` / `site` / `slide` / `doc` / `video` / `form` / `app`

---

## 2. 実績（年表）を追加する

**`data/achievements.js`** に、新しいものを上から書き足します。

```js
  {
    date: "2026.05",
    title: "ドローンで生育状況を空撮",
    body: "何をして、何が変わったのかを 1〜2 行で。",
    tags: ["スマート農業"],
    links: [{ label: "発表資料", url: "https://..." }],   // 省略可
  },
```

---

## 3. サイト名・QR の URL を変える

**`data/site.js`** を編集します。

- `url` … QR コードにする公開 URL。独自ドメインにしたときはここを変更
- `title` / `school` / `tagline` / `description` … 見出しと説明文
- `exhibition` … 展示ポスター（`qr.html`）に出るイベント名・ブース名・キャッチコピー
- `stats` … トップの数字。`"auto:links"` と書くとリンク件数が、`"auto:achievements"` と書くと実績件数が自動で入ります

---

## 4. 展示での使いかた

1. `qr.html` をブラウザで開く
2. **［印刷（A4 縦）］** で、そのままポスターとして印刷（背景やヘッダーは印刷されません）
3. もっと大きく引き伸ばしたいときは **［QR を PNG 保存］**（2048px の PNG）を使い、Canva や Word に貼る

QR は誤り訂正レベル **H** で生成しているので、多少汚れたり中央にロゴを重ねても読み取れます。
個別のリンクの QR は、トップページの各カードの **［QR］** ボタンから出せます。

---

## 5. 公開のしくみ

GitHub Pages の **ブランチ配信** を使っています（設定は Settings → Pages）。

- Source: **Deploy from a branch**
- Branch: **`main` / `(root)`**

つまり **`main` ブランチの中身がそのまま公開ページ** です。
`main` に変更が入ると、1 分ほどで <https://agrimuitobom.github.io/sainou-dx/> に反映されます
（反映状況は Actions タブの "pages build and deployment" で確認できます）。

ビルドは走らないので、HTML/CSS/JS をそのまま置けます。
`.nojekyll` を置いてあるため、`_` で始まるファイル名も無視されません。

---

## 6. 手元で確認する

JavaScript でデータを読み込んでいるので、`index.html` をダブルクリックしても動きますが、
念のためローカルサーバーで見るのが確実です。

```bash
python3 -m http.server 8000
# → http://localhost:8000/ をブラウザで開く

node scripts/check-data.mjs   # データの書きかたチェック
```

---

## ファイル構成

```
index.html                 トップページ（実績＋リンク集）
qr.html                    展示用 QR ポスター（印刷対応）
data/site.js               サイト名・公開 URL・展示情報      ← 編集する
data/links.js              リンク集とカテゴリ                ← 編集する
data/achievements.js       実績の年表                        ← 編集する
assets/css/style.css       見た目
assets/js/app.js           トップページの組み立て
assets/js/qr.js            QR 描画（SVG / PNG）
assets/vendor/qrcode*.js   QR 生成ライブラリ（同梱）
scripts/check-data.mjs     データの書きかたチェック
.nojekyll                  GitHub Pages に「そのまま配信して」と伝える印
```

ビルド不要・依存パッケージなしの素の HTML/CSS/JS です。数年後に後輩が触っても壊れにくいことを優先しています。

## クレジット

QR コードの生成には [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)（Kazuhiko Arase 氏、MIT ライセンス）を同梱して使用しています。
「QR コード」は株式会社デンソーウェーブの登録商標です。
