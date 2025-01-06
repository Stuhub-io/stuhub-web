import { PageViewTypeEnum } from '@/schema/page'
import { BaseCardViewProps } from './type'
import { Button, Card, CardBody } from '@nextui-org/react'
import { cn } from '@/libs/utils'
import Typography from '@/components/common/Typography'
import { formatTimeToNow } from '@/utils/time'
import { RiMore2Line } from 'react-icons/ri'
import { PageActionMenu } from '../../PageMenu'
import { VscodeDocumentIcon } from '@/components/icons/VsCodeDocumentIcon'
import { useMutationState } from '@tanstack/react-query'
import { MUTATION_KEYS } from '@/mutation/keys'

export const PageDocumentCard = (props: BaseCardViewProps) => {
  const { page, onMutateSuccess, onClick, className, onDoubleClick, isSelected, onShareClick } =
    props

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

  if (page?.view_type !== PageViewTypeEnum.DOCUMENT) {
    return null
  }

  return (
    <Card
      className={cn(
        'w-full select-none',
        'cursor-pointer bg-default-100 transition-background hover:bg-default-200',
        className,
        {
          'bg-primary-100 hover:bg-primary-100/90': isSelected,
          'pointer-events-none animate-pulse opacity-80': isArchiving,
        },
      )}
      shadow="none"
      onClick={(e) => e.stopPropagation()}
    >
      <CardBody
        className="flex flex-col p-2 pb-3"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <div className="relative w-full overflow-hidden pb-[45%]">
          <div className="absolute inset-0 h-full w-full">
            <div className="flex h-full w-full items-center justify-center rounded-small bg-background">
              <VscodeDocumentIcon width={38} height={38} />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-2 pl-2 pt-2" onDoubleClick={e => e.stopPropagation()}>
          <div className="flex flex-1 flex-col overflow-hidden">
            <Typography level="p5" noWrap className="w-full">
              {page.name || 'Untitled'}
            </Typography>
            <div className="flex items-stretch gap-2">
              <Typography level="p6" color="textTertiary">
                {page.updated_at === page.created_at ? (
                  <>Created at {formatTimeToNow(page.created_at)}</>
                ) : (
                  <>Updated at {formatTimeToNow(page.document?.updated_at || page.updated_at)}</>
                )}
              </Typography>
            </div>
          </div>
          <PageActionMenu page={page} onSuccess={onMutateSuccess} onShareClick={onShareClick}>
            <Button isIconOnly size="sm" variant="light" radius="full" className="shrink-0">
              <RiMore2Line size={16} />
            </Button>
          </PageActionMenu>
        </div>
      </CardBody>
    </Card>
  )
}
