import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)


type FormatTimeStr = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD' | 'HH:mm:ss'
export const formatTime = (time: string, format: FormatTimeStr) => {
    const dayjsTime = dayjs(time)
    if (!dayjsTime.isValid()) {
        return ''
    }
    return dayjs(time, format)
}

export const formatTimeToNow = (time: string) => {
    const dayjsTime = dayjs(time)
    if (!dayjsTime.isValid()) {
        return ''
    }
    return dayjs(time).fromNow()
}