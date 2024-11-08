import React from "react";
import Masonry from "react-masonry-css";
import "./PinGrid.css";
import Pin from "./Pin";

const PinGridProfile = ({ userId, photoUrls = [], savedPins = [] }) => {
  // Simpler breakpoints
  const breakpoints = {
    default: 4, // 4 columns by default
    1200: 3,    // 3 columns for screens <= 1200px
    900: 2,     // 2 columns for screens <= 900px
    600: 1      // 1 column for screens <= 600px
  };

  return (
    <div>
      {photoUrls.length > 0 && (
        <Masonry breakpointCols={breakpoints} className="masonry-grid">
          {photoUrls.map((photoUrl) => (
            <Pin
              key={photoUrl} // Use photoUrl as a unique key
              userId={userId}
              photoUrl={photoUrl}
              isSaved={savedPins.includes(photoUrl)} // Check if the pin is saved
            />
          ))}
        </Masonry>
      )}
    </div>
  );
};


export default PinGridProfile;

