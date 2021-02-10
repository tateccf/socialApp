const initialState = {
  loggedIn: Boolean(localStorage.getItem('socialappUserId')),
  flashMessages: [],
  user: {
    userId: localStorage.getItem('socialappUserId'),
    username: localStorage.getItem('socialappUsername'),
    userEmail: localStorage.getItem('socialappEmail'),
    followers: JSON.parse(localStorage.getItem('socialappFollowers')) || [],
    following: JSON.parse(localStorage.getItem('socialappFollowing')) || [],
  },
  isSearchOpen: false,
};
function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        user: {
          username: action.payload.userName,
          userId: action.payload.userId,
          userEmail: action.payload.userEmail,
          followers: action.payload.followers,
          following: action.payload.following,
        },
      };
    case 'UPDATE_PROFILE':
      console.log(action.payload);
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, loggedIn: false };
    case 'ADD_FLASH_MESSAGE':
      return { ...state, flashMessages: [...state.flashMessages, action.payload] };
    case 'OPEN_SEARCH':
      return { ...state, isSearchOpen: true };
    case 'CLOSE_SEARCH':
      return { ...state, isSearchOpen: false };
    default:
      return state;
  }
}

export { initialState, appReducer };
