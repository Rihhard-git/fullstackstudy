import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})
const { setNotification } = notificationSlice.actions

export const showNotification = (data, timeout) => {
    return async (dispatch) => {

        dispatch(setNotification(data))
        setTimeout(() => dispatch(setNotification(null)), timeout*1000)
    }
}

export default notificationSlice.reducer