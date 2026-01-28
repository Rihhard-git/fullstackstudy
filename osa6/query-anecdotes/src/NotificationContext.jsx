import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ANECDOTE':
            return `'${action.payload}' was added succesfully`
        case 'VOTE_ANECDOTE':
            return `voted anecdote '${action.payload}'`
        case 'ERROR':
            return 'too short anecdote, must have length of 5 or more'
        case 'HIDE':
            return null
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext