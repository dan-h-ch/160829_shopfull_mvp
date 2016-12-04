"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bottom = function (_React$Component) {
  _inherits(Bottom, _React$Component);

  function Bottom(props) {
    _classCallCheck(this, Bottom);

    return _possibleConstructorReturn(this, (Bottom.__proto__ || Object.getPrototypeOf(Bottom)).call(this, props));
  }

  _createClass(Bottom, [{
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
        { className: "bottom-container" },
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

  return Bottom;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Cb3R0b20uanN4Il0sIm5hbWVzIjpbIkJvdHRvbSIsInByb3BzIiwiZSIsInJldHVybkxpc3QiLCJpZCIsImxpc3RpZCIsInVzZXJpZCIsImRlbGV0ZUxpc3QiLCJkaXNwbGF5U2hhcmVMaXN0IiwidG90Q29zdCIsInRvZG9MaXN0IiwicmVkdWNlIiwibWVtbyIsInZhbCIsInF1YW50aXR5IiwiY29zdCIsInF1YW50SXRlbXMiLCJsZW5ndGgiLCJoYW5kbGVDbGljayIsInNoYXJlTGlzdCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLE07OztBQUVKLGtCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMkdBQ1hBLEtBRFc7QUFFbEI7Ozs7Z0NBRVdDLEMsRUFBRztBQUNiLFVBQUlDLGFBQWE7QUFDZkMsWUFBSSxLQUFLSCxLQUFMLENBQVdJLE1BREE7QUFFZkMsZ0JBQVEsS0FBS0wsS0FBTCxDQUFXSztBQUZKLE9BQWpCO0FBSUEsV0FBS0wsS0FBTCxDQUFXTSxVQUFYLENBQXNCSixVQUF0QjtBQUNEOzs7OEJBRVNELEMsRUFBRztBQUNYLFdBQUtELEtBQUwsQ0FBV08sZ0JBQVg7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSUMsVUFBVSxLQUFLUixLQUFMLENBQVdTLFFBQVgsQ0FBb0JDLE1BQXBCLENBQTJCLFVBQUNDLElBQUQsRUFBT0MsR0FBUCxFQUFlO0FBQ3RELGVBQU9ELE9BQVFDLElBQUlDLFFBQUosR0FBZUQsSUFBSUUsSUFBbEM7QUFDRCxPQUZhLEVBRVgsQ0FGVyxDQUFkO0FBR0EsVUFBSUMsYUFBYSxLQUFLZixLQUFMLENBQVdTLFFBQVgsQ0FBb0JPLE1BQXJDOztBQUVBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxrQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsb0JBQWYsRUFBb0MsU0FBUyxpQkFBQ2YsQ0FBRDtBQUFBLHFCQUFPLE9BQUtnQixXQUFMLENBQWlCaEIsQ0FBakIsQ0FBUDtBQUFBLGFBQTdDO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQUssV0FBVSxtQkFBZixFQUFtQyxTQUFTLGlCQUFDQSxDQUFEO0FBQUEscUJBQU8sT0FBS2lCLFNBQUwsQ0FBZWpCLENBQWYsQ0FBUDtBQUFBLGFBQTVDO0FBQUE7QUFBQTtBQUZGLE9BREY7QUFNRDs7OztFQTlCa0JrQixNQUFNQyxTIiwiZmlsZSI6IkJvdHRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJvdHRvbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBoYW5kbGVDbGljayhlKSB7XG4gICAgdmFyIHJldHVybkxpc3QgPSB7XG4gICAgICBpZDogdGhpcy5wcm9wcy5saXN0aWQsXG4gICAgICB1c2VyaWQ6IHRoaXMucHJvcHMudXNlcmlkXG4gICAgfTtcbiAgICB0aGlzLnByb3BzLmRlbGV0ZUxpc3QocmV0dXJuTGlzdCk7XG4gIH1cblxuICBzaGFyZUxpc3QoZSkge1xuICAgIHRoaXMucHJvcHMuZGlzcGxheVNoYXJlTGlzdCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciB0b3RDb3N0ID0gdGhpcy5wcm9wcy50b2RvTGlzdC5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgcmV0dXJuIG1lbW8gKyAodmFsLnF1YW50aXR5ICogdmFsLmNvc3QpO1xuICAgIH0sIDApO1xuICAgIHZhciBxdWFudEl0ZW1zID0gdGhpcy5wcm9wcy50b2RvTGlzdC5sZW5ndGg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3R0b20tY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVsZXRlLWxpc3QtYnV0dG9uXCIgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlQ2xpY2soZSl9PkRlbGV0ZSBMaXN0IDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNoYXJlLWxpc3QtYnV0dG9uXCIgb25DbGljaz17KGUpID0+IHRoaXMuc2hhcmVMaXN0KGUpfT5TaGFyZSBMaXN0IDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG5cbn0iXX0=