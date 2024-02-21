import { durationInHours, durationInMinutes } from '../utils'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import BookIcon from '@mui/icons-material/Book';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Book = ({ book }) => {

    const getDateString = () => {
        if (book.date) {
            const date = new Date(book.date)
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        }
        return ""
    }

    return (
        <div className="container">
            <CardGroup>
                <Card>
                    <div className="card-img-container">
                        <BookIcon style={{ fontSize: "120px" }} />
                    </div>
                    <Card.Header>{book.author}</Card.Header>
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        {book.format === "print" && book.length > 0 &&
                            <div>
                                <AutoStoriesIcon />
                                {` ${book.length}`}
                            </div>
                        }
                        {book.format === "audio" && book.length > 0 &&
                            <div>
                                <AccessTimeIcon />
                                {durationInHours(book.length)} hours and {durationInMinutes(book.length)} minutes
                            </div>
                        }
                        {book.format === "audio" && book.reader && `Read by ${book.reader}`}
                        {book.date &&
                            <div>
                                <CalendarMonthIcon />
                                {getDateString()}
                            </div>
                        }
                    </Card.Body>
                </Card >
            </CardGroup>
        </div>
    )
}
export default Book;