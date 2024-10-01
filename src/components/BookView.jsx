import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/booksSlice";
import Header from "./Header";
import BookList from "./BookList";

const BookView = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  return (
    <div>
      <Header />
      <div>
        {status === "loading" && <p>Loading..</p>}
        {error && <p>{error}</p>}
        <h1>Book List</h1>
        <BookList />
      </div>
    </div>
  );
};

export default BookView;
