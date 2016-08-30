"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBarItem = function (_React$Component) {
  _inherits(NavBarItem, _React$Component);

  function NavBarItem(props) {
    _classCallCheck(this, NavBarItem);

    return _possibleConstructorReturn(this, (NavBarItem.__proto__ || Object.getPrototypeOf(NavBarItem)).call(this, props));
  }

  _createClass(NavBarItem, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "li",
        { className: "nav-item" },
        this.props.navList.listname
      );
    }
  }]);

  return NavBarItem;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL05hdkJhckl0ZW0uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxVOzs7QUFDSixzQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsbUhBQ1gsS0FEVztBQUVsQjs7Ozs2QkFJUTtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUksV0FBVSxVQUFkO0FBQTBCLGFBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBN0MsT0FERjtBQUdEOzs7O0VBWHNCLE1BQU0sUyIsImZpbGUiOiJOYXZCYXJJdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTmF2QmFySXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj57dGhpcy5wcm9wcy5uYXZMaXN0Lmxpc3RuYW1lfTwvbGk+XG4gICAgKVxuICB9XG5cbn0iXX0=