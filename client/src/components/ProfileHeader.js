import "./ProfileHeader.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { followUser, unfollowUser, checkIfFollowing } from '../services/users';
import {FollowButton} from "./StyledComponents";

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

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(user.id);
      } else {
        await followUser(user.id);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error);
    }
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(customMessage)
      .then(() => alert("Profile link with message copied to clipboard"))
      .catch((error) => console.error("Failed to copy link:", error));
  };

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(customMessage)}`;
    window.open(url, "_blank");
  };

  const handleShareMessenger = () => {
    const url = `fb-messenger://share?link=${encodeURIComponent(profileUrl)}&quote=${encodeURIComponent(customMessage)}`;
    window.open(url, "_blank");
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}&quote=${encodeURIComponent(customMessage)}`;
    window.open(url, "_blank");
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(customMessage)}`;
    window.open(url, "_blank");
  };

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
      <div className="profile-links">
      <Link to="/change-password">Change Password</Link>

      <button onClick={() => setShowShareOptions(!showShareOptions)} className="share-profile-button">Share Profile</button>
        <FollowButton onClick={handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </FollowButton>
      </div>

      {/* Share Options Popup */}
      {showShareOptions && (
        <div className="share-options">
          <h4>Share</h4>
          <div className="share-icons">
            <button onClick={handleCopyLink} className="share-icon">
              <i className="fas fa-link"></i>
              <span>Copy link</span>
            </button>
            <button onClick={handleShareWhatsApp} className="share-icon">
              <i className="fab fa-whatsapp"></i>
              <span>WhatsApp</span>
            </button>
            <button onClick={handleShareMessenger} className="share-icon">
              <i className="fab fa-facebook-messenger"></i>
              <span>Messenger</span>
            </button>
            <button onClick={handleShareFacebook} className="share-icon">
              <i className="fab fa-facebook"></i>
              <span>Facebook</span>
            </button>
            <button onClick={handleShareTwitter} className="share-icon">
              <i className="fab fa-twitter"></i>
              <span>X</span>
            </button>
          </div>
        </div>
      )}
      <hr></hr>
    </div>
  );
};

export default ProfileHeader;
