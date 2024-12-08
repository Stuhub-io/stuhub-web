import { PageViewType, PageViewTypeEnum } from "@/schema/page"
import { BasePageMenuProps, PageActionMenuViewer } from "./type"
import { PageDocumentActionMenu } from "./viewers/DocumentActionMenu/DocumentActionMenu"


const pageActionMenuViewers: {
    viewer: PageActionMenuViewer
    viewType: PageViewType
}[] = [
    {
        viewType: PageViewTypeEnum.DOCUMENT,
        viewer: PageDocumentActionMenu,
    },
    {
        viewType: PageViewTypeEnum.FOLDER,
        viewer: PageDocumentActionMenu,
    },
    {
        viewType: PageViewTypeEnum.ASSET,
        viewer: PageDocumentActionMenu,
    }
]

export const PageActionMenuView = (props :BasePageMenuProps) => {

    const Component = pageActionMenuViewers.find((viewer) => viewer.viewType === props.page.view_type)?.viewer

    if (!Component) return null

    return <Component {...props} />
}