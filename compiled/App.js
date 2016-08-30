"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      masterList: [{ name: "chocolate", quantity: 2, cost: 3.99 }]
    };

    _this.updateList = function (newItem) {
      console.log(newItem);
      var newMasterList = _this.state.masterList.concat([newItem]);
      _this.setState({
        masterList: newMasterList
      });
    };
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          null,
          "Nav bar here"
        ),
        React.createElement(TodoForm, { todoList: this.state.masterList, updateList: this.updateList }),
        React.createElement(TodoList, { todoList: this.state.masterList })
      );
    }
  }]);

  return App;
}(React.Component);

module.exports = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBWjs7SUFFTSxHOzs7QUFDSixlQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWCxLQURXOztBQUdqQixVQUFLLEtBQUwsR0FBYTtBQUNYLGtCQUFZLENBQUMsRUFBQyxNQUFNLFdBQVAsRUFBb0IsVUFBVSxDQUE5QixFQUFpQyxNQUFNLElBQXZDLEVBQUQ7QUFERCxLQUFiOztBQUlBLFVBQUssVUFBTCxHQUFrQixVQUFDLE9BQUQsRUFBYTtBQUM3QixjQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0EsVUFBSSxnQkFBZ0IsTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixNQUF0QixDQUE2QixDQUFDLE9BQUQsQ0FBN0IsQ0FBcEI7QUFDQSxZQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFZO0FBREEsT0FBZDtBQUdELEtBTkQ7QUFQaUI7QUFjbEI7Ozs7NkJBR1E7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFVBQS9CLEVBQTJDLFlBQVksS0FBSyxVQUE1RCxHQUZGO0FBR0UsNEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsVUFBL0I7QUFIRixPQURGO0FBT0Q7Ozs7RUExQmUsTUFBTSxTOztBQTZCeEIsT0FBTyxPQUFQLEdBQWlCLEdBQWpCIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFt7bmFtZTogXCJjaG9jb2xhdGVcIiwgcXVhbnRpdHk6IDIsIGNvc3Q6IDMuOTl9XVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlTGlzdCA9IChuZXdJdGVtKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhuZXdJdGVtKVxuICAgICAgdmFyIG5ld01hc3Rlckxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuY29uY2F0KFtuZXdJdGVtXSlcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBuZXdNYXN0ZXJMaXN0XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2Pk5hdiBiYXIgaGVyZTwvZGl2PlxuICAgICAgICA8VG9kb0Zvcm0gdG9kb0xpc3Q9e3RoaXMuc3RhdGUubWFzdGVyTGlzdH0gdXBkYXRlTGlzdD17dGhpcy51cGRhdGVMaXN0fS8+XG4gICAgICAgIDxUb2RvTGlzdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5tYXN0ZXJMaXN0fS8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBcHAiXX0=