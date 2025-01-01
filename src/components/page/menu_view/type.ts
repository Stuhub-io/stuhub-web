import { Page } from "@/schema/page";
import { FC, PropsWithChildren } from "react";

export interface BasePageMenuProps extends PropsWithChildren {
    page: Page
    onSuccess?: () => void
    onShareClick?: (page: Page) => void
}

export type PageActionMenuViewer = FC<BasePageMenuProps>

