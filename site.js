/* Xautic Car Spa — shared site chrome.
   Single source of truth for the top navigation so every page is identical.
   Each page sets <body data-page="home|detailing|contact|memberships">. */
(function () {
  "use strict";

  var NAV_LINKS = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "Detailing.html", label: "Detailing", key: "detailing" },
    { href: "Contact.html", label: "About &amp; Contact", key: "contact" }
  ];

  /* Primary call-to-action, consistent across the whole site. */
  var CTA = {
    href: "https://app.everwash.com/#membership-plans/1059",
    label: "Book Now",
    external: true
  };

  function buildNav() {
    var page = (document.body.getAttribute("data-page") || "").toLowerCase();

    var links = NAV_LINKS.map(function (l) {
      var current = l.key === page ? ' aria-current="page"' : "";
      return '<a href="' + l.href + '"' + current + ">" + l.label + "</a>";
    }).join("");

    var ctaAttrs = CTA.external ? ' target="_blank" rel="noopener"' : "";

    var nav = document.createElement("nav");
    nav.className = "nav always-solid";
    nav.id = "nav";
    nav.setAttribute("data-screen-label", "Nav");
    nav.innerHTML =
      '<a href="index.html" class="wordmark" aria-label="Xautic Car Spa home">' +
        '<img src="images/logo-xautic-v2.png" alt="Xautic Car Spa & Detailing" class="nav-logo" /></a>' +
      '<div class="nav-links">' + links + "</div>" +
      '<a href="' + CTA.href + '"' + ctaAttrs + ' class="btn btn-primary nav-cta">' + CTA.label + "</a>" +
      '<button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">' +
        "<span></span><span></span><span></span></button>";

    document.body.insertBefore(nav, document.body.firstChild);

    /* Mobile menu toggle */
    var burger = nav.querySelector(".nav-hamburger");
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    /* Close the mobile menu after tapping a link */
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildNav);
  } else {
    buildNav();
  }
})();
