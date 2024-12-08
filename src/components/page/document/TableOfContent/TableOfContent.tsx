import { TOCHeading } from '@/components/common/BlockBasedEditor/utils/extract-headings'
import { PopperCard } from '@/components/common/PopperCard'
import { SidebarItemLeftSpacer } from '@/components/common/Sidebar'
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
  }, [delay])

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

  if (!headings.length) return null

  return (
    <>
      <div className="w-14 z-20 shrink-0 -ml-14">
        <div className="sticky h-full max-h-[400px] mt-16 right-0 top-[140px] flex w-full flex-col items-end gap-3" onMouseEnter={onOpen}>
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
                            as={Link}
                            key={index}
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
