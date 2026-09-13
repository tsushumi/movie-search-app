const STORAGE_KEY = "reelfind_theme";

export function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY) || "dark";
}

export function setStoredTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }
}
