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
      this.lock = new Auth0Lock('eaDzLmALxb7fvxQhVKTkxW8rEDtMnGZD', 'danch.auth0.com');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchLists();
      this.fetchItems();
      this.setState({
        idToken: this.getIdToken()
      });
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
    /////   ITEM CHANGES     ///////
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
    key: 'fetchItems',
    value: function fetchItems() {
      var _this2 = this;

      var getUrl = '/items/' + this.state.userid;
      fetch(getUrl).then(function (res) {
        return res.json();
      })
      // set state with it
      .then(function (data) {
        _this2.setState({
          masterList: data
        }, function () {
          this.makeDisplayData();
        });
      });
    }
  }, {
    key: 'makeDisplayData',
    value: function makeDisplayData() {
      var listid = arguments.length <= 0 || arguments[0] === undefined ? this.state.listid : arguments[0];
      var deletedStatus = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var displayList = this.state.masterList.filter(function (entry) {
        return entry.listid === listid && entry.deleted === deletedStatus;
      });
      this.setState({
        displayList: displayList
      });
    }
  }, {
    key: 'showLock',
    value: function showLock() {
      console.log("this", this);
      console.log("lock", this.lock);
      this.lock.show();
    }
  }, {
    key: 'getIdToken',
    value: function getIdToken() {
      // First, check if there is already a JWT in local storage
      var idToken = localStorage.getItem('id_token');
      console.log(this.lock);
      var authHash = this.lock.parseHash(window.location.hash);
      // If there is no JWT in local storage and there is one in the URL hash,
      // save it in local storage
      if (!idToken && authHash) {
        if (authHash.id_token) {
          idToken = authHash.id_token;
          localStorage.setItem('id_token', authHash.id_token);
        }
        if (authHash.error) {
          // Handle any error conditions
          console.log("Error signing in", authHash);
        }
      }
      return idToken;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { onClick: function onClick(e) {
              return _this3.showLock();
            } },
          'Sign In'
        ),
        React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, addList: this.addList, updateListid: this.updateListid }),
        React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid, userid: this.state.userid }),
        React.createElement(TodoList, { lock: this.lock, todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid }),
        React.createElement(TodoCost, { todoList: this.state.displayList })
      );
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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QUNFO0FBQUE7QUFBQSxZQUFHLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssUUFBTCxFQUFQO0FBQUEsYUFBWjtBQUFBO0FBQUEsU0FERjtBQUVFLDRCQUFDLE1BQUQsSUFBUSxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTNCLEVBQW1DLFNBQVMsS0FBSyxLQUFMLENBQVcsT0FBdkQsRUFBZ0UsU0FBUyxLQUFLLE9BQTlFLEVBQXVGLGNBQWMsS0FBSyxZQUExRyxHQUZGO0FBR0UsNEJBQUMsUUFBRCxJQUFVLFNBQVMsS0FBSyxPQUF4QixFQUFpQyxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQXBELEVBQTRELFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBL0UsR0FIRjtBQUlFLDRCQUFDLFFBQUQsSUFBVSxNQUFNLEtBQUssSUFBckIsRUFBMkIsVUFBVSxLQUFLLEtBQUwsQ0FBVyxXQUFoRCxFQUE2RCxZQUFZLEtBQUssVUFBOUUsRUFBMEYsYUFBYSxLQUFLLFdBQTVHLEVBQXlILFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBNUksR0FKRjtBQUtFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFdBQS9CO0FBTEYsT0FERjtBQVNEOzs7O0VBbE5lLE1BQU0sUyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMubG9jayA9IG5ldyBBdXRoMExvY2soJ2VhRHpMbUFMeGI3ZnZ4UWhWS1RreFc4ckVEdE1uR1pEJywgJ2RhbmNoLmF1dGgwLmNvbScpXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW10sXG4gICAgICBuYXZMaXN0OiBbXSxcbiAgICAgIGRpc3BsYXlMaXN0OiBbXSxcbiAgICAgIGxpc3RpZDogMSwgLy9kZWZhdWx0IC0gbmVlZCB0byBjaGFuZ2UgaXQgYmFzZWQgb24gd2hlbiB1c2VyIGxvZ3MgaW5cbiAgICAgIHVzZXJpZDogMiAvL3RlbXBvcmFyaWx5XG4gICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBMSVNUIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBcbiAgICB0aGlzLmZldGNoTGlzdHMgPSAoKSA9PiB7XG4gICAgICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgICB2YXIgZ2V0VXJsID0gYC9saXN0cy8ke3RoaXMuc3RhdGUudXNlcmlkfWBcbiAgICAgIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIHZpc3VhbGx5IHdoYXQgZG8geW91IHNlZSwgZG9lcyBub3QgY2hhbmdlIG1hc3Rlckxpc3Qgb3IgbmF2TGlzdFxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGlzdGlkOiBpZFxuICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgfVxuXG4gICAgLy8gcG9zdHMgYSBuZXcgbGlzdCBhbmQgZ2V0cyBhbGwgbGlzdHMgYWxsb3dzIC0gZm9sbG93IHJvdXRlIHRvIHNlZVxuICAgIHRoaXMuYWRkTGlzdCA9IChuZXdMaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdMaXN0KVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGFcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVMaXN0ID0gKGxpc3RpZCkgPT4ge1xuXG4gICAgfVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgSVRFTSBDSEFOR0VTICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB0aGlzLnVwZGF0ZVF1YW50ID0gKGl0ZW0sIGFkZE9yU3ViKSA9PiB7XG4gICAgICBpZiAoYWRkT3JTdWIgPT09IFwiYWRkXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSsrXG4gICAgICB9IGVsc2UgaWYgKGFkZE9yU3ViID09PSBcInN1YlwiKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkgPSBNYXRoLm1heChpdGVtLnF1YW50aXR5IC0gMSwgMClcbiAgICAgIH1cbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmFkZEl0ZW0gPSAobmV3SXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3SXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmRlbGV0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIC8vIG5vdCBiZWluZyB1c2VkXG4gICAgLy8gdGhpcy5maWx0ZXJEYXRhID0gKGZpbHRlck9iaikgPT4ge1xuICAgIC8vICAgJC5hamF4KHtcbiAgICAvLyAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgLy8gICAgIHVybDogXCIvZmlsdGVyXCIsXG4gICAgLy8gICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAvLyAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZmlsdGVyT2JqKSxcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vICAgICAgIGNhbGxiYWNrKGRhdGEpXG4gICAgLy8gICAgICAgLy8gY29uc29sZS5sb2codGhpcylcbiAgICAvLyAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICAvLyAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAvLyAgICAgICAvLyB9KVxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuXG4gIH1cblxuICBmZXRjaEl0ZW1zKCkge1xuICAgIHZhciBnZXRVcmwgPSBgL2l0ZW1zLyR7dGhpcy5zdGF0ZS51c2VyaWR9YFxuICAgIGZldGNoKGdldFVybClcbiAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgfSlcbiAgICAvLyBzZXQgc3RhdGUgd2l0aCBpdFxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgfSlcbiAgfVxuXG4gIG1ha2VEaXNwbGF5RGF0YShsaXN0aWQgPSB0aGlzLnN0YXRlLmxpc3RpZCwgZGVsZXRlZFN0YXR1cyA9IGZhbHNlKSB7XG4gICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gbGlzdGlkICYmIGVudHJ5LmRlbGV0ZWQgPT09IGRlbGV0ZWRTdGF0dXMpXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICB9KVxuICB9XG5cbiAgc2hvd0xvY2soKSB7XG4gICAgY29uc29sZS5sb2coXCJ0aGlzXCIsIHRoaXMpXG4gICAgY29uc29sZS5sb2coXCJsb2NrXCIsIHRoaXMubG9jaylcbiAgICB0aGlzLmxvY2suc2hvdygpXG4gIH1cblxuICBnZXRJZFRva2VuKCkge1xuICAgIC8vIEZpcnN0LCBjaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgSldUIGluIGxvY2FsIHN0b3JhZ2VcbiAgICB2YXIgaWRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMubG9jaylcbiAgICB2YXIgYXV0aEhhc2ggPSB0aGlzLmxvY2sucGFyc2VIYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBKV1QgaW4gbG9jYWwgc3RvcmFnZSBhbmQgdGhlcmUgaXMgb25lIGluIHRoZSBVUkwgaGFzaCxcbiAgICAvLyBzYXZlIGl0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBpZiAoIWlkVG9rZW4gJiYgYXV0aEhhc2gpIHtcbiAgICAgIGlmIChhdXRoSGFzaC5pZF90b2tlbikge1xuICAgICAgICBpZFRva2VuID0gYXV0aEhhc2guaWRfdG9rZW5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aEhhc2guaWRfdG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGF1dGhIYXNoLmVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgY29uZGl0aW9uc1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHNpZ25pbmcgaW5cIiwgYXV0aEhhc2gpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWRUb2tlbjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGEgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+U2lnbiBJbjwvYT5cbiAgICAgICAgPE5hdkJhciB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBuYXZMaXN0PXt0aGlzLnN0YXRlLm5hdkxpc3R9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnVwZGF0ZUxpc3RpZH0vPlxuICAgICAgICA8VG9kb0Zvcm0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfS8+XG4gICAgICAgIDxUb2RvTGlzdCBsb2NrPXt0aGlzLmxvY2t9IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnVwZGF0ZVF1YW50fSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSAvPlxuICAgICAgICA8VG9kb0Nvc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9Lz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG5cblxufVxuXG5cbiJdfQ==