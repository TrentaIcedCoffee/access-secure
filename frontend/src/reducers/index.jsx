const authInitState = {
  user: null,
  authPage: 'login',
  email: '',
  password: '',
  passwordRe: '',
  errors: [],
};

const authReducer = (state = authInitState, action) => {
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

const consoleInitState = {
  apps: [],
  errors: [],
  app: {},
  logs: [],
  blacklist: [],
  whitelist: [],
};

const consoleReducer = (state = consoleInitState, action) => {
  switch (action.type) {
    case 'NEW_CONSOLE_ERROR':
      return { ...state, errors: [action.payload.error, ...state.errors]};
    case 'SET_APPS':
      return { ...state, apps: action.payload.apps };
    case 'SET_APP':
      return { ...state, app: action.payload.app };
    case 'SET_BLACKLIST':
      return { ...state, blacklist: action.payload.blacklist };
    case 'SET_WHITELIST':
      return { ...state, whitelist: action.payload.whitelist };
    case 'UNSET_ALL':
      return consoleInitState;
    default:
      return state;
  }
};

export default {
  auth: authReducer,
  console: consoleReducer,
};