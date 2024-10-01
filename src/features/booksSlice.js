import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(
    "redux-practice-1-oyr8wds63-baishnawi-agrawals-projects-bdb05057.vercel.app/books"
  );
  return response.data;
});

export const addBook = createAsyncThunk("books/addBooks", async (book) => {
  const response = await axios.post(
    "edux-practice-1-oyr8wds63-baishnawi-agrawals-projects-bdb05057.vercel.app/books",
    book
  );
  return response.data;
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      });
  },
});

export default booksSlice.reducer;
