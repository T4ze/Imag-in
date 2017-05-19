import React from 'react';
import ImageElement from './ImageElement';

const ImageList = ({ images, lastIndex, onImageClick, onLoadMoreClick }) => (
  <div>
    <div className="elements">
      {images.map(img => (
        <ImageElement key={img.id} onClick={onImageClick} {...img} />
      ))}

    </div>
    <div className="section has-text-centered">
      <button
        className="button is-info"
        onClick={() => onLoadMoreClick(lastIndex)}
      >
        Load More
      </button>
    </div>
  </div>
);

export default ImageList;
