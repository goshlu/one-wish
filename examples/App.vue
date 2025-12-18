<template>
  <div class="demo-container">
    <h1>Vue3 组件库演示</h1>

    <section class="demo-section">
      <h2>按钮组件</h2>

      <div class="demo-block">
        <h3>基础用法</h3>
        <div class="demo-row">
          <my-button>默认按钮</my-button>
          <my-button type="primary">主要按钮</my-button>
          <my-button type="success">成功按钮</my-button>
          <my-button type="warning">警告按钮</my-button>
          <my-button type="danger">危险按钮</my-button>
          <my-button type="info">信息按钮</my-button>
        </div>
      </div>

      <div class="demo-block">
        <h3>朴素按钮</h3>
        <div class="demo-row">
          <my-button plain>朴素按钮</my-button>
          <my-button type="primary" plain>主要按钮</my-button>
          <my-button type="success" plain>成功按钮</my-button>
          <my-button type="warning" plain>警告按钮</my-button>
          <my-button type="danger" plain>危险按钮</my-button>
          <my-button type="info" plain>信息按钮</my-button>
        </div>
      </div>

      <div class="demo-block">
        <h3>圆角按钮</h3>
        <div class="demo-row">
          <my-button round>圆角按钮</my-button>
          <my-button type="primary" round>主要按钮</my-button>
          <my-button type="success" round>成功按钮</my-button>
        </div>
      </div>

      <div class="demo-block">
        <h3>不同尺寸</h3>
        <div class="demo-row">
          <my-button size="large" type="primary">大型按钮</my-button>
          <my-button type="primary">默认按钮</my-button>
          <my-button size="small" type="primary">小型按钮</my-button>
        </div>
      </div>

      <div class="demo-block">
        <h3>禁用与加载</h3>
        <div class="demo-row">
          <my-button type="primary" disabled>禁用按钮</my-button>
          <my-button type="primary" loading>加载中</my-button>
          <my-button type="primary" @click="handleClick">点击测试</my-button>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>输入框组件</h2>

      <div class="demo-block">
        <h3>基础用法</h3>
        <div class="demo-column">
          <my-input v-model="input1" placeholder="请输入内容" />
          <p>输入值: {{ input1 }}</p>
        </div>
      </div>

      <div class="demo-block">
        <h3>可清空</h3>
        <div class="demo-column">
          <my-input v-model="input2" placeholder="请输入内容" clearable />
        </div>
      </div>

      <div class="demo-block">
        <h3>密码输入</h3>
        <div class="demo-column">
          <my-input v-model="input3" type="password" placeholder="请输入密码" />
        </div>
      </div>

      <div class="demo-block">
        <h3>字数限制</h3>
        <div class="demo-column">
          <my-input
            v-model="input4"
            :maxlength="20"
            show-word-limit
            placeholder="最多输入20个字符"
          />
        </div>
      </div>

      <div class="demo-block">
        <h3>不同尺寸</h3>
        <div class="demo-column">
          <my-input v-model="input5" size="large" placeholder="大型输入框" />
          <my-input v-model="input5" placeholder="默认输入框" />
          <my-input v-model="input5" size="small" placeholder="小型输入框" />
        </div>
      </div>

      <div class="demo-block">
        <h3>禁用状态</h3>
        <div class="demo-column">
          <my-input v-model="input6" disabled placeholder="禁用状态" />
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>卡片组件</h2>

      <div class="demo-block">
        <h3>基础卡片</h3>
        <div class="demo-row" style="gap: 24px">
          <my-card title="卡片标题" style="width: 300px">
            <p>这是一个基础卡片组件，带有标题和内容。</p>
          </my-card>

          <my-card
            title="有副标题的卡片"
            subtitle="这是副标题"
            style="width: 300px"
          >
            <p>卡片可以包含标题和副标题。</p>
          </my-card>
        </div>
      </div>

      <div class="demo-block">
        <h3>卡片阴影</h3>
        <div class="demo-row" style="gap: 24px">
          <my-card shadow="always" title="总是显示阴影" style="width: 280px">
            <p>阴影始终显示</p>
          </my-card>

          <my-card shadow="hover" title="悬停时显示阴影" style="width: 280px">
            <p>悬停时阴影出现</p>
          </my-card>

          <my-card shadow="never" title="不显示阴影" style="width: 280px">
            <p>没有阴影效果</p>
          </my-card>
        </div>
      </div>

      <div class="demo-block">
        <h3>可悬浮卡片</h3>
        <div class="demo-row" style="gap: 24px">
          <my-card
            hoverable
            title="可悬浮卡片"
            style="width: 300px"
            @click="handleCardClick"
          >
            <p>悬浮时会升起，可响应点击事件</p>
          </my-card>
        </div>
      </div>

      <div class="demo-block">
        <h3>加载状态</h3>
        <div class="demo-row" style="gap: 24px">
          <my-card :loading="isLoading" title="加载中..." style="width: 300px">
            <p>加载完成时会显示此内容</p>
            <my-button
              @click="handleLoadClick"
              type="primary"
              style="margin-top: 12px"
            >
              {{ isLoading ? '取消加载' : '开始加载' }}
            </my-button>
          </my-card>
        </div>
      </div>

      <div class="demo-block">
        <h3>卡片尺寸</h3>
        <div class="demo-column">
          <my-card size="small" title="小卡片" style="width: 100%">
            <p>这是一个小尺寸的卡片</p>
          </my-card>
          <my-card title="默认卡片" style="width: 100%">
            <p>这是默认尺寸的卡片</p>
          </my-card>
          <my-card size="large" title="大卡片" style="width: 100%">
            <p>这是一个大尺寸的卡片</p>
          </my-card>
        </div>
      </div>

      <div class="demo-block">
        <h3>带操作的卡片</h3>
        <div class="demo-row" style="gap: 24px">
          <my-card title="操作卡片" style="width: 300px">
            <template #extra>
              <my-button type="primary" size="small">操作</my-button>
            </template>
            <p>卡片支持在标题区域添加额外操作</p>
            <template #actions>
              <my-button plain type="primary" size="small">编辑</my-button>
              <my-button plain type="danger" size="small">删除</my-button>
            </template>
          </my-card>
        </div>
      </div>

      <div class="demo-block">
        <h3>禁用状态</h3>
        <div class="demo-row" style="gap: 24px">
          <my-card disabled title="禁用的卡片" style="width: 300px">
            <p>禁用的卡片无法交互</p>
          </my-card>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>悬浮按钮组件</h2>

      <div class="demo-block">
        <h3>基础用法</h3>
        <p>滚动到页面右下角查看悬浮按钮效果</p>
      </div>

      <div class="demo-block">
        <h3>不同类型和形状</h3>
        <div class="demo-row">
          <div>默认圆形</div>
          <div>主要圆形</div>
          <div>方形</div>
          <div>带描述</div>
        </div>
      </div>

      <div class="demo-block">
        <h3>悬浮按钮组</h3>
        <p>滚动到页面右下角点击 + 号展开菜单</p>
      </div>
    </section>
  </div>

  <!-- 悬浮按钮示例 -->
  <my-float-button icon="↑" tooltip="返回顶部" @click="scrollToTop" />

  <my-float-button
    type="primary"
    icon="✉️"
    description="反馈"
    position="right-bottom"
    :badge="3"
    style="bottom: 90px"
    @click="handleFeedback"
  />

  <my-float-button-group position="right-bottom" style="bottom: 160px">
    <my-float-button icon="📝" description="编辑" @click="handleEdit" />
    <my-float-button icon="💾" description="保存" @click="handleSave" />
    <my-float-button icon="🗑️" description="删除" @click="handleDelete" />
  </my-float-button-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MyButton from '../src/components/Button/Button.vue'
import MyInput from '../src/components/Input/Input.vue'
import MyFloatButton from '../src/components/FloatButton/FloatButton.vue'
import MyFloatButtonGroup from '../src/components/FloatButton/FloatButtonGroup.vue'
import MyCard from '../src/components/Card/Card.vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
const input5 = ref('')
const input6 = ref('禁用的内容')
const isLoading = ref(false)

const handleClick = () => {
  alert('按钮被点击了！')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleFeedback = () => {
  alert('打开反馈页面')
}

const handleEdit = () => {
  alert('编辑')
}

const handleSave = () => {
  alert('保存')
}

const handleDelete = () => {
  alert('删除')
}

const handleCardClick = () => {
  alert('卡片被点击了！')
}

const handleLoadClick = () => {
  isLoading.value = !isLoading.value
}
</script>

<style scoped>
.demo-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 40px;
  color: var(--text-primary);
  text-align: center;
}

.demo-section {
  margin-bottom: 60px;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: var(--text-primary);
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border-color-lighter);
}

.demo-block {
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color-lighter);
  border-radius: var(--border-radius-base);
}

h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-regular);
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

p {
  margin: 8px 0 0 0;
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
