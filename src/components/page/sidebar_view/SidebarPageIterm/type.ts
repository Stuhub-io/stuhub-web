import { Page } from '@/schema/page'
import { ICreatingDoc } from '@/components/providers/newpage'
import { type FC } from 'react'

export type CreatingPageItemView = FC<{ data: ICreatingDoc; level: number }>
export type ActiveCreatingPageItem = FC<{ level?: number; parentPagePkID?: number }>

export interface BaseSidebarViewerProps {
  parentPage?: Page
  page: Page
  level?: number
  CreatingPageItemView?: CreatingPageItemView
  ActiveCreatingPageItem?: ActiveCreatingPageItem
  SidebarPageItemViewer: BaseSidebarViewer
}

export type BaseSidebarViewer = FC<BaseSidebarViewerProps>
