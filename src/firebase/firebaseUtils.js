import firebase from './fbConfig'

const storage = firebase.storage().ref()

const getDataFromStorage = (imagePath) => {
  return storage.child(imagePath).getDownloadURL()
}

export const getUserImagePromise = (userId) => getDataFromStorage(`/users/${userId}`)
export const getBusinessImagePromise = (businessId) => getDataFromStorage(`/businesses/${businessId}`)

export const getTimestamp = () => firebase.firestore.Timestamp.now()

const uploadImageToStore = (imageAsFile, target) => {
  return storage.child(target).put(imageAsFile)
}

export const uploadBusinessImagePromise = (imageAsFile, businessId) => uploadImageToStore(imageAsFile, `/businesses/${businessId}`)


export default firebase
