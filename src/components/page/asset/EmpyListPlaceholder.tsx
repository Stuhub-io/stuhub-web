import Typography from '@/components/common/Typography'
import { EmptyBoxSvg } from '@/components/icons/EmptyBoxSvg'
import { Button } from '@nextui-org/react'

export const EmptyListPlaceholder = (props: { onClick: () => void }) => {
  const { onClick } = props
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <EmptyBoxSvg width={140} height={140} />
        <Typography level="p3" color="textTertiary">
          Dop files here or click to upload
        </Typography>
        <Button
          onClick={onClick}
          className="mt-3"
          color="primary"
          variant="flat"
        >
          Upload Files
        </Button>
      </div>
    </div>
  )
}
