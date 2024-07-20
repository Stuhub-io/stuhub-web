import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import Typography from '../common/Typography'
import { ROUTES } from '@/constants/routes'
import { ThemeSwitch } from '../common/ThemeSwitch/ThemeSwitch'

export const AuthHeader = () => {
  return (
    <Navbar
      classNames={{
        wrapper: '!container backdrop-blur-md',
      }}
    >
      <NavbarContent>
        <NavbarBrand className="gap-4">
          <Link href={ROUTES.LANDING_PAGE}>
            <Typography level="h5">Stuhub 📖</Typography>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent>
        <NavbarContent justify="end">
          <ThemeSwitch />
        </NavbarContent>
        <NavbarItem>
          <Button color="primary" as={Link} href={ROUTES.SIGNIN_PAGE}>
            Sign In
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
