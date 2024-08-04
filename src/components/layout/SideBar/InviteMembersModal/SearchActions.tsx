import { ORG_ROLES } from '@/constants/organization'
import { OrgRole } from '@/schema/organization'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import { IoChevronDown } from 'react-icons/io5'
import { RiCheckLine } from 'react-icons/ri'

type SearchActionsProps = {
  role: string
  setRole: (value: OrgRole) => void
  submitInvitations: () => void
}

export const SearchActions = ({ role, setRole, submitInvitations }: SearchActionsProps) => {
  return (
    <div className="flex w-fit py-1 pl-1 pr-2">
      <Dropdown>
        <DropdownTrigger className="my-auto">
          <Button
            variant="light"
            radius="sm"
            className="h-8 capitalize"
            endContent={<IoChevronDown className="ml-1" />}
          >
            {role}
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="p-0">
          {Object.values(ORG_ROLES).map((item) => (
            <DropdownItem key={item}>
              <Button
                fullWidth
                variant="light"
                radius="sm"
                className="justify-between capitalize"
                endContent={item === role ? <RiCheckLine /> : null}
                onClick={() => setRole(item)}
              >
                {item}
              </Button>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Button color="primary" className="my-auto ml-2" radius="sm" onClick={submitInvitations}>
        Invite
      </Button>
    </div>
  )
}
