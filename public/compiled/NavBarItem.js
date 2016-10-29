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
      console.log(this.props.navList.id);
      // need to set list id up chain
      this.props.updateListid(this.props.navList.id);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.props.listid === this.props.navList.id) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OYXZCYXJJdGVtLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sVTs7O0FBQ0osc0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLG1IQUNYLEtBRFc7QUFFbEI7Ozs7OEJBRVMsQyxFQUFHO0FBQ1gsY0FBUSxHQUFSLENBQVksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixFQUEvQjtBQUNBO0FBQ0EsV0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEVBQTNDO0FBQ0Q7Ozs2QkFJUTtBQUFBOztBQUNQLFVBQUksS0FBSyxLQUFMLENBQVcsTUFBWCxLQUFzQixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEVBQTdDLEVBQWlEO0FBQy9DLFlBQUksS0FBSyxjQUFUO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSSxLQUFLLGlCQUFUO0FBQ0Q7QUFDRCxhQUNFO0FBQUE7QUFBQSxVQUFJLElBQUksRUFBUixFQUFZLFdBQVUsVUFBdEIsRUFBaUMsU0FBUyxpQkFBQyxDQUFEO0FBQUEsbUJBQU8sT0FBSyxTQUFMLENBQWUsQ0FBZixDQUFQO0FBQUEsV0FBMUM7QUFBcUUsYUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUF4RixPQURGO0FBR0Q7Ozs7RUF0QnNCLE1BQU0sUyIsImZpbGUiOiJOYXZCYXJJdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTmF2QmFySXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuICBuYXZGaWx0ZXIoZSkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMubmF2TGlzdC5pZClcbiAgICAvLyBuZWVkIHRvIHNldCBsaXN0IGlkIHVwIGNoYWluXG4gICAgdGhpcy5wcm9wcy51cGRhdGVMaXN0aWQodGhpcy5wcm9wcy5uYXZMaXN0LmlkKVxuICB9XG5cblxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5saXN0aWQgPT09IHRoaXMucHJvcHMubmF2TGlzdC5pZCkge1xuICAgICAgdmFyIGlkID0gJ3NlbGVjdGVkTGlzdCdcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGlkID0gJ25vdFNlbGVjdGVkTElzdCdcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBpZD17aWR9IGNsYXNzTmFtZT1cIm5hdi1pdGVtXCIgb25DbGljaz17KGUpID0+IHRoaXMubmF2RmlsdGVyKGUpfT57dGhpcy5wcm9wcy5uYXZMaXN0Lmxpc3RuYW1lfTwvbGk+XG4gICAgKVxuICB9XG5cbn0iXX0=