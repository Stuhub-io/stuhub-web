import { TOCHeading } from '@/components/common/BlockBasedEditor/utils/extract-headings'
import { PopperCard } from '@/components/common/PopperCard'
import { SidebarItemLeftSpacer } from '@/components/layout/SideBar/SidebarItemLeftSpacer'
import { cn } from '@/libs/utils'
import {
  Card,
  CardBody,
  Listbox,
  ListboxItem,
  ListboxSection,
  useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface TableOfContentProps {
  headings: TOCHeading[]
}

export const TableOfContent = (props: TableOfContentProps & { delay?: number }) => {
  const { delay = 400, ...rest } = props
  const [show, setShow] = useState(false)

  // make sure headings is rendered
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, delay)
  }, [])

  return show ? <TableOfContentInner {...rest} /> : null
}

export const TableOfContentInner = (props: TableOfContentProps) => {
  const { headings } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeHeading, setActiveHeading] = useState('')

  const placeHolderWidthCls: Record<number, string> = {
    1: 'w-[24px]',
    2: 'w-[18px]',
    3: 'w-[12px]',
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id)
        }
      })
    })
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((h) => h !== null) as Element[]

    headingElements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [headings])

  return (
    <>
      <div className="fixed right-4 top-1/2 h-full max-h-[calc(100vh-500px)] w-14 -translate-y-1/2 overflow-hidden">
        <div className="flex w-full flex-col items-end gap-3" onMouseEnter={onOpen}>
          <PopperCard
            isOpen={isOpen}
            onClose={onClose}
            placement="left-start"
            classNames={{
              base: '-!translate-y-full',
            }}
            renderContent={(setRef) => {
              return (
                <Card
                  ref={setRef}
                  className="max-h-[calc(100vh-300px)] min-h-[400px] w-[280px]"
                  onMouseLeave={onClose}
                >
                  <CardBody>
                    <Listbox variant="faded">
                      <ListboxSection title="Table of Content">
                        {headings.map((heading, index) => (
                          <ListboxItem
                            key={index}
                            as={Link}
                            href={`#${heading.id}`}
                            onClick={() => setActiveHeading(heading.id)}
                            className={cn('[&_span]:line-clamp-2 [&_span]:text-wrap', {
                              'text-text-primary': activeHeading === heading.id,
                              'text-text-tertiary': activeHeading !== heading.id,
                            })}
                            startContent={<SidebarItemLeftSpacer level={heading.level - 1} />}
                          >
                            {heading.value}
                          </ListboxItem>
                        ))}
                      </ListboxSection>
                    </Listbox>
                  </CardBody>
                </Card>
              )
            }}
          >
            <div className="-translate-y-[40px] translate-x-3" />
          </PopperCard>
          {headings.map((heading, index) => (
            <div
              key={index}
              className={cn(
                placeHolderWidthCls[heading.level],
                'h-1 rounded-small bg-text-tertiary transition-all',
                {
                  'bg-text-primary': activeHeading === heading.id,
                  'bg-text-tertiary opacity-60': activeHeading !== heading.id,
                },
              )}
            />
          ))}
        </div>
      </div>
    </>
  )
}
