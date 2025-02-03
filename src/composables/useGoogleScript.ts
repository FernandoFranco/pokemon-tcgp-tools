import { loadExternalScript } from "@/utils/script.utils";

let loadScriptPromise: Promise<void> | null = null;

export function useGoogleScript() {
  async function loadGoogleScript() {
    if (!loadScriptPromise) {
      loadScriptPromise = loadExternalScript({
        url: "https://accounts.google.com/gsi/client",
        id: "google-js",
      });
    }

    return loadScriptPromise;
  }

  return { loadGoogleScript };
}
