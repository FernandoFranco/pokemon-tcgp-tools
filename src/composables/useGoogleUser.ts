import {
  decodeCredential,
  googleLogout,
  googleOneTap,
  type CallbackTypes,
} from "vue3-google-login";

export interface GoogleUser {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

interface UseGoogleUser {
  user: globalThis.Ref<GoogleUser | null>;
  callbackHandle: CallbackTypes.CredentialCallback;
  logoutHandle: () => Promise<void>;
}

const user = ref<GoogleUser | null>(null);
const initialized = ref<boolean>(false);

export function useGoogleUser(): UseGoogleUser {
  const callbackHandle: CallbackTypes.CredentialCallback = (response) => {
    user.value = decodeCredential(response.credential) as GoogleUser;
  };

  const logoutHandle = async () => {
    await googleLogout();
    user.value = null;
  };

  onMounted(async () => {
    if (initialized.value) return;
    initialized.value = true;

    console.log("GOOGLE ONDE TAP");
    const response = await googleOneTap({ autoLogin: true });
    if (!response) return;

    callbackHandle(response);
  });

  return { user, callbackHandle, logoutHandle };
}
