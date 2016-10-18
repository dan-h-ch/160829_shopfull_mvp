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
//# sourceMappingURL=data:application/json;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFLLFlBQUwsR0FBb0IsWUFBTTtBQUN4QixVQUFJLFlBQUo7QUFDQSxZQUFNLFFBQU4sRUFDQyxJQURELENBQ00sVUFBUyxHQUFULEVBQWM7QUFDbEIsZUFBTyxJQUFJLElBQUosRUFBUDtBQUNELE9BSEQsRUFJQyxJQUpELENBSU0sVUFBUyxJQUFULEVBQWU7QUFDbkIsYUFBSyxRQUFMLENBQWM7QUFDWixtQkFBUztBQURHLFNBQWQ7QUFHRCxPQVJEO0FBU0QsS0FYRDtBQWpKaUI7QUE2SmxCOzs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRSw0QkFBQyxNQUFELElBQVEsU0FBUyxLQUFLLEtBQUwsQ0FBVyxPQUE1QixFQUFxQyxTQUFTLEtBQUssT0FBbkQsRUFBNEQsY0FBYyxLQUFLLFlBQS9FLEdBREY7QUFFRSw0QkFBQyxRQUFELElBQVUsU0FBUyxLQUFLLE9BQXhCLEVBQWlDLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBcEQsR0FGRjtBQUdFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFdBQS9CLEVBQTRDLFlBQVksS0FBSyxVQUE3RCxFQUF5RSxhQUFhLEtBQUssV0FBM0YsR0FIRjtBQUlFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFdBQS9CO0FBSkYsT0FERjtBQVFEOzs7eUNBRW9CO0FBQ25CLFdBQUssU0FBTDs7QUFFQSxXQUFLLFlBQUw7QUFDRDs7OztFQWhMZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW10sXG4gICAgICBuYXZMaXN0OiBbXSxcbiAgICAgIGxpc3RpZDogMSxcbiAgICAgIGRpc3BsYXlMaXN0OiBbXSAvL2RlZmF1bHQgLSBuZWVkIHRvIGNoYW5nZSBpdCBiYXNlZCBvbiB3aGVuIHVzZXIgbG9ncyBpblxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkKSA9PiB7XG4gICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBpZClcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsaXN0aWQ6IGlkLFxuICAgICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gbG90cyBvZiBzbWVsbHMgd2l0aCB0aGVzZSBhamF4IGNhbGxzXG4gICAgdGhpcy51cGRhdGVRdWFudCA9IChpdGVtLCBhZGRPclN1YikgPT4ge1xuICAgICAgaWYgKGFkZE9yU3ViID09PSBcImFkZFwiKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkrK1xuICAgICAgfSBlbHNlIGlmIChhZGRPclN1YiA9PT0gXCJzdWJcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5ID0gTWF0aC5tYXgoaXRlbS5xdWFudGl0eSAtIDEsIDApXG4gICAgICB9XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUFVUXCIsXG4gICAgICAgIHVybDogXCIvaXRlbXNcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuYWRkTGlzdCA9IChuZXdMaXN0KSA9PiB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICB1cmw6IFwiL2xpc3RzXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobmV3TGlzdCksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbmF2TGlzdDogZGF0YVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmFkZEl0ZW0gPSAobmV3SXRlbSkgPT4ge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdJdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyBjYWxsYmFjayB0byBzZXRTdGF0ZSAtIGlkZWFsbHkgc2hvdWxkIGltcGxlbWVudCBpdCBhcyBhIHByb21pc2VcbiAgICAgICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSB0aGlzLnN0YXRlLmxpc3RpZClcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRpc3BsYXlMaXN0OiBkaXNwbGF5TGlzdFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIHVybDogXCIvaXRlbXNcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZmV0Y2hEYXRhID0gKCkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICAgIH0pXG4gICAgICAvLyBzZXQgc3RhdGUgd2l0aCBpdFxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyB0aGlzIGlzIGNhbGxiYWNrIHRvIHNldFN0YXRlIC0gaWRlYWxseSBzaG91bGQgaW1wbGVtZW50IGl0IGFzIGEgcHJvbWlzZVxuICAgICAgICAgIHZhciBkaXNwbGF5TGlzdCA9IHRoaXMuc3RhdGUubWFzdGVyTGlzdC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5saXN0aWQgPT09IHRoaXMuc3RhdGUubGlzdGlkKVxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGlzcGxheUxpc3Q6IGRpc3BsYXlMaXN0XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gLy8gbm90IGJlaW5nIHVzZWRcbiAgICAvLyB0aGlzLmZpbHRlckRhdGEgPSAoZmlsdGVyT2JqKSA9PiB7XG4gICAgLy8gICAkLmFqYXgoe1xuICAgIC8vICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgdXJsOiBcIi9maWx0ZXJcIixcbiAgICAvLyAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIC8vICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShmaWx0ZXJPYmopLFxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgLy8gICAgICAgY2FsbGJhY2soZGF0YSlcbiAgICAvLyAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxuICAgIC8vICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgIC8vICAgbWFzdGVyTGlzdDogZGF0YVxuICAgIC8vICAgICAgIC8vIH0pXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG5cbiAgICB0aGlzLmZldGNoQWxsTGlzdCA9ICgpID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGZldGNoKCcvbGlzdHMnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE5hdkJhciBuYXZMaXN0PXt0aGlzLnN0YXRlLm5hdkxpc3R9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnVwZGF0ZUxpc3RpZH0vPlxuICAgICAgICA8VG9kb0Zvcm0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfS8+XG4gICAgICAgIDxUb2RvTGlzdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gZGVsZXRlSXRlbT17dGhpcy5kZWxldGVJdGVtfSB1cGRhdGVRdWFudD17dGhpcy51cGRhdGVRdWFudH0gIC8+XG4gICAgICAgIDxUb2RvQ29zdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhKCk7XG5cbiAgICB0aGlzLmZldGNoQWxsTGlzdCgpO1xuICB9XG5cbn1cblxuXG4iXX0=