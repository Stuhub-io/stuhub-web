import { useSidebar } from "@/components/providers/sidebar";
import { OrganizationPageParams } from "@/constants/routes";
import { useFetchPage } from "@/mutation/querier/page/useFetchPage";
import { useParams } from "next/navigation";
import { useMemo } from "react";


export const useSidebarBreadcrumb = () => {
    const { privatePages } = useSidebar()
    const { pageID } = useParams<OrganizationPageParams>()
    const { data: {data: pageDetail} = {} } = useFetchPage({
        pageID,
        allowFetch: !!pageID
    })
    
    // FIXME: fetch current page with page UUID from params
    // show title first -> waiting for sidebar to be ready
    const paths = useMemo(() => {
        if (!pageDetail) return []
        if (privatePages === undefined) return []
        const path = [pageDetail]
        let initPath =pageDetail 
        while (initPath?.parent_page_pkid) {
            path.push(privatePages?.map[initPath.parent_page_pkid])
            initPath = privatePages?.map[initPath.parent_page_pkid]
        }
        return path.reverse()
    }, [privatePages, pageDetail])
    
    return paths
}