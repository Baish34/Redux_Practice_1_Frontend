import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookView from "./components/BookView";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BookView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
