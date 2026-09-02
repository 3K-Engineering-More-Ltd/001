/*
 * Theme management.
 *
 * Resolution order: explicit user choice (localStorage) > OS preference.
 * `applyStoredTheme()` is called inline in <head> on every page so the
 * correct theme is set before first paint (no flash of wrong theme).
 */
(function () {
  "use strict";

  var STORAGE_KEY = "theme"; // "light" | "dark" | absent (= follow system)

  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function storedTheme() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function resolveTheme() {
    return storedTheme() || (systemPrefersDark() ? "dark" : "light");
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function setTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* private browsing: theme still applies for this page view */
    }
    applyTheme(theme);
  }

  // Follow OS changes live, but only while the user hasn't made an explicit choice.
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (event) {
      if (!storedTheme()) {
        applyTheme(event.matches ? "dark" : "light");
      }
    });

  window.appTheme = {
    apply: function () {
      applyTheme(resolveTheme());
    },
    current: resolveTheme,
    set: setTheme,
    toggle: function () {
      var next = resolveTheme() === "dark" ? "light" : "dark";
      setTheme(next);
      return next;
    },
  };

  window.appTheme.apply();
})();
