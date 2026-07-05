const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const frameWrapper = document.getElementById("sj-frame-wrapper");
const frameElement = document.getElementById("sj-frame");
const frameUrl = document.getElementById("sj-frame-url");
const errorEl = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");
const backBtn = document.getElementById("sj-back");
const forwardBtn = document.getElementById("sj-forward");
const reloadBtn = document.getElementById("sj-reload");
const homeBtn = document.getElementById("sj-home");
const closeBtn = document.getElementById("sj-close");

let controller;
let frame;

async function init() {
  controller = await initBootstrap();

  const cachePlugin = new $scramjetUtils.HttpCachePlugin();
  const urlWatcher = new $scramjetUtils.UrlWatcherPlugin((url) => {
    frameUrl.textContent = url;
  });
  const catchEscapedLinks = new $scramjetUtils.CatchEscapedLinksPlugin(
    (url) => new URL(`/?goto=${encodeURIComponent(url.href)}`, location.origin)
  );

  frame = controller.createFrame(frameElement, {
    plugins: [cachePlugin, urlWatcher, catchEscapedLinks],
  });
}

function showError(msg, details) {
  frameWrapper.style.display = "none";
  errorEl.textContent = msg;
  errorCode.textContent = details;
}

async function navigate(url) {
  if (!frame || !controller) {
    await init();
  }
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }
  errorEl.textContent = "";
  errorCode.textContent = "";
  await frame.go(url);
  frameWrapper.style.display = "flex";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await navigate(address.value);
  } catch (err) {
    showError(err.message, err.stack);
  }
});

// Browser navigation buttons
backBtn.addEventListener("click", () => frame?.back());
forwardBtn.addEventListener("click", () => frame?.forward());
reloadBtn.addEventListener("click", () => frame?.reload());
homeBtn.addEventListener("click", () => {
  frameWrapper.style.display = "none";
  address.value = "";
  address.focus();
});
closeBtn.addEventListener("click", () => {
  frameWrapper.style.display = "none";
  address.value = "";
  address.focus();
});

// Keyboard shortcut: Escape closes the frame
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && frameWrapper.style.display === "flex") {
    frameWrapper.style.display = "none";
    address.focus();
  }
});

// Auto-navigate if ?goto= is in the URL
const goto = new URL(location.href).searchParams.get("goto");
if (goto) {
  history.replaceState(null, "", location.pathname);
  address.value = goto;
  navigate(goto).catch((err) => showError(err.message, err.stack));
}
