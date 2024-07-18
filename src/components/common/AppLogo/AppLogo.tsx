import { cn } from '@/libs/utils'
import Typography, { TypographyProps } from '../Typography'
import { FcRuler } from 'react-icons/fc'

export const AppLogo = (props: TypographyProps) => {
  return (
    <Typography level="h5" {...props} className={cn('flex', props.className)}>
      Stuhub.
      <FcRuler />
    </Typography>
  )
}
