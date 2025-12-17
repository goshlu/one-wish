<template>
  <div>
    <div style="display: flex; gap: 16px; align-items: center;">
      <my-badge :value="12" class="item">
        <my-button>评论</my-button>
      </my-badge>
      <my-badge :value="3" class="item">
        <my-button>回复</my-button>
      </my-badge>
      <my-badge :value="1" class="item">
        <my-button>评论</my-button>
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
