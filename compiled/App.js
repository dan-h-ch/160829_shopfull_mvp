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
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('loading up');
      fetchData({}, function (data) {
        this.setState({
          masterList: data
        });
      }.bind(this));
    }
  }]);

  return App;
}(React.Component);

var fetchData = function fetchData(options, callback) {
  console.log("sendingrequest");
  $.ajax({
    type: "GET",
    url: "/items",
    contentType: "application/json",
    success: function success(data) {
      callback(data);
      // console.log(this)
      // this.setState({
      //   masterList: data
      // })
    },
    error: function error(_error) {
      console.log("err: ", _error);
    }
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEc7OztBQUNKLGVBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVksQ0FBQyxFQUFDLE1BQU0sV0FBUCxFQUFvQixVQUFVLENBQTlCLEVBQWlDLE1BQU0sSUFBdkMsRUFBRDtBQURELEtBQWI7O0FBSUEsVUFBSyxVQUFMLEdBQWtCLFVBQUMsT0FBRCxFQUFhO0FBQzdCLGNBQVEsR0FBUixDQUFZLE9BQVo7QUFDQSxVQUFJLGdCQUFnQixNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE1BQXRCLENBQTZCLENBQUMsT0FBRCxDQUE3QixDQUFwQjtBQUNBLFlBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVk7QUFEQSxPQUFkO0FBR0QsS0FORDtBQVBpQjtBQWNsQjs7Ozs2QkFHUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUUsNEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsVUFBL0IsRUFBMkMsWUFBWSxLQUFLLFVBQTVELEdBRkY7QUFHRSw0QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxVQUEvQjtBQUhGLE9BREY7QUFPRDs7O3dDQUVtQjtBQUNsQixjQUFRLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsZ0JBQVUsRUFBVixFQUFjLFVBQVMsSUFBVCxFQUFlO0FBQzNCLGFBQUssUUFBTCxDQUFjO0FBQ1osc0JBQVk7QUFEQSxTQUFkO0FBR0QsT0FKYSxDQUlaLElBSlksQ0FJUCxJQUpPLENBQWQ7QUFLRDs7OztFQW5DZSxNQUFNLFM7O0FBc0N4QixJQUFJLFlBQVksU0FBWixTQUFZLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBdUI7QUFDckMsVUFBUSxHQUFSLENBQVksZ0JBQVo7QUFDQSxJQUFFLElBQUYsQ0FBTztBQUNMLFVBQU0sS0FERDtBQUVMLFNBQUssUUFGQTtBQUdMLGlCQUFhLGtCQUhSO0FBSUwsYUFBUyxpQkFBUyxJQUFULEVBQWU7QUFDdEIsZUFBUyxJQUFUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxLQVZJO0FBV0wsV0FBTyxlQUFTLE1BQVQsRUFBZ0I7QUFDckIsY0FBUSxHQUFSLENBQVksT0FBWixFQUFxQixNQUFyQjtBQUNEO0FBYkksR0FBUDtBQWVELENBakJEIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW3tuYW1lOiBcImNob2NvbGF0ZVwiLCBxdWFudGl0eTogMiwgY29zdDogMy45OX1dXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVMaXN0ID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKG5ld0l0ZW0pXG4gICAgICB2YXIgbmV3TWFzdGVyTGlzdCA9IHRoaXMuc3RhdGUubWFzdGVyTGlzdC5jb25jYXQoW25ld0l0ZW1dKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1hc3Rlckxpc3Q6IG5ld01hc3Rlckxpc3RcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXY+TmF2IGJhciBoZXJlPC9kaXY+XG4gICAgICAgIDxUb2RvRm9ybSB0b2RvTGlzdD17dGhpcy5zdGF0ZS5tYXN0ZXJMaXN0fSB1cGRhdGVMaXN0PXt0aGlzLnVwZGF0ZUxpc3R9Lz5cbiAgICAgICAgPFRvZG9MaXN0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLm1hc3Rlckxpc3R9Lz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nIHVwJylcbiAgICBmZXRjaERhdGEoe30sIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICB9KVxuICAgIH0uYmluZCh0aGlzKSlcbiAgfVxufVxuXG52YXIgZmV0Y2hEYXRhID0gKG9wdGlvbnMsIGNhbGxiYWNrKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwic2VuZGluZ3JlcXVlc3RcIilcbiAgJC5hamF4KHtcbiAgICB0eXBlOiBcIkdFVFwiLFxuICAgIHVybDogXCIvaXRlbXNcIixcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgY2FsbGJhY2soZGF0YSlcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpXG4gICAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC8vICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgLy8gfSlcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnJvcilcbiAgICB9XG4gIH0pXG59XG4iXX0=