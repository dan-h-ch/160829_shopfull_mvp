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
          console.log("hoho");
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