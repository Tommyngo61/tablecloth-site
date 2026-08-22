/* Tablecloth marketing site — progressive enhancement only.
   Every word on this page is in the HTML; this file adds motion and the
   mobile menu. With JS blocked the page still reads and scrolls fine, which
   is the point of shipping it as static HTML rather than a JS-rendered app. */

(function () {
  "use strict";

  /* ---- current year in the footer ---- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- sticky nav gets a border once you've scrolled off the top ---- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var burger = document.getElementById("navBurger");
  var mobile = document.getElementById("navMobile");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var open = mobile.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Any tap inside the panel is a navigation - close behind it.
    mobile.addEventListener("click", function (e) {
      if (e.target.tagName !== "A") return;
      mobile.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
    });
  }

  /* ---- scroll reveal ----
     IntersectionObserver only; if it's unavailable the elements are simply
     shown (see the fallback below) rather than left invisible. */
  var reveals = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var showAll = function () {
    reveals.forEach(function (el) { el.classList.add("in"); });
  };

  // Failsafe: if the observer hasn't shown a given element within 2.5s of
  // load - a background tab that never composites, an observer that never
  // fires - show everything anyway. An animation is worth losing; the
  // content is not.
  window.setTimeout(showAll, 2500);

  if (!("IntersectionObserver" in window) || reduced) {
    showAll();
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          // Stagger siblings slightly so a grid animates in as a wave.
          var siblings = Array.prototype.slice.call(entry.target.parentNode.children);
          var i = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- FAQ: one open at a time ----
     <details> handles the open/close itself; this just closes the others so
     the list never turns into a wall of expanded text. */
  var items = document.querySelectorAll("#acc .acc-item");
  items.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      items.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
