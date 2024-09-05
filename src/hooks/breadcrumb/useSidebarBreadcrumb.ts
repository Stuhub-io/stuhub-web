import { usePageContext } from "@/components/providers/page";
import { useSidebar } from "@/components/providers/sidebar";
import { useMemo } from "react";


export const useSidebarBreadcrumb = () => {
    const { privatePages } = useSidebar()
    const { currentPage } = usePageContext()
    
    // FIXME: fetch current page with page UUID from params
    // show title first -> waiting for sidebar to be ready
    const paths = useMemo(() => {
        if (!currentPage) return []
        if (privatePages === undefined) return []
        const path = [currentPage]
        let initPath = currentPage
        while (initPath?.parent_page_pkid) {
            path.push(privatePages?.map[initPath.parent_page_pkid])
            initPath = privatePages?.map[initPath.parent_page_pkid]
        }
        return path.reverse()
    }, [privatePages, currentPage])
    
    return paths
}