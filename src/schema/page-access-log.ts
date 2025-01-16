import { Page } from './page'

export interface PageAccessLog {
  pkid: number
  action: string
  is_shared: boolean
  page: Page
  parent_pages: Page[]
  last_accessed: string
}
