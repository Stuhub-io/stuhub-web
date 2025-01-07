'use client'

import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { SettingDisplay } from './SettingDisplay'
import { useState } from 'react'
import { ACCOUNT_SETTINGS } from '@/constants/settings'
import { Setting } from '@/schema/setting'
import { SettingMenu } from './SettingMenu'

type AccountSettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const AccountSettingsModal = ({ isOpen, onClose }: AccountSettingsModalProps) => {
  const [selectedSetting, setSelectedSetting] = useState<Setting>(ACCOUNT_SETTINGS[0])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      hideCloseButton
      scrollBehavior="inside"
      classNames={{
        body: 'min-h-[calc(100vh-200px)]',
      }}
    >
      <ModalContent>
        <ModalBody className="h-full flex-row gap-0 p-0">
          <SettingMenu {...{ selectedSetting, setSelectedSetting }} />
          <SettingDisplay title={selectedSetting.title}>
            <selectedSetting.content />
          </SettingDisplay>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
