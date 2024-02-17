import HeadsetIcon from '@mui/icons-material/Headset';
import StyleIcon from '@mui/icons-material/Style';
import { useState } from 'react';
import PropTypes from 'prop-types';
import BookForm from '../components/BookForm'
import Button from 'react-bootstrap/Button';

const BookSelector = ({ createBook }) => {
    const [format, setFormat] = useState(null)
    return (
        <div>
            <Button className="selector-button" onClick={() => setFormat("print")} >
                <span><StyleIcon /></span>
                Add book
            </Button>
            <Button className="selector-button" onClick={() => setFormat("audio")} >
                <span><HeadsetIcon /></span>
                Add audiobook
            </Button>

            <BookForm format={format} createBook={createBook} />
        </div>





    )
}

BookSelector.propTypes = {
    createBook: PropTypes.func,
}
export default BookSelector;