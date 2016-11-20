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
    key: "displayNewList",
    value: function displayNewList() {
      this.props.displayNewList();
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
            return React.createElement(NavBarItem, { key: list.listid, navList: list, listid: _this2.props.listid, updateListid: _this2.props.updateListid });
          }),
          React.createElement(
            "li",
            { className: "nav-item", onClick: function onClick(e) {
                return _this2.displayNewList();
              } },
            React.createElement(
              "div",
              null,
              "+"
            )
          )
        )
      );
    }
  }]);

  return NavBar;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OYXZCYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxNOzs7QUFDSixrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztnQ0FFVyxDLEVBQUc7QUFDYixXQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0Q7OztxQ0FFZ0I7QUFDZixXQUFLLEtBQUwsQ0FBVyxjQUFYO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxlQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSxTQUFkO0FBQ0csZUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixHQUFuQixDQUF1QixVQUFDLElBQUQ7QUFBQSxtQkFBVSxvQkFBQyxVQUFELElBQVksS0FBSyxLQUFLLE1BQXRCLEVBQThCLFNBQVMsSUFBdkMsRUFBNkMsUUFBUSxPQUFLLEtBQUwsQ0FBVyxNQUFoRSxFQUF3RSxjQUFjLE9BQUssS0FBTCxDQUFXLFlBQWpHLEdBQVY7QUFBQSxXQUF2QixDQURIO0FBRUU7QUFBQTtBQUFBLGNBQUksV0FBVSxVQUFkLEVBQXlCLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHVCQUFPLE9BQUssY0FBTCxFQUFQO0FBQUEsZUFBbEM7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFGRjtBQURGLE9BREY7QUFVRDs7OztFQTFCa0IsTUFBTSxTIiwiZmlsZSI6Ik5hdkJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZSkge1xuICAgIHRoaXMucHJvcHMuYWRkTGlzdCh0aGlzLnByb3BzLm5ld0xpc3ROYW1lKTtcbiAgfVxuXG4gIGRpc3BsYXlOZXdMaXN0KCkge1xuICAgIHRoaXMucHJvcHMuZGlzcGxheU5ld0xpc3QoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtY29udGFpbmVyXCI+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYtYmFyXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMubmF2TGlzdC5tYXAoKGxpc3QpID0+IDxOYXZCYXJJdGVtIGtleT17bGlzdC5saXN0aWR9IG5hdkxpc3Q9e2xpc3R9IGxpc3RpZD17dGhpcy5wcm9wcy5saXN0aWR9IHVwZGF0ZUxpc3RpZD17dGhpcy5wcm9wcy51cGRhdGVMaXN0aWR9Lz4pfVxuICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRpc3BsYXlOZXdMaXN0KCl9PlxuICAgICAgICAgICAgPGRpdj4rPC9kaXY+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuXG59Il19