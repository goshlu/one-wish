export type UploadType = 'select' | 'drag'
export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string
  name: string
  size?: number
  status: UploadStatus
  percentage?: number
  url?: string
  response?: any
  error?: Error
  raw?: File
}

export interface UploadProps {
  accept?: string
  action?: string
  headers?: Record<string, string>
  data?: Record<string, any> | ((file: UploadFile) => Record<string, any>)
  multiple?: boolean
  name?: string
  withCredentials?: boolean
  showFileList?: boolean
  drag?: boolean
  disabled?: boolean
  limit?: number
  fileSize?: number
  fileList?: UploadFile[]
  autoUpload?: boolean
  httpRequest?: (options: UploadRequestOptions) => Promise<any>
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  onProgress?: (event: ProgressEvent, file: UploadFile) => void
  onSuccess?: (response: any, file: UploadFile) => void
  onError?: (error: Error, file: UploadFile) => void
  onChange?: (file: UploadFile, fileList: UploadFile[]) => void
  onRemove?: (file: UploadFile, fileList: UploadFile[]) => void
  onExceed?: (files: File[], fileList: UploadFile[]) => void
  onPreview?: (file: UploadFile) => void
}

export interface UploadRequestOptions {
  action: string
  method: string
  headers: Record<string, string>
  data: Record<string, any>
  file: File
  filename: string
  withCredentials: boolean
  onProgress: (event: ProgressEvent) => void
  onSuccess: (response: any) => void
  onError: (error: Error) => void
}

export interface UploadEmits {
  (e: 'update:fileList', fileList: UploadFile[]): void
  (e: 'change', file: UploadFile, fileList: UploadFile[]): void
  (e: 'remove', file: UploadFile, fileList: UploadFile[]): void
  (e: 'preview', file: UploadFile): void
  (e: 'exceed', files: File[], fileList: UploadFile[]): void
  (e: 'progress', event: ProgressEvent, file: UploadFile): void
  (e: 'success', response: any, file: UploadFile): void
  (e: 'error', error: Error, file: UploadFile): void
}
