import { useTcgpMyCards } from "./useTcgpMyCards";

export function useExportData() {
  const { loading: loadingMyCards, myCards } = useTcgpMyCards();

  const exportDatabase = async () => {
    const blob = new Blob([JSON.stringify(myCards.value, null, 2)], {
      type: "application/json",
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "my-data-tcgp.json";
    a.click();

    URL.revokeObjectURL(a.href);
  };

  return { loading: loadingMyCards, exportDatabase };
}
