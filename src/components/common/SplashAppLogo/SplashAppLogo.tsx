import { FcRuler, FcSettings } from 'react-icons/fc'
import Typography from '../Typography'

export const SplashAppLogo = () => {
  return (
    <Typography level="h1" className="flex">
      Stuhub.
      <FcRuler />
      <FcSettings className="animate-spin" />
    </Typography>
  )
}
