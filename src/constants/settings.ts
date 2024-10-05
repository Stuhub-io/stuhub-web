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

export const users = [
  {
    id: 1,
    name: 'Tony Reichert',
    role: 'Owner',
    teamspaces: ['Management'],
    age: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Member',
    teamspaces: ['Development'],
    age: '25',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'Member',
    teamspaces: ['Development'],
    age: '22',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    name: 'William Howard',
    role: 'Member',
    teamspaces: ['Marketing'],
    age: '28',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'Member',
    teamspaces: ['Sales'],
    age: '24',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'Member',
    teamspaces: ['Sales'],
    age: '24',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'Member',
    teamspaces: ['Sales'],
    age: '24',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'Member',
    teamspaces: ['Sales'],
    age: '24',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
]
