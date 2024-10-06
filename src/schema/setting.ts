import { LazyExoticComponent } from 'react'
import { IconType } from 'react-icons/lib'

export interface Setting {
  key: string
  label: string
  title: string
  icon: IconType
  content: LazyExoticComponent<() => JSX.Element>
}
