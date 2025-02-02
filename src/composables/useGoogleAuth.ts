import { useAuthStore, type GoogleUser } from "@/stores/auth";
import { parseJwt } from "@/utils/jwt.utils";
import { loadExternalScript } from "@/utils/script.utils";

const googleScriptLoaded = ref<boolean>(false);

export async function loadGoogleScript(): Promise<void> {
  if (googleScriptLoaded.value) return;

  await loadExternalScript({
    url: "https://accounts.google.com/gsi/client",
    id: "google-js",
  });
  googleScriptLoaded.value = true;
}

export function useGoogleAuth() {
  const store = useAuthStore();

  async function signIn() {
    await loadGoogleScript();

    if (!window.google) {
      console.error("Google script not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
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

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            auto_select: boolean;
            callback: (response: { credential?: string }) => void;
          }) => void;
          prompt: () => void;
          renderButton: (
            element: HTMLElement,
            options: { theme: string; size: string; shape: string }
          ) => void;
        };
      };
    };
  }
}
