import { connect } from 'react-redux';
import { fetchImages, fetchDeleteImage } from '../actions';
import ImageListComponent from '../components/ImageList';

const mapStateToProps = state => ({
  images: state.images,
  lastIndex: state.images.length
    ? state.images[state.images.length - 1].index
    : -1,
});

const mapDispatchToProps = dispatch => ({
  onImageClick: (id) => {
    dispatch(fetchDeleteImage(id));
  },

  onLoadMoreClick: (lastId) => {
    dispatch(fetchImages(lastId));
  },
});

const ImageList = connect(mapStateToProps, mapDispatchToProps)(
  ImageListComponent,
);

export default ImageList;
