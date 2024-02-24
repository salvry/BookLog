import BookListRow from './BookListRow'
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom'


const BookList = ({ books }) => {
    const [filter, setFilter] = useState("all")
    const [sortingValue, setSortingValue] = useState("newest")
    const [sortedBooks, setSortedBooks] = useState([])

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

    useEffect(() => {
        setSortedBooks(books)
    }, [books])

    useEffect(() => {
        if (history.state.prevPage && history.state.prevPage.startsWith("books")) {
            setSortingValue(sessionStorage.getItem("sortingValue"))
            sortBooks(sessionStorage.getItem("sortingValue"))
        }
        sortBooks(sortingValue)
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

    const sortBooks = (value) => {
        if (value === "newest") {
            setSortedBooks(books.sort((a, b) => new Date(b.date) - (new Date(a.date))))
        }
        if (value === "oldest") {
            setSortedBooks(books.sort((a, b) => new Date(a.date) - (new Date(b.date))))
        }
        if (value === "title") {
            setSortedBooks(books.sort((a, b) => a.title.localeCompare(b.title)))
        }
        if (value === "author") {
            setSortedBooks(books.sort((a, b) => a.author.localeCompare(b.author)))
        }
        if (value === "length") {
            const booksWithLength = books.filter(book => book.length).sort((a, b) => b.length - a.length)
            const booksWithoutLength = books.filter(book => !book.length)
            setSortedBooks(booksWithLength.concat(booksWithoutLength))
        }
    }

    const changeSortingValue = (event) => {
        const value = event.target.value
        sortBooks(value)
        setSortingValue(value)
        sessionStorage.setItem("sortingValue", value)
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
                        inline type="radio" label="All" id="all" name="filter" value="all"
                        checked={filter === "all"}
                        onChange={handleFilterChange}
                    />
                    <Form.Check inline type="radio" label="Books" id="books" name="filter" value="print"
                        checked={filter === "print"}
                        onChange={handleFilterChange}
                    />
                    <Form.Check inline type="radio" label="Audiobooks" id="audio" name="filter" value="audio"
                        checked={filter === "audio"}
                        onChange={handleFilterChange} />
                </div>
                <div className="sort-container">
                    <label>Sort by</label>
                    <Form.Select id="select" aria-label="Default select example" value={sortingValue} onChange={changeSortingValue}>
                        <option id="newest" value="newest" >Newest</option>
                        <option id="oldest" value="oldest" >Oldest</option>
                        <option id="title" value="title" >Title</option>
                        <option id="author" value="author" >Author</option>
                        {filter !== "all" &&
                            <option id="lenght" value="length" >Longest</option>
                        }
                    </Form.Select>
                </div>
                <h3>{bookListFilterHeading(filter)}</h3>
                <div className="booklist-container">
                    <ListGroup as="ul">
                        {sortedBooks.map(book => <BookListRow key={book.id} book={book} />)}
                    </ListGroup>
                </div>
            </div>
        </div >
    )
}

export default BookList 