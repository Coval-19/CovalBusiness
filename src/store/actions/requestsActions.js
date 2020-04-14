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

export const removeNotification = (businessId, notificationId) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    return firestore
      .collection('businesses')
      .doc(businessId)
      .collection('notifications')
      .doc(notificationId)
      .delete()
      .then(() => {
        console.log('NOTIFICATION_DELETE_SUCCESS')
        dispatch({ type: 'NOTIFICATION_DELETE_SUCCESS' })
      }).catch(err => {
        console.log('NOTIFICATION_DELETE_ERROR', err)
        dispatch({ type: 'NOTIFICATION_DELETE_ERROR', err })
      })
  }
}

export const removeNotificationsByUser = (businessId, userId) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const batch = firestore.batch();

    return firestore
      .collection('businesses')
      .doc(businessId)
      .collection('notifications')
      .where('userId', '==', userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref)
        })
        return batch.commit()
      })
      .then(() => {
        console.log('NOTIFICATIONS_BY_USER_DELETE_SUCCESS')
        dispatch({ type: 'NOTIFICATIONS_BY_USER_DELETE_SUCCESS' })
      }).catch(err => {
        console.log('NOTIFICATIONS_BY_USER_DELETE_ERROR', err)
        dispatch({ type: 'NOTIFICATIONS_BY_USER_DELETE_ERROR', err })
      })
  }
}
