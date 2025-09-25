import { Card } from 'antd'

const TaskCard = ({ task }) => {
  const { title, description, completed, priority, createdAt } = task
  const formattedCreatedData = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'full', timeStyle: 'short' })
    .format(new Date(createdAt))

  const priorityTypes = {
    low: 'низкий',
    medium: 'средний',
    high: 'высокий',
  }

  return (
    <Card
      title={title}
      variant="borderless"
      style={{ width: '100%', boxShadow: 'none', border: 'none' }}
      headStyle={{ padding: 0 }}
      bodyStyle={{ padding: 0 }}
    >
      <p>{`Описание: ${description}`}</p>
      <p>{`Статус: ${completed ? 'выполнена' : 'активна'}`}</p>
      <p>{`Приоритет: ${priorityTypes[priority]}`}</p>
      <p>{`Дата создания: ${formattedCreatedData}`}</p>
    </Card>
  )
}

export default TaskCard
