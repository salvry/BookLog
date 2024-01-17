import React from 'react';
import { useState } from 'react';
import './App.css';

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
        {props.format === "audio" && 
        <div className="audiobook-form">
        <label htmlFor="reader">Reader</label>
        <input type="text" id="reader" onChange={props.handleReaderChange} value={props.reader}/>
        <label>Duration</label>
        <input type="number" id="hours" onChange={props.handleHoursChange} value={props.hours} placeholder='Hours'/>
        <input type="number" id="minutes" onChange={props.handleMinutesChange} value={props.minutes} placeholder='Minutes'/>
        <button className="submit-button" type="submit">Add book</button>
        </div>
        }
        {props.format==="print" && 
        <div className="printbook-form">
        <label htmlFor="pages">Number of pages</label>
        <input type="number" id="pages" onChange={props.handlePagesChange} value={props.pages} />
        <button className="submit-button" type="submit">Add book</button>
        </div>
      }
    </form>
    </div>
  );
}

const BookListRow = ({book, showBook }) => {
  
  return (
    <div className="booklist-row">
    <li><a onClick={showBook}>{book.author}: {book.title} 
    <span className="book-details">
      {book.format==="audio" ? ` ${Math.floor(book.length/60)} hours and ${book.length%60} minutes` : ` ${book.length} pages`}
    </span>
    </a></li>
    </div>
  )
}

const App = () => {
  
  const [bookFormat, setBookFormat] = useState('');
  const [books, setBooks] = useState([]);
  const [audioBooks, setAudioBooks] = useState([]);
  const [author, setauthor] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [pages, setPages] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [reader, setReader] = useState('');


  const selectBook = () => {
    setBookFormat('print');
  } 

  const selectAudioBook = () => {
    setBookFormat('audio');
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
    if(bookFormat==="print"){
      const newBook = {author: author, title: bookTitle, length: Number(pages), format:"print"};
      setBooks(books.concat(newBook))
      setauthor('');
      setBookTitle('');
      setPages('');
      }
    if(bookFormat==="audio"){
      const newBook = {author: author, title: bookTitle, length: Number(hours)*60 + Number(minutes), reader: reader, format: "audio"};
      setAudioBooks(audioBooks.concat(newBook));
      setauthor('');
      setBookTitle('');
      setHours('');
      setMinutes('');
      setReader('');
    }
  }

  const showBook = (book) => {
    console.log(book)
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
          {bookFormat === "print" && <BookForm format={bookFormat} author={author} title={bookTitle} pages={pages} addBook={addBook} handleAuthorChange={handleAuthorChange} 
          handleTitleChange={handleTitleChange} handlePagesChange={handlePagesChange} />}
          {bookFormat === "audio" && <BookForm format={bookFormat} author={author} title={bookTitle} hours={hours} minutes={minutes} 
          reader={reader} addBook={addBook} handleAuthorChange={handleAuthorChange} handleTitleChange={handleTitleChange} 
          handleHoursChange={handleHoursChange} handleMinutesChange={handleMinutesChange} handleReaderChange={handleReaderChange} />}
        </div>
      <div className="booklists">
        {books.length > 0 && <><h2>Books</h2><ul>{books.map(book => <BookListRow key={book.title} book={book} 
        showBook={()=>showBook(book)}/>)}</ul>
        <p>You have read {pagesRead} pages</p>
        </>}
        {audioBooks.length > 0 && <><h2>Audiobooks</h2>
        <ul>{audioBooks.map(book => <BookListRow key={book.title} book={book} showBook={()=>showBook(book)} length={book.length} />)}</ul>
        <p>You have listened to audiobooks for {hoursListened} hours and {minutesListened} minutes</p>
        </>
        }
      </div>   
    </div>
  </div>
    
  );
}

export default App;
