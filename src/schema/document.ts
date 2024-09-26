import { CreatePageRequestBody, Page } from './page'

export interface CreateDocumentBody {
  page: CreatePageRequestBody
  json_content: string
}

export interface Document {
  pkid: number
  page_pkid: number
  content: string
  json_content: string
  updated_at: string
  created_at: string
}

export interface CreateDocumentData {
  page: Page
  document: Document
}

export interface UpdateDocumentContentInput extends Pick<Document, 'pkid' | 'json_content'> {}
