import { useAuthContext } from '@/components/auth/AuthGuard'
import { SplashAppLogo } from '@/components/common/SplashAppLogo'
import Typography from '@/components/common/Typography'
import WorkRemotelyIcon from '@/components/icons/WorkRemoteIcon'
import { OrganizationPageParams, ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import { useRequestUserPageRole } from '@/mutation/mutator/page/permissions/useRequestUserPageRole'
import { Button, Textarea } from '@nextui-org/react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const PermissionRequired = () => {
  const { status } = useAuthContext()
  const router = useRouter()
  const pathName = usePathname()
  const { pageID } = useParams<OrganizationPageParams>()

  const [sent, setSent] = useState(false)
  const { mutateAsync: requestRole, isPending } = useRequestUserPageRole({ pageID })

  const { toast } = useToast()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`${ROUTES.SIGNIN_PAGE}?from=${pathName}`)
    }
  }, [pathName, router, status])

  if (status === 'unauthenticated') {
    return null
  }

  const handleRequestRole = async (e: any) => {
    e.preventDefault()
    if (sent) {
      return
    }
    try {
      await requestRole({
        pageID,
      })
      toast({
        variant: 'success',
        title: 'Request Sent',
        description: "Your request has been sent to the page owner's email",
      })
      setSent(true)
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Request Failed',
        description: 'There was an error sending your request',
      })
    }
  }

  return (
    <form
      className="mx-auto mt-16 flex max-w-[750px] flex-col gap-4 px-8 md:flex-row md:gap-16"
      onSubmit={handleRequestRole}
    >
      {sent ? (
        <div className="flex-1 space-y-2">
          <SplashAppLogo size="sm" noAnimate />
          <Typography level="h4" className="!mt-8">
            Permission request sent
          </Typography>
          <Typography level="p5" color="textTertiary">
            Your request has been sent to the asset owner&apos;s email.
            Try reload the page after the owner has granted you access.
          </Typography>
        </div>
      ) : (
        <div className="flex-1 space-y-2">
          <SplashAppLogo size="sm" noAnimate />
          <Typography level="h4" className="!mt-8">
            Permission Required
          </Typography>
          <Typography level="p5" color="textTertiary">
            You do not have permission to view this page
          </Typography>
          <Textarea className="!mt-4" minRows={6} placeholder="Please provide a reason for requesting access" />
          <Button color="primary" className="!mt-6" type="submit" isDisabled={isPending} isLoading={isPending}>
            Request Access
          </Button>
        </div>
      )}
      <WorkRemotelyIcon width={260} height={260} className="hidden md:block" />
    </form>
  )
}
