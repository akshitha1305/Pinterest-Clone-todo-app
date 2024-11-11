import axios from "axios";

export const instance = axios.create({
  baseURL: "/api/users",
});

// User authentication
export const signup = async (userData) => {
  return await instance.post("/signup", userData);
};

export const login = async (userData) => {
  const response = await instance.post("/login", userData);
  const { token, user } = response.data;

  localStorage.setItem('userId', response.data.userId);
  return await instance.post("/login", userData);
};

export const forgot = async (userData) => {
  return await instance.post("/forgot", userData);
};

// export const updateUserPassword = async (userId, currentPassword, newPassword) => {
//   return await instance.put(`/update-password`, { userId, currentPassword, newPassword });
// };

// User profile and saved pins
export const getProfile = async (userId) => {
  return await instance.get(`/${userId}`);
};

export const getUserByUsername = async (username) => {
  const response = await instance.get(`/user/${username}`);
  return response.data;
};

export const savePin = async ({ userId, photoUrl }) => {
  return await instance.put(`/${userId}/save-pin`, { photoUrl });
};

export const likePin = async ({ userId, photoUrl }) => {
  return await instance.put(`/${userId}/like-pin`, { photoUrl });
};

export const unlikePin = async ({ userId, photoUrl }) => {
  return await instance.put(`/${userId}/unlike-pin`, { photoUrl });
};

export const deleteSavedPin = async ({ userId, photoUrl }) => {
  return await instance.put(`/${userId}/delete-pin`, { photoUrl });
};

// Add a new API call for creating a custom pin
export const createPin = async ({ userId, title, imageUrl }) => {
  const user_id = localStorage.getItem('userId');
  return await instance.post(`/${user_id}/create-pin`, {
    title,
    imageUrl
  });
};

export const getRandomPins = async () => {
  return await instance.get("/get/random-pins"); // Assuming you have an endpoint like /api/random-pins
};
//Get my created pins
export const getMyCreatedPins = async (userId) => {
  const user = userId;
  const pin_owner_id = user.userId;
  //const pin_owner_id = localStorage.getItem('userId');

  return await instance.get("/get/pins/user-pins", {
    params: { pin_owner_id }
  });
}
export const editPin = async (pinId, updatedData) => {
  return await instance.put(`/pin/pin-edit/${pinId}`, updatedData);
};

export const deletePin = async (pinId) => {
  return await instance.delete(`/pin/pin-delete/${pinId}`);
};



// Follow / Unfollow
export const checkIfFollowing = async (pin_owner_id) => {
  const loggedInUserId = localStorage.getItem('userId');
  const response = await instance.post(`/check-follow/user`, { loggedInUserId, pin_owner_id });
  return response.data.isFollowing; // Assuming the response contains a boolean `isFollowing`
};

// Follow a user
export const followUser = async (userIdToFollow) => {
  const loggedInUserId = localStorage.getItem('userId');
  return await instance.post(`/follow/user`, { userIdToFollow, loggedInUserId });
};

// Unfollow a user
export const unfollowUser = async (userIdToUnfollow) => {
  const loggedInUserId = localStorage.getItem('userId');
  return await instance.post(`/unfollow/user`, { userIdToUnfollow, loggedInUserId });
};

// Get followers of a user
export const getFollowers = async (userId) => {
  return await instance.get(`/${userId}/followers`);
};

// Get users the logged-in user is following
export const getFollowing = async (userId) => {
  return await instance.get(`/${userId}/following`);
};

// Add a comment to a specific pin
export const addComment = async (commentData) => {
  try {
    const response = await instance.post(`/pin/add-comment`, commentData);
    return response.data; // Return the added comment
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error;
  }
};

// Function to get comments for a specific pin
export const getComments = async (pinId) => {
  try {
    const response = await instance.get(`/pin/${pinId}/comments`);
    return response.data; // Return the array of comments
  } catch (error) {
    console.error("Failed to get comments:", error);
    throw error;
  }
};
// Delete a comment from a specific pin
export const deleteComment = async (commentId) => {
  return await instance.delete(`/pin/comment/${commentId}/deleted`);
};

// Like or unlike a comment
export const likeComment = async (commentId, userId) => {
  const response =  await instance.post(`/pin/comment/${commentId}/like`, { userId });
  return response.data;
};

 //Hide pin
export const hidePin = async (pinId) => {
  const response = await instance.put(`/pin/hide/${pinId}`, { pinId });
  return response.data;
};
//unhidePin
export const unhidePin = async (pinId) => {
  const response = await instance.put(`/pin/unhide/${pinId}`, { pinId });
  return response.data;
};

// Change password
export const updateUserPassword = async (userId, currentPassword, newPassword) => {
  return await instance.put(`/update/password`, { userId, currentPassword, newPassword });
};

export const resetPassword = async ({ token, newPassword, confirmPassword }) => {
  return await instance.post("/reset/password", { token, newPassword, confirmPassword });
};


