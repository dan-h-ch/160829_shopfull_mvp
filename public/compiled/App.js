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
          React.createElement(Header, { username: this.state.username, logOut: this.logOut }),
          React.createElement(NewList, { userid: this.state.userid, addList: this.addList, createDisplayed: this.state.createDisplayed, hideNewList: this.hideNewList }),
          React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, updateListid: this.updateListid, listid: this.state.listid, displayNewList: this.displayNewList }),
          React.createElement(TodoList, { todoList: this.state.displayList, listname: this.state.listname, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid, listid: this.state.listid, addItem: this.addItem }),
          React.createElement(TodoCost, { todoList: this.state.displayList, deleteList: this.deleteList, listid: this.state.listid, userid: this.state.userid, displayShareList: this.displayShareList }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsImxvY2siLCJBdXRoMExvY2tQYXNzd29yZGxlc3MiLCJzZXRTdGF0ZSIsImlkVG9rZW4iLCJnZXRJZFRva2VuIiwiZ2V0UHJvZmlsZSIsInN0YXRlIiwiZXJyIiwicHJvZiIsInVzZXJpZCIsInVzZXJfaWQiLCJwcm9maWxlIiwiZmV0Y2hMaXN0cyIsImZldGNoSXRlbXMiLCJmZXRjaFVzZXJuYW1lIiwidXNlckRhdGEiLCJpZCIsImVtYWlsIiwiYWRkVXNlciIsInByb3BzIiwibWFzdGVyTGlzdCIsIm5hdkxpc3QiLCJkaXNwbGF5TGlzdCIsImxpc3RpZCIsImNyZWF0ZURpc3BsYXllZCIsInNoYXJlRGlzcGxheWVkIiwidXNlcm5hbWUiLCJsb2dpbiIsImRpc3BsYXlOZXdMaXN0IiwiaGlkZU5ld0xpc3QiLCJkaXNwbGF5U2hhcmVMaXN0IiwiaGlkZVNoYXJlTGlzdCIsImdldFVybCIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwicmVkdWNlIiwibWVtbyIsInZhbCIsImxpc3RuYW1lIiwidXBkYXRlTGlzdGlkIiwibWFrZURpc3BsYXlEYXRhIiwiYWRkTGlzdCIsIm5ld0xpc3QiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb25zb2xlIiwibG9nIiwiYWN0aXZlTGlzdCIsIk1hdGgiLCJtYXgiLCJJbmZpbml0eSIsImRlbGV0ZUxpc3QiLCJsaXN0Iiwic2hhcmVMaXN0Iiwic2hhcmVEYXRhT2JqIiwidXBkYXRlUXVhbnQiLCJpdGVtIiwiYWRkT3JTdWIiLCJxdWFudGl0eSIsImFkZEl0ZW0iLCJuZXdJdGVtIiwiZGVsZXRlSXRlbSIsInNhdmVVc2VybmFtZSIsImVycm9yIiwiY2F0Y2giLCJsb2dPdXQiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwiZGVsZXRlZFN0YXR1cyIsImZpbHRlciIsImVudHJ5IiwiZGVsZXRlZCIsInNtcyIsInNldEl0ZW0iLCJlbWFpbGNvZGUiLCJnZXRJdGVtIiwiYXV0aEhhc2giLCJwYXJzZUhhc2giLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2giLCJpZF90b2tlbiIsInBhcnNlIiwiYXRvYiIsInNwbGl0IiwiZXhwIiwidW5kZWZpbmVkIiwiRGF0ZSIsIm5vdyIsImUiLCJzaG93TG9jayIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7Ozs7O3lDQUVpQjtBQUNuQixXQUFLQyxJQUFMLEdBQVksSUFBSUMscUJBQUosQ0FBMEIsa0NBQTFCLEVBQThELGlCQUE5RCxDQUFaO0FBQ0Q7Ozt3Q0FFbUI7QUFBQTs7QUFDbEIsV0FBS0MsUUFBTCxDQUFjO0FBQ1pDLGlCQUFTLEtBQUtDLFVBQUw7QUFERyxPQUFkLEVBRUcsWUFBTTtBQUNQLGVBQUtKLElBQUwsQ0FBVUssVUFBVixDQUFxQixPQUFLQyxLQUFMLENBQVdILE9BQWhDLEVBQXlDLFVBQUNJLEdBQUQsRUFBTUMsSUFBTixFQUFlO0FBQ3RELGlCQUFLTixRQUFMLENBQWM7QUFDWk8sb0JBQVFELEtBQUtFLE9BREQ7QUFFWkMscUJBQVNIO0FBRkcsV0FBZCxFQUdHLFlBQU07QUFDUCxtQkFBS0ksVUFBTDtBQUNBLG1CQUFLQyxVQUFMO0FBQ0EsbUJBQUtDLGFBQUw7QUFDRCxXQVBEO0FBUUEsY0FBSUMsV0FBVyxFQUFmO0FBQ0FBLG1CQUFTQyxFQUFULEdBQWNSLEtBQUtFLE9BQW5CO0FBQ0FLLG1CQUFTRSxLQUFULEdBQWlCVCxLQUFLUyxLQUF0QjtBQUNBLGlCQUFLQyxPQUFMLENBQWFILFFBQWI7QUFDRCxTQWJEO0FBY0QsT0FqQkQ7QUFrQkQ7OztBQUVELGVBQVlJLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWEEsS0FEVzs7QUFHakIsVUFBS2IsS0FBTCxHQUFhO0FBQ1hjLGtCQUFZLEVBREQ7QUFFWEMsZUFBUyxFQUZFO0FBR1hDLG1CQUFhLEVBSEY7QUFJWEMsY0FBUSxDQUpHLEVBSUE7QUFDWGQsY0FBUSxFQUxHLEVBS0M7QUFDWmUsdUJBQWlCLE1BTk47QUFPWEMsc0JBQWdCLE1BUEw7QUFRWEMsZ0JBQVUsRUFSQztBQVNYQyxhQUFPO0FBVEksS0FBYjs7QUFZSjtBQUNBO0FBQ0E7O0FBRUk7QUFDQSxVQUFLQyxjQUFMLEdBQXNCLFlBQU07QUFDMUIsWUFBSzFCLFFBQUwsQ0FBYztBQUNac0IseUJBQWlCO0FBREwsT0FBZDtBQUdELEtBSkQ7O0FBTUEsVUFBS0ssV0FBTCxHQUFtQixZQUFNO0FBQ3ZCLFlBQUszQixRQUFMLENBQWM7QUFDWnNCLHlCQUFpQjtBQURMLE9BQWQ7QUFHRCxLQUpEOztBQU1BLFVBQUtNLGdCQUFMLEdBQXdCLFlBQU07QUFDNUIsWUFBSzVCLFFBQUwsQ0FBYztBQUNadUIsd0JBQWdCO0FBREosT0FBZDtBQUdELEtBSkQ7O0FBTUEsVUFBS00sYUFBTCxHQUFxQixZQUFNO0FBQ3pCLFlBQUs3QixRQUFMLENBQWM7QUFDWnVCLHdCQUFnQjtBQURKLE9BQWQ7QUFHRCxLQUpEOztBQU1BLFVBQUtiLFVBQUwsR0FBa0IsWUFBTTtBQUN0QjtBQUNBLFVBQUlvQixxQkFBbUIsTUFBSzFCLEtBQUwsQ0FBV0csTUFBbEM7QUFDQXdCLFlBQU1ELE1BQU4sRUFDQ0UsSUFERCxDQUNNLFVBQUNDLEdBQUQ7QUFBQSxlQUFTQSxJQUFJQyxJQUFKLEVBQVQ7QUFBQSxPQUROLEVBRUNGLElBRkQsQ0FFTSxVQUFDRyxJQUFELEVBQVU7QUFDZCxZQUFJZixjQUFjZSxLQUFLQyxNQUFMLENBQVksVUFBQ0MsSUFBRCxFQUFPQyxHQUFQLEVBQWU7QUFDM0MsaUJBQU9BLElBQUlqQixNQUFKLEdBQWFnQixLQUFLaEIsTUFBbEIsR0FBMkJpQixHQUEzQixHQUFpQ0QsSUFBeEM7QUFDRCxTQUZpQixDQUFsQjtBQUdBLGNBQUtyQyxRQUFMLENBQWM7QUFDWm1CLG1CQUFTZ0IsSUFERztBQUVaZCxrQkFBUUQsWUFBWUMsTUFGUjtBQUdaa0Isb0JBQVVuQixZQUFZbUI7QUFIVixTQUFkO0FBS0QsT0FYRDtBQVlELEtBZkQ7O0FBaUJBO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixVQUFDMUIsRUFBRCxFQUFLeUIsUUFBTCxFQUFrQjtBQUNwQyxZQUFLdkMsUUFBTCxDQUFjO0FBQ1pxQixnQkFBUVAsRUFESTtBQUVaeUIsa0JBQVVBO0FBRkUsT0FBZCxFQUdHLFlBQVc7QUFBRSxhQUFLRSxlQUFMO0FBQXlCLE9BSHpDO0FBSUQsS0FMRDs7QUFPQTtBQUNBLFVBQUtDLE9BQUwsR0FBZSxVQUFDQyxPQUFELEVBQWE7QUFDMUJaLFlBQU0sUUFBTixFQUFnQjtBQUNkYSxnQkFBUSxNQURNO0FBRWRDLGlCQUFTO0FBQ1Asb0JBQVUsa0JBREg7QUFFUCwwQkFBZ0I7QUFGVCxTQUZLO0FBTWRDLGNBQU1DLEtBQUtDLFNBQUwsQ0FBZUwsT0FBZjtBQU5RLE9BQWhCLEVBUUNYLElBUkQsQ0FRTSxVQUFDRyxJQUFEO0FBQUEsZUFBVUEsS0FBS0QsSUFBTCxFQUFWO0FBQUEsT0FSTixFQVNDRixJQVRELENBU00sVUFBQ0csSUFBRCxFQUFVO0FBQ2RjLGdCQUFRQyxHQUFSLENBQVlmLElBQVo7QUFDQSxZQUFJZ0IsYUFBYWhCLEtBQUtDLE1BQUwsQ0FBWSxVQUFDQyxJQUFELEVBQU9DLEdBQVAsRUFBZTtBQUMxQyxpQkFBT2MsS0FBS0MsR0FBTCxDQUFTZixJQUFJakIsTUFBYixFQUFxQmdCLElBQXJCLENBQVA7QUFDRCxTQUZnQixFQUVkLENBQUNpQixRQUZhLENBQWpCO0FBR0EsY0FBS3RELFFBQUwsQ0FBYztBQUNabUIsbUJBQVNnQixJQURHO0FBRVpkLGtCQUFROEI7QUFGSSxTQUFkLEVBR0csWUFBVztBQUFFLGVBQUtWLGVBQUw7QUFBeUIsU0FIekM7QUFJRCxPQWxCRDtBQW1CRCxLQXBCRDs7QUFzQkEsVUFBS2MsVUFBTCxHQUFrQixVQUFDQyxJQUFELEVBQVU7QUFDMUJ6QixZQUFNLFFBQU4sRUFBZ0I7QUFDZGEsZ0JBQVEsUUFETTtBQUVkQyxpQkFBUztBQUNQLG9CQUFVLGtCQURIO0FBRVAsMEJBQWdCO0FBRlQsU0FGSztBQU1kQyxjQUFNQyxLQUFLQyxTQUFMLENBQWVRLElBQWY7QUFOUSxPQUFoQixFQVFDeEIsSUFSRCxDQVFNLFVBQUNHLElBQUQ7QUFBQSxlQUFVQSxLQUFLRCxJQUFMLEVBQVY7QUFBQSxPQVJOLEVBU0NGLElBVEQsQ0FTTSxVQUFDRyxJQUFELEVBQVU7QUFDZCxZQUFJZ0IsYUFBYWhCLEtBQUtDLE1BQUwsQ0FBWSxVQUFDQyxJQUFELEVBQU9DLEdBQVAsRUFBZTtBQUMxQyxpQkFBT2MsS0FBS0MsR0FBTCxDQUFTZixJQUFJeEIsRUFBYixFQUFpQnVCLElBQWpCLENBQVA7QUFDRCxTQUZnQixFQUVkLENBQUNpQixRQUZhLENBQWpCO0FBR0EsY0FBS3RELFFBQUwsQ0FBYztBQUNabUIsbUJBQVNnQixJQURHO0FBRVpkLGtCQUFROEI7QUFGSSxTQUFkLEVBR0csWUFBVztBQUFFLGVBQUtWLGVBQUw7QUFBeUIsU0FIekM7QUFJRCxPQWpCRDtBQWtCRCxLQW5CRDs7QUFxQkEsVUFBS2dCLFNBQUwsR0FBaUIsVUFBQ0MsWUFBRCxFQUFrQjtBQUNqQzNCLFlBQU0sWUFBTixFQUFvQjtBQUNsQmEsZ0JBQVEsTUFEVTtBQUVsQkMsaUJBQVM7QUFDUCxvQkFBVSxrQkFESDtBQUVQLDBCQUFnQjtBQUZULFNBRlM7QUFNbEJDLGNBQU1DLEtBQUtDLFNBQUwsQ0FBZVUsWUFBZjtBQU5ZLE9BQXBCLEVBUUMxQixJQVJELENBUU0sVUFBQ0csSUFBRDtBQUFBLGVBQVVBLEtBQUtELElBQUwsRUFBVjtBQUFBLE9BUk4sRUFTQ0YsSUFURCxDQVNNLFVBQUNHLElBQUQsRUFBVTtBQUNkYyxnQkFBUUMsR0FBUixDQUFZZixJQUFaO0FBQ0QsT0FYRDtBQVlELEtBYkQ7O0FBZUo7QUFDQTtBQUNBOztBQUVJLFVBQUt3QixXQUFMLEdBQW1CLFVBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUNyQyxVQUFJQSxhQUFhLEtBQWpCLEVBQXdCO0FBQ3RCRCxhQUFLRSxRQUFMO0FBQ0QsT0FGRCxNQUVPLElBQUlELGFBQWEsS0FBakIsRUFBd0I7QUFDN0JELGFBQUtFLFFBQUwsR0FBZ0JWLEtBQUtDLEdBQUwsQ0FBU08sS0FBS0UsUUFBTCxHQUFnQixDQUF6QixFQUE0QixDQUE1QixDQUFoQjtBQUNEO0FBQ0QvQixZQUFNLFFBQU4sRUFBZ0I7QUFDZGEsZ0JBQVEsS0FETTtBQUVkQyxpQkFBUztBQUNQLG9CQUFVLGtCQURIO0FBRVAsMEJBQWdCO0FBRlQsU0FGSztBQU1kQyxjQUFNQyxLQUFLQyxTQUFMLENBQWVZLElBQWY7QUFOUSxPQUFoQixFQVFDNUIsSUFSRCxDQVFNLFVBQUNHLElBQUQ7QUFBQSxlQUFVQSxLQUFLRCxJQUFMLEVBQVY7QUFBQSxPQVJOLEVBU0NGLElBVEQsQ0FTTSxVQUFDRyxJQUFELEVBQVU7QUFDZCxjQUFLbkMsUUFBTCxDQUFjO0FBQ1prQixzQkFBWWlCO0FBREEsU0FBZDtBQUdELE9BYkQ7QUFjRCxLQXBCRDs7QUFzQkEsVUFBSzRCLE9BQUwsR0FBZSxVQUFDQyxPQUFELEVBQWE7QUFDMUJqQyxZQUFNLFFBQU4sRUFBZ0I7QUFDZGEsZ0JBQVEsTUFETTtBQUVkQyxpQkFBUztBQUNQLG9CQUFVLGtCQURIO0FBRVAsMEJBQWdCO0FBRlQsU0FGSztBQU1kQyxjQUFNQyxLQUFLQyxTQUFMLENBQWVnQixPQUFmO0FBTlEsT0FBaEIsRUFRQ2hDLElBUkQsQ0FRTSxVQUFDRyxJQUFEO0FBQUEsZUFBVUEsS0FBS0QsSUFBTCxFQUFWO0FBQUEsT0FSTixFQVNDRixJQVRELENBU00sVUFBQ0csSUFBRCxFQUFVO0FBQ2QsY0FBS25DLFFBQUwsQ0FBYztBQUNaa0Isc0JBQVlpQjtBQURBLFNBQWQsRUFFRyxZQUFXO0FBQUUsZUFBS00sZUFBTDtBQUF5QixTQUZ6QztBQUdELE9BYkQ7QUFjRCxLQWZEOztBQWlCQSxVQUFLd0IsVUFBTCxHQUFrQixVQUFDTCxJQUFELEVBQVU7QUFDMUI3QixZQUFNLFFBQU4sRUFBZ0I7QUFDZGEsZ0JBQVEsUUFETTtBQUVkQyxpQkFBUztBQUNQLG9CQUFVLGtCQURIO0FBRVAsMEJBQWdCO0FBRlQsU0FGSztBQU1kQyxjQUFNQyxLQUFLQyxTQUFMLENBQWVZLElBQWY7QUFOUSxPQUFoQixFQVFDNUIsSUFSRCxDQVFNLFVBQUNHLElBQUQ7QUFBQSxlQUFVQSxLQUFLRCxJQUFMLEVBQVY7QUFBQSxPQVJOLEVBU0NGLElBVEQsQ0FTTSxVQUFDRyxJQUFELEVBQVU7QUFDZCxjQUFLbkMsUUFBTCxDQUFjO0FBQ1prQixzQkFBWWlCO0FBREEsU0FBZCxFQUVHLFlBQVc7QUFBRSxlQUFLTSxlQUFMO0FBQXlCLFNBRnpDO0FBR0QsT0FiRDtBQWNELEtBZkQ7O0FBaUJKO0FBQ0E7QUFDQTs7QUFFSSxVQUFLN0IsYUFBTCxHQUFxQixZQUFNO0FBQ3pCO0FBQ0EsVUFBSWtCLHdCQUFzQixNQUFLMUIsS0FBTCxDQUFXRyxNQUFyQztBQUNBd0IsWUFBTUQsTUFBTixFQUNDRSxJQURELENBQ00sVUFBQ0MsR0FBRDtBQUFBLGVBQVNBLElBQUlDLElBQUosRUFBVDtBQUFBLE9BRE4sRUFFQ0YsSUFGRCxDQUVNLFVBQUNHLElBQUQsRUFBVTtBQUNkLGNBQUtuQyxRQUFMLENBQWM7QUFDWndCLG9CQUFVVyxLQUFLWDtBQURILFNBQWQ7QUFHRCxPQU5EO0FBT0QsS0FWRDs7QUFZQSxVQUFLMEMsWUFBTCxHQUFvQixVQUFDckQsUUFBRCxFQUFjO0FBQ2hDa0IsWUFBTSxRQUFOLEVBQWdCO0FBQ2RhLGdCQUFRLEtBRE07QUFFZEMsaUJBQVM7QUFDUCxvQkFBVSxrQkFESDtBQUVQLDBCQUFnQjtBQUZULFNBRks7QUFNZEMsY0FBTUMsS0FBS0MsU0FBTCxDQUFlbkMsUUFBZjtBQU5RLE9BQWhCLEVBUUNtQixJQVJELENBUU0sVUFBQ2MsSUFBRDtBQUFBLGVBQVVBLEtBQUtaLElBQUwsRUFBVjtBQUFBLE9BUk4sRUFTQ0YsSUFURCxDQVNNLFVBQUNDLEdBQUQsRUFBUztBQUNiLGNBQUtqQyxRQUFMLENBQWM7QUFDWndCLG9CQUFVUyxJQUFJVCxRQURGO0FBRVoyQyxpQkFBT2xDLElBQUlrQztBQUZDLFNBQWQ7QUFJRCxPQWRELEVBZUNDLEtBZkQsQ0FlTyxVQUFDL0QsR0FBRDtBQUFBLGVBQVM0QyxRQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQjdDLEdBQXJCLENBQVQ7QUFBQSxPQWZQO0FBZ0JELEtBakJEOztBQW1CQSxVQUFLZ0UsTUFBTCxHQUFjLFlBQU07QUFDbEJDLG1CQUFhQyxVQUFiLENBQXdCLFVBQXhCO0FBQ0EsWUFBS3ZFLFFBQUwsQ0FBYztBQUNaQyxpQkFBUyxFQURHO0FBRVpNLGdCQUFRLEVBRkk7QUFHWmlCLGtCQUFVO0FBSEUsT0FBZDtBQUtELEtBUEQ7O0FBL05pQjtBQXdPbEI7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7NEJBRVFYLFEsRUFBVTtBQUFBOztBQUNoQmtCLFlBQU0sUUFBTixFQUFnQjtBQUNkYSxnQkFBUSxNQURNO0FBRWRDLGlCQUFTO0FBQ1Asb0JBQVUsa0JBREg7QUFFUCwwQkFBZ0I7QUFGVCxTQUZLO0FBTWRDLGNBQU1DLEtBQUtDLFNBQUwsQ0FBZW5DLFFBQWY7QUFOUSxPQUFoQixFQVFDbUIsSUFSRCxDQVFNLFVBQUNjLElBQUQ7QUFBQSxlQUFVQSxLQUFLWixJQUFMLEVBQVY7QUFBQSxPQVJOLEVBU0NGLElBVEQsQ0FTTSxVQUFDQyxHQUFELEVBQVM7QUFDYixlQUFLakMsUUFBTCxDQUFjO0FBQ1p3QixvQkFBVVMsSUFBSVQ7QUFERixTQUFkO0FBR0QsT0FiRCxFQWNDNEMsS0FkRCxDQWNPLFVBQUMvRCxHQUFEO0FBQUEsZUFBUzRDLFFBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCN0MsR0FBckIsQ0FBVDtBQUFBLE9BZFA7QUFlRDs7O2lDQUVZO0FBQUE7O0FBQ1gsVUFBSXlCLHFCQUFtQixLQUFLMUIsS0FBTCxDQUFXRyxNQUFsQztBQUNBd0IsWUFBTUQsTUFBTixFQUNDRSxJQURELENBQ00sVUFBU0MsR0FBVCxFQUFjO0FBQ2xCLGVBQU9BLElBQUlDLElBQUosRUFBUDtBQUNELE9BSEQ7QUFJQTtBQUpBLE9BS0NGLElBTEQsQ0FLTSxVQUFDRyxJQUFELEVBQVU7QUFDZCxlQUFLbkMsUUFBTCxDQUFjO0FBQ1prQixzQkFBWWlCO0FBREEsU0FBZCxFQUVHLFlBQVc7QUFBRSxlQUFLTSxlQUFMO0FBQXlCLFNBRnpDO0FBR0QsT0FURDtBQVVEOztBQUVEOzs7O3NDQUNtRTtBQUFBLFVBQW5EcEIsTUFBbUQseURBQTFDLEtBQUtqQixLQUFMLENBQVdpQixNQUErQjtBQUFBLFVBQXZCbUQsYUFBdUIseURBQVAsS0FBTzs7QUFDakUsVUFBSXBELGNBQWMsS0FBS2hCLEtBQUwsQ0FBV2MsVUFBWCxDQUFzQnVELE1BQXRCLENBQTZCLFVBQUNDLEtBQUQ7QUFBQSxlQUFXQSxNQUFNckQsTUFBTixLQUFpQkEsTUFBakIsSUFBMkJxRCxNQUFNQyxPQUFOLEtBQWtCSCxhQUF4RDtBQUFBLE9BQTdCLENBQWxCO0FBQ0EsV0FBS3hFLFFBQUwsQ0FBYztBQUNab0IscUJBQWFBO0FBREQsT0FBZDtBQUdEOzs7K0JBRVU7QUFBQTs7QUFDVCxVQUFJLEtBQUtoQixLQUFMLENBQVdxQixLQUFYLEtBQXFCLE9BQXpCLEVBQWtDO0FBQ2hDO0FBQ0EsYUFBSzNCLElBQUwsQ0FBVThFLEdBQVYsQ0FBYyxVQUFDdkUsR0FBRCxFQUFNSSxPQUFOLEVBQWVSLE9BQWYsRUFBd0JHLEtBQXhCLEVBQWtDO0FBQzlDLGNBQUksQ0FBQ0MsR0FBTCxFQUFVO0FBQ1I7QUFDQWlFLHlCQUFhTyxPQUFiLENBQXFCLFVBQXJCLEVBQWlDNUUsT0FBakM7QUFDQSxtQkFBS0QsUUFBTCxDQUFjO0FBQ1pPLHNCQUFRRSxRQUFRRCxPQURKO0FBRVpDLHVCQUFTQSxPQUZHO0FBR1o7QUFDQVIsdUJBQVMsT0FBS0MsVUFBTDtBQUpHLGFBQWQsRUFLRyxZQUFNO0FBQ1AscUJBQUtRLFVBQUw7QUFDQSxxQkFBS0MsVUFBTDtBQUNBLHFCQUFLQyxhQUFMO0FBQ0QsYUFURDtBQVVBO0FBQ0EsZ0JBQUlDLFdBQVcsRUFBZjtBQUNBQSxxQkFBU0MsRUFBVCxHQUFjTCxRQUFRRCxPQUF0QjtBQUNBSyxxQkFBU0UsS0FBVCxHQUFpQk4sUUFBUU0sS0FBekI7QUFDQSxtQkFBS0MsT0FBTCxDQUFhSCxRQUFiO0FBQ0Q7QUFDRixTQXBCRDtBQXFCRCxPQXZCRCxNQXVCTztBQUNMO0FBQ0EsYUFBS2YsSUFBTCxDQUFVZ0YsU0FBVixDQUFvQixVQUFDekUsR0FBRCxFQUFNSSxPQUFOLEVBQWVSLE9BQWYsRUFBd0JHLEtBQXhCLEVBQWtDO0FBQ3BELGNBQUksQ0FBQ0MsR0FBTCxFQUFVO0FBQ1I7QUFDQWlFLHlCQUFhTyxPQUFiLENBQXFCLFVBQXJCLEVBQWlDNUUsT0FBakM7QUFDQSxtQkFBS0QsUUFBTCxDQUFjO0FBQ1pPLHNCQUFRRSxRQUFRRCxPQURKO0FBRVpDLHVCQUFTQSxPQUZHO0FBR1o7QUFDQVIsdUJBQVMsT0FBS0MsVUFBTDtBQUpHLGFBQWQsRUFLRyxZQUFNO0FBQ1AscUJBQUtRLFVBQUw7QUFDQSxxQkFBS0MsVUFBTDtBQUNBLHFCQUFLQyxhQUFMO0FBQ0QsYUFURDtBQVVBO0FBQ0EsZ0JBQUlDLFdBQVcsRUFBZjtBQUNBQSxxQkFBU0MsRUFBVCxHQUFjTCxRQUFRRCxPQUF0QjtBQUNBSyxxQkFBU0UsS0FBVCxHQUFpQk4sUUFBUU0sS0FBekI7QUFDQSxtQkFBS0MsT0FBTCxDQUFhSCxRQUFiO0FBQ0Q7QUFDRixTQXBCRDtBQXFCRDtBQUVGOzs7aUNBRVk7QUFDWDtBQUNBLFVBQUlaLFVBQVVxRSxhQUFhUyxPQUFiLENBQXFCLFVBQXJCLENBQWQ7QUFDQSxVQUFJQyxXQUFXLEtBQUtsRixJQUFMLENBQVVtRixTQUFWLENBQW9CQyxPQUFPQyxRQUFQLENBQWdCQyxJQUFwQyxDQUFmO0FBQ0E7QUFDQTtBQUNBLFVBQUksQ0FBQ25GLE9BQUQsSUFBWStFLFFBQWhCLEVBQTBCO0FBQ3hCLFlBQUlBLFNBQVNLLFFBQWIsRUFBdUI7QUFDckJwRixvQkFBVStFLFNBQVNLLFFBQW5CO0FBQ0FmLHVCQUFhTyxPQUFiLENBQXFCLFVBQXJCLEVBQWlDRyxTQUFTSyxRQUExQztBQUNEO0FBQ0QsWUFBSUwsU0FBU2IsS0FBYixFQUFvQjtBQUNsQjtBQUNBbEIsa0JBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQzhCLFFBQWhDO0FBQ0Q7QUFDRjtBQUNELGFBQU8vRSxPQUFQO0FBQ0Q7Ozs2QkFHUTtBQUFBOztBQUNQO0FBQ0EsVUFBSSxLQUFLRyxLQUFMLENBQVdILE9BQVgsSUFBc0IsQ0FBQyxLQUFLRyxLQUFMLENBQVdvQixRQUF0QyxFQUFnRDtBQUM5QyxlQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERjtBQUVFLDhCQUFDLFFBQUQsSUFBVSxRQUFRLEtBQUtwQixLQUFMLENBQVdHLE1BQTdCLEVBQXFDLGNBQWMsS0FBSzJELFlBQXhELEVBQXNFLE9BQU8sS0FBSzlELEtBQUwsQ0FBVytELEtBQXhGO0FBRkYsU0FERjtBQU1ELE9BUEQsTUFPTyxJQUFJLEtBQUsvRCxLQUFMLENBQVdILE9BQVg7QUFDVDtBQUNBO0FBQ0E4QyxXQUFLdUMsS0FBTCxDQUFXSixPQUFPSyxJQUFQLENBQVksS0FBS25GLEtBQUwsQ0FBV0gsT0FBWCxDQUFtQnVGLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCLENBQTlCLENBQVosQ0FBWCxFQUEwREMsR0FBMUQsS0FBa0VDLFNBSHpEO0FBSVQ7QUFDQTNDLFdBQUt1QyxLQUFMLENBQVdKLE9BQU9LLElBQVAsQ0FBWSxLQUFLbkYsS0FBTCxDQUFXSCxPQUFYLENBQW1CdUYsS0FBbkIsQ0FBeUIsR0FBekIsRUFBOEIsQ0FBOUIsQ0FBWixDQUFYLEVBQTBEQyxHQUExRCxHQUFnRUUsS0FBS0MsR0FBTCxLQUFhLElBTHhFLEVBSzhFO0FBQ25GLGVBQ0U7QUFBQTtBQUFBO0FBQ0UsOEJBQUMsTUFBRCxJQUFRLFVBQVUsS0FBS3hGLEtBQUwsQ0FBV29CLFFBQTdCLEVBQXVDLFFBQVEsS0FBSzZDLE1BQXBELEdBREY7QUFFRSw4QkFBQyxPQUFELElBQVMsUUFBUSxLQUFLakUsS0FBTCxDQUFXRyxNQUE1QixFQUFvQyxTQUFTLEtBQUttQyxPQUFsRCxFQUEyRCxpQkFBaUIsS0FBS3RDLEtBQUwsQ0FBV2tCLGVBQXZGLEVBQXdHLGFBQWEsS0FBS0ssV0FBMUgsR0FGRjtBQUdFLDhCQUFDLE1BQUQsSUFBUSxRQUFRLEtBQUt2QixLQUFMLENBQVdHLE1BQTNCLEVBQW1DLFNBQVMsS0FBS0gsS0FBTCxDQUFXZSxPQUF2RCxFQUFnRSxjQUFjLEtBQUtxQixZQUFuRixFQUFpRyxRQUFRLEtBQUtwQyxLQUFMLENBQVdpQixNQUFwSCxFQUE0SCxnQkFBZ0IsS0FBS0ssY0FBakosR0FIRjtBQUlFLDhCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUt0QixLQUFMLENBQVdnQixXQUEvQixFQUE0QyxVQUFVLEtBQUtoQixLQUFMLENBQVdtQyxRQUFqRSxFQUEyRSxZQUFZLEtBQUswQixVQUE1RixFQUF3RyxhQUFhLEtBQUtOLFdBQTFILEVBQXVJLFFBQVEsS0FBS3ZELEtBQUwsQ0FBV0csTUFBMUosRUFBa0ssUUFBUSxLQUFLSCxLQUFMLENBQVdpQixNQUFyTCxFQUE2TCxTQUFTLEtBQUswQyxPQUEzTSxHQUpGO0FBS0UsOEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSzNELEtBQUwsQ0FBV2dCLFdBQS9CLEVBQTRDLFlBQVksS0FBS21DLFVBQTdELEVBQXlFLFFBQVEsS0FBS25ELEtBQUwsQ0FBV2lCLE1BQTVGLEVBQW9HLFFBQVEsS0FBS2pCLEtBQUwsQ0FBV0csTUFBdkgsRUFBK0gsa0JBQWtCLEtBQUtxQixnQkFBdEosR0FMRjtBQU1FLDhCQUFDLFNBQUQsSUFBVyxRQUFRLEtBQUt4QixLQUFMLENBQVdHLE1BQTlCLEVBQXNDLFdBQVcsS0FBS2tELFNBQXRELEVBQWlFLGdCQUFnQixLQUFLckQsS0FBTCxDQUFXbUIsY0FBNUYsRUFBNEcsZUFBZSxLQUFLTSxhQUFoSSxFQUErSSxRQUFRLEtBQUt6QixLQUFMLENBQVdpQixNQUFsSztBQU5GLFNBREY7QUFVRCxPQWhCTSxNQWdCQTtBQUNMLGVBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxXQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxrQkFBZjtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxnQkFBSyxJQUFJLEtBQUtqQixLQUFMLENBQVdxQixLQUFYLEtBQXFCLFNBQXJCLElBQWtDLEtBQUtyQixLQUFMLENBQVdxQixLQUFYLEtBQXFCLE9BQXZELEdBQWlFLGVBQWpFLEdBQW1GLGtCQUE1RixFQUFnSCxXQUFVLGNBQTFILEVBQXlJLFNBQVMsaUJBQUNvRSxDQUFEO0FBQUEseUJBQU8sT0FBSzdGLFFBQUwsQ0FBYyxFQUFDeUIsT0FBTyxPQUFSLEVBQWQsQ0FBUDtBQUFBLGlCQUFsSjtBQUFBO0FBQUEsYUFERjtBQUlFO0FBQUE7QUFBQSxnQkFBSyxJQUFJLEtBQUtyQixLQUFMLENBQVdxQixLQUFYLEtBQXFCLE9BQXJCLEdBQStCLGVBQS9CLEdBQWlELGtCQUExRCxFQUE4RSxXQUFVLGNBQXhGLEVBQXVHLFNBQVMsaUJBQUNvRSxDQUFEO0FBQUEseUJBQU8sT0FBSzdGLFFBQUwsQ0FBYyxFQUFDeUIsT0FBTyxPQUFSLEVBQWQsQ0FBUDtBQUFBLGlCQUFoSDtBQUFBO0FBQUE7QUFKRixXQUZGO0FBVUU7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmLEVBQTZCLFNBQVMsaUJBQUNvRSxDQUFEO0FBQUEsdUJBQU8sT0FBS0MsUUFBTCxFQUFQO0FBQUEsZUFBdEM7QUFBQTtBQUFBO0FBVkYsU0FERjtBQWdCRDtBQUNGOzs7O0VBaGJlQyxNQUFNQyxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMubG9jayA9IG5ldyBBdXRoMExvY2tQYXNzd29yZGxlc3MoJ2VhRHpMbUFMeGI3ZnZ4UWhWS1RreFc4ckVEdE1uR1pEJywgJ2RhbmNoLmF1dGgwLmNvbScpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgIH0sICgpID0+IHtcbiAgICAgIHRoaXMubG9jay5nZXRQcm9maWxlKHRoaXMuc3RhdGUuaWRUb2tlbiwgKGVyciwgcHJvZikgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VyaWQ6IHByb2YudXNlcl9pZCxcbiAgICAgICAgICBwcm9maWxlOiBwcm9mXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgICB0aGlzLmZldGNoVXNlcm5hbWUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB1c2VyRGF0YSA9IHt9O1xuICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2YudXNlcl9pZDtcbiAgICAgICAgdXNlckRhdGEuZW1haWwgPSBwcm9mLmVtYWlsO1xuICAgICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtYXN0ZXJMaXN0OiBbXSxcbiAgICAgIG5hdkxpc3Q6IFtdLFxuICAgICAgZGlzcGxheUxpc3Q6IFtdLFxuICAgICAgbGlzdGlkOiAxLCAvL2RlZmF1bHQgLSBuZWVkIHRvIGNoYW5nZSBpdCBiYXNlZCBvbiB3aGVuIHVzZXIgbG9ncyBpblxuICAgICAgdXNlcmlkOiAnJywgLy90ZW1wb3JhcmlseVxuICAgICAgY3JlYXRlRGlzcGxheWVkOiAnbm9uZScsXG4gICAgICBzaGFyZURpc3BsYXllZDogJ25vbmUnLFxuICAgICAgdXNlcm5hbWU6ICcnLFxuICAgICAgbG9naW46ICdkZWZhdWx0J1xuICAgIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBMSVNUIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBcbiAgICAvLyBjb250cm9scyBpZiBkaXNwbGF5IGZvciBhZGRpbmcgYSBuZXcgbGlzdCBpcyB2aXNpYmxlXG4gICAgdGhpcy5kaXNwbGF5TmV3TGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdibG9jaydcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmhpZGVOZXdMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNyZWF0ZURpc3BsYXllZDogJ25vbmUnXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwbGF5U2hhcmVMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNoYXJlRGlzcGxheWVkOiAnYmxvY2snXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlU2hhcmVMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmZldGNoTGlzdHMgPSAoKSA9PiB7XG4gICAgICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgICB2YXIgZ2V0VXJsID0gYC9saXN0cy8ke3RoaXMuc3RhdGUudXNlcmlkfWA7XG4gICAgICBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGRpc3BsYXlMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiB2YWwubGlzdGlkIDwgbWVtby5saXN0aWQgPyB2YWwgOiBtZW1vO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGRpc3BsYXlMaXN0Lmxpc3RpZCxcbiAgICAgICAgICBsaXN0bmFtZTogZGlzcGxheUxpc3QubGlzdG5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gdmlzdWFsbHkgd2hhdCBkbyB5b3Ugc2VlLCBkb2VzIG5vdCBjaGFuZ2UgbWFzdGVyTGlzdCBvciBuYXZMaXN0XG4gICAgdGhpcy51cGRhdGVMaXN0aWQgPSAoaWQsIGxpc3RuYW1lKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGlzdGlkOiBpZCxcbiAgICAgICAgbGlzdG5hbWU6IGxpc3RuYW1lXG4gICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgfTtcblxuICAgIC8vIHBvc3RzIGEgbmV3IGxpc3QgYW5kIGdldHMgYWxsIGxpc3RzIGFsbG93cyAtIGZvbGxvdyByb3V0ZSB0byBzZWVcbiAgICB0aGlzLmFkZExpc3QgPSAobmV3TGlzdCkgPT4ge1xuICAgICAgZmV0Y2goJy9saXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TGlzdClcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5saXN0aWQsIG1lbW8pO1xuICAgICAgICB9LCAtSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhLFxuICAgICAgICAgIGxpc3RpZDogYWN0aXZlTGlzdFxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxldGVMaXN0ID0gKGxpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobGlzdClcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgYWN0aXZlTGlzdCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgodmFsLmlkLCBtZW1vKTtcbiAgICAgICAgfSwgLUluZmluaXR5KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGFjdGl2ZUxpc3RcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2hhcmVMaXN0ID0gKHNoYXJlRGF0YU9iaikgPT4ge1xuICAgICAgZmV0Y2goJy91c2VybGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNoYXJlRGF0YU9iailcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBJVEVNIENIQU5HRVMgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMudXBkYXRlUXVhbnQgPSAoaXRlbSwgYWRkT3JTdWIpID0+IHtcbiAgICAgIGlmIChhZGRPclN1YiA9PT0gJ2FkZCcpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSsrO1xuICAgICAgfSBlbHNlIGlmIChhZGRPclN1YiA9PT0gJ3N1YicpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IE1hdGgubWF4KGl0ZW0ucXVhbnRpdHkgLSAxLCAwKTtcbiAgICAgIH1cbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmFkZEl0ZW0gPSAobmV3SXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3SXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmRlbGV0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLyAgIFVTRVIgUkVMQVRFRCAgICAgLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgdGhpcy5mZXRjaFVzZXJuYW1lID0gKCkgPT4ge1xuICAgICAgLy8gdXNlcmlkIGlzIGJlaW5nIHBhc3NlZCBvbiBpbiBVUkwsIHVsdGltYXRlbHkgcmVmYWN0b3Igb3VyIHdoZW4gYXV0aCB0b2tlbiBpcyBpbiBwbGFjZVxuICAgICAgdmFyIGdldFVybCA9IGAvdXNlcm5hbWUvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgICAgZmV0Y2goZ2V0VXJsKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJuYW1lOiBkYXRhLnVzZXJuYW1lXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2F2ZVVzZXJuYW1lID0gKHVzZXJEYXRhKSA9PiB7XG4gICAgICBmZXRjaCgnL3VzZXJzJywge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChib2R5KSA9PiBib2R5Lmpzb24oKSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcm5hbWU6IHJlcy51c2VybmFtZSxcbiAgICAgICAgICBlcnJvcjogcmVzLmVycm9yXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZygnZXJyMHInLCBlcnIpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5sb2dPdXQgPSAoKSA9PiB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaWRfdG9rZW4nKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpZFRva2VuOiAnJyxcbiAgICAgICAgdXNlcmlkOiAnJyxcbiAgICAgICAgdXNlcm5hbWU6ICcnXG4gICAgICB9KTtcbiAgICB9O1xuXG4gIH1cblxuICAvLyBkZWxldGVJdGVtKGl0ZW0pIHtcbiAgLy8gICBmZXRjaCgnL2l0ZW1zJywge1xuICAvLyAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgLy8gICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgLy8gICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAvLyAgICAgfSxcbiAgLy8gICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gIC8vICAgfSlcbiAgLy8gICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gIC8vICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gIC8vICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgLy8gICB9KVxuICAvLyB9XG5cbiAgYWRkVXNlcih1c2VyRGF0YSkge1xuICAgIGZldGNoKCcvdXNlcnMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKVxuICAgIH0pXG4gICAgLnRoZW4oKGJvZHkpID0+IGJvZHkuanNvbigpKVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB1c2VybmFtZTogcmVzLnVzZXJuYW1lXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZygnZXJyMHInLCBlcnIpKTtcbiAgfVxuXG4gIGZldGNoSXRlbXMoKSB7XG4gICAgdmFyIGdldFVybCA9IGAvaXRlbXMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgIGZldGNoKGdldFVybClcbiAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgLy8gc2V0IHN0YXRlIHdpdGggaXRcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGdvdCBhbGwgaXRlbXMgYW5kIGZpbHRlciBmb3IgZGVsZXRlZCBpdGVtc1xuICBtYWtlRGlzcGxheURhdGEobGlzdGlkID0gdGhpcy5zdGF0ZS5saXN0aWQsIGRlbGV0ZWRTdGF0dXMgPSBmYWxzZSkge1xuICAgIHZhciBkaXNwbGF5TGlzdCA9IHRoaXMuc3RhdGUubWFzdGVyTGlzdC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5saXN0aWQgPT09IGxpc3RpZCAmJiBlbnRyeS5kZWxldGVkID09PSBkZWxldGVkU3RhdHVzKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRpc3BsYXlMaXN0OiBkaXNwbGF5TGlzdFxuICAgIH0pO1xuICB9XG5cbiAgc2hvd0xvY2soKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUubG9naW4gPT09ICdwaG9uZScpIHtcbiAgICAgIC8vIHNtc1xuICAgICAgdGhpcy5sb2NrLnNtcygoZXJyLCBwcm9maWxlLCBpZFRva2VuLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgIC8vIHNldCBKV1Qgb24gbG9jYWxzdG9yYWdlXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbik7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB1c2VyaWQ6IHByb2ZpbGUudXNlcl9pZCxcbiAgICAgICAgICAgIHByb2ZpbGU6IHByb2ZpbGUsXG4gICAgICAgICAgICAvLyByZWxpZXMgb24gbG9jYWwgc3RvcmFnZSwgdHJpZ2dlcnMgcmVuZGVyKClcbiAgICAgICAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hVc2VybmFtZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGFkZCB1c2VyIHRvIGRiXG4gICAgICAgICAgdmFyIHVzZXJEYXRhID0ge307XG4gICAgICAgICAgdXNlckRhdGEuaWQgPSBwcm9maWxlLnVzZXJfaWQ7XG4gICAgICAgICAgdXNlckRhdGEuZW1haWwgPSBwcm9maWxlLmVtYWlsO1xuICAgICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPcGVuIHRoZSBsb2NrIGluIEVtYWlsIENvZGUgbW9kZSB3aXRoIHRoZSBhYmlsaXR5IHRvIGhhbmRsZSB0aGUgYXV0aGVudGljYXRpb24gaW4gcGFnZVxuICAgICAgdGhpcy5sb2NrLmVtYWlsY29kZSgoZXJyLCBwcm9maWxlLCBpZFRva2VuLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgIC8vIHNldCBKV1Qgb24gbG9jYWxzdG9yYWdlXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbik7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB1c2VyaWQ6IHByb2ZpbGUudXNlcl9pZCxcbiAgICAgICAgICAgIHByb2ZpbGU6IHByb2ZpbGUsXG4gICAgICAgICAgICAvLyByZWxpZXMgb24gbG9jYWwgc3RvcmFnZSwgdHJpZ2dlcnMgcmVuZGVyKClcbiAgICAgICAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hVc2VybmFtZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGFkZCB1c2VyIHRvIGRiXG4gICAgICAgICAgdmFyIHVzZXJEYXRhID0ge307XG4gICAgICAgICAgdXNlckRhdGEuaWQgPSBwcm9maWxlLnVzZXJfaWQ7XG4gICAgICAgICAgdXNlckRhdGEuZW1haWwgPSBwcm9maWxlLmVtYWlsO1xuICAgICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgZ2V0SWRUb2tlbigpIHtcbiAgICAvLyBGaXJzdCwgY2hlY2sgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIEpXVCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgdmFyIGlkVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKTtcbiAgICB2YXIgYXV0aEhhc2ggPSB0aGlzLmxvY2sucGFyc2VIYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBKV1QgaW4gbG9jYWwgc3RvcmFnZSBhbmQgdGhlcmUgaXMgb25lIGluIHRoZSBVUkwgaGFzaCxcbiAgICAvLyBzYXZlIGl0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBpZiAoIWlkVG9rZW4gJiYgYXV0aEhhc2gpIHtcbiAgICAgIGlmIChhdXRoSGFzaC5pZF90b2tlbikge1xuICAgICAgICBpZFRva2VuID0gYXV0aEhhc2guaWRfdG9rZW47XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGF1dGhIYXNoLmlkX3Rva2VuKTtcbiAgICAgIH1cbiAgICAgIGlmIChhdXRoSGFzaC5lcnJvcikge1xuICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIGNvbmRpdGlvbnNcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHNpZ25pbmcgaW4nLCBhdXRoSGFzaCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpZFRva2VuO1xuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgLy8gaWYgaWR0b2tlbiAmIHVzZXJuYW1lIGV4aXN0XG4gICAgaWYgKHRoaXMuc3RhdGUuaWRUb2tlbiAmJiAhdGhpcy5zdGF0ZS51c2VybmFtZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2PkZldGNoaW5nIHlvdXIgZGF0YS4uLjwvZGl2PlxuICAgICAgICAgIDxVc2VybmFtZSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBzYXZlVXNlcm5hbWU9e3RoaXMuc2F2ZVVzZXJuYW1lfSBlcnJvcj17dGhpcy5zdGF0ZS5lcnJvcn0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmlkVG9rZW4gJiZcbiAgICAgIC8vIGlkZWFsbHkgeW91IGNhbiBicmluZyBpbiBhIGxpYnJhcnkgZm9yIHRoaXMgaWYgeW91IG5lZWQgdG8gZG8gaXQgYSBsb3RcbiAgICAgIC8vIGV4cGlyZSBkYXRlIG9uIHRva2VuIGV4aXN0c1xuICAgICAgSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0aGlzLnN0YXRlLmlkVG9rZW4uc3BsaXQoJy4nKVsxXSkpLmV4cCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAvLyBleHBpcmUgZGF0ZSBvbiB0b2tlbiBpcyBtb3JlIHRoYW4gY3VycmVudCB0aW1lXG4gICAgICBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuc3RhdGUuaWRUb2tlbi5zcGxpdCgnLicpWzFdKSkuZXhwID4gRGF0ZS5ub3coKSAvIDEwMDApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPEhlYWRlciB1c2VybmFtZT17dGhpcy5zdGF0ZS51c2VybmFtZX0gbG9nT3V0PXt0aGlzLmxvZ091dH0vPlxuICAgICAgICAgIDxOZXdMaXN0IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gY3JlYXRlRGlzcGxheWVkPXt0aGlzLnN0YXRlLmNyZWF0ZURpc3BsYXllZH0gaGlkZU5ld0xpc3Q9e3RoaXMuaGlkZU5ld0xpc3R9Lz5cbiAgICAgICAgICA8TmF2QmFyIHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IG5hdkxpc3Q9e3RoaXMuc3RhdGUubmF2TGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnVwZGF0ZUxpc3RpZH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gZGlzcGxheU5ld0xpc3Q9e3RoaXMuZGlzcGxheU5ld0xpc3R9Lz5cbiAgICAgICAgICA8VG9kb0xpc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGxpc3RuYW1lPXt0aGlzLnN0YXRlLmxpc3RuYW1lfSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnVwZGF0ZVF1YW50fSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSBhZGRJdGVtPXt0aGlzLmFkZEl0ZW19Lz5cbiAgICAgICAgICA8VG9kb0Nvc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUxpc3Q9e3RoaXMuZGVsZXRlTGlzdH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gZGlzcGxheVNoYXJlTGlzdD17dGhpcy5kaXNwbGF5U2hhcmVMaXN0fS8+XG4gICAgICAgICAgPFNoYXJlTGlzdCB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBzaGFyZUxpc3Q9e3RoaXMuc2hhcmVMaXN0fSBzaGFyZURpc3BsYXllZD17dGhpcy5zdGF0ZS5zaGFyZURpc3BsYXllZH0gaGlkZVNoYXJlTGlzdD17dGhpcy5oaWRlU2hhcmVMaXN0fSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luLWJveCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luLWJveC1oZWFkZXInPkxvZ2luIHRvIExpc3RpZnk8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5zdGF0ZS5sb2dpbiA9PT0gJ2RlZmF1bHQnIHx8IHRoaXMuc3RhdGUubG9naW4gPT09ICdwaG9uZScgPyAnc2VsZWN0ZWRMb2dpbicgOiAnbm90U2VsZWN0ZWRMb2dpbid9IGNsYXNzTmFtZT0nbG9naW4tc2VsZWN0JyBvbkNsaWNrPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7bG9naW46ICdwaG9uZSd9KX0+XG4gICAgICAgICAgICAgIFBob25lIE51bWJlclxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnN0YXRlLmxvZ2luID09PSAnZW1haWwnID8gJ3NlbGVjdGVkTG9naW4nIDogJ25vdFNlbGVjdGVkTG9naW4nfSBjbGFzc05hbWU9J2xvZ2luLXNlbGVjdCcgb25DbGljaz17KGUpID0+IHRoaXMuc2V0U3RhdGUoe2xvZ2luOiAnZW1haWwnfSl9PlxuICAgICAgICAgICAgICBFbWFpbCBBZGRyZXNzXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW4tY2xpY2snIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnNob3dMb2NrKCl9PlxuICAgICAgICAgICAgTG9naW5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG4iXX0=