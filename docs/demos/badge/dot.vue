<template>
  <div>
    <div style="display: flex; gap: 16px; align-items: center;">
      <my-badge is-dot class="item">
        <my-button>评论</my-button>
      </my-badge>
      <my-badge is-dot class="item">
        <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </my-badge>
      <my-badge is-dot type="primary" class="item">
        <my-button>主要</my-button>
      </my-badge>
      <my-badge is-dot type="success" class="item">
        <my-button>成功</my-button>
      </my-badge>
    </div>
  </div>
</template>

<script setup>
import { MyBadge, MyButton, MyAvatar } from 'one-wish'
</script>

<style scoped>
.item {
  margin-top: 16px;
}
</style>
