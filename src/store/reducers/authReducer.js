const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null
      }

    case 'LOGIN_ERROR':
      console.log('login error', action.err);
      return {
        ...state,
        authError: action.err.message
      }

    case 'LOGOUT_SUCCESS':
      console.log('logout success');
      return state;

    case 'REGISTRATION_SUCCESS':
      console.log('registration success')
      return {
        ...state,
        authError: null
      }

    case 'REGISTRATION_ERROR':
      console.log('registration error', action.err)
      return {
        ...state,
        authError: action.err.message
      }

    default:
      return state
  }
};

export default authReducer;
