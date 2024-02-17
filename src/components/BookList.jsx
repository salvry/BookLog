import BookListRow from './BookListRow'
import { useState } from 'react';

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
        <div>
            <h2>Books</h2>

            <div>
                <input type="radio" id="all" name="filter" value="all" onChange={() => setFilter("all")} defaultChecked />
                <label htmlFor="all">All books</label>

                <input type="radio" id="books" name="filter" value="books" onChange={() => setFilter("print")} />
                <label htmlFor="books">Books</label>

                <input type="radio" id="audio" name="filter" value="audio" onChange={() => setFilter("audio")} />
                <label htmlFor="audio">Audiobooks</label>
            </div>

            <h3>{bookListFilterHeading(filter)}</h3>

            <ul>
                {filter !== "all" ? books.filter(book => book.format === filter).map(book => <BookListRow key={book.title} book={book} />) :
                    books.map(book => <BookListRow key={book.title} book={book} />)}
            </ul>
        </div>
    )
}

export default BookList 