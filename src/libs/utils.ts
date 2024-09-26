import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event)
      return event?.defaultPrevented
    })
  }
}

export type FirstFuncParamType<T extends (...args: any) => any> = Parameters<T>[0]


export const newIdGenerator = () => {
  let Id = 1
  return () => {
    return String(Id++)
  }
}

export const isSSR = () => {
  return typeof window === 'undefined'
}
