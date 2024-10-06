import Typography from '@/components/common/Typography'
import { useOrganization } from '@/components/providers/organization'
import { ROUTES } from '@/constants/routes'
import { Page } from '@/schema/page'
import { Card, CardFooter, CardHeader, Image } from '@nextui-org/react'
import Link from 'next/link'
import { RiBookLine } from 'react-icons/ri'

interface PageCardProps {
  pageDetail?: Page
}

export const PageCard = (props: PageCardProps) => {
  const { pageDetail } = props
  const { organization } = useOrganization()

  const href = ROUTES.ORGANIZATION_PAGE({
    pageID: pageDetail?.id ?? '',
    orgSlug: organization?.slug ?? '',
  })

  return (
    <Card className="h-[140px] w-full max-w-[200px] shrink-0" shadow="sm" as={Link} href={href}>
      <CardHeader className="flex flex-col items-stretch pt-0">
        <div className="relative -mx-3 h-[44px]">
          {pageDetail?.cover_image ? (
            <Image
              radius="none"
              loading="lazy"
              src={pageDetail.cover_image}
              alt="cover image"
              classNames={{
                wrapper: 'h-full w-full !max-w-full',
              }}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-content2" />
          )}
        </div>
        <div className="mt-2 h-[40px] w-full">
          <Typography level="h8" className="line-clamp-2 !font-medium">
            {pageDetail?.name}
          </Typography>
        </div>
      </CardHeader>
      <CardFooter className="gap-2 text-text-tertiary">
        <RiBookLine size={14} />
        <Typography level="p6" color="textTertiary">
          3 mins read
        </Typography>
      </CardFooter>
    </Card>
  )
}
