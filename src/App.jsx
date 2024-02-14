import './App.css';
import { useState } from 'react';
import BookSelector from './components/BookSelector'
import BookForm from './components/BookForm'
import BookListRow from './components/BookListRow'

const App = () => {

  const [format, setFormat] = useState(null)
  const [books, setBooks] = useState([]);
  const [audioBooks, setAudiobooks] = useState([]);


  const selectBook = () => {
    setFormat('print');
  }

  const selectAudioBook = () => {
    setFormat('audio');
  }

  const addBook = (book) => {
    if (book.format === "print") {
      setBooks(books.concat(book))
    }
    if (book.format === "audio") {
      setAudiobooks(audioBooks.concat(book))
    }
  }
  const pagesRead = books.reduce((acc, curr) => acc + curr.length, 0)
  const hoursListened = Math.floor(audioBooks.reduce((acc, curr) => acc + curr.length, 0) / 60)
  const minutesListened = audioBooks.reduce((acc, curr) => acc + curr.length, 0) % 60

  return (
    <div>
      <h1>BookLog</h1>
      <div className="booklog">
        <div className="bookform">
          <BookSelector selectBook={selectBook} selectAudioBook={selectAudioBook} />
          <BookForm format={format} createBook={addBook} />
        </div>
        <div className="booklists">
          {books.length > 0 && <><h2>Books</h2><ul>{books.map(book => <BookListRow key={book.title} book={book}
            showBook={() => console.log(book)} />)}</ul>
            <p>You have read {pagesRead} pages</p>
          </>}
          {audioBooks.length > 0 && <><h2>Audiobooks</h2>
            <ul>{audioBooks.map(book => <BookListRow key={book.title} book={book} showBook={() => console.log(book)} length={book.length} />)}</ul>
            <p>You have listened to audiobooks for {hoursListened} hours and {minutesListened} minutes</p>
          </>
          }
        </div>
      </div>
    </div>

  );
}

export default App;
