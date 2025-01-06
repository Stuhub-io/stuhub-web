import AeIcon from '@/components/icons/AeIcon'
import PsIcon from '@/components/icons/PsIcon'
import { VscodeAudioIcon } from '@/components/icons/VsCodeAudioIcon'
import { VscodeImageIcon } from '@/components/icons/VsCodeImageIcon'
import { VscodePdfIcon } from '@/components/icons/VsCodePdfIcon'
import { VscodeVideoIcon } from '@/components/icons/VsCodeVideoIcon'
import { RiFileFill } from 'react-icons/ri'

export const excludeExtension = (filename: string) => {
  return filename.replace(/\.[^/.]+$/, '')
}

export function isVideoExtension(extension = ''): boolean {
  return ['mov', 'mp4', 'avi'].includes(extension.toLowerCase())
}

export function isAudioExtension(extension = ''): boolean {
  return ['mp3', 'wav', 'ogg', 'm4a', 'aac'].includes(extension.toLowerCase())
}

const imageFileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'tiff', 'webp', 'heic']

export const isImageExtensionSupported = (extension: string) => {
  return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'tiff', 'webp'].includes(extension)
}

export function isImageExtension(extension = ''): boolean {
  // Convert the fileType to lowercase for case-insensitive comparison
  const lowercaseExtension = extension.toLowerCase()

  // Check if the lowercaseFileType is in the list of imageFileExtensions
  return imageFileExtensions.includes(lowercaseExtension)
}

export const getIconByExtension = (extension: string) => {
  const psExtensions = ['psd', 'psb']
  if (psExtensions.includes(extension)) {
    return PsIcon
  }
  const aeExtensions = ['aep', 'aet']
  if (aeExtensions.includes(extension)) {
    return AeIcon
  }

  if (isImageExtension(extension)) {
    return VscodeImageIcon
  }
  if (isVideoExtension(extension)) {
    return VscodeVideoIcon
  }
  if (isAudioExtension(extension)) {
    return VscodeAudioIcon
  }
  if (extension === 'pdf') {
    return VscodePdfIcon
  }
  return RiFileFill
}

export const formatReadableFileSize = (size: number) => {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  return `${+(size / Math.pow(1024, i)).toFixed(2) * 1  } ${  ['B', 'kB', 'MB', 'GB', 'TB'][i]}`
}

export const formatReadableExtension = (extension: string) => {
  return extension.toUpperCase()
}

export function getFileExtension(fileName?: string): string {
  if (!fileName) {
    return ''
  }
  const dotIndex = fileName.lastIndexOf('.')
  if (dotIndex !== -1) {
    return fileName.slice(dotIndex + 1).toLowerCase()
  }
  return ''
}