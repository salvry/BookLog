import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const BookListRow = ({ book }) => {

    return (
        <div className="booklist-row">
            <li>
                <Link to={`/books/${book.title}`}>{book.author}: {book.title} {book.format}</Link>
            </li>
        </div>
    )
}
BookListRow.propTypes = {
    book: PropTypes.object
}
export default BookListRow;