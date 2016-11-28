'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      shareDisplayed: 'none',
      username: ''
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
        var displayList = data.reduce(function (memo, val) {
          return val.listid < memo.listid ? val : memo;
        });
        _this.setState({
          navList: data,
          listid: displayList.listid,
          listname: displayList.listname
        });
      });
    };

    // visually what do you see, does not change masterList or navList
    _this.updateListid = function (id, listname) {
      _this.setState({
        listid: id,
        listname: listname
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

    _this.shareList = function (shareDataObj) {
      fetch('/userlists', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shareDataObj)
      }).then(function (data) {
        return data.json();
      }).then(function (data) {
        console.log(data);
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

    _this.logOut = function () {
      localStorage.removeItem('id_token');
      _this.setState({
        idToken: '',
        userid: '',
        username: ''
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
            _this5.fetchUsername();
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
    key: 'render',
    value: function render() {
      var _this6 = this;

      // if idtoken & username exist
      if (this.state.idToken && !this.state.username) {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            null,
            'idToken ',
            this.state.idToken
          ),
          React.createElement(
            'div',
            null,
            'username ',
            this.state.username
          ),
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
          React.createElement(Header, { username: this.state.username, logOut: this.logOut }),
          React.createElement(NewList, { userid: this.state.userid, addList: this.addList, createDisplayed: this.state.createDisplayed, hideNewList: this.hideNewList }),
          React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, updateListid: this.updateListid, listid: this.state.listid, displayNewList: this.displayNewList }),
          React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid, userid: this.state.userid }),
          React.createElement(TodoList, { todoList: this.state.displayList, listname: this.state.listname, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid }),
          React.createElement(TodoCost, { todoList: this.state.displayList, deleteList: this.deleteList, listid: this.state.listid, userid: this.state.userid, displayShareList: this.displayShareList }),
          React.createElement(ShareList, { userid: this.state.userid, shareList: this.shareList, shareDisplayed: this.state.shareDisplayed, hideShareList: this.hideShareList, listid: this.state.listid })
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
//# sourceMappingURL=data:application/json;base64,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RUFBNEgsZ0JBQWdCLEtBQUssY0FBakosR0FIRjtBQUlFLDhCQUFDLFFBQUQsSUFBVSxTQUFTLEtBQUssT0FBeEIsRUFBaUMsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUFwRCxFQUE0RCxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQS9FLEdBSkY7QUFLRSw4QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxXQUEvQixFQUE0QyxVQUFVLEtBQUssS0FBTCxDQUFXLFFBQWpFLEVBQTJFLFlBQVksS0FBSyxVQUE1RixFQUF3RyxhQUFhLEtBQUssV0FBMUgsRUFBdUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUExSixHQUxGO0FBTUUsOEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsV0FBL0IsRUFBNEMsWUFBWSxLQUFLLFVBQTdELEVBQXlFLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBNUYsRUFBb0csUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUF2SCxFQUErSCxrQkFBa0IsS0FBSyxnQkFBdEosR0FORjtBQU9FLDhCQUFDLFNBQUQsSUFBVyxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTlCLEVBQXNDLFdBQVcsS0FBSyxTQUF0RCxFQUFpRSxnQkFBZ0IsS0FBSyxLQUFMLENBQVcsY0FBNUYsRUFBNEcsZUFBZSxLQUFLLGFBQWhJLEVBQStJLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBbEs7QUFQRixTQURGO0FBV0QsT0FqQk0sTUFpQkE7QUFDTCxlQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFHLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHVCQUFPLE9BQUssUUFBTCxFQUFQO0FBQUEsZUFBWjtBQUFBO0FBQUE7QUFERixTQURGO0FBS0Q7QUFDRjs7OztFQWxhZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9ja1Bhc3N3b3JkbGVzcygnZWFEekxtQUx4YjdmdnhRaFZLVGt4VzhyRUR0TW5HWkQnLCAnZGFuY2guYXV0aDAuY29tJyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5sb2NrLmdldFByb2ZpbGUodGhpcy5zdGF0ZS5pZFRva2VuLCAoZXJyLCBwcm9mKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJpZDogcHJvZi51c2VyX2lkLFxuICAgICAgICAgIHByb2ZpbGU6IHByb2ZcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hVc2VybmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHVzZXJEYXRhID0ge307XG4gICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZi51c2VyX2lkO1xuICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2YuZW1haWw7XG4gICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBkaXNwbGF5TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsIC8vZGVmYXVsdCAtIG5lZWQgdG8gY2hhbmdlIGl0IGJhc2VkIG9uIHdoZW4gdXNlciBsb2dzIGluXG4gICAgICB1c2VyaWQ6ICcnLCAvL3RlbXBvcmFyaWx5XG4gICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdub25lJyxcbiAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZScsXG4gICAgICB1c2VybmFtZTogJydcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgTElTVCBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgXG4gICAgLy8gY29udHJvbHMgaWYgZGlzcGxheSBmb3IgYWRkaW5nIGEgbmV3IGxpc3QgaXMgdmlzaWJsZVxuICAgIHRoaXMuZGlzcGxheU5ld0xpc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3JlYXRlRGlzcGxheWVkOiAnYmxvY2snXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlTmV3TGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdub25lJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcGxheVNoYXJlTGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaGFyZURpc3BsYXllZDogJ2Jsb2NrJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZVNoYXJlTGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaGFyZURpc3BsYXllZDogJ25vbmUnXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5mZXRjaExpc3RzID0gKCkgPT4ge1xuICAgICAgLy8gdXNlcmlkIGlzIGJlaW5nIHBhc3NlZCBvbiBpbiBVUkwsIHVsdGltYXRlbHkgcmVmYWN0b3Igb3VyIHdoZW4gYXV0aCB0b2tlbiBpcyBpbiBwbGFjZVxuICAgICAgdmFyIGdldFVybCA9IGAvbGlzdHMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgICAgZmV0Y2goZ2V0VXJsKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBkaXNwbGF5TGlzdCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gdmFsLmxpc3RpZCA8IG1lbW8ubGlzdGlkID8gdmFsIDogbWVtbztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBkaXNwbGF5TGlzdC5saXN0aWQsXG4gICAgICAgICAgbGlzdG5hbWU6IGRpc3BsYXlMaXN0Lmxpc3RuYW1lXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIHZpc3VhbGx5IHdoYXQgZG8geW91IHNlZSwgZG9lcyBub3QgY2hhbmdlIG1hc3Rlckxpc3Qgb3IgbmF2TGlzdFxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkLCBsaXN0bmFtZSkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxpc3RpZDogaWQsXG4gICAgICAgIGxpc3RuYW1lOiBsaXN0bmFtZVxuICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgIH07XG5cbiAgICAvLyBwb3N0cyBhIG5ldyBsaXN0IGFuZCBnZXRzIGFsbCBsaXN0cyBhbGxvd3MgLSBmb2xsb3cgcm91dGUgdG8gc2VlXG4gICAgdGhpcy5hZGRMaXN0ID0gKG5ld0xpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHZhciBhY3RpdmVMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwubGlzdGlkLCBtZW1vKTtcbiAgICAgICAgfSwgLUluZmluaXR5KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGFjdGl2ZUxpc3RcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlTGlzdCA9IChsaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbyk7XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnNoYXJlTGlzdCA9IChzaGFyZURhdGFPYmopID0+IHtcbiAgICAgIGZldGNoKCcvdXNlcmxpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzaGFyZURhdGFPYmopXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgSVRFTSBDSEFOR0VTICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB0aGlzLnVwZGF0ZVF1YW50ID0gKGl0ZW0sIGFkZE9yU3ViKSA9PiB7XG4gICAgICBpZiAoYWRkT3JTdWIgPT09ICdhZGQnKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkrKztcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09ICdzdWInKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkgPSBNYXRoLm1heChpdGVtLnF1YW50aXR5IC0gMSwgMCk7XG4gICAgICB9XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hZGRJdGVtID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxldGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBVU0VSIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMuZmV0Y2hVc2VybmFtZSA9ICgpID0+IHtcbiAgICAgIC8vIHVzZXJpZCBpcyBiZWluZyBwYXNzZWQgb24gaW4gVVJMLCB1bHRpbWF0ZWx5IHJlZmFjdG9yIG91ciB3aGVuIGF1dGggdG9rZW4gaXMgaW4gcGxhY2VcbiAgICAgIHZhciBnZXRVcmwgPSBgL3VzZXJuYW1lLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICAgIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VybmFtZTogZGF0YS51c2VybmFtZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnNhdmVVc2VybmFtZSA9ICh1c2VyRGF0YSkgPT4ge1xuICAgICAgZmV0Y2goJy91c2VycycsIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoYm9keSkgPT4gYm9keS5qc29uKCkpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJuYW1lOiByZXMudXNlcm5hbWUsXG4gICAgICAgICAgZXJyb3I6IHJlcy5lcnJvclxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coJ2VycjByJywgZXJyKSk7XG4gICAgfTtcblxuICAgIHRoaXMubG9nT3V0ID0gKCkgPT4ge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaWRUb2tlbjogJycsXG4gICAgICAgIHVzZXJpZDogJycsXG4gICAgICAgIHVzZXJuYW1lOiAnJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICB9XG5cbiAgLy8gZGVsZXRlSXRlbShpdGVtKSB7XG4gIC8vICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gIC8vICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIC8vICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgLy8gICAgIH0sXG4gIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAvLyAgIH0pXG4gIC8vICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAvLyAgIC50aGVuKChkYXRhKSA9PiB7XG4gIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAvLyAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIGFkZFVzZXIodXNlckRhdGEpIHtcbiAgICBmZXRjaCgnL3VzZXJzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSlcbiAgICB9KVxuICAgIC50aGVuKChib2R5KSA9PiBib2R5Lmpzb24oKSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdXNlcm5hbWU6IHJlcy51c2VybmFtZVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coJ2VycjByJywgZXJyKSk7XG4gIH1cblxuICBmZXRjaEl0ZW1zKCkge1xuICAgIHZhciBnZXRVcmwgPSBgL2l0ZW1zLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICBmZXRjaChnZXRVcmwpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuICAgIC8vIHNldCBzdGF0ZSB3aXRoIGl0XG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBnb3QgYWxsIGl0ZW1zIGFuZCBmaWx0ZXIgZm9yIGRlbGV0ZWQgaXRlbXNcbiAgbWFrZURpc3BsYXlEYXRhKGxpc3RpZCA9IHRoaXMuc3RhdGUubGlzdGlkLCBkZWxldGVkU3RhdHVzID0gZmFsc2UpIHtcbiAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBsaXN0aWQgJiYgZW50cnkuZGVsZXRlZCA9PT0gZGVsZXRlZFN0YXR1cyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dMb2NrKCkge1xuICAgIC8vIE9wZW4gdGhlIGxvY2sgaW4gRW1haWwgQ29kZSBtb2RlIHdpdGggdGhlIGFiaWxpdHkgdG8gaGFuZGxlIHRoZSBhdXRoZW50aWNhdGlvbiBpbiBwYWdlXG4gICAgdGhpcy5sb2NrLmVtYWlsY29kZSgoZXJyLCBwcm9maWxlLCBpZFRva2VuLCBzdGF0ZSkgPT4ge1xuICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgLy8gc2V0IEpXVCBvbiBsb2NhbHN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbik7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJpZDogcHJvZmlsZS51c2VyX2lkLFxuICAgICAgICAgIHByb2ZpbGU6IHByb2ZpbGUsXG4gICAgICAgICAgLy8gcmVsaWVzIG9uIGxvY2FsIHN0b3JhZ2UsIHRyaWdnZXJzIHJlbmRlcigpXG4gICAgICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hVc2VybmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAgICAgdmFyIHVzZXJEYXRhID0ge307XG4gICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZmlsZS51c2VyX2lkO1xuICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2ZpbGUuZW1haWw7XG4gICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAvLyBzbXNcbiAgICAvLyB0aGlzLmxvY2suc21zKChlcnIsIHByb2ZpbGUsIGlkVG9rZW4sIHN0YXRlKSA9PiB7XG4gICAgLy8gICBpZiAoIWVycikge1xuICAgIC8vICAgICAvLyBzZXQgSldUIG9uIGxvY2Fsc3RvcmFnZVxuICAgIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBpZFRva2VuKTtcbiAgICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgLy8gICAgICAgdXNlcmlkOiBwcm9maWxlLnVzZXJfaWQsXG4gICAgLy8gICAgICAgcHJvZmlsZTogcHJvZmlsZSxcbiAgICAvLyAgICAgICAvLyByZWxpZXMgb24gbG9jYWwgc3RvcmFnZSwgdHJpZ2dlcnMgcmVuZGVyKClcbiAgICAvLyAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgIC8vICAgICB9LCAoKSA9PiB7XG4gICAgLy8gICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgLy8gICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIC8vIGFkZCB1c2VyIHRvIGRiXG4gICAgLy8gICAgIHZhciB1c2VyRGF0YSA9IHt9XG4gICAgLy8gICAgIHVzZXJEYXRhLmlkID0gcHJvZmlsZS51c2VyX2lkXG4gICAgLy8gICAgIHVzZXJEYXRhLmVtYWlsID0gcHJvZmlsZS5lbWFpbFxuICAgIC8vICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpXG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gIH1cblxuICBnZXRJZFRva2VuKCkge1xuICAgIC8vIEZpcnN0LCBjaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgSldUIGluIGxvY2FsIHN0b3JhZ2VcbiAgICB2YXIgaWRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpO1xuICAgIHZhciBhdXRoSGFzaCA9IHRoaXMubG9jay5wYXJzZUhhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgIC8vIElmIHRoZXJlIGlzIG5vIEpXVCBpbiBsb2NhbCBzdG9yYWdlIGFuZCB0aGVyZSBpcyBvbmUgaW4gdGhlIFVSTCBoYXNoLFxuICAgIC8vIHNhdmUgaXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGlmICghaWRUb2tlbiAmJiBhdXRoSGFzaCkge1xuICAgICAgaWYgKGF1dGhIYXNoLmlkX3Rva2VuKSB7XG4gICAgICAgIGlkVG9rZW4gPSBhdXRoSGFzaC5pZF90b2tlbjtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aEhhc2guaWRfdG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGF1dGhIYXNoLmVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgY29uZGl0aW9uc1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc2lnbmluZyBpbicsIGF1dGhIYXNoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkVG9rZW47XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBpZiBpZHRva2VuICYgdXNlcm5hbWUgZXhpc3RcbiAgICBpZiAodGhpcy5zdGF0ZS5pZFRva2VuICYmICF0aGlzLnN0YXRlLnVzZXJuYW1lKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+aWRUb2tlbiB7dGhpcy5zdGF0ZS5pZFRva2VufTwvZGl2PlxuICAgICAgICAgIDxkaXY+dXNlcm5hbWUge3RoaXMuc3RhdGUudXNlcm5hbWV9PC9kaXY+XG4gICAgICAgICAgPFVzZXJuYW1lIHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IHNhdmVVc2VybmFtZT17dGhpcy5zYXZlVXNlcm5hbWV9IGVycm9yPXt0aGlzLnN0YXRlLmVycm9yfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuaWRUb2tlbiAmJlxuICAgICAgLy8gaWRlYWxseSB5b3UgY2FuIGJyaW5nIGluIGEgbGlicmFyeSBmb3IgdGhpcyBpZiB5b3UgbmVlZCB0byBkbyBpdCBhIGxvdFxuICAgICAgLy8gZXhwaXJlIGRhdGUgb24gdG9rZW4gZXhpc3RzXG4gICAgICBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuc3RhdGUuaWRUb2tlbi5zcGxpdCgnLicpWzFdKSkuZXhwICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIC8vIGV4cGlyZSBkYXRlIG9uIHRva2VuIGlzIG1vcmUgdGhhbiBjdXJyZW50IHRpbWVcbiAgICAgIEpTT04ucGFyc2Uod2luZG93LmF0b2IodGhpcy5zdGF0ZS5pZFRva2VuLnNwbGl0KCcuJylbMV0pKS5leHAgPiBEYXRlLm5vdygpIC8gMTAwMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8SGVhZGVyIHVzZXJuYW1lPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSBsb2dPdXQ9e3RoaXMubG9nT3V0fS8+XG4gICAgICAgICAgPE5ld0xpc3QgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gYWRkTGlzdD17dGhpcy5hZGRMaXN0fSBjcmVhdGVEaXNwbGF5ZWQ9e3RoaXMuc3RhdGUuY3JlYXRlRGlzcGxheWVkfSBoaWRlTmV3TGlzdD17dGhpcy5oaWRlTmV3TGlzdH0vPlxuICAgICAgICAgIDxOYXZCYXIgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gbmF2TGlzdD17dGhpcy5zdGF0ZS5uYXZMaXN0fSB1cGRhdGVMaXN0aWQ9e3RoaXMudXBkYXRlTGlzdGlkfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSBkaXNwbGF5TmV3TGlzdD17dGhpcy5kaXNwbGF5TmV3TGlzdH0vPlxuICAgICAgICAgIDxUb2RvRm9ybSBhZGRJdGVtPXt0aGlzLmFkZEl0ZW19IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9Lz5cbiAgICAgICAgICA8VG9kb0xpc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGxpc3RuYW1lPXt0aGlzLnN0YXRlLmxpc3RuYW1lfSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnVwZGF0ZVF1YW50fSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSAvPlxuICAgICAgICAgIDxUb2RvQ29zdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gZGVsZXRlTGlzdD17dGhpcy5kZWxldGVMaXN0fSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBkaXNwbGF5U2hhcmVMaXN0PXt0aGlzLmRpc3BsYXlTaGFyZUxpc3R9Lz5cbiAgICAgICAgICA8U2hhcmVMaXN0IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IHNoYXJlTGlzdD17dGhpcy5zaGFyZUxpc3R9IHNoYXJlRGlzcGxheWVkPXt0aGlzLnN0YXRlLnNoYXJlRGlzcGxheWVkfSBoaWRlU2hhcmVMaXN0PXt0aGlzLmhpZGVTaGFyZUxpc3R9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxhIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnNob3dMb2NrKCl9PlNpZ24gSW48L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuXG59XG5cblxuIl19