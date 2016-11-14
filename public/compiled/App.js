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
        return console.log('err0r', err);
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
      var _this4 = this;

      // Open the lock in Email Code mode with the ability to handle the authentication in page
      this.lock.emailcode(function (err, profile, idToken, state) {
        if (!err) {
          // set JWT on localstorage
          localStorage.setItem('id_token', idToken);
          _this4.setState({
            userid: profile.user_id,
            profile: profile,
            // relies on local storage, triggers render()
            idToken: _this4.getIdToken()
          }, function () {
            _this4.fetchLists();
            _this4.fetchItems();
          });
          // add user to db
          var userData = {};
          userData.id = profile.user_id;
          userData.email = profile.email;
          _this4.addUser(userData);
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
      var _this5 = this;

      if (this.state.idToken &&
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
                  return _this5.logOut();
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
                return _this5.showLock();
              } },
            'Sign In'
          )
        );
      }
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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QUE7QUFBQTtBQURGO0FBUEYsU0FERjtBQWFELE9BbkJELE1BbUJPO0FBQ0wsZUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBRyxTQUFTLGlCQUFDLENBQUQ7QUFBQSx1QkFBTyxPQUFLLFFBQUwsRUFBUDtBQUFBLGVBQVo7QUFBQTtBQUFBO0FBREYsU0FERjtBQUtEO0FBQ0Y7Ozs7RUE5VmUsTUFBTSxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnd2hhdHdnLWZldGNoJztcbi8vIHZhciBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrUGFzc3dvcmRsZXNzKCdlYUR6TG1BTHhiN2Z2eFFoVktUa3hXOHJFRHRNbkdaRCcsICdkYW5jaC5hdXRoMC5jb20nKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICB9LCAoKSA9PiB7XG4gICAgICAvLyBzZXQgbW9yZSBzdGF0ZSBzdHVmZlxuICAgICAgdGhpcy5sb2NrLmdldFByb2ZpbGUodGhpcy5zdGF0ZS5pZFRva2VuLCAoZXJyLCBwcm9mKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJpZDogcHJvZi51c2VyX2lkLFxuICAgICAgICAgIHByb2ZpbGU6IHByb2ZcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHVzZXJEYXRhID0ge307XG4gICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZi51c2VyX2lkO1xuICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2YuZW1haWw7XG4gICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBkaXNwbGF5TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsIC8vZGVmYXVsdCAtIG5lZWQgdG8gY2hhbmdlIGl0IGJhc2VkIG9uIHdoZW4gdXNlciBsb2dzIGluXG4gICAgICB1c2VyaWQ6ICcnLCAvL3RlbXBvcmFyaWx5XG4gICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdub25lJyxcbiAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZSdcbiAgICB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBMSVNUIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBcbiAgICAvLyBjb250cm9scyBpZiBkaXNwbGF5IGZvciBhZGRpbmcgYSBuZXcgbGlzdCBpcyB2aXNpYmxlXG4gICAgdGhpcy5kaXNwbGF5TmV3TGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdibG9jaydcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmhpZGVOZXdMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNyZWF0ZURpc3BsYXllZDogJ25vbmUnXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwbGF5U2hhcmVMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNoYXJlRGlzcGxheWVkOiAnYmxvY2snXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlU2hhcmVMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmZldGNoTGlzdHMgPSAoKSA9PiB7XG4gICAgICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgICB2YXIgZ2V0VXJsID0gYC9saXN0cy8ke3RoaXMuc3RhdGUudXNlcmlkfWA7XG4gICAgICBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGRpc3BsYXlMaXN0aWQgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWluKHZhbC5pZCwgbWVtbyk7XG4gICAgICAgIH0sIEluZmluaXR5KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGRpc3BsYXlMaXN0aWRcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gdmlzdWFsbHkgd2hhdCBkbyB5b3Ugc2VlLCBkb2VzIG5vdCBjaGFuZ2UgbWFzdGVyTGlzdCBvciBuYXZMaXN0XG4gICAgdGhpcy51cGRhdGVMaXN0aWQgPSAoaWQpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsaXN0aWQ6IGlkXG4gICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgfTtcblxuICAgIC8vIHBvc3RzIGEgbmV3IGxpc3QgYW5kIGdldHMgYWxsIGxpc3RzIGFsbG93cyAtIGZvbGxvdyByb3V0ZSB0byBzZWVcbiAgICB0aGlzLmFkZExpc3QgPSAobmV3TGlzdCkgPT4ge1xuICAgICAgZmV0Y2goJy9saXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TGlzdClcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgYWN0aXZlTGlzdCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgodmFsLmlkLCBtZW1vKTtcbiAgICAgICAgfSwgLUluZmluaXR5KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGFjdGl2ZUxpc3RcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlTGlzdCA9IChsaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbyk7XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBJVEVNIENIQU5HRVMgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMudXBkYXRlUXVhbnQgPSAoaXRlbSwgYWRkT3JTdWIpID0+IHtcbiAgICAgIGlmIChhZGRPclN1YiA9PT0gJ2FkZCcpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSsrO1xuICAgICAgfSBlbHNlIGlmIChhZGRPclN1YiA9PT0gJ3N1YicpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IE1hdGgubWF4KGl0ZW0ucXVhbnRpdHkgLSAxLCAwKTtcbiAgICAgIH1cbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmFkZEl0ZW0gPSAobmV3SXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3SXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmRlbGV0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICB9XG5cbiAgLy8gZGVsZXRlSXRlbShpdGVtKSB7XG4gIC8vICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gIC8vICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIC8vICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgLy8gICAgIH0sXG4gIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAvLyAgIH0pXG4gIC8vICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAvLyAgIC50aGVuKChkYXRhKSA9PiB7XG4gIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAvLyAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIGFkZFVzZXIodXNlckRhdGEpIHtcbiAgICBmZXRjaCgnL3VzZXJzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSlcbiAgICB9KVxuICAgIC50aGVuKChib2R5KSA9PiBib2R5Lmpzb24oKSlcbiAgICAudGhlbigocmVzKSA9PiBjb25zb2xlLmxvZyhyZXMpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZygnZXJyMHInLCBlcnIpKTtcbiAgfVxuXG4gIGZldGNoSXRlbXMoKSB7XG4gICAgdmFyIGdldFVybCA9IGAvaXRlbXMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgIGZldGNoKGdldFVybClcbiAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgLy8gc2V0IHN0YXRlIHdpdGggaXRcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGdvdCBhbGwgaXRlbXMgYW5kIGZpbHRlciBmb3IgZGVsZXRlZCBpdGVtc1xuICBtYWtlRGlzcGxheURhdGEobGlzdGlkID0gdGhpcy5zdGF0ZS5saXN0aWQsIGRlbGV0ZWRTdGF0dXMgPSBmYWxzZSkge1xuICAgIHZhciBkaXNwbGF5TGlzdCA9IHRoaXMuc3RhdGUubWFzdGVyTGlzdC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5saXN0aWQgPT09IGxpc3RpZCAmJiBlbnRyeS5kZWxldGVkID09PSBkZWxldGVkU3RhdHVzKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRpc3BsYXlMaXN0OiBkaXNwbGF5TGlzdFxuICAgIH0pO1xuICB9XG5cbiAgc2hvd0xvY2soKSB7XG4gICAgLy8gT3BlbiB0aGUgbG9jayBpbiBFbWFpbCBDb2RlIG1vZGUgd2l0aCB0aGUgYWJpbGl0eSB0byBoYW5kbGUgdGhlIGF1dGhlbnRpY2F0aW9uIGluIHBhZ2VcbiAgICB0aGlzLmxvY2suZW1haWxjb2RlKChlcnIsIHByb2ZpbGUsIGlkVG9rZW4sIHN0YXRlKSA9PiB7XG4gICAgICBpZiAoIWVycikge1xuICAgICAgICAvLyBzZXQgSldUIG9uIGxvY2Fsc3RvcmFnZVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBpZFRva2VuKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcmlkOiBwcm9maWxlLnVzZXJfaWQsXG4gICAgICAgICAgcHJvZmlsZTogcHJvZmlsZSxcbiAgICAgICAgICAvLyByZWxpZXMgb24gbG9jYWwgc3RvcmFnZSwgdHJpZ2dlcnMgcmVuZGVyKClcbiAgICAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhZGQgdXNlciB0byBkYlxuICAgICAgICB2YXIgdXNlckRhdGEgPSB7fTtcbiAgICAgICAgdXNlckRhdGEuaWQgPSBwcm9maWxlLnVzZXJfaWQ7XG4gICAgICAgIHVzZXJEYXRhLmVtYWlsID0gcHJvZmlsZS5lbWFpbDtcbiAgICAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIC8vIHNtc1xuICAgIC8vIHRoaXMubG9jay5zbXMoKGVyciwgcHJvZmlsZSwgaWRUb2tlbiwgc3RhdGUpID0+IHtcbiAgICAvLyAgIGlmICghZXJyKSB7XG4gICAgLy8gICAgIC8vIHNldCBKV1Qgb24gbG9jYWxzdG9yYWdlXG4gICAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkVG9rZW4pO1xuICAgIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICB1c2VyaWQ6IHByb2ZpbGUudXNlcl9pZCxcbiAgICAvLyAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgIC8vICAgICAgIC8vIHJlbGllcyBvbiBsb2NhbCBzdG9yYWdlLCB0cmlnZ2VycyByZW5kZXIoKVxuICAgIC8vICAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgLy8gICAgIH0sICgpID0+IHtcbiAgICAvLyAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAvLyAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAvLyAgICAgdmFyIHVzZXJEYXRhID0ge31cbiAgICAvLyAgICAgdXNlckRhdGEuaWQgPSBwcm9maWxlLnVzZXJfaWRcbiAgICAvLyAgICAgdXNlckRhdGEuZW1haWwgPSBwcm9maWxlLmVtYWlsXG4gICAgLy8gICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSlcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfVxuXG4gIGdldElkVG9rZW4oKSB7XG4gICAgLy8gRmlyc3QsIGNoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBKV1QgaW4gbG9jYWwgc3RvcmFnZVxuICAgIHZhciBpZFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgdmFyIGF1dGhIYXNoID0gdGhpcy5sb2NrLnBhcnNlSGFzaCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gSldUIGluIGxvY2FsIHN0b3JhZ2UgYW5kIHRoZXJlIGlzIG9uZSBpbiB0aGUgVVJMIGhhc2gsXG4gICAgLy8gc2F2ZSBpdCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgaWYgKCFpZFRva2VuICYmIGF1dGhIYXNoKSB7XG4gICAgICBpZiAoYXV0aEhhc2guaWRfdG9rZW4pIHtcbiAgICAgICAgaWRUb2tlbiA9IGF1dGhIYXNoLmlkX3Rva2VuO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBhdXRoSGFzaC5pZF90b2tlbik7XG4gICAgICB9XG4gICAgICBpZiAoYXV0aEhhc2guZXJyb3IpIHtcbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciBjb25kaXRpb25zXG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBzaWduaW5nIGluJywgYXV0aEhhc2gpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWRUb2tlbjtcbiAgfVxuXG4gIGxvZ091dCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaWRfdG9rZW4nKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46ICcnXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUuaWRUb2tlbiAmJlxuICAgICAgLy8gaWRlYWxseSB5b3UgY2FuIGJyaW5nIGluIGEgbGlicmFyeSBmb3IgdGhpcyBpZiB5b3UgbmVlZCB0byBkbyBpdCBhIGxvdFxuICAgICAgLy8gZXhwaXJlIGRhdGUgb24gdG9rZW4gZXhpc3RzXG4gICAgICBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuc3RhdGUuaWRUb2tlbi5zcGxpdCgnLicpWzFdKSkuZXhwICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIC8vIGV4cGlyZSBkYXRlIG9uIHRva2VuIGlzIG1vcmUgdGhhbiBjdXJyZW50IHRpbWVcbiAgICAgIEpTT04ucGFyc2Uod2luZG93LmF0b2IodGhpcy5zdGF0ZS5pZFRva2VuLnNwbGl0KCcuJylbMV0pKS5leHAgPiBEYXRlLm5vdygpIC8gMTAwMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8TmV3TGlzdCB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBhZGRMaXN0PXt0aGlzLmFkZExpc3R9IGNyZWF0ZURpc3BsYXllZD17dGhpcy5zdGF0ZS5jcmVhdGVEaXNwbGF5ZWR9IGhpZGVOZXdMaXN0PXt0aGlzLmhpZGVOZXdMaXN0fS8+XG4gICAgICAgICAgPE5hdkJhciB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBuYXZMaXN0PXt0aGlzLnN0YXRlLm5hdkxpc3R9IHVwZGF0ZUxpc3RpZD17dGhpcy51cGRhdGVMaXN0aWR9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IGRpc3BsYXlOZXdMaXN0PXt0aGlzLmRpc3BsYXlOZXdMaXN0fS8+XG4gICAgICAgICAgPFRvZG9Gb3JtIGFkZEl0ZW09e3RoaXMuYWRkSXRlbX0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0vPlxuICAgICAgICAgIDxUb2RvTGlzdCBsb2NrPXt0aGlzLmxvY2t9IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnVwZGF0ZVF1YW50fSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSAvPlxuICAgICAgICAgIDxUb2RvQ29zdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gZGVsZXRlTGlzdD17dGhpcy5kZWxldGVMaXN0fSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBkaXNwbGF5U2hhcmVMaXN0PXt0aGlzLmRpc3BsYXlTaGFyZUxpc3R9Lz5cbiAgICAgICAgICA8U2hhcmVMaXN0IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gc2hhcmVEaXNwbGF5ZWQ9e3RoaXMuc3RhdGUuc2hhcmVEaXNwbGF5ZWR9IGhpZGVTaGFyZUxpc3Q9e3RoaXMuaGlkZVNoYXJlTGlzdH0vPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YSBvbkNsaWNrPXsoZSkgPT4gdGhpcy5sb2dPdXQoKX0+bG9nb3V0PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGEgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+U2lnbiBJbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG4iXX0=