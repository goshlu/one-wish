<template>
  <span :class="avatarClass" :style="avatarStyle">
    <img
      v-if="hasImage && !hasError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="imageStyle"
      @error="handleError"
    />
    <my-icon v-else-if="icon" :name="icon" class="my-avatar__icon" />
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { AvatarProps, AvatarEmits } from "./types";

defineOptions({
  name: "MyAvatar",
});

const props = withDefaults(defineProps<AvatarProps>(), {
  size: "default",
  shape: "circle",
  fit: "cover",
});

const emit = defineEmits<AvatarEmits>();

const hasError = ref(false);

const hasImage = computed(() => !!(props.src || props.srcSet));

const avatarClass = computed(() => [
  "my-avatar",
  `my-avatar--${props.shape}`,
  {
    "my-avatar--large": props.size === "large",
    "my-avatar--small": props.size === "small",
    "my-avatar--icon": props.icon,
  },
]);

const avatarStyle = computed(() => {
  const style: Record<string, string> = {};
  
  if (typeof props.size === "number") {
    const size = `${props.size}px`;
    style.width = size;
    style.height = size;
    style.lineHeight = size;
    style.fontSize = `${props.size / 2}px`;
  }
  
  return style;
});

const imageStyle = computed(() => ({
  objectFit: props.fit,
}));

const handleError = (event: Event) => {
  hasError.value = true;
  emit("error", event);
  props.onError?.(event);
};

// 监听src变化，重置错误状态
watch(
  () => props.src,
  () => {
    hasError.value = false;
  }
);

watch(
  () => props.srcSet,
  () => {
    hasError.value = false;
  }
);
</script>

<style scoped>
.my-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  background-color: var(--bg-color-light);
  color: var(--text-regular);
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
}

.my-avatar--circle {
  border-radius: 50%;
}

.my-avatar--square {
  border-radius: var(--border-radius-base);
}

.my-avatar--large {
  width: 56px;
  height: 56px;
  font-size: 20px;
  line-height: 56px;
}

.my-avatar--small {
  width: 32px;
  height: 32px;
  font-size: 12px;
  line-height: 32px;
}

.my-avatar img {
  width: 100%;
  height: 100%;
  display: block;
}

.my-avatar__icon {
  font-size: inherit;
  line-height: inherit;
}
</style>
