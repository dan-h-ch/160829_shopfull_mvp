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
      console.log(this.props.todoList);
      return React.createElement(
        "table",
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
        ),
        this.props.todoList.map(function (item) {
          return React.createElement(TodoListItem, { todoListItem: item });
        })
      );
    }
  }]);

  return TodoList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sUTs7O0FBQ0osb0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLCtHQUNYLEtBRFc7QUFFbEI7Ozs7NkJBR1E7QUFDUCxjQUFRLEdBQVIsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxRQUF2QjtBQUNBLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUhGO0FBSUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpGLFNBREY7QUFPRyxhQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEdBQXBCLENBQXdCLFVBQUMsSUFBRDtBQUFBLGlCQUFVLG9CQUFDLFlBQUQsSUFBYyxjQUFjLElBQTVCLEdBQVY7QUFBQSxTQUF4QjtBQVBILE9BREY7QUFXRDs7OztFQW5Cb0IsTUFBTSxTIiwiZmlsZSI6IlRvZG9MaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kb0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5wcm9wcy50b2RvTGlzdClcbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPlNob3BwaW5nIEl0ZW08L3RoPlxuICAgICAgICAgIDx0aD5RdHk8L3RoPlxuICAgICAgICAgIDx0aD5Db3N0L1VuaXQ8L3RoPlxuICAgICAgICAgIDx0aD5Ub3RhbCBDb3N0PC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgICAge3RoaXMucHJvcHMudG9kb0xpc3QubWFwKChpdGVtKSA9PiA8VG9kb0xpc3RJdGVtIHRvZG9MaXN0SXRlbT17aXRlbX0gLz4pfVxuICAgICAgPC90YWJsZT5cbiAgICApXG4gIH1cbn1cbiJdfQ==