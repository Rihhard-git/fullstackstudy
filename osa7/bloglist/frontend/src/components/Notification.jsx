import Alert from '@mui/material/Alert'

import { useSelector } from 'react-redux'
const Notification = () => {

    const notification = useSelector(state => state.notification)



    if (!notification) {
        return null
    }
    /*
    const style = {
        color: notification.isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 15,
        borderStyle: 'solid',
        borderRadius: 2,
        padding: 10,
        marginBottom: 10,
    } */

    return (

        <>
            { notification.isError
                ? <Alert severity="error">{notification.message}</Alert>
                : <Alert severity="success">{notification.message}</Alert>}
        </>


    )
    /* <div className="notification" style={style}>{notification.message}</div> */
}

export default Notification