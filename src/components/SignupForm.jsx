import { Button, Form, Input } from 'antd'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { authActions } from '../store/authSlice'
import { useState } from 'react'
import useNotify from '../hooks/useNotify'

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const showNotification = useNotify()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)
      const user = userCredential.user
      await updateProfile(user, { displayName: values.nickname })

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
      showNotification('error', 'signup')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Form
      name="signup"
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
        label="Никнейм"
        name="nickname"
        rules={[{ required: true, message: 'Введите никнейм' }]}
      >
        <Input placeholder="Введите никнейм" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль' },
          () => ({
            validator(_, value) {
              const minLength = 6
              if (value.length < minLength) {
                return Promise.reject(new Error('Пароль должен содержать не менее 6 символов'))
              }
              return Promise.resolve()
            },
          }),
        ]}
      >
        <Input.Password placeholder="Введите пароль" />
      </Form.Item>

      <Form.Item
        label="Подтвердите пароль"
        name="confirm"
        rules={[{ required: true, message: 'Подтвердите пароль' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Пароли не совпадают'))
            },
          }),
        ]}
      >
        <Input.Password placeholder="Подтвердите пароль" />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignupForm
