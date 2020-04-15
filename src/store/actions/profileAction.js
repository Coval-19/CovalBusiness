export const uploadImage = (imageAsFile, businessId) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const storage = firebase.storage().ref()

    storage.child(`/businesses/${businessId}`)
      .put(imageAsFile)
      .then(() => {
        dispatch({ type: 'UPLOADED_IMAGE_SUCCESS' })
        dispatch(getImage(businessId))
      }).catch(err => {
        dispatch({ type: 'UPLOADED_IMAGE_ERROR', err })
      })
  }
}

export const getImage = (businessId) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const storage = firebase.storage().ref()

    storage.child(`/businesses/${businessId}`)
      .getDownloadURL()
      .then(url => {
        dispatch({ type: 'GET_IMAGE_SUCCESS', url })
      }).catch(err => {
        dispatch({ type: 'GET_IMAGE_ERROR', err })
      })
  }
}