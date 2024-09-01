import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import Link from 'next/link'

type IBreadCrumbLink = {
    title: string
    url: string
    subLinks?: IBreadCrumbLink[]
    disabled?: boolean
    loading?: boolean
}

interface AppBreadCrumbsProps {
    links: IBreadCrumbLink[]
}

// FIXME: Handle loading, selector sub Links
export const AppBreadCrumbs = (props: AppBreadCrumbsProps) => {
    const { links } = props
    return (
        <Breadcrumbs
            separator="/"
        >
        {links.map((baseLink) => {
            return (
                <BreadcrumbItem key={baseLink.url} href={baseLink.url} isDisabled={baseLink.disabled} as={Link}>
                    {baseLink.title}
                </BreadcrumbItem>
            )
        })}
        </Breadcrumbs>
    )
}