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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvQ29zdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUVKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrR0FDWCxLQURXO0FBRWxCOzs7O2dDQUVXLEMsRUFBRztBQUNiLFVBQUksYUFBYTtBQUNmLFlBQUksS0FBSyxLQUFMLENBQVcsTUFEQTtBQUVmLGdCQUFRLEtBQUssS0FBTCxDQUFXO0FBRkosT0FBakI7QUFJQSxXQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLFVBQXRCO0FBQ0Q7Ozs4QkFFUyxDLEVBQUc7QUFDWCxXQUFLLEtBQUwsQ0FBVyxnQkFBWDtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixNQUFwQixDQUEyQixVQUFDLElBQUQsRUFBTyxHQUFQLEVBQWU7QUFDdEQsZUFBTyxPQUFRLElBQUksUUFBSixHQUFlLElBQUksSUFBbEM7QUFDRCxPQUZhLEVBRVgsQ0FGVyxDQUFkO0FBR0EsVUFBSSxhQUFhLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsTUFBckM7O0FBRUEsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGFBQWY7QUFBOEIsb0JBQTlCO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQUssV0FBVSxvQkFBZixFQUFvQyxTQUFTLGlCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBUDtBQUFBLGFBQTdDO0FBQUE7QUFBQSxTQUZGO0FBR0U7QUFBQTtBQUFBLFlBQUssV0FBVSxtQkFBZixFQUFtQyxTQUFTLGlCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFNBQUwsQ0FBZSxDQUFmLENBQVA7QUFBQSxhQUE1QztBQUFBO0FBQUE7QUFIRixPQURGO0FBT0Q7Ozs7RUEvQm9CLE1BQU0sUztBQW1DN0I7QUFDUSIsImZpbGUiOiJUb2RvQ29zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9Db3N0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICB2YXIgcmV0dXJuTGlzdCA9IHtcbiAgICAgIGlkOiB0aGlzLnByb3BzLmxpc3RpZCxcbiAgICAgIHVzZXJpZDogdGhpcy5wcm9wcy51c2VyaWRcbiAgICB9O1xuICAgIHRoaXMucHJvcHMuZGVsZXRlTGlzdChyZXR1cm5MaXN0KTtcbiAgfVxuXG4gIHNoYXJlTGlzdChlKSB7XG4gICAgdGhpcy5wcm9wcy5kaXNwbGF5U2hhcmVMaXN0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHRvdENvc3QgPSB0aGlzLnByb3BzLnRvZG9MaXN0LnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICByZXR1cm4gbWVtbyArICh2YWwucXVhbnRpdHkgKiB2YWwuY29zdCk7XG4gICAgfSwgMCk7XG4gICAgdmFyIHF1YW50SXRlbXMgPSB0aGlzLnByb3BzLnRvZG9MaXN0Lmxlbmd0aDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbmFsLXF1YW50XCI+e3F1YW50SXRlbXN9IEl0ZW1zPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVsZXRlLWxpc3QtYnV0dG9uXCIgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlQ2xpY2soZSl9PkRlbGV0ZSBMaXN0IDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoYXJlLWxpc3QtYnV0dG9uXCIgb25DbGljaz17KGUpID0+IHRoaXMuc2hhcmVMaXN0KGUpfT5TaGFyZSBMaXN0IDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG5cbn1cbi8vIHJlbW92ZWQgZnJvbSBhYm92ZSB3aGVuIGRlY2lzaW9uIHRvIGdldCByaWQgb2YgY29zdCBhbmQgcXVhbnQgd2FzIG1hZGUgLSBjb2RlIGV4aXN0cyBpbmNhc2UgcmV2ZXJ0XG4gICAgICAgIC8vIDxkaXYgY2xhc3NOYW1lPVwiZmluYWwtY29zdFwiPlRvdGFsIENvc3QgRm9yIFRoaXMgUHJvamVjdDogJHt0b3RDb3N0LnRvRml4ZWQoMil9PC9kaXY+XG4iXX0=