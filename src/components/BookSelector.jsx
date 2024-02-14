import HeadsetIcon from '@mui/icons-material/Headset';
import StyleIcon from '@mui/icons-material/Style';

import PropTypes from 'prop-types';

const BookSelector = ({ selectBook, selectAudioBook }) => {

    return (
        <div>
            <button className="selector-button" onClick={selectBook}>
                <span><StyleIcon /></span>
                Add book</button>
            <button className="selector-button" onClick={selectAudioBook}>
                <span><HeadsetIcon /></span>
                Add audiobook</button>
        </div >
    );
}

BookSelector.propTypes = {
    selectBook: PropTypes.func,
    selectAudioBook: PropTypes.func
}
export default BookSelector