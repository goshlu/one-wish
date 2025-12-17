<template>
  <div>
    <div style="display: flex; gap: 16px; align-items: center;">
      <my-badge :value="200" :max="99" class="item">
        <my-button>评论</my-button>
      </my-badge>
      <my-badge :value="100" :max="10" class="item">
        <my-button>回复</my-button>
      </my-badge>
    </div>
  </div>
</template>

<script setup>
import { MyBadge, MyButton } from 'one-wish'
</script>

<style scoped>
.item {
  margin-top: 16px;
}
</style>
