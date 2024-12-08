import Typography from '@/components/common/Typography'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { Input } from '@nextui-org/react'
import { ComponentRef, forwardRef, useMemo, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { PageTreeItem } from './PageTreeItem'
import { SidebarItemSkeleton } from '@/components/common/Sidebar'
import { useSidebar } from '@/components/providers/sidebar'

export interface PageSearchSelectorProps {
  onSelected?: (selected: Page) => void
  excludePagePkIds?: number[]
}

export const PageSearchSelector = forwardRef<ComponentRef<'div'>, PageSearchSelectorProps>(
  (props, ref) => {
    const { onSelected, excludePagePkIds = [] } = props
    const { orgPages, isPendingOrgPages } = useSidebar()

    const outerPages = useMemo(
      () => orgPages?.list?.filter((page) => !page.parent_page_pkid && !page.archived_at && page.view_type === PageViewTypeEnum.FOLDER),
      [orgPages],
    )

    const [search, setSearch] = useState('')

    const filteredPages = useMemo(
      () =>
        orgPages?.list?.filter(
          (page) =>
            !page.archived_at && page.name.toLowerCase().includes(search.toLocaleLowerCase()),
        ),
      [orgPages, search],
    )

    return (
      <div className="w-[300px] space-y-2 rounded-medium bg-content1 p-3" ref={ref}>
        <Input
          startContent={<RiSearchLine />}
          size="sm"
          placeholder="Search page"
          value={search}
          onValueChange={setSearch}
        />
        <div className="-mx-3 h-[300px] overflow-y-auto">
          {search ? (
            <div className="">
              {!filteredPages?.length ? (
                <div className="px-4">
                  <Typography level="p6" color="textTertiary">
                    No results.
                  </Typography>
                </div>
              ) : (
                <div>
                  {filteredPages?.map((p) => (
                    <PageTreeItem
                      page={p}
                      key={p.id}
                      onClick={onSelected}
                      disabled={excludePagePkIds.includes(p.pkid)}
                      excludePagePkIds={excludePagePkIds}
                      pages={{ list: filteredPages, map: {} }}
                      showChild={false}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-1 px-4">
                <Typography level="p6" color="textTertiary">
                  Recent
                </Typography>
              </div>
              {isPendingOrgPages && (
                <>
                  <SidebarItemSkeleton size="sm" hasIcon className="h-2" />
                  <SidebarItemSkeleton size="sm" hasIcon className="h-2" delay={300} />
                  <SidebarItemSkeleton size="sm" hasIcon className="h-2" delay={500} />
                </>
              )}
              {!isPendingOrgPages && orgPages &&
                outerPages?.map((p) => (
                  <PageTreeItem
                    page={p}
                    key={p.id}
                    onClick={onSelected}
                    disabled={excludePagePkIds.includes(p.pkid)}
                    excludePagePkIds={excludePagePkIds}
                    pages={orgPages}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)

PageSearchSelector.displayName = 'PageSearchSelector'
