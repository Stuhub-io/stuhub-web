import { Page } from "@/schema/page"
import { PageIconPreview } from "../../PageListView/PageIconPreview"


interface PageDrawerInfoSectionProps {
    page: Page
}

export const PageDrawerInfoSection = (props: PageDrawerInfoSectionProps) => {
    const { page } = props
    return (
        <div className="h-full overflow-y-auto">
            <PageIconPreview size={160} page={page} isFullWidth />
        </div>
    )
} 