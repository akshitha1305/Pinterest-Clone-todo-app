import "./ProfileHeader.css";
import { Link } from "react-router-dom";

import React, { useState } from 'react';
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";

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

const ProfileHeader = ({ user, followersCount, followingCount, onFollowersClick, onFollowingClick}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const profileUrl = `${window.location.origin}${location.pathname}/${user.username}`;
  const customMessage = `Please follow my profile at ${profileUrl}`;

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const followingStatus = await checkIfFollowing(user.id); // Assuming `user.id` is the profile owner's ID
        setIsFollowing(followingStatus);
      } catch (error) {
        console.error("Failed to check following status:", error);
      }
    };

    checkFollowingStatus();
  }, [user.id]);
  
  return (
    <div className="header__container">
      <div className="avatar__wrapper">
        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      </div>
      <h1>{user.name}</h1>
      <span className="username">{user.username}</span>
      <div>
        <div>
          <a href="#" onClick={(e) => { e.preventDefault(); onFollowersClick(); }} style={{ cursor: 'pointer', textDecoration: 'none' }}>
            Followers: {followersCount}
          </a>
          <a href="#" onClick={onFollowingClick} style={{ cursor: 'pointer', textDecoration: 'none', marginLeft: '10px' }}>
            Following: {followingCount}
          </a>
        </div>
      </div>
      <Link to="/change-password">Change Password</Link>
      <hr></hr>
      <h2>My Saved Pins</h2>
    </div>
  );
};

export default ProfileHeader;
