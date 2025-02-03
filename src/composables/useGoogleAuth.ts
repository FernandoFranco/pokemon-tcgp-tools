import { DRIVE_SCOPE } from "@/services/googleDriveService";
import { useAuthStore, type GoogleUser } from "@/stores/auth";
import { parseJwt } from "@/utils/jwt.utils";
import { useGoogleScript } from "./useGoogleScript";

const hasInitialized = ref<boolean>(false);

export function useGoogleAuth() {
  const { loadGoogleScript } = useGoogleScript();
  const store = useAuthStore();

  async function signIn() {
    await loadGoogleScript();

    if (!window.google) {
      console.error("Google script not loaded");
      return;
    }

    if (hasInitialized.value) {
      console.info("Google auth already initialized");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
      scope: DRIVE_SCOPE,
      auto_select: true,
      callback: async (response: { credential?: string }) => {
        if (!response.credential) return;

        const userObject = parseJwt<GoogleUser>(response.credential);
        store.setUser(userObject);
      },
    });

    if (store.user) return;
    window.google.accounts.id.prompt();
  }

  function renderButton(elementId: string) {
    if (!window.google) {
      console.error("Google script not loaded");
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) {
      console.error("Element not found");
      return;
    }

    window.google.accounts.id.renderButton(element, {
      theme: "outline",
      size: "large",
      shape: "pill",
    });
  }

  function signOut() {
    store.clearUser();
  }

  return { signIn, signOut, renderButton };
}
