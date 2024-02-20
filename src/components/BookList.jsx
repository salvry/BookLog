import BookListRow from './BookListRow'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const BookList = ({ books }) => {
    const [filter, setFilter] = useState("all")

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
            <h2>My books</h2>

            <div key="inline-radio">
                <Form.Check inline type="radio" label="All" id="all" name="filter" value="all" onChange={() => setFilter("all")} defaultChecked />


                <Form.Check inline type="radio" label="Books" id="books" name="filter" value="books" onChange={() => setFilter("print")} />


                <Form.Check inline type="radio" label="Audiobooks" id="audio" name="filter" value="audio" onChange={() => setFilter("audio")} />

            </div>

            <h3>{bookListFilterHeading(filter)}</h3>

            <ul>
                {filter !== "all" ? books.filter(book => book.format === filter).map(book => <BookListRow key={book.id} book={book} />) :
                    books.map(book => <BookListRow key={book.title} book={book} />)}
            </ul>
        </div>
    )
}

export default BookList 