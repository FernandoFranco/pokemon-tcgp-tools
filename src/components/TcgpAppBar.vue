<template>
  <VAppBar app>
    <template #title>
      <a :href="`${baseUrl}/`">
        <VImg src="@/assets/logo.png" width="64" />
      </a>
    </template>

    <template #append>
      <TcgpLoginButton />
    </template>
  </VAppBar>
</template>

<script lang="ts" setup>
import { useBaseUrl } from "@/composables/useBaseUrl";

const baseUrl = useBaseUrl();
</script>

<style lang="scss" scoped>
.v-toolbar-title {
  a {
    display: flex;
    width: 64px;
  }
}
</style>
