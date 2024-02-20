import './App.css';
import { useState, useEffect } from 'react';
import StartPage from './components/StartPage'
import BookSelector from './components/BookSelector'
import BookList from './components/BookList'
import Book from './components/Book'
import Home from './components/Home'
import { Routes, Route, useMatch, Link, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import booksService from './services/booksService'


const App = () => {

  const [books, setBooks] = useState([])

  useEffect(() => {
    booksService.initialize()
      .then(books => setBooks(books))

  }, [])


  const navigate = useNavigate()

  const addBook = (book) => {
    console.log(book)
    booksService.create(book)
      .then(newBook => setBooks(books.concat(newBook)))
    console.log(books)
    navigate('/books')
  }

  const match = useMatch('/books/:id')

  const book = match
    ? books.find(book => book.id === match.params.id)
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
          <Route path="/books/:id" element={<Book book={book} />} />
          <Route path="/new_book" element={<BookSelector createBook={addBook} />} />
        </Routes>
      </div >
    </div>


  );
}


export default App;
