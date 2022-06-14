import {SET_MESSAGE, CLEAR_MESSAGE} from "../actions/types";

export const setMessage = (message) => {
    return {
        type: SET_MESSAGE,
        payload: message
    }
}

export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE
    }
}