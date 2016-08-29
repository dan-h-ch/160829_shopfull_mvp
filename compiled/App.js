"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEc7OztBQUNKLGVBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVksQ0FBQyxFQUFDLE1BQU0sV0FBUCxFQUFvQixVQUFVLENBQTlCLEVBQWlDLE1BQU0sSUFBdkMsRUFBRDtBQURELEtBQWI7O0FBSUEsVUFBSyxVQUFMLEdBQWtCLFVBQUMsT0FBRCxFQUFhO0FBQzdCLGNBQVEsR0FBUixDQUFZLE9BQVo7QUFDQSxVQUFJLGdCQUFnQixNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE1BQXRCLENBQTZCLENBQUMsT0FBRCxDQUE3QixDQUFwQjtBQUNBLFlBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVk7QUFEQSxPQUFkO0FBR0QsS0FORDtBQVBpQjtBQWNsQjs7Ozs2QkFHUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUUsNEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsVUFBL0IsRUFBMkMsWUFBWSxLQUFLLFVBQTVELEdBRkY7QUFHRSw0QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxVQUEvQjtBQUhGLE9BREY7QUFPRDs7OztFQTFCZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtYXN0ZXJMaXN0OiBbe25hbWU6IFwiY2hvY29sYXRlXCIsIHF1YW50aXR5OiAyLCBjb3N0OiAzLjk5fV1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUxpc3QgPSAobmV3SXRlbSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cobmV3SXRlbSlcbiAgICAgIHZhciBuZXdNYXN0ZXJMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmNvbmNhdChbbmV3SXRlbV0pXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyTGlzdDogbmV3TWFzdGVyTGlzdFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdj5OYXYgYmFyIGhlcmU8L2Rpdj5cbiAgICAgICAgPFRvZG9Gb3JtIHRvZG9MaXN0PXt0aGlzLnN0YXRlLm1hc3Rlckxpc3R9IHVwZGF0ZUxpc3Q9e3RoaXMudXBkYXRlTGlzdH0vPlxuICAgICAgICA8VG9kb0xpc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUubWFzdGVyTGlzdH0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59Il19