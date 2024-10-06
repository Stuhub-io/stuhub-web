import { Pagination } from '@nextui-org/react'

interface MembersPaginationProps {
  page: number
  totalPages: number
  setPage: (value: number) => void
}

export const MembersPagination = ({ page, totalPages, setPage }: MembersPaginationProps) => {
  if (totalPages === 1) return null

  return (
    <div className="flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        size="sm"
        page={page}
        total={totalPages}
        onChange={setPage}
      />
    </div>
  )
}
