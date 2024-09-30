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
