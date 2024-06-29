import { Input, InputProps } from '@nextui-org/react'
import { withForm } from './withForm'

export const FormInput = withForm<string, InputProps>(Input)
