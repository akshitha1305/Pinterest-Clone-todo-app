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