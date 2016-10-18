"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import 'whatwg-fetch';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      masterList: [],
      navList: [],
      listid: 1,
      displayList: [] //default - need to change it based on when user logs in
    };

    _this.updateListid = function (id) {
      console.log("filterin...");
      var displayList = _this.state.masterList.filter(function (entry) {
        return entry.listid === id;
      });
      _this.setState({
        listid: id,
        displayList: displayList
      });
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

    _this.addList = function (newList) {
      var that = _this;
      $.ajax({
        type: "POST",
        url: "/lists",
        contentType: "application/json",
        data: JSON.stringify(newList),
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

    _this.fetchData = function () {
      var that = _this;
      fetch('/items').then(function (res) {
        return res.json();
      }).then(function (data) {
        console.log(data);
        that.setState({
          masterList: data
        }, function () {
          // this is callback to setState - ideally should implement it as a promise
          var displayList = this.state.masterList.filter(function (entry) {
            return entry.listid === 1;
          });
          this.setState({
            displayList: displayList
          });
        });
      });
    };

    // // not being used
    // this.filterData = (filterObj) => {
    //   $.ajax({
    //     type: "POST",
    //     url: "/filter",
    //     contentType: "application/json",
    //     data: JSON.stringify(filterObj),
    //     success: function(data) {
    //       callback(data)
    //       // console.log(this)
    //       // this.setState({
    //       //   masterList: data
    //       // })
    //     },
    //     error: function(err) {
    //       console.log("err: ", err)
    //     }
    //   })
    // }

    _this.fetchAllList = function () {
      var that = _this;
      fetch('/lists').then(function (res) {
        return res.json();
      }).then(function (data) {
        console.log(data);
        that.setState({
          navList: data
        });
        return data;
      });
    };
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      console.log(this.state.displayList);
      return React.createElement(
        "div",
        null,
        React.createElement(NavBar, { navList: this.state.navList, addList: this.addList, updateListid: this.updateListid }),
        React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid }),
        React.createElement(TodoList, { todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant }),
        React.createElement(TodoCost, { todoList: this.state.displayList })
      );
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.fetchData();

      this.fetchAllList();

      // this is happeningbefore state is set so no data is showing up
      // this.updateListid(1);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateListid(1);
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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LEVBSUMsSUFKRCxDQUlNLFVBQVMsSUFBVCxFQUFlO0FBQ25CLGdCQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsYUFBSyxRQUFMLENBQWM7QUFDWixtQkFBUztBQURHLFNBQWQ7QUFHQSxlQUFPLElBQVA7QUFDRCxPQVZEO0FBV0QsS0FiRDtBQTdJaUI7QUEySmxCOzs7OzZCQUVRO0FBQ1AsY0FBUSxHQUFSLENBQVksS0FBSyxLQUFMLENBQVcsV0FBdkI7QUFDQSxhQUNFO0FBQUE7QUFBQTtBQUNFLDRCQUFDLE1BQUQsSUFBUSxTQUFTLEtBQUssS0FBTCxDQUFXLE9BQTVCLEVBQXFDLFNBQVMsS0FBSyxPQUFuRCxFQUE0RCxjQUFjLEtBQUssWUFBL0UsR0FERjtBQUVFLDRCQUFDLFFBQUQsSUFBVSxTQUFTLEtBQUssT0FBeEIsRUFBaUMsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUFwRCxHQUZGO0FBR0UsNEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsV0FBL0IsRUFBNEMsWUFBWSxLQUFLLFVBQTdELEVBQXlFLGFBQWEsS0FBSyxXQUEzRixHQUhGO0FBSUUsNEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsV0FBL0I7QUFKRixPQURGO0FBUUQ7Ozt5Q0FFb0I7QUFDbkIsV0FBSyxTQUFMOztBQUVBLFdBQUssWUFBTDs7QUFFQTtBQUNBO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsV0FBSyxZQUFMLENBQWtCLENBQWxCO0FBQ0Q7Ozs7RUF0TGUsTUFBTSxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnd2hhdHdnLWZldGNoJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsXG4gICAgICBkaXNwbGF5TGlzdDogW10gLy9kZWZhdWx0IC0gbmVlZCB0byBjaGFuZ2UgaXQgYmFzZWQgb24gd2hlbiB1c2VyIGxvZ3MgaW5cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUxpc3RpZCA9IChpZCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJmaWx0ZXJpbi4uLlwiKVxuICAgICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gaWQpXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGlzdGlkOiBpZCxcbiAgICAgICAgZGlzcGxheUxpc3Q6IGRpc3BsYXlMaXN0XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIGxvdHMgb2Ygc21lbGxzIHdpdGggdGhlc2UgYWpheCBjYWxsc1xuICAgIHRoaXMudXBkYXRlUXVhbnQgPSAoaXRlbSwgYWRkT3JTdWIpID0+IHtcbiAgICAgIGlmIChhZGRPclN1YiA9PT0gXCJhZGRcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5KytcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09IFwic3ViXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IE1hdGgubWF4KGl0ZW0ucXVhbnRpdHkgLSAxLCAwKVxuICAgICAgfVxuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBVVFwiLFxuICAgICAgICB1cmw6IFwiL2l0ZW1zXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmFkZExpc3QgPSAobmV3TGlzdCkgPT4ge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiBcIi9saXN0c1wiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgIG5hdkxpc3Q6IGRhdGFcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5hZGRJdGVtID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogXCIvaXRlbXNcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShuZXdJdGVtKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIHVybDogXCIvaXRlbXNcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZmV0Y2hEYXRhID0gKCkgPT4ge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgZmV0Y2goJy9pdGVtcycpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyBjYWxsYmFjayB0byBzZXRTdGF0ZSAtIGlkZWFsbHkgc2hvdWxkIGltcGxlbWVudCBpdCBhcyBhIHByb21pc2VcbiAgICAgICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSAxKVxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGlzcGxheUxpc3Q6IGRpc3BsYXlMaXN0XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gLy8gbm90IGJlaW5nIHVzZWRcbiAgICAvLyB0aGlzLmZpbHRlckRhdGEgPSAoZmlsdGVyT2JqKSA9PiB7XG4gICAgLy8gICAkLmFqYXgoe1xuICAgIC8vICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgdXJsOiBcIi9maWx0ZXJcIixcbiAgICAvLyAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIC8vICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShmaWx0ZXJPYmopLFxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgLy8gICAgICAgY2FsbGJhY2soZGF0YSlcbiAgICAvLyAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxuICAgIC8vICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgIC8vICAgbWFzdGVyTGlzdDogZGF0YVxuICAgIC8vICAgICAgIC8vIH0pXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG5cbiAgICB0aGlzLmZldGNoQWxsTGlzdCA9ICgpID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGZldGNoKCcvbGlzdHMnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmRpc3BsYXlMaXN0KVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIG5hdkxpc3Q9e3RoaXMuc3RhdGUubmF2TGlzdH0gYWRkTGlzdD17dGhpcy5hZGRMaXN0fSB1cGRhdGVMaXN0aWQ9e3RoaXMudXBkYXRlTGlzdGlkfS8+XG4gICAgICAgIDxUb2RvRm9ybSBhZGRJdGVtPXt0aGlzLmFkZEl0ZW19IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9Lz5cbiAgICAgICAgPFRvZG9MaXN0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnVwZGF0ZVF1YW50fSAgLz5cbiAgICAgICAgPFRvZG9Db3N0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fS8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5mZXRjaERhdGEoKTtcblxuICAgIHRoaXMuZmV0Y2hBbGxMaXN0KCk7XG5cbiAgICAvLyB0aGlzIGlzIGhhcHBlbmluZ2JlZm9yZSBzdGF0ZSBpcyBzZXQgc28gbm8gZGF0YSBpcyBzaG93aW5nIHVwXG4gICAgLy8gdGhpcy51cGRhdGVMaXN0aWQoMSk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnVwZGF0ZUxpc3RpZCgxKTtcbiAgfVxufVxuXG5cbiJdfQ==