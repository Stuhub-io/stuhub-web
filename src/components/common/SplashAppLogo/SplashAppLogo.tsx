import { FcRuler, FcSettings } from 'react-icons/fc'
import Typography from '../Typography'

export const SplashAppLogo = ({noAnimate, size = "md"}: { noAnimate?: boolean, size?: 'md' | 'sm' }) => {
  const level = size === 'md' ? 'h1' : 'h5'
  return (
    <Typography level={level} className="flex">
      Stuhub.
      <FcRuler />
      <FcSettings className={noAnimate ? '' : 'animate-spin'} />
    </Typography>
  )
}