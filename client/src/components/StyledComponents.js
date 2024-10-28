import { styled } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";

export const Dialog = styled(ModalUnstyled)`
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

export const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export const SaveButton = styled("button")`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${props => (props.isSaved ? "#e60023" : "#fff")};
  color: ${props => (props.isSaved ? "#fff" : "#111")};
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

export const LikeButton = styled("button")`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${props => (props.isLiked ? "#ff4757" : "#fff")};
  color: ${props => (props.isLiked ? "#fff" : "#111")};
  border: none;
  border-radius: 24px;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => (props.isLiked ? "#e84141" : "#f0f0f0")};
  }
`;

export const IconButton = styled("button")`
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

  &:hover {
    background-color: ${props => (props.isLiked ? "#e84141" : "#f0f0f0")};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const MoreMenu = styled("div")`
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

export const MenuItem = styled("div")`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const UsernameContainer = styled("div")`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  color: white;
`;

export const FollowButton = styled("button")`
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

export const ModalContainer = styled("div")`
  display: flex;
  background: white;
  border-radius: 32px;
  max-width: 1016px;
  max-height: 877px;
  width: 100%;
  margin: 20px;
`;

export const ImageSection = styled("div")`
  flex: 1;
  min-width: 50%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 32px 0 0 32px;
  }
`;

export const ContentSection = styled("div")`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  max-height: 877px;
  overflow-y: auto;
`;

export const StatsSection = styled("div")`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #111;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CommentsSection = styled("div")`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 24px;
`;

export const CommentBox = styled("div")`
  background: #f0f0f0;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  
  .comment-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;   
    
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    
    .username {
      font-weight: 600;
    }
  }
`;

export const CommentInput = styled("div")`
  position: sticky;
  bottom: 0;
  background: white;
  padding: 16px 0;
  border-top: 1px solid #efefef;
  
  .input-container {
    display: flex;
    gap: 12px;
    align-items: center;
    
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    
    input {
      flex: 1;
      border: none;
      background: #f0f0f0;
      border-radius: 24px;
      padding: 12px 16px;
      font-size: 16px;
      
      &:focus {
        outline: none;
        background: #e9e9e9;
      }
    }
  }
`;

export const LikersModal = styled(Dialog)`
  .content {
    background: white;
    border-radius: 16px;
    padding: 24px;
    max-width: 400px;
    width: 400px;
    max-height: 600px;
    overflow-y: auto;
    
    h3 {
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #efefef;
    }
  }
`;

export const UserListItem = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

export const UserInfo = styled("div")`
  display: flex;
  align-items: center;
`;

export const UserAvatar = styled("img")`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

export const UserName = styled("span")`
  font-size: 16px;
  font-weight: 500;
`;


// export const UserAvatar = styled("img")`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%; // Make it round
//   object-fit: cover; // Ensures it keeps a good proportion
//   margin-right: 0px;
// `;
