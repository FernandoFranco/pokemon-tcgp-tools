<template>
  <div v-if="!authStore.user" class="mr-4 d-flex align-center justify-center">
    <div id="googleButton" />
  </div>

  <VMenu v-else>
    <template #activator="{ props }">
      <VAvatar v-bind="props" :image="authStore.user.picture" color="primary" />
    </template>

    <VList>
      <VListItem @click="handleSignOut" title="Logout" />
    </VList>
  </VMenu>
</template>

<script lang="ts" setup>
import { useGoogleAuth } from "@/composables/useGoogleAuth";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { signIn, signOut, renderButton } = useGoogleAuth();

onMounted(async () => {
  await signIn();

  if (!authStore.user) {
    renderButton("googleButton");
  }
});

function handleSignOut() {
  signOut();
  nextTick(() => {
    renderButton("googleButton");
  });
}
</script>
