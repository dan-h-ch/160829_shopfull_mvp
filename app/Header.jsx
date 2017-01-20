class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div>
          <div id='top-banner'>
          Listify
          </div>
          <div className='header-container'>
            <div className='header-items'>
            Hi {this.props.email_phone}
            </div>

            <div onClick={this.props.logOut} className='header-items'>
            Logout
            </div>
          </div>
        </div>
    );
  }
}

// var Header = ({username, logOut, userid}) => (
//   <div className='header-container'>
//     <div className='header-items'>
//     Hi {username} {userid}
//     </div>
//     <div id='top-banner'>
//     Listify
//     </div>
//     <div onClick={logOut} className='header-items'>
//     Logout
//     </div>
//   </div>
// );



// class Header extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   showLock() {
//     this.lock.show();
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           Hi {this.props.username}
//         </div>
//         <div onClick={this.props.logOut}>
//           Logout
//         </div>
//       </div>
//     );

//   }


// }