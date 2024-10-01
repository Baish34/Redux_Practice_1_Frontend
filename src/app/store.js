import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/bookSlice";

export default configureStore({
  reducer: {
    books: booksReducer,
  },
});
