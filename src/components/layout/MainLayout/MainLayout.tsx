'use client'

import { Layout } from '@/components/common/Layout'
import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react'
import { Panel, PanelResizeHandle, PanelGroup } from 'react-resizable-panels'
import { SideBar } from '../SideBar'
import { useDebouncedCallback } from 'use-debounce'

const MIN_SIZE = 200

console.warn = () => {}

export const MainLayout = ({ children }: PropsWithChildren) => {
  const [minSize, setMinSize] = useState(15)
  const [maxSize, setMaxSize] = useState(30)

  const setMinSizeDebounce = useDebouncedCallback(setMinSize, 100)
  const setMaxSizeDebounce = useDebouncedCallback(setMaxSize, 100)

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!wrapperRef.current) {
      return
    }
    const observer = new ResizeObserver(() => {
      const width = wrapperRef.current?.offsetWidth ?? 0
      setMinSizeDebounce((MIN_SIZE / width) * 100)
      setMaxSizeDebounce(((MIN_SIZE + 200) / width) * 100)
    })
    observer.observe(wrapperRef.current)

    return () => {
      observer.disconnect()
    }
  }, [setMaxSizeDebounce, setMinSizeDebounce])

  return (
    <Layout container={false} ref={wrapperRef} wrapperClassName="overflow-y-hidden">
      <PanelGroup
        direction="horizontal"
        autoSaveId="main-layout-sidebar"
      >
        <Panel order={1} minSize={minSize} maxSize={maxSize}>
          <SideBar />
        </Panel>
        <PanelResizeHandle />
        <Panel order={2}>{children}</Panel>
      </PanelGroup>
    </Layout>
  )
}
