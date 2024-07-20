import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Typography from '../common/Typography'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { BsChevronRight } from 'react-icons/bs'
import { ThemeSwitch } from '../common/ThemeSwitch/ThemeSwitch'

export const LandingPageHeader = () => {
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
        <NavbarContent>
          <ThemeSwitch />
        </NavbarContent>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem>
          <Button variant="light">Features</Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="light">Pricing</Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="light">How it work?</Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" as={Link} href={ROUTES.SIGNIN_PAGE}>
            Getting Start
            <BsChevronRight size={16} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
