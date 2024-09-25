import {
  Children,
  cloneElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react'

interface WrapperRegistryProps {
  wrappers?: ReactNode[]
}

// Auto pass in children to the wrapper
export const WrapperRegistry = (props: PropsWithChildren<WrapperRegistryProps>) => {
  const { children, wrappers } = props

  const child = Children.only(children) as ReactElement

  let wrapped = cloneElement(child, { ...child.props }) as ReactNode

  wrappers?.forEach((wrapper) => {
    wrapped = cloneElement(
      wrapper as ReactElement,
      {
        ...(wrapper as ReactElement).props,
      },
      wrapped,
    )
  })

  return wrapped
}
