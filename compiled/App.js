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
        React.createElement(
          "div",
          null,
          "Entry form here"
        ),
        React.createElement(TodoList, { todoList: this.state.masterList })
      );
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEc7OztBQUNKLGVBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVksQ0FBQyxFQUFDLE1BQU0sV0FBUCxFQUFvQixVQUFVLENBQTlCLEVBQWlDLE1BQU0sSUFBdkMsRUFBRDtBQURELEtBQWI7QUFIaUI7QUFNbEI7Ozs7NkJBR1E7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FGRjtBQUdFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFVBQS9CO0FBSEYsT0FERjtBQU9EOzs7O0VBbEJlLE1BQU0sUyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFt7bmFtZTogXCJjaG9jb2xhdGVcIiwgcXVhbnRpdHk6IDIsIGNvc3Q6IDMuOTl9XVxuICAgIH1cbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2Pk5hdiBiYXIgaGVyZTwvZGl2PlxuICAgICAgICA8ZGl2PkVudHJ5IGZvcm0gaGVyZTwvZGl2PlxuICAgICAgICA8VG9kb0xpc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUubWFzdGVyTGlzdH0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59Il19