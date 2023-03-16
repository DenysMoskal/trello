import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    listId: "",
  },
  reducers: {
    setOpenModal(state, action) {
      state.listId = action.payload;
      state.isModalOpen = true;
    },
    setCloseModal(state) {
      state.listId = "";
      state.isModalOpen = false;
    },
  },
});

export const selectModalInfo = ({ modal }) => modal;

export const { setOpenModal, setCloseModal } = modalSlice.actions;
export default modalSlice.reducer;
