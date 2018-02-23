import { combineReducers } from 'redux'
import test from './testReducers'
import active_user from './activeUserReducers'

export default combineReducers({
    test: test,
    active_user: active_user
})