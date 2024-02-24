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
    const [date, setDate] = useState('')



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

    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    const addBook = (event) => {
        event.preventDefault();
        if (!title || !author) {
            alert("Title and author are mandatory")
            return
        }
        const bookDate = date ? new Date(date) : Date()
        if (props.format === "print") {
            props.createBook({
                author: author, title: title, length: Number(pages), format: "print", date: bookDate
            });
            setauthor('');
            setTitle('');
            setPages('');

        }
        else if (props.format === "audio") {
            props.createBook({
                author: author, title: title, length: Number(hours) * 60 + Number(minutes),
                reader: reader, format: "audio", date: bookDate
            });
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
        <div className="form-container">
            <div className="form" style={{ width: "325px" }}>
                <form onSubmit={addBook}>
                    <div className="form-group">
                        <label htmlFor="author">Author*</label>
                        <input className="w-75" onChange={handleAuthorChange} type="text" id="author" value={author} />
                        <label htmlFor="title">Title*</label>
                        <input className="w-75" onChange={handleTitleChange} type="text" id="title" value={title} />
                    </div>
                    {
                        props.format === "audio" &&
                        <div className="form-group" >
                            <label htmlFor="reader">Reader</label>
                            <input className="w-75" type="text" id="reader" onChange={handleReaderChange} value={reader} />
                            <div>
                                <label>Duration</label>
                                <div style={{ marginBottom: "0.5em" }}>
                                    <input className="w-25" type="number" id="hours" onChange={handleHoursChange} value={hours} placeholder='Hours' />
                                </div>
                                <div>
                                    <input className="w-25" type="number" id="minutes" onChange={handleMinutesChange} value={minutes} placeholder='Minutes' />
                                </div>
                            </div>

                        </div>
                    }
                    {
                        props.format === "print" &&
                        <div className="form-group" style={{ marginTop: "1em" }}>
                            <label htmlFor="pages">Number of pages</label>
                            <input className="w-25" type="number" id="pages" onChange={handlePagesChange} value={pages} />
                            <div>

                            </div>
                        </div>
                    }
                    <div className="form-group w-50">
                        <label htmlFor="date">Date</label>
                        <input id="date" type="date" onChange={handleDateChange} value={date} />
                    </div>
                    <div>
                        <Button className="submit-button" type="submit">
                            Submit
                        </Button>
                    </div>
                </form >
            </div >
        </div >
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