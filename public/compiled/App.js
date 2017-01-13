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
            profile: prof,
            email: prof.email
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
      username: '',
      login: 'default'
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

      if (this.state.login === 'phone') {
        // sms
        this.lock.sms(function (err, profile, idToken, state) {
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
      } else {
        // Open the lock in Email Code mode with the ability to handle the authentication in page
        this.lock.emailcode(function (err, profile, idToken, state) {
          if (!err) {
            // set JWT on localstorage
            localStorage.setItem('id_token', idToken);
            _this5.setState({
              userid: profile.user_id,
              // // profile is return from auth0 - has some data available
              // profile: profile,
              email: profile.email,
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
      }
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
            'Fetching your data...'
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
          React.createElement(Header, { username: this.state.username, email: this.state.email, logOut: this.logOut }),
          React.createElement(NewList, { userid: this.state.userid, addList: this.addList, createDisplayed: this.state.createDisplayed, hideNewList: this.hideNewList }),
          React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, updateListid: this.updateListid, listid: this.state.listid, displayNewList: this.displayNewList }),
          React.createElement(TodoList, { todoList: this.state.displayList, listname: this.state.listname, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid, listid: this.state.listid, addItem: this.addItem }),
          React.createElement(Bottom, { todoList: this.state.displayList, deleteList: this.deleteList, listid: this.state.listid, userid: this.state.userid, displayShareList: this.displayShareList }),
          React.createElement(ShareList, { userid: this.state.userid, shareList: this.shareList, shareDisplayed: this.state.shareDisplayed, hideShareList: this.hideShareList, listid: this.state.listid })
        );
      } else {
        return React.createElement(
          'div',
          { className: 'login-box' },
          React.createElement(
            'div',
            { className: 'login-box-header' },
            'Login to Listify'
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { id: this.state.login === 'default' || this.state.login === 'phone' ? 'selectedLogin' : 'notSelectedLogin', className: 'login-select', onClick: function onClick(e) {
                  return _this6.setState({ login: 'phone' });
                } },
              'Phone Number'
            ),
            React.createElement(
              'div',
              { id: this.state.login === 'email' ? 'selectedLogin' : 'notSelectedLogin', className: 'login-select', onClick: function onClick(e) {
                  return _this6.setState({ login: 'email' });
                } },
              'Email Address'
            )
          ),
          React.createElement(
            'div',
            { className: 'login-click', onClick: function onClick(e) {
                return _this6.showLock();
              } },
            'Login'
          )
        );
      }
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsImxvY2siLCJBdXRoMExvY2tQYXNzd29yZGxlc3MiLCJzZXRTdGF0ZSIsImlkVG9rZW4iLCJnZXRJZFRva2VuIiwiZ2V0UHJvZmlsZSIsInN0YXRlIiwiZXJyIiwicHJvZiIsInVzZXJpZCIsInVzZXJfaWQiLCJwcm9maWxlIiwiZW1haWwiLCJmZXRjaExpc3RzIiwiZmV0Y2hJdGVtcyIsImZldGNoVXNlcm5hbWUiLCJ1c2VyRGF0YSIsImlkIiwiYWRkVXNlciIsInByb3BzIiwibWFzdGVyTGlzdCIsIm5hdkxpc3QiLCJkaXNwbGF5TGlzdCIsImxpc3RpZCIsImNyZWF0ZURpc3BsYXllZCIsInNoYXJlRGlzcGxheWVkIiwidXNlcm5hbWUiLCJsb2dpbiIsImRpc3BsYXlOZXdMaXN0IiwiaGlkZU5ld0xpc3QiLCJkaXNwbGF5U2hhcmVMaXN0IiwiaGlkZVNoYXJlTGlzdCIsImdldFVybCIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwicmVkdWNlIiwibWVtbyIsInZhbCIsImxpc3RuYW1lIiwidXBkYXRlTGlzdGlkIiwibWFrZURpc3BsYXlEYXRhIiwiYWRkTGlzdCIsIm5ld0xpc3QiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb25zb2xlIiwibG9nIiwiYWN0aXZlTGlzdCIsIk1hdGgiLCJtYXgiLCJJbmZpbml0eSIsImRlbGV0ZUxpc3QiLCJsaXN0Iiwic2hhcmVMaXN0Iiwic2hhcmVEYXRhT2JqIiwidXBkYXRlUXVhbnQiLCJpdGVtIiwiYWRkT3JTdWIiLCJxdWFudGl0eSIsImFkZEl0ZW0iLCJuZXdJdGVtIiwiZGVsZXRlSXRlbSIsInNhdmVVc2VybmFtZSIsImVycm9yIiwiY2F0Y2giLCJsb2dPdXQiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwiZGVsZXRlZFN0YXR1cyIsImZpbHRlciIsImVudHJ5IiwiZGVsZXRlZCIsInNtcyIsInNldEl0ZW0iLCJlbWFpbGNvZGUiLCJnZXRJdGVtIiwiYXV0aEhhc2giLCJwYXJzZUhhc2giLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2giLCJpZF90b2tlbiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwiZXhwIiwidW5kZWZpbmVkIiwiRGF0ZSIsIm5vdyIsImUiLCJzaG93TG9jayIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7Ozs7O3lDQUVpQjtBQUNuQixXQUFLQyxJQUFMLEdBQVksSUFBSUMscUJBQUosQ0FBMEIsa0NBQTFCLEVBQThELGlCQUE5RCxDQUFaO0FBQ0Q7Ozt3Q0FFbUI7QUFBQTs7QUFDbEIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLGlCQUFTLEtBQUtDLFVBQUw7QUFERyxPQUFkLEVBRUcsWUFBTTtBQUNQLGVBQUtKLElBQUwsQ0FBVUssVUFBVixDQUFxQixPQUFLQyxLQUFMLENBQVdILE9BQWhDLEVBQXlDLFVBQUNJLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQ3RELGlCQUFLTixRQUFMLENBQWM7QUFDWk8sb0JBQVFELEtBQUtFLE9BREQ7QUFFWkMscUJBQVNILElBRkc7QUFHWkksbUJBQU9KLEtBQUtJO0FBSEEsV0FBZCxFQUlHLFlBQU07QUFDUCxtQkFBS0MsVUFBTDtBQUNBLG1CQUFLQyxVQUFMO0FBQ0EsbUJBQUtDLGFBQUw7QUFDRCxXQVJEO0FBU0EsY0FBSUMsV0FBVyxFQUFmO0FBQ0FBLG1CQUFTQyxFQUFULEdBQWNULEtBQUtFLE9BQW5CO0FBQ0FNLG1CQUFTSixLQUFULEdBQWlCSixLQUFLSSxLQUF0QjtBQUNBLGlCQUFLTSxPQUFMLENBQWFGLFFBQWI7QUFDRCxTQWREO0FBZUQsT0FsQkQ7QUFtQkQ7OztBQUVELGVBQVlHLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWEEsS0FEVzs7QUFHakIsVUFBS2IsS0FBTCxHQUFhO0FBQ1hjLGtCQUFZLEVBREQ7QUFFWEMsZUFBUyxFQUZFO0FBR1hDLG1CQUFhLEVB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K0ksUUFBUSxLQUFLekIsS0FBTCxDQUFXaUIsTUFBbEs7QUFORixTQURGO0FBVUQsT0FoQk0sTUFnQkE7QUFDTCxlQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsV0FBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsa0JBQWY7QUFBQTtBQUFBLFdBREY7QUFFRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsZ0JBQUssSUFBSSxLQUFLakIsS0FBTCxDQUFXcUIsS0FBWCxLQUFxQixTQUFyQixJQUFrQyxLQUFLckIsS0FBTCxDQUFXcUIsS0FBWCxLQUFxQixPQUF2RCxHQUFpRSxlQUFqRSxHQUFtRixrQkFBNUYsRUFBZ0gsV0FBVSxjQUExSCxFQUF5SSxTQUFTLGlCQUFDb0UsQ0FBRDtBQUFBLHlCQUFPLE9BQUs3RixRQUFMLENBQWMsRUFBQ3lCLE9BQU8sT0FBUixFQUFkLENBQVA7QUFBQSxpQkFBbEo7QUFBQTtBQUFBLGFBREY7QUFJRTtBQUFBO0FBQUEsZ0JBQUssSUFBSSxLQUFLckIsS0FBTCxDQUFXcUIsS0FBWCxLQUFxQixPQUFyQixHQUErQixlQUEvQixHQUFpRCxrQkFBMUQsRUFBOEUsV0FBVSxjQUF4RixFQUF1RyxTQUFTLGlCQUFDb0UsQ0FBRDtBQUFBLHlCQUFPLE9BQUs3RixRQUFMLENBQWMsRUFBQ3lCLE9BQU8sT0FBUixFQUFkLENBQVA7QUFBQSxpQkFBaEg7QUFBQTtBQUFBO0FBSkYsV0FGRjtBQVVFO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZixFQUE2QixTQUFTLGlCQUFDb0UsQ0FBRDtBQUFBLHVCQUFPLE9BQUtDLFFBQUwsRUFBUDtBQUFBLGVBQXRDO0FBQUE7QUFBQTtBQVZGLFNBREY7QUFnQkQ7QUFDRjs7OztFQW5iZUMsTUFBTUMsUyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrUGFzc3dvcmRsZXNzKCdlYUR6TG1BTHhiN2Z2eFFoVktUa3hXOHJFRHRNbkdaRCcsICdkYW5jaC5hdXRoMC5jb20nKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLmxvY2suZ2V0UHJvZmlsZSh0aGlzLnN0YXRlLmlkVG9rZW4sIChlcnIsIHByb2YpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcmlkOiBwcm9mLnVzZXJfaWQsXG4gICAgICAgICAgcHJvZmlsZTogcHJvZixcbiAgICAgICAgICBlbWFpbDogcHJvZi5lbWFpbFxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgICAgICAgdGhpcy5mZXRjaFVzZXJuYW1lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdXNlckRhdGEgPSB7fTtcbiAgICAgICAgdXNlckRhdGEuaWQgPSBwcm9mLnVzZXJfaWQ7XG4gICAgICAgIHVzZXJEYXRhLmVtYWlsID0gcHJvZi5lbWFpbDtcbiAgICAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW10sXG4gICAgICBuYXZMaXN0OiBbXSxcbiAgICAgIGRpc3BsYXlMaXN0OiBbXSxcbiAgICAgIGxpc3RpZDogMSwgLy9kZWZhdWx0IC0gbmVlZCB0byBjaGFuZ2UgaXQgYmFzZWQgb24gd2hlbiB1c2VyIGxvZ3MgaW5cbiAgICAgIHVzZXJpZDogJycsIC8vdGVtcG9yYXJpbHlcbiAgICAgIGNyZWF0ZURpc3BsYXllZDogJ25vbmUnLFxuICAgICAgc2hhcmVEaXNwbGF5ZWQ6ICdub25lJyxcbiAgICAgIHVzZXJuYW1lOiAnJyxcbiAgICAgIGxvZ2luOiAnZGVmYXVsdCdcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgTElTVCBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgXG4gICAgLy8gY29udHJvbHMgaWYgZGlzcGxheSBmb3IgYWRkaW5nIGEgbmV3IGxpc3QgaXMgdmlzaWJsZVxuICAgIHRoaXMuZGlzcGxheU5ld0xpc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3JlYXRlRGlzcGxheWVkOiAnYmxvY2snXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlTmV3TGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdub25lJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGlzcGxheVNoYXJlTGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaGFyZURpc3BsYXllZDogJ2Jsb2NrJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZVNoYXJlTGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzaGFyZURpc3BsYXllZDogJ25vbmUnXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5mZXRjaExpc3RzID0gKCkgPT4ge1xuICAgICAgLy8gdXNlcmlkIGlzIGJlaW5nIHBhc3NlZCBvbiBpbiBVUkwsIHVsdGltYXRlbHkgcmVmYWN0b3Igb3VyIHdoZW4gYXV0aCB0b2tlbiBpcyBpbiBwbGFjZVxuICAgICAgdmFyIGdldFVybCA9IGAvbGlzdHMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgICAgZmV0Y2goZ2V0VXJsKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBkaXNwbGF5TGlzdCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gdmFsLmxpc3RpZCA8IG1lbW8ubGlzdGlkID8gdmFsIDogbWVtbztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBkaXNwbGF5TGlzdC5saXN0aWQsXG4gICAgICAgICAgbGlzdG5hbWU6IGRpc3BsYXlMaXN0Lmxpc3RuYW1lXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIHZpc3VhbGx5IHdoYXQgZG8geW91IHNlZSwgZG9lcyBub3QgY2hhbmdlIG1hc3Rlckxpc3Qgb3IgbmF2TGlzdFxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkLCBsaXN0bmFtZSkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxpc3RpZDogaWQsXG4gICAgICAgIGxpc3RuYW1lOiBsaXN0bmFtZVxuICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgIH07XG5cbiAgICAvLyBwb3N0cyBhIG5ldyBsaXN0IGFuZCBnZXRzIGFsbCBsaXN0cyBhbGxvd3MgLSBmb2xsb3cgcm91dGUgdG8gc2VlXG4gICAgdGhpcy5hZGRMaXN0ID0gKG5ld0xpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHZhciBhY3RpdmVMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwubGlzdGlkLCBtZW1vKTtcbiAgICAgICAgfSwgLUluZmluaXR5KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGFjdGl2ZUxpc3RcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlTGlzdCA9IChsaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbyk7XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnNoYXJlTGlzdCA9IChzaGFyZURhdGFPYmopID0+IHtcbiAgICAgIGZldGNoKCcvdXNlcmxpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzaGFyZURhdGFPYmopXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgSVRFTSBDSEFOR0VTICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB0aGlzLnVwZGF0ZVF1YW50ID0gKGl0ZW0sIGFkZE9yU3ViKSA9PiB7XG4gICAgICBpZiAoYWRkT3JTdWIgPT09ICdhZGQnKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkrKztcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09ICdzdWInKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkgPSBNYXRoLm1heChpdGVtLnF1YW50aXR5IC0gMSwgMCk7XG4gICAgICB9XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hZGRJdGVtID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxldGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBVU0VSIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMuZmV0Y2hVc2VybmFtZSA9ICgpID0+IHtcbiAgICAgIC8vIHVzZXJpZCBpcyBiZWluZyBwYXNzZWQgb24gaW4gVVJMLCB1bHRpbWF0ZWx5IHJlZmFjdG9yIG91ciB3aGVuIGF1dGggdG9rZW4gaXMgaW4gcGxhY2VcbiAgICAgIHZhciBnZXRVcmwgPSBgL3VzZXJuYW1lLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICAgIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VybmFtZTogZGF0YS51c2VybmFtZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnNhdmVVc2VybmFtZSA9ICh1c2VyRGF0YSkgPT4ge1xuICAgICAgZmV0Y2goJy91c2VycycsIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoYm9keSkgPT4gYm9keS5qc29uKCkpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJuYW1lOiByZXMudXNlcm5hbWUsXG4gICAgICAgICAgZXJyb3I6IHJlcy5lcnJvclxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coJ2VycjByJywgZXJyKSk7XG4gICAgfTtcblxuICAgIHRoaXMubG9nT3V0ID0gKCkgPT4ge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaWRUb2tlbjogJycsXG4gICAgICAgIHVzZXJpZDogJycsXG4gICAgICAgIHVzZXJuYW1lOiAnJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICB9XG5cbiAgLy8gZGVsZXRlSXRlbShpdGVtKSB7XG4gIC8vICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gIC8vICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIC8vICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgLy8gICAgIH0sXG4gIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAvLyAgIH0pXG4gIC8vICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAvLyAgIC50aGVuKChkYXRhKSA9PiB7XG4gIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAvLyAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIGFkZFVzZXIodXNlckRhdGEpIHtcbiAgICBmZXRjaCgnL3VzZXJzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSlcbiAgICB9KVxuICAgIC50aGVuKChib2R5KSA9PiBib2R5Lmpzb24oKSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdXNlcm5hbWU6IHJlcy51c2VybmFtZVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coJ2VycjByJywgZXJyKSk7XG4gIH1cblxuICBmZXRjaEl0ZW1zKCkge1xuICAgIHZhciBnZXRVcmwgPSBgL2l0ZW1zLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICBmZXRjaChnZXRVcmwpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuICAgIC8vIHNldCBzdGF0ZSB3aXRoIGl0XG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBnb3QgYWxsIGl0ZW1zIGFuZCBmaWx0ZXIgZm9yIGRlbGV0ZWQgaXRlbXNcbiAgbWFrZURpc3BsYXlEYXRhKGxpc3RpZCA9IHRoaXMuc3RhdGUubGlzdGlkLCBkZWxldGVkU3RhdHVzID0gZmFsc2UpIHtcbiAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBsaXN0aWQgJiYgZW50cnkuZGVsZXRlZCA9PT0gZGVsZXRlZFN0YXR1cyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dMb2NrKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmxvZ2luID09PSAncGhvbmUnKSB7XG4gICAgICAvLyBzbXNcbiAgICAgIHRoaXMubG9jay5zbXMoKGVyciwgcHJvZmlsZSwgaWRUb2tlbiwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAvLyBzZXQgSldUIG9uIGxvY2Fsc3RvcmFnZVxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkVG9rZW4pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdXNlcmlkOiBwcm9maWxlLnVzZXJfaWQsXG4gICAgICAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgICAgICAgICAgLy8gcmVsaWVzIG9uIGxvY2FsIHN0b3JhZ2UsIHRyaWdnZXJzIHJlbmRlcigpXG4gICAgICAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgICAgICAgICB0aGlzLmZldGNoVXNlcm5hbWUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBhZGQgdXNlciB0byBkYlxuICAgICAgICAgIHZhciB1c2VyRGF0YSA9IHt9O1xuICAgICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZmlsZS51c2VyX2lkO1xuICAgICAgICAgIHVzZXJEYXRhLmVtYWlsID0gcHJvZmlsZS5lbWFpbDtcbiAgICAgICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT3BlbiB0aGUgbG9jayBpbiBFbWFpbCBDb2RlIG1vZGUgd2l0aCB0aGUgYWJpbGl0eSB0byBoYW5kbGUgdGhlIGF1dGhlbnRpY2F0aW9uIGluIHBhZ2VcbiAgICAgIHRoaXMubG9jay5lbWFpbGNvZGUoKGVyciwgcHJvZmlsZSwgaWRUb2tlbiwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAvLyBzZXQgSldUIG9uIGxvY2Fsc3RvcmFnZVxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkVG9rZW4pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdXNlcmlkOiBwcm9maWxlLnVzZXJfaWQsXG4gICAgICAgICAgICAvLyAvLyBwcm9maWxlIGlzIHJldHVybiBmcm9tIGF1dGgwIC0gaGFzIHNvbWUgZGF0YSBhdmFpbGFibGVcbiAgICAgICAgICAgIC8vIHByb2ZpbGU6IHByb2ZpbGUsXG4gICAgICAgICAgICBlbWFpbDogcHJvZmlsZS5lbWFpbCxcbiAgICAgICAgICAgIC8vIHJlbGllcyBvbiBsb2NhbCBzdG9yYWdlLCB0cmlnZ2VycyByZW5kZXIoKVxuICAgICAgICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICAgICAgdGhpcy5mZXRjaFVzZXJuYW1lKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7fTtcbiAgICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2ZpbGUudXNlcl9pZDtcbiAgICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2ZpbGUuZW1haWw7XG4gICAgICAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBnZXRJZFRva2VuKCkge1xuICAgIC8vIEZpcnN0LCBjaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgSldUIGluIGxvY2FsIHN0b3JhZ2VcbiAgICB2YXIgaWRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpO1xuICAgIHZhciBhdXRoSGFzaCA9IHRoaXMubG9jay5wYXJzZUhhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgIC8vIElmIHRoZXJlIGlzIG5vIEpXVCBpbiBsb2NhbCBzdG9yYWdlIGFuZCB0aGVyZSBpcyBvbmUgaW4gdGhlIFVSTCBoYXNoLFxuICAgIC8vIHNhdmUgaXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGlmICghaWRUb2tlbiAmJiBhdXRoSGFzaCkge1xuICAgICAgaWYgKGF1dGhIYXNoLmlkX3Rva2VuKSB7XG4gICAgICAgIGlkVG9rZW4gPSBhdXRoSGFzaC5pZF90b2tlbjtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aEhhc2guaWRfdG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGF1dGhIYXNoLmVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgY29uZGl0aW9uc1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc2lnbmluZyBpbicsIGF1dGhIYXNoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkVG9rZW47XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBpZiBpZHRva2VuICYgdXNlcm5hbWUgZXhpc3RcbiAgICBpZiAodGhpcy5zdGF0ZS5pZFRva2VuICYmICF0aGlzLnN0YXRlLnVzZXJuYW1lKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+RmV0Y2hpbmcgeW91ciBkYXRhLi4uPC9kaXY+XG4gICAgICAgICAgPFVzZXJuYW1lIHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IHNhdmVVc2VybmFtZT17dGhpcy5zYXZlVXNlcm5hbWV9IGVycm9yPXt0aGlzLnN0YXRlLmVycm9yfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuaWRUb2tlbiAmJlxuICAgICAgLy8gaWRlYWxseSB5b3UgY2FuIGJyaW5nIGluIGEgbGlicmFyeSBmb3IgdGhpcyBpZiB5b3UgbmVlZCB0byBkbyBpdCBhIGxvdFxuICAgICAgLy8gZXhwaXJlIGRhdGUgb24gdG9rZW4gZXhpc3RzXG4gICAgICBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuc3RhdGUuaWRUb2tlbi5zcGxpdCgnLicpWzFdKSkuZXhwICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIC8vIGV4cGlyZSBkYXRlIG9uIHRva2VuIGlzIG1vcmUgdGhhbiBjdXJyZW50IHRpbWVcbiAgICAgIEpTT04ucGFyc2Uod2luZG93LmF0b2IodGhpcy5zdGF0ZS5pZFRva2VuLnNwbGl0KCcuJylbMV0pKS5leHAgPiBEYXRlLm5vdygpIC8gMTAwMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8SGVhZGVyIHVzZXJuYW1lPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSBlbWFpbD17dGhpcy5zdGF0ZS5lbWFpbH0gbG9nT3V0PXt0aGlzLmxvZ091dH0vPlxuICAgICAgICAgIDxOZXdMaXN0IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gY3JlYXRlRGlzcGxheWVkPXt0aGlzLnN0YXRlLmNyZWF0ZURpc3BsYXllZH0gaGlkZU5ld0xpc3Q9e3RoaXMuaGlkZU5ld0xpc3R9Lz5cbiAgICAgICAgICA8TmF2QmFyIHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IG5hdkxpc3Q9e3RoaXMuc3RhdGUubmF2TGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnVwZGF0ZUxpc3RpZH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gZGlzcGxheU5ld0xpc3Q9e3RoaXMuZGlzcGxheU5ld0xpc3R9Lz5cbiAgICAgICAgICA8VG9kb0xpc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGxpc3RuYW1lPXt0aGlzLnN0YXRlLmxpc3RuYW1lfSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnVwZGF0ZVF1YW50fSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSBhZGRJdGVtPXt0aGlzLmFkZEl0ZW19Lz5cbiAgICAgICAgICA8Qm90dG9tIHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVMaXN0PXt0aGlzLmRlbGV0ZUxpc3R9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGRpc3BsYXlTaGFyZUxpc3Q9e3RoaXMuZGlzcGxheVNoYXJlTGlzdH0vPlxuICAgICAgICAgIDxTaGFyZUxpc3QgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gc2hhcmVMaXN0PXt0aGlzLnNoYXJlTGlzdH0gc2hhcmVEaXNwbGF5ZWQ9e3RoaXMuc3RhdGUuc2hhcmVEaXNwbGF5ZWR9IGhpZGVTaGFyZUxpc3Q9e3RoaXMuaGlkZVNoYXJlTGlzdH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1ib3gnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1ib3gtaGVhZGVyJz5Mb2dpbiB0byBMaXN0aWZ5PC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMuc3RhdGUubG9naW4gPT09ICdkZWZhdWx0JyB8fCB0aGlzLnN0YXRlLmxvZ2luID09PSAncGhvbmUnID8gJ3NlbGVjdGVkTG9naW4nIDogJ25vdFNlbGVjdGVkTG9naW4nfSBjbGFzc05hbWU9J2xvZ2luLXNlbGVjdCcgb25DbGljaz17KGUpID0+IHRoaXMuc2V0U3RhdGUoe2xvZ2luOiAncGhvbmUnfSl9PlxuICAgICAgICAgICAgICBQaG9uZSBOdW1iZXJcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5zdGF0ZS5sb2dpbiA9PT0gJ2VtYWlsJyA/ICdzZWxlY3RlZExvZ2luJyA6ICdub3RTZWxlY3RlZExvZ2luJ30gY2xhc3NOYW1lPSdsb2dpbi1zZWxlY3QnIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtsb2dpbjogJ2VtYWlsJ30pfT5cbiAgICAgICAgICAgICAgRW1haWwgQWRkcmVzc1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luLWNsaWNrJyBvbkNsaWNrPXsoZSkgPT4gdGhpcy5zaG93TG9jaygpfT5cbiAgICAgICAgICAgIExvZ2luXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuXG59XG5cblxuIl19