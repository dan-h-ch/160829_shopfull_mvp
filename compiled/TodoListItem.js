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
    key: "handleClick",
    value: function handleClick(e) {
      this.props.deleteItem(this.props.todoListItem);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "tr",
        { onClick: function onClick(e) {
            return _this2.handleClick(e);
          } },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0SXRlbS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFk7OztBQUVKLHdCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx1SEFDWCxLQURXO0FBRWxCOzs7O2dDQUVXLEMsRUFBRztBQUNiLFdBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBSyxLQUFMLENBQVcsWUFBakM7QUFDRDs7OzZCQUlRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSSxTQUFTLGlCQUFDLENBQUQ7QUFBQSxtQkFBTyxPQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBUDtBQUFBLFdBQWI7QUFDRTtBQUFBO0FBQUE7QUFBSyxlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCO0FBQTdCLFNBREY7QUFFRTtBQUFBO0FBQUE7QUFBSyxlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCO0FBQTdCLFNBRkY7QUFHRTtBQUFBO0FBQUE7QUFBSyxlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCO0FBQTdCLFNBSEY7QUFJRTtBQUFBO0FBQUE7QUFBSyxlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLFFBQXhCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0I7QUFBaEU7QUFKRixPQURGO0FBUUQ7Ozs7RUFyQndCLE1BQU0sUyIsImZpbGUiOiJUb2RvTGlzdEl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvTGlzdEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICB0aGlzLnByb3BzLmRlbGV0ZUl0ZW0odGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0pXG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dHIgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlQ2xpY2soZSl9PlxuICAgICAgICA8dGQ+e3RoaXMucHJvcHMudG9kb0xpc3RJdGVtLml0ZW1uYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD57dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0ucXVhbnRpdHl9PC90ZD5cbiAgICAgICAgPHRkPnt0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5jb3N0fTwvdGQ+XG4gICAgICAgIDx0ZD57dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0ucXVhbnRpdHkgKiB0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5jb3N0fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgIClcbiAgfVxuXG59Il19