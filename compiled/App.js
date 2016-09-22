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
      console.log("about to fetch data");
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
//# sourceMappingURL=data:application/json;base64,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SyxRQUFMLENBQWM7QUFDWixzQkFBWTtBQURBLFNBQWQ7QUFHRCxPQUprQixDQUlqQixJQUppQixDQUlaLElBSlksQ0FBbkI7O0FBTUEsV0FBSyxZQUFMO0FBQ0Q7Ozs7RUFqSmUsTUFBTSxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW10sXG4gICAgICBuYXZMaXN0OiBbXVxuICAgIH1cblxuICAgIC8vIGxvdHMgb2Ygc21lbGxzIHdpdGggdGhlc2UgYWpheCBjYWxsc1xuICAgIHRoaXMudXBkYXRlUXVhbnQgPSAoaXRlbSwgYWRkT3JTdWIpID0+IHtcbiAgICAgIGlmIChhZGRPclN1YiA9PT0gXCJhZGRcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5KytcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09IFwic3ViXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IE1hdGgubWF4KGl0ZW0ucXVhbnRpdHkgLSAxLCAwKVxuICAgICAgfVxuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBVVFwiLFxuICAgICAgICB1cmw6IFwiL2l0ZW1zXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmFkZEl0ZW0gPSAobmV3SXRlbSkgPT4ge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiBcIi9pdGVtc1wiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgdXJsOiBcIi9pdGVtc1wiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5mZXRjaERhdGEgPSAob3B0aW9ucywgY2FsbGJhY2spID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWJvdXQgdG8gZmV0Y2ggZGF0YVwiKVxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgdXJsOiBcIi9pdGVtc1wiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXJEYXRhID0gKGZpbHRlck9iaikgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogXCIvZmlsdGVyXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZmlsdGVyT2JqKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcylcbiAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAvLyAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgICAvLyB9KVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5mZXRjaEFsbExpc3QgPSAoKSA9PiB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICB1cmw6IFwiL2xpc3RzXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIG5hdkxpc3Q9e3RoaXMuc3RhdGUubmF2TGlzdH0vPlxuICAgICAgICA8VG9kb0Zvcm0gdG9kb0xpc3Q9e3RoaXMuc3RhdGUubWFzdGVyTGlzdH0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfS8+XG4gICAgICAgIDxUb2RvTGlzdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5tYXN0ZXJMaXN0fSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnVwZGF0ZVF1YW50fSAvPlxuICAgICAgICA8VG9kb0Nvc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUubWFzdGVyTGlzdH0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5mZXRjaERhdGEoe30sIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICB9KVxuICAgIH0uYmluZCh0aGlzKSlcblxuICAgIHRoaXMuZmV0Y2hBbGxMaXN0KClcbiAgfVxufVxuXG5cbiJdfQ==