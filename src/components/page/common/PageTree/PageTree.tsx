import { Button, Tooltip } from '@nextui-org/react'
import { PageIconPreview } from '../../PageListView/PageIconPreview'
import { PageViewType } from '@/schema/page'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'

interface PageMeta {
  pkid: number
  name: string
  id: string
  view_type: PageViewType
  asset?: any
}

interface PageTreeProps<T extends PageMeta> {
  page: T
  childrenPages?: PageTreeProps<T>[]
  level?: number
  isLast?: boolean
  gap?: number
}

type RootPageTreeProps<T extends PageMeta> = Omit<PageTreeProps<T>, 'level' | 'isLast' | 'page'> & { page?: T }

export const PageTree = <T extends PageMeta>(props: RootPageTreeProps<T>) => {
  if (!props.page) {
    return (
      <>
        {props.childrenPages?.map((child) => (
          <PageTreeItem key={child.page?.pkid} {...child} level={0} isLast={true} gap={props.gap} />
        ))}
      </>
    )
  }
  const page = props.page
  return <PageTreeItem {...props} page={page} level={0} />
}

const PageTreeItem = <T extends PageMeta>(props: PageTreeProps<T>) => {
  const { page, childrenPages, level = 0, isLast, gap = 0 } = props

  const hasChild = childrenPages && childrenPages.length > 0
  const router = useRouter()
  const { organization } = useOrganization()

  const handleClick = () => {
    router.push(
      ROUTES.VAULT_PAGE({
        orgSlug: organization?.slug || '',
        pageID: page.id,
      }),
    )
  }

  return (
    <>
      <div style={{ paddingLeft: `${level * 16}px` }} className="flex items-center">
        {level !== 0 && (
          <>
            {!isLast ? (
              <div
                style={{ height: gap + 32, marginTop: -gap / 2, marginBottom: -gap / 2 }}
                className="w-px bg-divider"
              />
            ) : (
              <div
                style={{ height: gap / 2 + 16, transform: `translateY(-${gap / 2 + 6.5}px)` }}
                className="w-px bg-divider"
              />
            )}
            <div className="flex h-[32px] w-[12px] items-center">
              <div className="h-px flex-1 bg-divider" />
            </div>
          </>
        )}
        <Tooltip content={page.name || 'Untitled'} delay={1000}>
          <div>
            <Button
              onClick={handleClick}
              size="sm"
              variant="faded"
              startContent={<PageIconPreview page={page} className="m-[-8px] bg-transparent" size={32} noPreviewImg />}
              className="max-w-[140px] justify-start overflow-hidden px-2"
            >
              <span className="inline truncate">{page?.name || 'Untitled'}</span>
            </Button>
          </div>
        </Tooltip>
      </div>
      {hasChild &&
        childrenPages.map((child, index) => (
          <PageTreeItem
            key={child.page.pkid}
            {...child}
            level={level + 1}
            isLast={index === childrenPages.length - 1}
            gap={gap}
          />
        ))}
    </>
  )
}
