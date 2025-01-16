import { useAuthContext } from '@/components/auth/AuthGuard'
import { ProfileBadge } from '@/components/common/ProfileBadge'
import Typography from '@/components/common/Typography'
import { Page, PageRole, PageRoleEnum } from '@/schema/page'
import { getUserFullName } from '@/utils/user'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { RiCheckLine, RiEarthFill, RiFileCopyFill, RiLockLine } from 'react-icons/ri'
import { PageRolesMenu } from './PageRolesMenu'
import { useFetchPagePermissionRoles } from '@/mutation/querier/page/useFetchPagePermissionRoles'
import { SharePageItemSkeleton } from './SharePageItemSkeleton'
import useCopy from 'use-copy'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useUpdatePageGeneralAccess } from '@/mutation/mutator/page/permissions/useUpdatePageGeneralAccess'
import { useToast } from '@/hooks/useToast'
import { SharePageAddUserRole } from './SharePageAddUserRole'
import { useUpdateUserPageRole } from '@/mutation/mutator/page/permissions/useUpdateUserPageRole'
import { useRemoveUserPageRole } from '@/mutation/mutator/page/permissions/useRemoveUserPageRole'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { BASE_URL } from '@/constants/envs'
import { SharePageAccessRequestsAlert } from './SharePageAccessRequestsAlert'

type IPermissionMap = Record<
  string,
  {
    value?: PageRole
    isLoading?: boolean
  }
>

interface SharePageModalProps {
  page?: Page
  onClose?: () => void
  onViewRequests?: () => void
}

