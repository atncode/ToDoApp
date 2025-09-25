import { List, Typography, Button, Space, Checkbox } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { uiActions } from '../store/uiSlice.js'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const TasksList = ({ tasks }) => {
  const dispatch = useDispatch()

  const onChange = (e, task) => {
    const editTask = async (id) => {
      try {
        await updateDoc(doc(db, 'tasks', id), { completed: e.target.checked })
      }
      catch (e) {
        console.error('Error updating document: ', e)
      }
    }
    editTask(task.id)

    dispatch(uiActions.setIsDataChanged(true))
  }

  return (
    <>
      <List
        style={{ background: '#ffffff' }}
        bordered
        dataSource={tasks}
        renderItem={task => (
          <List.Item>
            <Checkbox
              checked={task.completed}
              onChange={e => onChange(e, task)}
            >
            </Checkbox>
            <Typography.Text
              style={{ flex: 1, marginLeft: 8, width: 100 }}
              onClick={() => {
                dispatch(uiActions.setCurrentTask(task))
                dispatch(uiActions.setIsModalOpened(true))
                dispatch(uiActions.setTypeModal('openTask'))
              }}
            >
              {task.title}
            </Typography.Text>
            <Space wrap>
              <Button
                onClick={() => {
                  dispatch(uiActions.setCurrentTask(task))
                  dispatch(uiActions.setIsModalOpened(true))
                  dispatch(uiActions.setTypeModal('editTask'))
                }}
              >
                <EditOutlined />
              </Button>
              <Button
                onClick={() => {
                  dispatch(uiActions.setCurrentTask(task))
                  dispatch(uiActions.setIsModalOpened(true))
                  dispatch(uiActions.setTypeModal('removeTask'))
                }}
              >
                <DeleteOutlined />
              </Button>
            </Space>
          </List.Item>
        )}
      />
    </>
  )
}

export default TasksList
