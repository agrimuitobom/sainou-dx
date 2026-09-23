/* トップページの組み立て（data/*.js の内容をそのまま画面に反映します） */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var LINKS = window.LINKS || [];
  var CATEGORIES = window.CATEGORIES || [];
  var ACHIEVEMENTS = window.ACHIEVEMENTS || [];

  var KIND = {
    github: { icon: "⌘", label: "リポジトリ" },
    site: { icon: "🌐", label: "サイト" },
    slide: { icon: "🖼", label: "スライド" },
    doc: { icon: "📄", label: "資料" },
    video: { icon: "▶", label: "動画" },
    form: { icon: "📝", label: "フォーム" },
    app: { icon: "📱", label: "アプリ" },
  };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var el = function (tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  var pageUrl = function () {
    return SITE.url || location.href.replace(/index\.html?$/, "");
  };

  /* --- 見出し・共通テキスト ------------------------------------- */
  function fillMeta() {
    document.title = SITE.title ? SITE.title + " | " + (SITE.school || "") : document.title;
    setText("[data-site='title']", SITE.title);
    setText("[data-site='school']", SITE.school);
    setText("[data-site='tagline']", SITE.tagline);
    setText("[data-site='description']", SITE.description);
    setText("[data-site='url']", pageUrl());
    setText("[data-site='year']", String(new Date().getFullYear()));

    document.querySelectorAll("[data-site='school-url']").forEach(function (node) {
      if (SITE.schoolUrl) {
        node.href = SITE.schoolUrl;
      } else {
        node.remove(); // URL が未設定ならリンクごと消す
      }
    });

    var contact = $("[data-site='contact']");
    if (contact) {
      if (SITE.contactUrl) {
        contact.href = SITE.contactUrl;
        contact.textContent = SITE.contactLabel || "お問い合わせ";
      } else {
        contact.remove();
      }
    }
  }

  function setText(sel, value) {
    document.querySelectorAll(sel).forEach(function (node) {
      if (value) node.textContent = value;
    });
  }

  /* --- 数字 ------------------------------------------------------ */
  function renderStats() {
    var box = $("#stats");
    if (!box) return;
    (SITE.stats || []).forEach(function (item) {
      var value = item.value;
      if (value === "auto:links") value = LINKS.length + " 件";
      if (value === "auto:achievements") value = ACHIEVEMENTS.length + " 件";
      var card = el("div", "stat");
      card.appendChild(el("b", null, value));
      card.appendChild(el("span", null, item.label || ""));
      box.appendChild(card);
    });
  }

  /* --- リンク集 -------------------------------------------------- */
  var state = { category: "all", query: "" };

  function categoryName(id) {
    var hit = CATEGORIES.filter(function (c) { return c.id === id; })[0];
    return hit ? hit.name : "その他";
  }

  function renderChips() {
    var box = $("#chips");
    if (!box) return;
    var all = [{ id: "all", name: "すべて", icon: "✦" }].concat(CATEGORIES);
    all.forEach(function (cat) {
      var count = cat.id === "all"
        ? LINKS.length
        : LINKS.filter(function (l) { return (l.category || "other") === cat.id; }).length;
      if (cat.id !== "all" && count === 0) return;
      var chip = el("button", "chip", (cat.icon ? cat.icon + " " : "") + cat.name + "（" + count + "）");
      chip.type = "button";
      chip.setAttribute("aria-pressed", String(state.category === cat.id));
      chip.addEventListener("click", function () {
        state.category = cat.id;
        box.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        renderCards();
      });
      box.appendChild(chip);
    });
  }

  function matches(link) {
    if (state.category !== "all" && (link.category || "other") !== state.category) return false;
    if (!state.query) return true;
    var hay = [link.title, link.description, link.year, categoryName(link.category)]
      .concat(link.tags || []).join(" ").toLowerCase();
    return hay.indexOf(state.query.toLowerCase()) >= 0;
  }

  function sortLinks(a, b) {
    if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
    return String(b.year || "").localeCompare(String(a.year || ""));
  }

  function renderCards() {
    var box = $("#cards");
    if (!box) return;
    box.innerHTML = "";
    var list = LINKS.filter(matches).sort(sortLinks);

    if (!list.length) {
      var empty = el("div", "empty", "見つかりませんでした。別のことばで探してみてください。");
      box.appendChild(empty);
      return;
    }

    list.forEach(function (link) {
      var kind = KIND[link.kind] || KIND.site;
      var card = el("article", "card");

      if (link.sample) card.appendChild(el("span", "badge-sample", "サンプル"));

      var top = el("div", "card-top");
      top.appendChild(el("span", "kind", kind.icon + " " + kind.label));
      if (link.featured) top.appendChild(el("span", "kind", "★ 注目"));
      top.appendChild(el("span", "year", link.year || ""));
      card.appendChild(top);

      var h3 = el("h3");
      var a = el("a", null, link.title || link.url);
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      h3.appendChild(a);
      card.appendChild(h3);

      if (link.description) card.appendChild(el("p", null, link.description));

      if (link.tags && link.tags.length) {
        var tags = el("div", "tags");
        link.tags.forEach(function (t) { tags.appendChild(el("span", "tag", t)); });
        card.appendChild(tags);
      }

      var actions = el("div", "card-actions");
      var open = el("a", "mini", "開く ↗");
      open.href = link.url;
      open.target = "_blank";
      open.rel = "noopener";
      actions.appendChild(open);

      var qrBtn = el("button", "mini", "QR");
      qrBtn.type = "button";
      qrBtn.addEventListener("click", function () { openModal(link); });
      actions.appendChild(qrBtn);

      var copy = el("button", "mini", "URL コピー");
      copy.type = "button";
      copy.addEventListener("click", function () {
        navigator.clipboard.writeText(link.url).then(function () {
          copy.textContent = "コピーしました";
          setTimeout(function () { copy.textContent = "URL コピー"; }, 1600);
        });
      });
      actions.appendChild(copy);

      card.appendChild(actions);
      box.appendChild(card);
    });
  }

  /* --- 年表 ------------------------------------------------------ */
  function renderAchievements() {
    var box = $("#timeline");
    if (!box) return;
    ACHIEVEMENTS.forEach(function (item) {
      var li = el("li");
      li.appendChild(el("div", "date", item.date || ""));
      var h3 = el("h3", null, item.title || "");
      if (item.sample) {
        var badge = el("span", "tag", " サンプル");
        h3.appendChild(badge);
      }
      li.appendChild(h3);
      if (item.body) li.appendChild(el("p", null, item.body));
      if (item.tags && item.tags.length) {
        var tags = el("div", "tags");
        item.tags.forEach(function (t) { tags.appendChild(el("span", "tag", t)); });
        li.appendChild(tags);
      }
      if (item.links && item.links.length) {
        var links = el("div", "links");
        item.links.forEach(function (l) {
          var a = el("a", null, l.label || l.url);
          a.href = l.url;
          a.target = "_blank";
          a.rel = "noopener";
          links.appendChild(a);
        });
        li.appendChild(links);
      }
      box.appendChild(li);
    });
  }

  /* --- QR モーダル ----------------------------------------------- */
  function openModal(link) {
    var modal = $("#qr-modal");
    if (!modal) return;
    $("#qr-modal-title").textContent = link.title || "QR コード";
    $("#qr-modal-url").textContent = link.url;
    window.QR.renderInto($("#qr-modal-code"), link.url, { cellSize: 5, margin: 8, label: link.title });
    var open = $("#qr-modal-open");
    open.href = link.url;
    $("#qr-modal-save").onclick = function () {
      window.QR.downloadPng(link.url, safeName(link.title) + "-qr.png", 1024);
    };
    modal.hidden = false;
    $("#qr-modal-close").focus();
  }

  function safeName(name) {
    return String(name || "qr").replace(/[\\/:*?"<>|\s]+/g, "_").slice(0, 40);
  }

  function setupModal() {
    var modal = $("#qr-modal");
    if (!modal) return;
    function close() { modal.hidden = true; }
    $("#qr-modal-close").addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) close();
    });
  }

  /* --- 起動 ------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    fillMeta();
    renderStats();
    renderChips();
    renderCards();
    renderAchievements();
    setupModal();

    window.QR.renderInto($("#hero-qr"), pageUrl(), { cellSize: 4, margin: 6, label: SITE.title });

    var search = $("#search-input");
    if (search) {
      search.addEventListener("input", function () {
        state.query = search.value.trim();
        renderCards();
      });
    }
  });
})();
