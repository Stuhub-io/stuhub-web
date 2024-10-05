import { Setting } from '@/schema/setting'
import { lazy } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { BsFillPeopleFill } from 'react-icons/bs'

const ProfileSetting = lazy(() => import('@/components/modals/AccountSettingsModal/ProfileSetting'))
const PeopleSetting = lazy(() => import('@/components/modals/AccountSettingsModal/PeopleSetting'))

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
    key: 'people',
    label: 'People',
    title: 'People',
    icon: BsFillPeopleFill,
    content: PeopleSetting,
  },
]
