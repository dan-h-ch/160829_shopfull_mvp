var Header = ({username, logOut, email}) => (
  <div className='header-container'>
    <div className='header-items'>
    Hi {email}
    </div>
    <div id='top-banner'>
    Listify
    </div>
    <div onClick={logOut} className='header-items'>
    Logout
    </div>
  </div>
);
