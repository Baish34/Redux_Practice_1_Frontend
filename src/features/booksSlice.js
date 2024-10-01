import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(
    "https://redux-practice-1-oyr8wds63-baishnawi-agrawals-projects-bdb05057.vercel.app/books"
  );
  return response.data;
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    const response = await axios.get(
      `https://redux-practice-1-oyr8wds63-baishnawi-agrawals-projects-bdb05057.vercel.app/books/${id}`
    );
    return response.data;
  }
);

export const addBook = createAsyncThunk("books/addBooks", async (book) => {
  const response = await axios.post(
    "https://redux-practice-1-oyr8wds63-baishnawi-agrawals-projects-bdb05057.vercel.app/books",
    book
  );
  return response.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, ...book }) => {
    const response = await axios.put(
      `https://redux-practice-1-oyr8wds63-baishnawi-agrawals-projects-bdb05057.vercel.app/books/${id}`,
      book
    );
    return response.data;
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(
    `https://redux-practice-1-oyr8wds63-baishnawi-agrawals-projects-bdb05057.vercel.app/books/${id}`
  );
  return id;
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
      .addCase(fetchBookById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const book = action.payload;
        const existingbook = state.books.find((b) => b._id === book._id);
        if (!existingbook) {
          state.books.push(book);
        }
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const existingBook = state.books.find(
          (book) => book._id === updatedBook._id
        );
        if (existingBook) {
          Object.assign(existingBook, updatedBook);
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
