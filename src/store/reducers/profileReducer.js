const initState = {
  error: null,
  url: null,
}

const profileReducer = (state = initState, action) => {
  switch(action.type) {
    case 'UPLOADED_IMAGE_SUCCESS':
      console.log('upload image success');
      return {
        ...state,
        error: null,
      }

    case 'UPLOADED_IMAGE_ERROR':
      console.log('upload image error', action.err);
      return {
        ...state,
        error: action.err.message
      }

    case 'GET_IMAGE_SUCCESS':
      console.log('get image success');
      return {
        ...state,
        error: null,
        url: action.url,
      }

    case 'GET_IMAGE_ERROR':
      console.log('get image error', action.err);
      return {
        ...state,
        error: action.err.message
      }

    default:
      return state
  }
};

export default profileReducer;
