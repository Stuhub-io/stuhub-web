import { useState } from 'react'

export const useSearchValue = (inputValue?: string, onChange?: (value: string) => void) => {
  const [search, setSearch] = useState(inputValue || '')
  const searchValue = inputValue !== undefined ? inputValue : search

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onChange?.(value)
  }

  return {
    value: searchValue,
    onValueChange: handleSearchChange,
  }
}
