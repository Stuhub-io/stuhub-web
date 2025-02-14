import { Listbox, ListboxItem } from '@nextui-org/react'
import { AiFillHome, AiFillMail, AiFillMoon, AiFillSetting, AiFillSun } from 'react-icons/ai'
import { useMemo } from 'react'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { useTheme } from '@/hooks/useTheme'
import Link from 'next/link'
import { RiSearch2Fill } from 'react-icons/ri'
import { useGlobalSearchContext } from '@/components/providers/search'

interface IToolItem {
  title: string
  iconLeft: JSX.Element
  href?: string
  onClick?: () => void
  rightEl?: JSX.Element
}

export const SidebarToolItems = () => {
  const { activeTheme, setTheme } = useTheme()
  const { organization } = useOrganization()
  const { onOpenSearch } = useGlobalSearchContext()
  const items: IToolItem[] = useMemo(
    () => [
      {
        title: 'Search',
        iconLeft: <RiSearch2Fill />,
        onClick: () => {
          onOpenSearch?.()
        },
      },
      {
        title: 'Home',
        iconLeft: <AiFillHome />,
        href: ROUTES.ORGANIZATION({ orgSlug: organization?.slug ?? '' }),
      },
      {
        title: 'Shared With Me',
        iconLeft: <AiFillMail />,
      },
      {
        title: 'Settings & Members',
        iconLeft: <AiFillSetting />,
      },
      {
        title: 'Switch Theme',
        iconLeft: activeTheme === 'dark' ? <AiFillMoon /> : <AiFillSun />,
        onClick: () => {
          setTheme(activeTheme === 'dark' ? 'light' : 'dark')
        },
      },
    ],
    [activeTheme, onOpenSearch, organization?.slug, setTheme],
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
          startContent={<span className="flex h-6 w-6 items-center justify-center">{item.iconLeft}</span>}
          endContent={item.rightEl}
          onClick={item.onClick}
        >
          {item.title}
        </ListboxItem>
      ))}
    </Listbox>
  )
}
