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
            { className: "new-list-button", onClick: function onClick(e) {
                return _this2.displayNewList();
              } },
            React.createElement(
              "div",
              null,
              "Add"
            )
          )
        )
      );
    }
  }]);

  return NavBar;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OYXZCYXIuanN4Il0sIm5hbWVzIjpbIk5hdkJhciIsInByb3BzIiwic3RhdGUiLCJlIiwiYWRkTGlzdCIsIm5ld0xpc3ROYW1lIiwiZGlzcGxheU5ld0xpc3QiLCJuYXZMaXN0IiwibWFwIiwibGlzdCIsImxpc3RpZCIsInVwZGF0ZUxpc3RpZCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLE07OztBQUNKLGtCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBSGlCO0FBSWxCOzs7O2dDQUVXQyxDLEVBQUc7QUFDYixXQUFLRixLQUFMLENBQVdHLE9BQVgsQ0FBbUIsS0FBS0gsS0FBTCxDQUFXSSxXQUE5QjtBQUNEOzs7cUNBRWdCO0FBQ2YsV0FBS0osS0FBTCxDQUFXSyxjQUFYO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxlQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSxTQUFkO0FBQ0csZUFBS0wsS0FBTCxDQUFXTSxPQUFYLENBQW1CQyxHQUFuQixDQUF1QixVQUFDQyxJQUFEO0FBQUEsbUJBQVUsb0JBQUMsVUFBRCxJQUFZLEtBQUtBLEtBQUtDLE1BQXRCLEVBQThCLFNBQVNELElBQXZDLEVBQTZDLFFBQVEsT0FBS1IsS0FBTCxDQUFXUyxNQUFoRSxFQUF3RSxjQUFjLE9BQUtULEtBQUwsQ0FBV1UsWUFBakcsR0FBVjtBQUFBLFdBQXZCLENBREg7QUFFRTtBQUFBO0FBQUEsY0FBSSxXQUFVLGlCQUFkLEVBQWdDLFNBQVMsaUJBQUNSLENBQUQ7QUFBQSx1QkFBTyxPQUFLRyxjQUFMLEVBQVA7QUFBQSxlQUF6QztBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUZGO0FBREYsT0FERjtBQVVEOzs7O0VBMUJrQk0sTUFBTUMsUyIsImZpbGUiOiJOYXZCYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBOYXZCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICB0aGlzLnByb3BzLmFkZExpc3QodGhpcy5wcm9wcy5uZXdMaXN0TmFtZSk7XG4gIH1cblxuICBkaXNwbGF5TmV3TGlzdCgpIHtcbiAgICB0aGlzLnByb3BzLmRpc3BsYXlOZXdMaXN0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2LWNvbnRhaW5lclwiPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2LWJhclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLm5hdkxpc3QubWFwKChsaXN0KSA9PiA8TmF2QmFySXRlbSBrZXk9e2xpc3QubGlzdGlkfSBuYXZMaXN0PXtsaXN0fSBsaXN0aWQ9e3RoaXMucHJvcHMubGlzdGlkfSB1cGRhdGVMaXN0aWQ9e3RoaXMucHJvcHMudXBkYXRlTGlzdGlkfS8+KX1cbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmV3LWxpc3QtYnV0dG9uXCIgb25DbGljaz17KGUpID0+IHRoaXMuZGlzcGxheU5ld0xpc3QoKX0+XG4gICAgICAgICAgICA8ZGl2PkFkZDwvZGl2PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cblxufSJdfQ==