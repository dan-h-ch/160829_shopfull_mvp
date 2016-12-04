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
        { className: 'list-item-container' },
        React.createElement(
          'div',
          { className: 'list-item-name' },
          this.props.todoListItem.itemname
        ),
        React.createElement(
          'div',
          { className: 'list-item-delete', onClick: function onClick(e) {
              return _this2.handleClick(e);
            } },
          'Delete'
        )
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdEl0ZW0uanN4Il0sIm5hbWVzIjpbIlRvZG9MaXN0SXRlbSIsInByb3BzIiwiZSIsInJldHVybkl0ZW0iLCJ0b2RvTGlzdEl0ZW0iLCJpdGVtX2xhc3RfZWRpdF91c2VyaWQiLCJ1c2VyaWQiLCJkZWxldGVJdGVtIiwidXBkYXRlUXVhbnQiLCJ0b3RhbENvc3QiLCJNYXRoIiwicm91bmQiLCJxdWFudGl0eSIsImNvc3QiLCJpdGVtbmFtZSIsImhhbmRsZUNsaWNrIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsWTs7O0FBRUosd0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx1SEFDWEEsS0FEVztBQUVsQjs7OztnQ0FFV0MsQyxFQUFHO0FBQ2IsVUFBSUMsYUFBYSxLQUFLRixLQUFMLENBQVdHLFlBQTVCO0FBQ0FELGlCQUFXRSxxQkFBWCxHQUFtQyxLQUFLSixLQUFMLENBQVdLLE1BQTlDO0FBQ0EsV0FBS0wsS0FBTCxDQUFXTSxVQUFYLENBQXNCSixVQUF0QjtBQUNEOzs7a0NBRWFELEMsRUFBRztBQUNmLFVBQUlDLGFBQWEsS0FBS0YsS0FBTCxDQUFXRyxZQUE1QjtBQUNBRCxpQkFBV0UscUJBQVgsR0FBbUMsS0FBS0osS0FBTCxDQUFXSyxNQUE5QztBQUNBLFdBQUtMLEtBQUwsQ0FBV08sV0FBWCxDQUF1QkwsVUFBdkIsRUFBbUMsS0FBbkM7QUFDRDs7O2tDQUVhRCxDLEVBQUc7QUFDZixVQUFJQyxhQUFhLEtBQUtGLEtBQUwsQ0FBV0csWUFBNUI7QUFDQUQsaUJBQVdFLHFCQUFYLEdBQW1DLEtBQUtKLEtBQUwsQ0FBV0ssTUFBOUM7QUFDQSxXQUFLTCxLQUFMLENBQVdPLFdBQVgsQ0FBdUJMLFVBQXZCLEVBQW1DLEtBQW5DO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUlNLFlBQVlDLEtBQUtDLEtBQUwsQ0FBVyxLQUFLVixLQUFMLENBQVdHLFlBQVgsQ0FBd0JRLFFBQXhCLEdBQW1DLEtBQUtYLEtBQUwsQ0FBV0csWUFBWCxDQUF3QlMsSUFBM0QsR0FBa0UsR0FBN0UsSUFBb0YsR0FBcEc7QUFDQSxhQUNFO0FBQUE7QUFBQSxVQUFJLFdBQVUscUJBQWQ7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGdCQUFmO0FBQ0csZUFBS1osS0FBTCxDQUFXRyxZQUFYLENBQXdCVTtBQUQzQixTQURGO0FBSUU7QUFBQTtBQUFBLFlBQUssV0FBVSxrQkFBZixFQUFrQyxTQUFTLGlCQUFDWixDQUFEO0FBQUEscUJBQU8sT0FBS2EsV0FBTCxDQUFpQmIsQ0FBakIsQ0FBUDtBQUFBLGFBQTNDO0FBQUE7QUFBQTtBQUpGLE9BREY7QUFVRDs7OztFQXBDd0JjLE1BQU1DLFM7O0FBd0NqQztBQUNRO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiVG9kb0xpc3RJdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kb0xpc3RJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICB2YXIgcmV0dXJuSXRlbSA9IHRoaXMucHJvcHMudG9kb0xpc3RJdGVtO1xuICAgIHJldHVybkl0ZW0uaXRlbV9sYXN0X2VkaXRfdXNlcmlkID0gdGhpcy5wcm9wcy51c2VyaWQ7XG4gICAgdGhpcy5wcm9wcy5kZWxldGVJdGVtKHJldHVybkl0ZW0pO1xuICB9XG5cbiAgaW5jcmVhc2VRdWFudChlKSB7XG4gICAgdmFyIHJldHVybkl0ZW0gPSB0aGlzLnByb3BzLnRvZG9MaXN0SXRlbTtcbiAgICByZXR1cm5JdGVtLml0ZW1fbGFzdF9lZGl0X3VzZXJpZCA9IHRoaXMucHJvcHMudXNlcmlkO1xuICAgIHRoaXMucHJvcHMudXBkYXRlUXVhbnQocmV0dXJuSXRlbSwgJ2FkZCcpO1xuICB9XG5cbiAgZGVjcmVhc2VRdWFudChlKSB7XG4gICAgdmFyIHJldHVybkl0ZW0gPSB0aGlzLnByb3BzLnRvZG9MaXN0SXRlbTtcbiAgICByZXR1cm5JdGVtLml0ZW1fbGFzdF9lZGl0X3VzZXJpZCA9IHRoaXMucHJvcHMudXNlcmlkO1xuICAgIHRoaXMucHJvcHMudXBkYXRlUXVhbnQocmV0dXJuSXRlbSwgJ3N1YicpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciB0b3RhbENvc3QgPSBNYXRoLnJvdW5kKHRoaXMucHJvcHMudG9kb0xpc3RJdGVtLnF1YW50aXR5ICogdGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uY29zdCAqIDEwMCkgLyAxMDA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWl0ZW0tY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1pdGVtLW5hbWVcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uaXRlbW5hbWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtaXRlbS1kZWxldGVcIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVDbGljayhlKX0+XG4gICAgICAgICAgRGVsZXRlXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG5cbn1cblxuLy8gcmVtb3ZlZCBmcm9tIGFib3ZlIHdoZW4gZGVjaXNpb24gdG8gZ2V0IHJpZCBvZiBjb3N0IGFuZCBxdWFudCB3YXMgbWFkZSAtIGNvZGUgZXhpc3RzIGluY2FzZSByZXZlcnRcbiAgICAgICAgLy8gPHRkPnt0aGlzLnByb3BzLnRvZG9MaXN0SXRlbS5xdWFudGl0eX08L3RkPlxuICAgICAgICAvLyA8dGQgb25DbGljaz17KGUpID0+IHRoaXMuaW5jcmVhc2VRdWFudChlKX0+KzwvdGQ+XG4gICAgICAgIC8vIDx0ZCBvbkNsaWNrPXsoZSkgPT4gdGhpcy5kZWNyZWFzZVF1YW50KGUpfT4tPC90ZD5cbiAgICAgICAgLy8gPHRkPiR7dGhpcy5wcm9wcy50b2RvTGlzdEl0ZW0uY29zdH08L3RkPlxuICAgICAgICAvLyA8dGQ+JHt0b3RhbENvc3QudG9GaXhlZCgyKX08L3RkPiJdfQ==