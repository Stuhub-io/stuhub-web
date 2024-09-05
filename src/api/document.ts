import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { BaseResponse } from "@/schema/base";
import { CreateDocumentBody, CreateDocumentData } from "@/schema/document";

class DocumentService extends Client {
    public createDocument(body: CreateDocumentBody){
        return fetcher<BaseResponse<CreateDocumentData>>(`${this.baseUrl}/v1/document-services/create`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }
}

export const documentService = new DocumentService()