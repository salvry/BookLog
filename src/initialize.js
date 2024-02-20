import fs from 'fs'

function readBookDataFromCSV(path) {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data.split("\n")
    }
    catch (err) {
        console.log(err)
    }
}

export function createBookObjects(path) {

    const lines = readBookDataFromCSV(path)

    const initBooks = []

    lines.map(line => line.split(";"))
        .filter(line => line[0] === "aikuistenkirjat")
        .map(line => {
            const title = line[2].trim()
            const author = line[3].split(",")
            const book = {
                title: title, author: String(author[1] + " " + author[0]).trim(),
                format: "print", length: Math.floor(Math.random() * (601 - 100) + 100)
            }
            initBooks.push(book)

        })
    return initBooks
}

const createBooks = createBookObjects('./bookdata/Helmet.csv')
const books = { "books": createBooks }
fs.writeFileSync('./db.json', JSON.stringify(books))