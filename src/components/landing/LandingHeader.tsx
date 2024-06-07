'use client';

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Switch } from '@nextui-org/react';
import Typography from '../common/Typography';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const LandingPageHeader = () => {
  const { setTheme, activeTheme } = useTheme();
  return (
    <Navbar
      classNames={{
        wrapper: '!container backdrop-blur-md',
      }}
    >
      <NavbarContent justify='start'>
        <NavbarBrand className='gap-4'>
          <Link href={ROUTES.LANDING_PAGE}>
            <Typography level='h5'>Stuhub 📖</Typography>
          </Link>
        </NavbarBrand>
        <NavbarContent>
          {activeTheme === 'dark' ? '🌙' : '☀️'}
          <Switch
            size='sm'
            isSelected={activeTheme === 'dark'}
            onValueChange={(isSelected) => {
              setTheme(isSelected ? 'dark' : 'light');
            }}
          />
        </NavbarContent>
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
