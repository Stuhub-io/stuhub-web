import { useResponsiveImageScale } from '@/hooks/useResponsiveImageScale'
import { Button, Image, Slider } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import {
  TransformWrapper,
  TransformComponent,
  useControls,
  useTransformEffect,
} from 'react-zoom-pan-pinch'
import {
  RiArrowLeftSLine,
  RiDownloadFill,
  RiPrinterFill,
  RiTimeFill,
  RiZoomInFill,
  RiZoomOutFill,
} from 'react-icons/ri'
import { Page } from '@/schema/page'


export const ImageView = (props: {
    page: Page
}) => {
  const { page } = props

  const { asset } = page ?? {}
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const { imageScale, containerHeight, containerWidth } = useResponsiveImageScale({
    imageUrl: asset?.url ?? '',
    onPreloadImage: () => {},
    allow: Boolean(asset?.url),
    container,
  })

  if (!asset) {
    return null
  }

  const baseScale = Math.round(imageScale * 100) / 100
  return (
    <TransformWrapper
      initialScale={baseScale}
      maxScale={baseScale * 8}
      minScale={baseScale * 0.5}
      centerOnInit
    >
      <div className="flex h-full w-full flex-col">
        <div className="relative -mx-4 flex h-[56px] items-center justify-between gap-3 bg-default-50 px-4 ">
          <div>
            <Button size="sm" isIconOnly radius="full" variant="light">
              <RiArrowLeftSLine size={16} />
            </Button>
          </div>
          <div className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 items-center">
            <PanPinchZoomControl
              minScale={baseScale * 0.5}
              maxScale={baseScale * 8}
              initScale={baseScale}
              containerHeight={containerHeight}
              containerWidth={containerWidth}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" isIconOnly radius="full">
              <RiTimeFill size={16} />
            </Button>
            <Button size="sm" isIconOnly radius="full">
              <RiPrinterFill size={16} />
            </Button>
            <Button size="sm" isIconOnly radius="full">
              <RiDownloadFill size={16} />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden" ref={setContainer}>
          <TransformComponent
            wrapperStyle={{
              width: '100%',
              height: '100%',
            }}
          >
            <Image src={asset.url ?? ''} alt={page?.name ?? ''} loading="lazy" />
          </TransformComponent>
        </div>
      </div>
    </TransformWrapper>
  )
}


const PanPinchZoomControl = (props: {
  maxScale: number
  minScale: number
  initScale: number
  containerHeight: number
  containerWidth: number
}) => {
  const { initScale, minScale, maxScale, containerHeight, containerWidth } = props
  const { zoomIn, zoomOut, centerView } = useControls()
  const [scale, setScale] = useState(initScale)

  useEffect(() => {
    centerView(scale, 0)
  }, [centerView, containerWidth, containerHeight, scale])

  useEffect(() => {
    setScale(initScale)
  }, [initScale])

  useTransformEffect(({ state }) => {
    setScale(state.scale)
  })

  return (
    <div className="flex items-center gap-3">
      <Button size="sm" isIconOnly radius="full" onClick={() => zoomOut(0.3)} variant='light'>
        <RiZoomOutFill size={16} />
      </Button>
      <Slider
        size="sm"
        className="w-[100px]"
        value={scale}
        maxValue={maxScale}
        minValue={minScale}
        step={(maxScale - minScale) / 10}
        onChange={(value) => {
          setScale(value as number)
          centerView(value as number, 0)
        }}
      />
      <Button size="sm" isIconOnly radius="full" onClick={() => zoomIn(0.3)} variant="light">
        <RiZoomInFill size={16} />
      </Button>
    </div>
  )
}
