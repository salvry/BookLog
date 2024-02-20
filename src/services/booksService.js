import axios from 'axios';

const baseUrl = "http://localhost:3001"

const initializeBooks = async () => {
    const response = await axios.get(`${baseUrl}/initialBooks`)
    const allBooks = response.data
    const addedBooks = await axios.get(`${baseUrl}/books`)
    console.log(addedBooks.data)
    const randomIndexes = Array.from((new Set(Array.from({ length: 5 }, () => Math.floor(Math.random() * allBooks.length)))))
    const books = randomIndexes.map(i => allBooks[i]).concat(addedBooks.data)

    return books
}

const getBooks = async () => {
    const response = await axios.get(`${baseUrl}/books`)
    return response.data
}
const createBook = async (bookObject) => {
    const response = await axios.post(`${baseUrl}/books`, bookObject)
    return response.data
}


export default {
    initialize: initializeBooks,
    create: createBook,
    getBooks: getBooks
}