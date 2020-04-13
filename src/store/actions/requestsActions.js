import {getTimestamp} from '../../firebase/firebaseUtils'

export const sendResponse = (userId, businessInfo, isApproved) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    return firestore
      .collection('users')
      .doc(userId)
      .collection('responses')
      .add({
        ...businessInfo,
        timestamp: getTimestamp(),
        isApproved: isApproved,
      }).then(() => {
        console.log('REQUEST_ANSWER_SUCCESS')
        dispatch({ type: 'REQUEST_ANSWER_SUCCESS' })
      }).catch(err => {
        console.log('REQUEST_ANSWER_ERROR', err)
        dispatch({ type: 'REQUEST_ANSWER_ERROR', err })
      })
  }
}
