import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';


const hiddenPaths = ['/login', '/signup'];

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const hideHeaderAndSidebar = hiddenPaths.includes(location.pathname);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  const getPageTitle = (path) => {
    switch (path) {
      case '/': return '';
      case '/signup': return 'SignUp';
      default: return 'Page Title'; 
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className={`App ${showSidebar ? 'show-sidebar' : 'hide-sidebar'} ${hideHeaderAndSidebar ? 'hide-header-and-sidebar' : ''}`}>
      {!hideHeaderAndSidebar && (
        <>
          <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
        </>
      )}
      <div className="content-wrapper">
        <div className='main-content'>
          {!hideHeaderAndSidebar && (
            <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} pageTitle={pageTitle}  />
          )}
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />

            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
