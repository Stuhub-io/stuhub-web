import { isSSR } from "@/libs/utils"
import { useEffect, useState } from "react"


const VIEW_TYPES = {
    GRID: 'grid',
    LIST: 'list',
} as const

export type ViewType = 'grid' | 'list'

export const useViewType = () => {
    const [ viewType, setViewType ]= useState<'grid'|'list'>(() => {
        if (isSSR()) return VIEW_TYPES.GRID
        const prevState = localStorage.getItem('listViewType') || VIEW_TYPES.GRID
        return (Object.values(VIEW_TYPES).includes(prevState as ViewType) ? prevState : VIEW_TYPES.GRID) as ViewType
    })

    useEffect(() => {
        localStorage.setItem('listViewType', viewType)
    }, [viewType])

    return {
        viewType,
        setViewType,
    }
}