/* Semsom — menu tabs (accessible tablist).
   Without JavaScript every menu category is shown, one after the other. */
(function () {
  var tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;
  var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

  function select(index, focus) {
    tabs.forEach(function (tab, i) {
      var on = i === index;
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.tabIndex = on ? 0 : -1;
      if (panels[i]) panels[i].hidden = !on;
    });
    var tab = tabs[index];
    if (focus) tab.focus();
    // keep the active tab visible in the horizontal scroller on mobile
    if (tab.scrollIntoView) tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    try { history.replaceState(null, '', '#' + tab.id.replace('tab-', 'menu-')); } catch (e) {}
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(i, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); select(next, true); }
    });
  });

  // Deep link: /#menu-desserts opens that category
  var start = 0;
  var m = location.hash.match(/^#menu-(.+)$/);
  if (m) {
    var found = tabs.findIndex(function (t) { return t.id === 'tab-' + m[1]; });
    if (found > -1) start = found;
  }
  tabs.forEach(function (t, i) { if (panels[i]) panels[i].hidden = i !== start; });
  tabs.forEach(function (t, i) { t.setAttribute('aria-selected', i === start ? 'true' : 'false'); t.tabIndex = i === start ? 0 : -1; });
  if (m) document.getElementById('menu').scrollIntoView();
})();
