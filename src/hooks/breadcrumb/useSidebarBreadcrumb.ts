import { useSidebar } from "@/components/providers/sidebar";
import { OrganizationPageParams } from "@/constants/routes";
import { useFetchPage } from "@/mutation/querier/page/useFetchPage";
import { useParams } from "next/navigation";
import { useMemo } from "react";


export const useSidebarBreadcrumb = () => {
    const { orgPages } = useSidebar()
    const { pageID } = useParams<OrganizationPageParams>()

    const { data: {data: pageDetail} = {} } = useFetchPage({
        pageID,
        allowFetch: !!pageID
    })
    
    // FIXME: fetch current page with page UUID from params
    // show title first -> waiting for sidebar to be ready
    const paths = useMemo(() => {
        if (!pageID) return []
        if (!pageDetail) return []

        const path = [pageDetail]

        // if page is archived, return only the page itself
        if (orgPages === undefined) return path
        // if page is archived, return only the page itself
        if (pageDetail.archived_at) return path
        
        let initPath = pageDetail 
        while (initPath?.parent_page_pkid) {
            if (!orgPages?.map[initPath.parent_page_pkid]) break
            
            path.push(orgPages?.map[initPath.parent_page_pkid].page)
            initPath = orgPages?.map[initPath.parent_page_pkid].page
        }
        return path.reverse()
    }, [orgPages, pageDetail, pageID])
    
    return paths
}