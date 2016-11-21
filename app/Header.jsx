var Header = ({username, logOut}) => (
  <div>
    <div className='header'>
    Hi {username}
    </div>
    <div onClick={logOut}>
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