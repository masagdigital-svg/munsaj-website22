/* ================================================================== */
/* Mansaj Digital — main interactions (vanilla JS, no dependencies)    */
/* ------------------------------------------------------------------ */
/*  · Bilingual AR/EN switching with persistence (same keys as before) */
/*  · Mobile sheet menu (open/close, escape, overlay, focus return)    */
/*  · Reveal-on-scroll + honest count-up counters                      */
/*  · FAQ accordion (single-open, like the original)                   */
/*  · Portfolio filters + testimonial modal                            */
/*  · Project request form → composes a clear WhatsApp message to the  */
/*    official agency number (+967 770 233 292)                        */
/*  · Branded custom cursor (mouse + touch, reduced-motion aware)      */
/* ================================================================== */
(function () {
  "use strict";

  var AGENCY_WA = "967770233292"; // official Mansaj Digital agency number

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function store(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* ignore */
    }
  }
  function readStore(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  /* ---------------------------------------------------------------- */
  /* Language (AR default, EN available — same behavior as before)      */
  /* ---------------------------------------------------------------- */

  var LANG_KEY = "mansaj-lang";

  function currentLang() {
    return document.documentElement.lang === "en" ? "en" : "ar";
  }

  function applyLang(lang) {
    var root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";

    $all("[data-ar]").forEach(function (el) {
      var v = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      if (v !== null && v !== undefined) el.textContent = v;
    });
    $all("[data-ar-aria]").forEach(function (el) {
      var v = lang === "ar" ? el.getAttribute("data-ar-aria") : el.getAttribute("data-en-aria");
      if (v !== null && v !== undefined) el.setAttribute("aria-label", v);
    });
    $all("[data-ar-ph]").forEach(function (el) {
      var v = lang === "ar" ? el.getAttribute("data-ar-ph") : el.getAttribute("data-en-ph");
      if (v !== null && v !== undefined) el.setAttribute("placeholder", v);
    });
    $all("[data-ar-alt]").forEach(function (el) {
      var v = lang === "ar" ? el.getAttribute("data-ar-alt") : el.getAttribute("data-en-alt");
      if (v !== null && v !== undefined) el.setAttribute("alt", v);
    });
    /* Directional arrows: left-pointing in RTL, right-pointing in LTR */
    var arrowId = lang === "ar" ? "i-arrow-left" : "i-arrow-right";
    $all(".arrow-flip use").forEach(function (u) {
        u.setAttribute("href", u.getAttribute("href").replace(/#i-arrow-(left|right)$/, "#" + arrowId));
    });
    $all(".lang-toggle").forEach(function (btn) {
      btn.textContent = lang === "ar" ? "EN" : "عربي";
    });
    document.title =
      lang === "ar"
        ? document.documentElement.getAttribute("data-title-ar") || document.title
        : document.documentElement.getAttribute("data-title-en") || document.title;

    document.dispatchEvent(new CustomEvent("mansaj:lang", { detail: { lang: lang } }));
  }

  function initLang() {
    var saved = readStore(LANG_KEY);
    if (saved === "en" || saved === "ar") applyLang(saved);

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".lang-toggle");
      if (!btn) return;
      var next = currentLang() === "ar" ? "en" : "ar";
      store(LANG_KEY, next);
      applyLang(next);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Mobile sheet menu                                                  */
  /* ---------------------------------------------------------------- */

  function initSheet() {
    var sheet = $(".sheet");
    var overlay = $(".sheet-overlay");
    if (!sheet || !overlay) return;

    var lastFocus = null;

    function open(trigger) {
      lastFocus = trigger || document.activeElement;
      document.body.classList.add("sheet-open");
      sheet.setAttribute("aria-hidden", "false");
      $all(".sheet-open-btn").forEach(function (b) {
        b.setAttribute("aria-expanded", "true");
      });
      var close = $(".sheet-close", sheet);
      if (close) close.focus();
    }
    function closeSheet() {
      document.body.classList.remove("sheet-open");
      sheet.setAttribute("aria-hidden", "true");
      $all(".sheet-open-btn").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
      });
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    }

    $all(".sheet-open-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (document.body.classList.contains("sheet-open")) closeSheet();
        else open(btn);
      });
    });
    $all(".sheet-close").forEach(function (btn) {
      btn.addEventListener("click", closeSheet);
    });
    overlay.addEventListener("click", closeSheet);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("sheet-open")) closeSheet();
    });
    /* Close the sheet when a navigation link inside it is used */
    $all("a", sheet).forEach(function (a) {
      a.addEventListener("click", closeSheet);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Reveal on scroll                                                   */
  /* ---------------------------------------------------------------- */

  function initReveal() {
    var items = $all(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("in-view");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Count-up — final numbers live in the HTML; JS only animates them   */
  /* ---------------------------------------------------------------- */

  function initCounters() {
    var els = $all("[data-count]");
    if (!els.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return; // static final values remain

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          io.unobserve(el);
          var to = parseInt(el.getAttribute("data-count"), 10) || 0;
          var prefix = el.getAttribute("data-prefix") || "";
          var suffix = el.getAttribute("data-suffix") || "";
          var duration = 1600;
          var start = performance.now();
          function tick(now) {
            var p = Math.min(1, (now - start) / duration);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + Math.round(to * eased).toLocaleString("en-US") + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------------- */
  /* FAQ accordion                                                      */
  /* ---------------------------------------------------------------- */

  function initFaq() {
    var buttons = $all(".faq-q");
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        var panel = item.querySelector(".faq-a");
        var isOpen = btn.getAttribute("aria-expanded") === "true";

        buttons.forEach(function (other) {
          if (other === btn) return;
          other.setAttribute("aria-expanded", "false");
          var p = other.closest(".faq-item").querySelector(".faq-a");
          if (p) p.style.maxHeight = "0px";
        });

        btn.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = isOpen ? "0px" : panel.scrollHeight + "px";
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Portfolio filters + testimonial modal                              */
  /* ---------------------------------------------------------------- */

  function initPortfolio() {
    var chips = $all(".filter-chips .chip");
    var cards = $all(".project-card");
    if (chips.length && cards.length) {
      chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
          chips.forEach(function (c) {
            c.setAttribute("aria-pressed", String(c === chip));
          });
          var f = chip.getAttribute("data-filter");
          cards.forEach(function (card) {
            var show = f === "all" || card.getAttribute("data-category") === f;
            card.style.display = show ? "" : "none";
          });
        });
      });
    }

    var overlay = $(".modal-overlay");
    if (!overlay) return;
    var modal = $(".modal", overlay);
    var mCat = $(".m-cat", modal);
    var mTitle = $("#modal-title", modal);
    var mQuote = $(".m-quote", modal);
    var mNo = $(".m-banner .no-badge", modal);
    var mLink = $(".m-actions a[target='_blank']", modal);
    var lastFocus = null;

    function openModal(card) {
      lastFocus = document.activeElement;
      var data = $(".pc-data", card);
      if (data) {
        mCat.textContent = $(".d-cat", data).textContent;
        mTitle.textContent = $(".d-title", data).textContent;
        mQuote.textContent = $(".d-quote", data).textContent;
        mNo.textContent = $(".d-no", data).textContent;
      }
      if (mLink) {
        mLink.setAttribute("href", card.getAttribute("data-url") || "#");
      }
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      var closeBtn = $(".m-close", modal);
      if (closeBtn) closeBtn.focus();
    }
    function closeModal() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    }

    $all(".project-card .cover-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal(btn.closest(".project-card"));
      });
    });
    $all(".m-close", overlay).forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Request form → WhatsApp (official agency number only)              */
  /* ---------------------------------------------------------------- */

  function initRequestForm() {
    var form = $("#request-form");
    if (!form) return;

    var domainWrap = $("[data-domain-chips]", form);
    var serviceWrap = $("[data-service-chips]", form);
    var helpMe = $("#help-me", form);
    var nameEl = $("#f-name", form);
    var businessEl = $("#f-business", form);
    var cityEl = $("#f-city", form);
    var descEl = $("#f-desc", form);
    var siteEl = $("#f-site", form);
    var previewEl = $("#wa-preview-text", form);
    var sendBtn = $("#wa-send", form);

    var state = { domain: null, services: [] };

    /* Preselect from URL (?service=… or ?domain=…) */
    var params = new URLSearchParams(location.search);
    var preService = params.get("service");
    var preDomain = params.get("domain");

    function setDomain(id) {
      state.domain = id;
      $all(".chip", domainWrap).forEach(function (chip) {
        chip.classList.toggle("active", chip.getAttribute("data-domain") === id);
        chip.setAttribute("aria-pressed", String(chip.getAttribute("data-domain") === id));
      });
      filterServices();
      updatePreview();
    }

    function filterServices() {
      $all(".chip", serviceWrap).forEach(function (chip) {
        var domains = (chip.getAttribute("data-domains") || "").split(",");
        var show = !state.domain || state.domain === "other" || domains.indexOf(state.domain) !== -1;
        chip.style.display = show ? "" : "none";
        if (!show) {
          chip.classList.remove("active");
          chip.setAttribute("aria-pressed", "false");
          var sid = chip.getAttribute("data-service");
          var idx = state.services.indexOf(sid);
          if (idx !== -1) state.services.splice(idx, 1);
        }
      });
    }

    $all(".chip", domainWrap).forEach(function (chip) {
      chip.addEventListener("click", function () {
        var id = chip.getAttribute("data-domain");
        setDomain(state.domain === id ? null : id);
      });
    });

    $all(".chip", serviceWrap).forEach(function (chip) {
      chip.addEventListener("click", function () {
        var id = chip.getAttribute("data-service");
        var idx = state.services.indexOf(id);
        if (idx === -1) {
          state.services.push(id);
          chip.classList.add("active");
          chip.setAttribute("aria-pressed", "true");
        } else {
          state.services.splice(idx, 1);
          chip.classList.remove("active");
          chip.setAttribute("aria-pressed", "false");
        }
        updatePreview();
      });
    });

    if (helpMe) {
      helpMe.addEventListener("change", function () {
        if (helpMe.checked) {
          state.services = [];
          $all(".chip", serviceWrap).forEach(function (chip) {
            chip.classList.remove("active");
            chip.setAttribute("aria-pressed", "false");
          });
          serviceWrap.style.opacity = "0.45";
          serviceWrap.style.pointerEvents = "none";
        } else {
          serviceWrap.style.opacity = "";
          serviceWrap.style.pointerEvents = "";
        }
        updatePreview();
      });
    }

    function textOf(el) {
      return (el.value || "").trim();
    }

    function langText(el) {
      return currentLang() === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
    }

    /* Read the localized label of a chip (the text lives in a child
       span carrying data-ar / data-en). */
    function chipLabel(chip) {
      if (!chip) return "";
      var s = chip.querySelector("[data-ar]");
      if (!s) return (chip.textContent || "").trim();
      return currentLang() === "ar" ? s.getAttribute("data-ar") : s.getAttribute("data-en");
    }

    function domainLabel(id) {
      return chipLabel(domainWrap.querySelector('.chip[data-domain="' + id + '"]'));
    }

    function composeMessage() {
      var lines;
      if (currentLang() === "ar") {
        lines = ["مرحبًا وكالة منسج الرقمية 👋", "أود طلب خدمة موقع:"];
        lines.push("• المجال: " + (state.domain ? domainLabel(state.domain) : "—"));
        if (helpMe && helpMe.checked) {
          lines.push("• الخدمة: ساعدوني في الاختيار");
        } else {
          var labels = state.services
            .map(function (id) {
              return chipLabel(serviceWrap.querySelector('.chip[data-service="' + id + '"]'));
            })
            .filter(Boolean);
          lines.push("• الخدمة: " + (labels.length ? labels.join("، ") : "—"));
        }
        lines.push("• الاسم: " + (textOf(nameEl) || "—"));
        lines.push("• النشاط: " + (textOf(businessEl) || "—"));
        lines.push("• المدينة/الدولة: " + (textOf(cityEl) || "—"));
        lines.push("• تفاصيل المشروع: " + (textOf(descEl) || "—"));
        if (textOf(siteEl)) lines.push("• موقع حالي: " + textOf(siteEl));
      } else {
        lines = ["Hello Mansaj Digital 👋", "I would like to request a website service:"];
        lines.push("• Field: " + (state.domain ? domainLabel(state.domain) : "—"));
        if (helpMe && helpMe.checked) {
          lines.push("• Service: Help me choose");
        } else {
          var labelsEn = state.services
            .map(function (id) {
              return chipLabel(serviceWrap.querySelector('.chip[data-service="' + id + '"]'));
            })
            .filter(Boolean);
          lines.push("• Service: " + (labelsEn.length ? labelsEn.join(", ") : "—"));
        }
        lines.push("• Name: " + (textOf(nameEl) || "—"));
        lines.push("• Business: " + (textOf(businessEl) || "—"));
        lines.push("• City/Country: " + (textOf(cityEl) || "—"));
        lines.push("• Project details: " + (textOf(descEl) || "—"));
        if (textOf(siteEl)) lines.push("• Current website: " + textOf(siteEl));
      }
      return lines.join("\n");
    }

    function updatePreview() {
      if (previewEl) previewEl.textContent = composeMessage();
    }

    form.addEventListener("input", updatePreview);
    form.addEventListener("change", updatePreview);

    function setError(field, hasError) {
      var wrap = field.closest(".f-field");
      if (wrap) wrap.classList.toggle("has-error", hasError);
    }

    sendBtn.addEventListener("click", function () {
      var valid = true;
      if (textOf(nameEl).length < 2) {
        setError(nameEl, true);
        valid = false;
      } else setError(nameEl, false);
      if (textOf(businessEl).length < 2) {
        setError(businessEl, true);
        valid = false;
      } else setError(businessEl, false);
      if (textOf(descEl).length < 5) {
        setError(descEl, true);
        valid = false;
      } else setError(descEl, false);

      if (!valid) {
        var firstError = $(".f-field.has-error input, .f-field.has-error textarea", form);
        if (firstError) firstError.focus();
        return;
      }

      var url =
        "https://wa.me/" + AGENCY_WA + "?text=" + encodeURIComponent(composeMessage());
      window.open(url, "_blank", "noopener");
    });

    /* Initial state */
    if (preService) {
      var chip = serviceWrap.querySelector('.chip[data-service="' + preService + '"]');
      if (chip) {
        var domains = (chip.getAttribute("data-domains") || "").split(",");
        if (domains.length === 1) setDomain(domains[0]);
        state.services.push(preService);
        chip.classList.add("active");
        chip.setAttribute("aria-pressed", "true");
      }
    } else if (preDomain) {
      setDomain(preDomain);
    }
    updatePreview();
  }

  /* ---------------------------------------------------------------- */
  /* Custom cursor — branded square dot + trailing frame                */
  /*  · Mouse/trackpad (pointer: fine): always-following branded        */
  /*    cursor — identical look & behavior to the original.             */
  /*  · Touch/pen (mobile): the same branded square follows the finger  */
  /*    while it is down, then fades away. Uses passive listeners and   */
  /*    never blocks scrolling, taps, or links.                         */
  /*  · Performance: the rAF loop runs only while there is motion to    */
  /*    render, so it burns no frames when idle.                        */
  /*  · Honors prefers-reduced-motion.                                  */
  /* ---------------------------------------------------------------- */

  function initCursor() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var layer = document.createElement("div");
    layer.className = "cursor-layer is-hidden";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML =
      '<div class="cursor-frame"><div class="box"></div></div>' +
      '<div class="cursor-dot"><div class="box"></div></div>';
    document.body.appendChild(layer);

    /* Hide the native cursor only on devices that actually have one
       (the CSS further guards this with @media (pointer: fine)). */
    if (window.matchMedia("(pointer: fine)").matches) {
      document.documentElement.classList.add("mansaj-cursor-on");
    }

    var frame = layer.querySelector(".cursor-frame");
    var dot = layer.querySelector(".cursor-dot");

    var tx = -100, ty = -100; /* target */
    var dx = -100, dy = -100; /* dot (fast) */
    var fx = -100, fy = -100; /* frame (trailing) */
    var rafId = null;

    var INTERACTIVE = 'a, button, [role="button"], label, summary, select, [data-cursor="link"]';
    var FIELD = 'input, textarea, [contenteditable="true"], [contenteditable=""]';

    /* Animation loop — shared by mouse and touch modes. Renders with
       translate3d (GPU) and stops itself once movement settles. */
    function step() {
      dx += (tx - dx) * 0.55;
      dy += (ty - dy) * 0.55;
      fx += (tx - fx) * 0.16;
      fy += (ty - fy) * 0.16;
      dot.style.transform = "translate3d(" + dx + "px," + dy + "px,0)";
      frame.style.transform = "translate3d(" + fx + "px," + fy + "px,0)";
      if (
        Math.abs(tx - dx) > 0.05 || Math.abs(ty - dy) > 0.05 ||
        Math.abs(tx - fx) > 0.05 || Math.abs(ty - fy) > 0.05
      ) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = null; /* settled — no frames wasted until the next input */
      }
    }
    function kick() {
      if (rafId === null) rafId = requestAnimationFrame(step);
    }
    function snap(x, y) {
      tx = dx = fx = x;
      ty = dy = fy = y;
      dot.style.transform = "translate3d(" + dx + "px," + dy + "px,0)";
      frame.style.transform = "translate3d(" + fx + "px," + fy + "px,0)";
    }
    function show() { layer.classList.remove("is-hidden"); }
    function hide() { layer.classList.add("is-hidden"); }
    function matchesEl(t, sel) {
      return !!(t && t.closest && t.closest(sel));
    }

    /* ============== Mouse / trackpad — original behavior ============= */

    var idleTimer = null;
    var IDLE_HIDE_MS = 1400;
    function armIdle() {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(hide, IDLE_HIDE_MS);
    }

    function onMouseMove(e) {
      tx = e.clientX;
      ty = e.clientY;
      show();
      kick();
      if (e.pointerType !== "mouse") armIdle();
    }
    function onMouseOver(e) {
      var t = e.target;
      if (!(t instanceof Element)) return;
      if (matchesEl(t, FIELD)) layer.classList.add("is-field");
      else if (matchesEl(t, INTERACTIVE)) layer.classList.add("is-link");
      else layer.classList.remove("is-link");
    }
    function onMouseDown(e) {
      layer.classList.add("is-pressed");
      tx = e.clientX;
      ty = e.clientY;
      show();
      kick();
    }
    function onMouseUp() {
      layer.classList.remove("is-pressed");
    }

    /* ============== Touch / pen — mobile-friendly mode =============== */

    var touchActive = false;
    var activePointerId = null;
    var fadeTimer = null;

    function clearFade() {
      if (fadeTimer) {
        clearTimeout(fadeTimer);
        fadeTimer = null;
      }
    }
    function touchStart(e) {
      if (touchActive) return; /* one finger drives it; extra fingers ignored */
      touchActive = true;
      activePointerId = e.pointerId;
      clearFade();
      snap(e.clientX, e.clientY); /* materialize under the finger */
      show();
      layer.classList.add("is-pressed");
      layer.classList.toggle("is-link", matchesEl(e.target, INTERACTIVE));
      layer.classList.toggle("is-field", matchesEl(e.target, FIELD));
      kick();
    }
    function touchMove(e) {
      if (!touchActive || e.pointerId !== activePointerId) return;
      tx = e.clientX;
      ty = e.clientY;
      show();
      kick();
    }
    function touchEnd(e) {
      if (!touchActive || e.pointerId !== activePointerId) return;
      touchActive = false;
      activePointerId = null;
      layer.classList.remove("is-pressed");
      layer.classList.remove("is-link");
      layer.classList.remove("is-field");
      /* Gentle fade instead of an abrupt vanish. */
      clearFade();
      fadeTimer = setTimeout(hide, 450);
    }
    function touchCancel(e) {
      if (!touchActive || e.pointerId !== activePointerId) return;
      touchActive = false;
      activePointerId = null;
      layer.classList.remove("is-pressed", "is-link", "is-field");
      hide(); /* scrolling/zoom took over — get out of the way instantly */
    }

    /* ============== Wiring ============== */

    if (window.PointerEvent) {
      window.addEventListener(
        "pointermove",
        function (e) {
          /* Dispatch by pointer type: mice keep the desktop behavior,
             touch/pen get the touch behavior. On dual-input devices
             (touch laptops) both can coexist without conflict. */
          if (e.pointerType === "touch" || e.pointerType === "pen") touchMove(e);
          else onMouseMove(e);
        },
        { passive: true }
      );
      window.addEventListener(
        "pointerdown",
        function (e) {
          if (e.pointerType === "touch" || e.pointerType === "pen") touchStart(e);
          else onMouseDown(e);
        },
        { passive: true }
      );
      window.addEventListener(
        "pointerup",
        function (e) {
          if (e.pointerType === "touch" || e.pointerType === "pen") touchEnd(e);
          else onMouseUp(e);
        },
        { passive: true }
      );
      window.addEventListener("pointercancel", touchCancel, { passive: true });
      window.addEventListener(
        "pointerover",
        function (e) {
          if (e.pointerType === "touch" || e.pointerType === "pen") return;
          onMouseOver(e);
        },
        { passive: true }
      );
      document.documentElement.addEventListener(
        "pointerleave",
        function (e) {
          if (e.pointerType === "touch" || e.pointerType === "pen") return;
          hide();
        }
      );
    } else {
      /* Fallback for very old mobile browsers without Pointer Events. */
      window.addEventListener(
        "mousemove",
        function (e) { onMouseMove({ clientX: e.clientX, clientY: e.clientY, pointerType: "mouse" }); },
        { passive: true }
      );
      window.addEventListener(
        "mouseover",
        function (e) { onMouseOver(e); },
        { passive: true }
      );
      window.addEventListener(
        "mousedown",
        function (e) { onMouseDown({ clientX: e.clientX, clientY: e.clientY }); },
        { passive: true }
      );
      window.addEventListener("mouseup", onMouseUp, { passive: true });
      document.addEventListener("mouseleave", hide);
      window.addEventListener(
        "touchstart",
        function (e) {
          var t = e.changedTouches[0];
          touchStart({ pointerId: t.identifier, clientX: t.clientX, clientY: t.clientY, target: e.target });
        },
        { passive: true }
      );
      window.addEventListener(
        "touchmove",
        function (e) {
          var t = e.changedTouches[0];
          touchMove({ pointerId: t.identifier, clientX: t.clientX, clientY: t.clientY });
        },
        { passive: true }
      );
      window.addEventListener(
        "touchend",
        function (e) {
          var t = e.changedTouches[0];
          touchEnd({ pointerId: t.identifier });
        },
        { passive: true }
      );
      window.addEventListener(
        "touchcancel",
        function (e) {
          var t = e.changedTouches[0];
          touchCancel({ pointerId: t.identifier });
        },
        { passive: true }
      );
    }

    window.addEventListener("blur", hide);
  }

  /* ---------------------------------------------------------------- */
  /* Footer year                                                        */
  /* ---------------------------------------------------------------- */

  function initYear() {
    var y = String(new Date().getFullYear());
    $all("[data-year]").forEach(function (el) {
      el.textContent = y;
    });
  }

  /* ---------------------------------------------------------------- */
  /* Boot                                                               */
  /* ---------------------------------------------------------------- */

  function boot() {
    initLang();
    initSheet();
    initReveal();
    initCounters();
    initFaq();
    initPortfolio();
    initRequestForm();
    initCursor();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
