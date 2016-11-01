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

      return React.createElement(
        "div",
        { className: "centered-table" },
        React.createElement(
          "table",
          { className: "table-list" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                { className: "header-name" },
                "Item"
              ),
              React.createElement(
                "th",
                null,
                "Qty"
              ),
              React.createElement(
                "th",
                null,
                "+"
              ),
              React.createElement(
                "th",
                null,
                "-"
              ),
              React.createElement(
                "th",
                null,
                "Cost/Unit"
              ),
              React.createElement(
                "th",
                null,
                "Total Cost"
              ),
              React.createElement(
                "th",
                null,
                "Del"
              )
            )
          ),
          React.createElement(
            "tbody",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrR0FDWCxLQURXO0FBRWxCOzs7OzZCQUdRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQU8sV0FBVSxZQUFqQjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxrQkFBSSxXQUFVLGFBQWQ7QUFBQTtBQUFBLGVBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSEY7QUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSkY7QUFLRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTEY7QUFNRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTkY7QUFPRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUEY7QUFERixXQURGO0FBWUk7QUFBQTtBQUFBO0FBQ0csaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsR0FBcEIsQ0FBd0IsVUFBQyxJQUFEO0FBQUEscUJBQVUsb0JBQUMsWUFBRCxJQUFjLEtBQUssS0FBSyxFQUF4QixFQUE0QixjQUFjLElBQTFDLEVBQWdELFlBQVksT0FBSyxLQUFMLENBQVcsVUFBdkUsRUFBbUYsYUFBYSxPQUFLLEtBQUwsQ0FBVyxXQUEzRyxFQUF3SCxRQUFRLE9BQUssS0FBTCxDQUFXLE1BQTNJLEdBQVY7QUFBQSxhQUF4QjtBQURIO0FBWko7QUFERixPQURGO0FBb0JEOzs7O0VBM0JvQixNQUFNLFMiLCJmaWxlIjoiVG9kb0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyZWQtdGFibGVcIj5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlLWxpc3RcIj5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJoZWFkZXItbmFtZVwiPkl0ZW08L3RoPlxuICAgICAgICAgICAgICA8dGg+UXR5PC90aD5cbiAgICAgICAgICAgICAgPHRoPis8L3RoPlxuICAgICAgICAgICAgICA8dGg+LTwvdGg+XG4gICAgICAgICAgICAgIDx0aD5Db3N0L1VuaXQ8L3RoPlxuICAgICAgICAgICAgICA8dGg+VG90YWwgQ29zdDwvdGg+XG4gICAgICAgICAgICAgIDx0aD5EZWw8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2RvTGlzdC5tYXAoKGl0ZW0pID0+IDxUb2RvTGlzdEl0ZW0ga2V5PXtpdGVtLmlkfSB0b2RvTGlzdEl0ZW09e2l0ZW19IGRlbGV0ZUl0ZW09e3RoaXMucHJvcHMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMucHJvcHMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5wcm9wcy51c2VyaWR9Lz4pfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==