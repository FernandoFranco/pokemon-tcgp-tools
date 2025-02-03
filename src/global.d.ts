import type { Google } from "./types/google.type";

export {};

declare global {
  interface Window {
    google: Google;
  }
}
