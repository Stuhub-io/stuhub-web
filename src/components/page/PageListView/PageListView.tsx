import { FC } from 'react'
import { BaseListViewProps } from './type'
import { GridView } from './GridView'

const views: {
  Component: FC<BaseListViewProps>
  type: 'grid' | 'list'
}[] = [
  {
    Component: GridView,
    type: 'grid',
  },
  // {
  //   Component: ListView,
  //   type: 'list',
  // }
]

export const PageListView = (props: BaseListViewProps) => {
  const ListComponent = views.find((view) => view.type === 'grid')?.Component

  if (!ListComponent) {
    return null
  }

  return <ListComponent {...props} />
}
