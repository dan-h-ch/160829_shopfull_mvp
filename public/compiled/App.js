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
      displayList: [],
      listid: 1, //default - need to change it based on when user logs in
      userid: 2 //temporarily
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
            masterList: JSON.parse(data)
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
            return entry.listid === _this2.state.listid && entry.deleted === false;
          });
          this.setState({
            displayList: displayList
          });
        });
      });
    };

    _this.deleteItem = function (item) {
      fetch('/items', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      }).then(function (data) {
        return data.json();
      }).then(function (data) {
        _this.setState({
          masterList: data
        }, function () {
          var _this3 = this;

          var displayList = this.state.masterList.filter(function (entry) {
            return entry.listid === _this3.state.listid && entry.deleted === false;
          });
          this.setState({
            displayList: displayList
          });
        });
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
          var _this4 = this;

          // this is callback to setState - ideally should implement it as a promise
          var displayList = this.state.masterList.filter(function (entry) {
            return entry.listid === _this4.state.listid && entry.deleted === false;
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
        React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, addList: this.addList, updateListid: this.updateListid }),
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
//# sourceMappingURL=data:application/json;base64,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QixXQUFLLFNBQUw7O0FBRUEsV0FBSyxZQUFMO0FBQ0Q7Ozs7RUFoTGUsTUFBTSxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnd2hhdHdnLWZldGNoJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBkaXNwbGF5TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsIC8vZGVmYXVsdCAtIG5lZWQgdG8gY2hhbmdlIGl0IGJhc2VkIG9uIHdoZW4gdXNlciBsb2dzIGluXG4gICAgICB1c2VyaWQ6IDIgLy90ZW1wb3JhcmlseVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkKSA9PiB7XG4gICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBpZClcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsaXN0aWQ6IGlkLFxuICAgICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gbG90cyBvZiBzbWVsbHMgd2l0aCB0aGVzZSBhamF4IGNhbGxzXG4gICAgdGhpcy51cGRhdGVRdWFudCA9IChpdGVtLCBhZGRPclN1YikgPT4ge1xuICAgICAgaWYgKGFkZE9yU3ViID09PSBcImFkZFwiKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkrK1xuICAgICAgfSBlbHNlIGlmIChhZGRPclN1YiA9PT0gXCJzdWJcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5ID0gTWF0aC5tYXgoaXRlbS5xdWFudGl0eSAtIDEsIDApXG4gICAgICB9XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUFVUXCIsXG4gICAgICAgIHVybDogXCIvaXRlbXNcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbWFzdGVyTGlzdDogSlNPTi5wYXJzZShkYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmFkZExpc3QgPSAobmV3TGlzdCkgPT4ge1xuICAgICAgZmV0Y2goJy9saXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TGlzdClcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuYWRkSXRlbSA9IChuZXdJdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdJdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyBjYWxsYmFjayB0byBzZXRTdGF0ZSAtIGlkZWFsbHkgc2hvdWxkIGltcGxlbWVudCBpdCBhcyBhIHByb21pc2VcbiAgICAgICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSB0aGlzLnN0YXRlLmxpc3RpZCAmJiBlbnRyeS5kZWxldGVkID09PSBmYWxzZSlcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRpc3BsYXlMaXN0OiBkaXNwbGF5TGlzdFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSB0aGlzLnN0YXRlLmxpc3RpZCAmJiBlbnRyeS5kZWxldGVkID09PSBmYWxzZSlcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRpc3BsYXlMaXN0OiBkaXNwbGF5TGlzdFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZmV0Y2hEYXRhID0gKCkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICAgIH0pXG4gICAgICAvLyBzZXQgc3RhdGUgd2l0aCBpdFxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyB0aGlzIGlzIGNhbGxiYWNrIHRvIHNldFN0YXRlIC0gaWRlYWxseSBzaG91bGQgaW1wbGVtZW50IGl0IGFzIGEgcHJvbWlzZVxuICAgICAgICAgIHZhciBkaXNwbGF5TGlzdCA9IHRoaXMuc3RhdGUubWFzdGVyTGlzdC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5saXN0aWQgPT09IHRoaXMuc3RhdGUubGlzdGlkICYmIGVudHJ5LmRlbGV0ZWQgPT09IGZhbHNlKVxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGlzcGxheUxpc3Q6IGRpc3BsYXlMaXN0XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gLy8gbm90IGJlaW5nIHVzZWRcbiAgICAvLyB0aGlzLmZpbHRlckRhdGEgPSAoZmlsdGVyT2JqKSA9PiB7XG4gICAgLy8gICAkLmFqYXgoe1xuICAgIC8vICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgdXJsOiBcIi9maWx0ZXJcIixcbiAgICAvLyAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIC8vICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShmaWx0ZXJPYmopLFxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgLy8gICAgICAgY2FsbGJhY2soZGF0YSlcbiAgICAvLyAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxuICAgIC8vICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgIC8vICAgbWFzdGVyTGlzdDogZGF0YVxuICAgIC8vICAgICAgIC8vIH0pXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG5cbiAgICB0aGlzLmZldGNoQWxsTGlzdCA9ICgpID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGZldGNoKCcvbGlzdHMnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE5hdkJhciB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBuYXZMaXN0PXt0aGlzLnN0YXRlLm5hdkxpc3R9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnVwZGF0ZUxpc3RpZH0vPlxuICAgICAgICA8VG9kb0Zvcm0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfS8+XG4gICAgICAgIDxUb2RvTGlzdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gZGVsZXRlSXRlbT17dGhpcy5kZWxldGVJdGVtfSB1cGRhdGVRdWFudD17dGhpcy51cGRhdGVRdWFudH0gIC8+XG4gICAgICAgIDxUb2RvQ29zdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhKCk7XG5cbiAgICB0aGlzLmZldGNoQWxsTGlzdCgpO1xuICB9XG5cbn1cblxuXG4iXX0=