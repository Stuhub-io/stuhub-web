import Typography from '@/components/common/Typography'
import { Button } from '@nextui-org/react'
import { RxEnvelopeClosed } from 'react-icons/rx'

type SearchResultsProps = {
  results: string[]
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div className="px-3 py-1.5">
      <Typography level="p6" className="text-text-tertiary">
        Select a person
      </Typography>
      <div className="mt-1">
        {results.map((email) => (
          <Button
            key={email}
            fullWidth
            className="justify-start"
            radius="sm"
            startContent={<RxEnvelopeClosed />}
          >
            <Typography level="p5" key={email}>
              {email}
            </Typography>
          </Button>
        ))}
      </div>
    </div>
  )
}
