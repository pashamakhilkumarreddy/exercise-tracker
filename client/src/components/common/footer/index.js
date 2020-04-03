import React, { Fragment } from 'react';

const Footer = () => {
  return (
    <Fragment>
      <footer className={`footer`}>
        <div className={`content has-text-centered`}>
          <p>
          &copy; 2020 <strong>Exercise Tracker</strong> - All Rights Reserved
          </p>
        </div>
      </footer>
    </Fragment>
  )
}

export default Footer;