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


// const PinGrid = ({ userId, pins = [], savedPins = [] }) => {
//   console.log('Pins in PinGrid:', pins); // Log pins in PinGrid component

//   const breakpoints = {
//     default: 4,
//     1200: 3,
//     900: 2,
//     600: 1
//   };

//   return (
//     <div>
//       {pins.length > 0 ? (
//         <Masonry breakpointCols={breakpoints} className="masonry-grid">
//           {pins.map((pin) => (
//             <Pin
//               key={pin.imageUrl}
//               userId={userId}
//               photoUrl={pin.imageUrl}
//               username={pin.username}
//               pin_owner_id={pin.pin_owner_id}
//               name={pin.name}
//               title={pin.title}
//               isSaved={savedPins.includes(pin.imageUrl)}
//             />
//           ))}
//         </Masonry>
//       ) : (
//         <p>No pins available</p> // Fallback message for empty pins
//       )}
//     </div>
//   );
// };

export default PinGridProfile;

