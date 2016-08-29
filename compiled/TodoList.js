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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sUTs7O0FBQ0osb0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLCtHQUNYLEtBRFc7QUFFbEI7Ozs7NkJBR1E7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FGRjtBQUdFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FIRjtBQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKRixTQURGO0FBT0csYUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixHQUFwQixDQUF3QixVQUFDLElBQUQ7QUFBQSxpQkFBVSxvQkFBQyxZQUFELElBQWMsY0FBYyxJQUE1QixHQUFWO0FBQUEsU0FBeEI7QUFQSCxPQURGO0FBV0Q7Ozs7RUFsQm9CLE1BQU0sUyIsImZpbGUiOiJUb2RvTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dGFibGU+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGg+U2hvcHBpbmcgSXRlbTwvdGg+XG4gICAgICAgICAgPHRoPlF0eTwvdGg+XG4gICAgICAgICAgPHRoPkNvc3QvVW5pdDwvdGg+XG4gICAgICAgICAgPHRoPlRvdGFsIENvc3Q8L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgICB7dGhpcy5wcm9wcy50b2RvTGlzdC5tYXAoKGl0ZW0pID0+IDxUb2RvTGlzdEl0ZW0gdG9kb0xpc3RJdGVtPXtpdGVtfSAvPil9XG4gICAgICA8L3RhYmxlPlxuICAgIClcbiAgfVxufVxuIl19