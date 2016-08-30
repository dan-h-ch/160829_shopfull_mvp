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
          this.props.todoListItem.cost
        ),
        React.createElement(
          "td",
          null,
          "$",
          totalCost
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0SXRlbS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFk7OztBQUVKLHdCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx1SEFDWCxLQURXO0FBRWxCOzs7O2dDQUVXLEMsRUFBRztBQUNiLFdBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBSyxLQUFMLENBQVcsWUFBakM7QUFDRDs7O2tDQUVhLEMsRUFBRztBQUNmLFdBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxLQUFMLENBQVcsWUFBbEMsRUFBZ0QsS0FBaEQ7QUFDRDs7O2tDQUVhLEMsRUFBRztBQUNmLFdBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxLQUFMLENBQVcsWUFBbEMsRUFBZ0QsS0FBaEQ7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSSxZQUFZLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsUUFBeEIsR0FBbUMsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixJQUEzRCxHQUFrRSxHQUE3RSxJQUFvRixHQUFwRztBQUNBLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSxXQUFkO0FBQTJCLGVBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0I7QUFBbkQsU0FERjtBQUVFO0FBQUE7QUFBQTtBQUFLLGVBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0I7QUFBN0IsU0FGRjtBQUdFO0FBQUE7QUFBQSxZQUFJLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssYUFBTCxDQUFtQixDQUFuQixDQUFQO0FBQUEsYUFBYjtBQUFBO0FBQUEsU0FIRjtBQUlFO0FBQUE7QUFBQSxZQUFJLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssYUFBTCxDQUFtQixDQUFuQixDQUFQO0FBQUEsYUFBYjtBQUFBO0FBQUEsU0FKRjtBQUtFO0FBQUE7QUFBQTtBQUFBO0FBQU0sZUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QjtBQUE5QixTQUxGO0FBTUU7QUFBQTtBQUFBO0FBQUE7QUFBTTtBQUFOLFNBTkY7QUFPRTtBQUFBO0FBQUEsWUFBSSxXQUFVLFFBQWQsRUFBdUIsU0FBUyxpQkFBQyxDQUFEO0FBQUEscUJBQU8sT0FBSyxXQUFMLENBQWlCLENBQWpCLENBQVA7QUFBQSxhQUFoQztBQUFBO0FBQUE7QUFQRixPQURGO0FBV0Q7Ozs7RUEvQndCLE1BQU0sUyIsImZpbGUiOiJUb2RvTGlzdEl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvTGlzdEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICB0aGlzLnByb3BzLmRlbGV0ZUl0ZW0odGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0pXG4gIH1cblxuICBpbmNyZWFzZVF1YW50KGUpIHtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVF1YW50KHRoaXMucHJvcHMudG9kb0xpc3RJdGVtLCBcImFkZFwiKVxuICB9XG5cbiAgZGVjcmVhc2VRdWFudChlKSB7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVRdWFudCh0aGlzLnByb3BzLnRvZG9MaXN0SXRlbSwgXCJzdWJcIilcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgdG90YWxDb3N0ID0gTWF0aC5yb3VuZCh0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5xdWFudGl0eSAqIHRoaXMucHJvcHMudG9kb0xpc3RJdGVtLmNvc3QgKiAxMDApIC8gMTAwXG4gICAgcmV0dXJuIChcbiAgICAgIDx0cj5cbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cIml0ZW0tbmFtZVwiPnt0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5pdGVtbmFtZX08L3RkPlxuICAgICAgICA8dGQ+e3RoaXMucHJvcHMudG9kb0xpc3RJdGVtLnF1YW50aXR5fTwvdGQ+XG4gICAgICAgIDx0ZCBvbkNsaWNrPXsoZSkgPT4gdGhpcy5pbmNyZWFzZVF1YW50KGUpfT4rPC90ZD5cbiAgICAgICAgPHRkIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRlY3JlYXNlUXVhbnQoZSl9Pi08L3RkPlxuICAgICAgICA8dGQ+JHt0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5jb3N0fTwvdGQ+XG4gICAgICAgIDx0ZD4ke3RvdGFsQ29zdH08L3RkPlxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZGVsZXRlXCIgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlQ2xpY2soZSl9PmRlbGV0ZTwvdGQ+XG4gICAgICA8L3RyPlxuICAgIClcbiAgfVxuXG59Il19