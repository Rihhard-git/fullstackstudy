import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        hideNotification(){
            return null
        }
    }
})
const { hideNotification, showNotification } = notificationSlice.actions

export const setNotification = (data, timeout) => {
    return async (dispatch) => {
        console.log(data)
        dispatch(showNotification(data))
        setTimeout(() => dispatch(hideNotification()), timeout*1000)
    }
}
/* export const { showVote, showCreate, clearNotification } = notificationSlice.actions */
export default notificationSlice.reducer