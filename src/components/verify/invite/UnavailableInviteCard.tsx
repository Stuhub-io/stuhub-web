import Typography from '@/components/common/Typography'
import { ROUTES } from '@/constants/routes'
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react'
import Link from 'next/link'

export const UnavailableInviteCard = () => {
  return (
    <Card className="w-[450px] py-4">
      <CardHeader className="flex-col items-center justify-center">
        <Image
          alt="Organization avatar"
          className="h-[90px] w-[90px] object-cover"
          src="https://static-00.iconduck.com/assets.00/14-location-not-found-illustration-1024x724-ab2fnq2x.png"
          radius="full"
        />
      </CardHeader>
      <CardBody className="flex-col items-center justify-center gap-1 overflow-visible pt-1">
        <Typography level="h4">Invite Invalid</Typography>
        <Typography level="p5" color="textTertiary">
          This invite may be expired, or you might not have permission to join.
        </Typography>
      </CardBody>
      <CardFooter className="pb-1 pt-4">
        <Button fullWidth color="primary" size="lg" as={Link} href={ROUTES.HOME_PAGE}>
          Continue to Stuhub
        </Button>
      </CardFooter>
    </Card>
  )
}
