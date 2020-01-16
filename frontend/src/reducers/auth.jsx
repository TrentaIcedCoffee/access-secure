const initialState = {
  user: null,
  authPage: 'login',
  email: '',
  password: '',
  passwordRe: '',
  errors: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'TO_LOGIN':
      return { ...state, authPage: 'login' };
    case 'TO_REGISTER':
      return { ...state, authPage: 'register' };
    case 'AUTH_CHANGE_INPUT':
      return { ...state, ...action.payload};
    case 'SET_USER':
      return { ...state, user: action.payload.user};
    case 'NEW_AUTH_ERROR':
      return { ...state, errors: [action.payload.error, ...state.errors]};
    case 'DROP_AUTH_ERROR':
      return {
        ...state, 
        errors: state.errors.filter((_, idx) => idx !== action.payload.idx),
      };
    default:
      return state;
  }
};

export default authReducer;