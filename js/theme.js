(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
      btn.setAttribute("aria-pressed", theme === "dark");
    }
  }

  apply(saved() === "dark" ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-theme"));
    document.getElementById("theme-toggle").addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  });
})();
