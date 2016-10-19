'use strict';

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
      userid: 1 //temporarily
    };

    /////////////////////////////////
    /////   LIST RELATED     ///////
    ///////////////////////////////

    _this.fetchLists = function () {
      // userid is being passed on in URL, ultimately refactor our when auth token is in place
      var getUrl = '/lists/' + _this.state.userid;
      fetch(getUrl).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this.setState({
          navList: data
        });
      });
    };

    // visually what do you see, does not change masterList or navList
    _this.updateListid = function (id) {
      _this.setState({
        listid: id
      }, function () {
        this.makeDisplayData();
      });
    };

    // posts a new list and gets all lists allows - follow route to see
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

    _this.deleteList = function (listid) {};

    /////////////////////////////////
    /////   ITEM RELATED     ///////
    ///////////////////////////////

    _this.updateQuant = function (item, addOrSub) {
      if (addOrSub === "add") {
        item.quantity++;
      } else if (addOrSub === "sub") {
        item.quantity = Math.max(item.quantity - 1, 0);
      }
      fetch('/items', {
        method: 'PUT',
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
          this.makeDisplayData();
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
          this.makeDisplayData();
        });
      });
    };

    _this.fetchItems = function () {
      console.log('trying to get all data');
      var getUrl = '/items/' + _this.state.userid;
      console.log(getUrl);
      fetch(getUrl).then(function (res) {
        return res.json();
      })
      // set state with it
      .then(function (data) {
        _this.setState({
          masterList: data
        }, function () {
          this.makeDisplayData();
        });
      });
    };

    _this.makeDisplayData = function () {
      var listid = arguments.length <= 0 || arguments[0] === undefined ? _this.state.listid : arguments[0];
      var deletedStatus = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var displayList = _this.state.masterList.filter(function (entry) {
        return entry.listid === listid && entry.deleted === deletedStatus;
      });
      _this.setState({
        displayList: displayList
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


    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, addList: this.addList, updateListid: this.updateListid }),
        React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid, userid: this.state.userid }),
        React.createElement(TodoList, { todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid }),
        React.createElement(TodoCost, { todoList: this.state.displayList })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchLists();
      this.fetchItems();
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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LENBQXNCLE1BQXRCLENBQTZCLFVBQUMsS0FBRDtBQUFBLGVBQVcsTUFBTSxNQUFOLEtBQWlCLE1BQWpCLElBQTJCLE1BQU0sT0FBTixLQUFrQixhQUF4RDtBQUFBLE9BQTdCLENBQWxCO0FBQ0EsWUFBSyxRQUFMLENBQWM7QUFDWixxQkFBYTtBQURELE9BQWQ7QUFHRCxLQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUE5SmlCO0FBaUtsQjs7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsNEJBQUMsTUFBRCxJQUFRLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBM0IsRUFBbUMsU0FBUyxLQUFLLEtBQUwsQ0FBVyxPQUF2RCxFQUFnRSxTQUFTLEtBQUssT0FBOUUsRUFBdUYsY0FBYyxLQUFLLFlBQTFHLEdBREY7QUFFRSw0QkFBQyxRQUFELElBQVUsU0FBUyxLQUFLLE9BQXhCLEVBQWlDLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBcEQsRUFBNEQsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUEvRSxHQUZGO0FBR0UsNEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsV0FBL0IsRUFBNEMsWUFBWSxLQUFLLFVBQTdELEVBQXlFLGFBQWEsS0FBSyxXQUEzRixFQUF3RyxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTNILEdBSEY7QUFJRSw0QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxXQUEvQjtBQUpGLE9BREY7QUFRRDs7O3dDQUVtQjtBQUNsQixXQUFLLFVBQUw7QUFDQSxXQUFLLFVBQUw7QUFDRDs7OztFQW5MZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW10sXG4gICAgICBuYXZMaXN0OiBbXSxcbiAgICAgIGRpc3BsYXlMaXN0OiBbXSxcbiAgICAgIGxpc3RpZDogMSwgLy9kZWZhdWx0IC0gbmVlZCB0byBjaGFuZ2UgaXQgYmFzZWQgb24gd2hlbiB1c2VyIGxvZ3MgaW5cbiAgICAgIHVzZXJpZDogMSAvL3RlbXBvcmFyaWx5XG4gICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBMSVNUIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBcbiAgICB0aGlzLmZldGNoTGlzdHMgPSAoKSA9PiB7XG4gICAgICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgICB2YXIgZ2V0VXJsID0gYC9saXN0cy8ke3RoaXMuc3RhdGUudXNlcmlkfWBcbiAgICAgIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIHZpc3VhbGx5IHdoYXQgZG8geW91IHNlZSwgZG9lcyBub3QgY2hhbmdlIG1hc3Rlckxpc3Qgb3IgbmF2TGlzdFxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGlzdGlkOiBpZFxuICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgfVxuXG4gICAgLy8gcG9zdHMgYSBuZXcgbGlzdCBhbmQgZ2V0cyBhbGwgbGlzdHMgYWxsb3dzIC0gZm9sbG93IHJvdXRlIHRvIHNlZVxuICAgIHRoaXMuYWRkTGlzdCA9IChuZXdMaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdMaXN0KVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGFcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVMaXN0ID0gKGxpc3RpZCkgPT4ge1xuXG4gICAgfVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgSVRFTSBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB0aGlzLnVwZGF0ZVF1YW50ID0gKGl0ZW0sIGFkZE9yU3ViKSA9PiB7XG4gICAgICBpZiAoYWRkT3JTdWIgPT09IFwiYWRkXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSsrXG4gICAgICB9IGVsc2UgaWYgKGFkZE9yU3ViID09PSBcInN1YlwiKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkgPSBNYXRoLm1heChpdGVtLnF1YW50aXR5IC0gMSwgMClcbiAgICAgIH1cbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmFkZEl0ZW0gPSAobmV3SXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3SXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmRlbGV0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZmV0Y2hJdGVtcyA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCd0cnlpbmcgdG8gZ2V0IGFsbCBkYXRhJylcbiAgICAgIHZhciBnZXRVcmwgPSBgL2l0ZW1zLyR7dGhpcy5zdGF0ZS51c2VyaWR9YFxuICAgICAgY29uc29sZS5sb2coZ2V0VXJsKVxuICAgICAgZmV0Y2goZ2V0VXJsKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICB9KVxuICAgICAgLy8gc2V0IHN0YXRlIHdpdGggaXRcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMubWFrZURpc3BsYXlEYXRhID0gKGxpc3RpZCA9IHRoaXMuc3RhdGUubGlzdGlkLCBkZWxldGVkU3RhdHVzID0gZmFsc2UpID0+IHtcbiAgICAgIHZhciBkaXNwbGF5TGlzdCA9IHRoaXMuc3RhdGUubWFzdGVyTGlzdC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5saXN0aWQgPT09IGxpc3RpZCAmJiBlbnRyeS5kZWxldGVkID09PSBkZWxldGVkU3RhdHVzKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRpc3BsYXlMaXN0OiBkaXNwbGF5TGlzdFxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyAvLyBub3QgYmVpbmcgdXNlZFxuICAgIC8vIHRoaXMuZmlsdGVyRGF0YSA9IChmaWx0ZXJPYmopID0+IHtcbiAgICAvLyAgICQuYWpheCh7XG4gICAgLy8gICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIC8vICAgICB1cmw6IFwiL2ZpbHRlclwiLFxuICAgIC8vICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgLy8gICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGZpbHRlck9iaiksXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAvLyAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgIC8vICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpXG4gICAgLy8gICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7XG4gICAgLy8gICAgICAgLy8gICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgLy8gICAgICAgLy8gfSlcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9KVxuICAgIC8vIH1cblxuXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOYXZCYXIgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gbmF2TGlzdD17dGhpcy5zdGF0ZS5uYXZMaXN0fSBhZGRMaXN0PXt0aGlzLmFkZExpc3R9IHVwZGF0ZUxpc3RpZD17dGhpcy51cGRhdGVMaXN0aWR9Lz5cbiAgICAgICAgPFRvZG9Gb3JtIGFkZEl0ZW09e3RoaXMuYWRkSXRlbX0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0vPlxuICAgICAgICA8VG9kb0xpc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IC8+XG4gICAgICAgIDxUb2RvQ29zdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gIH1cblxufVxuXG5cbiJdfQ==