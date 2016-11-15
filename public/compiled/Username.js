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
          { className: "submitForm", onSubmit: this.handleSubmit.bind(this) },
          React.createElement("input", { type: "text", placeholder: "Username", value: this.state.submitUsername || '', onChange: function onChange(e) {
              return _this2.updateUsername(e);
            } }),
          React.createElement("input", { type: "submit", value: "Submit" })
        ),
        React.createElement(
          "div",
          null,
          "Error message here"
        )
      );
    }
  }]);

  return Username;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Vc2VybmFtZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUVKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxvSEFDWCxLQURXOztBQUdqQixVQUFLLEtBQUwsR0FBYSxFQUFiO0FBSGlCO0FBSWxCOzs7O2lDQUVZLEMsRUFBRztBQUNkLFFBQUUsY0FBRjtBQUNBLFVBQUksV0FBVztBQUNiLFlBQUksS0FBSyxLQUFMLENBQVcsTUFERjtBQUViLGtCQUFVLEtBQUssS0FBTCxDQUFXO0FBRlIsT0FBZjtBQUlBLFdBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsUUFBeEI7QUFDRDs7O21DQUVjLEMsRUFBRztBQUNoQixXQUFLLFFBQUwsQ0FBYztBQUNaLHdCQUFnQixFQUFFLE1BQUYsQ0FBUztBQURiLE9BQWQ7QUFHQSxXQUFLLEtBQUwsQ0FBVyxjQUFYO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBSUU7QUFBQTtBQUFBLFlBQU0sV0FBVSxZQUFoQixFQUE2QixVQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUF2QztBQUNFLHlDQUFPLE1BQUssTUFBWixFQUFtQixhQUFZLFVBQS9CLEVBQTBDLE9BQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxJQUE2QixFQUE5RSxFQUFrRixVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBUDtBQUFBLGFBQTVGLEdBREY7QUFFRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxRQUEzQjtBQUZGLFNBSkY7QUFRRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUkYsT0FERjtBQWNEOzs7O0VBdkNvQixNQUFNLFMiLCJmaWxlIjoiVXNlcm5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBVc2VybmFtZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdXNlckRhdGEgPSB7XG4gICAgICBpZDogdGhpcy5wcm9wcy51c2VyaWQsXG4gICAgICB1c2VybmFtZTogdGhpcy5zdGF0ZS5zdWJtaXRVc2VybmFtZVxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5zYXZlVXNlcm5hbWUodXNlckRhdGEpO1xuICB9XG5cbiAgdXBkYXRlVXNlcm5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0VXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gICAgdGhpcy5zdGF0ZS5zdWJtaXRVc2VybmFtZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBQbGVhc2Ugc2VsZWN0IGEgdXNlcm5hbWUgKHVzZXJuYW1lIHdpbGwgYmUgdXNlZCB3aGVuIHNoYXJpbmcgbGlzdCBhbmQgY29ubmVjdGluZyB3aXRoIG90aGVyIHVzZXJzKVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic3VibWl0Rm9ybVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0VXNlcm5hbWUgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVVc2VybmFtZShlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU3VibWl0XCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIEVycm9yIG1lc3NhZ2UgaGVyZVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufSJdfQ==