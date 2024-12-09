import { PageViewer } from '../../type'
import { isAudioExtension, isImageExtension, isVideoExtension } from '@/utils/file'
import { ImageView } from './ImageView'
import { PDFView } from './PdfView'
import { AudioView } from './AudioView'
import { VideoView } from './VideoView'

export const PageAssetViewer: PageViewer = (props) => {
  const { page } = props

  const { asset } = page ?? {}

  if (!asset) {
    return null
  }

  if (page && isImageExtension(asset.extension)) {
    return <ImageView page={page} />
  }
  if (page && asset.extension === 'pdf') {
    return <PDFView page={page} />
  }
  if (page && isAudioExtension(asset.extension)) {
    return <AudioView page={page} />
  }
  if (page && isVideoExtension(asset.extension)) {
    return <VideoView page={page} />
  }
  return null
}
