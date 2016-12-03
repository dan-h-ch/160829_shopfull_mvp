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
          this.props.error
        )
      );
    }
  }]);

  return Username;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Vc2VybmFtZS5qc3giXSwibmFtZXMiOlsiVXNlcm5hbWUiLCJwcm9wcyIsInN0YXRlIiwiZSIsInByZXZlbnREZWZhdWx0IiwidXNlckRhdGEiLCJpZCIsInVzZXJpZCIsInVzZXJuYW1lIiwic3VibWl0VXNlcm5hbWUiLCJzYXZlVXNlcm5hbWUiLCJzZXRTdGF0ZSIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlU3VibWl0IiwiYmluZCIsInVwZGF0ZVVzZXJuYW1lIiwiZXJyb3IiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxROzs7QUFFSixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLG9IQUNYQSxLQURXOztBQUdqQixVQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztpQ0FFWUMsQyxFQUFHO0FBQ2RBLFFBQUVDLGNBQUY7QUFDQSxVQUFJQyxXQUFXO0FBQ2JDLFlBQUksS0FBS0wsS0FBTCxDQUFXTSxNQURGO0FBRWJDLGtCQUFVLEtBQUtOLEtBQUwsQ0FBV087QUFGUixPQUFmO0FBSUEsV0FBS1IsS0FBTCxDQUFXUyxZQUFYLENBQXdCTCxRQUF4QjtBQUNEOzs7bUNBRWNGLEMsRUFBRztBQUNoQixXQUFLUSxRQUFMLENBQWM7QUFDWkYsd0JBQWdCTixFQUFFUyxNQUFGLENBQVNDO0FBRGIsT0FBZDtBQUdBLFdBQUtYLEtBQUwsQ0FBV08sY0FBWDtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUlFO0FBQUE7QUFBQSxZQUFNLFdBQVUsWUFBaEIsRUFBNkIsVUFBVSxLQUFLSyxZQUFMLENBQWtCQyxJQUFsQixDQUF1QixJQUF2QixDQUF2QztBQUNFLHlDQUFPLE1BQUssTUFBWixFQUFtQixhQUFZLFVBQS9CLEVBQTBDLE9BQU8sS0FBS2IsS0FBTCxDQUFXTyxjQUFYLElBQTZCLEVBQTlFLEVBQWtGLFVBQVUsa0JBQUNOLENBQUQ7QUFBQSxxQkFBTyxPQUFLYSxjQUFMLENBQW9CYixDQUFwQixDQUFQO0FBQUEsYUFBNUYsR0FERjtBQUVFLHlDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLFFBQTNCO0FBRkYsU0FKRjtBQVFFO0FBQUE7QUFBQTtBQUNHLGVBQUtGLEtBQUwsQ0FBV2dCO0FBRGQ7QUFSRixPQURGO0FBY0Q7Ozs7RUF2Q29CQyxNQUFNQyxTIiwiZmlsZSI6IlVzZXJuYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVXNlcm5hbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHVzZXJEYXRhID0ge1xuICAgICAgaWQ6IHRoaXMucHJvcHMudXNlcmlkLFxuICAgICAgdXNlcm5hbWU6IHRoaXMuc3RhdGUuc3VibWl0VXNlcm5hbWVcbiAgICB9O1xuICAgIHRoaXMucHJvcHMuc2F2ZVVzZXJuYW1lKHVzZXJEYXRhKTtcbiAgfVxuXG4gIHVwZGF0ZVVzZXJuYW1lKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdFVzZXJuYW1lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICAgIHRoaXMuc3RhdGUuc3VibWl0VXNlcm5hbWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgUGxlYXNlIHNlbGVjdCBhIHVzZXJuYW1lICh1c2VybmFtZSB3aWxsIGJlIHVzZWQgd2hlbiBzaGFyaW5nIGxpc3QgYW5kIGNvbm5lY3Rpbmcgd2l0aCBvdGhlciB1c2VycylcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInN1Ym1pdEZvcm1cIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIHZhbHVlPXt0aGlzLnN0YXRlLnN1Ym1pdFVzZXJuYW1lIHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlVXNlcm5hbWUoZSl9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5lcnJvcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbn0iXX0=