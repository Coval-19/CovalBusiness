export const login = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
}

export const logout = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'LOGOUT_SUCCESS' })
    });
  }
}

export const register = (newBusiness) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firebase.auth().createUserWithEmailAndPassword(
      newBusiness.email, 
      newBusiness.password
    ).then(resp => {
      return firestore.collection('businesses').doc(resp.user.uid).set({
        businessName: newBusiness.name,
        businessAddress: newBusiness.address,
        // TODO: Add more new business info
      });
    }).then(() => {
      dispatch({ type: 'REGISTRATION_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'REGISTRATION_ERROR', err});
    });
  }
}
