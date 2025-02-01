<template>
  <div>
    <img v-for="i in count" :key="i" :src="image ?? ''" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  rarity: {
    type: Number,
    required: true,
  },
});

const images = {
  diamond: new URL("@/assets/rarity/diamond.png", import.meta.url).href,
  star: new URL("@/assets/rarity/star.png", import.meta.url).href,
  crown: new URL("@/assets/rarity/crown.png", import.meta.url).href,
};

const image = computed(() => {
  if (props.rarity <= 4) {
    return images.diamond;
  }
  if (props.rarity <= 7) {
    return images.star;
  }
  if (props.rarity <= 8) {
    return images.crown;
  }
  return null;
});

const count = computed(() => {
  if (props.rarity <= 4) {
    return props.rarity;
  }
  if (props.rarity <= 7) {
    return props.rarity - 4;
  }
  if (props.rarity <= 8) {
    return props.rarity - 7;
  }
  return props.rarity - 4;
});
</script>

<style lang="scss" scoped>
div {
  display: flex;
  gap: 4px;

  > img {
    max-height: 16px;
  }
}
</style>
