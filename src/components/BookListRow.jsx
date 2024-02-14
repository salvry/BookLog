import PropTypes from 'prop-types';

const BookListRow = ({ book, showBook }) => {
    const bookDetails = book => {
        if (book.format === "audio") {
            return `Reader: ${book.reader}, ${Math.floor(book.length / 60)} hours and ${book.length % 60} minutes`
        }
        else {
            return `${book.length} pages`
        }
    }
    return (
        <div className="booklist-row">
            <li><a onClick={showBook}>{book.author}: {book.title}
                <span className="book-details">
                    {bookDetails(book)}
                </span>
            </a></li>
        </div>
    )
}
BookListRow.propTypes = {
    book: PropTypes.object,
    showBook: PropTypes.func
}
export default BookListRow