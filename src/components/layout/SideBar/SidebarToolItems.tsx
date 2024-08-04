import { Kbd, Listbox, ListboxItem } from '@nextui-org/react'
import { AiFillHome, AiFillMail, AiFillMoon, AiFillSetting, AiFillSun } from 'react-icons/ai'
import { useMemo } from 'react'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { useTheme } from '@/hooks/useTheme'
import Link from 'next/link'

export const SidebarToolItems = () => {
  const { activeTheme, setTheme } = useTheme()
  const { organization } = useOrganization()
  const items = useMemo(
    () => [
      {
        title: 'Home',
        iconLeft: <AiFillHome />,
        rightEl: (
          <Kbd className="text-xs" keys={['command', 'shift']}>
            H
          </Kbd>
        ),
        href: ROUTES.ORGANIZATION({ orgSlug: organization?.slug ?? '' }),
      },
      {
        title: 'Inboxes',
        iconLeft: <AiFillMail />,
        rightEl: (
          <Kbd className="text-xs" keys={['command', 'shift']}>
            I
          </Kbd>
        ),
      },
      {
        title: 'Settings & Members',
        iconLeft: <AiFillSetting />,
        rightEl: (
          <Kbd className="text-xs" keys={['command', 'shift']}>
            P
          </Kbd>
        ),
      },
      {
        title: 'Switch Theme',
        iconLeft: activeTheme === 'dark' ? <AiFillMoon /> : <AiFillSun />,
        rightEl: (
          <Kbd className="text-xs" keys={['command', 'shift']}>
            \
          </Kbd>
        ),
        onClick: () => {
          setTheme(activeTheme === 'dark' ? 'light' : 'dark')
        },
      },
    ],
    [activeTheme, organization?.slug, setTheme],
  )
  return (
    <Listbox>
      {items.map((item) => (
        <ListboxItem
          key={item.title}
          as={item.href ? Link : undefined}
          href={item.href}
          variant="flat"
          className="px-2 py-1 text-text-tertiary"
          startContent={
            <span className="flex h-6 w-6 items-center justify-center">{item.iconLeft}</span>
          }
          endContent={item.rightEl}
          onClick={item.onClick}
        >
          {item.title}
        </ListboxItem>
      ))}
    </Listbox>
  )
}
