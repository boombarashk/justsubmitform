import { LIMIT_COUNT_FILES, SIZE_5MB, SIZE_20MB,
    ERROR_MSG_BIG_FILE, ERROR_MSG_MANY_FILES, ERROR_MSG_BIG_SUM_FILES } from './constants'

export const uniqueId = () => {
    const currentTime = (new Date()).getTime()
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    return shuffle( `${currentTime}`.split('') ).join('')
}

export const checkCountAndSizeFiles = (attachedFiles, files) => {
    const countAttachedFiles = attachedFiles.length
    const countFiles = files.length
    if (countFiles > LIMIT_COUNT_FILES || (countAttachedFiles + countFiles) > LIMIT_COUNT_FILES) {
        return ERROR_MSG_MANY_FILES
    }

    let sum = attachedFiles.reduce((prev, next) => prev + next, 0)
    for (let i=0; i < files.length; i++) {
        sum += files[i].size
        if ( sum > SIZE_20MB ) {
            return ERROR_MSG_BIG_SUM_FILES
        }

        if (files[i].size > SIZE_5MB) {
            return ERROR_MSG_BIG_FILE
        }
    }
    return true
}