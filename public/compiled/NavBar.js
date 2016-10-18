"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar(props) {
    _classCallCheck(this, NavBar);

    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(NavBar, [{
    key: "handleClick",
    value: function handleClick(e) {
      this.props.addList(this.props.newListName);
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var time = new Date();
      console.log(time);
      var preparedSubmit = {
        listname: this.state.submitListName,
        userid: 0,
        created_at: new Date(),
        updated_at: new Date()
      };
      this.props.addList(preparedSubmit);
      this.setState({
        // would be cool to have randomizer for the default values
        submitListName: "new list"
      });
    }
  }, {
    key: "updateListName",
    value: function updateListName(e) {
      this.setState({
        submitListName: e.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "nav-container" },
        React.createElement(
          "ul",
          { className: "nav-bar" },
          this.props.navList.map(function (list) {
            return React.createElement(NavBarItem, { navList: list, updateListid: _this2.props.updateListid });
          }),
          React.createElement(
            "li",
            null,
            React.createElement(
              "form",
              { className: "submitForm", onSubmit: this.handleSubmit.bind(this) },
              React.createElement("input", { type: "text", placeholder: "newlist...", value: this.state.submitListName, onChange: function onChange(e) {
                  return _this2.updateListName(e);
                } }),
              React.createElement("input", { type: "submit", value: "New List!" })
            )
          )
        )
      );
    }
  }]);

  return NavBar;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OYXZCYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxNOzs7QUFDSixrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztnQ0FFVyxDLEVBQUc7QUFDYixXQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0Q7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7QUFDQSxVQUFJLE9BQU8sSUFBSSxJQUFKLEVBQVg7QUFDQSxjQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsY0FERjtBQUVuQixnQkFBUSxDQUZXO0FBR25CLG9CQUFZLElBQUksSUFBSixFQUhPO0FBSW5CLG9CQUFZLElBQUksSUFBSjtBQUpPLE9BQXJCO0FBTUEsV0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixjQUFuQjtBQUNBLFdBQUssUUFBTCxDQUFjO0FBQ1o7QUFDQSx3QkFBZ0I7QUFGSixPQUFkO0FBTUQ7OzttQ0FFYyxDLEVBQUc7QUFDaEIsV0FBSyxRQUFMLENBQWM7QUFDWix3QkFBZ0IsRUFBRSxNQUFGLENBQVM7QUFEYixPQUFkO0FBR0Q7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxlQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSxTQUFkO0FBQ0csZUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixHQUFuQixDQUF1QixVQUFDLElBQUQ7QUFBQSxtQkFBVSxvQkFBQyxVQUFELElBQVksU0FBUyxJQUFyQixFQUEyQixjQUFjLE9BQUssS0FBTCxDQUFXLFlBQXBELEdBQVY7QUFBQSxXQUF2QixDQURIO0FBRUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGdCQUFNLFdBQVUsWUFBaEIsRUFBNkIsVUFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkM7QUFDRSw2Q0FBTyxNQUFLLE1BQVosRUFBbUIsYUFBWSxZQUEvQixFQUE0QyxPQUFPLEtBQUssS0FBTCxDQUFXLGNBQTlELEVBQThFLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHlCQUFPLE9BQUssY0FBTCxDQUFvQixDQUFwQixDQUFQO0FBQUEsaUJBQXhGLEdBREY7QUFFRSw2Q0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxXQUEzQjtBQUZGO0FBREY7QUFGRjtBQURGLE9BREY7QUFhRDs7OztFQWxEa0IsTUFBTSxTIiwiZmlsZSI6Ik5hdkJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge31cbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICB0aGlzLnByb3BzLmFkZExpc3QodGhpcy5wcm9wcy5uZXdMaXN0TmFtZSlcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpXG4gICAgY29uc29sZS5sb2codGltZSlcbiAgICB2YXIgcHJlcGFyZWRTdWJtaXQgPSB7XG4gICAgICBsaXN0bmFtZTogdGhpcy5zdGF0ZS5zdWJtaXRMaXN0TmFtZSxcbiAgICAgIHVzZXJpZDogMCxcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZSgpXG4gICAgfVxuICAgIHRoaXMucHJvcHMuYWRkTGlzdChwcmVwYXJlZFN1Ym1pdClcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC8vIHdvdWxkIGJlIGNvb2wgdG8gaGF2ZSByYW5kb21pemVyIGZvciB0aGUgZGVmYXVsdCB2YWx1ZXNcbiAgICAgIHN1Ym1pdExpc3ROYW1lOiBcIm5ldyBsaXN0XCIsXG4gICAgICAvLyBzdWJtaXRRdWFudDogMSxcbiAgICAgIC8vIHN1Ym1pdENvc3Q6IDkuOTlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlTGlzdE5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TGlzdE5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtY29udGFpbmVyXCI+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYtYmFyXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMubmF2TGlzdC5tYXAoKGxpc3QpID0+IDxOYXZCYXJJdGVtIG5hdkxpc3Q9e2xpc3R9IHVwZGF0ZUxpc3RpZD17dGhpcy5wcm9wcy51cGRhdGVMaXN0aWR9Lz4pfVxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInN1Ym1pdEZvcm1cIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmV3bGlzdC4uLlwiIHZhbHVlPXt0aGlzLnN0YXRlLnN1Ym1pdExpc3ROYW1lfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlTGlzdE5hbWUoZSl9IC8+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXcgTGlzdCFcIiAvPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuXG59Il19