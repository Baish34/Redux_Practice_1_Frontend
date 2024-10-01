import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BookList = () => {
  const books = useSelector((state) => state.books.books);

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/book-details/${book._id}`}>{book.bookName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
