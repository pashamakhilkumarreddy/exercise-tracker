import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [display, setDisplay] = useState(false);
  const toggleMenu = () => {
    setDisplay(!display);
  }
  return (
    <Fragment>
      <header>
        <nav className={`navbar`} role="navigation" aria-label="main-navigation">
            <div className={`navbar-brand`}>
                <Link to="/" className={`navbar-item`}>
                    <img className={`header-logo`} src="#" alt="Logo" />
                </Link> 
                <Link to="/" className={`navbar-item`}>Home</Link>
                <a role="button" className={`navbar-burger burger`} aria-label="menu" aria-expanded="false" data-target="main-navbar" onClick={toggleMenu}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="main-navbar" className={'navbar-menu ' + (display ? 'display-unset': '')}>
                <div className={`navbar-end`}>
                    <div className={`navbar-item`}>
                      <Link to="/users" className={'navbar-item'}>Users</Link>
                    </div>   
                    <div className={`navbar-item`}>
                      <Link to="/exercises" className={'navbar-item'}>Exercises</Link>
                    </div>                        
                </div>
            </div>
        </nav>
      </header>
    </Fragment>
  )
}

export default Header;