import { useCallback, useEffect, useMemo, useState } from 'react'

export interface UseResponsiveImageScaleArgs {
  imageUrl?: string
  onPreloadImage?: (image: HTMLImageElement) => void
  container: HTMLDivElement | null
  allow?: boolean
}

export const useResponsiveImageScale = ({
  imageUrl,
  onPreloadImage,
  container,
  allow = true,
}: UseResponsiveImageScaleArgs) => {
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [imageNaturalWidth, setImageNaturalWidth] = useState<number>(0)
  const [imageNaturalHeight, setImageNaturalHeight] = useState<number>(0)

  const imageScale = useMemo(() => {
    if (imageNaturalWidth === 0 || imageNaturalHeight === 0) return 0
    const scale = Math.min(
      containerWidth / imageNaturalWidth,
      containerHeight / imageNaturalHeight,
    )
    return scale
  }, [containerWidth, containerHeight, imageNaturalWidth, imageNaturalHeight])

  const handleImageOnLoad = useCallback(
    (image: HTMLImageElement) => {
      onPreloadImage?.(image)
      setImageNaturalWidth(image.naturalWidth)
      setImageNaturalHeight(image.naturalHeight)
    },
    [onPreloadImage],
  )

  useEffect(() => {
    if (!allow) return
    const image = new Image()
    image.onload = () => handleImageOnLoad(image)
    image.src = imageUrl ?? ''
  }, [allow, handleImageOnLoad, imageUrl])

  const handleResize = useCallback(() => {
    if (container !== null) {
      const rect = container.getBoundingClientRect()
      setContainerWidth(rect.width)
      setContainerHeight(rect.height)
    } else {
      setContainerWidth(0)
      setContainerHeight(0)
    }
  }, [container])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [allow, handleResize])

  return {
    containerWidth,
    containerHeight,
    imageScale,
  }
}
