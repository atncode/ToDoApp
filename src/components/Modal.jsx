import TaskCard from '../components/TaskCard'
import TaskCardForm from '../components/TaskCardForm'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../store/uiSlice.js'
import { Modal } from 'antd'
import EditTaskCardForm from './EditTaskCardForm.jsx'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import useNotify from '../hooks/useNotify.js'
import { useState } from 'react'

const ModalWindow = () => {
  const [loading, setLoading] = useState(false)
  const ui = useSelector(s => s.ui)
  const { modal, currentTask } = ui
  const { isOpened, type } = modal
  const showNotification = useNotify()

  const dispatch = useDispatch()

  const handleOk = () => {
    dispatch(uiActions.setIsModalOpened(false))
  }

  const handleCancel = () => {
    dispatch(uiActions.setIsModalOpened(false))
  }

  if (type === 'openTask') {
    return (
      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpened}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <TaskCard task={currentTask} />
      </Modal>
    )
  }

  if (type === 'editTask') {
    return (
      <Modal
        title="Редактировать задачу"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpened}
        onCancel={handleCancel}
        footer={null}
      >
        <EditTaskCardForm task={currentTask} />
      </Modal>
    )
  }

  if (type === 'removeTask') {
    return (
      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpened}
        okButtonProps={{ loading: loading }}
        onOk={async () => {
          setLoading(true)
          try {
            await deleteDoc(doc(db, 'tasks', currentTask.id))
            showNotification('success', 'delete')
          }
          catch (e) {
            showNotification('error', 'delete')
            console.error('Error removing document: ', e)
          }
          finally {
            setLoading(false)
          }
          dispatch(uiActions.setIsModalOpened(false))
          dispatch(uiActions.setIsDataChanged(true))
        }}
        onCancel={handleCancel}
        okText="Да"
        cancelText="Нет"
      >
        <p>Уверены, что хотите удалить задачу?</p>
      </Modal>
    )
  }

  if (type === 'createTask') {
    return (
      <Modal
        title="Создать новую задачу"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isOpened}
        onCancel={handleCancel}
        footer={null}
      >
        <TaskCardForm />
      </Modal>
    )
  }
}

export default ModalWindow
