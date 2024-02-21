import HeadsetIcon from '@mui/icons-material/Headset';
import StyleIcon from '@mui/icons-material/Style';
import { useState } from 'react';
import PropTypes from 'prop-types';
import BookForm from '../components/BookForm'
import Button from 'react-bootstrap/Button';

const BookSelector = ({ createBook }) => {
    const [format, setFormat] = useState(null)

    if (format === "print") {
        document.getElementById("print").classList.add("button-selected")
        document.getElementById("audio").classList.remove("button-selected")
    }
    else if (format === "audio") {
        document.getElementById("audio").classList.add("button-selected")
        document.getElementById("print").classList.remove("button-selected")
    }

    return (
        <div className="selector-container">
            <div className="button-container">
                <Button id="print" className="selector-button" onClick={() => setFormat("print")} >
                    <span><StyleIcon /></span>
                    Add book
                </Button>
                <Button id="audio" className="selector-button" onClick={() => setFormat("audio")} >
                    <span><HeadsetIcon /></span>
                    Add audiobook
                </Button>
            </div>
            <BookForm format={format} createBook={createBook} />
        </div>





    )
}

BookSelector.propTypes = {
    createBook: PropTypes.func,
}
export default BookSelector;