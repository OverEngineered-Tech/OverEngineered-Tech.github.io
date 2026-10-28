// OverEngineered-Tech: slide-in menu, light/dark toggle, and a cookie-free visitor counter (GoatCounter). No other libraries.
(function () {
  var root = document.documentElement;

  // ----- Visitor counter. Skip your own visits: open the site once with #toggle-goatcounter -----
  try {
    var gc = document.createElement("script");
    gc.async = true;
    gc.src = "https://gc.zgo.at/count.js";
    gc.setAttribute("data-goatcounter", "https://overengineeredtech.goatcounter.com/count");
    document.head.appendChild(gc);
  } catch (e) { /* the counter is optional; the page still works */ }

  // ----- About page: show the total (the line hides itself if it can't load) -----
  var line = document.getElementById("visitor-line");
  var num = document.getElementById("visitor-count");
  if (line && num && window.fetch) {
    fetch("https://overengineeredtech.goatcounter.com/counter/TOTAL.json")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || d.count === undefined) { throw new Error("no count"); }
        num.textContent = d.count;
        line.hidden = false;
      })
      .catch(function () { line.hidden = true; });
  }

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
