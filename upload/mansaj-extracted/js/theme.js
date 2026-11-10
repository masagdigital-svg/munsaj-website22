/* ================================================================== */
/* Mansaj Digital — theme controller                                   */
/* The initial theme (saved or system) is applied by a tiny inline     */
/* script in <head> to avoid any flash; this file only wires the       */
/* toggle buttons and keeps the choice persistent across pages.        */
/* ================================================================== */
(function () {
  "use strict";

  var KEY = "mansaj-theme";

  function isDark() {
    return document.documentElement.classList.contains("dark");
  }

  function persist(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* storage unavailable — theme still works for this page view */
    }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".theme-toggle");
    if (!btn) return;
    var next = isDark() ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    persist(next);
  });
})();
