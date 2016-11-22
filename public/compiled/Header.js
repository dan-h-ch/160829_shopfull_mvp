'use strict';

var Header = function Header(_ref) {
  var username = _ref.username;
  var logOut = _ref.logOut;
  return React.createElement(
    'div',
    { className: 'header-container' },
    React.createElement(
      'div',
      { className: 'header-items' },
      'Hi ',
      username
    ),
    React.createElement(
      'div',
      { id: 'top-banner' },
      'Listify'
    ),
    React.createElement(
      'div',
      { onClick: logOut, className: 'header-items' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9IZWFkZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxTQUFTLFNBQVQsTUFBUztBQUFBLE1BQUUsUUFBRixRQUFFLFFBQUY7QUFBQSxNQUFZLE1BQVosUUFBWSxNQUFaO0FBQUEsU0FDWDtBQUFBO0FBQUEsTUFBSyxXQUFVLGtCQUFmO0FBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxjQUFmO0FBQUE7QUFDSTtBQURKLEtBREY7QUFJRTtBQUFBO0FBQUEsUUFBSyxJQUFHLFlBQVI7QUFBQTtBQUFBLEtBSkY7QUFPRTtBQUFBO0FBQUEsUUFBSyxTQUFTLE1BQWQsRUFBc0IsV0FBVSxjQUFoQztBQUFBO0FBQUE7QUFQRixHQURXO0FBQUEsQ0FBYjs7QUFnQkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQSIsImZpbGUiOiJIZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgSGVhZGVyID0gKHt1c2VybmFtZSwgbG9nT3V0fSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT0naGVhZGVyLWNvbnRhaW5lcic+XG4gICAgPGRpdiBjbGFzc05hbWU9J2hlYWRlci1pdGVtcyc+XG4gICAgSGkge3VzZXJuYW1lfVxuICAgIDwvZGl2PlxuICAgIDxkaXYgaWQ9J3RvcC1iYW5uZXInPlxuICAgIExpc3RpZnlcbiAgICA8L2Rpdj5cbiAgICA8ZGl2IG9uQ2xpY2s9e2xvZ091dH0gY2xhc3NOYW1lPSdoZWFkZXItaXRlbXMnPlxuICAgIExvZ291dFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cblxuXG4vLyBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4vLyAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4vLyAgICAgc3VwZXIocHJvcHMpO1xuXG4vLyAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuLy8gICB9XG5cbi8vICAgc2hvd0xvY2soKSB7XG4vLyAgICAgdGhpcy5sb2NrLnNob3coKTtcbi8vICAgfVxuXG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGRpdj5cbi8vICAgICAgICAgPGRpdj5cbi8vICAgICAgICAgICBIaSB7dGhpcy5wcm9wcy51c2VybmFtZX1cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgIDxkaXYgb25DbGljaz17dGhpcy5wcm9wcy5sb2dPdXR9PlxuLy8gICAgICAgICAgIExvZ291dFxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICAgIDwvZGl2PlxuLy8gICAgICk7XG5cbi8vICAgfVxuXG5cbi8vIH0iXX0=