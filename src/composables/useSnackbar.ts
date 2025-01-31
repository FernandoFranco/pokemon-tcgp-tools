import { ref } from "vue";

type SnackbarType = "success" | "error" | "warning" | "info";

interface SnackbarOptions {
  message: string;
  type?: SnackbarType;
  timeout?: number;
}

const show = ref(false);
const message = ref("");
const color = ref<SnackbarType>("success");
const timeout = ref(3000); // Tempo padrão de exibição

export function useSnackbar() {
  function showSnackbar({
    message: msg,
    type = "success",
    timeout: time = 3000,
  }: SnackbarOptions) {
    message.value = msg;
    color.value = type;
    timeout.value = time;
    show.value = true;
  }

  return { show, message, color, timeout, showSnackbar };
}
