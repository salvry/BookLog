import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const BookListRow = ({ book }) => {

    const navigate = useNavigate()
    return (
        <ListGroup.Item as="li">
            <div className="ms-2 me-auto booklist-title">
                <div>
                    <button className="booklist-link" onClick={() => {
                        history.pushState({ prevPage: `books/${book.id}` }, "")

                        navigate(`/books/${book.id}`)
                    }}>
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
            <Button className="booklist-linkbutton" onClick={() => navigate(`/books/${book.id}`)}>See book</Button>
        </ListGroup.Item >
    )
}
BookListRow.propTypes = {
    book: PropTypes.object
}
export default BookListRow;