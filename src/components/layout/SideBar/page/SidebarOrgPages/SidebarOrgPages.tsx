import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { SidebarItem } from '../../SidebarItem'
import { SidebarIconButton } from '../../SidebarIconbutton'
import { RiAddFill, RiFileFill, RiFileLine, RiFolderFill } from 'react-icons/ri'
import { useSidebar } from '@/components/providers/sidebar'
import { useEffect, useMemo, useState } from 'react'
import { PageViewTypeEnum } from '@/schema/page'
import { SidebarItemLeftSpacer } from '../../SidebarItemLeftSpacer'
import { ICreatingPage, useCreatePageContext } from '@/components/providers/newpage'
import { PageCreateButton } from '../PageCreateButton'
import { SidebarPageItem } from './SidebarPageItem'
import { SidebarFolderItem } from './SidebarFolderItem'
import { PoperContentTrigger } from '@/components/common/PopoverTrigger'
import { PageCreateMenu } from '@/components/page/PageCreateMenu'

export const SidebarOrgPages = () => {
  const { orgPages } = useSidebar()
  const { creatingPages, selectedParent } = useCreatePageContext()
  const [isExpanded, setIsExpanded] = useState(true)

  const isRenderCreatingPage = selectedParent === undefined

  const creatPagesData = useMemo(() => {
    return creatingPages.filter((page) => page.input.parent_page_pkid === undefined)
  }, [creatingPages])

  const outerPages = useMemo(() => {
    return orgPages?.list?.filter((page) => !page.parent_page_pkid && !page.archived_at)
  }, [orgPages])

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger asChild>
        <SidebarItem
          endContent={
            <PoperContentTrigger>
              <SidebarIconButton showOnGroupHoverOnly>
                <RiAddFill />
              </SidebarIconButton>
              <PageCreateMenu
                onClose={() => {
                  setIsExpanded(true)
                }}
              />
            </PoperContentTrigger>
          }
        >
          Documents
        </SidebarItem>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ActiveCreatingPageItem />
        {creatPagesData?.map((toCreate) => (
          <CreatingSidebarPageItem key={toCreate.id} data={toCreate} />
        ))}
        {outerPages?.map((page) => {
          if (page.view_type === PageViewTypeEnum.DOCUMENT) {
            return <SidebarPageItem key={page.id} page={page} level={0} />
          }
          return <SidebarFolderItem key={page.id} page={page} level={0} />
        })}
        {!isRenderCreatingPage && !creatPagesData.length && (outerPages?.length ?? 0) === 0 && (
          <PageCreateButton />
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

interface CreatingSidebarPageItemProps {
  data: ICreatingPage
  level?: number
}

export const CreatingSidebarPageItem = (props: CreatingSidebarPageItemProps) => {
  const { data, level = 0 } = props

  const { doneCreatingPage } = useCreatePageContext()
  const { orgPages } = useSidebar()

  const isRenderedOnScreen = useMemo(() => {
    return Boolean(data.result) && orgPages?.map[data.result?.pkid ?? -1]
  }, [data.result, orgPages?.map])

  useEffect(() => {
    if (isRenderedOnScreen) {
      doneCreatingPage(data.id)
    }
  })

  if (isRenderedOnScreen) {
    return null
  }

  return (
    <SidebarItem
      disabled
      startContent={
        <>
          <SidebarItemLeftSpacer level={level} />
          <SidebarIconButton>
            {data.input.view_type === PageViewTypeEnum.DOCUMENT ? <RiFileLine /> : <RiFolderFill />}
          </SidebarIconButton>
        </>
      }
    >
      {data.input.name || 'Untitled'}
    </SidebarItem>
  )
}

export const ActiveCreatingPageItem = (props: { level?: number; parentPagePkID?: number }) => {
  const { level = 0, parentPagePkID } = props
  const { createPageData, creatingPages, createID, isOpenCreatePage, selectedParent } =
    useCreatePageContext()

  const isModifying = useMemo(
    () => !creatingPages.find((p) => p.id === createID),
    [createID, creatingPages],
  )

  if (selectedParent?.pkid !== parentPagePkID) {
    return null
  }

  if (!isOpenCreatePage || !isModifying) {
    return null
  }

  return (
    <SidebarItem
      className="!opacity-70"
      disabled
      startContent={
        <>
          <SidebarItemLeftSpacer level={level} />
          <SidebarIconButton>
            <RiFileFill />
          </SidebarIconButton>
        </>
      }
    >
      {createPageData?.name || 'Untitled'}
    </SidebarItem>
  )
}
