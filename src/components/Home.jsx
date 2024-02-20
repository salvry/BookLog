import { durationInHours, durationInMinutes } from '../utils'
import { Link } from 'react-router-dom'

const Home = ({ books }) => {
    const printBooks = books.filter(book => book.format === "print")
    const audioBooks = books.filter(book => book.format === "audio")

    const pagesRead = printBooks.filter(book => book.length).reduce((acc, curr) => acc + Number(curr.length), 0)
    const hoursListened = durationInHours(audioBooks.filter(book => book.length).reduce((acc, curr) => acc + curr.length || 0, 0))
    const minutesListened = durationInMinutes(audioBooks.filter(book => book.length).reduce((acc, curr) => acc + curr.length, 0))



    return (
        <div className="container">
            <div>
                {printBooks.length > 0 && pagesRead > 0 &&
                    <p>You have read {printBooks.length} {printBooks.length === 1 ? "book" : "books"} and {pagesRead} pages.</p>
                }
                {audioBooks.length > 0 && minutesListened > 0 &&
                    <p>You have listened to {audioBooks.length} {audioBooks.length === 1 ? "audiobook" : "audiobooks"} for {hoursListened} hours and {minutesListened} minutes.</p>
                }
            </div>
            <div>
                <Link to="/books">My reading history</Link>

            </div>
        </div>
    )

}
export default Home