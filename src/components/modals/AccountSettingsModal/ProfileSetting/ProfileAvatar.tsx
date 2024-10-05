import { Avatar, Button } from '@nextui-org/react'
import { ChangeEvent, useRef } from 'react'

interface ProfileAvatarProps {
  avatarUrl?: string
  setFile: (file: File) => void
}

export const ProfileAvatar = ({ avatarUrl, setFile }: ProfileAvatarProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setFile(files[0])
  }

  return (
    <div className="flex items-center gap-6">
      <Avatar src={avatarUrl} className="h-24 w-24 text-large" />

      <div className="space-x-3">
        <input
          ref={fileInputRef}
          type="file"
          name="myImage"
          accept="image/*"
          hidden
          onChange={onFileChange}
        />
        <Button color="primary" onClick={() => fileInputRef?.current?.click()}>
          Change picture
        </Button>
        <Button color="danger">Delete picture</Button>
      </div>
    </div>
  )
}
