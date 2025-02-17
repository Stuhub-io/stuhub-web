import { VscodeDocumentIcon } from '@/components/icons/VsCodeDocumentIcon'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { RiFolder3Fill } from 'react-icons/ri'
import { getAssetPreviewContent } from './card_view/PageAssetCard'
import { ReactNode } from 'react'

export const PageIconPreview = ({ page }: { page: Page }) => {
  const wrapper = (child?: ReactNode) => (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-md bg-default-100 shrink-0">
      {child}
    </div>
  )
  switch (page.view_type) {
    case PageViewTypeEnum.FOLDER:
      return wrapper(<RiFolder3Fill className="fill-success" size={20} />)
    case PageViewTypeEnum.DOCUMENT:
      return wrapper(<VscodeDocumentIcon className="fill-primary" width={20} height={20} />)
    case PageViewTypeEnum.ASSET:
      if (!page.asset) {
        return null
      }
      return wrapper(getAssetPreviewContent(page.asset, { size: 20, className: 'bg-transparent' }))
    default:
      return null
  }
}
