import { ref, type Ref } from 'vue'
import type { FormInstance, UseFormReturn } from './types'

export const useForm = (initialRef?: Ref<FormInstance | undefined>): UseFormReturn => {
  const formRef = initialRef ?? ref<FormInstance>()

  const getForm = () => {
    if (!formRef.value) {
      console.warn('[one-wish] Form instance is not available yet.')
      return undefined
    }
    return formRef.value
  }

  const validate: FormInstance['validate'] = async props => {
    const form = getForm()
    if (!form) return false
    return form.validate(props)
  }

  const resetFields: FormInstance['resetFields'] = props => {
    getForm()?.resetFields(props)
  }

  const clearValidate: FormInstance['clearValidate'] = props => {
    getForm()?.clearValidate(props)
  }

  return [formRef, { validate, resetFields, clearValidate }]
}
