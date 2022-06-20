import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchContextProvider from './context/SearchContext';
import Home from './routes/Home/HomePage/HomePage';
import BooksPage from './routes/Book/BooksPage/BooksPage';
function App() {
  return (
    <SearchContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/books" element={<BooksPage />} />
        </Routes>
      </Router>
    </SearchContextProvider>
  );
}

export default App;
