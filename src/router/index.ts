/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { setupLayouts } from "virtual:generated-layouts";
import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");

  if (window.location.search.includes("redirect")) {
    const redirect = window.location.search.split("redirect=")[1];
    let newRoute = decodeURIComponent(redirect);
    if (newRoute.startsWith("/")) {
      newRoute = newRoute.slice(1);
    }
    router.replace(newRoute);
  }
});

export default router;
