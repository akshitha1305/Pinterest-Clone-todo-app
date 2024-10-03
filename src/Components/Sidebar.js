import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap';

const Sidebar = ({ show, toggleSidebar }) => {

  const handleLinkClick = () => {
    if (window.innerWidth <= 600) {
      toggleSidebar();
    }
  };
  const [showModel, setShowModel] = useState(false);
  const handleClose = () => setShowModel(false);
  const handleShow = () => setShowModel(true);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const isActive = (path) => location.pathname === path ? 'Links active' : 'Links';
  return (
    <div className={`sidebar ${show ? 'show' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5 d-flex justify-content-center">
          <div className='text-center'>
                            <div data-test-id="unauth-header-logo" class="zI7 iyn Hsu"><a class="nrl _74 Lfz KhY S9z NtY afV" href="/" rel="" target="_self"><div class="Jea KS5 Zr3 hs0 zI7 iyn Hsu"><svg aria-label="Pinterest" class="g_1 gUZ U9O kVc" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12"></path></svg><div class="xvE zI7 iyn Hsu" style={{letterspacing:-1 + 'px'}}><h2 class="lH1 dyH iFc H2s bwj sOY zDA">Pinterest</h2></div></div></a></div>
                            </div>
          </div>
        </div>
      <div className="row">
        <div className="col-12 mt-3 LinksCol">
          <Link className={isActive('/')} onClick={handleLinkClick} to="/"><i className="fa-solid fa-house me-3"></i>Home</Link>
          <Link className={isActive('/logout')} onClick={handleShow}><i class="fa-solid fa-right-from-bracket me-3" ></i> Logout </Link>
        </div>
        <Modal centered size="md" show={showModel} onHide={handleClose}>
          <Modal.Header className="text-center" closeButton>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
              <div className='text-center'>
                            <div data-test-id="unauth-header-logo" class="zI7 iyn Hsu"><a class="nrl _74 Lfz KhY S9z NtY afV" href="/" rel="" target="_self"><div class="Jea KS5 Zr3 hs0 zI7 iyn Hsu"><svg aria-label="Pinterest" class="g_1 gUZ U9O kVc" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12"></path></svg><div class="xvE zI7 iyn Hsu" style={{letterspacing:-1 + 'px'}}><h2 class="lH1 dyH iFc H2s bwj sOY zDA">Pinterest</h2></div></div></a></div>
                            </div>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <h4 className="text-center mt-3">Are you sure you want to Logout ?</h4>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 d-flex justify-content-center">
                <button className="allBtns me-3" onClick={handleClose}>Cancel</button>
                <button className="confirmDeleteLogoutBtn" onClick={handleLogout} >Logout</button>
              </div>
            </div>
          </Modal.Body>

        </Modal>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
