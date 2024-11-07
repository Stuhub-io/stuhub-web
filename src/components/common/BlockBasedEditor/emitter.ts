import mitt from "mitt";

export const editorEmittor = mitt<EditorEvent>();

export type EditorEvent = {
    pageAdd: {
        pageID: string
    }
}