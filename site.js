// OverEngineered-Tech: slide-in menu and light/dark toggle. No libraries, no tracking.
(function () {
  var root = document.documentElement;

  // ----- Light / dark toggle (remembered in this browser only) -----
  function setTheme(value) {
    root.setAttribute("data-theme", value);
    try { localStorage.setItem("theme", value); } catch (e) { /* private mode: fine */ }
  }
  var toggles = document.querySelectorAll("[data-theme-toggle]");
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  // ----- Slide-in menu -----
  var drawer = document.getElementById("drawer");
  var scrim = document.getElementById("scrim");
  var burger = document.getElementById("burger");
  if (!drawer || !scrim || !burger) { return; }

  var lastFocus = null;
  function openMenu() {
    lastFocus = document.activeElement;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    scrim.hidden = false;
    burger.setAttribute("aria-expanded", "true");
    var first = drawer.querySelector("a, button");
    if (first) { first.focus(); }
  }
  function closeMenu() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    scrim.hidden = true;
    burger.setAttribute("aria-expanded", "false");
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
  }
  burger.addEventListener("click", openMenu);
  scrim.addEventListener("click", closeMenu);
  var closers = drawer.querySelectorAll("[data-close]");
  for (var j = 0; j < closers.length; j++) { closers[j].addEventListener("click", closeMenu); }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && drawer.classList.contains("open")) { closeMenu(); }
  });
})();
