'use strict';

var Header = function Header(_ref) {
  var username = _ref.username;
  var logOut = _ref.logOut;
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { className: 'header' },
      'Hi ',
      username
    ),
    React.createElement(
      'div',
      { onClick: logOut },
      'Logout'
    )
  );
};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9IZWFkZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxTQUFTLFNBQVQsTUFBUztBQUFBLE1BQUUsUUFBRixRQUFFLFFBQUY7QUFBQSxNQUFZLE1BQVosUUFBWSxNQUFaO0FBQUEsU0FDWDtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLFFBQWY7QUFBQTtBQUNJO0FBREosS0FERjtBQUlFO0FBQUE7QUFBQSxRQUFLLFNBQVMsTUFBZDtBQUFBO0FBQUE7QUFKRixHQURXO0FBQUEsQ0FBYjs7QUFhQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBIiwiZmlsZSI6IkhlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBIZWFkZXIgPSAoe3VzZXJuYW1lLCBsb2dPdXR9KSA9PiAoXG4gIDxkaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9J2hlYWRlcic+XG4gICAgSGkge3VzZXJuYW1lfVxuICAgIDwvZGl2PlxuICAgIDxkaXYgb25DbGljaz17bG9nT3V0fT5cbiAgICBMb2dvdXRcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5cblxuLy8gY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuLy8gICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuLy8gICAgIHN1cGVyKHByb3BzKTtcblxuLy8gICAgIHRoaXMuc3RhdGUgPSB7fTtcbi8vICAgfVxuXG4vLyAgIHNob3dMb2NrKCkge1xuLy8gICAgIHRoaXMubG9jay5zaG93KCk7XG4vLyAgIH1cblxuLy8gICByZW5kZXIoKSB7XG4vLyAgICAgcmV0dXJuIChcbi8vICAgICAgIDxkaXY+XG4vLyAgICAgICAgIDxkaXY+XG4vLyAgICAgICAgICAgSGkge3RoaXMucHJvcHMudXNlcm5hbWV9XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMucHJvcHMubG9nT3V0fT5cbi8vICAgICAgICAgICBMb2dvdXRcbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICA8L2Rpdj5cbi8vICAgICApO1xuXG4vLyAgIH1cblxuXG4vLyB9Il19