import { ADD_ATTACHMENT } from './constants'

export function addAttach(fileCfg) {
    return {
        type: ADD_ATTACHMENT,
        payload: { ...fileCfg }
    }
}