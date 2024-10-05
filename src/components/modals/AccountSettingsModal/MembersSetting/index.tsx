import { useOrganization } from '@/components/providers/organization'
import { MembersActionBar } from './MembersActionBar'
import { MembersPagination } from './MembersPagination'
import { MemberTables } from './MembersTable'
import { MemberItem } from '@/schema/organization'
import { useMemo, useState } from 'react'
import { getUserFullName } from '@/utils/user'
import { useDebouncedCallback } from 'use-debounce'

const MEMBERS_PER_PAGE = 8

const MembersSetting = () => {
  const { organizations } = useOrganization()

  const [page, setPage] = useState(0)
  const [searchKey, setSearchKey] = useState('')

  const onChangeSearchKey = useDebouncedCallback((value: string) => setSearchKey(value), 500, {
    trailing: true,
  })

  const members = useMemo(() => {
    const membersMap: Record<number, MemberItem> = {}
    organizations?.forEach((org) => {
      org.members.forEach((member) => {
        const { pkid, first_name, last_name, avatar, email } = member.user!
        const teamspace = {
          id: org.pkid,
          name: org.name,
          slug: org.slug,
        }

        if (!membersMap[pkid]) {
          membersMap[pkid] = {
            pkid,
            fullName: getUserFullName({ firstName: first_name, lastName: last_name }),
            role: member.role,
            teamspaces: [teamspace],
            avatar,
            email,
          }
          return
        }

        const isMemberAlreadyInTeamspace = membersMap[pkid].teamspaces.some(
          (item) => item.id === teamspace.id,
        )
        if (!isMemberAlreadyInTeamspace) {
          membersMap[pkid].teamspaces.push(teamspace)
        }
      })
    })
    return Object.values(membersMap).filter(({ email, fullName }) => {
      const lowerCaseSearchKey = searchKey.toLowerCase()
      return (
        email.includes(lowerCaseSearchKey) || fullName.toLowerCase().includes(lowerCaseSearchKey)
      )
    })
  }, [organizations, searchKey])

  const totalMembers = members.length
  const totalPages = Math.ceil(totalMembers / MEMBERS_PER_PAGE)
  const membersInPage = members.slice(page * MEMBERS_PER_PAGE, MEMBERS_PER_PAGE)

  return (
    <div className="flex flex-col gap-5">
      <MembersActionBar {...{ totalMembers, onChangeSearchKey }} />
      <MemberTables members={membersInPage} />
      <MembersPagination {...{ page, totalPages, setPage }} />
    </div>
  )
}

export default MembersSetting
