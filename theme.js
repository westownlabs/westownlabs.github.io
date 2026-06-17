/* TEMPORARY preview toggle. Swaps the [data-theme] on <html> and remembers the choice across pages.
   When a theme is chosen for keeps: delete this file, the <script>, the .switcher markup, and the
   two unused theme blocks in styles.css (keep only the winner as :root). */
(function () {
  var THEMES = ['dark', 'light', 'bold'];
  var KEY = 'wl-theme';

  function apply(name) {
    if (THEMES.indexOf(name) === -1) name = 'dark';
    // 'dark' is the default :root, so no attribute needed for it.
    if (name === 'dark') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', name);
    try { localStorage.setItem(KEY, name); } catch (e) {}
    document.querySelectorAll('.switcher button[data-theme]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-theme') === name));
    });
  }

  // Apply the stored choice before paint (the inline head script handles first-paint; this syncs buttons).
  var saved = 'dark';
  try { saved = localStorage.getItem(KEY) || 'dark'; } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.switcher button[data-theme]').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-theme')); });
    });
    apply(saved);
  });
})();
