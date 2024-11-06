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
