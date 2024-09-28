import Typography from '@/components/common/Typography'
import { Card, CardHeader, CardBody, Image, Chip, CardFooter, Button } from '@nextui-org/react'
import { GoDotFill } from 'react-icons/go'

interface OrgInviteCardProps {
  inviteId: string
  orgName: string
  orgAvatar: string
  ownerFullname: string
  orgMembersLength: number
}

export const OrgInviteCard = ({
  inviteId,
  orgName,
  orgAvatar,
  ownerFullname,
  orgMembersLength,
}: OrgInviteCardProps) => {
  const onAcceptInvite = async () => {
    console.log({ inviteId })
  }

  return (
    <Card className="w-[450px] py-4">
      <CardHeader className="flex-col items-center justify-center">
        <Image
          alt="Organization avatar"
          className="h-[90px] w-[90px] object-cover"
          src={orgAvatar}
          radius="full"
        />
      </CardHeader>
      <CardBody className="flex-col items-center justify-center gap-1 overflow-visible pt-1">
        <Typography level="p5" color="textSecondary">
          <strong>{ownerFullname}</strong> invite you to join
        </Typography>
        <Typography level="h4">{orgName}</Typography>
        <Chip
          startContent={<GoDotFill size={20} />}
          variant="faded"
          color="default"
          className="mt-1"
          size="sm"
        >
          {orgMembersLength} members
        </Chip>
      </CardBody>
      <CardFooter className="pb-1 pt-4">
        <Button fullWidth color="primary" size="lg" onClick={onAcceptInvite}>
          Accept Invite
        </Button>
      </CardFooter>
    </Card>
  )
}
