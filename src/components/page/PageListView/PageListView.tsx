import { FC, useMemo } from 'react'
import { BaseListViewProps } from './type'
import { GridView } from './GridView'
import { HorizontalListView } from './HorizontalListView'

const views: {
  Component: FC<BaseListViewProps>
  type: 'grid' | 'list'
}[] = [
  {
    Component: GridView,
    type: 'grid',
  },
  {
    Component: HorizontalListView,
    type: 'list',
  }
]

export const PageListView = ({ viewType = 'grid' , ...props}: BaseListViewProps) => {
  const ListComponent = useMemo(() => views.find((view) => view.type === viewType)?.Component, [viewType])

  if (!ListComponent) {
    return null
  }

  return <ListComponent {...props} />
}
