import './App.css';
import { useState } from 'react';
import StartPage from './components/StartPage'
import BookSelector from './components/BookSelector'
import BookList from './components/BookList'
import Book from './components/Book'
import Home from './components/Home'
import { Routes, Route, useMatch, Link, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const App = () => {
  const initialBook = { title: "title", author: "author", format: "print" }
  const initialBook2 = { title: "title2", author: "author", format: "print", length: 195 }
  const initialBook3 = { title: "title3", author: "author", format: "audio", length: 210, reader: "reader" }
  const initialBook4 = { title: "title4", author: "author", format: "audio", reader: "reader" }
  const [books, setBooks] = useState([initialBook, initialBook2, initialBook3, initialBook4]);

  const navigate = useNavigate()

  const addBook = (book) => {

    setBooks(books.concat(book))
    navigate('/books')
  }

  const match = useMatch('/books/:title')
  const book = match
    ? books.find(book => book.title === match.params.title)
    : null

  return (
    <div>
      <div>
        <Navbar collapseOnSelect expand="sm">
          <Navbar.Brand href="/">
            BookLog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to="/Home">Home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/books">Books</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/new_book">New book</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/books" element={<BookList books={books} />} />
          <Route path="/home" element={<Home books={books} />} />
          <Route path="/books/:title" element={<Book book={book} />} />
          <Route path="/new_book" element={<BookSelector createBook={addBook} />} />
        </Routes>
      </div >
    </div>


  );
}

export default App;
