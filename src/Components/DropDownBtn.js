import Dropdown from 'react-bootstrap/Dropdown';
function DropDownBtn() {
  return (
    <Dropdown className='g_1'>
      <Dropdown.Toggle className='g_1 btn btn-rounded' variant="danger">
      <svg xmlns="http://www.w3.org/2000/svg" style={{color: 'white',width: 35+ 'px'}} width="16" height="16" fill="currentColor" class="bi bi-align-middle" viewBox="0 0 16 16">
  <path d="M6 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zM1 8a.5.5 0 0 0 .5.5H6v-1H1.5A.5.5 0 0 0 1 8m14 0a.5.5 0 0 1-.5.5H10v-1h4.5a.5.5 0 0 1 .5.5"/>
</svg>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownBtn;