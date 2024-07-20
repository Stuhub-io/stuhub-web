import { ChangeEventHandler, Children, cloneElement, PropsWithChildren, useRef } from 'react'

export interface FileUploadWrapperProps extends PropsWithChildren {
  multiple?: boolean
  onSelectedFile?: (image: Blob) => void
  onSelectedMultipleFiles?: (images: FileList) => void
  accept?: string
  isSelected?: boolean
}

export const FileUploadWrapper = (props: FileUploadWrapperProps) => {
  const { multiple, onSelectedFile, isSelected, onSelectedMultipleFiles, accept, children } = props
  const fileUploadInputRef = useRef<HTMLInputElement>(null)

  if (Children.count(children) !== 1) {
    throw new Error('FileUploadWrapper can only have one child')
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log('e.target.files', e.target.files)
    if ((e.target.files?.length ?? 0) > 1) {
      onSelectedMultipleFiles?.(e.target.files as FileList)
      return
    }
    const fileUploaded = e.target.files?.[0]
    if (!fileUploaded) return
    onSelectedFile?.(fileUploaded)
  }

  return (
    <>
      {!isSelected && (
        <input
          className="hidden"
          type="file"
          accept={accept}
          ref={fileUploadInputRef}
          onChange={handleChange}
          multiple={multiple}
        />
      )}
      {Children.map(children, (child) => {
        return cloneElement(child as any, {
          ...(child as any).props,
          onClick: (e: any) => {
            e.preventDefault()
            fileUploadInputRef.current?.click()
          },
        })
      })}
    </>
  )
}
