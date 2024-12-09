import { Page } from '@/schema/page'

export const AudioView = (props: { page: Page }) => {
  const { page } = props
  const { asset } = page
  return (
    <div className="h-full w-full flex items-center justify-center">
      <audio src={asset?.url ?? ''} controls>
        <track kind="captions" />
        Your browser does not support audio.
      </audio>
    </div>
  )
}
