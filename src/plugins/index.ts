/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vue3GoogleLogin from "vue3-google-login";
import router from "../router";
import pinia from "../stores";
import vuetify from "./vuetify";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(vue3GoogleLogin, {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    });
}
