<template>
  <VApp>
    <VMain v-if="loadingFetchData || loadingUserData" class="bg-grey-lighten-3">
      <VContainer class="d-flex h-100 w-100 align-center justify-center">
        <VProgressCircular color="primary" size="256" indeterminate>
          <VImg src="@/assets/logo.png" width="128" />
        </VProgressCircular>
      </VContainer>
    </VMain>
    <RouterView v-else />

    <TcgpSnackbar />
  </VApp>
</template>

<script lang="ts" setup>
import { useFetchData } from "./composables/useFetchData";
import { useUserData } from "./composables/useUserData";

const { loading: loadingFetchData } = useFetchData();
const { loading: loadingUserData } = useUserData();
</script>
