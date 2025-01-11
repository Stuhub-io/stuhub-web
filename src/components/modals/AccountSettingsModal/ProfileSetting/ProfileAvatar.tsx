import { useAuthContext } from '@/components/auth/AuthGuard'
import Typography from '@/components/common/Typography'
import { getUserFullName } from '@/utils/user'
import { Avatar, Button, ButtonGroup } from '@nextui-org/react'
import { upperCase } from 'lodash'
import { ChangeEvent, useRef } from 'react'

interface ProfileAvatarProps {
  avatarUrl?: string
  setFile: (file: File) => void
}

export const ProfileAvatar = ({ avatarUrl, setFile }: ProfileAvatarProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { user } = useAuthContext()

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setFile(files[0])
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar
        src={avatarUrl}
        size="lg"
        fallback={upperCase(
          getUserFullName({
            firstName: user?.first_name,
            lastName: user?.last_name,
            email: user?.email,
          })?.[0] ?? '',
        )}
      />
      <div className="flex flex-col gap-2">
        <Typography level="p5" color="textTertiary">
          {getUserFullName({
            firstName: user?.first_name,
            lastName: user?.last_name,
            email: user?.email,
          })}
        </Typography>
        <div className="space-x-3">
          <input
            ref={fileInputRef}
            type="file"
            name="myImage"
            accept="image/*"
            hidden
            onChange={onFileChange}
          />
          <ButtonGroup size="sm">
            <Button onClick={() => fileInputRef?.current?.click()}>
              Upload Photo
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}
