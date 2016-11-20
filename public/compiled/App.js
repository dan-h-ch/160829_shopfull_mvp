'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import 'whatwg-fetch';
// var jwt = require('jsonwebtoken')

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.lock = new Auth0LockPasswordless('eaDzLmALxb7fvxQhVKTkxW8rEDtMnGZD', 'danch.auth0.com');

      // this.setState({
      //   username: ''
      // })
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

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
            _this2.fetchUsername();
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
      userid: '', //temporarily
      createDisplayed: 'none',
      shareDisplayed: 'none'
    };

    /////////////////////////////////
    /////   LIST RELATED     ///////
    ///////////////////////////////

    // controls if display for adding a new list is visible
    _this.displayNewList = function () {
      _this.setState({
        createDisplayed: 'block'
      });
    };

    _this.hideNewList = function () {
      _this.setState({
        createDisplayed: 'none'
      });
    };

    _this.displayShareList = function () {
      _this.setState({
        shareDisplayed: 'block'
      });
    };

    _this.hideShareList = function () {
      _this.setState({
        shareDisplayed: 'none'
      });
    };

    _this.fetchLists = function () {
      // userid is being passed on in URL, ultimately refactor our when auth token is in place
      var getUrl = '/lists/' + _this.state.userid;
      fetch(getUrl).then(function (res) {
        return res.json();
      }).then(function (data) {
        var displayListid = data.reduce(function (memo, val) {
          return Math.min(val.listid, memo);
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
        console.log(data);
        var activeList = data.reduce(function (memo, val) {
          return Math.max(val.listid, memo);
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
      if (addOrSub === 'add') {
        item.quantity++;
      } else if (addOrSub === 'sub') {
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

    /////////////////////////////////
    /////   USER RELATED     ///////
    ///////////////////////////////

    _this.fetchUsername = function () {
      // userid is being passed on in URL, ultimately refactor our when auth token is in place
      var getUrl = '/username/' + _this.state.userid;
      fetch(getUrl).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this.setState({
          username: data.username
        });
      });
    };

    _this.saveUsername = function (userData) {
      fetch('/users', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then(function (body) {
        return body.json();
      }).then(function (res) {
        _this.setState({
          username: res.username,
          error: res.error
        });
      }).catch(function (err) {
        return console.log('err0r', err);
      });
    };

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
      var _this3 = this;

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
        _this3.setState({
          username: res.username
        });
      }).catch(function (err) {
        return console.log('err0r', err);
      });
    }
  }, {
    key: 'fetchItems',
    value: function fetchItems() {
      var _this4 = this;

      var getUrl = '/items/' + this.state.userid;
      fetch(getUrl).then(function (res) {
        return res.json();
      })
      // set state with it
      .then(function (data) {
        _this4.setState({
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
      var _this5 = this;

      // Open the lock in Email Code mode with the ability to handle the authentication in page
      this.lock.emailcode(function (err, profile, idToken, state) {
        if (!err) {
          // set JWT on localstorage
          localStorage.setItem('id_token', idToken);
          _this5.setState({
            userid: profile.user_id,
            profile: profile,
            // relies on local storage, triggers render()
            idToken: _this5.getIdToken()
          }, function () {
            _this5.fetchLists();
            _this5.fetchItems();
          });
          // add user to db
          var userData = {};
          userData.id = profile.user_id;
          userData.email = profile.email;
          _this5.addUser(userData);
        }
      });

      // // sms
      // this.lock.sms((err, profile, idToken, state) => {
      //   if (!err) {
      //     // set JWT on localstorage
      //     localStorage.setItem('id_token', idToken);
      //     this.setState({
      //       userid: profile.user_id,
      //       profile: profile,
      //       // relies on local storage, triggers render()
      //       idToken: this.getIdToken()
      //     }, () => {
      //       this.fetchLists();
      //       this.fetchItems();
      //     })
      //     // add user to db
      //     var userData = {}
      //     userData.id = profile.user_id
      //     userData.email = profile.email
      //     this.addUser(userData)
      //   }
      // });
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
          console.log('Error signing in', authHash);
        }
      }
      return idToken;
    }
  }, {
    key: 'logOut',
    value: function logOut() {
      localStorage.removeItem('id_token');
      this.setState({
        idToken: ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      // if idtoken & username exist
      if (this.state.idToken && !this.state.username) {
        return React.createElement(
          'div',
          null,
          React.createElement(Username, { userid: this.state.userid, saveUsername: this.saveUsername, error: this.state.error })
        );
      } else if (this.state.idToken &&
      // ideally you can bring in a library for this if you need to do it a lot
      // expire date on token exists
      JSON.parse(window.atob(this.state.idToken.split('.')[1])).exp !== undefined &&
      // expire date on token is more than current time
      JSON.parse(window.atob(this.state.idToken.split('.')[1])).exp > Date.now() / 1000) {
        return React.createElement(
          'div',
          null,
          React.createElement(NewList, { userid: this.state.userid, addList: this.addList, createDisplayed: this.state.createDisplayed, hideNewList: this.hideNewList }),
          React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, updateListid: this.updateListid, listid: this.state.listid, displayNewList: this.displayNewList }),
          React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid, userid: this.state.userid }),
          React.createElement(TodoList, { lock: this.lock, todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid }),
          React.createElement(TodoCost, { todoList: this.state.displayList, deleteList: this.deleteList, listid: this.state.listid, userid: this.state.userid, displayShareList: this.displayShareList }),
          React.createElement(ShareList, { userid: this.state.userid, addList: this.addList, shareDisplayed: this.state.shareDisplayed, hideShareList: this.hideShareList }),
          React.createElement(
            'div',
            null,
            React.createElement(
              'a',
              { onClick: function onClick(e) {
                  return _this6.logOut();
                } },
              'logout'
            )
          )
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'a',
            { onClick: function onClick(e) {
                return _this6.showLock();
              } },
            'Sign In'
          )
        );
      }
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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QUFBQTtBQUNFO0FBQUE7QUFBQSxnQkFBRyxTQUFTLGlCQUFDLENBQUQ7QUFBQSx5QkFBTyxPQUFLLE1BQUwsRUFBUDtBQUFBLGlCQUFaO0FBQUE7QUFBQTtBQURGO0FBUEYsU0FERjtBQWFELE9BbkJNLE1BbUJBO0FBQ0wsZUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBRyxTQUFTLGlCQUFDLENBQUQ7QUFBQSx1QkFBTyxPQUFLLFFBQUwsRUFBUDtBQUFBLGVBQVo7QUFBQTtBQUFBO0FBREYsU0FERjtBQUtEO0FBQ0Y7Ozs7RUFsWmUsTUFBTSxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnd2hhdHdnLWZldGNoJztcbi8vIHZhciBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrUGFzc3dvcmRsZXNzKCdlYUR6TG1BTHhiN2Z2eFFoVktUa3hXOHJFRHRNbkdaRCcsICdkYW5jaC5hdXRoMC5jb20nKTtcblxuICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgdXNlcm5hbWU6ICcnXG4gICAgLy8gfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICB9LCAoKSA9PiB7XG4gICAgICAvLyBzZXQgbW9yZSBzdGF0ZSBzdHVmZlxuICAgICAgdGhpcy5sb2NrLmdldFByb2ZpbGUodGhpcy5zdGF0ZS5pZFRva2VuLCAoZXJyLCBwcm9mKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJpZDogcHJvZi51c2VyX2lkLFxuICAgICAgICAgIHByb2ZpbGU6IHByb2ZcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hVc2VybmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHVzZXJEYXRhID0ge307XG4gICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZi51c2VyX2lkO1xuICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2YuZW1haWw7XG4gICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBkaXNwbGF5TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsIC8vZGVmYXVsdCAtIG5lZWQgdG8gY2hhbmdlIGl0IGJhc2VkIG9uIHdoZW4gdXNlciBsb2dzIGluXG4gICAgICB1c2VyaWQ6ICcnLCAvL3RlbXBvcmFyaWx5XG4gICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdub25lJyxcbiAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZSdcbiAgICB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBMSVNUIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBcbiAgICAvLyBjb250cm9scyBpZiBkaXNwbGF5IGZvciBhZGRpbmcgYSBuZXcgbGlzdCBpcyB2aXNpYmxlXG4gICAgdGhpcy5kaXNwbGF5TmV3TGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdibG9jaydcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmhpZGVOZXdMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNyZWF0ZURpc3BsYXllZDogJ25vbmUnXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwbGF5U2hhcmVMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNoYXJlRGlzcGxheWVkOiAnYmxvY2snXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlU2hhcmVMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmZldGNoTGlzdHMgPSAoKSA9PiB7XG4gICAgICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgICB2YXIgZ2V0VXJsID0gYC9saXN0cy8ke3RoaXMuc3RhdGUudXNlcmlkfWA7XG4gICAgICBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGRpc3BsYXlMaXN0aWQgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWluKHZhbC5saXN0aWQsIG1lbW8pO1xuICAgICAgICB9LCBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBkaXNwbGF5TGlzdGlkXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIHZpc3VhbGx5IHdoYXQgZG8geW91IHNlZSwgZG9lcyBub3QgY2hhbmdlIG1hc3Rlckxpc3Qgb3IgbmF2TGlzdFxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGlzdGlkOiBpZFxuICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgIH07XG5cbiAgICAvLyBwb3N0cyBhIG5ldyBsaXN0IGFuZCBnZXRzIGFsbCBsaXN0cyBhbGxvd3MgLSBmb2xsb3cgcm91dGUgdG8gc2VlXG4gICAgdGhpcy5hZGRMaXN0ID0gKG5ld0xpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHZhciBhY3RpdmVMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwubGlzdGlkLCBtZW1vKTtcbiAgICAgICAgfSwgLUluZmluaXR5KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGFjdGl2ZUxpc3RcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlTGlzdCA9IChsaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbyk7XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBJVEVNIENIQU5HRVMgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMudXBkYXRlUXVhbnQgPSAoaXRlbSwgYWRkT3JTdWIpID0+IHtcbiAgICAgIGlmIChhZGRPclN1YiA9PT0gJ2FkZCcpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSsrO1xuICAgICAgfSBlbHNlIGlmIChhZGRPclN1YiA9PT0gJ3N1YicpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IE1hdGgubWF4KGl0ZW0ucXVhbnRpdHkgLSAxLCAwKTtcbiAgICAgIH1cbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmFkZEl0ZW0gPSAobmV3SXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3SXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmRlbGV0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLyAgIFVTRVIgUkVMQVRFRCAgICAgLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgdGhpcy5mZXRjaFVzZXJuYW1lID0gKCkgPT4ge1xuICAgICAgLy8gdXNlcmlkIGlzIGJlaW5nIHBhc3NlZCBvbiBpbiBVUkwsIHVsdGltYXRlbHkgcmVmYWN0b3Igb3VyIHdoZW4gYXV0aCB0b2tlbiBpcyBpbiBwbGFjZVxuICAgICAgdmFyIGdldFVybCA9IGAvdXNlcm5hbWUvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgICAgZmV0Y2goZ2V0VXJsKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJuYW1lOiBkYXRhLnVzZXJuYW1lXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2F2ZVVzZXJuYW1lID0gKHVzZXJEYXRhKSA9PiB7XG4gICAgICBmZXRjaCgnL3VzZXJzJywge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChib2R5KSA9PiBib2R5Lmpzb24oKSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcm5hbWU6IHJlcy51c2VybmFtZSxcbiAgICAgICAgICBlcnJvcjogcmVzLmVycm9yXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZygnZXJyMHInLCBlcnIpKTtcbiAgICB9O1xuXG4gIH1cblxuICAvLyBkZWxldGVJdGVtKGl0ZW0pIHtcbiAgLy8gICBmZXRjaCgnL2l0ZW1zJywge1xuICAvLyAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgLy8gICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgLy8gICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAvLyAgICAgfSxcbiAgLy8gICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gIC8vICAgfSlcbiAgLy8gICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gIC8vICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gIC8vICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgLy8gICB9KVxuICAvLyB9XG5cbiAgYWRkVXNlcih1c2VyRGF0YSkge1xuICAgIGZldGNoKCcvdXNlcnMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKVxuICAgIH0pXG4gICAgLnRoZW4oKGJvZHkpID0+IGJvZHkuanNvbigpKVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB1c2VybmFtZTogcmVzLnVzZXJuYW1lXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZygnZXJyMHInLCBlcnIpKTtcbiAgfVxuXG4gIGZldGNoSXRlbXMoKSB7XG4gICAgdmFyIGdldFVybCA9IGAvaXRlbXMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgIGZldGNoKGdldFVybClcbiAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgLy8gc2V0IHN0YXRlIHdpdGggaXRcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGdvdCBhbGwgaXRlbXMgYW5kIGZpbHRlciBmb3IgZGVsZXRlZCBpdGVtc1xuICBtYWtlRGlzcGxheURhdGEobGlzdGlkID0gdGhpcy5zdGF0ZS5saXN0aWQsIGRlbGV0ZWRTdGF0dXMgPSBmYWxzZSkge1xuICAgIHZhciBkaXNwbGF5TGlzdCA9IHRoaXMuc3RhdGUubWFzdGVyTGlzdC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5saXN0aWQgPT09IGxpc3RpZCAmJiBlbnRyeS5kZWxldGVkID09PSBkZWxldGVkU3RhdHVzKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRpc3BsYXlMaXN0OiBkaXNwbGF5TGlzdFxuICAgIH0pO1xuICB9XG5cbiAgc2hvd0xvY2soKSB7XG4gICAgLy8gT3BlbiB0aGUgbG9jayBpbiBFbWFpbCBDb2RlIG1vZGUgd2l0aCB0aGUgYWJpbGl0eSB0byBoYW5kbGUgdGhlIGF1dGhlbnRpY2F0aW9uIGluIHBhZ2VcbiAgICB0aGlzLmxvY2suZW1haWxjb2RlKChlcnIsIHByb2ZpbGUsIGlkVG9rZW4sIHN0YXRlKSA9PiB7XG4gICAgICBpZiAoIWVycikge1xuICAgICAgICAvLyBzZXQgSldUIG9uIGxvY2Fsc3RvcmFnZVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBpZFRva2VuKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcmlkOiBwcm9maWxlLnVzZXJfaWQsXG4gICAgICAgICAgcHJvZmlsZTogcHJvZmlsZSxcbiAgICAgICAgICAvLyByZWxpZXMgb24gbG9jYWwgc3RvcmFnZSwgdHJpZ2dlcnMgcmVuZGVyKClcbiAgICAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhZGQgdXNlciB0byBkYlxuICAgICAgICB2YXIgdXNlckRhdGEgPSB7fTtcbiAgICAgICAgdXNlckRhdGEuaWQgPSBwcm9maWxlLnVzZXJfaWQ7XG4gICAgICAgIHVzZXJEYXRhLmVtYWlsID0gcHJvZmlsZS5lbWFpbDtcbiAgICAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIC8vIHNtc1xuICAgIC8vIHRoaXMubG9jay5zbXMoKGVyciwgcHJvZmlsZSwgaWRUb2tlbiwgc3RhdGUpID0+IHtcbiAgICAvLyAgIGlmICghZXJyKSB7XG4gICAgLy8gICAgIC8vIHNldCBKV1Qgb24gbG9jYWxzdG9yYWdlXG4gICAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkVG9rZW4pO1xuICAgIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICB1c2VyaWQ6IHByb2ZpbGUudXNlcl9pZCxcbiAgICAvLyAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgIC8vICAgICAgIC8vIHJlbGllcyBvbiBsb2NhbCBzdG9yYWdlLCB0cmlnZ2VycyByZW5kZXIoKVxuICAgIC8vICAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgLy8gICAgIH0sICgpID0+IHtcbiAgICAvLyAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAvLyAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAvLyAgICAgdmFyIHVzZXJEYXRhID0ge31cbiAgICAvLyAgICAgdXNlckRhdGEuaWQgPSBwcm9maWxlLnVzZXJfaWRcbiAgICAvLyAgICAgdXNlckRhdGEuZW1haWwgPSBwcm9maWxlLmVtYWlsXG4gICAgLy8gICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSlcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfVxuXG4gIGdldElkVG9rZW4oKSB7XG4gICAgLy8gRmlyc3QsIGNoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBKV1QgaW4gbG9jYWwgc3RvcmFnZVxuICAgIHZhciBpZFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgdmFyIGF1dGhIYXNoID0gdGhpcy5sb2NrLnBhcnNlSGFzaCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gSldUIGluIGxvY2FsIHN0b3JhZ2UgYW5kIHRoZXJlIGlzIG9uZSBpbiB0aGUgVVJMIGhhc2gsXG4gICAgLy8gc2F2ZSBpdCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgaWYgKCFpZFRva2VuICYmIGF1dGhIYXNoKSB7XG4gICAgICBpZiAoYXV0aEhhc2guaWRfdG9rZW4pIHtcbiAgICAgICAgaWRUb2tlbiA9IGF1dGhIYXNoLmlkX3Rva2VuO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBhdXRoSGFzaC5pZF90b2tlbik7XG4gICAgICB9XG4gICAgICBpZiAoYXV0aEhhc2guZXJyb3IpIHtcbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciBjb25kaXRpb25zXG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBzaWduaW5nIGluJywgYXV0aEhhc2gpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWRUb2tlbjtcbiAgfVxuXG4gIGxvZ091dCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaWRfdG9rZW4nKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46ICcnXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gaWYgaWR0b2tlbiAmIHVzZXJuYW1lIGV4aXN0XG4gICAgaWYgKHRoaXMuc3RhdGUuaWRUb2tlbiAmJiAhdGhpcy5zdGF0ZS51c2VybmFtZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8VXNlcm5hbWUgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gc2F2ZVVzZXJuYW1lPXt0aGlzLnNhdmVVc2VybmFtZX0gZXJyb3I9e3RoaXMuc3RhdGUuZXJyb3J9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5pZFRva2VuICYmXG4gICAgICAvLyBpZGVhbGx5IHlvdSBjYW4gYnJpbmcgaW4gYSBsaWJyYXJ5IGZvciB0aGlzIGlmIHlvdSBuZWVkIHRvIGRvIGl0IGEgbG90XG4gICAgICAvLyBleHBpcmUgZGF0ZSBvbiB0b2tlbiBleGlzdHNcbiAgICAgIEpTT04ucGFyc2Uod2luZG93LmF0b2IodGhpcy5zdGF0ZS5pZFRva2VuLnNwbGl0KCcuJylbMV0pKS5leHAgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgLy8gZXhwaXJlIGRhdGUgb24gdG9rZW4gaXMgbW9yZSB0aGFuIGN1cnJlbnQgdGltZVxuICAgICAgSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0aGlzLnN0YXRlLmlkVG9rZW4uc3BsaXQoJy4nKVsxXSkpLmV4cCA+IERhdGUubm93KCkgLyAxMDAwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxOZXdMaXN0IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gY3JlYXRlRGlzcGxheWVkPXt0aGlzLnN0YXRlLmNyZWF0ZURpc3BsYXllZH0gaGlkZU5ld0xpc3Q9e3RoaXMuaGlkZU5ld0xpc3R9Lz5cbiAgICAgICAgICA8TmF2QmFyIHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IG5hdkxpc3Q9e3RoaXMuc3RhdGUubmF2TGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnVwZGF0ZUxpc3RpZH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gZGlzcGxheU5ld0xpc3Q9e3RoaXMuZGlzcGxheU5ld0xpc3R9Lz5cbiAgICAgICAgICA8VG9kb0Zvcm0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfS8+XG4gICAgICAgICAgPFRvZG9MaXN0IGxvY2s9e3RoaXMubG9ja30gdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IC8+XG4gICAgICAgICAgPFRvZG9Db3N0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVMaXN0PXt0aGlzLmRlbGV0ZUxpc3R9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGRpc3BsYXlTaGFyZUxpc3Q9e3RoaXMuZGlzcGxheVNoYXJlTGlzdH0vPlxuICAgICAgICAgIDxTaGFyZUxpc3QgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gYWRkTGlzdD17dGhpcy5hZGRMaXN0fSBzaGFyZURpc3BsYXllZD17dGhpcy5zdGF0ZS5zaGFyZURpc3BsYXllZH0gaGlkZVNoYXJlTGlzdD17dGhpcy5oaWRlU2hhcmVMaXN0fS8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxhIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmxvZ091dCgpfT5sb2dvdXQ8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YSBvbkNsaWNrPXsoZSkgPT4gdGhpcy5zaG93TG9jaygpfT5TaWduIEluPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cblxufVxuXG5cbiJdfQ==