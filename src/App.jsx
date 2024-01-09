import { useState } from 'react'
import './App.css'

const BookSelector = ({ selectBook, selectAudioBook }) => {
  return (
    <div>
      <button className="selector-button" onClick={selectBook}>Add book</button>
      <button className="selector-button" onClick={selectAudioBook}>Add audiobook</button>
    </div>
  );
}

const BookForm = (props) => {
  return (
    <div className="form">
      <form onSubmit={props.addBook}>
        <label htmlFor="author">Author</label>
        <input onChange={props.handleAuthorChange} type="text" id="author" value={props.author} />
        <label htmlFor="title">Title</label>
        <input onChange={props.handleTitleChange} type="text" id="title" value={props.title} />
        <label htmlFor="pages">Number of pages</label>
        <input type="number" id="pages" onChange={props.handlePagesChange} value={props.pages} />
        <button className="submit-button" type="submit">Add book</button>
      </form>
    </div>
  );
}

const AudioBookForm = (props) => {
  return (
    <div className="bookform">
      <form onSubmit={props.addBook}>
        <label htmlFor="author">Author</label>
        <input onChange={props.handleAuthorChange} type="text" id="author" value={props.author} />
        <label htmlFor="title">Title</label>
        <input onChange={props.handleTitleChange} type="text" id="title" value={props.title} />
        <label htmlFor="reader">Reader</label>
        <input type="text" id="reader" onChange={props.handleReaderChange} value={props.reader}/>
        <label>Duration</label>
        <input type="number" id="hours" onChange={props.handleHoursChange} value={props.hours} placeholder='Hours'/>
        <input type="number" id="minutes" onChange={props.handleMinutesChange} value={props.minutes} placeholder='Minutes'/>
        <button className="submit-button" type="submit">Add book</button>
      </form>
    </div>
  );
}

const BookList = (props) => {
  
  return (
    <div>
      <h2>{props.heading}</h2>
      <ul>
        {props.books.map(book => <li key={book.title}>
         {book.author}: {book.title}
        </li>
        )}
      </ul>
      <p>{props.value}</p>
    </div>
  );
}


const App = () => {
  
  const [book, setBook] = useState(false);
  const [audioBook, setAudioBook] = useState(false);
  const [books, setBooks] = useState([]);
  const [audioBooks, setAudioBooks] = useState([]);
  const [author, setauthor] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [pages, setPages] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [reader, setReader] = useState('');


  const selectBook = () => {
    setAudioBook(false);
    setBook(true);
  } 

  const selectAudioBook = () => {
    setBook(false);
    setAudioBook(true);
  }
    
  const handleAuthorChange = (event) => {
    setauthor(event.target.value);
  }

  const handleTitleChange = (event) => {
    setBookTitle(event.target.value);
  }

  const handlePagesChange = (event) => {
    setPages(event.target.value);
  }


  const handleHoursChange = (event) => {
    setHours(event.target.value);
  }

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  }

  const handleReaderChange = (event) => {
    setReader(event.target.value);
  }

  
  
  const addBook = (event) => {
    event.preventDefault();
    const newBook = {author: author, title: bookTitle, length: Number(pages)};
    book ? setBooks(books.concat(newBook)):setAudioBooks(audioBooks.concat(newBook));
    setauthor('');
    setBookTitle('');
    setPages('');
  }

  const addAudioBook = (event) => {
    event.preventDefault();
    const newBook = {author: author, title: bookTitle, length: Number(hours)*60 + Number(minutes), reader: reader};
    book ? setBooks(books.concat(newBook)):setAudioBooks(audioBooks.concat(newBook));
    setauthor('');
    setBookTitle('');
    setHours('');
    setMinutes('');
    
  }

  const pagesRead = books.reduce((acc, curr) => acc + curr.length, 0)
  const hoursListened = Math.floor(audioBooks.reduce((acc, curr) => acc + curr.length, 0) / 60)
  const minutesListened = audioBooks.reduce((acc, curr) => acc + curr.length, 0) % 60

  return (
    <div>
      <h1>BookLog</h1>
      <div className="booklog">
        <div className="bookform">
          <BookSelector selectBook={selectBook} selectAudioBook={selectAudioBook}/>
          {book && <BookForm author={author} title={bookTitle} pages={pages} addBook={addBook} handleAuthorChange={handleAuthorChange} 
          handleTitleChange={handleTitleChange} handlePagesChange={handlePagesChange} />}
          {audioBook && <AudioBookForm author={author} title={bookTitle} addBook={addAudioBook} hours={hours} minutes={minutes}
          handleAuthorChange={handleAuthorChange} handleTitleChange={handleTitleChange} 
          handleHoursChange={handleHoursChange} handleMinutesChange={handleMinutesChange} handleReaderChange={handleReaderChange} />}
        </div>
      <div className="booklists">
        {books.length > 0 && <BookList heading="Books" books={books} value={`You have read ${pagesRead} pages`}/>}
        {audioBooks.length > 0 && <BookList heading="Audiobooks" books={audioBooks} 
        value={`You have listened to audiobooks for ${hoursListened} hours and ${minutesListened} minutes`}/>}
      </div>   
    </div>
  </div>
    
  );
}

export default App;
