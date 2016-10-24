'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import 'whatwg-fetch';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // this.setState({
      //   idToken: this.getIdToken()
      // })
      // this.lock = new Auth0Lock('eaDzLmALxb7fvxQhVKTkxW8rEDtMnGZD', 'danch.auth0.com')
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchLists();
      this.fetchItems();
    }
  }]);

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

  // fetchItems() {
  //   console.log('trying to get all data')
  //   var getUrl = `/items/${this.state.userid}`
  //   console.log(getUrl)
  //   fetch(getUrl)
  //   .then(function(res) {
  //     return res.json()
  //   })
  //   // set state with it
  //   .then((data) => {
  //     this.setState({
  //       masterList: data
  //     }, function() {this.makeDisplayData()})
  //   })
  // }

  // makeDisplayData(listid = this.state.listid, deletedStatus = false) {
  //   var displayList = this.state.masterList.filter((entry) => entry.listid === listid && entry.deleted === deletedStatus)
  //   this.setState({
  //     displayList: displayList
  //   })
  // }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, addList: this.addList, updateListid: this.updateListid }),
        React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid, userid: this.state.userid }),
        React.createElement(TodoList, { lock: this.lock, todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid }),
        React.createElement(TodoCost, { todoList: this.state.displayList })
      );
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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LEtBQUwsQ0FBVyxXQUEvQjtBQUpGLE9BREY7QUFRRDs7OztFQWpOZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgLy8gfSlcbiAgICAvLyB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrKCdlYUR6TG1BTHhiN2Z2eFFoVktUa3hXOHJFRHRNbkdaRCcsICdkYW5jaC5hdXRoMC5jb20nKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBkaXNwbGF5TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsIC8vZGVmYXVsdCAtIG5lZWQgdG8gY2hhbmdlIGl0IGJhc2VkIG9uIHdoZW4gdXNlciBsb2dzIGluXG4gICAgICB1c2VyaWQ6IDIgLy90ZW1wb3JhcmlseVxuICAgIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgTElTVCBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgXG4gICAgdGhpcy5mZXRjaExpc3RzID0gKCkgPT4ge1xuICAgICAgLy8gdXNlcmlkIGlzIGJlaW5nIHBhc3NlZCBvbiBpbiBVUkwsIHVsdGltYXRlbHkgcmVmYWN0b3Igb3VyIHdoZW4gYXV0aCB0b2tlbiBpcyBpbiBwbGFjZVxuICAgICAgdmFyIGdldFVybCA9IGAvbGlzdHMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gXG4gICAgICBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyB2aXN1YWxseSB3aGF0IGRvIHlvdSBzZWUsIGRvZXMgbm90IGNoYW5nZSBtYXN0ZXJMaXN0IG9yIG5hdkxpc3RcbiAgICB0aGlzLnVwZGF0ZUxpc3RpZCA9IChpZCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxpc3RpZDogaWRcbiAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgIH1cblxuICAgIC8vIHBvc3RzIGEgbmV3IGxpc3QgYW5kIGdldHMgYWxsIGxpc3RzIGFsbG93cyAtIGZvbGxvdyByb3V0ZSB0byBzZWVcbiAgICB0aGlzLmFkZExpc3QgPSAobmV3TGlzdCkgPT4ge1xuICAgICAgZmV0Y2goJy9saXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TGlzdClcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlTGlzdCA9IChsaXN0aWQpID0+IHtcblxuICAgIH1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLyAgIElURU0gUkVMQVRFRCAgICAgLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgdGhpcy51cGRhdGVRdWFudCA9IChpdGVtLCBhZGRPclN1YikgPT4ge1xuICAgICAgaWYgKGFkZE9yU3ViID09PSBcImFkZFwiKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkrK1xuICAgICAgfSBlbHNlIGlmIChhZGRPclN1YiA9PT0gXCJzdWJcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5ID0gTWF0aC5tYXgoaXRlbS5xdWFudGl0eSAtIDEsIDApXG4gICAgICB9XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5hZGRJdGVtID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmZldGNoSXRlbXMgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygndHJ5aW5nIHRvIGdldCBhbGwgZGF0YScpXG4gICAgICB2YXIgZ2V0VXJsID0gYC9pdGVtcy8ke3RoaXMuc3RhdGUudXNlcmlkfWBcbiAgICAgIGNvbnNvbGUubG9nKGdldFVybClcbiAgICAgIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgICAgfSlcbiAgICAgIC8vIHNldCBzdGF0ZSB3aXRoIGl0XG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLm1ha2VEaXNwbGF5RGF0YSA9IChsaXN0aWQgPSB0aGlzLnN0YXRlLmxpc3RpZCwgZGVsZXRlZFN0YXR1cyA9IGZhbHNlKSA9PiB7XG4gICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBsaXN0aWQgJiYgZW50cnkuZGVsZXRlZCA9PT0gZGVsZXRlZFN0YXR1cylcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAvLyAvLyBub3QgYmVpbmcgdXNlZFxuICAgIC8vIHRoaXMuZmlsdGVyRGF0YSA9IChmaWx0ZXJPYmopID0+IHtcbiAgICAvLyAgICQuYWpheCh7XG4gICAgLy8gICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIC8vICAgICB1cmw6IFwiL2ZpbHRlclwiLFxuICAgIC8vICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgLy8gICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGZpbHRlck9iaiksXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAvLyAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgIC8vICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpXG4gICAgLy8gICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7XG4gICAgLy8gICAgICAgLy8gICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgLy8gICAgICAgLy8gfSlcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9KVxuICAgIC8vIH1cblxuICB9XG5cbiAgLy8gZmV0Y2hJdGVtcygpIHtcbiAgLy8gICBjb25zb2xlLmxvZygndHJ5aW5nIHRvIGdldCBhbGwgZGF0YScpXG4gIC8vICAgdmFyIGdldFVybCA9IGAvaXRlbXMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gXG4gIC8vICAgY29uc29sZS5sb2coZ2V0VXJsKVxuICAvLyAgIGZldGNoKGdldFVybClcbiAgLy8gICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgLy8gICAgIHJldHVybiByZXMuanNvbigpXG4gIC8vICAgfSlcbiAgLy8gICAvLyBzZXQgc3RhdGUgd2l0aCBpdFxuICAvLyAgIC50aGVuKChkYXRhKSA9PiB7XG4gIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAvLyAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIC8vIG1ha2VEaXNwbGF5RGF0YShsaXN0aWQgPSB0aGlzLnN0YXRlLmxpc3RpZCwgZGVsZXRlZFN0YXR1cyA9IGZhbHNlKSB7XG4gIC8vICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gbGlzdGlkICYmIGVudHJ5LmRlbGV0ZWQgPT09IGRlbGV0ZWRTdGF0dXMpXG4gIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgLy8gICB9KVxuICAvLyB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IG5hdkxpc3Q9e3RoaXMuc3RhdGUubmF2TGlzdH0gYWRkTGlzdD17dGhpcy5hZGRMaXN0fSB1cGRhdGVMaXN0aWQ9e3RoaXMudXBkYXRlTGlzdGlkfS8+XG4gICAgICAgIDxUb2RvRm9ybSBhZGRJdGVtPXt0aGlzLmFkZEl0ZW19IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9Lz5cbiAgICAgICAgPFRvZG9MaXN0IGxvY2s9e3RoaXMubG9ja30gdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IC8+XG4gICAgICAgIDxUb2RvQ29zdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cblxuXG59XG5cblxuIl19