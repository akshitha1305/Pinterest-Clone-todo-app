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

export const ModalContent = styled("div")`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const ModalTitle = styled("h2")`
  font-size: 18px;
  font-weight: bold;
`;

export const CloseButton = styled("button")`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const UserList = styled("ul")`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const UserListItem = styled("li")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const UserInfo = styled("div")`
  display: flex;
  align-items: center;
`;

export const UserAvatar = styled("img")`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export const UserName = styled("span")`
  font-size: 16px;
  font-weight: 500;
`;

export const UnfollowButton = styled("button")`
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

export const TabContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;

export const TabButton = styled("button")`
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
