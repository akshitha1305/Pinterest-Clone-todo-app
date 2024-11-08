

import {
  FETCH_SAVED_PINS,
  LIKE_PIN,
  FETCH_LIKED_PINS,
  FETCH_HIDDEN_PINS,
  SET_FEED,
  SAVE_PIN,
  DELETE_SAVED_PIN,
  SET_FOLLOWERS,
  SET_FOLLOWING
  
  } from "../actions/pin";
  
  const INITIAL_STATE = {
    feed: [],
    saved: [],
    liked: [],
  followers: [],
  following: [],
  };
  
  const pinReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_SAVED_PINS:
        return {
          feed: state.feed,
          saved: action.photoUrls,
        };
      case SET_FEED:
        return {
          feed: action.pins,
        saved: state.saved,


        };
      case SAVE_PIN:
        return {
          feed: state.feed,
          saved: [...state.saved, action.photoUrl],
        };
      case DELETE_SAVED_PIN:
        return {
          feed: state.feed,
          saved: state.saved.filter((url) => url !== action.photoUrl),
        };
        case FETCH_LIKED_PINS:
          return {
            ...state,
            liked: action.photoUrls, // Store liked pins URLs
            feed: state.feed,
          };
          case FETCH_HIDDEN_PINS:
      return {
        ...state,
        hidden: action.photoUrls, // Store liked pins URLs
        feed: state.feed,
      };
        case LIKE_PIN:
          return {
            ...state,
            liked: [...state.liked, action.photoUrl],
          };
        case "UNLIKE_PIN": // Add new action type for unliking
          return {
            ...state,
            liked: state.liked.filter((url) => url !== action.photoUrl),
          };
        case SET_FOLLOWERS:
          return {
            ...state,
            followers: action.followers || [],
          };
        case SET_FOLLOWING:
          return {
            ...state,
            following: action.following || [],
          };
          case HIDE_PIN:
      return {
        ...state,
        pins: state.pins.filter((pin) => pin._id !== action.pinId),
      };

        default:
          return state;
      }
    };
    
    export default pinReducer;
    
    