import { combineReducers } from 'redux'
import {reducer as firebase} from 'react-redux-firebase'
import channelReducer from './channelReducer'

const rootReducer = combineReducers({
    firebase,
    channels: channelReducer
})

export default rootReducer
