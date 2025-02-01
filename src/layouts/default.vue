<template>
  <VAppBar app>
    <VToolbarTitle class="text-center">
      <a :href="`${baseUrl}/`">
        <VImg src="@/assets/logo.png" height="64" />
      </a>
    </VToolbarTitle>
  </VAppBar>

  <VMain>
    <RouterView />
  </VMain>
</template>

<script lang="ts" setup>
import { useBaseUrl } from "@/composables/useBaseUrl";

const baseUrl = useBaseUrl();
</script>
