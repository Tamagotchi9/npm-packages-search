export const API_NPM_URL = process.env.VUE_APP_API_NPM_URL;
export const API_GITHUB_URL = process.env.VUE_APP_API_GITHUB_URL;

export const API_QUERIES =
  "&size=100&quality=1.0&maintenance=0.0&popularity=0.0";

export async function fetchPackages(text) {
  return fetch(`${API_NPM_URL}?text=${text}${API_QUERIES}`);
}

export async function fetchAuthor() {
  return fetch(`${API_GITHUB_URL}`);
}

export const packagesIcons = {
  npm: "npm",
  homepage: "web",
  repository: "github",
  bugs: "bug"
};
