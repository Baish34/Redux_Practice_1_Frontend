import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookView from "./components/BookView";
import Form from "./components/Form";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BookView />} />
          <Route path="/add-book" element={<Form />} />
          <Route path="/edit-book/:bookId" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
