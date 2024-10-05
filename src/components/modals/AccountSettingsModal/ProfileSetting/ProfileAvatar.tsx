import { Avatar, Button } from '@nextui-org/react'

export const ProfileAvatar = () => {
  //   const { startUpload, permittedFileInfo } = useUploadThing('productImage', {
  //     onClientUploadComplete: () => {
  //       alert('uploaded successfully!')
  //     },
  //     onUploadError: () => {
  //       alert('error occurred while uploading')
  //     },
  //     onUploadBegin: () => {
  //       alert('upload has begun')
  //     },
  //   })

  return (
    <div className="flex items-center gap-6">
      <Avatar
        src="https://image.api.playstation.com/vulcan/img/rnd/202010/2723/jBUUeoqKq1IzHbMeS9RzG0Z6.png"
        className="h-24 w-24 text-large"
      />

      <div className="space-x-3">
        <Button color="primary">Change picture</Button>
        <Button color="danger">Delete picture</Button>
      </div>
    </div>
  )
}
