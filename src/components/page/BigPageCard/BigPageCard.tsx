import Typography from '@/components/common/Typography'
import { useOrganization } from '@/components/providers/organization'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/libs/utils'
import { Page } from '@/schema/page'
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'
import { RiArrowRightLine, RiBookLine, RiMore2Fill } from 'react-icons/ri'
import { PageActionMenu } from '../PageActionMenu'
import { memo } from 'react'
import { useRouter } from 'next/navigation'

interface BigPageCardProps {
  pageDetail?: Page
  onSuccess?: () => void
  onBeforeArchive?: () => boolean
  onBeforeMove?: () => boolean
}

export const BigPageCard = memo((props: BigPageCardProps) => {
  const { pageDetail, onSuccess, onBeforeArchive, onBeforeMove } = props
  const { organization } = useOrganization()
  const { push } = useRouter()

  const href = ROUTES.ORGANIZATION_PAGE({
    pageID: pageDetail?.id ?? '',
    orgSlug: organization?.slug ?? '',
  })

  return (
    <Card
      className={cn(
        'hover:bg-default-content1 w-full min-w-[400px] max-w-[400px] shrink-0 !no-underline',
        {
          'min-h-[200px]': false,
          'min-h-[100px]': true,
        },
      )}
      shadow="sm"
      as="button"
    >
      <CardHeader className="relative flex flex-col items-stretch pt-0">
        <div className="relative -mx-3 h-[60px]">
          {pageDetail?.cover_image ? (
            <Image
              radius="none"
              loading="lazy"
              src={pageDetail.cover_image}
              alt="cover image"
              classNames={{
                wrapper: 'h-full w-full !max-w-full',
                img: '!my-0',
              }}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-content2" />
          )}
        </div>
        {!!pageDetail && (
          <div className="absolute right-4 top-4 z-50 flex gap-2">
            <Button
              isIconOnly
              size="sm"
              type="button"
              onClick={(e) => {
                e.preventDefault()
                push(href)
              }}
            >
              <RiArrowRightLine size={16} />
            </Button>
            <PageActionMenu
              page={pageDetail}
              onSuccess={onSuccess}
              onBeforeArchive={onBeforeArchive}
              onBeforeMove={onBeforeMove}
            >
              <Button
                isIconOnly
                size="sm"
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <RiMore2Fill size={16} />
              </Button>
            </PageActionMenu>
          </div>
        )}
      </CardHeader>
      <CardBody className="pt-0">
        <div className="mb-1 w-full">
          <Typography level="h7" className="line-clamp-2 !font-medium">
            {pageDetail?.name || 'Untitled'}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="gap-2 text-text-tertiary">
        <RiBookLine size={14} />
        <Typography level="p6" color="textTertiary">
          3 mins read
        </Typography>
      </CardFooter>
    </Card>
  )
})

BigPageCard.displayName = 'BigPageCard'
