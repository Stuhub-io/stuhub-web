import { JSONContent } from 'novel'

export type TOCHeading = {
  value: string
  id: string
  level: number
}

export const extractHeading = (content: JSONContent) => {
  const headings: TOCHeading[] = content.content
    ?.filter((block) => block.type === 'heading' && block.attrs?.level)
    .map((heading) => {
      const value = heading.content?.map((c) => (c.type === 'text' ? c.text : '')).join('') || ''
      return {
        value,
        id: heading.attrs?.id as string,
        level: heading.attrs?.level as number,
      }
    }) || []
  return headings
}
