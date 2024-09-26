import Typography from '@/components/common/Typography'
import { useFetchPages } from '@/mutation/querier/page/useFetchPages'
import { Page } from '@/schema/page'
import { Input } from '@nextui-org/react'
import { ComponentRef, forwardRef, useMemo, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { PageTreeItem } from './PageTreeItem'
import { SidebarItemSkeleton } from '@/components/layout/SideBar/SidebarItemSkeleton'

export interface PageSearchSelectorProps {
  onSelected?: (selected: Page) => void
  spacePkID: number
  excludePageIds?: string[]
}

export const PageSearchSelector = forwardRef<ComponentRef<'div'>, PageSearchSelectorProps>(
  (props, ref) => {
    const { onSelected, spacePkID, excludePageIds = [] } = props
    const { data: { data: pages } = {}, isPending } = useFetchPages({
      space_pkid: spacePkID,
    })

    const outerPages = useMemo(() => pages?.list?.filter((page) => !page.parent_page_pkid), [pages])

    const [search, setSearch] = useState('')

    const filteredPages = useMemo(
      () =>
        pages?.list?.filter((page) => page.name.toLowerCase().includes(search.toLocaleLowerCase())),
      [pages, search],
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
        <div className="-mx-3 h-[300px]">
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
                      disabled={excludePageIds.includes(p.id)}
                      excludePageIds={excludePageIds}
                      pages={[]}
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
              {isPending && (
                <>
                  <SidebarItemSkeleton size="sm" hasIcon className="h-2" />
                  <SidebarItemSkeleton size="sm" hasIcon className="h-2" delay={300} />
                  <SidebarItemSkeleton size="sm" hasIcon className="h-2" delay={500} />
                </>
              )}
              {!isPending &&
                outerPages?.map((p) => (
                  <PageTreeItem
                    page={p}
                    key={p.id}
                    onClick={onSelected}
                    disabled={excludePageIds.includes(p.id)}
                    excludePageIds={excludePageIds}
                    pages={pages?.list ?? []}
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
