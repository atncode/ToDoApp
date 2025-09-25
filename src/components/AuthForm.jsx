import { Button, Checkbox, Form, Input } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { authActions } from '../store/authSlice'
import { useState } from 'react'
import useNotify from '../hooks/useNotify'

const AuthForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const showNotification = useNotify()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
      const user = userCredential.user

      const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }

      localStorage.setItem('user', JSON.stringify(userInfo))
      dispatch(authActions.setCredentials(userInfo))
      navigate('/')
    }
    catch (e) {
      console.error(e)
      showNotification('error', 'login')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Form
      name="auth"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Введите email' }]}
      >
        <Input placeholder="Введите email" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password placeholder="Введите пароль" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AuthForm
