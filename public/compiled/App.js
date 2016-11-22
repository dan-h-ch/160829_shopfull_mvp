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
          React.createElement(TodoList, { lock: this.lock, todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid }),
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
//# sourceMappingURL=data:application/json;base64,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QVUsU0FBUyxLQUFLLE9BQXhCLEVBQWlDLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBcEQsRUFBNEQsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUEvRSxHQUpGO0FBS0UsOEJBQUMsUUFBRCxJQUFVLE1BQU0sS0FBSyxJQUFyQixFQUEyQixVQUFVLEtBQUssS0FBTCxDQUFXLFdBQWhELEVBQTZELFlBQVksS0FBSyxVQUE5RSxFQUEwRixhQUFhLEtBQUssV0FBNUcsRUFBeUgsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUE1SSxHQUxGO0FBTUUsOEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsV0FBL0IsRUFBNEMsWUFBWSxLQUFLLFVBQTdELEVBQXlFLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBNUYsRUFBb0csUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUF2SCxFQUErSCxrQkFBa0IsS0FBSyxnQkFBdEosR0FORjtBQU9FLDhCQUFDLFNBQUQsSUFBVyxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTlCLEVBQXNDLFdBQVcsS0FBSyxTQUF0RCxFQUFpRSxnQkFBZ0IsS0FBSyxLQUFMLENBQVcsY0FBNUYsRUFBNEcsZUFBZSxLQUFLLGFBQWhJLEVBQStJLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBbEs7QUFQRixTQURGO0FBV0QsT0FqQk0sTUFpQkE7QUFDTCxlQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFHLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHVCQUFPLE9BQUssUUFBTCxFQUFQO0FBQUEsZUFBWjtBQUFBO0FBQUE7QUFERixTQURGO0FBS0Q7QUFDRjs7OztFQWhhZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9ja1Bhc3N3b3JkbGVzcygnZWFEekxtQUx4YjdmdnhRaFZLVGt4VzhyRUR0TW5HWkQnLCAnZGFuY2guYXV0aDAuY29tJyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5sb2NrLmdldFByb2ZpbGUodGhpcy5zdGF0ZS5pZFRva2VuLCAoZXJyLCBwcm9mKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJpZDogcHJvZi51c2VyX2lkLFxuICAgICAgICAgIHByb2ZpbGU6IHByb2ZcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hVc2VybmFtZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHVzZXJEYXRhID0ge307XG4gICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZi51c2VyX2lkO1xuICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2YuZW1haWw7XG4gICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBkaXNwbGF5TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsIC8vZGVmYXVsdCAtIG5lZWQgdG8gY2hhbmdlIGl0IGJhc2VkIG9uIHdoZW4gdXNlciBsb2dzIGluXG4gICAgICB1c2VyaWQ6ICcnLCAvL3RlbXBvcmFyaWx5XG4gICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdub25lJyxcbiAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZScsXG4gICAgICB1c2VybmFtZTogJydcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgTElTVCBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgXG4gICAgLy8gY29udHJvbHMgaWYgZGlzcGxheSBmb3IgYWRkaW5nIGEgbmV3IGxpc3QgaXMgdmlzaWJsZVxuICAgIHRoaXMuZGlzcGxheU5ld0xpc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3JlYXRlRGlzcGxheWVkOiAnYmxvY2snXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlTmV3TGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdub25lJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcGxheVNoYXJlTGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaGFyZURpc3BsYXllZDogJ2Jsb2NrJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZVNoYXJlTGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaGFyZURpc3BsYXllZDogJ25vbmUnXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5mZXRjaExpc3RzID0gKCkgPT4ge1xuICAgICAgLy8gdXNlcmlkIGlzIGJlaW5nIHBhc3NlZCBvbiBpbiBVUkwsIHVsdGltYXRlbHkgcmVmYWN0b3Igb3VyIHdoZW4gYXV0aCB0b2tlbiBpcyBpbiBwbGFjZVxuICAgICAgdmFyIGdldFVybCA9IGAvbGlzdHMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgICAgZmV0Y2goZ2V0VXJsKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBkaXNwbGF5TGlzdGlkID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1pbih2YWwubGlzdGlkLCBtZW1vKTtcbiAgICAgICAgfSwgSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhLFxuICAgICAgICAgIGxpc3RpZDogZGlzcGxheUxpc3RpZFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyB2aXN1YWxseSB3aGF0IGRvIHlvdSBzZWUsIGRvZXMgbm90IGNoYW5nZSBtYXN0ZXJMaXN0IG9yIG5hdkxpc3RcbiAgICB0aGlzLnVwZGF0ZUxpc3RpZCA9IChpZCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxpc3RpZDogaWRcbiAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICB9O1xuXG4gICAgLy8gcG9zdHMgYSBuZXcgbGlzdCBhbmQgZ2V0cyBhbGwgbGlzdHMgYWxsb3dzIC0gZm9sbG93IHJvdXRlIHRvIHNlZVxuICAgIHRoaXMuYWRkTGlzdCA9IChuZXdMaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdMaXN0KVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB2YXIgYWN0aXZlTGlzdCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgodmFsLmxpc3RpZCwgbWVtbyk7XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmRlbGV0ZUxpc3QgPSAobGlzdCkgPT4ge1xuICAgICAgZmV0Y2goJy9saXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShsaXN0KVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBhY3RpdmVMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwuaWQsIG1lbW8pO1xuICAgICAgICB9LCAtSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhLFxuICAgICAgICAgIGxpc3RpZDogYWN0aXZlTGlzdFxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5zaGFyZUxpc3QgPSAoc2hhcmVEYXRhT2JqKSA9PiB7XG4gICAgICBmZXRjaCgnL3VzZXJsaXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2hhcmVEYXRhT2JqKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLyAgIElURU0gQ0hBTkdFUyAgICAgLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgdGhpcy51cGRhdGVRdWFudCA9IChpdGVtLCBhZGRPclN1YikgPT4ge1xuICAgICAgaWYgKGFkZE9yU3ViID09PSAnYWRkJykge1xuICAgICAgICBpdGVtLnF1YW50aXR5Kys7XG4gICAgICB9IGVsc2UgaWYgKGFkZE9yU3ViID09PSAnc3ViJykge1xuICAgICAgICBpdGVtLnF1YW50aXR5ID0gTWF0aC5tYXgoaXRlbS5xdWFudGl0eSAtIDEsIDApO1xuICAgICAgfVxuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuYWRkSXRlbSA9IChuZXdJdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdJdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgVVNFUiBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB0aGlzLmZldGNoVXNlcm5hbWUgPSAoKSA9PiB7XG4gICAgICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgICB2YXIgZ2V0VXJsID0gYC91c2VybmFtZS8ke3RoaXMuc3RhdGUudXNlcmlkfWA7XG4gICAgICBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcm5hbWU6IGRhdGEudXNlcm5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5zYXZlVXNlcm5hbWUgPSAodXNlckRhdGEpID0+IHtcbiAgICAgIGZldGNoKCcvdXNlcnMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGJvZHkpID0+IGJvZHkuanNvbigpKVxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VybmFtZTogcmVzLnVzZXJuYW1lLFxuICAgICAgICAgIGVycm9yOiByZXMuZXJyb3JcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKCdlcnIwcicsIGVycikpO1xuICAgIH07XG5cbiAgICB0aGlzLmxvZ091dCA9ICgpID0+IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpZF90b2tlbicpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlkVG9rZW46ICcnLFxuICAgICAgICB1c2VyaWQ6ICcnLFxuICAgICAgICB1c2VybmFtZTogJydcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgfVxuXG4gIC8vIGRlbGV0ZUl0ZW0oaXRlbSkge1xuICAvLyAgIGZldGNoKCcvaXRlbXMnLCB7XG4gIC8vICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAvLyAgICAgaGVhZGVyczoge1xuICAvLyAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAvLyAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gIC8vICAgICB9LFxuICAvLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgLy8gICB9KVxuICAvLyAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgLy8gICAudGhlbigoZGF0YSkgPT4ge1xuICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgLy8gICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAvLyAgIH0pXG4gIC8vIH1cblxuICBhZGRVc2VyKHVzZXJEYXRhKSB7XG4gICAgZmV0Y2goJy91c2VycycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpXG4gICAgfSlcbiAgICAudGhlbigoYm9keSkgPT4gYm9keS5qc29uKCkpXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHVzZXJuYW1lOiByZXMudXNlcm5hbWVcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKCdlcnIwcicsIGVycikpO1xuICB9XG5cbiAgZmV0Y2hJdGVtcygpIHtcbiAgICB2YXIgZ2V0VXJsID0gYC9pdGVtcy8ke3RoaXMuc3RhdGUudXNlcmlkfWA7XG4gICAgZmV0Y2goZ2V0VXJsKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSlcbiAgICAvLyBzZXQgc3RhdGUgd2l0aCBpdFxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gZ290IGFsbCBpdGVtcyBhbmQgZmlsdGVyIGZvciBkZWxldGVkIGl0ZW1zXG4gIG1ha2VEaXNwbGF5RGF0YShsaXN0aWQgPSB0aGlzLnN0YXRlLmxpc3RpZCwgZGVsZXRlZFN0YXR1cyA9IGZhbHNlKSB7XG4gICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gbGlzdGlkICYmIGVudHJ5LmRlbGV0ZWQgPT09IGRlbGV0ZWRTdGF0dXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGlzcGxheUxpc3Q6IGRpc3BsYXlMaXN0XG4gICAgfSk7XG4gIH1cblxuICBzaG93TG9jaygpIHtcbiAgICAvLyBPcGVuIHRoZSBsb2NrIGluIEVtYWlsIENvZGUgbW9kZSB3aXRoIHRoZSBhYmlsaXR5IHRvIGhhbmRsZSB0aGUgYXV0aGVudGljYXRpb24gaW4gcGFnZVxuICAgIHRoaXMubG9jay5lbWFpbGNvZGUoKGVyciwgcHJvZmlsZSwgaWRUb2tlbiwgc3RhdGUpID0+IHtcbiAgICAgIGlmICghZXJyKSB7XG4gICAgICAgIC8vIHNldCBKV1Qgb24gbG9jYWxzdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkVG9rZW4pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VyaWQ6IHByb2ZpbGUudXNlcl9pZCxcbiAgICAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgICAgICAgIC8vIHJlbGllcyBvbiBsb2NhbCBzdG9yYWdlLCB0cmlnZ2VycyByZW5kZXIoKVxuICAgICAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgICB0aGlzLmZldGNoVXNlcm5hbWUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGFkZCB1c2VyIHRvIGRiXG4gICAgICAgIHZhciB1c2VyRGF0YSA9IHt9O1xuICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2ZpbGUudXNlcl9pZDtcbiAgICAgICAgdXNlckRhdGEuZW1haWwgPSBwcm9maWxlLmVtYWlsO1xuICAgICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gLy8gc21zXG4gICAgLy8gdGhpcy5sb2NrLnNtcygoZXJyLCBwcm9maWxlLCBpZFRva2VuLCBzdGF0ZSkgPT4ge1xuICAgIC8vICAgaWYgKCFlcnIpIHtcbiAgICAvLyAgICAgLy8gc2V0IEpXVCBvbiBsb2NhbHN0b3JhZ2VcbiAgICAvLyAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbik7XG4gICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgIHVzZXJpZDogcHJvZmlsZS51c2VyX2lkLFxuICAgIC8vICAgICAgIHByb2ZpbGU6IHByb2ZpbGUsXG4gICAgLy8gICAgICAgLy8gcmVsaWVzIG9uIGxvY2FsIHN0b3JhZ2UsIHRyaWdnZXJzIHJlbmRlcigpXG4gICAgLy8gICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICAvLyAgICAgfSwgKCkgPT4ge1xuICAgIC8vICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgIC8vICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgIC8vICAgICB9KVxuICAgIC8vICAgICAvLyBhZGQgdXNlciB0byBkYlxuICAgIC8vICAgICB2YXIgdXNlckRhdGEgPSB7fVxuICAgIC8vICAgICB1c2VyRGF0YS5pZCA9IHByb2ZpbGUudXNlcl9pZFxuICAgIC8vICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2ZpbGUuZW1haWxcbiAgICAvLyAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKVxuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9XG5cbiAgZ2V0SWRUb2tlbigpIHtcbiAgICAvLyBGaXJzdCwgY2hlY2sgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIEpXVCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgdmFyIGlkVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKTtcbiAgICB2YXIgYXV0aEhhc2ggPSB0aGlzLmxvY2sucGFyc2VIYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBKV1QgaW4gbG9jYWwgc3RvcmFnZSBhbmQgdGhlcmUgaXMgb25lIGluIHRoZSBVUkwgaGFzaCxcbiAgICAvLyBzYXZlIGl0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBpZiAoIWlkVG9rZW4gJiYgYXV0aEhhc2gpIHtcbiAgICAgIGlmIChhdXRoSGFzaC5pZF90b2tlbikge1xuICAgICAgICBpZFRva2VuID0gYXV0aEhhc2guaWRfdG9rZW47XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGF1dGhIYXNoLmlkX3Rva2VuKTtcbiAgICAgIH1cbiAgICAgIGlmIChhdXRoSGFzaC5lcnJvcikge1xuICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIGNvbmRpdGlvbnNcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHNpZ25pbmcgaW4nLCBhdXRoSGFzaCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpZFRva2VuO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgLy8gaWYgaWR0b2tlbiAmIHVzZXJuYW1lIGV4aXN0XG4gICAgaWYgKHRoaXMuc3RhdGUuaWRUb2tlbiAmJiAhdGhpcy5zdGF0ZS51c2VybmFtZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2PmlkVG9rZW4ge3RoaXMuc3RhdGUuaWRUb2tlbn08L2Rpdj5cbiAgICAgICAgICA8ZGl2PnVzZXJuYW1lIHt0aGlzLnN0YXRlLnVzZXJuYW1lfTwvZGl2PlxuICAgICAgICAgIDxVc2VybmFtZSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBzYXZlVXNlcm5hbWU9e3RoaXMuc2F2ZVVzZXJuYW1lfSBlcnJvcj17dGhpcy5zdGF0ZS5lcnJvcn0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmlkVG9rZW4gJiZcbiAgICAgIC8vIGlkZWFsbHkgeW91IGNhbiBicmluZyBpbiBhIGxpYnJhcnkgZm9yIHRoaXMgaWYgeW91IG5lZWQgdG8gZG8gaXQgYSBsb3RcbiAgICAgIC8vIGV4cGlyZSBkYXRlIG9uIHRva2VuIGV4aXN0c1xuICAgICAgSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0aGlzLnN0YXRlLmlkVG9rZW4uc3BsaXQoJy4nKVsxXSkpLmV4cCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAvLyBleHBpcmUgZGF0ZSBvbiB0b2tlbiBpcyBtb3JlIHRoYW4gY3VycmVudCB0aW1lXG4gICAgICBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuc3RhdGUuaWRUb2tlbi5zcGxpdCgnLicpWzFdKSkuZXhwID4gRGF0ZS5ub3coKSAvIDEwMDApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPEhlYWRlciB1c2VybmFtZT17dGhpcy5zdGF0ZS51c2VybmFtZX0gbG9nT3V0PXt0aGlzLmxvZ091dH0vPlxuICAgICAgICAgIDxOZXdMaXN0IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gY3JlYXRlRGlzcGxheWVkPXt0aGlzLnN0YXRlLmNyZWF0ZURpc3BsYXllZH0gaGlkZU5ld0xpc3Q9e3RoaXMuaGlkZU5ld0xpc3R9Lz5cbiAgICAgICAgICA8TmF2QmFyIHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IG5hdkxpc3Q9e3RoaXMuc3RhdGUubmF2TGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnVwZGF0ZUxpc3RpZH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gZGlzcGxheU5ld0xpc3Q9e3RoaXMuZGlzcGxheU5ld0xpc3R9Lz5cbiAgICAgICAgICA8VG9kb0Zvcm0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfS8+XG4gICAgICAgICAgPFRvZG9MaXN0IGxvY2s9e3RoaXMubG9ja30gdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IC8+XG4gICAgICAgICAgPFRvZG9Db3N0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVMaXN0PXt0aGlzLmRlbGV0ZUxpc3R9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGRpc3BsYXlTaGFyZUxpc3Q9e3RoaXMuZGlzcGxheVNoYXJlTGlzdH0vPlxuICAgICAgICAgIDxTaGFyZUxpc3QgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gc2hhcmVMaXN0PXt0aGlzLnNoYXJlTGlzdH0gc2hhcmVEaXNwbGF5ZWQ9e3RoaXMuc3RhdGUuc2hhcmVEaXNwbGF5ZWR9IGhpZGVTaGFyZUxpc3Q9e3RoaXMuaGlkZVNoYXJlTGlzdH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGEgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+U2lnbiBJbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG4iXX0=