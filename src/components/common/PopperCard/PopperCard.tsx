import useMergeRefs from '@/hooks/useMergeRefs'
import { Tooltip, TooltipProps } from '@nextui-org/react'
import {
  Children,
  cloneElement,
  ComponentRef,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useId,
  useState,
} from 'react'

interface PopperCardProps extends TooltipProps {
  isOpen?: boolean
  onClose?: () => void
  renderContent: (setAnchorEl: (el: HTMLElement | null) => void, tabIndex: number) => ReactNode
}

export const PopperCard = forwardRef<ComponentRef<typeof Tooltip>, PopperCardProps>(
  (props: PropsWithChildren<PopperCardProps>, ref) => {
    const { isOpen, renderContent, children, onClose, ...tooltipProps } = props
    const [contentRef, setContentRef] = useState<HTMLElement | null>(null)
    const id = useId()

    const child = Children.only(children) as ReactElement
    const mergedRef = useMergeRefs(ref, child.props.ref)

    useEffect(() => {
      const handleOutSideClick: EventListener = (event) => {
        if (!contentRef?.contains(event.target as Node)) {
          onClose?.()
        }
      }
      const handleEscape: EventListener = (event: any) => {
        if (event.key === 'Escape') {
          onClose?.()
        }
      }
      window.addEventListener('mousedown', handleOutSideClick)
      document.addEventListener('keyup', handleEscape)

      return () => {
        window.removeEventListener('mousedown', handleOutSideClick)
        document.removeEventListener('keyup', handleEscape)
      }
    }, [contentRef, id, onClose])

    const renderChild = cloneElement(child as ReactElement, {
      ...(child as ReactElement).props,
      ref: mergedRef,
    })

    return (
      <Tooltip
        {...tooltipProps}
        isOpen={isOpen}
        content={renderContent(setContentRef, 0)}
        autoFocus
        classNames={{
          content: 'p-0 bg-transparent border-none',
          base: `popper${String(id)}`,
        }}
      >
        {renderChild}
      </Tooltip>
    )
  },
)

PopperCard.displayName = 'PopperCard'