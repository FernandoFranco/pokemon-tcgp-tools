import { useTcgpMyCards } from "./useTcgpMyCards";

export function useImportData() {
  const { myCards } = useTcgpMyCards();

  const importDatabase = async () => {
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
        myCards.value = JSON.parse(e.target?.result as string);
      };

      reader.readAsText(file);
    });

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  return { importDatabase };
}
