import Typography from '@/components/common/Typography'
import { VscodePdfIcon } from '@/components/icons/VsCodePdfIcon'
import { formatReadableExtension, formatReadableFileSize } from '@/utils/file'
import { Button, Progress } from '@nextui-org/react'
import { RiCheckLine, RiDeleteBin2Fill, RiFolderOpenFill, RiStopFill } from 'react-icons/ri'

interface AssetUploadingItemProps {
  name: string
  size: number
  progress: number
  state: 'uploading' | 'done' | 'error'
  extension: string
  onRemove: () => void
  onCancel: () => void
  onDoneClick?: () => void
}

export const AssetUploadingItem = (props: AssetUploadingItemProps) => {
  const { name, size, progress, extension, onRemove, onCancel, state, onDoneClick } = props

  const handleCloseClick = () => {
    switch (state) {
      case 'done':
        onRemove()
        onDoneClick?.()
        break
      case 'error':
        onRemove()
        break
      case 'uploading':
        onCancel()
        break
    }
  }

  const renderIcon = (() => {
    switch (state) {
      case 'error':
        return <RiDeleteBin2Fill size={16} />
      case 'uploading':
        return <RiStopFill size={16}/>
    }
  })()

  return (
    <div className="flex w-full flex-col rounded-medium bg-default-100 p-2 px-3 group">
      <div className="flex items-stretch gap-3">
        <div className="flex w-8 items-center justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-small bg-content2/60">
            <VscodePdfIcon width={20} height={20} />
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Typography noWrap level="p5">
            {name}
          </Typography>
          <Typography noWrap level="p6" color="textTertiary">
            {formatReadableExtension(extension)} • {formatReadableFileSize(size)}
          </Typography>
        </div>
        <div className="flex h-full items-start">
          {/* {state === 'done' && (
            <Button isIconOnly size="sm" variant="light" radius="full" onClick={handleCloseClick}>

              </Button>
          )} */}
          <Button isIconOnly size="sm" variant="light" radius="full" onClick={handleCloseClick}>
            {state === 'done' ? (
              <>
                <span className='group-hover:inline-block hidden'>
                  <RiFolderOpenFill size={16} className='text-success' />
                </span>
                <span className='group-hover:hidden inline-block'>
                  <RiCheckLine size={16} />
                </span>
              </>
            ): 
            renderIcon
            }
          </Button>
        </div>
      </div>
      {state === 'uploading' && <div className="mt-1 flex items-center gap-2">
        <Progress size="sm" value={progress} />
        <Typography level="p6" color="textTertiary">
          {progress}%
        </Typography>
      </div>}
    </div>
  )
}
