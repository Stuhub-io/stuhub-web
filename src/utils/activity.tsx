import {
  ActivityUserCreateAssetsSnapshot,
  PageActivity,
  PageActivityActionCodeEnum,
} from '@/schema/activity'
import { User } from '@/schema/user'
import { PropsWithChildren, ReactNode } from 'react'
import { getUserFullName } from './user'

const HighLightText = ({ children }: PropsWithChildren) => {
  return <b>{children}</b>
}

const getFullName = (actor?: User) =>
  getUserFullName({
    firstName: actor?.first_name,
    lastName: actor?.last_name,
    email: actor?.email,
  })

export const getActivityMessage = (activity: PageActivity, snapshot: any): ReactNode => {
  console.log('activity', activity)
  switch (activity.action_code) {
    case PageActivityActionCodeEnum.USER_CREATE_DOCUMENT: {
      return (
        <>
          <HighLightText>{getFullName(activity.user)}</HighLightText> created a document
        </>
      )
    }
    case PageActivityActionCodeEnum.USER_UPLOADED_ASSETS: {
      const meta = snapshot as ActivityUserCreateAssetsSnapshot
      const totalAssets = meta.assets?.length || 0
      return (
        <>
          <HighLightText>{getFullName(activity.user)}</HighLightText> uploaded {totalAssets} assets
        </>
      )
    }
    case PageActivityActionCodeEnum.USER_CREATE_FOLDER: {
      return (
        <>
          <HighLightText>{getFullName(activity.user)}</HighLightText> created and shared a folder in
        </>
      )
    }

    default:
      return null
  }
}
