import { db } from "@/db";

export function useTcgpMyCards() {
  const myCards = ref<string[]>([]);
  const loading = ref<boolean>(false);

  onMounted(async () => {
    loading.value = true;
    myCards.value = (await db.myCards.toArray()).map((card) => card.id);
    setTimeout(() => {
      loading.value = false;
    }, 300);
  });

  watch(
    () => myCards.value,
    async (newCards) => {
      if (loading.value) return;

      await db.myCards.clear();
      await db.myCards.bulkAdd(newCards.map((id) => ({ id })));
    }
  );

  return {
    myCards,
    loading,
  };
}
