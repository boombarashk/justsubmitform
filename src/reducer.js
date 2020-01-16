import { ADD_ATTACHMENT, DELETE_ATTACHMENT } from "./constants";

const defaultState = {
    attachedFiles: [],
}

export const reducerAttachment = (state = defaultState, action) => {
    const { attachedFiles } = state
    const { type, payload } = action
    switch (type) {
        case ADD_ATTACHMENT:
            return {
                attachedFiles: attachedFiles.concat(payload)
            }
        case DELETE_ATTACHMENT:
            return {
                attachedFiles: attachedFiles.filter(fileCfg => fileCfg.name !== payload.name)
            }

        default:
            return { ...state }
    }
}