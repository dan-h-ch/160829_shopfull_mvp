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
      var _this2 = this;

      // this.fetchLists();
      // this.fetchItems();
      this.setState({
        idToken: this.getIdToken()
      }, function () {
        // set more state stuff
        _this2.lock.getProfile(_this2.state.idToken, function (err, prof) {
          _this2.setState({
            userid: prof.user_id,
            profile: prof
          }, function () {
            _this2.fetchLists();
            _this2.fetchItems();
          });
          var userData = {};
          userData.id = prof.user_id;
          userData.email = prof.email;
          _this2.addUser(userData);
        });
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
      userid: '' //temporarily
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
        var displayListid = data.reduce(function (memo, val) {
          return Math.min(val.id, memo);
        }, Infinity);
        _this.setState({
          navList: data,
          listid: displayListid
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
        var activeList = data.reduce(function (memo, val) {
          return Math.max(val.id, memo);
        }, -Infinity);
        _this.setState({
          navList: data,
          listid: activeList
        }, function () {
          this.makeDisplayData();
        });
      });
    };

    _this.deleteList = function (list) {
      fetch('/lists', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
      }).then(function (data) {
        return data.json();
      }).then(function (data) {
        var activeList = data.reduce(function (memo, val) {
          return Math.max(val.id, memo);
        }, -Infinity);
        _this.setState({
          navList: data,
          listid: activeList
        }, function () {
          this.makeDisplayData();
        });
      });
    };

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

  // deleteItem(item) {
  //   fetch('/items', {
  //     method: 'DELETE',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(item)
  //   })
  //   .then((data) => data.json())
  //   .then((data) => {
  //     this.setState({
  //       masterList: data
  //     }, function() {this.makeDisplayData()})
  //   })
  // }

  _createClass(App, [{
    key: 'addUser',
    value: function addUser(userData) {
      fetch('/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then(function (body) {
        return body.json();
      }).then(function (res) {
        return console.log(res);
      }).catch(function (err) {
        return console.log("err0r", err);
      });
    }
  }, {
    key: 'fetchItems',
    value: function fetchItems() {
      var _this3 = this;

      var getUrl = '/items/' + this.state.userid;
      fetch(getUrl).then(function (res) {
        return res.json();
      })
      // set state with it
      .then(function (data) {
        _this3.setState({
          masterList: data
        }, function () {
          this.makeDisplayData();
        });
      });
    }

    // got all items and filter for deleted items

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
      this.lock.show();
    }
  }, {
    key: 'getIdToken',
    value: function getIdToken() {
      // First, check if there is already a JWT in local storage
      var idToken = localStorage.getItem('id_token');
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
      var _this4 = this;

      if (this.state.idToken) {
        return React.createElement(
          'div',
          null,
          React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, addList: this.addList, updateListid: this.updateListid }),
          React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid, userid: this.state.userid }),
          React.createElement(TodoList, { lock: this.lock, todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid }),
          React.createElement(TodoCost, { todoList: this.state.displayList, deleteList: this.deleteList, listid: this.state.listid, userid: this.state.userid })
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'a',
            { onClick: function onClick(e) {
                return _this4.showLock();
              } },
            'Sign In'
          )
        );
      }
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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QVUsS0FBSyxLQUFMLENBQVcsV0FBaEQsRUFBNkQsWUFBWSxLQUFLLFVBQTlFLEVBQTBGLGFBQWEsS0FBSyxXQUE1RyxFQUF5SCxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTVJLEdBSEY7QUFJRSw4QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxXQUEvQixFQUE0QyxZQUFZLEtBQUssVUFBN0QsRUFBeUUsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUE1RixFQUFvRyxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQXZIO0FBSkYsU0FERjtBQVFELE9BVEQsTUFTTztBQUNMLGVBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGNBQUcsU0FBUyxpQkFBQyxDQUFEO0FBQUEsdUJBQU8sT0FBSyxRQUFMLEVBQVA7QUFBQSxlQUFaO0FBQUE7QUFBQTtBQURGLFNBREY7QUFLRDtBQUNGOzs7O0VBaFNlLE1BQU0sUyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMubG9jayA9IG5ldyBBdXRoMExvY2soJ2VhRHpMbUFMeGI3ZnZ4UWhWS1RreFc4ckVEdE1uR1pEJywgJ2RhbmNoLmF1dGgwLmNvbScpXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAvLyB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgfSwgKCkgPT4ge1xuICAgICAgLy8gc2V0IG1vcmUgc3RhdGUgc3R1ZmZcbiAgICAgIHRoaXMubG9jay5nZXRQcm9maWxlKHRoaXMuc3RhdGUuaWRUb2tlbiwgKGVyciwgcHJvZikgID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcmlkOiBwcm9mLnVzZXJfaWQsXG4gICAgICAgICAgcHJvZmlsZTogcHJvZlxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgICAgIH0pXG4gICAgICAgIHZhciB1c2VyRGF0YSA9IHt9XG4gICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZi51c2VyX2lkXG4gICAgICAgIHVzZXJEYXRhLmVtYWlsID0gcHJvZi5lbWFpbFxuICAgICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtYXN0ZXJMaXN0OiBbXSxcbiAgICAgIG5hdkxpc3Q6IFtdLFxuICAgICAgZGlzcGxheUxpc3Q6IFtdLFxuICAgICAgbGlzdGlkOiAxLCAvL2RlZmF1bHQgLSBuZWVkIHRvIGNoYW5nZSBpdCBiYXNlZCBvbiB3aGVuIHVzZXIgbG9ncyBpblxuICAgICAgdXNlcmlkOiAnJyAvL3RlbXBvcmFyaWx5XG4gICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBMSVNUIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBcbiAgICB0aGlzLmZldGNoTGlzdHMgPSAoKSA9PiB7XG4gICAgICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgICB2YXIgZ2V0VXJsID0gYC9saXN0cy8ke3RoaXMuc3RhdGUudXNlcmlkfWBcbiAgICAgIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgZGlzcGxheUxpc3RpZCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5taW4odmFsLmlkLCBtZW1vKVxuICAgICAgICB9LCBJbmZpbml0eSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGRpc3BsYXlMaXN0aWRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gdmlzdWFsbHkgd2hhdCBkbyB5b3Ugc2VlLCBkb2VzIG5vdCBjaGFuZ2UgbWFzdGVyTGlzdCBvciBuYXZMaXN0XG4gICAgdGhpcy51cGRhdGVMaXN0aWQgPSAoaWQpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsaXN0aWQ6IGlkXG4gICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICB9XG5cbiAgICAvLyBwb3N0cyBhIG5ldyBsaXN0IGFuZCBnZXRzIGFsbCBsaXN0cyBhbGxvd3MgLSBmb2xsb3cgcm91dGUgdG8gc2VlXG4gICAgdGhpcy5hZGRMaXN0ID0gKG5ld0xpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbylcbiAgICAgICAgfSwgLUluZmluaXR5KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhLFxuICAgICAgICAgIGxpc3RpZDogYWN0aXZlTGlzdFxuICAgICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVMaXN0ID0gKGxpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobGlzdClcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgYWN0aXZlTGlzdCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgodmFsLmlkLCBtZW1vKVxuICAgICAgICB9LCAtSW5maW5pdHkpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgICAgfSlcbiAgICB9XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBJVEVNIENIQU5HRVMgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMudXBkYXRlUXVhbnQgPSAoaXRlbSwgYWRkT3JTdWIpID0+IHtcbiAgICAgIGlmIChhZGRPclN1YiA9PT0gXCJhZGRcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5KytcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09IFwic3ViXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IE1hdGgubWF4KGl0ZW0ucXVhbnRpdHkgLSAxLCAwKVxuICAgICAgfVxuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuYWRkSXRlbSA9IChuZXdJdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdJdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIC8vIC8vIG5vdCBiZWluZyB1c2VkXG4gICAgLy8gdGhpcy5maWx0ZXJEYXRhID0gKGZpbHRlck9iaikgPT4ge1xuICAgIC8vICAgJC5hamF4KHtcbiAgICAvLyAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgLy8gICAgIHVybDogXCIvZmlsdGVyXCIsXG4gICAgLy8gICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAvLyAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZmlsdGVyT2JqKSxcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vICAgICAgIGNhbGxiYWNrKGRhdGEpXG4gICAgLy8gICAgICAgLy8gY29uc29sZS5sb2codGhpcylcbiAgICAvLyAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICAvLyAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAvLyAgICAgICAvLyB9KVxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuXG4gIH1cblxuICAvLyBkZWxldGVJdGVtKGl0ZW0pIHtcbiAgLy8gICBmZXRjaCgnL2l0ZW1zJywge1xuICAvLyAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgLy8gICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgLy8gICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAvLyAgICAgfSxcbiAgLy8gICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gIC8vICAgfSlcbiAgLy8gICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gIC8vICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gIC8vICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgLy8gICB9KVxuICAvLyB9XG5cbiAgYWRkVXNlcih1c2VyRGF0YSkge1xuICAgIGZldGNoKGAvdXNlcnNgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKVxuICAgIH0pXG4gICAgLnRoZW4oKGJvZHkpID0+IGJvZHkuanNvbigpKVxuICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKHJlcykpXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiZXJyMHJcIiwgZXJyKSlcbiAgfVxuXG4gIGZldGNoSXRlbXMoKSB7XG4gICAgdmFyIGdldFVybCA9IGAvaXRlbXMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gXG4gICAgZmV0Y2goZ2V0VXJsKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICB9KVxuICAgIC8vIHNldCBzdGF0ZSB3aXRoIGl0XG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gZ290IGFsbCBpdGVtcyBhbmQgZmlsdGVyIGZvciBkZWxldGVkIGl0ZW1zXG4gIG1ha2VEaXNwbGF5RGF0YShsaXN0aWQgPSB0aGlzLnN0YXRlLmxpc3RpZCwgZGVsZXRlZFN0YXR1cyA9IGZhbHNlKSB7XG4gICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gbGlzdGlkICYmIGVudHJ5LmRlbGV0ZWQgPT09IGRlbGV0ZWRTdGF0dXMpXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICB9KVxuICB9XG5cbiAgc2hvd0xvY2soKSB7XG4gICAgdGhpcy5sb2NrLnNob3coKVxuICB9XG5cbiAgZ2V0SWRUb2tlbigpIHtcbiAgICAvLyBGaXJzdCwgY2hlY2sgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIEpXVCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgdmFyIGlkVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKTtcbiAgICB2YXIgYXV0aEhhc2ggPSB0aGlzLmxvY2sucGFyc2VIYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBKV1QgaW4gbG9jYWwgc3RvcmFnZSBhbmQgdGhlcmUgaXMgb25lIGluIHRoZSBVUkwgaGFzaCxcbiAgICAvLyBzYXZlIGl0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBpZiAoIWlkVG9rZW4gJiYgYXV0aEhhc2gpIHtcbiAgICAgIGlmIChhdXRoSGFzaC5pZF90b2tlbikge1xuICAgICAgICBpZFRva2VuID0gYXV0aEhhc2guaWRfdG9rZW5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aEhhc2guaWRfdG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGF1dGhIYXNoLmVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgY29uZGl0aW9uc1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHNpZ25pbmcgaW5cIiwgYXV0aEhhc2gpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWRUb2tlbjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5pZFRva2VuKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxOYXZCYXIgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gbmF2TGlzdD17dGhpcy5zdGF0ZS5uYXZMaXN0fSBhZGRMaXN0PXt0aGlzLmFkZExpc3R9IHVwZGF0ZUxpc3RpZD17dGhpcy51cGRhdGVMaXN0aWR9Lz5cbiAgICAgICAgICA8VG9kb0Zvcm0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfS8+XG4gICAgICAgICAgPFRvZG9MaXN0IGxvY2s9e3RoaXMubG9ja30gdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IC8+XG4gICAgICAgICAgPFRvZG9Db3N0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVMaXN0PXt0aGlzLmRlbGV0ZUxpc3R9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGEgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+U2lnbiBJbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICB9XG5cblxuXG59XG5cblxuIl19