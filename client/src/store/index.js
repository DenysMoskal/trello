import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./slices/listSlice";
import modalSlice from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    lists: listSlice,
    modal: modalSlice,
  },
});

export default store;
