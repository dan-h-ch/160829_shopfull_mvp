"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoListItem = function (_React$Component) {
  _inherits(TodoListItem, _React$Component);

  function TodoListItem(props) {
    _classCallCheck(this, TodoListItem);

    return _possibleConstructorReturn(this, (TodoListItem.__proto__ || Object.getPrototypeOf(TodoListItem)).call(this, props));
  }

  _createClass(TodoListItem, [{
    key: "handleClick",
    value: function handleClick(e) {
      this.props.deleteItem(this.props.todoListItem);
    }
  }, {
    key: "increaseQuant",
    value: function increaseQuant(e) {
      this.props.updateQuant(this.props.todoListItem, "add");
    }
  }, {
    key: "decreaseQuant",
    value: function decreaseQuant(e) {
      this.props.updateQuant(this.props.todoListItem, "sub");
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var totalCost = Math.round(this.props.todoListItem.quantity * this.props.todoListItem.cost * 100) / 100;
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { className: "item-name" },
          this.props.todoListItem.itemname
        ),
        React.createElement(
          "td",
          null,
          this.props.todoListItem.quantity
        ),
        React.createElement(
          "td",
          { onClick: function onClick(e) {
              return _this2.increaseQuant(e);
            } },
          "+"
        ),
        React.createElement(
          "td",
          { onClick: function onClick(e) {
              return _this2.decreaseQuant(e);
            } },
          "-"
        ),
        React.createElement(
          "td",
          null,
          "$",
          this.props.todoListItem.cost.toFixed(2)
        ),
        React.createElement(
          "td",
          null,
          "$",
          totalCost.toFixed(2)
        ),
        React.createElement(
          "td",
          { className: "delete", onClick: function onClick(e) {
              return _this2.handleClick(e);
            } },
          "delete"
        )
      );
    }
  }]);

  return TodoListItem;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0SXRlbS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFk7OztBQUVKLHdCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx1SEFDWCxLQURXO0FBRWxCOzs7O2dDQUVXLEMsRUFBRztBQUNiLFdBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBSyxLQUFMLENBQVcsWUFBakM7QUFDRDs7O2tDQUVhLEMsRUFBRztBQUNmLFdBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxLQUFMLENBQVcsWUFBbEMsRUFBZ0QsS0FBaEQ7QUFDRDs7O2tDQUVhLEMsRUFBRztBQUNmLFdBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxLQUFMLENBQVcsWUFBbEMsRUFBZ0QsS0FBaEQ7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSSxZQUFZLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsUUFBeEIsR0FBbUMsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixJQUEzRCxHQUFrRSxHQUE3RSxJQUFvRixHQUFwRztBQUNBLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSxXQUFkO0FBQTJCLGVBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0I7QUFBbkQsU0FERjtBQUVFO0FBQUE7QUFBQTtBQUFLLGVBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0I7QUFBN0IsU0FGRjtBQUdFO0FBQUE7QUFBQSxZQUFJLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssYUFBTCxDQUFtQixDQUFuQixDQUFQO0FBQUEsYUFBYjtBQUFBO0FBQUEsU0FIRjtBQUlFO0FBQUE7QUFBQSxZQUFJLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssYUFBTCxDQUFtQixDQUFuQixDQUFQO0FBQUEsYUFBYjtBQUFBO0FBQUEsU0FKRjtBQUtFO0FBQUE7QUFBQTtBQUFBO0FBQU0sZUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixJQUF4QixDQUE2QixPQUE3QixDQUFxQyxDQUFyQztBQUFOLFNBTEY7QUFNRTtBQUFBO0FBQUE7QUFBQTtBQUFNLG9CQUFVLE9BQVYsQ0FBa0IsQ0FBbEI7QUFBTixTQU5GO0FBT0U7QUFBQTtBQUFBLFlBQUksV0FBVSxRQUFkLEVBQXVCLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssV0FBTCxDQUFpQixDQUFqQixDQUFQO0FBQUEsYUFBaEM7QUFBQTtBQUFBO0FBUEYsT0FERjtBQVdEOzs7O0VBL0J3QixNQUFNLFMiLCJmaWxlIjoiVG9kb0xpc3RJdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kb0xpc3RJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuICBoYW5kbGVDbGljayhlKSB7XG4gICAgdGhpcy5wcm9wcy5kZWxldGVJdGVtKHRoaXMucHJvcHMudG9kb0xpc3RJdGVtKVxuICB9XG5cbiAgaW5jcmVhc2VRdWFudChlKSB7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVRdWFudCh0aGlzLnByb3BzLnRvZG9MaXN0SXRlbSwgXCJhZGRcIilcbiAgfVxuXG4gIGRlY3JlYXNlUXVhbnQoZSkge1xuICAgIHRoaXMucHJvcHMudXBkYXRlUXVhbnQodGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0sIFwic3ViXCIpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHRvdGFsQ29zdCA9IE1hdGgucm91bmQodGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0ucXVhbnRpdHkgKiB0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5jb3N0ICogMTAwKSAvIDEwMFxuICAgIHJldHVybiAoXG4gICAgICA8dHI+XG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJpdGVtLW5hbWVcIj57dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uaXRlbW5hbWV9PC90ZD5cbiAgICAgICAgPHRkPnt0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5xdWFudGl0eX08L3RkPlxuICAgICAgICA8dGQgb25DbGljaz17KGUpID0+IHRoaXMuaW5jcmVhc2VRdWFudChlKX0+KzwvdGQ+XG4gICAgICAgIDx0ZCBvbkNsaWNrPXsoZSkgPT4gdGhpcy5kZWNyZWFzZVF1YW50KGUpfT4tPC90ZD5cbiAgICAgICAgPHRkPiR7dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uY29zdC50b0ZpeGVkKDIpfTwvdGQ+XG4gICAgICAgIDx0ZD4ke3RvdGFsQ29zdC50b0ZpeGVkKDIpfTwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJkZWxldGVcIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVDbGljayhlKX0+ZGVsZXRlPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgKVxuICB9XG5cbn0iXX0=