const initialState = {
  loggedIn: Boolean(localStorage.getItem('socialappUserId')),
  flashMessages: [],
};
function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loggedIn: true };
    case 'LOGOUT':
      return { ...state, loggedIn: false };
    case 'ADD_FLASH_MESSAGE':
      return { ...state, flashMessages: [...state.flashMessages, action.payload] };
    default:
      return state;
  }
}

export { initialState, appReducer };
