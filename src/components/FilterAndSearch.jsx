import { useState, useEffect, useMemo } from 'react'
import { Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../store/uiSlice'

const FilterAndSearch = () => {
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.auth)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  useEffect(() => {
    const isSearching = query.trim() !== ''
    const isFiltering = status !== 'all'

    if (isSearching || isFiltering) {
      dispatch(uiActions.setIsFilterOrSearch(true))
    }
    else {
      dispatch(uiActions.setIsFilterOrSearch(false))
    }
  }, [query, status, dispatch])

  const currentTasksList = useMemo(() => {
    const tasksList = [...tasks]

    return tasksList.filter((task) => {
      const matchesQuery = task.title
        .toLowerCase()
        .includes(query.toLowerCase().trim())

      if (status === 'all' || status === undefined) {
        return matchesQuery
      }
      else {
        let currentStatus = status === 'active' ? false : true
        const matchesStatus = task.completed === currentStatus
        return matchesQuery && matchesStatus
      }
    })
  }, [tasks, query, status])

  useEffect(() => {
    dispatch(uiActions.setCurrentTasksList(currentTasksList))
  }, [query, status, tasks, dispatch, currentTasksList])

  return (
    <>
      <Input.Search
        placeholder="Поиск..."
        allowClear
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: 200 }}
      />
      <Select
        placeholder="Статус"
        allowClear
        value={status}
        onChange={value => setStatus(value)}
        style={{ width: 160 }}
        options={[
          { value: 'all', label: 'Все' },
          { value: 'active', label: 'Активные' },
          { value: 'finished', label: 'Выполненные' },
        ]}
      />
    </>
  )
}

export default FilterAndSearch
