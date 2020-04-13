import firebase from './fbConfig'

const storage = firebase.storage().ref()

const getDataFromStorage = (imagePath) => {
  return storage.child(imagePath).getDownloadURL()
}

export const getUserImagePromise = (userId) => getDataFromStorage(`/users/${userId}`)

export default firebase