export const SharePageModalMain = (props: SharePageModalProps) => {
  const { onClose, page, onViewRequests } = props
  const { toast } = useToast()
  const { user } = useAuthContext()
  const { organization } = useOrganization()
  const [loadingAddUser, setLoadingAddUser] = useState(false)

  const { isOpen: isOpenConfirmRemove, onClose: onCloseConfirmRemove, onOpen: onOpenConfirmRemove } = useDisclosure()
  const [toRemoveUser, setToRemoveUser] = useState<string>()

  const pageHref =
    BASE_URL +
    ROUTES.VAULT_PAGE({
      orgSlug: organization?.slug ?? '',
      pageID: page?.id ?? '',
    })

  const [copied, copy, setIsCopied] = useCopy(pageHref)
  const {
    data: { data: pageDetail } = {},
    isPending: isPendingPageDetail,
    refetch: refetchPageDetail,
  } = useFetchPage({
    pageID: page?.id ?? '',
    allowFetch: Boolean(page),
  })

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }, [copied, setIsCopied])

  const {
    data: { data: pageRoles } = {},
    isPending,
    refetch: refetchPageRoles,
  } = useFetchPagePermissionRoles({
    pagePkID: page?.pkid ?? -1,
    allowFetch: Boolean(page),
  })

  const isFirstLoading = isPendingPageDetail || isPending

  const { mutateAsync: updatePageGeneralAccess } = useUpdatePageGeneralAccess({
    pagePkID: page?.pkid ?? -1,
  })

  const { mutateAsync: updateUserPageRole } = useUpdateUserPageRole({
    pagePkID: page?.pkid ?? -1,
  })

  const { mutateAsync: removeUserPageRole } = useRemoveUserPageRole({
    pagePkID: page?.pkid ?? -1,
  })

  const [internalGeneralRole, setGeneralRole] = useState<{
    isLoading?: boolean
    role?: PageRole
  }>({})

  const generalRole = internalGeneralRole.role || pageDetail?.general_role

  const roleMap = useMemo(
    () =>
      pageRoles?.reduce((acc, permission) => {
        acc[permission.email] = {
          value: permission.role,
          isLoading: false,
        }
        return acc
      }, {} as IPermissionMap) ?? ({} as IPermissionMap),
    [pageRoles],
  )
  const [directPermissions, setDirectPermissions] = useState<IPermissionMap>({})

  const getDisplayUserPermissionRole = (email: string) => directPermissions[email]?.value || roleMap[email]?.value

  useEffect(() => {
    setDirectPermissions(roleMap)
  }, [roleMap])

  const handleUpdateUserPageRole = async (email: string, role: PageRole) => {
    setDirectPermissions((prev) => ({
      ...prev,
      [email]: {
        value: role,
        isLoading: true,
      },
    }))
    try {
      await updateUserPageRole({
        pagePkID: page?.pkid ?? -1,
        email,
        role,
      })
      await refetchPageRoles()
    } catch (_) {
      toast({
        variant: 'danger',
        title: 'Some error occurred',
        description: 'Failed to update user role',
      })
    }
    setDirectPermissions((prev) => ({
      ...prev,
      [email]: {
        value: undefined,
        isLoading: false,
      },
    }))
  }

  const handleUpdateGeneralRole = async (newRole: PageRole) => {
    if (newRole === generalRole) return
    setGeneralRole({
      isLoading: true,
      role: newRole,
    })

    try {
      await updatePageGeneralAccess({
        pagePkID: page?.pkid ?? -1,
        body: {
          general_role: newRole,
        },
      })
      await refetchPageDetail()
    } catch (_) {
      toast({
        variant: 'danger',
        title: 'Some error occurred',
        description: 'Failed to update general role',
      })
    }

    setGeneralRole({
      isLoading: false,
      role: undefined,
    })
  }

  return (
    <>
      <div>
        {loadingAddUser ||
          ((internalGeneralRole.isLoading ||
            Object.values(directPermissions).reduce((p, c) => Boolean(p || c.isLoading), false)) && (
            <Progress size="sm" isIndeterminate />
          ))}

        <ModalHeader className="font-normal">Share &quot;{page?.name || 'Untitled'}&quot;</ModalHeader>
        <ModalBody className="pt-0">
          <div>
            {page && <SharePageAccessRequestsAlert page={page} onReview={onViewRequests} />}
            {page && (
              <SharePageAddUserRole page={page} onSuccess={refetchPageRoles} onLoadingChange={setLoadingAddUser} />
            )}
          </div>
          <div className="space-y-1">
            <Typography level="h8" className="mb-2 !font-normal capitalize" color="textTertiary">
              People with access
            </Typography>
            <div className="flex flex-col">
              {!isFirstLoading && (
                <ProfileBadge
                  rightElClassName="!opacity-100"
                  as="div"
                  className="pointer-events-none -mx-6 !w-[calc(100%+48px)] !max-w-none px-6"
                  disableRipple
                  radius="none"
                  disableAnimation
                  avatar={page?.author?.avatar}
                  firstName={page?.author?.first_name}
                  lastName={page?.author?.last_name}
                  description={page?.author?.email}
                  variant="light"
                  size="md"
                  rightEl={
                    <Typography level="p6" color="textTertiary">
                      Owner
                    </Typography>
                  }
                />
              )}

              {!isFirstLoading &&
                pageRoles?.map((permission) => {
                  const fullName = getUserFullName({
                    firstName: permission?.user?.first_name,
                    lastName: permission?.user?.last_name,
                    email: permission.email,
                  })
                  const hasName = Boolean(fullName !== permission.email)
                  return (
                    <ProfileBadge
                      as="div"
                      key={permission.pkid}
                      className="-mx-6 !w-[calc(100%+48px)] !max-w-none px-6"
                      disableRipple
                      radius="none"
                      disableAnimation
                      avatar={permission.user?.avatar}
                      firstName={fullName}
                      description={hasName ? permission.email : undefined}
                      variant="light"
                      name={user?.first_name}
                      rightElClassName="!opacity-100"
                      size="md"
                      rightEl={
                        <PageRolesMenu
                          disabled={directPermissions[permission.email]?.isLoading}
                          className="min-w-[90px]"
                          value={getDisplayUserPermissionRole(permission.email)}
                          onChange={(value) => {
                            handleUpdateUserPageRole(permission.email, value)
                          }}
                          extraButtons={[
                            {
                              label: 'Remove Access',
                              onClick: () => {
                                setToRemoveUser(permission.email)
                                onOpenConfirmRemove()
                              },
                            },
                            {
                              label: 'Transfer Ownership',
                            },
                          ]}
                        />
                      }
                    />
                  )
                })}
              {isFirstLoading && <SharePageItemSkeleton />}
            </div>
          </div>
          <div className="space-y-1">
            <Typography level="h8" className="mb-2 !font-normal capitalize" color="textTertiary">
              General access
            </Typography>
            {isFirstLoading && <SharePageItemSkeleton />}
            {!isFirstLoading && (
              <div className="-mx-6 -my-2 flex items-center px-6 hover:bg-default/40">
                <div className="flex flex-1 items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-default">
                    {!(generalRole === PageRoleEnum.RESTRICTED) ? <RiEarthFill size={16} /> : <RiLockLine size={16} />}
                  </div>
                  <div className="flex flex-1 flex-col py-2">
                    <Select
                      key={generalRole === undefined ? 'pending' : 'loaded'}
                      size="sm"
                      className="-ml-3 max-w-[180px] scale-85"
                      selectionMode="single"
                      selectedKeys={[generalRole === PageRoleEnum.RESTRICTED ? 'disabled' : 'enable']}
                      disallowEmptySelection
                      onChange={(e) =>
                        handleUpdateGeneralRole(
                          e.target.value === 'enable' ? PageRoleEnum.VIEWER : PageRoleEnum.RESTRICTED,
                        )
                      }
                      isDisabled={internalGeneralRole.isLoading}
                      classNames={{
                        popoverContent: '!max-w-[200px] !w-[200px]',
                      }}
                    >
                      <SelectItem key="enable" value="enable">
                        Everyone with the link
                      </SelectItem>
                      <SelectItem key="disabled" value="disabled">
                        Restricted
                      </SelectItem>
                    </Select>
                    <Typography level="p6" className="ml-2 line-clamp-2" color="textTertiary">
                      {generalRole !== PageRoleEnum.RESTRICTED
                        ? 'Anyone on the internet with the link can view'
                        : 'Only people you invited can view'}
                    </Typography>
                  </div>
                </div>
                {generalRole !== PageRoleEnum.RESTRICTED && (
                  <PageRolesMenu
                    value={internalGeneralRole.isLoading ? undefined : generalRole}
                    onChange={handleUpdateGeneralRole}
                    disabled={internalGeneralRole.isLoading}
                  />
                )}
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <Button
            variant="flat"
            color="primary"
            size="sm"
            startContent={copied ? <RiCheckLine /> : <RiFileCopyFill />}
            onClick={copy}
          >
            Copy Link
          </Button>
          <Button variant="solid" color="primary" size="sm" onClick={onClose}>
            Done
          </Button>
        </ModalFooter>
      </div>
      {toRemoveUser && (
        <ConfirmRemoveAccess
          fullName={getUserFullName({
            email: toRemoveUser,
          })}
          isOpen={isOpenConfirmRemove}
          onCancel={onCloseConfirmRemove}
          onClose={onCloseConfirmRemove}
          onConfirm={async () => {
            try {
              setDirectPermissions((prev) => ({
                ...prev,
                [toRemoveUser]: {
                  value: undefined,
                  isLoading: true,
                },
              }))
              await removeUserPageRole({
                email: toRemoveUser,
                pagePkID: page?.pkid ?? -1,
              })
              await refetchPageRoles()
            } catch (e) {
              toast({
                variant: 'danger',
                title: 'Some error occurred',
                description: 'Failed to remove access',
              })
            }
            setDirectPermissions((prev) => ({
              ...prev,
              [toRemoveUser]: {
                value: undefined,
                isLoading: false,
              },
            }))
          }}
        />
      )}
    </>
  )
}

const ConfirmRemoveAccess = (props: {
  fullName?: string
  onConfirm?: () => void
  onCancel?: () => void
  onClose?: () => void
  isOpen?: boolean
}) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalContent>
        <ModalHeader>Remove Access</ModalHeader>
        <ModalBody>
          <Typography level="p4" color="textTertiary">
            Are you sure you want to remove access for <b>{props.fullName}</b>?
          </Typography>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="flat"
            color="primary"
            size="sm"
            onClick={() => {
              props.onCancel?.()
              props.onClose?.()
            }}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="danger"
            onClick={() => {
              props.onConfirm?.()
              props.onClose?.()
            }}
            size="sm"
          >
            Remove Access
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
