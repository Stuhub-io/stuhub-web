import Typography from '@/components/common/Typography'
import { User } from '@/schema/user'
import { Avatar, Button, Chip } from '@nextui-org/react'

type SearchResultsProps = {
  invitedEmails: string[]
  results: User[]
  addEmail: (email: string) => void
}

export const SearchResults = ({ invitedEmails, results, addEmail }: SearchResultsProps) => {
  return (
    <div className="px-3 py-1.5">
      <Typography level="p6" className="text-text-tertiary">
        Select a person
      </Typography>
      <div className="mt-1">
        {results.map(({ id, email, avatar }) => {
          const isEmailInvited = invitedEmails.includes(email)
          return (
            <Button
              key={id}
              fullWidth
              radius="sm"
              className="justify-start bg-background pl-3"
              isDisabled={isEmailInvited}
              startContent={<Avatar src={avatar} radius="sm" size="sm" />}
              endContent={
                isEmailInvited ? (
                  <Chip color="default" className="ml-auto mr-0">
                    Invited
                  </Chip>
                ) : null
              }
              onClick={() => addEmail(email)}
            >
              <Typography level="p5" key={email}>
                {email}
              </Typography>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
