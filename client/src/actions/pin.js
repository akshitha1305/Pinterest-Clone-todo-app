import * as unsplashService from "../services/unsplash";
import * as userService from "../services/users";

export const FETCH_SAVED_PINS = "FETCH_SAVED_PINS";
export const SET_FEED = "SET_FEED";
export const SAVE_PIN = "SAVE_PIN";
export const DELETE_SAVED_PIN = "DELETE_SAVED_PIN";
export const CREATE_CUSTOM_PIN = "CREATE_CUSTOM_PIN";

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

export const searchPins = (query) => async (dispatch) => {
  const response = await unsplashService.search({ query, per_page: 30 });
  const photoUrls = response.data.results.map((photo) => photo.urls.raw);
  dispatch({
    type: SET_FEED,
    photoUrls: photoUrls,
  });
};

// export const createCustomPin = ({ userId, photoUrl, title, description }) => async (dispatch) => {
//   try {
//     const response = await userService.createCustomPin({ userId, photoUrl, title, description });
//     dispatch({
//       type: CREATE_CUSTOM_PIN,
//       pin: response.data, // This should include at least { photoUrl, title, description }
//     });
//   } catch (error) {
//     console.error("Error creating custom pin:", error);
//     // You might want to dispatch an error action here
//   }
// };

export const getRandomPins = () => async (dispatch) => {
  const response = await unsplashService.random({ count: 50 });
  const photoUrls = response.data.map((photo) => photo.urls.raw);
  dispatch({
    type: SET_FEED,
    photoUrls: photoUrls,
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

export const savePin =
  ({ userId, photoUrl }) =>
  async (dispatch) => {
    await userService.savePin({ userId, photoUrl });
    dispatch({
      type: SAVE_PIN,
      photoUrl: photoUrl,
    });
  };


  // actions/pin.js
  export const updatePassword = ({ userId, currentPassword, newPassword }) => async (dispatch) => {
    try {
      // Call your API to update the password
      const response = await userService.updateUserPassword(userId, currentPassword, newPassword);
  
      // Handle success (you may want to dispatch some action for updating the session)
      return response;
    } catch (error) {
      // Handle error
      throw error;
    }
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
