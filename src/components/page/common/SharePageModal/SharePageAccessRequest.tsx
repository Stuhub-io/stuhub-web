import { ProfileBadge } from '@/components/common/ProfileBadge'
import { useFetchPageRoleRequests } from '@/mutation/querier/page/useFetchPageRoleRequests'
import { Page, PageRole, PageRoleEnum } from '@/schema/page'
import { Button, ModalBody, ModalFooter, ModalHeader, Progress, Tooltip } from '@nextui-org/react'
import { PageRolesMenu } from './PageRolesMenu'
import { useEffect, useState } from 'react'
import { getUserFullName } from '@/utils/user'
import { RiArrowLeftSLine, RiCheckLine, RiDeleteBinLine } from 'react-icons/ri'
import { useToast } from '@/hooks/useToast'
import { useAcceptRequestUserPageRole } from '@/mutation/mutator/page/permissions/useAcceptRequestPageRole'
import { useRejectRequestUserPageRoles } from '@/mutation/mutator/page/permissions/useRejectRequestPageRoles'

interface SharePageAccessRequestsProps {
  page: Page
  onClose?: () => void
}

export const SharePageAccessRequests = (props: SharePageAccessRequestsProps) => {
  const { page, onClose } = props
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const { data: { data: requests } = {}, refetch } = useFetchPageRoleRequests({
    allowFetch: true,
    pagePkID: page.pkid,
  })

  const { mutateAsync: acceptUserPermissionRole } = useAcceptRequestUserPageRole({
    pagePkID: page?.pkid ?? -1,
  })

  const { mutateAsync: rejectUserPermissionRole } = useRejectRequestUserPageRoles({
    pagePkID: page?.pkid ?? -1,
  })

  const [values, setValues] = useState<{
    [key: string]: PageRole
  }>({})

  const handleAccept = async (email: string) => {
    setLoading(true)
    const value = values[email] || PageRoleEnum.VIEWER
    try {
      await acceptUserPermissionRole({
        email,
        role: value,
        pagePkID: page.pkid,
      })
      await refetch()
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Error',
        description: 'Failed to accept request',
      })
    }
    setLoading(false)
  }

  const handleReject = async (email: string) => {
    setLoading(true)
    try {
      await rejectUserPermissionRole({
        emails: [email],
        pagePkID: page.pkid,
      })
      refetch()
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Error',
        description: 'Failed to reject request',
      })
    }
    setLoading(false)
  }

  const handleRejectAll = async () => {
    setLoading(true)
    try {
      await rejectUserPermissionRole({
        emails: requests?.map((request) => request.email) ?? [],
        pagePkID: page.pkid,
      })
      await refetch()
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Error',
        description: 'Failed to reject all requests',
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!requests?.length) {
      onClose?.()
    }
  }, [requests])

  return (
    <div>
      {loading && <Progress size="sm" isIndeterminate />}
      <ModalHeader className="flex items-center gap-2 font-normal">
        <Button isIconOnly size="sm" radius="full" variant="light" className="-ml-2" onClick={onClose}>
          <RiArrowLeftSLine size={16} />
        </Button>
        Requests For Access
      </ModalHeader>
      <ModalBody className="pt-0">
        {requests?.map((request) => {
          const fullName = getUserFullName({
            firstName: request.user?.first_name,
            lastName: request.user?.last_name,
            email: request.user?.email,
          })
          return (
            <div className="space-y-1" key={request.pkid}>
              <ProfileBadge
                as="div"
                className="-mx-6 !w-[calc(100%+48px)] !max-w-none px-6"
                disableRipple
                radius="none"
                disableAnimation
                avatar={request.user?.avatar}
                firstName={request.user?.first_name}
                description={fullName === request.user?.email ? '' : request.user?.email}
                variant="light"
                name={fullName}
                rightElClassName="!opacity-100"
                size="md"
                rightEl={
                  <div className="flex">
                    <PageRolesMenu
                      disabled={loading}
                      value={values[request.email] || PageRoleEnum.VIEWER}
                      className="min-w-[90px]"
                      onChange={(value) => {
                        setValues((prev) => ({
                          ...prev,
                          [request.email]: value,
                        }))
                      }}
                    />
                    <div className="ml-2 flex items-center gap-1">
                      <Button
                        size="sm"
                        disabled={loading}
                        variant="flat"
                        color="primary"
                        isIconOnly
                        radius="full"
                        onClick={() => {
                          handleAccept(request.email)
                        }}
                      >
                        <RiCheckLine size={16} />
                      </Button>
                      <Tooltip content="Reject request" delay={1000}>
                        <Button
                          disabled={loading}
                          size="sm"
                          variant="light"
                          color="danger"
                          isIconOnly
                          radius="full"
                          onClick={() => handleReject(request.email)}
                        >
                          <RiDeleteBinLine size={16} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                }
              />
            </div>
          )
        })}
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end items-center gap-2">
          <Button size="sm" variant="flat" color="danger" onClick={handleRejectAll} isDisabled={loading}>
            Reject All
          </Button>
          <Button size="sm" variant="solid" color="primary" onClick={onClose} isDisabled={loading}>
            Done
          </Button>
        </div>
      </ModalFooter>
    </div>
  )
}
