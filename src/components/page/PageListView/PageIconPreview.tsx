import { VscodeDocumentIcon } from '@/components/icons/VsCodeDocumentIcon'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { RiFolder3Fill } from 'react-icons/ri'
import { getAssetPreviewContent } from './card_view/PageAssetCard'
import { ReactNode } from 'react'
import { cn } from '@/libs/utils'

export const PageIconPreview = ({
  page,
  size = 40,
  isFullWidth = false,
  className
}: {
  page: Page
  size?: number
  isFullWidth?: boolean
  className?: string
}) => {
  const wrapper = (child?: ReactNode) => (
    <div
      className={cn(
        `relative flex shrink-0 items-center justify-center rounded-md bg-default-100`,
        className
      )}
      style={{
        width: isFullWidth ? "100%": size,
        height: size,
      }}
    >
      {child}
    </div>
  )
  const iconSize = size / 2
  switch (page.view_type) {
    case PageViewTypeEnum.FOLDER:
      return wrapper(<RiFolder3Fill className="fill-success" size={iconSize} />)
    case PageViewTypeEnum.DOCUMENT:
      return wrapper(<VscodeDocumentIcon className="fill-primary" width={iconSize} height={iconSize} />)
    case PageViewTypeEnum.ASSET:
      if (!page.asset) {
        return null
      }
      return wrapper(getAssetPreviewContent(page.asset, { size: iconSize, className: 'bg-transparent' }))
    default:
      return null
  }
}
