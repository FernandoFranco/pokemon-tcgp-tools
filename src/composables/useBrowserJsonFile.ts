export function useBrowserJsonFile() {
  async function exportFile(data: object, filename: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
  }

  async function importFile(): Promise<object> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.style.display = "none";

      input.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        if (!target.files || target.files.length === 0) return;

        const file = target.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
          resolve(JSON.parse(e.target?.result as string));
        };

        reader.readAsText(file);
      });

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    });
  }

  return { exportFile, importFile };
}
