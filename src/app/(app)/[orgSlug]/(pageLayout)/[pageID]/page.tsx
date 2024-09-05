'use client'

import { BlockBasedEditor } from '@/components/common/BlockBasedEditor'
import { TextAreaNoBackground } from '@/components/common/TextAreaNoBackground'
import { usePageContext } from '@/components/providers/page'
import { useFetchDocument } from '@/mutation/querier/document/useFetchDocument'
import { Button } from '@nextui-org/react'
import { JSONContent } from 'novel'
import { useEffect, useState } from 'react'
import { RiUserSmileFill, RiImage2Fill } from 'react-icons/ri'

export default function PageDetail() {
  const { currentPage } = usePageContext()
  const { data: { data: documentData } = {} } = useFetchDocument({
    allowFetch: !!currentPage,
    pagePkID: currentPage?.pk_id ?? -1,
  })

  const [title, setTitle] = useState(currentPage?.name)
  const [content, setContent] = useState<JSONContent>()

  useEffect(() => {
    if (document) {
      setContent(documentData?.json_content ? JSON.parse( documentData?.json_content) : undefined)
    }
  }, [documentData])

  return (
    <>
      <div className="group flex flex-col">
        <div className="h-8 opacity-0 transition duration-200 group-hover:opacity-100">
          <div className="hidden gap-1 opacity-60 group-hover:flex">
            <Button startContent={<RiUserSmileFill size={16} />} size="sm" variant="light">
              Icons
            </Button>
            <Button startContent={<RiImage2Fill size={16} />} size="sm" variant="light">
              Icons
            </Button>
          </div>
        </div>
        <TextAreaNoBackground
          minRows={1}
          placeholder="Untitled"
          value={title}
          onValueChange={setTitle}
          autoFocus
          classNames={{
            input: 'text-5xl font-semibold',
          }}
        />
      </div>
      <div className="-mx-3 mt-2 pb-10">
        {content !== undefined && (
          <BlockBasedEditor
            jsonContent={content}
            onJsonContentChange={(json) => setContent(json)}
          />
        )}
      </div>
    </>
  )
}
