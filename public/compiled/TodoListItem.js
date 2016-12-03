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
        'li',
        { className: 'item-name', onClick: function onClick(e) {
            return _this2.handleClick(e);
          } },
        this.props.todoListItem.itemname
      );
    }
  }]);

  return TodoListItem;
}(React.Component);

// removed from above when decision to get rid of cost and quant was made - code exists incase revert
// <td>{this.props.todoListItem.quantity}</td>
// <td onClick={(e) => this.increaseQuant(e)}>+</td>
// <td onClick={(e) => this.decreaseQuant(e)}>-</td>
// <td>${this.props.todoListItem.cost}</td>
// <td>${totalCost.toFixed(2)}</td>
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdEl0ZW0uanN4Il0sIm5hbWVzIjpbIlRvZG9MaXN0SXRlbSIsInByb3BzIiwiZSIsInJldHVybkl0ZW0iLCJ0b2RvTGlzdEl0ZW0iLCJpdGVtX2xhc3RfZWRpdF91c2VyaWQiLCJ1c2VyaWQiLCJkZWxldGVJdGVtIiwidXBkYXRlUXVhbnQiLCJ0b3RhbENvc3QiLCJNYXRoIiwicm91bmQiLCJxdWFudGl0eSIsImNvc3QiLCJoYW5kbGVDbGljayIsIml0ZW1uYW1lIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsWTs7O0FBRUosd0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx1SEFDWEEsS0FEVztBQUVsQjs7OztnQ0FFV0MsQyxFQUFHO0FBQ2IsVUFBSUMsYUFBYSxLQUFLRixLQUFMLENBQVdHLFlBQTVCO0FBQ0FELGlCQUFXRSxxQkFBWCxHQUFtQyxLQUFLSixLQUFMLENBQVdLLE1BQTlDO0FBQ0EsV0FBS0wsS0FBTCxDQUFXTSxVQUFYLENBQXNCSixVQUF0QjtBQUNEOzs7a0NBRWFELEMsRUFBRztBQUNmLFVBQUlDLGFBQWEsS0FBS0YsS0FBTCxDQUFXRyxZQUE1QjtBQUNBRCxpQkFBV0UscUJBQVgsR0FBbUMsS0FBS0osS0FBTCxDQUFXSyxNQUE5QztBQUNBLFdBQUtMLEtBQUwsQ0FBV08sV0FBWCxDQUF1QkwsVUFBdkIsRUFBbUMsS0FBbkM7QUFDRDs7O2tDQUVhRCxDLEVBQUc7QUFDZixVQUFJQyxhQUFhLEtBQUtGLEtBQUwsQ0FBV0csWUFBNUI7QUFDQUQsaUJBQVdFLHFCQUFYLEdBQW1DLEtBQUtKLEtBQUwsQ0FBV0ssTUFBOUM7QUFDQSxXQUFLTCxLQUFMLENBQVdPLFdBQVgsQ0FBdUJMLFVBQXZCLEVBQW1DLEtBQW5DO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUlNLFlBQVlDLEtBQUtDLEtBQUwsQ0FBVyxLQUFLVixLQUFMLENBQVdHLFlBQVgsQ0FBd0JRLFFBQXhCLEdBQW1DLEtBQUtYLEtBQUwsQ0FBV0csWUFBWCxDQUF3QlMsSUFBM0QsR0FBa0UsR0FBN0UsSUFBb0YsR0FBcEc7QUFDQSxhQUNFO0FBQUE7QUFBQSxVQUFJLFdBQVUsV0FBZCxFQUEwQixTQUFTLGlCQUFDWCxDQUFEO0FBQUEsbUJBQU8sT0FBS1ksV0FBTCxDQUFpQlosQ0FBakIsQ0FBUDtBQUFBLFdBQW5DO0FBQ0csYUFBS0QsS0FBTCxDQUFXRyxZQUFYLENBQXdCVztBQUQzQixPQURGO0FBS0Q7Ozs7RUEvQndCQyxNQUFNQyxTOztBQW1DakM7QUFDUTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IlRvZG9MaXN0SXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9MaXN0SXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBoYW5kbGVDbGljayhlKSB7XG4gICAgdmFyIHJldHVybkl0ZW0gPSB0aGlzLnByb3BzLnRvZG9MaXN0SXRlbTtcbiAgICByZXR1cm5JdGVtLml0ZW1fbGFzdF9lZGl0X3VzZXJpZCA9IHRoaXMucHJvcHMudXNlcmlkO1xuICAgIHRoaXMucHJvcHMuZGVsZXRlSXRlbShyZXR1cm5JdGVtKTtcbiAgfVxuXG4gIGluY3JlYXNlUXVhbnQoZSkge1xuICAgIHZhciByZXR1cm5JdGVtID0gdGhpcy5wcm9wcy50b2RvTGlzdEl0ZW07XG4gICAgcmV0dXJuSXRlbS5pdGVtX2xhc3RfZWRpdF91c2VyaWQgPSB0aGlzLnByb3BzLnVzZXJpZDtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVF1YW50KHJldHVybkl0ZW0sICdhZGQnKTtcbiAgfVxuXG4gIGRlY3JlYXNlUXVhbnQoZSkge1xuICAgIHZhciByZXR1cm5JdGVtID0gdGhpcy5wcm9wcy50b2RvTGlzdEl0ZW07XG4gICAgcmV0dXJuSXRlbS5pdGVtX2xhc3RfZWRpdF91c2VyaWQgPSB0aGlzLnByb3BzLnVzZXJpZDtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVF1YW50KHJldHVybkl0ZW0sICdzdWInKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgdG90YWxDb3N0ID0gTWF0aC5yb3VuZCh0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5xdWFudGl0eSAqIHRoaXMucHJvcHMudG9kb0xpc3RJdGVtLmNvc3QgKiAxMDApIC8gMTAwO1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPVwiaXRlbS1uYW1lXCIgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlQ2xpY2soZSl9PlxuICAgICAgICB7dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uaXRlbW5hbWV9XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cblxufVxuXG4vLyByZW1vdmVkIGZyb20gYWJvdmUgd2hlbiBkZWNpc2lvbiB0byBnZXQgcmlkIG9mIGNvc3QgYW5kIHF1YW50IHdhcyBtYWRlIC0gY29kZSBleGlzdHMgaW5jYXNlIHJldmVydFxuICAgICAgICAvLyA8dGQ+e3RoaXMucHJvcHMudG9kb0xpc3RJdGVtLnF1YW50aXR5fTwvdGQ+XG4gICAgICAgIC8vIDx0ZCBvbkNsaWNrPXsoZSkgPT4gdGhpcy5pbmNyZWFzZVF1YW50KGUpfT4rPC90ZD5cbiAgICAgICAgLy8gPHRkIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRlY3JlYXNlUXVhbnQoZSl9Pi08L3RkPlxuICAgICAgICAvLyA8dGQ+JHt0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5jb3N0fTwvdGQ+XG4gICAgICAgIC8vIDx0ZD4ke3RvdGFsQ29zdC50b0ZpeGVkKDIpfTwvdGQ+Il19