'use strict';

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
    key: 'navFilter',
    value: function navFilter(e) {
      // console.log(this.props.navList.id);
      // need to set list id up chain
      this.props.updateListid(this.props.navList.listid, this.props.navList.listname);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.props.listid === this.props.navList.listid) {
        var id = 'selectedList';
      } else {
        var id = 'notSelectedLIst';
      }
      return React.createElement(
        'li',
        { id: id, className: 'nav-item', onClick: function onClick(e) {
            return _this2.navFilter(e);
          } },
        this.props.navList.listname
      );
    }
  }]);

  return NavBarItem;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OYXZCYXJJdGVtLmpzeCJdLCJuYW1lcyI6WyJOYXZCYXJJdGVtIiwicHJvcHMiLCJlIiwidXBkYXRlTGlzdGlkIiwibmF2TGlzdCIsImxpc3RpZCIsImxpc3RuYW1lIiwiaWQiLCJuYXZGaWx0ZXIiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxVOzs7QUFDSixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLG1IQUNYQSxLQURXO0FBRWxCOzs7OzhCQUVTQyxDLEVBQUc7QUFDWDtBQUNBO0FBQ0EsV0FBS0QsS0FBTCxDQUFXRSxZQUFYLENBQXdCLEtBQUtGLEtBQUwsQ0FBV0csT0FBWCxDQUFtQkMsTUFBM0MsRUFBbUQsS0FBS0osS0FBTCxDQUFXRyxPQUFYLENBQW1CRSxRQUF0RTtBQUNEOzs7NkJBSVE7QUFBQTs7QUFDUCxVQUFJLEtBQUtMLEtBQUwsQ0FBV0ksTUFBWCxLQUFzQixLQUFLSixLQUFMLENBQVdHLE9BQVgsQ0FBbUJDLE1BQTdDLEVBQXFEO0FBQ25ELFlBQUlFLEtBQUssY0FBVDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlBLEtBQUssaUJBQVQ7QUFDRDtBQUNELGFBQ0U7QUFBQTtBQUFBLFVBQUksSUFBSUEsRUFBUixFQUFZLFdBQVUsVUFBdEIsRUFBaUMsU0FBUyxpQkFBQ0wsQ0FBRDtBQUFBLG1CQUFPLE9BQUtNLFNBQUwsQ0FBZU4sQ0FBZixDQUFQO0FBQUEsV0FBMUM7QUFBcUUsYUFBS0QsS0FBTCxDQUFXRyxPQUFYLENBQW1CRTtBQUF4RixPQURGO0FBR0Q7Ozs7RUF0QnNCRyxNQUFNQyxTIiwiZmlsZSI6Ik5hdkJhckl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBOYXZCYXJJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBuYXZGaWx0ZXIoZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvcHMubmF2TGlzdC5pZCk7XG4gICAgLy8gbmVlZCB0byBzZXQgbGlzdCBpZCB1cCBjaGFpblxuICAgIHRoaXMucHJvcHMudXBkYXRlTGlzdGlkKHRoaXMucHJvcHMubmF2TGlzdC5saXN0aWQsIHRoaXMucHJvcHMubmF2TGlzdC5saXN0bmFtZSk7XG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmxpc3RpZCA9PT0gdGhpcy5wcm9wcy5uYXZMaXN0Lmxpc3RpZCkge1xuICAgICAgdmFyIGlkID0gJ3NlbGVjdGVkTGlzdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpZCA9ICdub3RTZWxlY3RlZExJc3QnO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGlkPXtpZH0gY2xhc3NOYW1lPVwibmF2LWl0ZW1cIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5uYXZGaWx0ZXIoZSl9Pnt0aGlzLnByb3BzLm5hdkxpc3QubGlzdG5hbWV9PC9saT5cbiAgICApO1xuICB9XG5cbn0iXX0=