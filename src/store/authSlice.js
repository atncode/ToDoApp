import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uid: JSON.parse(localStorage.getItem('user'))?.uid ?? null,
  email: JSON.parse(localStorage.getItem('user'))?.email ?? null,
  displayName: JSON.parse(localStorage.getItem('user'))?.displayName ?? null,
  tasks: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { uid, email, displayName } }) => {
      state.uid = uid
      state.email = email
      state.displayName = displayName
    },
    setTasks: (state, { payload }) => {
      state.tasks = [...payload]
    },
    addTask: (state, { payload }) => {
      state.tasks = [...state.tasks, payload]
    },
    removeTask: (state, { payload: task }) => {
      state.channels = state.tasks.filter(({ id }) => id !== task.id)
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
