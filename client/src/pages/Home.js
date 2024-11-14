import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

// import { getSavedPins, getRandomPins } from "../actions/pin";
import NavBar from "../components/NavBar";
import PinGrid from "../components/PinGrid";
import { getSavedPins, getLikedPins, getRandomPins, getHiddenPins } from "../actions/pin";


const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;

  const { feed, saved, liked, hidden } = useSelector((state) => state.pin);

  useEffect(() => {
    dispatch(getSavedPins({ userId, setAsFeed: false }));
    dispatch(getLikedPins({ userId, setAsFeed: false }));
    dispatch(getHiddenPins({ userId, setAsFeed: false }));
    dispatch(getRandomPins());
  }, [dispatch, userId]);

  return (
    <div>
      <NavBar />
      <PinGrid userId={userId} pins={feed} savedPins={saved} likedPins={liked} hiddenPins={hidden} />
    </div>
  );
};

export default Home;

