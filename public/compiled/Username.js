"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Username = function (_React$Component) {
  _inherits(Username, _React$Component);

  function Username(props) {
    _classCallCheck(this, Username);

    var _this = _possibleConstructorReturn(this, (Username.__proto__ || Object.getPrototypeOf(Username)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Username, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var userData = {
        id: this.props.userid,
        username: this.state.submitUsername
      };
      this.props.saveUsername(userData);
    }
  }, {
    key: "updateUsername",
    value: function updateUsername(e) {
      this.setState({
        submitUsername: e.target.value
      });
      this.state.submitUsername;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          null,
          "Please select a username (username will be used when sharing list and connecting with other users)"
        ),
        React.createElement(
          "form",
          { className: "username", onSubmit: this.handleSubmit.bind(this) },
          React.createElement("input", { className: "username-form-input", type: "text", placeholder: "Username", value: this.state.submitUsername || '', onChange: function onChange(e) {
              return _this2.updateUsername(e);
            } }),
          React.createElement("input", { className: "username-form-button", type: "submit", value: "Submit" })
        ),
        React.createElement(
          "div",
          null,
          this.props.error
        )
      );
    }
  }]);

  return Username;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Vc2VybmFtZS5qc3giXSwibmFtZXMiOlsiVXNlcm5hbWUiLCJwcm9wcyIsInN0YXRlIiwiZSIsInByZXZlbnREZWZhdWx0IiwidXNlckRhdGEiLCJpZCIsInVzZXJpZCIsInVzZXJuYW1lIiwic3VibWl0VXNlcm5hbWUiLCJzYXZlVXNlcm5hbWUiLCJzZXRTdGF0ZSIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlU3VibWl0IiwiYmluZCIsInVwZGF0ZVVzZXJuYW1lIiwiZXJyb3IiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxROzs7QUFFSixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLG9IQUNYQSxLQURXOztBQUdqQixVQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztpQ0FFWUMsQyxFQUFHO0FBQ2RBLFFBQUVDLGNBQUY7QUFDQSxVQUFJQyxXQUFXO0FBQ2JDLFlBQUksS0FBS0wsS0FBTCxDQUFXTSxNQURGO0FBRWJDLGtCQUFVLEtBQUtOLEtBQUwsQ0FBV087QUFGUixPQUFmO0FBSUEsV0FBS1IsS0FBTCxDQUFXUyxZQUFYLENBQXdCTCxRQUF4QjtBQUNEOzs7bUNBRWNGLEMsRUFBRztBQUNoQixXQUFLUSxRQUFMLENBQWM7QUFDWkYsd0JBQWdCTixFQUFFUyxNQUFGLENBQVNDO0FBRGIsT0FBZDtBQUdBLFdBQUtYLEtBQUwsQ0FBV08sY0FBWDtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUlFO0FBQUE7QUFBQSxZQUFNLFdBQVUsVUFBaEIsRUFBMkIsVUFBVSxLQUFLSyxZQUFMLENBQWtCQyxJQUFsQixDQUF1QixJQUF2QixDQUFyQztBQUNFLHlDQUFPLFdBQVUscUJBQWpCLEVBQXVDLE1BQUssTUFBNUMsRUFBbUQsYUFBWSxVQUEvRCxFQUEwRSxPQUFPLEtBQUtiLEtBQUwsQ0FBV08sY0FBWCxJQUE2QixFQUE5RyxFQUFrSCxVQUFVLGtCQUFDTixDQUFEO0FBQUEscUJBQU8sT0FBS2EsY0FBTCxDQUFvQmIsQ0FBcEIsQ0FBUDtBQUFBLGFBQTVILEdBREY7QUFFRSx5Q0FBTyxXQUFVLHNCQUFqQixFQUF3QyxNQUFLLFFBQTdDLEVBQXNELE9BQU0sUUFBNUQ7QUFGRixTQUpGO0FBUUU7QUFBQTtBQUFBO0FBQ0csZUFBS0YsS0FBTCxDQUFXZ0I7QUFEZDtBQVJGLE9BREY7QUFjRDs7OztFQXZDb0JDLE1BQU1DLFMiLCJmaWxlIjoiVXNlcm5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBVc2VybmFtZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdXNlckRhdGEgPSB7XG4gICAgICBpZDogdGhpcy5wcm9wcy51c2VyaWQsXG4gICAgICB1c2VybmFtZTogdGhpcy5zdGF0ZS5zdWJtaXRVc2VybmFtZVxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5zYXZlVXNlcm5hbWUodXNlckRhdGEpO1xuICB9XG5cbiAgdXBkYXRlVXNlcm5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0VXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gICAgdGhpcy5zdGF0ZS5zdWJtaXRVc2VybmFtZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBQbGVhc2Ugc2VsZWN0IGEgdXNlcm5hbWUgKHVzZXJuYW1lIHdpbGwgYmUgdXNlZCB3aGVuIHNoYXJpbmcgbGlzdCBhbmQgY29ubmVjdGluZyB3aXRoIG90aGVyIHVzZXJzKVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwidXNlcm5hbWVcIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInVzZXJuYW1lLWZvcm0taW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRVc2VybmFtZSB8fCAnJ30gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZVVzZXJuYW1lKGUpfSAvPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ1c2VybmFtZS1mb3JtLWJ1dHRvblwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5lcnJvcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbn0iXX0=