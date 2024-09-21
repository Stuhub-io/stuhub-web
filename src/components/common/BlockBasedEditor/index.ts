export * from './BlockBasedEditor'
import { BlockBasedEditorSkeleton } from './BlockBasedEditorSkeleton'

import dynamic from 'next/dynamic'

export const BlockBasedEditor = dynamic(() => import('./BlockBasedEditor'), {
  loading: BlockBasedEditorSkeleton,
})

export default BlockBasedEditor
 