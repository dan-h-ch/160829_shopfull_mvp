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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrR0FDWCxLQURXO0FBRWxCOzs7OzZCQUdRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxhQUFmO0FBQ0csZUFBSyxLQUFMLENBQVc7QUFEZCxTQURGO0FBSUU7QUFBQTtBQUFBO0FBQ0csZUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixHQUFwQixDQUF3QixVQUFDLElBQUQ7QUFBQSxtQkFBVSxvQkFBQyxZQUFELElBQWMsS0FBSyxLQUFLLEVBQXhCLEVBQTRCLGNBQWMsSUFBMUMsRUFBZ0QsWUFBWSxPQUFLLEtBQUwsQ0FBVyxVQUF2RSxFQUFtRixhQUFhLE9BQUssS0FBTCxDQUFXLFdBQTNHLEVBQXdILFFBQVEsT0FBSyxLQUFMLENBQVcsTUFBM0ksR0FBVjtBQUFBLFdBQXhCO0FBREg7QUFKRixPQURGO0FBVUQ7Ozs7RUFqQm9CLE1BQU0sUyIsImZpbGUiOiJUb2RvTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJlZC10YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1uYW1lXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMubGlzdG5hbWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8dWw+XG4gICAgICAgICAge3RoaXMucHJvcHMudG9kb0xpc3QubWFwKChpdGVtKSA9PiA8VG9kb0xpc3RJdGVtIGtleT17aXRlbS5pZH0gdG9kb0xpc3RJdGVtPXtpdGVtfSBkZWxldGVJdGVtPXt0aGlzLnByb3BzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnByb3BzLnVwZGF0ZVF1YW50fSB1c2VyaWQ9e3RoaXMucHJvcHMudXNlcmlkfS8+KX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iXX0=