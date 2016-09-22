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
                "  +  "
              ),
              React.createElement(
                "th",
                null,
                "  -  "
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
              return React.createElement(TodoListItem, { key: item.id, todoListItem: item, deleteItem: _this2.props.deleteItem, updateQuant: _this2.props.updateQuant });
            })
          )
        )
      );
    }
  }]);

  return TodoList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sUTs7O0FBQ0osb0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLCtHQUNYLEtBRFc7QUFFbEI7Ozs7NkJBR1E7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0JBQWY7QUFDRTtBQUFBO0FBQUEsWUFBTyxXQUFVLFlBQWpCO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGtCQUFJLFdBQVUsYUFBZDtBQUFBO0FBQUEsZUFERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFGRjtBQUdFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFIRjtBQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFKRjtBQUtFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFMRjtBQU1FO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFORjtBQU9FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFQRjtBQURGLFdBREY7QUFZSTtBQUFBO0FBQUE7QUFDRyxpQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixHQUFwQixDQUF3QixVQUFDLElBQUQ7QUFBQSxxQkFBVSxvQkFBQyxZQUFELElBQWMsS0FBSyxLQUFLLEVBQXhCLEVBQTRCLGNBQWMsSUFBMUMsRUFBZ0QsWUFBWSxPQUFLLEtBQUwsQ0FBVyxVQUF2RSxFQUFtRixhQUFhLE9BQUssS0FBTCxDQUFXLFdBQTNHLEdBQVY7QUFBQSxhQUF4QjtBQURIO0FBWko7QUFERixPQURGO0FBb0JEOzs7O0VBM0JvQixNQUFNLFMiLCJmaWxlIjoiVG9kb0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJlZC10YWJsZVwiPlxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUtbGlzdFwiPlxuICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImhlYWRlci1uYW1lXCI+SXRlbTwvdGg+XG4gICAgICAgICAgICAgIDx0aD5RdHk8L3RoPlxuICAgICAgICAgICAgICA8dGg+ICArICA8L3RoPlxuICAgICAgICAgICAgICA8dGg+ICAtICA8L3RoPlxuICAgICAgICAgICAgICA8dGg+Q29zdC9Vbml0PC90aD5cbiAgICAgICAgICAgICAgPHRoPlRvdGFsIENvc3Q8L3RoPlxuICAgICAgICAgICAgICA8dGg+RGVsPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMudG9kb0xpc3QubWFwKChpdGVtKSA9PiA8VG9kb0xpc3RJdGVtIGtleT17aXRlbS5pZH0gdG9kb0xpc3RJdGVtPXtpdGVtfSBkZWxldGVJdGVtPXt0aGlzLnByb3BzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnByb3BzLnVwZGF0ZVF1YW50fSAvPil9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG4iXX0=