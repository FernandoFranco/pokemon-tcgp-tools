import { defineStore } from "pinia";

export interface GoogleUser {
  sub: string;
  name: string;
  email: string;
  picture: string;
  [key: string]: unknown;
}

export const useAuthStore = defineStore("auth", {
  state: (): { user: GoogleUser | null } => ({
    user: JSON.parse(localStorage.getItem("user") ?? "null"),
  }),
  actions: {
    setUser(user: GoogleUser) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
