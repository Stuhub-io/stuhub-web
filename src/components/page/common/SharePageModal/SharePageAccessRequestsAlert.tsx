'use client'

import { RowItem } from '@/components/common/RowItem'
import { UserAvatar } from '@/components/common/UserAvatar'
import { useFetchPageRoleRequests } from '@/mutation/querier/page/useFetchPageRoleRequests'
import { Page } from '@/schema/page'
import { getUserFullName } from '@/utils/user'
import { Button } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { RiCloseLine, RiUserAddFill } from 'react-icons/ri'

interface SharePageAccessRequestsProps {
  page: Page
  onReview?: () => void
}

export const SharePageAccessRequestsAlert = (props: SharePageAccessRequestsProps) => {
  const { page, onReview } = props

  const [show, setShow] = useState(true)

  const { data: { data: requests } = {} } = useFetchPageRoleRequests({
    allowFetch: true,
    pagePkID: page.pkid,
  })

  if (!requests || requests.length === 0) {
    return null
  }

  const leftContent =
    requests.length === 1 ? (
      <UserAvatar className="h-6 w-6" {...requests[0].user} />
    ) : (
      <div className="flex h-6 w-6 items-center justify-center rounded-full fill-primary-700">
        <RiUserAddFill size={20} className="fill-inherit" />
      </div>
    )

  const title =
    requests.length === 1
      ? `${getUserFullName({
          firstName: requests[0].user?.first_name,
          lastName: requests[0].user?.last_name,
          email: requests[0].user?.email,
        })} would like access`
      : `${requests.length} users would like access`

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: '72px',
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className="overflow-hidden"
        >
          <div className="mb-6 rounded-medium bg-primary-100/80 p-3">
            <RowItem
              title={title}
              startContent={leftContent}
              classNames={{
                title: 'text-primary-700',
              }}
              endContent={
                <div className="-mr-1 flex items-center gap-1">
                  <Button variant="light" size="sm" className="-my-1 hover:bg-primary-100" onClick={onReview}>
                    Review
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="-my-1 hover:bg-primary-100"
                    isIconOnly
                    radius="full"
                    onClick={() => setShow(false)}
                  >
                    <RiCloseLine size={16} />
                  </Button>
                </div>
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
