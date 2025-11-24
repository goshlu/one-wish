<template>
  <div>
    <!-- 注入 SVG 符号库 -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <defs>
        <!-- Star icon -->
        <symbol id="icon-star" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </symbol>

        <!-- Heart icon -->
        <symbol id="icon-heart" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </symbol>

        <!-- Check icon -->
        <symbol id="icon-check" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 6L9 17l-5-5"/>
        </symbol>

        <!-- Close icon -->
        <symbol id="icon-close" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M18 6L6 18M6 6l12 12"/>
        </symbol>

        <!-- Loading icon -->
        <symbol id="icon-loading" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10"/>
        </symbol>

        <!-- Refresh icon -->
        <symbol id="icon-refresh" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"/>
        </symbol>

        <!-- Circle icon -->
        <symbol id="icon-circle" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
        </symbol>

        <!-- Square icon -->
        <symbol id="icon-square" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/>
        </symbol>

        <!-- Download icon -->
        <symbol id="icon-download" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </symbol>

        <!-- Upload icon -->
        <symbol id="icon-upload" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
        </symbol>

        <!-- Warning icon -->
        <symbol id="icon-warning" viewBox="0 0 24 24">
          <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </symbol>

        <!-- Home icon -->
        <symbol id="icon-home" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="9 22 9 12 15 12 15 22"/>
        </symbol>

        <!-- Settings icon -->
        <symbol id="icon-settings" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-15.78 7.78l4.24-4.24m2.12-2.12l4.24-4.24"/>
        </symbol>

        <!-- User icon -->
        <symbol id="icon-user" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
        </symbol>
      </defs>
    </svg>

    <DefaultTheme.Layout />
  </div>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
</script>
