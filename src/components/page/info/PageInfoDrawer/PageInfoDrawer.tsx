import Typography from '@/components/common/Typography'
import { usePageInfoDrawer } from '@/components/providers/page_info_drawer'
import { Button, Divider } from '@nextui-org/react'
import { RiCloseLine } from 'react-icons/ri'
import { PageIconPreview } from '../../PageListView/PageIconPreview'

export const PageInfoDrawer = () => {
  const { isOpenPageInfo, onClosePageInfo, page } = usePageInfoDrawer()
  if (!isOpenPageInfo) {
    return null
  }
  return (
    <div className="h-full max-h-full w-[340px] pb-4 pr-4 flex">
      <div className="relative flex h-full flex-1 flex-col overflow-y-auto rounded-large bg-default-50">
        {/* Drawer Body */}
        <div className="flex h-full flex-col p-4">
          {
            page ? (
              <>
                <div className="-mr-2 -mt-1 flex items-center pb-3">
                  <div className="flex flex-1 items-center gap-2 overflow-hidden">
                    <PageIconPreview page={page} size={32} />
                    <Typography className="flex-1 truncate" noWrap>
                      {page.name || 'Untitled'}
                    </Typography>
                  </div>
                  <Button isIconOnly radius="full" variant="light" onClick={onClosePageInfo}>
                    <RiCloseLine size={20} />
                  </Button>
                </div>
                <Divider className="-mx-10 w-[200%]" />
                <div className="flex-1 overflow-y-auto pt-3">
                </div>
              </>
            ) : null
            // Empty state
          }
        </div>
      </div>
    </div>
  )
}
