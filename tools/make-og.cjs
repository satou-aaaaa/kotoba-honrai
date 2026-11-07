// SNS で貼られたときの絵（og.png 1200×630）を作る。今日の問題（答え）は入れず、遊び方の例だけ。
// 使い方: node tools/make-og.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(`<body style="margin:0;font-family:'Noto Sans CJK JP','IPAPGothic',sans-serif">
  <div style="width:1200px;height:630px;box-sizing:border-box;padding:56px 80px;background:#f3ede0;background-image:radial-gradient(#1d2b2614 2px,transparent 3px);background-size:32px 32px;color:#1d2b26;position:relative">
    <div style="font-size:34px;color:#7f2414;letter-spacing:.12em;font-weight:700">文化庁の調査に出た言葉</div>
    <div style="font-size:104px;font-weight:900;margin-top:6px;letter-spacing:.06em;color:#123d31">ことばの<span style="color:#b23a24">本来</span></div>
    <div style="font-size:38px;margin-top:4px">その言葉、本来の意味で使えている？</div>
    <div style="display:flex;gap:22px;margin-top:40px;align-items:flex-start">
      <div style="font-size:70px;width:110px;height:110px;border-radius:50%;background:#e8f1ec;border:5px solid #1f5c4a;display:grid;place-items:center">🧑</div>
      <div style="flex:1;max-width:720px;background:#fff;border:5px solid #1d2b26;border-radius:28px;padding:22px 30px;font-size:38px;line-height:1.5">「気が置けない」って、<br>どういう意味だったかな…</div>
    </div>
    <div style="position:absolute;right:90px;bottom:70px;width:170px;height:170px;border-radius:50%;border:9px solid #b23a24;color:#b23a24;display:grid;place-items:center;font-size:44px;font-weight:900;transform:rotate(-12deg);text-align:center;line-height:1.1">本<br>来</div>
  </div></body>`);
  await p.screenshot({ path: path.join(__dirname, "..", "og.png") });
  await b.close();
})();
