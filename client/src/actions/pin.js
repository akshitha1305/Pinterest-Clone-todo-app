import * as unsplashService from "../services/unsplash";
import * as userService from "../services/users";

export const FETCH_SAVED_PINS = "FETCH_SAVED_PINS";
export const FETCH_LIKED_PINS = "FETCH_LIKED_PINS";
export const FETCH_HIDDEN_PINS = "FETCH_HIDDEN_PINS";
export const SET_FEED = "SET_FEED";
export const SAVE_PIN = "SAVE_PIN";
export const LIKE_PIN = "LIKE_PIN";
export const UNLIKE_PIN = "UNLIKE_PIN";
export const DELETE_SAVED_PIN = "DELETE_SAVED_PIN";
export const CREATE_CUSTOM_PIN = "CREATE_CUSTOM_PIN";

// Action types
export const SET_FOLLOWERS = "SET_FOLLOWERS";
export const SET_FOLLOWING = "SET_FOLLOWING";
export const HIDE_PIN = 'HIDE_PIN';
export const UNHIDE_PIN = 'UNHIDE_PIN';
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAILURE = "UPDATE_PASSWORD_FAILURE";


export const getSavedPins =
  ({ userId, setAsFeed }) =>
  async (dispatch) => {
    const response = await userService.getProfile(userId);
    dispatch({
      type: FETCH_SAVED_PINS,
      photoUrls: response.data.savedPins,
    });
    if (setAsFeed) {
      dispatch({
        type: SET_FEED,
        photoUrls: response.data.savedPins,
      });
    }
  };

  
  export const getLikedPins = ({ userId, setAsFeed }) => async (dispatch) => {
    const response = await userService.getProfile(userId);
  
    dispatch({
      type: FETCH_LIKED_PINS,
      photoUrls: response.data.likedPins,
    });
  
    if (setAsFeed) {
      dispatch({
        type: SET_FEED,
        photoUrls: response.data.likedPins,
      });
    }
  };
  export const getHiddenPins = ({ userId, setAsFeed }) => async (dispatch) => {
    const response = await userService.getProfile(userId);
  
    dispatch({
      type: FETCH_HIDDEN_PINS,
      photoUrls: response.data.hiddenPins,
    });
  
    if (setAsFeed) {
      dispatch({
        type: SET_FEED,
        photoUrls: response.data.hiddenPins,
      });
    }
  };
  

export const likePin = ({ userId, photoUrl }) => async (dispatch) => {
  try {
    await userService.likePin({ userId, photoUrl });
    dispatch({
      type: LIKE_PIN,
      photoUrl: photoUrl,
    });
  } catch (error) {
    console.error("Error liking pin:", error);
  }
};

export const unlikePin = ({ userId, photoUrl }) => async (dispatch) => {
  try {
    await userService.unlikePin({ userId, photoUrl });
    dispatch({
      type: UNLIKE_PIN,
      photoUrl: photoUrl,
    });
  } catch (error) {
    console.error("Error unliking pin:", error);
  }
};

export const searchPins = (query) => async (dispatch) => {
  const response = await unsplashService.search({ query, per_page: 30 });
  const photoUrls = response.data.results.map((photo) => photo.urls.raw);
  dispatch({
    type: SET_FEED,
    photoUrls: photoUrls,
  });
};

export const getRandomPins = () => async (dispatch) => {
  try {
    // Fetch random pins from MongoDB
    const response = await userService.getRandomPins();

    


    console.log('Fetched Pins:', response.data); 

    const pins = response.data;

    const photoUrls = response.data.map((pin) => pin.imageUrl);

    dispatch({
      type: SET_FEED,
      //photoUrls: photoUrls,
      pins: pins,
    });
  } catch (error) {
  }
};

export const savePin =
  ({ userId, photoUrl }) =>
  async (dispatch) => {
    await userService.savePin({ userId, photoUrl });
    dispatch({
      type: SAVE_PIN,
      photoUrl: photoUrl,
    });
  };

export const deleteSavedPin =
  ({ userId, photoUrl }) =>
    async (dispatch) => {
      await userService.deleteSavedPin({ userId, photoUrl });
      dispatch({
        type: DELETE_SAVED_PIN,
        photoUrl: photoUrl,
      });
    };



















// New action for creating a custom Pinterest pin
export const createPin =
  ({ userId, title, imageUrl }) =>
    async (dispatch) => {

      try {
       
        const response = await userService.createPin({
          userId,
          title,
          imageUrl
        });

        // Dispatch the CREATE_CUSTOM_PIN action to update the state
        dispatch({
          type: CREATE_CUSTOM_PIN,
          pin: response.data, // Assuming the API returns the created pin object
        });

        return response.data; // Return the created pin data for further use if needed
      } catch (error) {
        throw error; // Handle error if any
      }
    };

// Fetch followers for a user
export const getFollowers = (userId) => async (dispatch) => {
  const response = await userService.getFollowers(userId);
  dispatch({
    type: SET_FOLLOWERS,
    followers: response.data,
  });
};

// Fetch users the logged-in user is following
export const getFollowing = (userId) => async (dispatch) => {
  const response = await userService.getFollowing(userId);
  dispatch({
    type: SET_FOLLOWING,
    following: response.data,
  });
};
// hide a pin
export const hidePin = (pinId) => async (dispatch) => {
  try {
    await userService.hidePin(pinId);
    dispatch({
      type: HIDE_PIN,
      pinId,
    });
  } catch (error) {
    console.error('Failed to hide pin:', error);
  }
};

// unhide pin
export const unhidePin = (pinId) => async (dispatch) => {
  try {
    await userService.unhidePin(pinId);
    dispatch({
      type: UNHIDE_PIN,
      pinId,
    });
  } catch (error) {
    console.error('Failed to unhide pin:', error);
  }
};
// Change password
export const updatePassword = ({ userId, currentPassword, newPassword }) => async (dispatch) => {
  try {
    await userService.updateUserPassword(userId, currentPassword, newPassword);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILURE,
      payload: error.message || "Failed to update password",
    });
    throw error;
  }
};

