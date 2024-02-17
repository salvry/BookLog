import { durationInHours, durationInMinutes } from '../utils'

const Home = ({ books }) => {
    const printBooks = books.filter(book => book.format === "print")
    const audioBooks = books.filter(book => book.format === "audio")


    const pagesRead = printBooks.filter(book => book.length).reduce((acc, curr) => acc + Number(curr.length), 0)
    const hoursListened = durationInHours(audioBooks.filter(book => book.length).reduce((acc, curr) => acc + curr.length || 0, 0))
    const minutesListened = durationInMinutes(audioBooks.filter(book => book.length).reduce((acc, curr) => acc + curr.length, 0))

    const pagesReadMessage = pagesRead > 0 ? `Total number of pages read: ${pagesRead}` : ''
    const timeListenedMessage = minutesListened > 0 ? `Total time listened: ${hoursListened} hours and ${minutesListened} minutes` : ""

    return (
        <div>
            <p>{pagesReadMessage}</p>
            <p>{timeListenedMessage}</p>
        </div>
    )

}
export default Home