import React from 'react';
import { Link } from 'react-router-dom';
import Popper from "popper.js";

import { callApi } from '../../utils/utils';

/* User */
import { useDispatchCurrentUser } from '../../context/AuthContext';

const DropdownAccount = ({image, gamertag, history}) => {
    // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const dispatch = useDispatchCurrentUser();
  

  const handleLogout = async () => {
    localStorage.removeItem('token')
    await callApi({path: "/logout", method: "POST"}) 
    dispatch({ type: "LOGOUT"})
    history.push('/')
  }
  
    return (
        
<div className="relative inline-block text-left">
  <div>
    <button type="button" className="inline-flex p-4 mr-4 hover:bg-amber-400" id="options-menu" aria-haspopup="true" aria-expanded="true"
    
    style={{ transition: "all .15s ease" }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
    >
      <div className="py-1 pr-4">{gamertag}</div>
      
      <img className="h-8 w-8 rounded-full" src={image && image.url} alt="" />
    </button>
  </div>

  {/* <!--
    Dropdown panel, show/hide based on dropdown state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
  <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 mr-0"
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        }

  >
    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <Link exact to='/account' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Account</Link>
    </div>
    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <Link exact to='/create' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Create</Link>
    </div>
    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <Link onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Sign out</Link>
    </div>
  </div>
</div>

    )
}

export default DropdownAccount