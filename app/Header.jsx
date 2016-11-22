var Header = ({username, logOut}) => (
  <div className='header-container'>
    <div className='header-items'>
    Hi {username}
    </div>
    <div id='top-banner'>
    Listify
    </div>
    <div onClick={logOut} className='header-items'>
    Logout
    </div>
  </div>
);



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