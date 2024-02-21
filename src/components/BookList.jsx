import BookListRow from './BookListRow'
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import {
    useNavigate
} from 'react-router-dom'

const BookList = ({ books }) => {
    const [filter, setFilter] = useState("")


    const allRef = useRef()
    const printRef = useRef()
    const audioRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {

        if (location.pathname === "/books/books") {
            setFilter("print")
        }
        else if (location.pathname === "/books/audio") {
            setFilter("audio")
        }
        else {
            setFilter("all")
        }

    }, [])



    const handleFilterChange = (event) => {
        const filter = event.target.value
        if (filter === "print") {
            navigate("/books/books")
        }
        else if (filter === "audio") {
            navigate("/books/audio")
        }
        else {
            navigate("/books")
        }
        setFilter(event.target.value)
    }

    const bookListFilterHeading = (filter) => {
        if (filter === "print") {
            return "Read books"
        }
        else if (filter === "audio") {
            return "Audiobooks"
        }
        else {
            return "All books"
        }
    }


    return (
        <div className="container">
            <div className="booklist">
                <h2>My books</h2>
                <div key="inline-radio">
                    <Form.Check
                        inline type="radio" label="All" id="all" name="filter" value="all" ref={allRef}
                        checked={filter === "all"}
                        onChange={handleFilterChange}
                    />
                    <Form.Check inline type="radio" label="Books" id="books" name="filter" value="print"
                        ref={printRef}
                        checked={filter === "print"}
                        onChange={handleFilterChange}
                    />
                    <Form.Check inline type="radio" label="Audiobooks" id="audio" name="filter" value="audio" ref={audioRef}
                        checked={filter === "audio"}
                        onChange={handleFilterChange} />
                </div>
                <h3>{bookListFilterHeading(filter)}</h3>
                <div className="booklist-container">
                    <ListGroup as="ul">
                        {filter !== "all" ? books.filter(book => book.format === filter).map(book => <BookListRow key={book.id} book={book} />) :
                            books.map(book => <BookListRow key={book.id} book={book} />)}
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default BookList 