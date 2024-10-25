import React, { useState } from "react";

import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";

import "./Pin.css";
import { savePin, deleteSavedPin } from "../actions/pin";

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

const Pin = ({ userId, photoUrl, isSaved }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [showButton, setShowButton] = useState(false);

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

  return (
    <div>
      <div className="pin__wrapper">
        <div
          className="pin__container"
          onMouseOver={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
          title={title} 
        >
          <div onClick={handleOpenDialog}>
            <img src={`${photoUrl}&w=236`} alt="" />
          </div>
          {showButton && (
            <SaveButton userId={userId} photoUrl={photoUrl} isSaved={isSaved} />
          )}
        </div>
      </div>
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

            </div>  
        </div>
      </Dialog>
    </div>
  );
};

export default Pin;
