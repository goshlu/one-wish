<template>
  <div>
    <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
      <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" shape="square" />
      <my-avatar>U</my-avatar>
      <my-avatar>
        <my-icon icon="user" />
      </my-avatar>
    </div>
  </div>
</template>

<script setup>
import { MyAvatar, MyIcon } from 'one-wish'
</script>
