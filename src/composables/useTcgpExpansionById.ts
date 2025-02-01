import { db } from "@/db";
import type { Expansion } from "@/db/models/expansion.model";

export function useTcgpExpansionById(id: string) {
  const expansion = ref<Expansion | undefined>(undefined);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    expansion.value = await db.expansions.where({ id }).first();
    loading.value = false;
  });

  return {
    loading,
    expansion,
  };
}
