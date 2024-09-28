import { ROUTES } from '@/constants/routes'
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Link from 'next/link'
import { ThemeSwitch } from '../common/ThemeSwitch/ThemeSwitch'
import Typography from '../common/Typography'

export const VerifyPageHeader = () => {
  return (
    <Navbar
      classNames={{
        wrapper: '!container backdrop-blur-md',
      }}
    >
      <NavbarContent justify="start">
        <NavbarBrand className="gap-4">
          <Link href={ROUTES.LANDING_PAGE}>
            <Typography level="h5">Stuhub 📖</Typography>
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <ThemeSwitch />
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  )
}
