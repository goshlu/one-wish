<template>
  <my-form :model="model" :rules="rules" ref="formRef" label-width="90px">
    <my-form-item label="邮箱" prop="email">
      <my-input v-model="model.email" placeholder="请输入邮箱" />
    </my-form-item>
    <my-form-item label="年龄" prop="age">
      <my-input-number v-model="model.age" :min="0" :max="150" />
    </my-form-item>
    <my-form-item>
      <my-space>
        <my-button type="primary" @click="handleValidate">校验</my-button>
        <my-button @click="handleReset">重置</my-button>
      </my-space>
    </my-form-item>
  </my-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'one-wish'

const model = reactive({ email: '', age: -1 })

const rules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: ['blur', 'change'] },
    {
      pattern: /^[\w-.]+@[\w-]+\.[\w-.]+$/,
      message: '邮箱格式不正确',
      trigger: ['blur', 'change'],
    },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: ['blur', 'change'] },
    {
      validator: value => (value >= 0 && value <= 150) || '年龄需在 0-150 之间',
      trigger: ['blur', 'change'],
    },
  ],
}

const formRef = ref<FormInstance>()

const handleValidate = async () => {
  const valid = await formRef.value?.validate()
  if (valid) {
    window.alert('校验通过')
  } else {
    window.alert('校验未通过，请检查上方红色提示')
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
}
</script>
