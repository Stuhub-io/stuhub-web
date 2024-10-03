'use client'

import { Layout } from '@/components/common/Layout'
import { PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Panel, PanelResizeHandle, PanelGroup } from 'react-resizable-panels'
import { SideBar } from '../SideBar'
import { useDebouncedCallback } from 'use-debounce'
import { usePersistCollapseContext } from '@/components/providers/collapse'
import { Button } from '@nextui-org/react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { cn } from '@/libs/utils'

const MIN_SIZE = 200

console.warn = () => {}

export const MainLayout = ({ children }: PropsWithChildren) => {
  const [minSize, setMinSize] = useState(15)
  const [maxSize, setMaxSize] = useState(30)
  const { getCollapseState, persistCollapseData } = usePersistCollapseContext()
  const [isHide, setIsHide] = useState(() => getCollapseState(`main-layout-sidebar`))

  useEffect(() => {
    persistCollapseData(`main-layout-sidebar`, isHide)
  }, [isHide, persistCollapseData])

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
      <PanelGroup direction="horizontal" autoSaveId="main-layout-sidebar">
        <Panel
          defaultSize={isHide ? 0 : minSize}
          order={1}
          minSize={minSize}
          maxSize={maxSize}
          className={cn({
            hidden: isHide,
          })}
        >
          <SideBar />
        </Panel>
        <PanelResizeHandle />
        <Panel order={2} className="relative">
          <Button
            isIconOnly
            className="absolute left-0 top-16 !w-6 min-w-0 rounded-l-none"
            onClick={() => setIsHide(!isHide)}
            size="md"
            variant="flat"
          >
            <RiArrowRightSLine
              size={16}
              className={cn({
                'rotate-180': !isHide,
              })}
            />
          </Button>
          {children}
        </Panel>
      </PanelGroup>
    </Layout>
  )
}
