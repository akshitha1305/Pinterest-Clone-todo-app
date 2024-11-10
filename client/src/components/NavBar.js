// // import React from "react";

// // import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// // import LogoutIcon from "@mui/icons-material/Logout";
// // import PinterestIcon from "@mui/icons-material/Pinterest";
// // import SearchIcon from "@mui/icons-material/Search";
// // import { useDispatch } from "react-redux";
// // import { Link, NavLink, useNavigate } from "react-router-dom";

// // import "./NavBar.css";
// // import { logout } from "../actions/session";

// // const NavBar = ({ query }) => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleSearch = (event) => {
// //     event.preventDefault();
// //     navigate(`/search/${event.target.query.value}`);
// //   };

// //   const handleLogout = () => dispatch(logout());

// //   return (
// //     <div className="nav-bar">
// //       <div className="nav-bar__icon nav-bar__icon--red">
// //         <Link to="/">
// //           <PinterestIcon />
// //         </Link>
// //       </div>
// //       <div className="nav-bar__link">
// //         <NavLink
// //           to="/"
// //           className={({ isActive }) =>
// //             isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"
// //           }
// //         >
// //           Home
// //         </NavLink>

// //          <NavLink
// //           to="/pin/create"
// //           className={({ isActive }) =>
// //             isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"
// //           }
// //         >
// //           Create
// //         </NavLink>

// //         <NavLink
// //           to="/todo"
// //           className={({ isActive }) =>
// //             isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"
// //           }
// //         >
// //           ToDo
// //         </NavLink>

// //       </div>
// //       <div className="nav-bar__search-box">
// //         <SearchIcon />
// //         <form onSubmit={handleSearch}>
// //           <input
// //             type="text"
// //             placeholder="Search"
// //             name="query"
// //             defaultValue={query || ""}
// //           />
// //           <button type="submit"></button>
// //         </form>
// //       </div>
// //       <div className="nav-bar__icon-group">
// //         <div className="nav-bar__icon nav-bar__icon--gray">
// //           <Link to="/profile">
// //             <AccountCircleIcon />
// //           </Link>
// //         </div>
// //         <div
// //           className="nav-bar__icon nav-bar__icon--gray"
// //           onClick={handleLogout}
// //         >
// //           <LogoutIcon />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NavBar;
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LogoutIcon from "@mui/icons-material/Logout";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import SearchIcon from "@mui/icons-material/Search";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import "./NavBar.css";
// import { logout } from "../actions/session";

// const NavBar = ({ query }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.session.user);

//   const [showMenu, setShowMenu] = useState(false);

//   const handleSearch = (event) => {
//     event.preventDefault();
//     navigate(`/search/${event.target.query.value}`);
//   };

//   const handleLogout = () => dispatch(logout());

//   const toggleMenu = () => setShowMenu(!showMenu);

//   return (
//     <div className="nav-bar">
//       <div className="nav-bar__icon nav-bar__icon--red">
//         <Link to="/">
//           <PinterestIcon />
//         </Link>
//       </div>
//       <div className="nav-bar__link">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"
//           }
//         >
//           Home
//         </NavLink>
//         <NavLink
//           to="/pin/create"
//           className={({ isActive }) =>
//             isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"
//           }
//         >
//           Create
//         </NavLink>
//         <NavLink
//           to="/todo"
//           className={({ isActive }) =>
//             isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"
//           }
//         >
//           ToDo
//         </NavLink>
//       </div>
//       <div className="nav-bar__search-box">
//         <SearchIcon />
//         <form onSubmit={handleSearch}>
//           <input
//             type="text"
//             placeholder="Search"
//             name="query"
//             defaultValue={query || ""}
//           />
//           <button type="submit"></button>
//         </form>
//       </div>
//       <div className="nav-bar__icon-group">
//         <div
//           className="nav-bar__icon nav-bar__icon--gray"
//           onClick={toggleMenu}
//           onMouseEnter={() => setShowMenu(true)}
//           onMouseLeave={() => setShowMenu(false)}
//         >
//           <AccountCircleIcon />
//           {showMenu && (
//             <div className="dropdown-menu">
//               <p>{user.name}</p>
//               <p>{user.username}</p>
//               <div className="dropdown-section">
//                 <button onClick={() => navigate('/profile')}>Profile</button>
//                 <button onClick={() => navigate('/')}>All Pins</button>
//               </div>
//               <div className="dropdown-section">
//                 <button onClick={handleLogout}>Log out</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PinterestIcon from "@mui/icons-material/Pinterest";
import SearchIcon from "@mui/icons-material/Search";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";
import { logout } from "../actions/session";

const NavBar = ({ query }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ users: [], pins: [] });
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.trim()) {
      try {
        // Fetch search results for both users and pins
        const response = await axios.get(`/api/users/search/get-results?query=${event.target.value}`);
        setSearchResults(response.data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults({ users: [], pins: [] });
      setShowDropdown(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchQuery}`);
    setShowDropdown(false);
  };

  const handleLogout = () => dispatch(logout());

  return (
    <div className="nav-bar">
      <div className="nav-bar__icon nav-bar__icon--red">
        <Link to="/">
          <PinterestIcon />
        </Link>
      </div>
      <div className="nav-bar__link">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"}>
          Home
        </NavLink>
         <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"}>
          Create
        </NavLink>
        <NavLink to="/todo" className={({ isActive }) => isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"} >
          ToDo
        </NavLink>
      </div>

      {/* Search Box */}
      <div className="nav-bar__search-box">
        <SearchIcon />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Close dropdown with delay
          />
          <button type="submit"></button>
        </form>

        {/* Search Dropdown */}
        {showDropdown && (
          <div className="dropdown-search-results">
            <div className="search-results-section">
              {searchResults.users.length > 0 ? (
                searchResults.users.map((user) => (
                  <div key={user._id} className="search-result-item" onClick={() => navigate(`/profile/${user.username}`)}>
                    <img src="https://img.freepik.com/premium-vector/collection-hand-drawn-profile-icons_1323905-5.jpg?w=740" alt={user.name} />
                    <div>
                      <p className="searchName">{user.name}</p>
                      <p className="searchUsername">{user.username}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No users found</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="nav-bar__icon-group">
        <div className="nav-bar__icon nav-bar__icon--gray">
          <Link to="/profile">
            <AccountCircleIcon />
          </Link>
        </div>
        <div className="nav-bar__icon nav-bar__icon--gray" onClick={handleLogout}>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default NavBar;



