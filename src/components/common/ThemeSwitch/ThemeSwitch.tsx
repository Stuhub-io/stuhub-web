'use client'

import { useTheme } from '@/hooks/useTheme'
import { Switch } from '@nextui-org/react'

export const ThemeSwitch = () => {
  const { activeTheme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-3">
      {activeTheme === 'dark' ? '🌙' : '☀️'}
      <Switch
        size="sm"
        isSelected={activeTheme === 'dark'}
        onValueChange={(isSelected) => {
          setTheme(isSelected ? 'dark' : 'light')
        }}
      />
    </div>
  )
}
