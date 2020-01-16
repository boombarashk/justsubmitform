export const ADD_ATTACHMENT = "add_attach"
export const DELETE_ATTACHMENT = "delete_attach"

export const INPUTS_CONFIG = [{
    label: "От кого",
    placeholder: "Имя",
    type: 'text',
    half: true
    }, {
    label: null,
    placeholder: "Email",
    type: 'email',
    half: true
    },
    {
        label: "Кому",
        placeholder: "Имя",
        type: 'text',
        half: true
    }, {
        label: null,
        placeholder: "Email",
        type: 'email',
        half: true
    }, {
        label: "Тема письма",
        type: 'text',
        half: false
    }]


export const SIZE_1MB = 1048576
export const SIZE_5MB = 5 * SIZE_1MB
export const SIZE_20MB = 4 * SIZE_5MB
export const LIMIT_COUNT_FILES = 5
export const ERROR_MSG_BIG_FILE = 'Недопустимо большой файл'
export const ERROR_MSG_MANY_FILES = 'Количество файлов превышает 5'
export const ERROR_MSG_BIG_SUM_FILES = 'Суммарный объем файлов больше 20Мб'