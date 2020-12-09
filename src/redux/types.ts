export const SET_OPEN_PDF = "SET_OPEN_PDF";

export const SET_PAGE_DATA = "SET_PAGE_DATA";

export interface Open_Pdf {
    Pdf_Opened: boolean,
    FilePath: any,
    FileName: string
}


// Action interface
interface Open_Pdf_Action {
    type: typeof SET_OPEN_PDF,
    payload: Open_Pdf
}


export type GeneralActions = Open_Pdf_Action;