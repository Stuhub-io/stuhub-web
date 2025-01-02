'use client'

import { Layout } from '@/components/common/Layout'
import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react'
import { Panel, PanelResizeHandle, PanelGroup } from 'react-resizable-panels'
import { MainSideBar } from './MainSidebar'
import { useDebouncedCallback } from 'use-debounce'
import { Button } from '@nextui-org/react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { cn } from '@/libs/utils'
import { useSidebar } from '@/components/providers/sidebar'
import { useAuthContext } from '@/components/auth/AuthGuard'

const MIN_SIZE = 200

console.warn = () => {}

export const MainLayout = ({ children }: PropsWithChildren) => {
  const [minSize, setMinSize] = useState(15)
  const [maxSize, setMaxSize] = useState(30)

  const { showSidebar, setShowSidebar } = useSidebar()
  const { status } = useAuthContext()

  const setMinSizeDebounce = useDebouncedCallback(setMinSize, 100)
  const setMaxSizeDebounce = useDebouncedCallback(setMaxSize, 100)

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!wrapperRef.current || status == 'unauthenticated') {
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
  }, [setMaxSizeDebounce, setMinSizeDebounce, status])

  return (
    <Layout container={false} ref={wrapperRef} wrapperClassName="overflow-y-hidden" key={status}>
      <PanelGroup direction="horizontal" autoSaveId="main-layout-sidebar">
        {status === 'authenticated' && (
          <>
            <Panel
              defaultSize={showSidebar ? minSize : 0}
              order={1}
              minSize={minSize}
              maxSize={maxSize}
              className={cn('bg-background', {
                hidden: !showSidebar,
              })}
            >
              <MainSideBar />
            </Panel>
            <PanelResizeHandle />
          </>
        )}
        <Panel order={2} className="relative bg-background">
          {status === 'authenticated' && (
            <div className='absolute left-0 top-16 z-50 group h-[200px] w-6'>
              <Button
                isIconOnly
                className="!w-6 min-w-0 rounded-l-none opacity-0 group-hover:opacity-100 transition duration-300"
                onClick={() => setShowSidebar(!showSidebar)}
                size="md"
                variant="solid"
              >
                <RiArrowRightSLine
                  size={16}
                  className={cn({
                    'rotate-180': showSidebar,
                  })}
                />
              </Button>
            </div>
          )}
          {children}
        </Panel>
      </PanelGroup>
    </Layout>
  )
}
