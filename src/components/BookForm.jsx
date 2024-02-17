import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const BookForm = (props) => {

    const [author, setauthor] = useState('');
    const [title, setTitle] = useState('');
    const [pages, setPages] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [reader, setReader] = useState('');

    const handleAuthorChange = (event) => {
        setauthor(event.target.value);
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handlePagesChange = (event) => {
        setPages(event.target.value);
    }

    const handleHoursChange = (event) => {
        setHours(event.target.value);
    }

    const handleMinutesChange = (event) => {
        setMinutes(event.target.value);
    }

    const handleReaderChange = (event) => {
        setReader(event.target.value);
    }

    const addBook = (event) => {
        event.preventDefault();
        if (!title || !author) {
            alert("Title and author are mandatory")
            return
        }
        if (props.format === "print") {
            props.createBook({ author: author, title: title, length: Number(pages), format: "print" });
            setauthor('');
            setTitle('');
            setPages('');

        }
        else if (props.format === "audio") {
            props.createBook({ author: author, title: title, length: Number(hours) * 60 + Number(minutes), reader: reader, format: "audio" });
            setauthor('');
            setTitle('');
            setHours('');
            setMinutes('');
            setReader('');
        }
    }

    if (!props.format) {
        return null
    }
    return (
        <div className="container">
            <div className="form">
                <form onSubmit={addBook}>
                    <label htmlFor="author">Author</label>
                    <input onChange={handleAuthorChange} type="text" id="author" value={author} />
                    <label htmlFor="title">Title</label>
                    <input onChange={handleTitleChange} type="text" id="title" value={title} />
                    {props.format === "audio" &&
                        <div className="audiobook-form">
                            <label htmlFor="reader">Reader</label>
                            <input type="text" id="reader" onChange={handleReaderChange} value={reader} />
                            <label>Duration</label>
                            <input type="number" id="hours" onChange={handleHoursChange} value={hours} placeholder='Hours' />
                            <input type="number" id="minutes" onChange={handleMinutesChange} value={minutes} placeholder='Minutes' />
                            <div>
                                <Button className="submit-button" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    }
                    {props.format === "print" &&
                        <div className="printbook-form">
                            <label htmlFor="pages">Number of pages</label>
                            <input type="number" id="pages" onChange={handlePagesChange} value={pages} />
                            <div>
                                <Button className="submit-button" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
}
BookForm.propTypes = {
    addBook: PropTypes.func,
    handleAuthorChange: PropTypes.func,
    handleTitleChange: PropTypes.func,
    handleReaderChange: PropTypes.func,
    handleHoursChange: PropTypes.func,
    handleMinutesChange: PropTypes.func,
    handlePagesChange: PropTypes.func,
    createBook: PropTypes.func,
    createAudioBook: PropTypes.func,
    author: PropTypes.string,
    title: PropTypes.string,
    reader: PropTypes.string,
    format: PropTypes.string,
    pages: PropTypes.string,
    hours: PropTypes.string,
    minutes: PropTypes.string
}
export default BookForm;