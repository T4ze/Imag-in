const image = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return {
        id: action.id,
        index: action.index,
        src: `${action.picture}?id=${action.id}`,
        caption: action.caption,
      };

    default:
      return state;
  }
};

const images = (state = [], action) => {
  switch (action.type) {
    case 'ADD_IMAGES':
      return [
        ...state,
        ...action.data.map(e => image(undefined, { type: 'ADD_IMAGE', ...e })),
      ];
    case 'DELETE_IMAGE':
      return state.filter(e => e.id !== action.id);
    default:
      return state;
  }
};

export default images;
