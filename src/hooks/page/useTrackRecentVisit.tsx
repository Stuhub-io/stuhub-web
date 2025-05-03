// import { useAsyncEffect } from '@dwarvesf/react-hooks'
// import dayjs from 'dayjs'
// import { ComponentType, CreateRecentVisitedRequest } from 'types/schema/schema'

// interface TrackOptions {
//   // waiting time before tracking
//   timeBounce?: number
//   // waiting time for the next tracking
//   trackingTimeBetween?: number
//   callback?: () => void
// }

// interface Params extends Omit<CreateRecentVisitedRequest, 'componentType'> {
//   componentType: ComponentType
// }

// const defaultOptions: TrackOptions = {
//   timeBounce: 3000,
//   trackingTimeBetween: 5 * 60 * 1000, // 5 minutes
// }

// const cacheVisits: Record<string, string> = {}

// export function useTrackRecentVisit(
//   trackParams: Params | null,
//   options?: TrackOptions,
// ) {
//   const trackOptions = { ...defaultOptions, ...options }

//   useAsyncEffect(async () => {
//     if (trackParams === null) {
//       return
//     }

//     const { timeBounce, trackingTimeBetween } = trackOptions
//     const cachedKey = JSON.stringify(trackParams)

//     if (
//       cacheVisits[cachedKey] &&
//       dayjs().diff(dayjs(cacheVisits[cachedKey])) <
//         (trackingTimeBetween as number)
//     ) {
//       return
//     }

//     const timeout = setTimeout(async () => {
//       try {
//         await userService.createRecentVisit(trackParams)
//         cacheVisits[cachedKey] = new Date().toUTCString()
//         trackOptions.callback?.()
//       } catch (error) {
//         console.error(error)
//       }
//     }, timeBounce)

//     return () => clearTimeout(timeout)
//   }, [JSON.stringify(trackParams), JSON.stringify(trackOptions)])
// }

// export async function trackRecentVisit(trackParams: Params | null) {
//   if (trackParams === null) {
//     return
//   }
//   const cachedKey = JSON.stringify(trackParams)

//   if (
//     cacheVisits[cachedKey] &&
//     dayjs().diff(dayjs(cacheVisits[cachedKey])) <
//       // 5 minutes
//       5 * 60 * 1000
//   ) {
//     return
//   }

//   try {
//     await userService.createRecentVisit(trackParams)
//     cacheVisits[cachedKey] = new Date().toUTCString()
//   } catch (error) {
//     console.error(error)
//   }
// }
