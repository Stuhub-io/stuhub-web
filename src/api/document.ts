import { Client } from '@/libs/client'
import fetcher from '@/libs/fetcher'
import { BaseResponse } from '@/schema/base'
import {
  CreateDocumentBody,
  CreateDocumentData,
  Document,
  UpdateDocumentContentInput,
} from '@/schema/document'

class DocumentService extends Client {
  public createDocument(body: CreateDocumentBody) {
    return fetcher<BaseResponse<CreateDocumentData>>(
      `${this.baseUrl}/v1/document-services/documents`,
      {
        method: 'POST',
        headers: this.privateHeaders,
        body: JSON.stringify(body),
      },
    )
  }
  public getDocumentByPagePkID(pagePkID: number) {
    return fetcher<BaseResponse<Document>>(
      `${this.baseUrl}/v1/document-services/documents/get-by-page/${pagePkID}`,
      {
        headers: this.privateHeaders,
      },
    )
  }
  public updateDocumentContent(params: UpdateDocumentContentInput) {
    const { pkid, ...body } = params
    return fetcher<BaseResponse<Document>>(
      `${this.baseUrl}/v1/document-services/documents/${pkid}`,
      {
        method: 'PUT',
        headers: this.privateHeaders,
        body: JSON.stringify(body),
      },
    )
  }
}

export const documentService = new DocumentService()
