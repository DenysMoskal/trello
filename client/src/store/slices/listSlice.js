import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api";

export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  try {
    const response = await axios.get("/lists");

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const createList = createAsyncThunk(
  "lists/createList",
  async (listData) => {
    const response = await axios.post("/lists", listData);
    return response.data;
  }
);

export const addCard = createAsyncThunk(
  "cards/addCard",
  async ({ listId, listData }) => {
    const response = await axios.post(`/lists/${listId}/cards`, listData);
    return { cardData: response.data, listId };
  }
);

export const deleteCard = createAsyncThunk(
  "card/deleteCard",
  async ({ cardId, listId }) => {
    const response = await axios.delete(`/cards/${cardId}`);
    return { status: response.data, cardId, listId };
  }
);

export const deleteList = createAsyncThunk(
  "list/deleteList",
  async (listId) => {
    const response = await axios.delete(`/lists/${listId}`);
    return { status: response.data, listId };
  }
);

const listsSlice = createSlice({
  name: "lists",
  initialState: { lists: [], isLoading: false },
  reducers: {
    changeCardsOrder: (state, { payload }) => {
      const { listIndex, items } = payload;

      state.lists[listIndex].cards = items;
    },
    changeCardsListOrder: (state, { payload }) => {
      const { sListIndex, dListIndex, items } = payload;
      state.lists[sListIndex].cards = items[sListIndex];
      state.lists[dListIndex].cards = items[dListIndex];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.lists = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchLists.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(createList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lists.push(action.payload);
    });
    builder.addCase(createList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(addCard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCard.fulfilled, (state, action) => {
      state.isLoading = false;
      const { cardData, listId } = action.payload;
      const list = state.lists.find((l) => l._id === listId);
      list.cards.push(cardData);
    });
    builder.addCase(addCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteCard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.isLoading = false;
      const { listId, cardId } = action.payload;
      const list = state.lists.find((l) => l._id === listId);
      list.cards = list.cards.filter((card) => card._id !== cardId);
    });
    builder.addCase(deleteCard.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(deleteList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.isLoading = false;
      const { listId } = action.payload;
      state.lists = [...state.lists.filter((item) => item._id !== listId)];
    });
    builder.addCase(deleteList.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const selectLists = ({ lists }) => lists.lists;

export const { changeCardsOrder, changeCardsListOrder } = listsSlice.actions;
export default listsSlice.reducer;
