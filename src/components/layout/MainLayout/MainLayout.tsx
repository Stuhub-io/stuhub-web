'use client'

import { Layout } from '@/components/common/Layout'
import { PropsWithChildren } from 'react'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import { SideBar } from '../SideBar'

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout container={false}>
      <PanelGroup direction="horizontal" autoSaveId="main-layout-sidebar">
        <Panel order={1} minSize={15} maxSize={30}>
          <SideBar />
        </Panel>
        <PanelResizeHandle />
        <Panel order={2}>{children}</Panel>
      </PanelGroup>
    </Layout>
  )
}
