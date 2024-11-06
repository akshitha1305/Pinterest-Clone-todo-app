import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSavedPins, getFollowers, getFollowing, getMyCreatedPins } from "../actions/pin";
import { getUserByUsername } from "../services/users";
import NavBar from "../components/NavBar";
import PinGridProfile from "../components/PinGridProfile";
import PinGridCreated from "../components/PinGridCreated";
import ProfileHeader from "../components/ProfileHeader";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";
import { followUser, unfollowUser } from "../services/users";

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

const UserInfo = styled("div")`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled("img")`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
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

const TabContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;

const TabButton = styled("button")`
  background-color: ${(props) => (props.active ? "#000" : "#ddd")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? "#333" : "#bbb")};
  }
`;

const ProfileUser = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedInUser = useSelector((state) => state.session.user);
  const isOwnProfile = loggedInUser.username === username;

  const [user, setUser] = useState(isOwnProfile ? loggedInUser : null);
  const [localFollowing, setLocalFollowing] = useState([]);
  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("saved");

  const { saved, followers = [], following = [], created = [] } = useSelector(
    (state) => state.pin
  );

  useEffect(() => {
    // Fetch profile data if viewing another user's profile
    const fetchUserData = async () => {
      if (!isOwnProfile) {
        try {
          const fetchedUser = await getUserByUsername(username);
          if (fetchedUser) {
            setUser(fetchedUser);
            dispatch(getSavedPins({ userId: fetchedUser.id, setAsFeed: true }));
            dispatch(getMyCreatedPins(fetchedUser.id));
            dispatch(getFollowers(fetchedUser.id));
            dispatch(getFollowing(fetchedUser.id));
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        // Load logged-in user's data if viewing own profile
        dispatch(getSavedPins({ userId: loggedInUser.id, setAsFeed: true }));
        dispatch(getMyCreatedPins(loggedInUser.id));
        dispatch(getFollowers(loggedInUser.id));
        dispatch(getFollowing(loggedInUser.id));
      }
    };

    fetchUserData();
  }, [dispatch, username, isOwnProfile, loggedInUser]);

  useEffect(() => {
    setLocalFollowing(following);
  }, [following]);

  const handleUnfollow = async (followedUserId) => {
    try {
      await unfollowUser(followedUserId);
      setLocalFollowing(localFollowing.filter((user) => user.id !== followedUserId));
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <NavBar />
      <ProfileHeader
        user={user}
        followersCount={followers.length}
        followingCount={localFollowing.length}
        onFollowersClick={() => setFollowersModalOpen(true)}
        onFollowingClick={() => setFollowingModalOpen(true)}
      />

      {/* Tabs */}
      <TabContainer>
        <TabButton
          active={activeTab === "saved"}
          onClick={() => setActiveTab("saved")}
        >
          Saved Pins
        </TabButton>
        <TabButton
          active={activeTab === "created"}
          onClick={() => setActiveTab("created")}
        >
          Created Pins
        </TabButton>
      </TabContainer>

      {/* Tab Content */}
      {activeTab === "saved" ? (
        <div>
          {saved.length ? (
            <PinGridProfile userId={user.id} photoUrls={saved} savedPins={saved} />
          ) : (
            <h3>No pins saved yet</h3>
          )}
        </div>
      ) : (
        <div>
          {created.length ? (
            <PinGridCreated pins={created} />
          ) : (
            <h3>No created pins yet</h3>
          )}
        </div>
      )}

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
                  <UserAvatar src={follower.avatarUrl || "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-5.jpg?w=740"} />
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
                  <UserAvatar src={followedUser.avatarUrl || "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-5.jpg?w=740"} />
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

export default ProfileUser;
