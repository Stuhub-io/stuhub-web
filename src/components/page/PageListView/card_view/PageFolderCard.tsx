import Typography from '@/components/common/Typography'
import { PageViewTypeEnum } from '@/schema/page'
import { Button, Card, CardBody } from '@nextui-org/react'
import { BaseCardViewProps } from './type'
import { PageActionMenu } from '../../PageMenu'
import { RiFolder3Fill, RiMore2Line } from 'react-icons/ri'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/libs/utils'
import { useAssetUploadContext } from '@/components/providers/asset_upload'
import { useToast } from '@/hooks/useToast'
import { useMutationState } from '@tanstack/react-query'
import { MUTATION_KEYS } from '@/mutation/keys'

export const FolderCard = (props: BaseCardViewProps) => {
  const { page, onMutateSuccess, onClick, className, onDoubleClick, isSelected, onShareClick } =
    props
  const { handleUpload } = useAssetUploadContext()
  const { toast } = useToast()

  const archiveStatus = useMutationState({
    filters: {
      mutationKey: MUTATION_KEYS.ARCHIVE_PAGE({ id: page.id }),
    },
    select: (state) => state.state.status,
  })

  const isArchiving = archiveStatus.includes('pending')

  const handleDoubleClick = () => {
    onDoubleClick?.(page)
  }

  const handleClick = () => {
    onClick?.(page)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files: File[]) => {
      toast({
        variant: 'default',
        title: 'Uploading files',
      })
      files.forEach((file) => {
        handleUpload?.(file, page.pkid)
      })
    },
  })

  if (page?.view_type !== PageViewTypeEnum.FOLDER) {
    return null
  }

  return (
    // @ts-expect-error -- TSCONVERSION
    <Card
      as="div"
      className={cn(
        'w-full select-none',
        'cursor-pointer bg-default-100 transition-background hover:bg-default-200',
        {
          'bg-default-200 outline-dashed outline-2 outline-primary': isDragActive,
          'bg-content2': isDragActive,
          'bg-primary-100 hover:bg-primary-100/90': isSelected,
          'pointer-events-none animate-pulse bg-opacity-80': isArchiving,
        },
        className,
      )}
      shadow="none"
      {...getRootProps()}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <input className="invisible" {...getInputProps()} />
      <CardBody className="p-2" onClick={handleClick} onDoubleClick={handleDoubleClick}>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center text-success">
            <RiFolder3Fill size={20} />
          </div>
          <div className="flex-1 overflow-hidden">
            <Typography level="p5" noWrap>
              {page.name || 'Untitled'}
            </Typography>
          </div>
          <div className="shrink-0" onDoubleClick={e => e.stopPropagation()}>
            <PageActionMenu page={page} onSuccess={onMutateSuccess} onShareClick={onShareClick}>
              <Button isIconOnly size="sm" variant="light" radius="full">
                <RiMore2Line size={16} />
              </Button>
            </PageActionMenu>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
