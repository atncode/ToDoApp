import { Button, Form, Input, Select, Space, DatePicker, ConfigProvider } from 'antd'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { uiActions } from '../store/uiSlice'
import useNotify from '../hooks/useNotify'
import ruLocale from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const TaskCardForm = () => {
  const { uid } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const showNotification = useNotify()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onClick = () => {
    dispatch(uiActions.setIsModalOpened(false))
  }

  const onFinish = async (values) => {
    setLoading(true)

    const task = {
      title: values.title,
      description: values.description,
      completed: false,
      priority: values.priority,
      createdAt: values.createdAt,
      updatedAt: values.createdAt,
      userId: uid,
    }

    try {
      await addDoc(collection(db, 'tasks'), task)
      showNotification('success', 'create')
      dispatch(uiActions.setIsDataChanged(true))
    }
    catch (e) {
      showNotification('error', 'create')
      console.error('Error adding document: ', e)
    }
    finally {
      setLoading(false)
    }
    dispatch(uiActions.setIsModalOpened(false))
  }

  const priority = {
    low: 'низкий',
    medium: 'средний',
    high: 'высокий',
  }

  return (
    <ConfigProvider locale={ruLocale}>
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item label="Название" name="title" rules={[{ required: true, message: 'Это обязательное поле' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Это обязательное поле' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Приоритет"
          name="priority"
          rules={[{ required: true, message: 'Это обязательное поле' }]}
        >
          <Select
            style={{ width: 120 }}
            options={[
              { value: 'low', label: `${priority.low}` },
              { value: 'medium', label: `${priority.medium}` },
              { value: 'high', label: `${priority.high}` },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Дата создания"
          name="createdAt"
          getValueFromEvent={value => (value ? value.valueOf() : null)}
          getValueProps={value => (value ? dayjs(value) : undefined)}
          rules={[{ required: true, message: 'Это обязательное поле' }]}
        >
          <DatePicker
            showTime
            format="DD.MM.YYYY HH:mm"
          />
        </Form.Item>

        <Form.Item>
          <Space wrap>
            <Button type="primary" htmlType="submit" loading={loading} style={{ align: 'center' }}>
              Создать
            </Button>
            <Button htmlType="submit" style={{ align: 'center' }} onClick={onClick}>
              Отмена
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}

export default TaskCardForm
