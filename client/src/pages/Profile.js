import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPins,  getFollowers, getFollowing  } from "../actions/pin";
import NavBar from "../components/NavBar";
import PinGridProfile from "../components/PinGridProfile";
import ProfileHeader from "../components/ProfileHeader";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";
import { followUser, unfollowUser } from '../services/users'; // Unfollow user service

const Dialog = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const ModalTitle = styled("h2")`
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled("button")`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const UserList = styled("ul")`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserListItem = styled("li")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const UserAvatar = styled("img")`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const UserInfo = styled("div")`
  display: flex;
  align-items: center;
`;

const UserName = styled("span")`
  font-size: 16px;
  font-weight: 500;
`;

const UnfollowButton = styled("button")`
  background-color: black;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;


  const [localFollowing, setLocalFollowing] = useState([]);

  const { followers = [], following = [] } = useSelector((state) => state.pin); // Default to empty arrays

  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getSavedPins({ userId, setAsFeed: true }));
    dispatch(getFollowers(userId)); // Fetch followers
    dispatch(getFollowing(userId)); // Fetch following
  }, [dispatch, userId]);
  
  useEffect(() => {
    // Update local state when following changes in Redux
    setLocalFollowing(following);
  }, [following]);

  const {saved } = useSelector((state) => state.pin);


  // Function to handle unfollow
  const handleUnfollow = async (followedUserId) => {
    try {
      // Call the unfollow API
      await unfollowUser(followedUserId);

      // Update the local state to remove the unfollowed user from the UI
      setLocalFollowing(localFollowing.filter(user => user.id !== followedUserId));
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <ProfileHeader  user={user}
        followersCount={followers.length}  // Now followers will always be an array
        followingCount={localFollowing.length}  // Use local state for following count
        onFollowersClick={() => setFollowersModalOpen(true)}
        onFollowingClick={() => setFollowingModalOpen(true)}
      />
      {saved.length
        ? <PinGrid userId={userId} photoUrls={saved} savedPins={saved} />
        : <h3>No pins saved yet</h3>
      }
       {/* Followers Modal */}
       <Dialog
        open={isFollowersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        BackdropComponent={Backdrop}
      >
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Followers</ModalTitle>
            <CloseButton onClick={() => setFollowersModalOpen(false)}>×</CloseButton>
          </ModalHeader>
          <UserList>
            {followers.map((follower) => (
              <UserListItem key={follower.id}>
                <UserInfo>
                  <UserAvatar src="https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-5.jpg?w=740" />
                  <UserName>{follower.username}</UserName>
                </UserInfo>
              </UserListItem>
            ))}
          </UserList>
        </ModalContent>
      </Dialog>

      {/* Following Modal */}
      <Dialog
        open={isFollowingModalOpen}
        onClose={() => setFollowingModalOpen(false)}
        BackdropComponent={Backdrop}
      >
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Following</ModalTitle>
            <CloseButton onClick={() => setFollowingModalOpen(false)}>×</CloseButton>
          </ModalHeader>
          <UserList>
            {localFollowing.map((followedUser) => (
              <UserListItem key={followedUser.id}>
                <UserInfo>
                  <UserAvatar src="https://img.freepik.com/premium-vector/flat-avatar-icon-png-transparent-vector-layer-illustration_1226483-1824.jpg?w=740" />
                  <UserName>{followedUser.username}</UserName>
                </UserInfo>
                <UnfollowButton onClick={() => handleUnfollow(followedUser.id)}>
                  Unfollow
                </UnfollowButton>
              </UserListItem>
            ))}
          </UserList>
        </ModalContent>
      </Dialog>
    </div>
  );
};

export default Profile;
