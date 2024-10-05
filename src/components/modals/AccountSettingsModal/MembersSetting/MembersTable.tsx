import React, { useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { MEMBER_COLUMNS } from '@/constants/settings'
import { MdDeleteForever } from 'react-icons/md'
import { MemberItem } from '@/schema/organization'
import { LuChevronDown } from 'react-icons/lu'
import { useAuthContext } from '@/components/auth/AuthGuard'

interface MemberTablesProps {
  members: MemberItem[]
}

export const MemberTables = ({ members }: MemberTablesProps) => {
  const { user } = useAuthContext()

  const renderCell = useCallback(
    (member: MemberItem, columnKey: any) => {
      const teamspacesLength = member.teamspaces.length
      const deleteTooltipContent =
        user?.pkid === member.pkid ? 'Leave workspace' : 'Remove from workspace'

      switch (columnKey) {
        case 'name':
          return (
            <User
              avatarProps={{ radius: 'lg', src: member.avatar }}
              description={member.email}
              name={member.fullName}
            >
              {member.email}
            </User>
          )
        case 'teamspaces':
          return (
            <div className="flex flex-col">
              <Dropdown className="border-1 border-default-200 bg-background">
                <DropdownTrigger>
                  <Button isIconOnly variant="light" className="w-fit justify-start px-3">
                    <p className="text-bold mr-2 max-w-16 truncate text-sm capitalize">
                      {member.teamspaces[0].name}
                      {teamspacesLength > 1 && (
                        <span className="text-xs text-text-tertiary">
                          {' '}
                          + {teamspacesLength - 1}
                        </span>
                      )}
                    </p>
                    <LuChevronDown size={14} className="text-text-tertiary" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {member.teamspaces.map((teamspace) => (
                    <DropdownItem key={teamspace.slug}>{teamspace.name}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        case 'role':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{member.role}</p>
            </div>
          )
        case 'actions':
          return (
            <div className="relative flex justify-center">
              <Tooltip color="danger" content={deleteTooltipContent} size="sm">
                <span className="cursor-pointer text-lg text-danger active:opacity-50">
                  <MdDeleteForever />
                </span>
              </Tooltip>
            </div>
          )
        default:
          return null
      }
    },
    [user],
  )

  return (
    <Table>
      <TableHeader columns={MEMBER_COLUMNS}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={members}>
        {(item) => (
          <TableRow key={item.pkid}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
