// import {
//   FETCH_SAVED_PINS,
//   SET_FEED,
//   SAVE_PIN,
//   DELETE_SAVED_PIN,
// } from "../actions/pin";

// const INITIAL_STATE = {
//   feed: [],
//   saved: [],
// };

// const pinReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case FETCH_SAVED_PINS:
//       return {
//         feed: state.feed,
//         saved: action.photoUrls,
//       };
//     case SET_FEED:
//       return {
//         feed: action.photoUrls,
//         saved: state.saved,
//       };
//     case SAVE_PIN:
//       return {
//         feed: state.feed,
//         saved: [...state.saved, action.photoUrl],
//       };
//     case DELETE_SAVED_PIN:
//       return {
//         feed: state.feed,
//         saved: state.saved.filter((url) => url !== action.photoUrl),
//       };
//     default:
//       return state;
//   }
// };

// export default pinReducer;


import {
    FETCH_SAVED_PINS,
    SET_FEED,
    SAVE_PIN,
    DELETE_SAVED_PIN,
    CREATE_CUSTOM_PIN,
  } from "../actions/pin";
  
  const INITIAL_STATE = {
    feed: [],
    saved: [],
  };
  
  const pinReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_SAVED_PINS:
        return {
          ...state,
          saved: action.photoUrls,
        };
      case SET_FEED:
        return {
          ...state,
          feed: action.photoUrls,
        };
      case SAVE_PIN:
        return {
          ...state,
          saved: [...state.saved, action.photoUrl],
        };
      case DELETE_SAVED_PIN:
        return {
          ...state,
          saved: state.saved.filter((url) => url !== action.photoUrl),
        };
      case CREATE_CUSTOM_PIN:
        return {
          ...state,
          feed: [action.pin, ...state.feed],
          saved: [...state.saved, action.pin.photoUrl],
        };
      default:
        return state;
    }
  };
  
  export default pinReducer;