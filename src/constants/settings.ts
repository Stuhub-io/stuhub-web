import { Setting } from '@/schema/setting'
import { lazy } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { BsFillPeopleFill } from 'react-icons/bs'

const ProfileSetting = lazy(() => import('@/components/modals/AccountSettingsModal/ProfileSetting'))
const MembersSetting = lazy(() => import('@/components/modals/AccountSettingsModal/MembersSetting'))

export const ACCOUNT_SETTINGS: Setting[] = [
  {
    key: 'profile',
    label: 'My profile',
    title: 'My profile',
    icon: FaUserCircle,
    content: ProfileSetting,
  },
]

export const WORKPLACE_SETTINGS: Setting[] = [
  {
    key: 'members',
    label: 'Members',
    title: 'Members',
    icon: BsFillPeopleFill,
    content: MembersSetting,
  },
]

export const MEMBER_COLUMNS = [
  { name: 'NAME', uid: 'name' },
  { name: 'TEAMSPACES', uid: 'teamspaces' },
  { name: 'ROLE', uid: 'role' },
  { name: 'ACTIONS', uid: 'actions' },
]
