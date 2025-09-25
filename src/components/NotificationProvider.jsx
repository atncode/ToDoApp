import { notification } from 'antd'
import { NotificationContext } from '../contexts/NotificationContext'

const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification()

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
