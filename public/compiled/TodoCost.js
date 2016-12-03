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
    key: "handleClick",
    value: function handleClick(e) {
      var returnList = {
        id: this.props.listid,
        userid: this.props.userid
      };
      this.props.deleteList(returnList);
    }
  }, {
    key: "shareList",
    value: function shareList(e) {
      this.props.displayShareList();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var totCost = this.props.todoList.reduce(function (memo, val) {
        return memo + val.quantity * val.cost;
      }, 0);
      var quantItems = this.props.todoList.length;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "final-quant" },
          quantItems,
          " Items"
        ),
        React.createElement(
          "div",
          { className: "delete-list-button", onClick: function onClick(e) {
              return _this2.handleClick(e);
            } },
          "Delete List "
        ),
        React.createElement(
          "div",
          { className: "share-list-button", onClick: function onClick(e) {
              return _this2.shareList(e);
            } },
          "Share List "
        )
      );
    }
  }]);

  return TodoCost;
}(React.Component);
// removed from above when decision to get rid of cost and quant was made - code exists incase revert
// <div className="final-cost">Total Cost For This Project: ${totCost.toFixed(2)}</div>
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvQ29zdC5qc3giXSwibmFtZXMiOlsiVG9kb0Nvc3QiLCJwcm9wcyIsImUiLCJyZXR1cm5MaXN0IiwiaWQiLCJsaXN0aWQiLCJ1c2VyaWQiLCJkZWxldGVMaXN0IiwiZGlzcGxheVNoYXJlTGlzdCIsInRvdENvc3QiLCJ0b2RvTGlzdCIsInJlZHVjZSIsIm1lbW8iLCJ2YWwiLCJxdWFudGl0eSIsImNvc3QiLCJxdWFudEl0ZW1zIiwibGVuZ3RoIiwiaGFuZGxlQ2xpY2siLCJzaGFyZUxpc3QiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxROzs7QUFFSixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLCtHQUNYQSxLQURXO0FBRWxCOzs7O2dDQUVXQyxDLEVBQUc7QUFDYixVQUFJQyxhQUFhO0FBQ2ZDLFlBQUksS0FBS0gsS0FBTCxDQUFXSSxNQURBO0FBRWZDLGdCQUFRLEtBQUtMLEtBQUwsQ0FBV0s7QUFGSixPQUFqQjtBQUlBLFdBQUtMLEtBQUwsQ0FBV00sVUFBWCxDQUFzQkosVUFBdEI7QUFDRDs7OzhCQUVTRCxDLEVBQUc7QUFDWCxXQUFLRCxLQUFMLENBQVdPLGdCQUFYO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUlDLFVBQVUsS0FBS1IsS0FBTCxDQUFXUyxRQUFYLENBQW9CQyxNQUFwQixDQUEyQixVQUFDQyxJQUFELEVBQU9DLEdBQVAsRUFBZTtBQUN0RCxlQUFPRCxPQUFRQyxJQUFJQyxRQUFKLEdBQWVELElBQUlFLElBQWxDO0FBQ0QsT0FGYSxFQUVYLENBRlcsQ0FBZDtBQUdBLFVBQUlDLGFBQWEsS0FBS2YsS0FBTCxDQUFXUyxRQUFYLENBQW9CTyxNQUFyQzs7QUFFQSxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsYUFBZjtBQUE4QkQsb0JBQTlCO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQUssV0FBVSxvQkFBZixFQUFvQyxTQUFTLGlCQUFDZCxDQUFEO0FBQUEscUJBQU8sT0FBS2dCLFdBQUwsQ0FBaUJoQixDQUFqQixDQUFQO0FBQUEsYUFBN0M7QUFBQTtBQUFBLFNBRkY7QUFHRTtBQUFBO0FBQUEsWUFBSyxXQUFVLG1CQUFmLEVBQW1DLFNBQVMsaUJBQUNBLENBQUQ7QUFBQSxxQkFBTyxPQUFLaUIsU0FBTCxDQUFlakIsQ0FBZixDQUFQO0FBQUEsYUFBNUM7QUFBQTtBQUFBO0FBSEYsT0FERjtBQU9EOzs7O0VBL0JvQmtCLE1BQU1DLFM7QUFtQzdCO0FBQ1EiLCJmaWxlIjoiVG9kb0Nvc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvQ29zdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBoYW5kbGVDbGljayhlKSB7XG4gICAgdmFyIHJldHVybkxpc3QgPSB7XG4gICAgICBpZDogdGhpcy5wcm9wcy5saXN0aWQsXG4gICAgICB1c2VyaWQ6IHRoaXMucHJvcHMudXNlcmlkXG4gICAgfTtcbiAgICB0aGlzLnByb3BzLmRlbGV0ZUxpc3QocmV0dXJuTGlzdCk7XG4gIH1cblxuICBzaGFyZUxpc3QoZSkge1xuICAgIHRoaXMucHJvcHMuZGlzcGxheVNoYXJlTGlzdCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciB0b3RDb3N0ID0gdGhpcy5wcm9wcy50b2RvTGlzdC5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgcmV0dXJuIG1lbW8gKyAodmFsLnF1YW50aXR5ICogdmFsLmNvc3QpO1xuICAgIH0sIDApO1xuICAgIHZhciBxdWFudEl0ZW1zID0gdGhpcy5wcm9wcy50b2RvTGlzdC5sZW5ndGg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaW5hbC1xdWFudFwiPntxdWFudEl0ZW1zfSBJdGVtczwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlbGV0ZS1saXN0LWJ1dHRvblwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZUNsaWNrKGUpfT5EZWxldGUgTGlzdCA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaGFyZS1saXN0LWJ1dHRvblwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnNoYXJlTGlzdChlKX0+U2hhcmUgTGlzdCA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuXG59XG4vLyByZW1vdmVkIGZyb20gYWJvdmUgd2hlbiBkZWNpc2lvbiB0byBnZXQgcmlkIG9mIGNvc3QgYW5kIHF1YW50IHdhcyBtYWRlIC0gY29kZSBleGlzdHMgaW5jYXNlIHJldmVydFxuICAgICAgICAvLyA8ZGl2IGNsYXNzTmFtZT1cImZpbmFsLWNvc3RcIj5Ub3RhbCBDb3N0IEZvciBUaGlzIFByb2plY3Q6ICR7dG90Q29zdC50b0ZpeGVkKDIpfTwvZGl2PlxuIl19