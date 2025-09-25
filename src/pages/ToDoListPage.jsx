import { query, collection, getDocs, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/authSlice'
import { useEffect, useState, useMemo } from 'react'
import TasksList from '../components/TasksList'
import ModalWindow from '../components/Modal'
import { PlusOutlined } from '@ant-design/icons'
import { uiActions } from '../store/uiSlice'
import { Button, Spin, Layout, Flex } from 'antd'
import FilterAndSearch from '../components/FilterAndSearch'
import HeaderElement from '../components/Header'

const { Content } = Layout

const TodoListPage = () => {
  const dispatch = useDispatch()
  const { uid, tasks } = useSelector(state => state.auth)
  const ui = useSelector(s => s.ui)
  const { modal, currentTasksList, isFilterOrSearch, isDataChanged } = ui
  const { isOpened } = modal
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true)
      try {
        const q = query(collection(db, 'tasks'), where('userId', '==', uid))
        const querySnapshot = await getDocs(q)
        const tasksData = []
        querySnapshot.forEach((doc) => {
          const task = doc.data()
          const id = doc.id
          tasksData.push({ id, ...task })
        })

        dispatch(authActions.setTasks(tasksData))
      }
      catch (e) {
        console.error(e)
      }
      finally {
        setLoading(false)
      }
    }

    if (uid && isDataChanged === null) getTasks()

    if (isDataChanged) {
      getTasks()
      dispatch(uiActions.setIsDataChanged(false))
    }
  }, [dispatch, isDataChanged, uid])

  const tasksToShow = useMemo(() => {
    if (isFilterOrSearch) {
      return currentTasksList
    }
    return tasks
  }, [currentTasksList, tasks, isFilterOrSearch])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderElement />
      <Content style={{ padding: '16px' }}>
        <Flex justify="center" align="center" style={{ paddingBottom: '16px' }} vertical>
          <div style={{ width: '85%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Button
              onClick={() => {
                dispatch(uiActions.setIsModalOpened(true))
                dispatch(uiActions.setTypeModal('createTask'))
              }}
            >
              <PlusOutlined />
            </Button>
            <FilterAndSearch />
          </div>
          <div style={{ width: '85%', maxWidth: '1200px' }}>
            <Spin spinning={loading} tip="Загрузка..." size="large">
              <TasksList tasks={tasksToShow} style={{ display: 'flex', flex: 1 }} />
            </Spin>
            {isOpened && <ModalWindow />}
          </div>
        </Flex>
      </Content>
    </Layout>
  )
}

export default TodoListPage
