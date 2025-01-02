import Typography from '@/components/common/Typography'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'

interface Props {
  open: boolean
  onClose: () => void
}

export const PagePermissionRoleInfoModal = ({ open, onClose }: Props) => {
  return (
    <Modal isOpen={open} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Permission Roles</ModalHeader>
        <ModalBody>
          <Typography level="p4">
            Google Drive Permissions: Viewer vs. Editor
          </Typography>
          <Typography level="p5">
                The <b>Viewer</b> role is designed for read-only access, allowing users to see the content without making changes.
          </Typography>
          <Typography level="p5">
                The <b>Editor</b> role provides full access to modify the content.
          </Typography>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
