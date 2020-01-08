import { createStore } from 'redux'
import { reducerAttachment } from './reducer'

const store = createStore(reducerAttachment)

export default store