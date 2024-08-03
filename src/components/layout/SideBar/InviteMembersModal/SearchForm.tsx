import { Chip, Input } from '@nextui-org/react'
import { useCallback } from 'react'

type SearchFormProps = {
  emailValue: string
  emails: string[]
  setEmailValue: (value: string) => void
  addEmail: (email: string) => void
  removeEmail: (email: string) => void
}

export const SearchForm = ({
  emailValue,
  emails,
  setEmailValue,
  addEmail,
  removeEmail,
}: SearchFormProps) => {
  const renderSelectedEmails = useCallback(() => {
    if (!emails.length) return null
    return (
      <div className="flex flex-wrap gap-1 px-2 py-1.5">
        {emails.map((email) => (
          <Chip key={email} onClose={() => removeEmail(email)}>
            {email}
          </Chip>
        ))}
      </div>
    )
  }, [emails, removeEmail])

  return (
    <div className="w-full pt-1">
      {renderSelectedEmails()}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addEmail(emailValue)
        }}
      >
        <Input
          classNames={{
            inputWrapper: [
              'bg-transparent',
              'shadow-none',
              'group-hover:bg-transparent',
              'rounded-sm',
            ],
            input: ['placeholder:text-text-primary'],
          }}
          placeholder="Search name or emails"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </form>
    </div>
  )
}
