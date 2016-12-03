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
          "div",
          { className: "header-name" },
          this.props.listname
        ),
        React.createElement(
          "ul",
          null,
          this.props.todoList.map(function (item) {
            return React.createElement(TodoListItem, { key: item.id, todoListItem: item, deleteItem: _this2.props.deleteItem, updateQuant: _this2.props.updateQuant, userid: _this2.props.userid });
          })
        )
      );
    }
  }]);

  return TodoList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdC5qc3giXSwibmFtZXMiOlsiVG9kb0xpc3QiLCJwcm9wcyIsImxpc3RuYW1lIiwidG9kb0xpc3QiLCJtYXAiLCJpdGVtIiwiaWQiLCJkZWxldGVJdGVtIiwidXBkYXRlUXVhbnQiLCJ1c2VyaWQiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxROzs7QUFDSixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLCtHQUNYQSxLQURXO0FBRWxCOzs7OzZCQUdRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxhQUFmO0FBQ0csZUFBS0EsS0FBTCxDQUFXQztBQURkLFNBREY7QUFJRTtBQUFBO0FBQUE7QUFDRyxlQUFLRCxLQUFMLENBQVdFLFFBQVgsQ0FBb0JDLEdBQXBCLENBQXdCLFVBQUNDLElBQUQ7QUFBQSxtQkFBVSxvQkFBQyxZQUFELElBQWMsS0FBS0EsS0FBS0MsRUFBeEIsRUFBNEIsY0FBY0QsSUFBMUMsRUFBZ0QsWUFBWSxPQUFLSixLQUFMLENBQVdNLFVBQXZFLEVBQW1GLGFBQWEsT0FBS04sS0FBTCxDQUFXTyxXQUEzRyxFQUF3SCxRQUFRLE9BQUtQLEtBQUwsQ0FBV1EsTUFBM0ksR0FBVjtBQUFBLFdBQXhCO0FBREg7QUFKRixPQURGO0FBVUQ7Ozs7RUFqQm9CQyxNQUFNQyxTIiwiZmlsZSI6IlRvZG9MaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kb0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlcmVkLXRhYmxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLW5hbWVcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5saXN0bmFtZX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICB7dGhpcy5wcm9wcy50b2RvTGlzdC5tYXAoKGl0ZW0pID0+IDxUb2RvTGlzdEl0ZW0ga2V5PXtpdGVtLmlkfSB0b2RvTGlzdEl0ZW09e2l0ZW19IGRlbGV0ZUl0ZW09e3RoaXMucHJvcHMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMucHJvcHMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5wcm9wcy51c2VyaWR9Lz4pfVxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSJdfQ==