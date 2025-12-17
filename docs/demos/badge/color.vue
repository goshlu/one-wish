<template>
  <div>
    <div style="display: flex; gap: 16px; align-items: center;">
      <my-badge value="new" color="#42b883" class="item">
        <my-button>绿色</my-button>
      </my-badge>
      <my-badge value="hot" color="#f56c6c" class="item">
        <my-button>红色</my-button>
      </my-badge>
      <my-badge value="new" color="#e6a23c" class="item">
        <my-button>橙色</my-button>
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
