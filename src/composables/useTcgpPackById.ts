import { db } from "@/db";
import type { Pack } from "@/db/models/pack.model";

export function useTcgpPackById(id: string) {
  const pack = ref<Pack | undefined>(undefined);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    pack.value = await db.packs.where({ id }).first();
    loading.value = false;
  });

  return {
    pack,
    loading,
  };
}
