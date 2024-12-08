import { SidebarItem, SidebarItemLeftSpacer, SidebarIconButton } from "@/components/common/Sidebar"
import { useCreatePageContext } from "@/components/providers/newpage"
import { useSidebar } from "@/components/providers/sidebar"
import { PageViewTypeEnum } from "@/schema/page"
import { useMemo, useEffect } from "react"
import { RiFileLine, RiFolderFill } from "react-icons/ri"
import { CreatingPageItemView } from "./type"

export const CreatingSidebarPageItem: CreatingPageItemView = (props) => {
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