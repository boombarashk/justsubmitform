import { ADD_ATTACHMENT, DELETE_ATTACHMENT } from './constants'

export function addAttach(fileCfg) {
    return {
        type: ADD_ATTACHMENT,
        payload: { ...fileCfg }
    }
}
export function deleteAttach(name) {
    return {
        type: DELETE_ATTACHMENT,
        payload: { name }
    }
}