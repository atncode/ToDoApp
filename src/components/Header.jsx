import { Typography, Button, Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/authSlice'
import { uiActions } from '../store/uiSlice'
import { useNavigate } from 'react-router'

const { Text } = Typography
const { Header } = Layout

const HeaderElement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { displayName } = useSelector(state => state.auth)

  const logout = () => {
    localStorage.removeItem('user')
    dispatch(authActions.setTasks([]))
    dispatch(uiActions.setCurrentTasksList([]))
    dispatch(uiActions.setIsDataChanged(null))
    navigate('/auth')
  }

  return (
    <Header
      style={{
        background: '#ffffff',
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <Text>ToDoApp</Text>
      <Text>{`Добро пожаловать, ${displayName}!`}</Text>
      <Button onClick={logout}>Выйти</Button>
    </Header>
  )
}

export default HeaderElement
