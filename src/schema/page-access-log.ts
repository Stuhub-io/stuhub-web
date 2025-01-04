import { Page } from './page'

export interface PageAccessLog {
  pkid: number
  action: string
  page: Page
  parent_pages: Page[]
  last_accessed: string
}
