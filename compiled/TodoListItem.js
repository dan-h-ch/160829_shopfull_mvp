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
    key: "render",
    value: function render() {
      var _this2 = this;

      var totalCost = Math.round(this.props.todoListItem.quantity * this.props.todoListItem.cost * 100) / 100;
      return React.createElement(
        "tr",
        { onClick: function onClick(e) {
            return _this2.handleClick(e);
          } },
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
          null,
          "+"
        ),
        React.createElement(
          "td",
          null,
          "-"
        ),
        React.createElement(
          "td",
          null,
          "$",
          this.props.todoListItem.cost
        ),
        React.createElement(
          "td",
          null,
          "$",
          totalCost
        )
      );
    }
  }]);

  return TodoListItem;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0SXRlbS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFk7OztBQUVKLHdCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx1SEFDWCxLQURXO0FBRWxCOzs7O2dDQUVXLEMsRUFBRztBQUNiLFdBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBSyxLQUFMLENBQVcsWUFBakM7QUFDRDs7OzZCQUlRO0FBQUE7O0FBQ1AsVUFBSSxZQUFZLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsUUFBeEIsR0FBbUMsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixJQUEzRCxHQUFrRSxHQUE3RSxJQUFvRixHQUFwRztBQUNBLGFBQ0U7QUFBQTtBQUFBLFVBQUksU0FBUyxpQkFBQyxDQUFEO0FBQUEsbUJBQU8sT0FBSyxXQUFMLENBQWlCLENBQWpCLENBQVA7QUFBQSxXQUFiO0FBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSxXQUFkO0FBQTJCLGVBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0I7QUFBbkQsU0FERjtBQUVFO0FBQUE7QUFBQTtBQUFLLGVBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0I7QUFBN0IsU0FGRjtBQUdFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FIRjtBQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FKRjtBQUtFO0FBQUE7QUFBQTtBQUFBO0FBQU0sZUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QjtBQUE5QixTQUxGO0FBTUU7QUFBQTtBQUFBO0FBQUE7QUFBTTtBQUFOO0FBTkYsT0FERjtBQVVEOzs7O0VBeEJ3QixNQUFNLFMiLCJmaWxlIjoiVG9kb0xpc3RJdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kb0xpc3RJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuICBoYW5kbGVDbGljayhlKSB7XG4gICAgdGhpcy5wcm9wcy5kZWxldGVJdGVtKHRoaXMucHJvcHMudG9kb0xpc3RJdGVtKVxuICB9XG5cblxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgdG90YWxDb3N0ID0gTWF0aC5yb3VuZCh0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5xdWFudGl0eSAqIHRoaXMucHJvcHMudG9kb0xpc3RJdGVtLmNvc3QgKiAxMDApIC8gMTAwXG4gICAgcmV0dXJuIChcbiAgICAgIDx0ciBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVDbGljayhlKX0+XG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJpdGVtLW5hbWVcIj57dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uaXRlbW5hbWV9PC90ZD5cbiAgICAgICAgPHRkPnt0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5xdWFudGl0eX08L3RkPlxuICAgICAgICA8dGQ+KzwvdGQ+XG4gICAgICAgIDx0ZD4tPC90ZD5cbiAgICAgICAgPHRkPiR7dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uY29zdH08L3RkPlxuICAgICAgICA8dGQ+JHt0b3RhbENvc3R9PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgKVxuICB9XG5cbn0iXX0=