import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


const BookListRow = ({ book }) => {

    const navigate = useNavigate()
    return (
        <ListGroup.Item as="li">
            <div className="ms-2 me-auto booklist-title">
                <div>
                    <button className="booklist-link" onClick={() => navigate(`/books/${book.id}`)}>
                        {book.title}
                        <Link to={`/books/${book.id}`}></Link>
                    </button>
                </div>
                <div>
                    <p>
                        {book.author}
                    </p>
                </div>
            </div>
            <ArrowOutwardIcon onClick={() => navigate(`/books/${book.id}`)} />
        </ListGroup.Item>
    )
}
BookListRow.propTypes = {
    book: PropTypes.object
}
export default BookListRow;