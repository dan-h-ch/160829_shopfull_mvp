"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoCost = function (_React$Component) {
  _inherits(TodoCost, _React$Component);

  function TodoCost(props) {
    _classCallCheck(this, TodoCost);

    return _possibleConstructorReturn(this, (TodoCost.__proto__ || Object.getPrototypeOf(TodoCost)).call(this, props));
  }

  _createClass(TodoCost, [{
    key: "render",
    value: function render() {
      var totCost = this.props.todoList.reduce(function (memo, val) {
        return memo + val.quantity * val.cost;
      }, 0);

      return React.createElement(
        "div",
        { className: "final-cost" },
        "Total Cost For This Project: $",
        totCost.toFixed(2)
      );
    }
  }]);

  return TodoCost;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9Db3N0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sUTs7O0FBRUosb0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLCtHQUNYLEtBRFc7QUFFbEI7Ozs7NkJBRVE7QUFDUCxVQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixNQUFwQixDQUEyQixVQUFDLElBQUQsRUFBTyxHQUFQLEVBQWU7QUFDdEQsZUFBTyxPQUFRLElBQUksUUFBSixHQUFhLElBQUksSUFBaEM7QUFBc0MsT0FEMUIsRUFDNEIsQ0FENUIsQ0FBZDs7QUFHQSxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsWUFBZjtBQUFBO0FBQTJELGdCQUFRLE9BQVIsQ0FBZ0IsQ0FBaEI7QUFBM0QsT0FERjtBQUdEOzs7O0VBYm9CLE1BQU0sUyIsImZpbGUiOiJUb2RvQ29zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9Db3N0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHRvdENvc3QgPSB0aGlzLnByb3BzLnRvZG9MaXN0LnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICByZXR1cm4gbWVtbyArICh2YWwucXVhbnRpdHkqdmFsLmNvc3QpfSwgMClcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbmFsLWNvc3RcIj5Ub3RhbCBDb3N0IEZvciBUaGlzIFByb2plY3Q6ICR7dG90Q29zdC50b0ZpeGVkKDIpfTwvZGl2PlxuICAgIClcbiAgfVxuXG5cbn1cblxuXG4iXX0=