import Typography from '../Typography'
import { FcRuler } from 'react-icons/fc'
import { FcSettings } from 'react-icons/fc'

export const AppLogo = () => {
  return (
    <Typography level="h1" className="flex">
      Stuhub.
      <FcRuler />
      <FcSettings className="animate-spin" />
    </Typography>
  )
}
