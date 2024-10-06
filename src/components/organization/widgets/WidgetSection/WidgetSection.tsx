import Typography from "@/components/common/Typography"
import { PropsWithChildren, ReactNode } from "react"

interface WidgetSectionProps extends PropsWithChildren {
  title: string
  moreMenu?: ReactNode
  rightEls?: ReactNode
  icon?: ReactNode
}

export const WidgetSection = (props: WidgetSectionProps) => {
  const { icon, title, children, rightEls } = props
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2 items-center">
        {icon}
        <Typography level="p5" className="flex-1" color="textTertiary">
          {title}
        </Typography>
        <div className="flex gap-3">{rightEls}</div>
      </div>
      {children}
    </div>
  )
}
