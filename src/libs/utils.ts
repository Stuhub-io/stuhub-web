import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionArguments<T extends Function> = T extends (...args: infer R) => any ? R : never

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function callAllHandlers<T extends (event: any) => void>(...fns: (T | undefined)[]) {
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

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export const isSameObjects = <T, K extends object>(obj1: T, obj2: K): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

