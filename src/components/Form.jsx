import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addBook, fetchBookById, updateBook } from "../features/booksSlice";
import Header from "./Header";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { books, status } = useSelector((state) => state.books);

  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    genre: "",
  });

  const bookData = books.find((book) => book._id === bookId);

  useEffect(() => {
    if (bookId && !bookData) {
      dispatch(fetchBookById(bookId));
    } else if (bookData) {
      setFormData({
        bookName: bookData.bookName,
        author: bookData.author,
        genre: bookData.genre,
      });
    }
  }, [dispatch, bookId, bookData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookId) {
      dispatch(updateBook({ id: bookId, ...formData }));
    } else {
      dispatch(addBook(formData));
    }
    navigate("/");
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="container pt-3">
        <h1>{bookId ? "Edit Book" : "Add Book"}</h1>
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre"
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            {bookId ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
