import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const { notification } = useContext(NotificationContext) 

  return (
    <div>
      {notification && 
      <div style={style}>
        <span>{notification}</span>
      </div>}
    </div>
    
     
    
  )
}

export default Notification
