<template>
  <VAppBar app>
    <template #title>
      <RouterLink to="/">
        <VImg src="@/assets/logo.png" width="64" />
      </RouterLink>
    </template>

    <template #append>
      <TcgpLoginButton />
    </template>
  </VAppBar>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.v-toolbar-title {
  a {
    display: flex;
    width: 64px;
  }
}
</style>
