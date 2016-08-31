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
      masterList: [],
      navList: []
    };

    // lots of smells with these ajax calls
    _this.updateQuant = function (item, addOrSub) {
      if (addOrSub === "add") {
        item.quantity++;
      } else if (addOrSub === "sub") {
        item.quantity = Math.max(item.quantity - 1, 0);
      }
      var that = _this;
      $.ajax({
        type: "PUT",
        url: "/items",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function success(data) {
          console.log(data);
          that.setState({
            masterList: data
          });
        },
        error: function error(err) {
          console.log("err: ", err);
        }
      });
    };

    _this.addItem = function (newItem) {
      var that = _this;
      $.ajax({
        type: "POST",
        url: "/items",
        contentType: "application/json",
        data: JSON.stringify(newItem),
        success: function success(data) {
          console.log(data);
          that.setState({
            masterList: data
          });
        },
        error: function error(err) {
          console.log("err: ", err);
        }
      });
    };

    _this.deleteItem = function (item) {
      var that = _this;
      $.ajax({
        type: "DELETE",
        url: "/items",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function success(data) {
          console.log(data);
          that.setState({
            masterList: data
          });
        },
        error: function error(err) {
          console.log("err: ", err);
        }
      });
    };

    _this.fetchData = function (options, callback) {
      $.ajax({
        type: "GET",
        url: "/items",
        contentType: "application/json",
        success: function success(data) {
          callback(data);
        },
        error: function error(err) {
          console.log("err: ", err);
        }
      });
    };

    _this.filterData = function (filterObj) {
      $.ajax({
        type: "POST",
        url: "/filter",
        contentType: "application/json",
        data: JSON.stringify(filterObj),
        success: function success(data) {
          callback(data);
          // console.log(this)
          // this.setState({
          //   masterList: data
          // })
        },
        error: function error(err) {
          console.log("err: ", err);
        }
      });
    };

    _this.fetchAllList = function () {
      var that = _this;
      $.ajax({
        type: "GET",
        url: "/lists",
        contentType: "application/json",
        success: function success(data) {
          console.log(data);
          that.setState({
            navList: data
          });
        },
        error: function error(err) {
          console.log("err: ", err);
        }
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
        React.createElement(NavBar, { navList: this.state.navList }),
        React.createElement(TodoForm, { todoList: this.state.masterList, addItem: this.addItem }),
        React.createElement(TodoList, { todoList: this.state.masterList, deleteItem: this.deleteItem, updateQuant: this.updateQuant }),
        React.createElement(TodoCost, { todoList: this.state.masterList })
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchData({}, function (data) {
        this.setState({
          masterList: data
        });
      }.bind(this));

      this.fetchAllList();
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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QSxTQUFkO0FBR0QsT0FKa0IsQ0FJakIsSUFKaUIsQ0FJWixJQUpZLENBQW5COztBQU1BLFdBQUssWUFBTDtBQUNEOzs7O0VBaEplLE1BQU0sUyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW11cbiAgICB9XG5cbiAgICAvLyBsb3RzIG9mIHNtZWxscyB3aXRoIHRoZXNlIGFqYXggY2FsbHNcbiAgICB0aGlzLnVwZGF0ZVF1YW50ID0gKGl0ZW0sIGFkZE9yU3ViKSA9PiB7XG4gICAgICBpZiAoYWRkT3JTdWIgPT09IFwiYWRkXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSsrXG4gICAgICB9IGVsc2UgaWYgKGFkZE9yU3ViID09PSBcInN1YlwiKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkgPSBNYXRoLm1heChpdGVtLnF1YW50aXR5IC0gMSwgMClcbiAgICAgIH1cbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQVVRcIixcbiAgICAgICAgdXJsOiBcIi9pdGVtc1wiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5hZGRJdGVtID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogXCIvaXRlbXNcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShuZXdJdGVtKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIHVybDogXCIvaXRlbXNcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZmV0Y2hEYXRhID0gKG9wdGlvbnMsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICB1cmw6IFwiL2l0ZW1zXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlckRhdGEgPSAoZmlsdGVyT2JqKSA9PiB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiBcIi9maWx0ZXJcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShmaWx0ZXJPYmopLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgY2FsbGJhY2soZGF0YSlcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxuICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIC8vICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICAgIC8vIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmZldGNoQWxsTGlzdCA9ICgpID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogXCIvbGlzdHNcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgIG5hdkxpc3Q6IGRhdGFcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOYXZCYXIgbmF2TGlzdD17dGhpcy5zdGF0ZS5uYXZMaXN0fS8+XG4gICAgICAgIDxUb2RvRm9ybSB0b2RvTGlzdD17dGhpcy5zdGF0ZS5tYXN0ZXJMaXN0fSBhZGRJdGVtPXt0aGlzLmFkZEl0ZW19Lz5cbiAgICAgICAgPFRvZG9MaXN0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLm1hc3Rlckxpc3R9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9IC8+XG4gICAgICAgIDxUb2RvQ29zdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5tYXN0ZXJMaXN0fS8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmZldGNoRGF0YSh7fSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgIH0pXG4gICAgfS5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5mZXRjaEFsbExpc3QoKVxuICB9XG59XG5cblxuIl19