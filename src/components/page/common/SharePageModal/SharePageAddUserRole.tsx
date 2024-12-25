import { ACValue, AutocompleteMultiple } from '@/components/common/AutocompleteMultiple'
import { useInfoModals } from '@/components/providers/info'
import { useToast } from '@/hooks/useToast'
import { useAddUserPageRole } from '@/mutation/mutator/page/permissions/useAddUserPageRole'
import { useSearchUsers } from '@/mutation/querier/user/useSearchUsers'
import { Page, PageRole, PageRoleEnum } from '@/schema/page'
import { User } from '@/schema/user'
import { isEmail } from '@/utils/email'
import { getUserFullName } from '@/utils/user'
import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useDebounce } from 'use-debounce'

const MAX_SEARCH = 4

type IUser = Partial<User> & ACValue

interface SharePageAddUserRoleProps {
  page: Page
  onSuccess?: () => void
  onLoadingChange?: (loading: boolean) => void
}

export const SharePageAddUserRole = (props: SharePageAddUserRoleProps) => {
  const { page, onSuccess, onLoadingChange } = props
  const { toast } = useToast()
  const { openPagePermissionInfo } = useInfoModals()

  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState('')
  const [debounceSearch] = useDebounce(search, 300)
  const [selectedEmails, setSelectedEmails] = useState<IUser[]>([])

  const { mutateAsync: addUserPermissionRole } = useAddUserPageRole({
    pagePkID: page?.pkid ?? -1,
  })

  const formInstance = useForm()

  const [role, setRole] = useState<PageRole>(PageRoleEnum.VIEWER)

  const { data: { data: searchUsers } = {} } = useSearchUsers({
    allowFetch: true,
    body: {
      search: debounceSearch,
      page: 0,
      size: MAX_SEARCH,
      emails: [],
    },
  })

  const filterEmails = useMemo(() => {
    return selectedEmails.map((user) => {
      if (user.id) {
        return user.email ?? ''
      }
      return user.label
    })
  }, [selectedEmails])

  const onSubmit = formInstance.handleSubmit(async () => {
    setLoading(true)
    onLoadingChange?.(true)
    const promises: any[] = []
    filterEmails.forEach((email) => {
      promises.push(
        addUserPermissionRole({
          email,
          role,
          pagePkID: page?.pkid ?? -1,
        }),
      )
    })

    try {
      await Promise.all(promises)
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Users added',
      })

      onSuccess?.()
    } catch (error: any) {
      onSuccess?.()
      toast({
        variant: 'danger',
        title: 'Error',
        description: error.body?.message ?? "Can't add user to page",
      })
    }

    setLoading(false)
    onLoadingChange?.(false)
    setSelectedEmails([])
  })

  const users = useMemo(() => {
    return searchUsers?.map((user) => ({
      key: user.email,
      label: getUserFullName({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      }),
      ...user,
    })) as IUser[]
  }, [searchUsers])

  return (
    <FormProvider {...formInstance}>
      <div className="flex flex-col">
        <form className="flex items-start gap-3" onSubmit={onSubmit}>
          <AutocompleteMultiple<IUser>
            disabled={loading}
            renderTag={(item, onDelete) => (
              <Chip
                key={item.key}
                onClose={onDelete}
                avatar={
                  <Avatar
                    src={item.avatar}
                    name={getUserFullName({
                      firstName: item.first_name,
                      lastName: item.last_name,
                      email: item.email,
                    })}
                  />
                }
              >
                {item.label}
              </Chip>
            )}
            inputValue={search}
            onInputValueChange={setSearch}
            items={users}
            compareItem={() => true}
            value={selectedEmails}
            onChange={setSelectedEmails}
            itemValidator={(item) => {
              if (item.id) return '' // is user object
              return isEmail(item.label) ? '' : 'Invalid email format'
            }}
            renderItem={(item) => {
              const fullName = getUserFullName({
                firstName: item.first_name,
                lastName: item.last_name,
              })
              return {
                title: fullName || item.email,
                description: fullName ? item.email : undefined,
                startContent: (
                  <div className="h-6 w-6">
                    <Avatar
                      size="sm"
                      className="h-6 w-6"
                      src={item.avatar}
                      name={getUserFullName({
                        firstName: item.first_name,
                        lastName: item.last_name,
                        email: item.email,
                      })}
                    />
                  </div>
                ),
              }
            }}
          />
          <ButtonGroup>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">
                  {
                    {
                      [PageRoleEnum.EDITOR]: 'Editor',
                      [PageRoleEnum.VIEWER]: 'Viewer',
                    }[role]
                  }
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => setRole(PageRoleEnum.EDITOR)}
                  endContent={
                    <Chip
                      onClick={(e) => {
                        e.stopPropagation()
                        openPagePermissionInfo()
                      }}
                      variant="flat"
                    >
                      ?
                    </Chip>
                  }
                >
                  Editor
                </DropdownItem>
                <DropdownItem onClick={() => setRole(PageRoleEnum.VIEWER)}>Viewer</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button type="submit" variant="solid" isIconOnly disabled={!filterEmails.length}>
              <RiSendPlaneFill size={16} />
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </FormProvider>
  )
}
