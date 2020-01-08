import { ADD_ATTACHMENT } from "./constants";

const defaultState = {
    attachedFiles: [],
}

export const reducerAttachment = (state = defaultState, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_ATTACHMENT:
            const { attachedFiles } = state

            return {
                attachedFiles: attachedFiles.concat(payload)
            }
        default:
            return { ...state }
    }
}