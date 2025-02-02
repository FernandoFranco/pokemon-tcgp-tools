<template>
  <VApp>
    <VProgressCircular v-if="loading" />
    <RouterView v-else />

    <TcgpSnackbar />
  </VApp>
</template>

<script lang="ts" setup>
import { useFetchData } from "./composables/useFetchData";

const { loading } = useFetchData();
</script>
