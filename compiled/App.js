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
      var newMasterList = _this.state.masterList.concat([newItem]);
      _this.setState({
        masterList: newMasterList
      });
    };

    _this.deleteItem = function (item) {
      cnsole.log(item);
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

var sendData = function sendData(options, callback) {
  console.log("postingdata");
  $.ajax({
    type: "POST",
    url: "/items",
    contentType: "application/json"

  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEc7OztBQUNKLGVBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVksQ0FBQyxFQUFDLE1BQU0sV0FBUCxFQUFvQixVQUFVLENBQTlCLEVBQWlDLE1BQU0sSUFBdkMsRUFBRDtBQURELEtBQWI7O0FBSUEsVUFBSyxVQUFMLEdBQWtCLFVBQUMsT0FBRCxFQUFhO0FBQzdCLFVBQUksZ0JBQWdCLE1BQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsTUFBdEIsQ0FBNkIsQ0FBQyxPQUFELENBQTdCLENBQXBCO0FBQ0EsWUFBSyxRQUFMLENBQWM7QUFDWixvQkFBWTtBQURBLE9BQWQ7QUFHRCxLQUxEOztBQU9BLFVBQUssVUFBTCxHQUFrQixVQUFDLElBQUQsRUFBVTtBQUMxQixhQUFPLEdBQVAsQ0FBVyxJQUFYO0FBQ0QsS0FGRDs7QUFkaUI7QUFrQmxCOzs7OzZCQUdRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREY7QUFFRSw0QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxVQUEvQixFQUEyQyxZQUFZLEtBQUssVUFBNUQsR0FGRjtBQUdFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFVBQS9CO0FBSEYsT0FERjtBQU9EOzs7d0NBRW1CO0FBQ2xCLGNBQVEsR0FBUixDQUFZLFlBQVo7QUFDQSxnQkFBVSxFQUFWLEVBQWMsVUFBUyxJQUFULEVBQWU7QUFDM0IsYUFBSyxRQUFMLENBQWM7QUFDWixzQkFBWTtBQURBLFNBQWQ7QUFHRCxPQUphLENBSVosSUFKWSxDQUlQLElBSk8sQ0FBZDtBQUtEOzs7O0VBdkNlLE1BQU0sUzs7QUEwQ3hCLElBQUksWUFBWSxTQUFaLFNBQVksQ0FBQyxPQUFELEVBQVUsUUFBVixFQUF1QjtBQUNyQyxVQUFRLEdBQVIsQ0FBWSxnQkFBWjtBQUNBLElBQUUsSUFBRixDQUFPO0FBQ0wsVUFBTSxLQUREO0FBRUwsU0FBSyxRQUZBO0FBR0wsaUJBQWEsa0JBSFI7QUFJTCxhQUFTLGlCQUFTLElBQVQsRUFBZTtBQUN0QixlQUFTLElBQVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELEtBVkk7QUFXTCxXQUFPLGVBQVMsTUFBVCxFQUFnQjtBQUNyQixjQUFRLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLE1BQXJCO0FBQ0Q7QUFiSSxHQUFQO0FBZUQsQ0FqQkQ7O0FBbUJBLElBQUksV0FBVyxTQUFYLFFBQVcsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUF1QjtBQUNwQyxVQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsSUFBRSxJQUFGLENBQU87QUFDTCxVQUFNLE1BREQ7QUFFTCxTQUFLLFFBRkE7QUFHTCxpQkFBYTs7QUFIUixHQUFQO0FBTUQsQ0FSRCIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFt7bmFtZTogXCJjaG9jb2xhdGVcIiwgcXVhbnRpdHk6IDIsIGNvc3Q6IDMuOTl9XVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlTGlzdCA9IChuZXdJdGVtKSA9PiB7XG4gICAgICB2YXIgbmV3TWFzdGVyTGlzdCA9IHRoaXMuc3RhdGUubWFzdGVyTGlzdC5jb25jYXQoW25ld0l0ZW1dKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1hc3Rlckxpc3Q6IG5ld01hc3Rlckxpc3RcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgIGNuc29sZS5sb2coaXRlbSlcbiAgICB9XG5cbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2Pk5hdiBiYXIgaGVyZTwvZGl2PlxuICAgICAgICA8VG9kb0Zvcm0gdG9kb0xpc3Q9e3RoaXMuc3RhdGUubWFzdGVyTGlzdH0gdXBkYXRlTGlzdD17dGhpcy51cGRhdGVMaXN0fS8+XG4gICAgICAgIDxUb2RvTGlzdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5tYXN0ZXJMaXN0fS8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zb2xlLmxvZygnbG9hZGluZyB1cCcpXG4gICAgZmV0Y2hEYXRhKHt9LCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgfSlcbiAgICB9LmJpbmQodGhpcykpXG4gIH1cbn1cblxudmFyIGZldGNoRGF0YSA9IChvcHRpb25zLCBjYWxsYmFjaykgPT4ge1xuICBjb25zb2xlLmxvZyhcInNlbmRpbmdyZXF1ZXN0XCIpXG4gICQuYWpheCh7XG4gICAgdHlwZTogXCJHRVRcIixcbiAgICB1cmw6IFwiL2l0ZW1zXCIsXG4gICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGNhbGxiYWNrKGRhdGEpXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxuICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAvLyAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgIC8vIH0pXG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyb3IpXG4gICAgfVxuICB9KVxufVxuXG52YXIgc2VuZERhdGEgPSAob3B0aW9ucywgY2FsbGJhY2spID0+IHtcbiAgY29uc29sZS5sb2coXCJwb3N0aW5nZGF0YVwiKVxuICAkLmFqYXgoe1xuICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIHVybDogXCIvaXRlbXNcIixcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cbiAgfSlcbn0iXX0=