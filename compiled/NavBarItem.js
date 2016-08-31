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
    key: "navFilter",
    value: function navFilter(e) {
      console.log(this.props.navList);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "li",
        { className: "nav-item", onClick: function onClick(e) {
            return _this2.navFilter(e);
          } },
        this.props.navList.listname
      );
    }
  }]);

  return NavBarItem;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL05hdkJhckl0ZW0uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxVOzs7QUFDSixzQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsbUhBQ1gsS0FEVztBQUVsQjs7Ozs4QkFFUyxDLEVBQUc7QUFDWCxjQUFRLEdBQVIsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxPQUF2QjtBQUNEOzs7NkJBSVE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFJLFdBQVUsVUFBZCxFQUF5QixTQUFTLGlCQUFDLENBQUQ7QUFBQSxtQkFBTyxPQUFLLFNBQUwsQ0FBZSxDQUFmLENBQVA7QUFBQSxXQUFsQztBQUE2RCxhQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CO0FBQWhGLE9BREY7QUFHRDs7OztFQWZzQixNQUFNLFMiLCJmaWxlIjoiTmF2QmFySXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5hdkJhckl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cbiAgbmF2RmlsdGVyKGUpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLm5hdkxpc3QpXG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5uYXZGaWx0ZXIoZSl9Pnt0aGlzLnByb3BzLm5hdkxpc3QubGlzdG5hbWV9PC9saT5cbiAgICApXG4gIH1cblxufSJdfQ==