import { usePageLayoutContext } from '@/components/layout/PageLayout/context'
import {
  Button,
  Image,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { RiDeleteBin2Fill, RiMoreLine } from 'react-icons/ri'

export const PageCoverImage = () => {
  const { currentCoverImageUrl, setCoverImageUrl } = usePageLayoutContext()

  if (!currentCoverImageUrl) return null

  return (
    <div className="group relative h-[240px] w-full">
      <Image
        loading="lazy"
        src={currentCoverImageUrl}
        alt="cover image"
        classNames={{
          wrapper: 'h-full w-full !max-w-full',
        }}
        className="h-full w-full object-cover"
      />
      <Popover placement="bottom-end">
        <div className="absolute right-4 top-4 z-20 hidden gap-3 group-hover:flex">
          <PopoverTrigger>
            <Button isIconOnly size="sm" variant="flat" radius="full">
              <RiMoreLine size={20} />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="min-w-[200px]">
          <Listbox>
            <ListboxItem
              key="remove"
              startContent={<RiDeleteBin2Fill />}
              onClick={() => {
                setCoverImageUrl('')
              }}
            >
              Remove Cover
            </ListboxItem>
            <ListboxItem key="upload">Upload Image</ListboxItem>
          </Listbox>
        </PopoverContent>
      </Popover>
    </div>
  )
}
