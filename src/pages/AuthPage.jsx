import { Card, Typography } from 'antd'
import AuthForm from '../components/AuthForm'

const { Title, Link } = Typography

export default function AuthPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        padding: '16px',
      }}
    >
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          Вход
        </Title>
        <AuthForm />
        <div className="text-center">
          <span>Нет аккаунта? </span>
          <Link href="/signup">Зарегистрироваться</Link>
        </div>
      </Card>
    </div>
  )
}
