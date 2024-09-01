import { useSidebar } from "@/components/providers/sidebar";
import { useMemo } from "react";


export const useSidebarBreadcrumb = () => {
    const { privatePages, selectPage } = useSidebar()
    
    // FIXME: fetch current page with page UUID from params
    // show title first -> waiting for sidebar to be ready
    
    const paths = useMemo(() => {
        if (!selectPage) return []
        if (privatePages === undefined) return []
        const path = []
        let initPath = selectPage
        while (initPath?.parent_page_pkid) {
            path.push(privatePages?.map[initPath.parent_page_pkid])
            initPath = privatePages?.map[initPath.parent_page_pkid]
        }
        return path
    }, [privatePages, selectPage])

    return paths.reverse()
}