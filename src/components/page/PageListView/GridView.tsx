import { useSidebar } from '@/components/providers/sidebar'
import { PageCardView } from './card_view/PageCard'
import { BaseListViewProps } from './type'
import { cn } from '@/libs/utils'
import { Page } from '@/schema/page'

export const GridView = (props: BaseListViewProps) => {
  const {
    items,
    loading,
    onItemMutateSuccess,
    onItemDoubleClick,
    selectedItemPkIDs,
    onSelectedPkIDsChanged,
    emptyState,
  } = props
  const { showSidebar } = useSidebar()

  const handleItemClick = (page: Page) => {
    onSelectedPkIDsChanged?.((prev) => {
      if (prev.includes(page.pkid)) {
        return prev.filter((pkid) => pkid !== page.pkid)
      }
      return [...prev, page.pkid]
    })
  }

  if (!loading && items?.length === 0) {
    return emptyState
  }

  return (
    <div
      className={cn({
        'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7':
          showSidebar,
        'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8':
          !showSidebar,
      })}
    >
      {loading &&
        null
        // Skeletons
      }

      {!loading &&
        items?.map((item) => (
          <PageCardView
            key={item.id}
            page={item}
            isSelected={selectedItemPkIDs?.includes(item.pkid)}
            onClick={handleItemClick}
            onMutateSuccess={onItemMutateSuccess}
            onDoubleClick={onItemDoubleClick}
          />
        ))}
    </div>
  )
}
