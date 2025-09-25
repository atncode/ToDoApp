import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

const notifyTypes = {
  success: (action) => {
    const map = {
      edit: { message: 'Успешно!', description: 'Изменения внесены' },
      delete: { message: 'Успешно!', description: 'Задача удалена' },
      create: { message: 'Успешно!', description: 'Задача создана' },
    }
    return map[action]
  },
  error: (action) => {
    const map = {
      edit: { message: 'Возникла проблема', description: 'Изменения не внесены' },
      delete: { message: 'Возникла проблема', description: 'Задача не удалена' },
      create: { message: 'Возникла проблема', description: 'Задача не создана' },
      login: { message: 'Возникла проблема', description: 'Неверный email или пароль' },
      signup: { message: 'Возникла проблема', description: 'Email уже зарегистрирован' },
    }
    return map[action]
  },
}

const useNotify = () => {
  const api = useContext(NotificationContext)

  const showNotification = (type, action) => {
    const info = notifyTypes[type](action)
    api[type](info)
  }
  return showNotification
}

export default useNotify
