<template>
  <div class="mr-4 d-flex align-center justify-center">
    <GoogleLogin
      v-if="!user"
      :callback="callbackHandle"
      :button-config="{
        size: 'large',
        shape: 'pill',
      }"
    />
    <VMenu v-else>
      <template #activator="{ props }">
        <VAvatar v-bind="props" :image="user?.picture" color="primary" />
      </template>

      <VList>
        <VListItem @click="logoutHandle" title="Logout" />
      </VList>
    </VMenu>
  </div>
</template>

<script lang="ts" setup>
import { useGoogleUser } from "@/composables/useGoogleUser";
import { GoogleLogin } from "vue3-google-login";

const { user, callbackHandle, logoutHandle } = useGoogleUser();
</script>
