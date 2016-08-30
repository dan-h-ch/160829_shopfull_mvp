"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoListItem = function (_React$Component) {
  _inherits(TodoListItem, _React$Component);

  function TodoListItem(props) {
    _classCallCheck(this, TodoListItem);

    return _possibleConstructorReturn(this, (TodoListItem.__proto__ || Object.getPrototypeOf(TodoListItem)).call(this, props));
  }

  _createClass(TodoListItem, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          this.props.todoListItem.itemname
        ),
        React.createElement(
          "td",
          null,
          this.props.todoListItem.quantity
        ),
        React.createElement(
          "td",
          null,
          this.props.todoListItem.cost
        ),
        React.createElement(
          "td",
          null,
          this.props.todoListItem.quantity * this.props.todoListItem.cost
        )
      );
    }
  }]);

  return TodoListItem;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0SXRlbS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFk7OztBQUVKLHdCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx1SEFDWCxLQURXO0FBRWxCOzs7OzZCQUlRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBSyxlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCO0FBQTdCLFNBREY7QUFFRTtBQUFBO0FBQUE7QUFBSyxlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCO0FBQTdCLFNBRkY7QUFHRTtBQUFBO0FBQUE7QUFBSyxlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCO0FBQTdCLFNBSEY7QUFJRTtBQUFBO0FBQUE7QUFBSyxlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLFFBQXhCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0I7QUFBaEU7QUFKRixPQURGO0FBUUQ7Ozs7RUFqQndCLE1BQU0sUyIsImZpbGUiOiJUb2RvTGlzdEl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvTGlzdEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgfVxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPnt0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5pdGVtbmFtZX08L3RkPlxuICAgICAgICA8dGQ+e3RoaXMucHJvcHMudG9kb0xpc3RJdGVtLnF1YW50aXR5fTwvdGQ+XG4gICAgICAgIDx0ZD57dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uY29zdH08L3RkPlxuICAgICAgICA8dGQ+e3RoaXMucHJvcHMudG9kb0xpc3RJdGVtLnF1YW50aXR5ICogdGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uY29zdH08L3RkPlxuICAgICAgPC90cj5cbiAgICApXG4gIH1cblxufSJdfQ==