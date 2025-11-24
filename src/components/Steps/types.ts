export interface StepItem {
  title: string
  description?: string
  status?: 'wait' | 'process' | 'finish' | 'error'
}

export interface StepsProps {
  steps: StepItem[]
  current?: number
}
