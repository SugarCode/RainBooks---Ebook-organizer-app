import { Type } from "typescript";

export const SET_OPEN_PDF = "SET_OPEN_PDF";

export const SET_PAGE_DATA = "SET_PAGE_DATA";

export const SETTINGS = "SETTINGS";

export interface Open_Pdf {
    Pdf_Opened: boolean,
    FilePath: any,
    FileName: string
}

export interface SettingsI {
    TextOnly: boolean
}


// Action interface
interface Open_Pdf_Action {
    type: typeof SET_OPEN_PDF,
    payload: Open_Pdf
}

interface SettingsAction {
    type: typeof SETTINGS,
    payload: SettingsI
}


export type GeneralActions = Open_Pdf_Action | SettingsAction;