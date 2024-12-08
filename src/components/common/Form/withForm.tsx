import { ElementRef, forwardRef } from 'react'
import { Controller, FieldPath, FieldValues, UseFormReturn, useFormContext } from 'react-hook-form'

export interface BaseFormControlProps {
  isInvalid?: boolean
  disabled?: boolean
  errMsg?: string
  value?: string
  onChange?: (val: string) => void
  onBlur?: () => void
}

export interface FormState<T, P> {
  getIsInvalid?: (val?: boolean) => Partial<P>
  getDisabled?: (val?: boolean) => Partial<P>
  getErrMsg?: (val?: string) => Partial<P>
  getValue?: (val?: T) => Partial<P>
  getOnValueChange?: (onChange: (val: T) => void) => Partial<P>
  getOnBlur?: (onBlur: () => void) => Partial<P>
}

export const DefaultFormMapper = {
  getIsInvalid(isInvalid?: boolean) {
    return { isInvalid }
  },
  getDisabled(isDisabled?: boolean) {
    return { isDisabled }
  },
  getErrMsg(errorMessage?: string) {
    return { errorMessage }
  },
  getValue(value?: string) {
    return { value }
  },
  getOnValueChange(onValueChange: (val: any) => void) {
    return { onValueChange }
  },
  getOnBlur(onBlur: () => void) {
    return { onBlur }
  },
}

export type NonNativeOnChange<T, TFieldValues extends FieldValues = FieldValues> = (
  setValue: UseFormReturn<TFieldValues>['setValue'],
  field: string,
) => (value: T) => void

export const withForm = <
  T = any,
  P extends object = object,
  TFieldValues extends FieldValues = FieldValues,
>(
  Component: React.ComponentType<P>,
  Mapper?: FormState<T, P>,
  noneNativeOnValueChange?: NonNativeOnChange<T, TFieldValues>,
) => {
  const {
    getIsInvalid = DefaultFormMapper.getIsInvalid,
    getDisabled = DefaultFormMapper.getDisabled,
    getValue = DefaultFormMapper.getValue,
    getOnValueChange = DefaultFormMapper.getOnValueChange,
    getErrMsg = DefaultFormMapper.getErrMsg,
    getOnBlur,
  } = Mapper ?? {}
  const Comp = forwardRef(
    <Value extends TFieldValues>(
      props: P & {
        name: FieldPath<Value>
        disabled?: boolean
      },
      ref: ElementRef<any>,
    ) => {
      const { name, disabled, ...restProps } = props
      const { setValue } = useFormContext<TFieldValues>()

      return (
        (<Controller<Value>
          name={name}
          disabled={disabled}
          render={({ field: { value, onChange, disabled: fieldDisabled, onBlur }, fieldState }) => (
            // @ts-expect-error allow miss match of props
            (<Component
              ref={ref}
              {...getIsInvalid(Boolean(fieldState.error?.message))}
              {...getErrMsg(fieldState.error?.message ?? '')}
              {...getDisabled(fieldDisabled ?? false)}
              {...getValue(value)}
              {...getOnValueChange(
                noneNativeOnValueChange ? noneNativeOnValueChange(setValue, name) : onChange,
              )}
              {...getOnBlur?.(onBlur)}
              {...restProps}
            />)
          )}
        />)
      );
    },
  )
  Comp.displayName = `withForm(${Component.displayName || Component.name})`
  return Comp
}
