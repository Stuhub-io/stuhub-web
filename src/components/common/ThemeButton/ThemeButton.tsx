import { useTheme } from '@/hooks/useTheme'
import { Button } from '@nextui-org/react'
import { ComponentPropsWithRef, ComponentRef, forwardRef } from 'react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri'

export const ThemeButton = forwardRef<
  ComponentRef<typeof Button>,
  ComponentPropsWithRef<typeof Button>
>(() => {
  const { activeTheme, setTheme } = useTheme()
  return (
    <Button
      isIconOnly
      size="sm"
      variant="light"
      onClick={() => {
        setTheme(activeTheme === 'dark' ? 'light' : 'dark')
      }}
    >
      {activeTheme === 'dark' ? <RiMoonFill size={20} /> : <RiSunFill size={20} />}
    </Button>
  )
})

ThemeButton.displayName = 'ThemeButton'
