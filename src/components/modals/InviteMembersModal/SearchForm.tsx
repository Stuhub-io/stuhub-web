import { useDebounce } from 'use-debounce'
import { useFindUserByEmail } from '@/mutation/mutator/useFindUserByEmail'
import { User } from '@/schema/user'
import { checkIsEmailValid } from '@/utils/user'
import { Chip, Input } from '@nextui-org/react'
import { useCallback, useEffect, useRef, useState } from 'react'

type SearchFormProps = {
  emails: string[]
  invitedEmails: string[]
  searchedUser: User | null
  setSearchedUser: (value: User | null) => void
  addEmail: (email: string) => void
  removeEmail: (email: string) => void
}

export const SearchForm = ({
  emails,
  invitedEmails,
  searchedUser,
  setSearchedUser,
  addEmail,
  removeEmail,
}: SearchFormProps) => {
  const [email, setEmail] = useState('')
  const [debouncedEmail] = useDebounce(email, 500)

  const emailInputRef = useRef<HTMLInputElement>(null)

  const { mutate: findUserByEmailMutate } = useFindUserByEmail()

  const handleSubmitInvite = (e: React.FormEvent) => {
    e.preventDefault()

    const existingEmail = invitedEmails.find((value) => value === email)
    if (!email || !checkIsEmailValid(email) || !!existingEmail) return

    addEmail(email)
    setEmail('')
  }

  useEffect(() => {
    if (!debouncedEmail) return
    if (checkIsEmailValid(debouncedEmail) && searchedUser?.email != debouncedEmail) {
      findUserByEmailMutate(
        { email: debouncedEmail },
        {
          onSuccess: ({ data: { user } }) => {
            setSearchedUser(user)
          },
        },
      )
    }
  }, [debouncedEmail, findUserByEmailMutate, setSearchedUser, searchedUser])

  const renderSelectedEmails = useCallback(() => {
    if (!emails.length) return null
    return (
      <div className="flex flex-wrap gap-1 px-2 py-1.5">
        {emails.map((value) => (
          <Chip key={value} onClose={() => removeEmail(value)}>
            {value}
          </Chip>
        ))}
      </div>
    )
  }, [emails, removeEmail])

  useEffect(() => {
    emailInputRef?.current && emailInputRef.current.focus()
  }, [])

  return (
    <div className="w-full pt-1">
      {renderSelectedEmails()}
      <form onSubmit={handleSubmitInvite}>
        <Input
          ref={emailInputRef}
          variant="flat"
          placeholder="Search name or emails"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
    </div>
  )
}
