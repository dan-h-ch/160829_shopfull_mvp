'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { id: 'top-banner' },
          'Listify'
        ),
        React.createElement(
          'div',
          { className: 'header-container' },
          React.createElement(
            'div',
            { className: 'header-items' },
            'Hi ',
            this.props.email_phone
          ),
          React.createElement(
            'div',
            { onClick: this.props.logOut, className: 'header-items' },
            'Logout'
          )
        )
      );
    }
  }]);

  return Header;
}(React.Component);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9IZWFkZXIuanN4Il0sIm5hbWVzIjpbIkhlYWRlciIsInByb3BzIiwic3RhdGUiLCJlbWFpbF9waG9uZSIsImxvZ091dCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLE07OztBQUNKLGtCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1hBLEtBRFc7O0FBRWpCLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBRmlCO0FBR2xCOzs7OzZCQUVRO0FBQ1AsYUFDSTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBSyxJQUFHLFlBQVI7QUFBQTtBQUFBLFNBREY7QUFJRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGtCQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxjQUFmO0FBQUE7QUFDSSxpQkFBS0QsS0FBTCxDQUFXRTtBQURmLFdBREY7QUFLRTtBQUFBO0FBQUEsY0FBSyxTQUFTLEtBQUtGLEtBQUwsQ0FBV0csTUFBekIsRUFBaUMsV0FBVSxjQUEzQztBQUFBO0FBQUE7QUFMRjtBQUpGLE9BREo7QUFnQkQ7Ozs7RUF2QmtCQyxNQUFNQyxTOztBQTBCM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0EiLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBpZD0ndG9wLWJhbm5lcic+XG4gICAgICAgICAgTGlzdGlmeVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdoZWFkZXItY29udGFpbmVyJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdoZWFkZXItaXRlbXMnPlxuICAgICAgICAgICAgSGkge3RoaXMucHJvcHMuZW1haWxfcGhvbmV9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLnByb3BzLmxvZ091dH0gY2xhc3NOYW1lPSdoZWFkZXItaXRlbXMnPlxuICAgICAgICAgICAgTG9nb3V0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG4vLyB2YXIgSGVhZGVyID0gKHt1c2VybmFtZSwgbG9nT3V0LCB1c2VyaWR9KSA9PiAoXG4vLyAgIDxkaXYgY2xhc3NOYW1lPSdoZWFkZXItY29udGFpbmVyJz5cbi8vICAgICA8ZGl2IGNsYXNzTmFtZT0naGVhZGVyLWl0ZW1zJz5cbi8vICAgICBIaSB7dXNlcm5hbWV9IHt1c2VyaWR9XG4vLyAgICAgPC9kaXY+XG4vLyAgICAgPGRpdiBpZD0ndG9wLWJhbm5lcic+XG4vLyAgICAgTGlzdGlmeVxuLy8gICAgIDwvZGl2PlxuLy8gICAgIDxkaXYgb25DbGljaz17bG9nT3V0fSBjbGFzc05hbWU9J2hlYWRlci1pdGVtcyc+XG4vLyAgICAgTG9nb3V0XG4vLyAgICAgPC9kaXY+XG4vLyAgIDwvZGl2PlxuLy8gKTtcblxuXG5cbi8vIGNsYXNzIEhlYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG5cbi8vICAgICB0aGlzLnN0YXRlID0ge307XG4vLyAgIH1cblxuLy8gICBzaG93TG9jaygpIHtcbi8vICAgICB0aGlzLmxvY2suc2hvdygpO1xuLy8gICB9XG5cbi8vICAgcmVuZGVyKCkge1xuLy8gICAgIHJldHVybiAoXG4vLyAgICAgICA8ZGl2PlxuLy8gICAgICAgICA8ZGl2PlxuLy8gICAgICAgICAgIEhpIHt0aGlzLnByb3BzLnVzZXJuYW1lfVxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLnByb3BzLmxvZ091dH0+XG4vLyAgICAgICAgICAgTG9nb3V0XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgPC9kaXY+XG4vLyAgICAgKTtcblxuLy8gICB9XG5cblxuLy8gfSJdfQ==