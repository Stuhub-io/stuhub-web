import { useState } from 'react'
import { TOCHeading } from '@/components/common/BlockBasedEditor/utils/extract-headings'
import { Skeleton } from '@nextui-org/react'
import { PageContent } from '../../document/PageContent'
import { PageTitle } from '../../document/PageTitleInput'
import { TableOfContent } from '../../document/TableOfContent'
import { PageViewer } from '../type'

export const PageDocumentViewer: PageViewer = (props) => {
  const { page, isLoading, isRefetching, onAddCoverImage, hasCoverImage } = props

  const [headings, setHeadings] = useState<TOCHeading[]>([])

  return (
    <div className="flex w-full">
      <div className="mx-auto w-full max-w-[900px]">
        <div className="flex flex-col py-8">
          <div className="flex flex-col">
            {page && (
              <PageTitle
                pageID={page?.id}
                key={page?.id}
                onAddCover={onAddCoverImage}
                hasCoverImg={hasCoverImage}
              />
            )}
          </div>
          <div className="-mx-8 mt-4 pb-10 p-8 bg-default-100 rounded-large min-h-[1000px]">
            {page ? (
              <>
                <PageContent
                  page={page}
                  onContentHeadingChanged={setHeadings}
                  key={isRefetching ? 'loading' : page.pkid}
                />
              </>
            ) : (
              <div className="flex flex-col gap-4 px-8 py-8">
                <Skeleton className="h-[44px] w-[400px] max-w-full rounded-small" />
                <Skeleton className="h-[30px] w-[600px] max-w-full rounded-small" />
              </div>
            )}
          </div>
        </div>
      </div>
      {page && <TableOfContent key={isLoading ? 'loading' : 'done'} headings={headings} />}
    </div>
  )
}
