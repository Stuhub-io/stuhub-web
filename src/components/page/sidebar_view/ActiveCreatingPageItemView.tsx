import { SidebarItem, SidebarItemLeftSpacer, SidebarIconButton } from "@/components/common/Sidebar";
import { useCreatePageContext } from "@/components/providers/newpage";
import { useMemo } from "react";
import { RiFileFill } from "react-icons/ri";

export const ActiveCreatingPageItem = (props: { level?: number; parentPagePkID?: number }) => {
  const { level = 0, parentPagePkID } = props
  const { createDocData, creatingPages, createID, isOpenCreateDoc, selectedParent } =
    useCreatePageContext()

  const isModifying = useMemo(
    () => !creatingPages.find((p) => p.id === createID),
    [createID, creatingPages],
  )

  if (selectedParent?.pkid !== parentPagePkID) {
    return null
  }

  if (!isOpenCreateDoc || !isModifying) {
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
      {createDocData?.name || 'Untitled'}
    </SidebarItem>
  )
}
