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
      fetch('/lists', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList)
      }).then(function (data) {
        return data.json();
      }).then(function (data) {
        _this.setState({
          navList: data
        });
      });
    };

    _this.addItem = function (newItem) {
      fetch('/items', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      }).then(function (data) {
        return data.json();
      }).then(function (data) {
        _this.setState({
          masterList: data
        }, function () {
          var _this2 = this;

          // this is callback to setState - ideally should implement it as a promise
          var displayList = this.state.masterList.filter(function (entry) {
            return entry.listid === _this2.state.listid;
          });
          this.setState({
            displayList: displayList
          });
        });
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
      fetch('/items').then(function (res) {
        return res.json();
      })
      // set state with it
      .then(function (data) {
        console.log(data);
        _this.setState({
          masterList: data
        }, function () {
          var _this3 = this;

          // this is callback to setState - ideally should implement it as a promise
          var displayList = this.state.masterList.filter(function (entry) {
            return entry.listid === _this3.state.listid;
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
        that.setState({
          navList: data
        });
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
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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LFlBQU07QUFDeEIsVUFBSSxZQUFKO0FBQ0EsWUFBTSxRQUFOLEVBQ0MsSUFERCxDQUNNLFVBQVMsR0FBVCxFQUFjO0FBQ2xCLGVBQU8sSUFBSSxJQUFKLEVBQVA7QUFDRCxPQUhELEVBSUMsSUFKRCxDQUlNLFVBQVMsSUFBVCxFQUFlO0FBQ25CLGFBQUssUUFBTCxDQUFjO0FBQ1osbUJBQVM7QUFERyxTQUFkO0FBR0QsT0FSRDtBQVNELEtBWEQ7QUE3SWlCO0FBeUpsQjs7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsNEJBQUMsTUFBRCxJQUFRLFNBQVMsS0FBSyxLQUFMLENBQVcsT0FBNUIsRUFBcUMsU0FBUyxLQUFLLE9BQW5ELEVBQTRELGNBQWMsS0FBSyxZQUEvRSxHQURGO0FBRUUsNEJBQUMsUUFBRCxJQUFVLFNBQVMsS0FBSyxPQUF4QixFQUFpQyxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQXBELEdBRkY7QUFHRSw0QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxXQUEvQixFQUE0QyxZQUFZLEtBQUssVUFBN0QsRUFBeUUsYUFBYSxLQUFLLFdBQTNGLEdBSEY7QUFJRSw0QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxXQUEvQjtBQUpGLE9BREY7QUFRRDs7O3lDQUVvQjtBQUNuQixXQUFLLFNBQUw7O0FBRUEsV0FBSyxZQUFMO0FBQ0Q7Ozs7RUE1S2UsTUFBTSxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnd2hhdHdnLWZldGNoJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsXG4gICAgICBkaXNwbGF5TGlzdDogW10gLy9kZWZhdWx0IC0gbmVlZCB0byBjaGFuZ2UgaXQgYmFzZWQgb24gd2hlbiB1c2VyIGxvZ3MgaW5cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUxpc3RpZCA9IChpZCkgPT4ge1xuICAgICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gaWQpXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGlzdGlkOiBpZCxcbiAgICAgICAgZGlzcGxheUxpc3Q6IGRpc3BsYXlMaXN0XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIGxvdHMgb2Ygc21lbGxzIHdpdGggdGhlc2UgYWpheCBjYWxsc1xuICAgIHRoaXMudXBkYXRlUXVhbnQgPSAoaXRlbSwgYWRkT3JTdWIpID0+IHtcbiAgICAgIGlmIChhZGRPclN1YiA9PT0gXCJhZGRcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5KytcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09IFwic3ViXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IE1hdGgubWF4KGl0ZW0ucXVhbnRpdHkgLSAxLCAwKVxuICAgICAgfVxuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBVVFwiLFxuICAgICAgICB1cmw6IFwiL2l0ZW1zXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5hZGRMaXN0ID0gKG5ld0xpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmFkZEl0ZW0gPSAobmV3SXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3SXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHRoaXMgaXMgY2FsbGJhY2sgdG8gc2V0U3RhdGUgLSBpZGVhbGx5IHNob3VsZCBpbXBsZW1lbnQgaXQgYXMgYSBwcm9taXNlXG4gICAgICAgICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gdGhpcy5zdGF0ZS5saXN0aWQpXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmRlbGV0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICB1cmw6IFwiL2l0ZW1zXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmZldGNoRGF0YSA9ICgpID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICB9KVxuICAgICAgLy8gc2V0IHN0YXRlIHdpdGggaXRcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyBjYWxsYmFjayB0byBzZXRTdGF0ZSAtIGlkZWFsbHkgc2hvdWxkIGltcGxlbWVudCBpdCBhcyBhIHByb21pc2VcbiAgICAgICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSB0aGlzLnN0YXRlLmxpc3RpZClcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRpc3BsYXlMaXN0OiBkaXNwbGF5TGlzdFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIC8vIG5vdCBiZWluZyB1c2VkXG4gICAgLy8gdGhpcy5maWx0ZXJEYXRhID0gKGZpbHRlck9iaikgPT4ge1xuICAgIC8vICAgJC5hamF4KHtcbiAgICAvLyAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgLy8gICAgIHVybDogXCIvZmlsdGVyXCIsXG4gICAgLy8gICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAvLyAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZmlsdGVyT2JqKSxcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vICAgICAgIGNhbGxiYWNrKGRhdGEpXG4gICAgLy8gICAgICAgLy8gY29uc29sZS5sb2codGhpcylcbiAgICAvLyAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICAvLyAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAvLyAgICAgICAvLyB9KVxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuXG4gICAgdGhpcy5mZXRjaEFsbExpc3QgPSAoKSA9PiB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBmZXRjaCgnL2xpc3RzJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOYXZCYXIgbmF2TGlzdD17dGhpcy5zdGF0ZS5uYXZMaXN0fSBhZGRMaXN0PXt0aGlzLmFkZExpc3R9IHVwZGF0ZUxpc3RpZD17dGhpcy51cGRhdGVMaXN0aWR9Lz5cbiAgICAgICAgPFRvZG9Gb3JtIGFkZEl0ZW09e3RoaXMuYWRkSXRlbX0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0vPlxuICAgICAgICA8VG9kb0xpc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9ICAvPlxuICAgICAgICA8VG9kb0Nvc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9Lz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmZldGNoRGF0YSgpO1xuXG4gICAgdGhpcy5mZXRjaEFsbExpc3QoKTtcbiAgfVxuXG59XG5cblxuIl19