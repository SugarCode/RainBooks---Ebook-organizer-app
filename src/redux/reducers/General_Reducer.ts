import {AnyAction} from 'redux';
import {Open_Pdf, SETTINGS, SettingsI} from "../types";

const initialOpen_Pdf: Open_Pdf = {} as Open_Pdf;
const initialSettings: SettingsI = {} as SettingsI;

export const GeneralReducer = (state = initialOpen_Pdf, action: AnyAction) => {
    switch(action.type){
        case "SET_OPEN_PDF":
            return {
                Pdf_Opened: action.payload.Pdf_Opened,
                FilePath: action.payload.FilePath,
                FileName: action.payload.FileName,
                FileUrl: action.payload.FileUrl
            }
        default:
            return state
    }
}

export const SettingsReducer = (state = initialSettings, action: AnyAction) => {
    console.log(action.payload)
    switch(action.type){
        // get settings as form inputs
        case SETTINGS:
            return {
                TextOnly: action.payload.TextOnly
            }
        default:
            return state
    }
}

