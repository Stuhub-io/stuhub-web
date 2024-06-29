'use client'

import Typography from '@/components/common/Typography'
import { useTheme } from '@/hooks/useTheme'
import { Chip } from '@nextui-org/react'
import { Image } from '@nextui-org/react'

export default function ChangLogPage() {
  const { activeTheme } = useTheme()
  return (
    <div className="mt-20 px-4">
      <Typography level="h3" className="">
        Changelog
      </Typography>
      <Typography level="p3" color="textTertiary">
        The lastest updates of stuhub.
      </Typography>

      <div className="mt-10 flex gap-8">
        <div className="sticky top-[80px] h-fit min-w-60 space-y-2">
          <Chip variant="flat" className="p-2 text-lg" color="success">
            v0.0.1
          </Chip>
          <Typography color="textTertiary">March 8, 2024</Typography>
        </div>
        <div className="mx-auto max-w-[800px] flex-1">
          <Typography className="mb-4" level="h4">
            Initial Release
          </Typography>
          <div>
            <Typography level="h5" fontWeight="md" className="mb-3">
              ✨ What’s News
            </Typography>
            <Typography level="p4" fontWeight="sm">
              Welcome to StuHub, your ultimate project management solution tailored specifically for
              students, small teams, and solo developers. Designed to simplify and streamline your
              workflow, StuHub empowers you to manage your projects with ease, even if youre new to
              project management.
            </Typography>
            <div className="relative my-4 h-[400px]">
              {activeTheme === 'dark' ? (
                <Image loading="lazy" src="/intro.png" alt="Intro" />
              ) : (
                <Image loading="lazy" src="/dark-intro.png" alt="Intro" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
