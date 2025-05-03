import { Page } from "@/schema/page";
import { MouseEvent as ReactMouseEvent } from "react";

export type BaseCardViewProps<T extends Record<string, any> = Record<string, any>> = T &{
    page: Page
    onMutateSuccess?: () => void
    onClick?: (page: Page, e: ReactMouseEvent<HTMLDivElement, MouseEvent> ) => void
    onDoubleClick?: (page: Page) => void
    className?: string
    isSelected?: boolean
    // onAddToFavoritesClick?: (page: Page) => void
    parentPage?: Page
}

