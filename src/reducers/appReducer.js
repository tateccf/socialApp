const initialState = {
  loggedIn: Boolean(localStorage.getItem('socialappUserId')),
  flashMessages: [],
  user: {
    useId: localStorage.getItem('complexappUserId'),
    username: localStorage.getItem('complexappUsername'),
    userEmail: localStorage.getItem('complexappEmail'),
  },
};
function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      console.log(action.payload);
      return {
        ...state,
        loggedIn: true,
        user: {
          username: action.payload.displayName,
          userId: action.payload.uid,
          userEmail: action.payload.email,
        },
      };
    case 'LOGOUT':
      return { ...state, loggedIn: false };
    case 'ADD_FLASH_MESSAGE':
      return { ...state, flashMessages: [...state.flashMessages, action.payload] };
    default:
      return state;
  }
}

export { initialState, appReducer };
