import { documentService } from '@/api/document'
import { MUTATION_KEYS } from '@/mutation/keys'
import { useMutation } from '@tanstack/react-query'

export const useUpdateDocumentContent = () => {
  return useMutation({
    mutationKey: MUTATION_KEYS.UPDATE_DOC_CONTENT,
    mutationFn: documentService.updateDocumentContent.bind(documentService),
  })
}
