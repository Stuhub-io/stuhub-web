import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Typography from '../common/Typography';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { ChevronRight } from 'lucide-react';

export const LandingPageHeader = () => {
  return (
    <Navbar>
      <NavbarContent justify='start'>
        <NavbarBrand className='gap-4'>
          <Link href={ROUTES.LANDING_PAGE}>
            <Typography level='h5'>Stuhub</Typography>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Button variant='light'>Features</Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant='light'>Pricing</Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant='light'>How it work?</Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button color='primary'>
            Getting Start
            <ChevronRight size={16} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
