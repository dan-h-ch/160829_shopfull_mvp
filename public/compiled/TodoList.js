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

// removed from above when decision to get rid of cost and quant was made - code exists incase revert
// <th>Qty</th>
// <th>+</th>
// <th>-</th>
// <th>Cost/Unit</th>
// <th>Total Cost</th>
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrR0FDWCxLQURXO0FBRWxCOzs7OzZCQUdRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQU8sV0FBVSxZQUFqQjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxrQkFBSSxXQUFVLGFBQWQ7QUFBQTtBQUFBLGVBREY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEY7QUFERixXQURGO0FBUUk7QUFBQTtBQUFBO0FBQ0csaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsR0FBcEIsQ0FBd0IsVUFBQyxJQUFEO0FBQUEscUJBQVUsb0JBQUMsWUFBRCxJQUFjLEtBQUssS0FBSyxFQUF4QixFQUE0QixjQUFjLElBQTFDLEVBQWdELFlBQVksT0FBSyxLQUFMLENBQVcsVUFBdkUsRUFBbUYsYUFBYSxPQUFLLEtBQUwsQ0FBVyxXQUEzRyxFQUF3SCxRQUFRLE9BQUssS0FBTCxDQUFXLE1BQTNJLEdBQVY7QUFBQSxhQUF4QjtBQURIO0FBUko7QUFERixPQURGO0FBZ0JEOzs7O0VBdkJvQixNQUFNLFM7O0FBMEI3QjtBQUNjO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiVG9kb0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyZWQtdGFibGVcIj5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlLWxpc3RcIj5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJoZWFkZXItbmFtZVwiPkl0ZW08L3RoPlxuXG4gICAgICAgICAgICAgIDx0aD5EZWw8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50b2RvTGlzdC5tYXAoKGl0ZW0pID0+IDxUb2RvTGlzdEl0ZW0ga2V5PXtpdGVtLmlkfSB0b2RvTGlzdEl0ZW09e2l0ZW19IGRlbGV0ZUl0ZW09e3RoaXMucHJvcHMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMucHJvcHMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5wcm9wcy51c2VyaWR9Lz4pfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuLy8gcmVtb3ZlZCBmcm9tIGFib3ZlIHdoZW4gZGVjaXNpb24gdG8gZ2V0IHJpZCBvZiBjb3N0IGFuZCBxdWFudCB3YXMgbWFkZSAtIGNvZGUgZXhpc3RzIGluY2FzZSByZXZlcnRcbiAgICAgICAgICAgICAgLy8gPHRoPlF0eTwvdGg+XG4gICAgICAgICAgICAgIC8vIDx0aD4rPC90aD5cbiAgICAgICAgICAgICAgLy8gPHRoPi08L3RoPlxuICAgICAgICAgICAgICAvLyA8dGg+Q29zdC9Vbml0PC90aD5cbiAgICAgICAgICAgICAgLy8gPHRoPlRvdGFsIENvc3Q8L3RoPiJdfQ==