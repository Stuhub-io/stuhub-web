import { Client } from '@/libs/client'
import fetcher from '@/libs/fetcher'
import { PageActivity } from '@/schema/activity';
import { BaseResponse, CursorPagination } from '@/schema/base'
import qs from 'querystring'

class ActivityService extends Client {
  public getPageActivities({ pagePkID, limit, endTime }: { pagePkID: number; limit: number; endTime?: string }) {
    return fetcher<BaseResponse<PageActivity[], CursorPagination>>(
      `${this.baseUrl}/v2/activity-services/pages/${pagePkID}/activities?${qs.stringify({
        end_time: endTime,
        limit,
      })}`,
      {
        headers: this.privateHeaders,
      },
    )
  }
}

export const activityService = new ActivityService()
