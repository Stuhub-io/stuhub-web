import Typography from '@/components/common/Typography'
import { Card, cn, CardBody, Button, Image, Divider } from '@nextui-org/react'
import { RiMore2Line, RiStarFill } from 'react-icons/ri'
import { PageMenu } from '../../PageMenu'
import { BaseCardViewProps } from './type'
import { Asset, PageViewTypeEnum } from '@/schema/page'
import {
  formatReadableFileSize,
  formatReadableExtension,
  getIconByExtension,
  isImageExtensionSupported,
} from '@/utils/file'
import { useMutationState } from '@tanstack/react-query'
import { MUTATION_KEYS } from '@/mutation/keys'
import { memo } from 'react'

export const PageAssetCard = memo((props: BaseCardViewProps) => {
  const { page, onMutateSuccess, onClick, onDoubleClick, className, isSelected, parentPage } = props

  const archiveStatus = useMutationState({
    filters: {
      mutationKey: MUTATION_KEYS.ARCHIVE_PAGE({ id: page.id }),
    },
    select: (state) => state.state.status,
  })

  const isArchiving = archiveStatus.includes('pending')

  const handleClick = () => {
    onClick?.(page)
  }
  const handleDoubleClick = () => {
    onDoubleClick?.(page)
  }

  if (page?.view_type !== PageViewTypeEnum.ASSET || !page.asset) {
    return null
  }

  return (
    <Card
      className={cn(
        'w-full select-none',
        'cursor-pointer bg-default-100 transition-background hover:bg-default-200',
        {
          'bg-primary-100 hover:bg-primary-100/90': isSelected,
          'pointer-events-none animate-pulse opacity-80': isArchiving,
        },
        className,
      )}
      shadow="none"
      onClick={(e) => e.stopPropagation()}
    >
      <CardBody
        className="flex select-none flex-col p-2 group"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <div className="relative w-full overflow-hidden pb-[45%]">
          {page.page_star && (
            <div
              className={cn(
                'absolute right-0 top-0 z-20 rounded-bl-full bg-default-100 pb-2 pl-2 group-hover:bg-default-200',
                {
                  'bg-primary-100 group-hover:bg-primary-100/90': isSelected,
                },
              )}
            >
              <RiStarFill size={14} className="text-warning" />
            </div>
          )}
          <div className="absolute inset-0 h-full w-full">{getAssetPreviewContent(page.asset)}</div>
        </div>
        <div
          className="flex w-full items-center gap-2 pl-2 pt-2"
          onDoubleClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-1 flex-col overflow-hidden">
            <Typography level="p5" noWrap className="w-full">
              {page.name || 'Untitled'}
            </Typography>
            <div className="flex items-stretch gap-2">
              <Typography level="p6" color="textTertiary" className="w-fit">
                {formatReadableFileSize(page.asset.size)}
              </Typography>
              <div className="py-1.5">
                <Divider orientation="vertical" />
              </div>
              <Typography level="p6" color="textTertiary" className="w-fit">
                {formatReadableExtension(page.asset.extension)}
              </Typography>
            </div>
          </div>
          <PageMenu
            page={page}
            onSuccess={onMutateSuccess}
            parentPage={parentPage}
          >
            <Button isIconOnly size="sm" variant="light" radius="full" className="shrink-0">
              <RiMore2Line size={16} />
            </Button>
          </PageMenu>
        </div>
      </CardBody>
    </Card>
  )
})

export const getAssetPreviewContent = (asset: Asset, style?: {
  size?: number
  className?: string
}) => {
  const Icon = getIconByExtension(asset.extension)
  if (isImageExtensionSupported(asset.extension)) {
    return (
      <Image
        loading="lazy"
        src={asset.url}
        removeWrapper
        alt={asset.extension}
        className="h-full w-full object-cover"
        radius="sm"
      />
    )
  }

  return (
    <div className={cn("flex h-full w-full items-center justify-center rounded-small bg-background", style?.className)}>
      <Icon size={style?.size ?? 38} width={style?.size ?? 38} height={style?.size ?? 38} />
    </div>
  )
}

PageAssetCard.displayName = 'PageAssetCard'
