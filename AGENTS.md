# AGENTS.md

ことばの本来：文化庁「国語に関する世論調査」で本来とちがう意味・言い方で使われやすい言葉を、意味・使い方・言い方の3つで確かめる1日5問の学習ゲーム。`index.html` と `data.js`（言葉・問題の作り方）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

## push する前の確認

```bash
node qa/run.mjs   # データの形・字数・出典・今日の5問と上級（3年分）・通しで遊ぶ・続きから・とことん・おさらい・言葉帳・実績・カレンダー・あとから・古いタブ・スマホ幅・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 言葉・本来の意味・ほかの意味・割合・年度は、文化庁「国語に関する世論調査」の公表資料から写す（`data.js` の `SRC`。QA が bunka.go.jp のページだけか見る）。調査に出ていない言葉は足さない。文化庁は「辞書等で主に本来の意味（言い方）とされてきたもの」と書くので、画面も「本来の」と言い、ほかの使い方を「まちがい」「誤用」と決めつけない（QA が言葉を見る）。令和2年度から郵送法になったので、数字には必ず年度を添える。
- 問題を出す人物と例文は作り話。例文は45字以内・意味は30字以内で、本来の意味の例文 `ex` と、ほかの意味の例文 `bad` は同じ言葉を使い、どちらの意味で使っているかがはっきり分かる文にする。
- 言葉（`M`・`F`）は最後に足すだけにし、並べ替え・途中の削除をしない（今日の5問・上級は決まった並びの番号で選ぶので、過去の日の問題が変わる）。足すと並び（`ORD`）も変わるので、足す PR には一言書く。
- 問題は3種類：`a:<id>` 本来の意味（3択：本来・ほか・別の言葉の本来の意味）、`n:<id>` 本来の意味で使った文（2択）、`j:<id>` 本来の言い方・区切り方（2択）。上級は本来を選んだ人が30%未満の言葉（`h`）から。
- 今日の5問・上級は日本時間の日付の種（`seedOf`・`rng`）で決まり、だれでも同じ。`Math.random()` は練習・とことんの並びと回の名札だけ（QA が数を見る）。乱数は sort の比較の中で引かない。
- 好きなだけ遊べる：チケット・回数制限・🔒で開くモードを入れない（2026-11-06 satou さん。寄付で成り立たせるため）。上級・とことん・練習ははじめての日から遊べる。とことんはまちがえてもヒントを使っても続き、「ここで降りる」で終わる。自己ベスト `ebest` は一度で正解した問題の数。別のタブで終えた回は `edone` で書き戻さない。
- 記録 `honrai-v1`：`days`・`hdays`・`adays`（あとから）・`dex`（言葉帳）・`co`（言い方の問題の数）・`miss`（おさらい、12まで）・`runs`（モードごとの途中経過 `d`・`h`・`p`・`e`・`a:日付`）・`kofi`・`ach`・`ebest`・`edone`。`load` は両側を `fresh()` で補って合わせ、`tidy` で形を直す。答える・ヒントは、保存した回の id と問題の番号がこの画面と同じときだけ書き込む（`same`）。ヒント・まちがいは別のタブの分より減らさない（`keep`）。記録の形を変えたら QA の引き継ぎの `sample` も合わせる。 `tidy` は、知らない言葉の id・札でも形が正しければ消さない（新しい版で言葉を足したあと、開いたままの古いタブが保存して記録を消さないように。選挙のしくみ 2026-11-07 CodeRabbit）。
- 実績（`ACH`、14個）はいまの記録から毎回数える。続けるは合計の日数。連続は1日以上のときだけ出す。取りこぼした日（過去7日・`EPOCH` から）はあとから遊べ、連続・今日の記録・シェア・Ko-fi には数えない。
- 文字は少なめ・一画面一問。お笑いの言葉は入れない。ほかの作品の名前・キャラ、実在の人名は使わない。人物は名字＋年代で、男女・年代を混ぜる。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に言葉・答えを出さない。
- 感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`、shared-workflows `template/` の写し）へのリンクだけ。名前・メールは聞かない。
- 応援は Ko-fi（https://ko-fi.com/satouaaaaa）へのただのリンク。今日の5問・上級を初めて全部一度で正解したときだけ結果の画面に1行。遊ぶのは無料のまま。
- 外へ通信しない。外から読むのは Google Fonts の文字だけ（CSP の `connect-src 'self'` を広げない）。
- 見やすさ：`</head>` の前の `<!-- a11y:begin -->`〜`end` は shared-workflows `template/a11y/a11y.html` の写し、`qa/a11y.mjs` は `template/qa/a11y.mjs` の写しで、ここでは直さない。色だけで分けない（正解 ✓・まちがい ✕ と破線・星は ☆・カレンダーは ★ ↺ ▲）。知らせは `#msg`（role=status）と `.verdict`。
- 引き継ぎ：`transfer.js` と `qa/transfer-check.mjs` は shared-workflows `template/` の写し。`data-keys` は `honrai-v1`。
- 大きく出てから縮む・揺れる動き（判の `stamp` など）は、入れ物に `overflow:hidden` を付けて横にはみ出させない（QA が動きの途中も測る）。
- 一行に書いた処理の途中にコメント `//` を足さない。機能を足す・直すたびに `qa/run.mjs` に検査を足す。乱数で組む部分は何百回・何年分も作って確かめる（shared-workflows `incidents/2026-10-31-roppo-empty-village.md`）。
- PWA（`manifest.webmanifest`・`sw.js`・`icon-*.png`）：画面のファイルを足したら `sw.js` の `SHELL` に足し、中身や取り方を変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、SNS 用の絵 `og.png` は `node tools/make-og.cjs`（今日の問題を入れない）。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js`（調査の数字）を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを待ち、手でマージする直前に今の head へのレビューを読み直す（shared-workflows `incidents/2026-11-01-roppo-merged-before-review.md`）。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
