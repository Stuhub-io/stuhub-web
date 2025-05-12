import Typography from '@/components/common/Typography'
import { UserAvatar } from '@/components/common/UserAvatar'
import {
  ActivityUserCreateAssetsSnapshot,
  ActivityUserCreateFolder,
  PageActivity,
  PageActivityActionCodeEnum,
} from '@/schema/activity'
import { Page, PageRoleEnum, PageRoleEnumLabels } from '@/schema/page'
import { getActivityMessage } from '@/utils/activity'
import dayjs from 'dayjs'
import { useInfiniteFetchPageActivities } from '@/mutation/querier/activity/useFetchPageActivities'
import { PageTree } from '../../common/PageTree'
import { RiEarthFill } from 'react-icons/ri'
import { getUserFullName } from '@/utils/user'
import { LazySkeleton } from '@/components/common/LazySkeleton'
import { useMemo } from 'react'

interface PageDrawerActivityProps {
  page: Page
}

export const PageDrawerActivity = (props: PageDrawerActivityProps) => {
  const { page } = props
  console.log('page', page.pkid)
  const skeletonWidths = useMemo(
    () =>
      Array(5)
        .fill(null)
        .map(() => [200, 240, 180][Math.round(Math.random() * 2)]),
    [],
  )

  const {
    data: activitiesCollection,
    isPending,
    // fetchNextPage,
    // hasNextPage,
  } = useInfiniteFetchPageActivities({
    pagePkID: page.pkid,
    limit: 100,
  })

  return (
    <div className="no-scrollbar -mx-4 h-full flex-col items-stretch overflow-y-auto px-4 pt-4">
      {isPending && (
        <div className="space-y-5">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <LazySkeleton
                key={i}
                className="h-[20px] rounded-lg"
                delay={200 * (i + 1)}
                style={{ width: skeletonWidths[i] }}
              />
            ))}
        </div>
      )}
      {!isPending &&
        activitiesCollection?.pages.map((resp) => {
          const { data: activities } = resp as any as { data: PageActivity[] }
          const makeKey = (activity: PageActivity) =>
            [activity.action_code, activity.user_pkid, activity.created_at].join('-')
          return activities.map((activity) => {
            let parsedJson: any = {}
            try {
              parsedJson = JSON.parse(activity.snapshot ?? '{}')
            } catch (e) {
              return null
            }
            return (
              <div className="flex items-start gap-4 py-6" key={makeKey(activity)}>
                <UserAvatar {...(activity.user ?? {})} />
                <div className="flex flex-col gap-1 py-0.5">
                  <Typography level="p5" color="textSecondary" className="max-w-[200px]">
                    {getActivityMessage(activity, parsedJson)}
                  </Typography>
                  <Typography level="p7" color="textTertiary">
                    {dayjs(activity.created_at).format('MMM DD, YYYY, HH:MM a')}
                  </Typography>
                  <div className="flex flex-col gap-1 pt-1">
                    <ActivityPreview activity={activity} snapshot={parsedJson} />
                  </div>
                </div>
              </div>
            )
          })
        })}
    </div>
  )
}

export const ActivityPreview = ({ activity, snapshot }: { activity: PageActivity; snapshot: any }) => {
  switch (activity.action_code) {
    case PageActivityActionCodeEnum.USER_CREATE_FOLDER: {
      const meta = snapshot as ActivityUserCreateFolder
      return (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <PageTree
              gap={4}
              page={
                meta.parent_page
                  ? {
                      id: meta.parent_page.id,
                      pkid: meta.parent_page.pkid,
                      name: meta.parent_page.name,
                      view_type: meta.parent_page.view_type,
                      asset: meta.parent_page.asset,
                    }
                  : undefined
              }
              childrenPages={
                meta.child_page
                  ? [
                      {
                        page: {
                          id: meta.child_page.id,
                          pkid: meta.child_page.pkid,
                          name: meta.child_page.name,
                          view_type: meta.child_page.view_type,
                          asset: meta.child_page.asset,
                        },
                      },
                    ]
                  : []
              }
            />
          </div>
          {meta.child_page.general_role && meta.child_page.general_role !== PageRoleEnum.RESTRICTED && (
            <div className="flex items-center gap-2">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-default-200 text-primary">
                <RiEarthFill />
              </div>
              <div className="space-y-0.5">
                <Typography level="p6" color="textTertiary" component="p">
                  Anyone on the internet with the link
                </Typography>
                <Typography level="p6" color="textSecondary" component="p">
                  {PageRoleEnumLabels[meta.child_page.general_role]}
                </Typography>
              </div>
            </div>
          )}
          {Boolean(meta.page_roles?.length) &&
            meta.page_roles?.map((role) => (
              <div key={role.pkid} className="flex items-center gap-2">
                <UserAvatar {...role.user} size="sm" />
                <div className="space-y-0.5">
                  <Typography level="p6" color="textTertiary">
                    {getUserFullName({
                      firstName: role.user?.first_name,
                      lastName: role.user?.last_name,
                      email: role.user?.email,
                    })}
                  </Typography>
                  <Typography level="p6" color="textSecondary" component="p">
                    {PageRoleEnumLabels[role.role]}
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      )
    }
    case PageActivityActionCodeEnum.USER_UPLOADED_ASSETS: {
      const meta = snapshot as ActivityUserCreateAssetsSnapshot
      const pageAssets = meta.assets || []
      return (
        <PageTree
          gap={4}
          page={
            meta.parent_page
              ? {
                  id: meta.parent_page.id,
                  pkid: meta.parent_page.pkid,
                  name: meta.parent_page.name,
                  view_type: meta.parent_page.view_type,
                  asset: meta.parent_page.asset,
                }
              : undefined
          }
          childrenPages={pageAssets.map((page) => ({
            page: {
              id: page.id,
              pkid: page.pkid,
              name: page.name,
              view_type: page.view_type,
              asset: page.asset,
            },
          }))}
        />
      )
    }
  }
  return null
}
