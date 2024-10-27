import React, { useState } from "react";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import "./Pin.css";
import { savePin, deleteSavedPin } from "../actions/pin";
import { followUser, unfollowUser, checkIfFollowing } from '../services/users';

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

const SaveButton = styled("button")`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${props => (props.isSaved ? "#e60023" : "#fff")}; /* Pinterest red when saved */
  color: ${props => (props.isSaved ? "#fff" : "#111")}; /* White text if saved */
  border: none;
  border-radius: 24px;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => (props.isSaved ? "#cc0020" : "#f0f0f0")};
  }
`;

const LikeButton = styled("button")`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${props => (props.isLiked ? "#ff4757" : "#fff")}; /* Red when liked */
  color: ${props => (props.isLiked ? "#fff" : "#111")}; /* White text if liked */
  border: none;
  border-radius: 24px;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => (props.isLiked ? "#e84141" : "#f0f0f0")}; /* Darker red on hover if liked */
  }
`;

const IconButton = styled("button")`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  border: none;
  padding: 8px;
  margin: 0 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  // &:hover {
  //   background-color: #f0f0f0;
  // }

   &:hover {
    background-color: ${props => (props.isLiked ? "#e84141" : "#f0f0f0")}; /* Darker red on hover if liked */
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const MoreMenu = styled("div")`
  position: absolute;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  top: 30px;
  right: 0;
  width: 220px;
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 999;
`;

const MenuItem = styled("div")`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const UsernameContainer = styled("div")`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  color: white;  /* White text to contrast with the image */
`;

const FollowButton = styled("button")`
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const Pin = ({ userId, username, pin_owner_id, title, photoUrl, isSaved, isLiked }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for following
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch whether the logged-in user is following the pin owner
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const isFollowingResponse = await checkIfFollowing(pin_owner_id);
        setIsFollowing(isFollowingResponse);
      } catch (error) {
        console.error("Failed to check follow status:", error);
      }
    };

    fetchFollowStatus();
  }, [pin_owner_id]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Save pin logic
  const handleOnClick = (event) => {
    event.preventDefault();
    isSaved
      ? dispatch(deleteSavedPin({ userId, photoUrl }))
      : dispatch(savePin({ userId, photoUrl }));
  };

  // Like/Unlike logic
  const handleLike = (event) => {
    event.preventDefault();
    if (isLiked) {
      dispatch(unlikePin({ userId, photoUrl }));
    } else {
      dispatch(likePin({ userId, photoUrl }));
    }
  };


    // Download Pin using blob
    const handleDownload = async () => {
      try {
        const response = await fetch(photoUrl);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = title || "pin-image"; // Set download file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
      } catch (error) {
        console.error("Failed to download image", error);
      }
    };
// Function to handle follow/unfollow
const handleFollow = async () => {
  try {
    if (isFollowing) {
      // Call the unfollow API if the user is currently being followed
      await unfollowUser(pin_owner_id);
    } else {
      // Call the follow API if the user is not being followed yet
      await followUser(pin_owner_id);
    }
    setIsFollowing(!isFollowing); // Toggle follow state
  } catch (error) {
    console.error('Failed to follow/unfollow user:', error);
  }
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
            <img src={`${photoUrl}&w=236`}  alt={title} />
          </div>
          {/* Show the Save button only on hover */}
          {showButton && (
            <SaveButton
            onClick={handleOnClick}
            isSaved={isSaved}
          >
            {isSaved ? "Saved" : "Save"}
          </SaveButton>
        )}
      </div>

      {/* Modal Content */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        BackdropComponent={Backdrop}
      >
        <div className="dialog__container">
        <div className="modal__image-container" style={{ position: "relative" }}>
            {/* Modal image */}
            <img src={`${photoUrl}&w=400`} alt={title} style={{ maxWidth: "100%", borderRadius: "8px" }} />

            {/* Save button in top-right corner of modal image */}
            <SaveButton
              onClick={handleOnClick}
              isSaved={isSaved}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              {isSaved ? "Saved" : "Save"}
             
            </SaveButton> 
  
            {/* Like button in top-left corner of modal image */}
            <LikeButton
              onClick={handleLike}
              isLiked={isLiked} // Change to lowercase
              // style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              {isLiked ? "Liked" : "Like"}
            </LikeButton>

             {/* Action Buttons */}
             <div className="icon-buttons__container" style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex" }}>
              <IconButton aria-label="More Options" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zm0 4.5a.75.75 0 100-1.5.75.75 0 000 1.5zm0 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                </svg>
              </IconButton>

              {/* Dropdown Menu */}
              <MoreMenu open={isMenuOpen}>
                <MenuItem onClick={handleHidePin}>Hide Pin</MenuItem>
                <MenuItem onClick={handleDownload}>Download Image</MenuItem>
                <MenuItem onClick={handleReportPin}>Report Pin</MenuItem>
              </MoreMenu>
            </div>

           {/* Username and Follow Button at Bottom-Left inside modal */}
           <UsernameContainer>
              <strong>{username}</strong>
              <FollowButton onClick={handleFollow}> {isFollowing ? 'Unfollow' : 'Follow'}</FollowButton>
            </UsernameContainer>
            
            </div>  
        </div>
      </Dialog>
    </div>
  );
};

export default Pin;
