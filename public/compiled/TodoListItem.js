'use strict';

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
    key: 'handleClick',
    value: function handleClick(e) {
      var returnItem = this.props.todoListItem;
      returnItem.item_last_edit_userid = this.props.userid;
      this.props.deleteItem(returnItem);
    }
  }, {
    key: 'increaseQuant',
    value: function increaseQuant(e) {
      var returnItem = this.props.todoListItem;
      returnItem.item_last_edit_userid = this.props.userid;
      this.props.updateQuant(returnItem, 'add');
    }
  }, {
    key: 'decreaseQuant',
    value: function decreaseQuant(e) {
      var returnItem = this.props.todoListItem;
      returnItem.item_last_edit_userid = this.props.userid;
      this.props.updateQuant(returnItem, 'sub');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var totalCost = Math.round(this.props.todoListItem.quantity * this.props.todoListItem.cost * 100) / 100;
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { className: 'item-name' },
          this.props.todoListItem.itemname
        ),
        React.createElement(
          'td',
          null,
          this.props.todoListItem.quantity
        ),
        React.createElement(
          'td',
          { onClick: function onClick(e) {
              return _this2.increaseQuant(e);
            } },
          '+'
        ),
        React.createElement(
          'td',
          { onClick: function onClick(e) {
              return _this2.decreaseQuant(e);
            } },
          '-'
        ),
        React.createElement(
          'td',
          null,
          '$',
          this.props.todoListItem.cost
        ),
        React.createElement(
          'td',
          null,
          '$',
          totalCost.toFixed(2)
        ),
        React.createElement(
          'td',
          { className: 'delete', onClick: function onClick(e) {
              return _this2.handleClick(e);
            } },
          'delete'
        )
      );
    }
  }]);

  return TodoListItem;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdEl0ZW0uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxZOzs7QUFFSix3QkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUhBQ1gsS0FEVztBQUVsQjs7OztnQ0FFVyxDLEVBQUc7QUFDYixVQUFJLGFBQWEsS0FBSyxLQUFMLENBQVcsWUFBNUI7QUFDQSxpQkFBVyxxQkFBWCxHQUFtQyxLQUFLLEtBQUwsQ0FBVyxNQUE5QztBQUNBLFdBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsVUFBdEI7QUFDRDs7O2tDQUVhLEMsRUFBRztBQUNmLFVBQUksYUFBYSxLQUFLLEtBQUwsQ0FBVyxZQUE1QjtBQUNBLGlCQUFXLHFCQUFYLEdBQW1DLEtBQUssS0FBTCxDQUFXLE1BQTlDO0FBQ0EsV0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixVQUF2QixFQUFtQyxLQUFuQztBQUNEOzs7a0NBRWEsQyxFQUFHO0FBQ2YsVUFBSSxhQUFhLEtBQUssS0FBTCxDQUFXLFlBQTVCO0FBQ0EsaUJBQVcscUJBQVgsR0FBbUMsS0FBSyxLQUFMLENBQVcsTUFBOUM7QUFDQSxXQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFVBQXZCLEVBQW1DLEtBQW5DO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUksWUFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLFFBQXhCLEdBQW1DLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsSUFBM0QsR0FBa0UsR0FBN0UsSUFBb0YsR0FBcEc7QUFDQSxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsV0FBZDtBQUEyQixlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCO0FBQW5ELFNBREY7QUFFRTtBQUFBO0FBQUE7QUFBSyxlQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCO0FBQTdCLFNBRkY7QUFHRTtBQUFBO0FBQUEsWUFBSSxTQUFTLGlCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLGFBQUwsQ0FBbUIsQ0FBbkIsQ0FBUDtBQUFBLGFBQWI7QUFBQTtBQUFBLFNBSEY7QUFJRTtBQUFBO0FBQUEsWUFBSSxTQUFTLGlCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLGFBQUwsQ0FBbUIsQ0FBbkIsQ0FBUDtBQUFBLGFBQWI7QUFBQTtBQUFBLFNBSkY7QUFLRTtBQUFBO0FBQUE7QUFBQTtBQUFNLGVBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0I7QUFBOUIsU0FMRjtBQU1FO0FBQUE7QUFBQTtBQUFBO0FBQU0sb0JBQVUsT0FBVixDQUFrQixDQUFsQjtBQUFOLFNBTkY7QUFPRTtBQUFBO0FBQUEsWUFBSSxXQUFVLFFBQWQsRUFBdUIsU0FBUyxpQkFBQyxDQUFEO0FBQUEscUJBQU8sT0FBSyxXQUFMLENBQWlCLENBQWpCLENBQVA7QUFBQSxhQUFoQztBQUFBO0FBQUE7QUFQRixPQURGO0FBV0Q7Ozs7RUFyQ3dCLE1BQU0sUyIsImZpbGUiOiJUb2RvTGlzdEl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvTGlzdEl0ZW0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZSkge1xuICAgIHZhciByZXR1cm5JdGVtID0gdGhpcy5wcm9wcy50b2RvTGlzdEl0ZW07XG4gICAgcmV0dXJuSXRlbS5pdGVtX2xhc3RfZWRpdF91c2VyaWQgPSB0aGlzLnByb3BzLnVzZXJpZDtcbiAgICB0aGlzLnByb3BzLmRlbGV0ZUl0ZW0ocmV0dXJuSXRlbSk7XG4gIH1cblxuICBpbmNyZWFzZVF1YW50KGUpIHtcbiAgICB2YXIgcmV0dXJuSXRlbSA9IHRoaXMucHJvcHMudG9kb0xpc3RJdGVtO1xuICAgIHJldHVybkl0ZW0uaXRlbV9sYXN0X2VkaXRfdXNlcmlkID0gdGhpcy5wcm9wcy51c2VyaWQ7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVRdWFudChyZXR1cm5JdGVtLCAnYWRkJyk7XG4gIH1cblxuICBkZWNyZWFzZVF1YW50KGUpIHtcbiAgICB2YXIgcmV0dXJuSXRlbSA9IHRoaXMucHJvcHMudG9kb0xpc3RJdGVtO1xuICAgIHJldHVybkl0ZW0uaXRlbV9sYXN0X2VkaXRfdXNlcmlkID0gdGhpcy5wcm9wcy51c2VyaWQ7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVRdWFudChyZXR1cm5JdGVtLCAnc3ViJyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHRvdGFsQ29zdCA9IE1hdGgucm91bmQodGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0ucXVhbnRpdHkgKiB0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5jb3N0ICogMTAwKSAvIDEwMDtcbiAgICByZXR1cm4gKFxuICAgICAgPHRyPlxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwiaXRlbS1uYW1lXCI+e3RoaXMucHJvcHMudG9kb0xpc3RJdGVtLml0ZW1uYW1lfTwvdGQ+XG4gICAgICAgIDx0ZD57dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0ucXVhbnRpdHl9PC90ZD5cbiAgICAgICAgPHRkIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmluY3JlYXNlUXVhbnQoZSl9Pis8L3RkPlxuICAgICAgICA8dGQgb25DbGljaz17KGUpID0+IHRoaXMuZGVjcmVhc2VRdWFudChlKX0+LTwvdGQ+XG4gICAgICAgIDx0ZD4ke3RoaXMucHJvcHMudG9kb0xpc3RJdGVtLmNvc3R9PC90ZD5cbiAgICAgICAgPHRkPiR7dG90YWxDb3N0LnRvRml4ZWQoMil9PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cImRlbGV0ZVwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZUNsaWNrKGUpfT5kZWxldGU8L3RkPlxuICAgICAgPC90cj5cbiAgICApO1xuICB9XG5cbn0iXX0=