import { Page } from "@/schema/page"



export const VideoView = (props: { page: Page }) => {
    const { page } = props
    const { asset } = page
    return (
        <div className="h-full w-full flex items-center justify-center">
        <video src={asset?.url ?? ''} controls>
            <track kind="captions" />
            Your browser does not support video.
        </video>
        </div>
    )
}