import { Page } from "@/schema/page";
import { FC, PropsWithChildren } from "react";

export interface BasePageMenuProps extends PropsWithChildren {
    page: Page
    onSuccess?: () => void
}

export type PageActionMenuViewer = FC<BasePageMenuProps>

