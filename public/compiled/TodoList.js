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
                " "
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrR0FDWCxLQURXO0FBRWxCOzs7OzZCQUdRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQU8sV0FBVSxZQUFqQjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxrQkFBSSxXQUFVLGFBQWQ7QUFBQTtBQUFBLGVBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkY7QUFERixXQURGO0FBT0k7QUFBQTtBQUFBO0FBQ0csaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsR0FBcEIsQ0FBd0IsVUFBQyxJQUFEO0FBQUEscUJBQVUsb0JBQUMsWUFBRCxJQUFjLEtBQUssS0FBSyxFQUF4QixFQUE0QixjQUFjLElBQTFDLEVBQWdELFlBQVksT0FBSyxLQUFMLENBQVcsVUFBdkUsRUFBbUYsYUFBYSxPQUFLLEtBQUwsQ0FBVyxXQUEzRyxFQUF3SCxRQUFRLE9BQUssS0FBTCxDQUFXLE1BQTNJLEdBQVY7QUFBQSxhQUF4QjtBQURIO0FBUEo7QUFERixPQURGO0FBZUQ7Ozs7RUF0Qm9CLE1BQU0sUzs7QUF5QjdCO0FBQ2M7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJUb2RvTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJlZC10YWJsZVwiPlxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUtbGlzdFwiPlxuICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImhlYWRlci1uYW1lXCI+SXRlbTwvdGg+XG4gICAgICAgICAgICAgIDx0aD4gPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9kb0xpc3QubWFwKChpdGVtKSA9PiA8VG9kb0xpc3RJdGVtIGtleT17aXRlbS5pZH0gdG9kb0xpc3RJdGVtPXtpdGVtfSBkZWxldGVJdGVtPXt0aGlzLnByb3BzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnByb3BzLnVwZGF0ZVF1YW50fSB1c2VyaWQ9e3RoaXMucHJvcHMudXNlcmlkfS8+KX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbi8vIHJlbW92ZWQgZnJvbSBhYm92ZSB3aGVuIGRlY2lzaW9uIHRvIGdldCByaWQgb2YgY29zdCBhbmQgcXVhbnQgd2FzIG1hZGUgLSBjb2RlIGV4aXN0cyBpbmNhc2UgcmV2ZXJ0XG4gICAgICAgICAgICAgIC8vIDx0aD5RdHk8L3RoPlxuICAgICAgICAgICAgICAvLyA8dGg+KzwvdGg+XG4gICAgICAgICAgICAgIC8vIDx0aD4tPC90aD5cbiAgICAgICAgICAgICAgLy8gPHRoPkNvc3QvVW5pdDwvdGg+XG4gICAgICAgICAgICAgIC8vIDx0aD5Ub3RhbCBDb3N0PC90aD4iXX0=