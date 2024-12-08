import { Page } from "@/schema/page";

export type BaseCardViewProps<T extends Record<string, any> = Record<string, any>> = T &{
    page: Page
    onMutateSuccess?: () => void
    onClick?: (page: Page) => void
    onDoubleClick?: (page: Page) => void
    className?: string
    isSelected?: boolean
}

