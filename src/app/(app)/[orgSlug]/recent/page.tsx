'use client'

import Typography from '@/components/common/Typography'
import { PageListView } from '@/components/page/PageListView/PageListView'
import { EmptyListPlaceholder } from '@/components/page/asset/EmpyListPlaceholder'
import { FolderViewToolbar } from '@/components/page/page_view/page_viewers/PageFolderViewer/Toolbar'
import { useFetchPageAccessLogs } from '@/mutation/querier/page-access-log/useFetchPageAccessLogs'
import { Selection } from '@nextui-org/react'
import { useState } from 'react'

export default function Page() {
  const { data: { data: logs } = {}, refetch } = useFetchPageAccessLogs({
    allowFetch: true,
  })

  const [selectedPagePkIDs, setSelectedPagePkIDs] = useState<number[]>([])

  const [typeFilter, setTypeFilter] = useState<Selection>('all')

  const filesAndDocs = logs?.map((log) => log.page)

  return (
    <>
      <div className="md:px-4">
        <div className="my-8 grid grid-cols-1 gap-2">
          <Typography level="h4">Recent</Typography>

          <FolderViewToolbar
            isViewOnly
            typeFilter={typeFilter}
            onCreateFolderClick={() => {}}
            onTypeFilterChange={setTypeFilter}
            onUploadClick={() => {}}
          />
        </div>

        <PageListView
          items={filesAndDocs}
          onItemMutateSuccess={refetch}
          onItemDoubleClick={() => {}}
          selectedItemPkIDs={selectedPagePkIDs}
          onSelectedPkIDsChanged={setSelectedPagePkIDs}
          emptyState={<EmptyListPlaceholder onClick={() => {}} />}
        />
      </div>
    </>
  )
}
