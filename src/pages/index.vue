<template>
  <VContainer>
    <tempalte v-for="pack in packs" :key="pack.id">
      <VHover #default="{ isHovering, props }">
        <TcgpPack
          v-bind="props"
          class="mb-4"
          :data="pack"
          :elevation="isHovering ? 4 : 1"
          @click="$router.push(`/packs/${pack.name}`)"
        />
      </VHover>
    </tempalte>
  </VContainer>
</template>

<script lang="ts" setup>
import TcgpPack from "@/components/TcgpPack.vue";
import { useFetch } from "@/composables/useFetch";
import { useSnackbar } from "@/composables/useSnackbar";
import type { DataPack } from "@/types/pack.type";
import { onMounted } from "vue";

const snackbar = useSnackbar();
const { data: packs, fetchData } = useFetch<DataPack[]>("/data/packs.json");

onMounted(async () => {
  try {
    fetchData();
  } catch {
    snackbar.showSnackbar({ message: "Failed to fetch packs", type: "error" });
  }
});
</script>
