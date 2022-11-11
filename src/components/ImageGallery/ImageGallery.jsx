import React from 'react';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onSelect }) => (
  <ul className={styles.imageGallery}>
    {images.map(({ largeImageURL, webformatURL, id }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        onSelect={onSelect}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGallery;

// const ImageGallery = ({children}) => (
//     <ul className={styles.imageGallery}>{children}</ul>
// )
