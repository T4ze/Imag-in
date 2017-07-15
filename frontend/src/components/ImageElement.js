import React from 'react';

const ImageElement = ({ onClick, id, src, caption }) => (
  <div
    role="button"
    className="column is-2 element"
    style={{ position: 'relative' }}
    onClick={() => onClick(id)}
  >
    <img src={src} title={caption} alt="img" />
  </div>
);

export default ImageElement;
