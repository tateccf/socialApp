const initialState = {
  loggedIn: Boolean(localStorage.getItem('socialappUserId')),
  flashMessages: [],
  user: {
    userId: localStorage.getItem('socialappUserId'),
    username: localStorage.getItem('socialappUsername'),
    userEmail: localStorage.getItem('socialappEmail'),
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
