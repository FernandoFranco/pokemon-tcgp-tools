import {
  createFile,
  getFileContent,
  searchFile,
  updateFile as updateDriveFile,
  type GoogleDriveFile,
} from "@/services/googleDriveService";
import { useGoogleScript } from "./useGoogleScript";
import { useSnackbar } from "./useSnackbar";

export function useGoogleDriveFile(fileName: string) {
  const snackbar = useSnackbar();
  const { loadGoogleScript } = useGoogleScript();

  const fileContent = ref<string | null>(null);
  const fileId = ref<string | null>(null);
  const loading = ref<boolean>(false);

  async function loadFile() {
    await loadGoogleScript();

    loading.value = true;
    try {
      let file: GoogleDriveFile;
      const files = await searchFile(fileName);
      if (files.length > 0) {
        file = files[0];
      } else {
        file = await createFile(fileName);
      }
      fileId.value = file.id;

      fileContent.value = await getFileContent(file.id);
    } catch (error) {
      console.error(error);
      snackbar.showSnackbar({
        message: (error as Error).message,
        type: "error",
      });
    } finally {
      loading.value = false;
    }
  }

  async function updateFile(newData: string) {
    await loadGoogleScript();
    await loadFile();

    if (!fileId.value) {
      snackbar.showSnackbar({ message: "File not loaded", type: "error" });
      return;
    }

    loading.value = true;
    try {
      await updateDriveFile(fileId.value, newData);
      fileContent.value = newData;
    } catch (error) {
      snackbar.showSnackbar({
        message: (error as Error).message,
        type: "error",
      });
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    fileContent,
    loadFile,
    updateFile,
  };
}
