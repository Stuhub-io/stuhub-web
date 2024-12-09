import { Page } from '@/schema/page'

export const PDFView = (props: { page: Page }) => {
  const { page } = props
  const { asset } = page
  return (
    <div className="h-full w-full">
      <iframe
        src={`https://docs.google.com/viewer?url=${asset?.url}&embedded=true`}
        style={{
          width: '100%',
          height: '100%',
        }}
        frameBorder="0"
      />
    </div>
  )
}
