(function () {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const consent = localStorage.getItem("cookieConsent");

  // 🔥 ha már döntött → ne jelenjen meg
  if (consent === "accepted") {
    banner.style.display = "none";
    loadAnalytics();
    return;
  }

  if (consent === "declined") {
    banner.style.display = "none";
    return;
  }

  // ❗ csak akkor jelenjen meg, ha nincs döntés
  banner.style.display = "flex";

  const acceptBtn = document.getElementById("accept-cookies");
  const declineBtn = document.getElementById("decline-cookies");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      banner.style.display = "none";
      loadAnalytics();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      banner.style.display = "none";
    });
  }
})();

/* Analytics */

function loadAnalytics() {
  if (window.analyticsLoaded) return;
  window.analyticsLoaded = true;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-4JBY0GDC4C";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", "G-4JBY0GDC4C");
}
