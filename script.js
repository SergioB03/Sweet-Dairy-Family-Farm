/* ============================================================
   SWEET DAIRY FAMILY FARM — SCRIPT
   Plain vanilla JavaScript, no libraries. Three small jobs:
   1. Mobile navigation toggle (hamburger button)
   2. Scroll-reveal animations (fade sections in as you scroll)
   3. Contact form → opens the visitor's email app pre-filled
   ============================================================ */

/* Mark that JavaScript is running. The CSS only hides .reveal elements
   when this class is present, so if JS is ever disabled or fails to load,
   the page still shows all of its content. */
document.documentElement.classList.add("js");

/* Wait until the HTML is fully parsed before touching elements */
document.addEventListener("DOMContentLoaded", function () {

  /* ----------------------------------------
     1. MOBILE NAVIGATION
     The button is only visible on small
     screens (see the CSS media query).
     ---------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("open");
      /* aria-expanded tells screen readers whether the menu is open */
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ----------------------------------------
     2. SCROLL-REVEAL ANIMATIONS
     IntersectionObserver watches each .reveal
     element and adds .visible the first time
     it enters the viewport. The CSS handles
     the actual fade/slide animation.
     ---------------------------------------- */
  var revealElements = document.querySelectorAll(".reveal");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); /* animate once, then stop watching */
          }
        });
      },
      { threshold: 0.15 } /* trigger when 15% of the element is visible */
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Old browser or reduced-motion user: just show everything */
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ----------------------------------------
     3. CONTACT FORM
     A static site has no server to receive the
     form, so instead we open the visitor's own
     email app with the message pre-filled.
     ---------------------------------------- */
  var contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); /* stop the browser's default submit/reload */

      var name = document.querySelector("#name").value;
      var email = document.querySelector("#email").value;
      var message = document.querySelector("#message").value;

      var subject = "Website message from " + name;
      var body = message + "\n\n— " + name + " (" + email + ")";

      /* encodeURIComponent makes the text safe to put inside a URL */
      window.location.href =
        "mailto:sweetdairy@example.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

});
