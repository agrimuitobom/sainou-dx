/* QR コード描画ヘルパ（assets/vendor/qrcode.js を使います） */
(function (global) {
  "use strict";

  function build(text, level) {
    var qr = qrcode(0, level || "M"); // 0 = 型番自動
    qr.addData(String(text));
    qr.make();
    return qr;
  }

  /* 指定要素の中に QR を SVG で描画する */
  function renderInto(el, text, options) {
    if (!el) return;
    var opts = options || {};
    el.innerHTML = "";
    if (!text) {
      el.textContent = "URL が未設定です";
      return;
    }
    try {
      var qr = build(text, opts.level);
      el.innerHTML = qr.createSvgTag({
        cellSize: opts.cellSize || 4,
        margin: opts.margin === undefined ? 8 : opts.margin,
        scalable: true,
      });
      var svg = el.querySelector("svg");
      if (svg) {
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", (opts.label || "QR コード") + "：" + text);
      }
    } catch (e) {
      el.textContent = "QR を作れませんでした（URL が長すぎる可能性があります）";
    }
  }

  /* 印刷用に大きめの PNG を書き出す */
  function toPngDataUrl(text, pixelSize, level) {
    var qr = build(text, level);
    var count = qr.getModuleCount();
    var quiet = 4;
    var total = count + quiet * 2;
    var scale = Math.max(2, Math.floor((pixelSize || 1024) / total));
    var canvas = document.createElement("canvas");
    canvas.width = canvas.height = total * scale;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillRect((c + quiet) * scale, (r + quiet) * scale, scale, scale);
        }
      }
    }
    return canvas.toDataURL("image/png");
  }

  function downloadPng(text, filename, pixelSize) {
    var a = document.createElement("a");
    a.href = toPngDataUrl(text, pixelSize);
    a.download = filename || "qr.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  global.QR = { renderInto: renderInto, toPngDataUrl: toPngDataUrl, downloadPng: downloadPng };
})(window);
