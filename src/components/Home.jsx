import { durationInHours, durationInMinutes } from '../utils'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { CardBody } from 'react-bootstrap';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeadsetIcon from '@mui/icons-material/Headset';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookIcon from '@mui/icons-material/Book';

const Home = ({ books }) => {
    const printBooks = books.filter(book => book.format === "print")
    const audioBooks = books.filter(book => book.format === "audio")

    const pagesRead = printBooks.filter(book => book.length).reduce((acc, curr) => acc + Number(curr.length), 0)
    const hoursListened = durationInHours(audioBooks.filter(book => book.length).reduce((acc, curr) => acc + curr.length || 0, 0))
    const minutesListened = durationInMinutes(audioBooks.filter(book => book.length).reduce((acc, curr) => acc + curr.length, 0))

    return (
        <div className="container">
            <div>
                <Card>
                    <CardBody>
                        {printBooks.length > 0 &&
                            <Card.Text>
                                <BookIcon style={{ "color": "#00995e" }} />
                                {printBooks.length} {audioBooks.length === 1 ? "book" : "books"}
                            </Card.Text>
                        }
                        {pagesRead > 0 &&
                            <Card.Text>
                                <AutoStoriesIcon style={{ "color": "#00995e" }} />
                                {pagesRead} pages
                            </Card.Text>}

                        <Link to="/books/books">My reading history</Link>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        {audioBooks.length > 0 &&
                            <Card.Text>
                                <HeadsetIcon style={{ "color": "#00995e" }} />
                                {audioBooks.length} {audioBooks.length === 1 ? "audiobook" : "audiobooks"}
                            </Card.Text>
                        }
                        {minutesListened > 0 &&
                            <Card.Text>
                                <AccessTimeIcon style={{ "color": "#00995e" }} />
                                {hoursListened} hours and {minutesListened} minutes.
                            </Card.Text>}

                        <Link to="/books/audio">My listening history</Link>

                    </CardBody>
                </Card>
            </div>
        </div >
    )

}
export default Home