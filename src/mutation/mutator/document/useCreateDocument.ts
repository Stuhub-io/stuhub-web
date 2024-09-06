import { documentService } from '@/api/document'
import { FirstFuncParamType } from '@/libs/utils'
import { MUTATION_KEYS } from '@/mutation/keys'
import { useMutation } from '@tanstack/react-query'

export const useCreateDocument = (keys: FirstFuncParamType<typeof MUTATION_KEYS.CREATE_DOC>) => {
  return useMutation({
    mutationKey: MUTATION_KEYS.CREATE_DOC(keys),
    mutationFn: documentService.createDocument.bind(documentService),
  })
}
