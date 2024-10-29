import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { savePin, deleteSavedPin, likePin, unlikePin } from "../actions/pin";
import { followUser, unfollowUser, checkIfFollowing, addComment, getComments } from '../services/users';
import {
  Dialog,
  Backdrop,
  SaveButton,
  LikeButton,
  IconButton,
  MoreMenu,
  MenuItem,
  UsernameContainer,
  FollowButton,
  ModalContainer,
  ImageSection,
  ContentSection,
  StatsSection,
  CommentsSection,
  CommentBox,
  CommentInput,
  LikersModal,
  UserAvatar,
  UserListItem,
  UserInfo,
  UserName
} from "./StyledComponents";
import "./Pin.css";
import "../components/PinModal.css";

const Pin = ({ userId, auth_username, username, totalLikes, likers, pin_owner_id, title, photoUrl, pin_id, isSaved, isLiked }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [setTotalLikes] = useState(0);
  const [setLikers] = useState([]);

  // Function to fetch comments for the pin
  const fetchComments = async () => {
    try {
      const data = await getComments(pin_id);
      setComments(data); // Load comments into local state
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    fetchComments(); // Fetch comments when the modal opens
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleOnClick = (event) => {
    event.preventDefault();
    isSaved
      ? dispatch(deleteSavedPin({ userId, photoUrl }))
      : dispatch(savePin({ userId, photoUrl }));
  };

  const handleLike = (event) => {
    event.preventDefault();
    isLiked
      ? dispatch(unlikePin({ userId, photoUrl }))
      : dispatch(likePin({ userId, photoUrl }));
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = title || "pin-image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download image", error);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(pin_owner_id);
      } else {
        await followUser(pin_owner_id);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      pin_id,
      userId,
      auth_username,
      avatarUrl: "https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-5.jpg?w=740",
      text: newComment
    };

    try {
      await addComment(newCommentObj); // Save the new comment to the backend
      setNewComment(""); // Clear the input first
      await fetchComments(); // Refresh comments after adding a new one
    } catch (error) {
      console.error("Failed to save comment:", error);
    }
  };

  // Helper function to format the time ago in a human-readable way
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const timeDifference = now - new Date(timestamp);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="pin__wrapper">
      <div
        className="pin__container"
        onMouseOver={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        title={title}
      >
        <div onClick={handleOpenDialog}>
          <img src={`${photoUrl}&w=236`} alt={title} />
        </div>

        {showButton && (
          <SaveButton onClick={handleOnClick} isSaved={isSaved}>
            {isSaved ? "Saved" : "Save"}
          </SaveButton>
        )}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} BackdropComponent={Backdrop}>
        <ModalContainer>
          <ImageSection>
            <img src={`${photoUrl}&w=508`} alt={title} />
            <SaveButton onClick={handleOnClick} isSaved={isSaved}>
              {isSaved ? "Saved" : "Save"}
            </SaveButton>
            <LikeButton onClick={handleLike} isLiked={isLiked}>
              {isLiked ? "Liked" : "Like"}
            </LikeButton>
            <div className="icon-buttons__container" style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex" }}>
              <IconButton aria-label="More Options" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zm0 4.5a.75.75 0 100-1.5.75.75 0 000 1.5zm0 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                </svg>
              </IconButton>

              <MoreMenu open={isMenuOpen}>
                <MenuItem onClick={() => console.log("Hide Pin clicked")}>Hide Pin</MenuItem>
                <MenuItem onClick={handleDownload}>Download Image</MenuItem>
                <MenuItem onClick={() => console.log("Report Pin clicked")}>Report Pin</MenuItem>
              </MoreMenu>
            </div>

            <UsernameContainer>
              <strong>{username}</strong>
              <FollowButton onClick={handleFollow}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </FollowButton>
            </UsernameContainer>
          </ImageSection>

          <ContentSection>
            <StatsSection>
              <button onClick={() => setShowLikers(true)}>
                <span>{totalLikes}</span>
                <span>Likes</span>
              </button>
            </StatsSection>

            <CommentsSection>
              {comments.length > 0 ? (
                comments.map(comment => (
                  <CommentBox key={comment._id}>
                    <div className="comment-header">
                      <img src='https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-5.jpg?w=740' />
                      <span className="username">{comment.username}</span>
                      {/* <span className="timestamp">{new Date(comment.timestamp).toLocaleString()}</span> */}
                      <span className="timestamp">{formatTimeAgo(comment.timestamp)}</span>

                    </div>
                    <div className="comment-text">{comment.text}</div>
                  </CommentBox>
                ))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
            </CommentsSection>

            <CommentInput>
              <form onSubmit={handleComment}>
                <div className="input-container">
                  <img src="https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-5.jpg?w=740" alt="Your avatar" />
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
              </form>
            </CommentInput>
          </ContentSection>
        </ModalContainer>
      </Dialog>

      {/* Likers Modal */}
      <LikersModal open={showLikers} onClose={() => setShowLikers(false)} BackdropComponent={Backdrop}>
        <div className="content">
          <h3>Liked by</h3>
          {likers && likers.length > 0 ? (
            likers.map(user => (
              <UserListItem key={user.id}>
                <UserInfo>
                  <UserAvatar src='https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-5.jpg?w=740' />
                  <UserName>{user.username}</UserName>
                </UserInfo>
              </UserListItem>
            ))
          ) : (
            <p>No users have liked this pin yet.</p>
          )}
        </div>
      </LikersModal>
    </div>
  );
};

export default Pin;
