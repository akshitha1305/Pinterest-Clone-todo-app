import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

// import { getSavedPins, getRandomPins } from "../actions/pin";
import NavBar from "../components/NavBar";
import PinGrid from "../components/PinGrid";
import { getSavedPins, getLikedPins, getRandomPins } from "../actions/pin";

// const Home = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.session.user);
//   const userId = user.id;

//   const { feed, saved } = useSelector((state) => state.pin);

//   useEffect(() => {
//     dispatch(getSavedPins({ userId, setAsFeed: false }));
//     dispatch(getRandomPins());
//   }, [dispatch, userId]);

//   return (
//     <div>
//       <NavBar />
//       <PinGrid userId={userId} pins={feed} savedPins={saved} />
//     </div>
//   );
// };


// const Home = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.session.user);
//   const userId = user.id;

//   const { feed, saved, liked } = useSelector((state) => state.pin); // Add liked state

//   useEffect(() => {
//     dispatch(getSavedPins({ userId, setAsFeed: false }));
//     dispatch(getLikedPins({ userId, setAsFeed: false })); // Fetch liked pins
//     dispatch(getRandomPins());
//   }, [dispatch, userId]);

//   return (
//     <div>
//       <NavBar />
//       <PinGrid userId={userId} pins={feed} savedPins={saved} likedPins={liked} /> {/* Pass likedPins to PinGrid */}
//     </div>
//   );
// };

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;

  const { feed, saved, liked } = useSelector((state) => state.pin);

  useEffect(() => {
    dispatch(getSavedPins({ userId, setAsFeed: false }));
    dispatch(getLikedPins({ userId, setAsFeed: false }));
    dispatch(getRandomPins());
  }, [dispatch, userId]);

  return (
    <div>
      <NavBar />
      <PinGrid userId={userId} pins={feed} savedPins={saved} likedPins={liked} />
    </div>
  );
};

export default Home;

