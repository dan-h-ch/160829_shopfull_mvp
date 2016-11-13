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
      // console.log(returnList);
      // var returnList = this.props.listid
      // returnItem.item_last_edit_userid = this.props.userid
      this.props.deleteList(returnList);
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
          "Delet List "
        )
      );
    }
  }]);

  return TodoCost;
}(React.Component);
// removed from above when decision to get rid of cost and quant was made - code exists incase revert
// <div className="final-cost">Total Cost For This Project: ${totCost.toFixed(2)}</div>
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvQ29zdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUVKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrR0FDWCxLQURXO0FBRWxCOzs7O2dDQUVXLEMsRUFBRztBQUNiLFVBQUksYUFBYTtBQUNmLFlBQUksS0FBSyxLQUFMLENBQVcsTUFEQTtBQUVmLGdCQUFRLEtBQUssS0FBTCxDQUFXO0FBRkosT0FBakI7QUFJQTtBQUNBO0FBQ0E7QUFDQSxXQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFVBQXRCO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLE1BQXBCLENBQTJCLFVBQUMsSUFBRCxFQUFPLEdBQVAsRUFBZTtBQUN0RCxlQUFPLE9BQVEsSUFBSSxRQUFKLEdBQWUsSUFBSSxJQUFsQztBQUNELE9BRmEsRUFFWCxDQUZXLENBQWQ7QUFHQSxVQUFJLGFBQWEsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixNQUFyQzs7QUFFQSxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsYUFBZjtBQUE4QixvQkFBOUI7QUFBQTtBQUFBLFNBREY7QUFHRTtBQUFBO0FBQUEsWUFBSyxXQUFVLG9CQUFmLEVBQW9DLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssV0FBTCxDQUFpQixDQUFqQixDQUFQO0FBQUEsYUFBN0M7QUFBQTtBQUFBO0FBSEYsT0FERjtBQU9EOzs7O0VBOUJvQixNQUFNLFM7QUFrQzdCO0FBQ1EiLCJmaWxlIjoiVG9kb0Nvc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvQ29zdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBoYW5kbGVDbGljayhlKSB7XG4gICAgdmFyIHJldHVybkxpc3QgPSB7XG4gICAgICBpZDogdGhpcy5wcm9wcy5saXN0aWQsXG4gICAgICB1c2VyaWQ6IHRoaXMucHJvcHMudXNlcmlkXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXR1cm5MaXN0KTtcbiAgICAvLyB2YXIgcmV0dXJuTGlzdCA9IHRoaXMucHJvcHMubGlzdGlkXG4gICAgLy8gcmV0dXJuSXRlbS5pdGVtX2xhc3RfZWRpdF91c2VyaWQgPSB0aGlzLnByb3BzLnVzZXJpZFxuICAgIHRoaXMucHJvcHMuZGVsZXRlTGlzdChyZXR1cm5MaXN0KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgdG90Q29zdCA9IHRoaXMucHJvcHMudG9kb0xpc3QucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgIHJldHVybiBtZW1vICsgKHZhbC5xdWFudGl0eSAqIHZhbC5jb3N0KTtcbiAgICB9LCAwKTtcbiAgICB2YXIgcXVhbnRJdGVtcyA9IHRoaXMucHJvcHMudG9kb0xpc3QubGVuZ3RoXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaW5hbC1xdWFudFwiPntxdWFudEl0ZW1zfSBJdGVtczwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVsZXRlLWxpc3QtYnV0dG9uXCIgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlQ2xpY2soZSl9PkRlbGV0IExpc3QgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cblxufVxuLy8gcmVtb3ZlZCBmcm9tIGFib3ZlIHdoZW4gZGVjaXNpb24gdG8gZ2V0IHJpZCBvZiBjb3N0IGFuZCBxdWFudCB3YXMgbWFkZSAtIGNvZGUgZXhpc3RzIGluY2FzZSByZXZlcnRcbiAgICAgICAgLy8gPGRpdiBjbGFzc05hbWU9XCJmaW5hbC1jb3N0XCI+VG90YWwgQ29zdCBGb3IgVGhpcyBQcm9qZWN0OiAke3RvdENvc3QudG9GaXhlZCgyKX08L2Rpdj5cbiJdfQ==