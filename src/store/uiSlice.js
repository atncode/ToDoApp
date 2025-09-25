import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: { isOpened: false, type: null },
  currentTask: null,
  isFilterOrSearch: false,
  currentTasksList: [],
  isDataChanged: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentTask: (state, { payload }) => {
      state.currentTask = payload
    },
    setCurrentTasksList: (state, { payload }) => {
      state.currentTasksList = [...payload]
    },
    setIsFilterOrSearch: (state, { payload }) => {
      state.isFilterOrSearch = payload
    },
    setModalInfo: (state, { payload }) => {
      state.modal = payload
    },
    setIsModalOpened: (state, { payload }) => {
      state.modal.isOpened = payload
    },
    setTypeModal: (state, { payload }) => {
      state.modal.type = payload
    },
    setIsDataChanged: (state, { payload }) => {
      state.isDataChanged = payload
    },
  },
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer
