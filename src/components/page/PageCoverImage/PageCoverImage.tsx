import { usePageLayoutContext } from '@/components/layout/PageLayout'
import { Image } from '@nextui-org/react'

export const PageCoverImage = () => {
  const { currentCoverImageUrl } = usePageLayoutContext()

  if (!currentCoverImageUrl) return null

  return (
    <div className="relative h-[240px] w-full">
      <Image
        loading="lazy"
        src={currentCoverImageUrl}
        alt="cover image"
        classNames={{
          wrapper: 'h-full w-full max-w-full',
        }}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
