"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoList = function (_React$Component) {
  _inherits(TodoList, _React$Component);

  function TodoList(props) {
    _classCallCheck(this, TodoList);

    return _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));
  }

  _createClass(TodoList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var quantItems = this.props.todoList.length;

      return React.createElement(
        "div",
        { className: "list-container" },
        React.createElement(
          "div",
          { className: "centered-list" },
          React.createElement(
            "div",
            { className: "list-header-container" },
            React.createElement(
              "div",
              { className: "list-header-name" },
              this.props.listname
            ),
            React.createElement(
              "div",
              { className: "list-header-quant" },
              "(",
              quantItems,
              " items)"
            )
          ),
          React.createElement(TodoForm, { addItem: this.props.addItem, userid: this.props.userid, listid: this.props.listid }),
          React.createElement(
            "ul",
            null,
            this.props.todoList.map(function (item) {
              return React.createElement(TodoListItem, { key: item.id, todoListItem: item, deleteItem: _this2.props.deleteItem, updateQuant: _this2.props.updateQuant, userid: _this2.props.userid });
            })
          )
        )
      );
    }
  }]);

  return TodoList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdC5qc3giXSwibmFtZXMiOlsiVG9kb0xpc3QiLCJwcm9wcyIsInF1YW50SXRlbXMiLCJ0b2RvTGlzdCIsImxlbmd0aCIsImxpc3RuYW1lIiwiYWRkSXRlbSIsInVzZXJpZCIsImxpc3RpZCIsIm1hcCIsIml0ZW0iLCJpZCIsImRlbGV0ZUl0ZW0iLCJ1cGRhdGVRdWFudCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLFE7OztBQUNKLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsK0dBQ1hBLEtBRFc7QUFFbEI7Ozs7NkJBR1E7QUFBQTs7QUFDUCxVQUFJQyxhQUFhLEtBQUtELEtBQUwsQ0FBV0UsUUFBWCxDQUFvQkMsTUFBckM7O0FBRUEsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxlQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSx1QkFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLGtCQUFmO0FBQ0csbUJBQUtILEtBQUwsQ0FBV0k7QUFEZCxhQURGO0FBSUU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsbUJBQWY7QUFBQTtBQUNJSCx3QkFESjtBQUFBO0FBQUE7QUFKRixXQURGO0FBU0UsOEJBQUMsUUFBRCxJQUFVLFNBQVMsS0FBS0QsS0FBTCxDQUFXSyxPQUE5QixFQUF1QyxRQUFRLEtBQUtMLEtBQUwsQ0FBV00sTUFBMUQsRUFBa0UsUUFBUSxLQUFLTixLQUFMLENBQVdPLE1BQXJGLEdBVEY7QUFVRTtBQUFBO0FBQUE7QUFDRyxpQkFBS1AsS0FBTCxDQUFXRSxRQUFYLENBQW9CTSxHQUFwQixDQUF3QixVQUFDQyxJQUFEO0FBQUEscUJBQVUsb0JBQUMsWUFBRCxJQUFjLEtBQUtBLEtBQUtDLEVBQXhCLEVBQTRCLGNBQWNELElBQTFDLEVBQWdELFlBQVksT0FBS1QsS0FBTCxDQUFXVyxVQUF2RSxFQUFtRixhQUFhLE9BQUtYLEtBQUwsQ0FBV1ksV0FBM0csRUFBd0gsUUFBUSxPQUFLWixLQUFMLENBQVdNLE1BQTNJLEdBQVY7QUFBQSxhQUF4QjtBQURIO0FBVkY7QUFERixPQURGO0FBa0JEOzs7O0VBM0JvQk8sTUFBTUMsUyIsImZpbGUiOiJUb2RvTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgcXVhbnRJdGVtcyA9IHRoaXMucHJvcHMudG9kb0xpc3QubGVuZ3RoO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJlZC1saXN0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LWhlYWRlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1oZWFkZXItbmFtZVwiPlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5saXN0bmFtZX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LWhlYWRlci1xdWFudFwiPlxuICAgICAgICAgICAgICAoe3F1YW50SXRlbXN9IGl0ZW1zKVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPFRvZG9Gb3JtIGFkZEl0ZW09e3RoaXMucHJvcHMuYWRkSXRlbX0gdXNlcmlkPXt0aGlzLnByb3BzLnVzZXJpZH0gbGlzdGlkPXt0aGlzLnByb3BzLmxpc3RpZH0gLz5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy50b2RvTGlzdC5tYXAoKGl0ZW0pID0+IDxUb2RvTGlzdEl0ZW0ga2V5PXtpdGVtLmlkfSB0b2RvTGlzdEl0ZW09e2l0ZW19IGRlbGV0ZUl0ZW09e3RoaXMucHJvcHMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMucHJvcHMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5wcm9wcy51c2VyaWR9Lz4pfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSJdfQ==