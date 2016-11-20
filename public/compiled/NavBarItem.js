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
      this.props.updateListid(this.props.navList.listid);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OYXZCYXJJdGVtLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sVTs7O0FBQ0osc0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLG1IQUNYLEtBRFc7QUFFbEI7Ozs7OEJBRVMsQyxFQUFHO0FBQ1g7QUFDQTtBQUNBLFdBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUEzQztBQUNEOzs7NkJBSVE7QUFBQTs7QUFDUCxVQUFJLEtBQUssS0FBTCxDQUFXLE1BQVgsS0FBc0IsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUE3QyxFQUFxRDtBQUNuRCxZQUFJLEtBQUssY0FBVDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUksS0FBSyxpQkFBVDtBQUNEO0FBQ0QsYUFDRTtBQUFBO0FBQUEsVUFBSSxJQUFJLEVBQVIsRUFBWSxXQUFVLFVBQXRCLEVBQWlDLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLG1CQUFPLE9BQUssU0FBTCxDQUFlLENBQWYsQ0FBUDtBQUFBLFdBQTFDO0FBQXFFLGFBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBeEYsT0FERjtBQUdEOzs7O0VBdEJzQixNQUFNLFMiLCJmaWxlIjoiTmF2QmFySXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5hdkJhckl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIG5hdkZpbHRlcihlKSB7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9wcy5uYXZMaXN0LmlkKTtcbiAgICAvLyBuZWVkIHRvIHNldCBsaXN0IGlkIHVwIGNoYWluXG4gICAgdGhpcy5wcm9wcy51cGRhdGVMaXN0aWQodGhpcy5wcm9wcy5uYXZMaXN0Lmxpc3RpZCk7XG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmxpc3RpZCA9PT0gdGhpcy5wcm9wcy5uYXZMaXN0Lmxpc3RpZCkge1xuICAgICAgdmFyIGlkID0gJ3NlbGVjdGVkTGlzdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpZCA9ICdub3RTZWxlY3RlZExJc3QnO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGlkPXtpZH0gY2xhc3NOYW1lPVwibmF2LWl0ZW1cIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5uYXZGaWx0ZXIoZSl9Pnt0aGlzLnByb3BzLm5hdkxpc3QubGlzdG5hbWV9PC9saT5cbiAgICApO1xuICB9XG5cbn0iXX0=