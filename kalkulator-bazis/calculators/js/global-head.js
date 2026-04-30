const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";

const basePath = isLocal
  ? "/kalkulator-bazis/calculators/favicon"
  : "/favicon";

const headContent = `
<link rel="icon" type="image/png" href="${basePath}/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="${basePath}/favicon.svg" />
<link rel="shortcut icon" href="${basePath}/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="${basePath}/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Kalkulátor Bázis" />
<link rel="manifest" href="${basePath}/site.webmanifest" />
`;

document.head.insertAdjacentHTML("beforeend", headContent);