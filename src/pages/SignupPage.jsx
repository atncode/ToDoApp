import { Card, Typography } from 'antd'
import SignupForm from '../components/SignupForm'

const { Title, Link } = Typography

export default function SignupPage() {
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
          Регистрация
        </Title>
        <SignupForm />
        <div className="text-center">
          <span>Есть аккаунт? </span>
          <Link href="/auth">Войти</Link>
        </div>
      </Card>
    </div>
  )
}
