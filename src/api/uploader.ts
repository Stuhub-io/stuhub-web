import { Client } from '@/libs/client'
import fetcher from '@/libs/fetcher'
import { BaseResponse } from '@/schema/base'
import { SignedData } from '@/schema/upload'
import { excludeExtension } from '@/utils/file'
import axios from 'axios'

class UploadService extends Client {
  public getSignedUrl(args: {
    public_id?: string
    resource_type?: 'image' | 'video' | 'raw' | 'auto'
  }) {
    return fetcher<BaseResponse<SignedData>>(`${this.baseUrl}/v1/upload-services/sign-url`, {
      method: 'POST',
      headers: this.privateHeaders,
      body: JSON.stringify(args),
    })
  }

  // max 100mb
  public async uploadFile(args: {
    file: File | Blob
    publicID?: string
    resourceType?: 'image' | 'video' | 'raw' | 'auto'
    onExceedSize?: () => void
    onProgress?: (progress: number) => void
    onError?: (error: Error) => void
    abortSignal?: AbortSignal
  }) {
    const { file, publicID, resourceType = 'auto', onProgress, abortSignal } = args
    const asset_name = excludeExtension(publicID?.replaceAll(' ', '-') ?? '')

    const { data } = await this.getSignedUrl({
      public_id: asset_name,
      resource_type: resourceType,
    })
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', data.api_key)
    formData.append('public_id', asset_name)
    formData.append('signature', data.signature)
    formData.append('timestamp', data.timestamp)

    const resp = await axios.post(data.url, formData, {
        signal: abortSignal,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1),
        )
        onProgress?.(percentCompleted)
      },
    })

    return resp.data as {
      secure_url: string
      url: string
      format: string
      resource_type: string
      width: number
      height: number
      public_id: string
      bytes: number
    }
  }
}

export const uploadService = new UploadService()
