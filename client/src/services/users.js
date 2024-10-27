import axios from "axios";

export const instance = axios.create({
  baseURL: "/api/users",
});

export const signup = async (userData) => {
  return await instance.post("/signup", userData);
};

export const login = async (userData) => {
  const response = await instance.post("/login", userData);
  console.log('response is:', response);
  const { token, user } = response.data;

  console.log('data is:', response.data.userId);

  localStorage.setItem('userId', response.data.userId);
  return await instance.post("/login", userData);
};
export const forgot = async (userData) => {
  return await instance.post("/forgot", userData);
};

export const updateUserPassword = async (userId, currentPassword, newPassword) => {
  return await instance.put(`/update-password`, { userId, currentPassword, newPassword });
};

export const getProfile = async (userId) => {
  return await instance.get(`/${userId}`);
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

