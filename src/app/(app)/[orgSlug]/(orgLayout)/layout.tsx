import { OrgLayout } from '@/components/layout/OrgLayout'
import { OrgMoreMenu } from '@/components/organization/OrgMoreMenu'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Metadata } from 'next'
import { RiMore2Fill } from 'react-icons/ri'

export const metadata: Metadata = {
  title: 'Stuhub',
}

export default function OrgDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <OrgLayout
      rightEl={
        <Popover>
          <PopoverTrigger>
            <Button isIconOnly size="sm" variant="flat">
              <RiMore2Fill size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <OrgMoreMenu />
          </PopoverContent>
        </Popover>
      }
    >
      {children}
    </OrgLayout>
  )
}
