<template>
  <div>
    <div style="display: flex; gap: 16px; align-items: center;">
      <my-avatar shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <my-avatar shape="circle" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <my-avatar shape="square">
        <my-icon icon="user" />
      </my-avatar>
      <my-avatar shape="circle">
        <my-icon icon="user" />
      </my-avatar>
    </div>
  </div>
</template>

<script setup>
import { MyAvatar, MyIcon } from 'one-wish'
</script>
