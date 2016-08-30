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
      return React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "Shopping Item"
            ),
            React.createElement(
              "th",
              null,
              "Qty"
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
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          this.props.todoList.map(function (item) {
            return React.createElement(TodoListItem, { todoListItem: item });
          })
        )
      );
    }
  }]);

  return TodoList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sUTs7O0FBQ0osb0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLCtHQUNYLEtBRFc7QUFFbEI7Ozs7NkJBR1E7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFGRjtBQUdFO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFIRjtBQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKRjtBQURGLFNBREY7QUFTSTtBQUFBO0FBQUE7QUFDRCxlQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEdBQXBCLENBQXdCLFVBQUMsSUFBRDtBQUFBLG1CQUFVLG9CQUFDLFlBQUQsSUFBYyxjQUFjLElBQTVCLEdBQVY7QUFBQSxXQUF4QjtBQURDO0FBVEosT0FERjtBQWVEOzs7O0VBdEJvQixNQUFNLFMiLCJmaWxlIjoiVG9kb0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlPlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPlNob3BwaW5nIEl0ZW08L3RoPlxuICAgICAgICAgICAgPHRoPlF0eTwvdGg+XG4gICAgICAgICAgICA8dGg+Q29zdC9Vbml0PC90aD5cbiAgICAgICAgICAgIDx0aD5Ub3RhbCBDb3N0PC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAge3RoaXMucHJvcHMudG9kb0xpc3QubWFwKChpdGVtKSA9PiA8VG9kb0xpc3RJdGVtIHRvZG9MaXN0SXRlbT17aXRlbX0gLz4pfVxuICAgICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIClcbiAgfVxufVxuIl19