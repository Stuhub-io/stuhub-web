'use client'

import { useSearchParams } from 'next/navigation'

export default function ValidateAuthEmail() {
  const params = useSearchParams()
  const token = params.get('token')
  console.log(token)
  return <div>{token}</div>
}
