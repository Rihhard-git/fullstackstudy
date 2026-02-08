import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        logUser(state, action) {
            return action.payload
        }
    }
})
export const { setUser } = userSlice.actions
const { logUser } = userSlice.actions

export const logIn = (credentials) => {
    return async(dispatch) => {
        await loginService
            .login(credentials)
            .then(user => {
                dispatch(logUser(user))
                blogService.setToken(user.token)
                window.localStorage.setItem(
                    'loggedAppUser', JSON.stringify(user)
                )
            })
            .catch(() => {
                dispatch(showNotification({ message: 'wrong username or password', isError: true }, 5))
            })
    }
}





export default userSlice.reducer