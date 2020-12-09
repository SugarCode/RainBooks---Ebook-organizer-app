import {AnyAction} from 'redux';
import {Open_Pdf, SET_PAGE_DATA} from "../types";

const initialOpen_Pdf: Open_Pdf = {} as Open_Pdf;

export const GeneralReducer = (state = initialOpen_Pdf, action: AnyAction) => {
    switch(action.type){
        case "SET_OPEN_PDF":
            return {
                Pdf_Opened: action.payload.Pdf_Opened,
                FilePath: action.payload.FilePath,
                FileName: action.payload.FileName
            }
        default:
            return state
    }
}

