import React from "react"
import styles from './ImageGalleryItem.module.css'
// import PropTypes from "prop-types"

const ImageGalleryItem = ({images,}) => (
    <> 
        {images.map(({ webformatURL, id}) => (
            <li key={id} className={}>
                <img src="" alt="" />
            </li>
        ))}
    </>
)

// ContactItem.propTypes = {
//     contacts: PropTypes.array.isRequired,
//     onDeleteContact: PropTypes.func.isRequired,  
//   };

export default ContactItem