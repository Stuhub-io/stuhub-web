'use client'
import Typography from '@/components/common/Typography'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/libs/utils'
import { Button, Spacer } from '@nextui-org/react'
import { RiCalendar2Fill, RiFileTextFill, RiKanbanView, RiMessage3Fill } from 'react-icons/ri'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <>
      <Spacer y={48} />
      <div className="space-y-6">
        <div className="mx-auto max-w-[900px]">
          <Typography className="w-full text-center" level="h1">
            Revolutionize Your Workflow
          </Typography>
          <Typography className="w-full text-center" level="h1">
            Keep your team working asynchronously
          </Typography>
        </div>
        <div className="mx-auto max-w-[600px]">
          <Typography className="w-full text-center font-thin" level="h5" color="textTertiary">
            Stuhub designed for remote teams to work together, share knowledge, and build a
            community.
          </Typography>
        </div>
        <div className="mx-auto w-fit space-x-4">
          <Button variant="solid" color="primary" size="lg">
            Start trial now
            <AiOutlineArrowRight size={18} />
          </Button>
          <Button
            variant="flat"
            color="default"
            size="lg"
            type="button"
            as={Link}
            
            href={ROUTES.CHANGELOG_PAGE}
          >
            Learn more
          </Button>
        </div>
      </div>
      <Spacer y={48} />
      <div className="flex flex-col">
        <Typography className="mx-auto w-full max-w-[900px] text-center" level="h4">
          Manage everythings
        </Typography>
        <div className="mx-auto mb-8 mt-12 flex w-fit gap-12">
          {[
            {
              Icon: RiMessage3Fill,
              title: 'Collaborative',
            },
            {
              Icon: RiFileTextFill,
              title: 'Documents',
            },
            {
              Icon: RiKanbanView,
              title: 'Kanband Projects',
            },
            {
              Icon: RiCalendar2Fill,
              title: 'Calendar',
            },
          ].map(({ Icon, title }, index) => {
            const selected = index === selectedTab
            return (
              <button
                className="flex flex-col items-center gap-4"
                key={title}
                onClick={() => {
                  setSelectedTab(index)
                }}
              >
                <Icon
                  className={cn('transition-al', {
                    'text-text-tertiary': !selected,
                  })}
                  size={24}
                />
                <Typography
                  level="p2"
                  className={cn('font-thin transition-all', {
                    'text-text-tertiary': !selected,
                  })}
                >
                  {title}
                </Typography>
              </button>
            )
          })}
        </div>
        <Typography className="mx-auto w-full max-w-[900px] text-center" level="p4">
          Simple, powerful, beautiful. Next-gen notes & docs.{' '}
          <span className="ml-1 inline-flex items-center gap-2 text-primary">
            <Link  href={ROUTES.CHANGELOG_PAGE}>Learn more</Link>
            <AiOutlineArrowRight size={14} />
          </span>
        </Typography>
      </div>
    </>
  )
}
