// src/components/Header.js
import React from 'react';
import hideSideBar from '../assets/images/hideSideBar.png';
import openSideBar from '../assets/images/openSideBar.png';
import { Form, InputGroup } from 'react-bootstrap';
const Header = ({ toggleSidebar, showSidebar, pageTitle }) => {
  return (
    <header className="header">
      <button onClick={toggleSidebar} className="toggle-button">
        {showSidebar ? <img src={hideSideBar} width="24px" alt="hideSideBar" /> : <img src={openSideBar} width="24px" alt="openSideBar" />}
      </button>
      <h4>{pageTitle}</h4>
      <InputGroup>
        <Form.Control
          placeholder="Search"
          aria-label="Search.."
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2"><svg xmlns="http://www.w3.org/2000/svg" className="g_1" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></InputGroup.Text>
      </InputGroup>
    </header>
  );
};

export default Header;
