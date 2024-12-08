import { PageViewType, PageViewTypeEnum } from "@/schema/page"
import { FC } from "react"
import { BaseCardViewProps } from "./type"
import { FolderCard } from "./PageFolderCard"
import { PageAssetCard } from "./PageAssetCard"
import { PageDocumentCard } from "./PageDocumentCard"


const views: {
    Component: FC<BaseCardViewProps>
    viewType: PageViewType
}[] = [
    {
        viewType: PageViewTypeEnum.FOLDER,
        Component: FolderCard
    },
    {
        viewType: PageViewTypeEnum.DOCUMENT,
        Component: PageDocumentCard
    },
    {
        viewType: PageViewTypeEnum.ASSET,
        Component: PageAssetCard
    }
]

export const PageCardView = (props: BaseCardViewProps) => {
    const Component = views.find((view) => view.viewType === props.page?.view_type)?.Component
    if (!Component) {
        return null
    }
    return <Component {...props} />
}
 