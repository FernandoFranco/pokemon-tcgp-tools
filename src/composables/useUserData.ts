import { useGoogleDriveFile } from "./useGoogleDriveFile";
import { useSnackbar } from "./useSnackbar";
export interface UserData {
  cards: string[];
}

const CLEAN_DATA: UserData = {
  cards: [],
};

const snackbar = useSnackbar();
const { loadFile, updateFile, fileContent } = useGoogleDriveFile(
  "ptcgp-user-data.json"
);

const initialized = ref<boolean>(false);
const loading = ref<boolean>(false);
const data = ref<UserData>(null!);

const debounce = ref<number>(0);

watch(
  () => data.value,
  (newData, oldValue) => {
    if (oldValue === null) return;

    clearTimeout(debounce.value);
    debounce.value = setTimeout(async () => {
      snackbar.showSnackbar({ message: "Saving data...", type: "info" });
      await updateFile(JSON.stringify(newData));
    }, 1000);
  },
  { deep: true }
);

export function useUserData() {
  onMounted(async () => {
    if (initialized.value) return;
    initialized.value = true;

    loading.value = true;
    try {
      await loadFile();
      nextTick(() => {
        if (!fileContent.value) return;
        data.value = JSON.parse(fileContent.value);
      });
    } finally {
      loading.value = false;
    }
  });

  async function clearData() {
    await updateFile(JSON.stringify(CLEAN_DATA));
  }

  return { data, loading, clearData };
}
