import React from "react";
import Masonry from "react-masonry-css";
import "./PinGrid.css";
import Pin from "./Pin";

const PinGridCreated = ({ userId, pins = [], savedPins = [], likedPins = [] }) => {

  const breakpoints = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1
  };

  const auth_username = localStorage.getItem("authusername");

  return (
    <div>
      {pins.length > 0 ? (
        <Masonry breakpointCols={breakpoints} className="masonry-grid">
          {pins.map((pin) => (
            <Pin
              key={pin.imageUrl}
              userId={userId}
              auth_username={auth_username}
              photoUrl={pin.imageUrl}
              pin_id={pin.pin_id}
              username={pin.username}
              totalLikes={pin.totalLikes}
              likers={pin.likers}
              pin_owner_id={pin.pin_owner_id}
              name={pin.name}
              title={pin.title}
              isSaved={savedPins.includes(pin.imageUrl)}
              isLiked={likedPins.includes(pin.imageUrl)} // Check if pin is liked
            />
          ))}
        </Masonry>
      ) : (
        <p>No pins available</p>
      )}
    </div>
  );
};

export default PinGridCreated;

