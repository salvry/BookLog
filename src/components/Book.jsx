import { durationInHours, durationInMinutes } from '../utils'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import bookIcon from "../images/book.png"

const Book = ({ book }) => {

    return (
        <div className="container">
            <CardGroup>
                <Card>
                    <Card.Img className="card-img" variant="top" src={bookIcon} />
                    <Card.Header>{book.author}</Card.Header>
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                            {book.format === "print" && book.length && `Pages: ${book.length}`}
                            {book.format === "audio" && book.length && `${durationInHours(book.length)} hours and ${durationInMinutes(book.length)} minutes`}
                        </Card.Text>
                        <Card.Text>
                            {book.format === "audio" && book.reader && `Read by ${book.reader}`}
                        </Card.Text>
                        <Card.Text>
                            <a href="https://www.flaticon.com/free-icons/book" title="book icons">Book icons created by popo2021 - Flaticon</a>
                        </Card.Text>
                    </Card.Body>
                </Card >
            </CardGroup>
        </div>
    )
}
export default Book;