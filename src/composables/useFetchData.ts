import { db } from "@/db";
import type { Card } from "@/db/models/card.model";
import type { Expansion } from "@/db/models/expansion.model";
import type { Pack } from "@/db/models/pack.model";
import { useSnackbar } from "./useSnackbar";

export function useFetchData() {
  const snackbar = useSnackbar();

  const loading = ref<boolean>(true);

  async function fetchExpansions(): Promise<Expansion[]> {
    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}data/expansions.json`
      );
      return await response.json();
    } catch {
      throw new Error("Failed to load expansions");
    }
  }

  async function fetchPacksByExpansionId(expansionId: string): Promise<void> {
    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}data/packs/${expansionId}.json`
      );
      const packs: Pack[] = await response.json();
      await db.packs.bulkPut(packs.map((pack) => ({ ...pack, expansionId })));
    } catch {
      throw new Error(`Failed to load packs for ${expansionId}`);
    }
  }

  async function fetchCardsByExpansionId(expansionId: string): Promise<void> {
    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}data/cards/${expansionId}.json`
      );
      const cards: Card[] = await response.json();
      await db.cards.bulkPut(
        cards.map((card) => ({
          ...card,
          expansionId,
          id: `${card.id}/${expansionId}`,
        }))
      );
    } catch {
      throw new Error(`Failed to load cards for ${expansionId}`);
    }
  }

  onMounted(async () => {
    try {
      loading.value = false;

      const expansions = await fetchExpansions();
      await db.expansions.bulkPut(expansions);

      for (const expansion of expansions) {
        await fetchPacksByExpansionId(expansion.id);
        await fetchCardsByExpansionId(expansion.id);
      }
    } catch (error: unknown) {
      snackbar.showSnackbar({
        message: (error as Error).message,
        type: "error",
      });
    } finally {
      loading.value = false;
    }
  });

  return { loading };
}
