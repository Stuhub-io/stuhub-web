'use client'

import { useAuthContext } from '@/components/auth/AuthGuard'
import { ProfileBadge } from '@/components/common/ProfileBadge'
import { ACCOUNT_SETTINGS, WORKPLACE_SETTINGS } from '@/constants/settings'
import { cn } from '@/libs/utils'
import { Setting } from '@/schema/setting'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'

interface SettingMenuProps {
  selectedSetting: Setting
  setSelectedSetting: (value: Setting) => void
}

export const SettingMenu = (props: SettingMenuProps) => {
  const { user } = useAuthContext()
  return (
    <div className="flex w-[250px] flex-col items-start gap-2 rounded-l-large bg-content2 p-3">
      <ProfileBadge
        avatar={user?.avatar}
        firstName={user?.first_name}
        lastName={user?.last_name}
        description={user?.email}
        size="sm"
        variant="light"
        disableRipple
        className="!pointer-events-none"
      />
      <SettingCluster title="Account" settings={ACCOUNT_SETTINGS} {...props} />
      <SettingCluster title="Workplace" settings={WORKPLACE_SETTINGS} {...props} />
    </div>
  )
}

interface SettingClusterProps {
  title: string
  settings: Setting[]
  selectedSetting: Setting
  setSelectedSetting: (value: Setting) => void
}

const SettingCluster = ({
  title,
  settings,
  selectedSetting,
  setSelectedSetting,
}: SettingClusterProps) => {
  return (
    <Listbox variant="flat">
      <ListboxSection title={title}>
        {settings.map((setting) => (
          <ListboxItem
            key={setting.key}
            startContent={<setting.icon size={20} />}
            onClick={() => setSelectedSetting(setting)}
            className={cn({
              'bg-content3': selectedSetting.key === setting.key,
            })}
          >
            {setting.label}
          </ListboxItem>
        ))}
      </ListboxSection>
    </Listbox>
  )
}
