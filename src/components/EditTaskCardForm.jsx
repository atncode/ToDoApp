import { Button, Form, Input, Select, Checkbox, Space, DatePicker, ConfigProvider } from 'antd'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../store/uiSlice'
import { useState } from 'react'
import useNotify from '../hooks/useNotify'
import ruLocale from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

const EditTaskCardForm = ({ task }) => {
  const { uid } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const showNotification = useNotify()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)

    const timestamp = Date.now()

    const taskObj = {
      title: values.title,
      description: values.description,
      completed: values.completed,
      priority: values.priority,
      createdAt: values.createdAt,
      updatedAt: timestamp,
      userId: uid,
    }

    try {
      await updateDoc(doc(db, 'tasks', task.id), taskObj)
      showNotification('success', 'edit')
      dispatch(uiActions.setIsDataChanged(true))
    }
    catch (e) {
      console.error('Error updating document: ', e)
      showNotification('error', 'edit')
    }
    finally {
      setLoading(false)
    }
    dispatch(uiActions.setIsModalOpened(false))
  }

  const onClick = () => {
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
        key={task.id}
        initialValues={task}
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
        >
          <DatePicker
            showTime
            defaultValue={dayjs(task.createdAt)}
            format="DD.MM.YYYY HH:mm"
            onChange={(value) => {
              if (!value) {
                form.setFieldValue('createdAt', task.createdAt)
              }
            }}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="completed"
          valuePropName="checked"
        >
          <Checkbox>Отметить задачу выполненной</Checkbox>
        </Form.Item>

        <Form.Item>
          <Space wrap>
            <Button type="primary" htmlType="submit" loading={loading} style={{ align: 'center' }}>
              Сохранить изменения
            </Button>
            <Button
              htmlType="submit"
              style={{ align: 'center' }}
              onClick={onClick}
            >
              Отмена
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}

export default EditTaskCardForm
