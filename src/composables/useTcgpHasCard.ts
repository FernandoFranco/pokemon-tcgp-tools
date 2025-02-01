import { db } from "@/db";

export function useTcgpHasCard() {
  const myCards = ref<string[]>([]);
  const loading = ref<boolean>(false);

  onMounted(async () => {
    loading.value = true;
    myCards.value = (await db.myCards.toArray()).map((card) => card.id);
    loading.value = false;
  });

  watch(
    () => myCards.value,
    async (newCards) => {
      await db.myCards.clear();
      await db.myCards.bulkAdd(newCards.map((id) => ({ id })));
    }
  );

  return {
    myCards,
    loading,
  };
}
