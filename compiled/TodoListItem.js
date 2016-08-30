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

      var totalCost = Math.round(this.props.todoListItem.quantity * this.props.todoListItem.cost * 100) / 100;
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
          totalCost
        )
      );
    }
  }]);

  return TodoListItem;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9MaXN0SXRlbS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFk7OztBQUVKLHdCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx1SEFDWCxLQURXO0FBRWxCOzs7O2dDQUVXLEMsRUFBRztBQUNiLFdBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsS0FBSyxLQUFMLENBQVcsWUFBakM7QUFDRDs7OzZCQUlRO0FBQUE7O0FBQ1AsVUFBSSxZQUFZLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsUUFBeEIsR0FBbUMsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixJQUEzRCxHQUFrRSxHQUE3RSxJQUFvRixHQUFwRztBQUNBLGFBQ0U7QUFBQTtBQUFBLFVBQUksU0FBUyxpQkFBQyxDQUFEO0FBQUEsbUJBQU8sT0FBSyxXQUFMLENBQWlCLENBQWpCLENBQVA7QUFBQSxXQUFiO0FBQ0U7QUFBQTtBQUFBO0FBQUssZUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QjtBQUE3QixTQURGO0FBRUU7QUFBQTtBQUFBO0FBQUssZUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QjtBQUE3QixTQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUssZUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QjtBQUE3QixTQUhGO0FBSUU7QUFBQTtBQUFBO0FBQUs7QUFBTDtBQUpGLE9BREY7QUFRRDs7OztFQXRCd0IsTUFBTSxTIiwiZmlsZSI6IlRvZG9MaXN0SXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9MaXN0SXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cbiAgaGFuZGxlQ2xpY2soZSkge1xuICAgIHRoaXMucHJvcHMuZGVsZXRlSXRlbSh0aGlzLnByb3BzLnRvZG9MaXN0SXRlbSlcbiAgfVxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHRvdGFsQ29zdCA9IE1hdGgucm91bmQodGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0ucXVhbnRpdHkgKiB0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5jb3N0ICogMTAwKSAvIDEwMFxuICAgIHJldHVybiAoXG4gICAgICA8dHIgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlQ2xpY2soZSl9PlxuICAgICAgICA8dGQ+e3RoaXMucHJvcHMudG9kb0xpc3RJdGVtLml0ZW1uYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD57dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0ucXVhbnRpdHl9PC90ZD5cbiAgICAgICAgPHRkPnt0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5jb3N0fTwvdGQ+XG4gICAgICAgIDx0ZD57dG90YWxDb3N0fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgIClcbiAgfVxuXG59Il19