export const addImages = data => ({
  type: 'ADD_IMAGES',
  data,
});

export const deleteImage = id => ({
  type: 'DELETE_IMAGE',
  id,
});

export const fetchDeleteImage = id => (dispatch, _getState) => {
  dispatch(deleteImage(id));

  fetch(`http://localhost:4242/api/pictures/${id}`, {
    method: 'DELETE',
    body: '',
  }).then();
};

export const fetchImages = cursor => (dispatch, _getState) => {
  fetch(`http://localhost:4242/api/pictures?cursor=${cursor}`)
    .then(r => r.json())
    .then((data) => {
      dispatch(addImages(data));
    })
    .catch(() => {});
};
