var Header = ({username, logOut, email_phone}) => (
  <div className='header-container'>
    <div className='header-items'>
    Hi {email_phone}
    </div>
    <div id='top-banner'>
    Listify
    </div>
    <div onClick={logOut} className='header-items'>
    Logout
    </div>
  </div>
);
