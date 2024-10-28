import React from "react";
import Masonry from "react-masonry-css";
import "./PinGrid.css";
import Pin from "./Pin";

//const PinGrid = ({ userId, photoUrls, savedPins = [] }) => {

  //const breakpoints = { default: 4 };
  //const baseWidth = 503;
  //const increment = 252;
  //for (let i = 0; i < 30; i++) {
   // breakpoints[baseWidth + increment * i] = i + 1;
  //}

//   return (
//     <div>
//       {photoUrls.length > 0 && (
//         <Masonry breakpointCols={breakpoints} className="masonry-grid">
//           {photoUrls.map((photoUrl) => (
//             <Pin
//               key={photoUrl} // Use photoUrl as a unique key
//               userId={userId}
//               photoUrl={photoUrl}
//           LikedsSaved={savedPins.includes(photoUrl)} // Check if the pin is saved
//             />
//           ))}
//         </Masonry>
//       )}
//     </div>
//   );
// };


const PinGrid = ({ userId, pins = [], savedPins = [], likedPins = [] }) => {

  const breakpoints = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1
  };

  return (
    <div>
      {pins.length > 0 ? (
        <Masonry breakpointCols={breakpoints} className="masonry-grid">
          {pins.map((pin) => (
            <Pin
              key={pin.imageUrl}
              userId={userId}
              photoUrl={pin.imageUrl}
              username={pin.username}
              pin_owner_id={pin.pin_owner_id}
              name={pin.name}
              title={pin.title}
              isSaved={savedPins.includes(pin.imageUrl)}
              isLiked={likedPins.includes(pin.imageUrl)} // Check if pin is liked
            />
          ))}
        </Masonry>
      ) : (
        <p>No pins available</p> // Fallback message for empty pins
      )}
    </div>
  );
};

export default PinGrid;
