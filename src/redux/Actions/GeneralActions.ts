import {ThunkAction} from 'redux-thunk';
import {RootState} from '../CreateStore';
import {GeneralActions, Open_Pdf} from "../types";

import {SET_OPEN_PDF} from "../types";

export const SetOpenPdf = (data: Open_Pdf): ThunkAction <void, RootState, null, GeneralActions>=>{
    return dispatch => {
        dispatch({
            type: SET_OPEN_PDF,
            payload: data
        })
    }
}