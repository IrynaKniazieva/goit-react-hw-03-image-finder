import React from "react"
import styles from './ImageGalleryItem.module.css'
// import PropTypes from "prop-types"

const ImageGalleryItem = ({images}) => (
    <> 
        {images.map(({ largeImageURL, webformatURL, id}) => (
            <li key={id} className={styles.imageGalleryItem} >
                <a href={largeImageURL}>
                <img className={styles.imageGalleryItemImage} 
                src={webformatURL} 
                alt=""/>
                </a>
                
            </li>
        ))}
    </>
)

// ContactItem.propTypes = {
//     contacts: PropTypes.array.isRequired,
//     onDeleteContact: PropTypes.func.isRequired,  
//   };

export default ImageGalleryItem;