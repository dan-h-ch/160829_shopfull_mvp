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
          if (prof) {
            _this2.setState({
              userid: prof.user_id,
              profile: prof,
              email_phone: prof.email
            }, function () {
              _this2.fetchLists();
              _this2.fetchItems();
            });
          }
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
      login: 'default',
      email_phone: ''
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
      console.log('fetchLists');
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

    // this.fetchUsername = () => {
    //   // userid is being passed on in URL, ultimately refactor our when auth token is in place
    //   var getUrl = `/username/${this.state.userid}`;
    //   fetch(getUrl)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.setState({
    //       username: data.username
    //     });
    //   });
    // };

    // this.saveUsername = (userData) => {
    //   fetch('/users', {
    //     method: 'PUT',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userData)
    //   })
    //   .then((body) => body.json())
    //   .then((res) => {
    //     this.setState({
    //       username: res.username,
    //       error: res.error
    //     });
    //   })
    //   .catch((err) => console.log('err0r', err));
    // };

    _this.logOut = function () {
      localStorage.removeItem('id_token');
      _this.setState({
        idToken: '',
        userid: '',
        masterList: [],
        navList: [],
        displayList: [],
        email_phone: ''
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
          email_phone: res.email_phone
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
            });
            // add user to db
            var userData = {};
            userData.id = profile.user_id;
            userData.email_phone = profile.email;
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
              email_phone: profile.email,
              // relies on local storage, triggers render()
              idToken: _this5.getIdToken()
            }, function () {
              this.fetchLists();
              this.fetchItems();
            });
            // this.setState({
            //   email_phone: profile.email
            // });
            // add user to db
            var userData = {};
            userData.id = profile.user_id;
            userData.email_phone = profile.email;
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

      // if idtoken
      if (this.state.idToken &&
      // ideally you can bring in a library for this if you need to do it a lot
      // expire date on token exists
      JSON.parse(window.atob(this.state.idToken.split('.')[1])).exp !== undefined &&
      // expire date on token is more than current time
      JSON.parse(window.atob(this.state.idToken.split('.')[1])).exp > Date.now() / 1000) {
        return React.createElement(
          'div',
          null,
          React.createElement(Header, { email_phone: this.state.email_phone, logOut: this.logOut }),
          React.createElement(NewList, { userid: this.state.userid, addList: this.addList, createDisplayed: this.state.createDisplayed, hideNewList: this.hideNewList }),
          React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, updateListid: this.updateListid, listid: this.state.listid, displayNewList: this.displayNewList }),
          React.createElement(TodoList, { todoList: this.state.displayList, listname: this.state.listname, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid, listid: this.state.listid, addItem: this.addItem }),
          React.createElement(Bottom, { todoList: this.state.displayList, deleteList: this.deleteList, listid: this.state.listid, userid: this.state.userid, displayShareList: this.displayShareList }),
          React.createElement(ShareList, { userid: this.state.userid, shareList: this.shareList, shareDisplayed: this.state.shareDisplayed, hideShareList: this.hideShareList, listid: this.state.listid, listname: this.state.listname })
        );
      } else {
        return React.createElement(
          'div',
          { className: 'login-box' },
          React.createElement(
            'div',
            { className: 'login-box-header' },
            'Let\'s Listify!'
          ),
          React.createElement(
            'div',
            { className: 'login-box-body' },
            'Select Login Option'
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
            'Let\'s Go! >>'
          )
        );
      }
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsImxvY2siLCJBdXRoMExvY2tQYXNzd29yZGxlc3MiLCJzZXRTdGF0ZSIsImlkVG9rZW4iLCJnZXRJZFRva2VuIiwiZ2V0UHJvZmlsZSIsInN0YXRlIiwiZXJyIiwicHJvZiIsInVzZXJpZCIsInVzZXJfaWQiLCJwcm9maWxlIiwiZW1haWxfcGhvbmUiLCJlbWFpbCIsImZldGNoTGlzdHMiLCJmZXRjaEl0ZW1zIiwicHJvcHMiLCJtYXN0ZXJMaXN0IiwibmF2TGlzdCIsImRpc3BsYXlMaXN0IiwibGlzdGlkIiwiY3JlYXRlRGlzcGxheWVkIiwic2hhcmVEaXNwbGF5ZWQiLCJsb2dpbiIsImRpc3BsYXlOZXdMaXN0IiwiaGlkZU5ld0xpc3QiLCJkaXNwbGF5U2hhcmVMaXN0IiwiaGlkZVNoYXJlTGlzdCIsImNvbnNvbGUiLCJsb2ciLCJnZXRVcmwiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInJlZHVjZSIsIm1lbW8iLCJ2YWwiLCJsaXN0bmFtZSIsInVwZGF0ZUxpc3RpZCIsImlkIiwibWFrZURpc3BsYXlEYXRhIiwiYWRkTGlzdCIsIm5ld0xpc3QiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhY3RpdmVMaXN0IiwiTWF0aCIsIm1heCIsIkluZmluaXR5IiwiZGVsZXRlTGlzdCIsImxpc3QiLCJzaGFyZUxpc3QiLCJzaGFyZURhdGFPYmoiLCJ1cGRhdGVRdWFudCIsIml0ZW0iLCJhZGRPclN1YiIsInF1YW50aXR5IiwiYWRkSXRlbSIsIm5ld0l0ZW0iLCJkZWxldGVJdGVtIiwibG9nT3V0IiwibG9jYWxTdG9yYWdlIiwicmVtb3ZlSXRlbSIsInVzZXJEYXRhIiwiY2F0Y2giLCJkZWxldGVkU3RhdHVzIiwiZmlsdGVyIiwiZW50cnkiLCJkZWxldGVkIiwic21zIiwic2V0SXRlbSIsImFkZFVzZXIiLCJlbWFpbGNvZGUiLCJnZXRJdGVtIiwiYXV0aEhhc2giLCJwYXJzZUhhc2giLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2giLCJpZF90b2tlbiIsImVycm9yIiwicGFyc2UiLCJhdG9iIiwic3BsaXQiLCJleHAiLCJ1bmRlZmluZWQiLCJEYXRlIiwibm93IiwiZSIsInNob3dMb2NrIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsRzs7Ozs7eUNBRWlCO0FBQ25CLFdBQUtDLElBQUwsR0FBWSxJQUFJQyxxQkFBSixDQUEwQixrQ0FBMUIsRUFBOEQsaUJBQTlELENBQVo7QUFDRDs7O3dDQUVtQjtBQUFBOztBQUNsQixXQUFLQyxRQUFMLENBQWM7QUFDWkMsaUJBQVMsS0FBS0MsVUFBTDtBQURHLE9BQWQsRUFFRyxZQUFNO0FBQ1AsZUFBS0osSUFBTCxDQUFVSyxVQUFWLENBQXFCLE9BQUtDLEtBQUwsQ0FBV0gsT0FBaEMsRUFBeUMsVUFBQ0ksR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDdEQsY0FBSUEsSUFBSixFQUFVO0FBQ1IsbUJBQUtOLFFBQUwsQ0FBYztBQUNaTyxzQkFBUUQsS0FBS0UsT0FERDtBQUVaQyx1QkFBU0gsSUFGRztBQUdaSSwyQkFBYUosS0FBS0s7QUFITixhQUFkLEVBSUcsWUFBTTtBQUNQLHFCQUFLQyxVQUFMO0FBQ0EscUJBQUtDLFVBQUw7QUFDRCxhQVBEO0FBUUQ7QUFDRixTQVhEO0FBWUQsT0FmRDtBQWdCRDs7O0FBRUQsZUFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYQSxLQURXOztBQUdqQixVQUFLVixLQUFMLEdBQWE7QUFDWFcsa0JBQVksRUFERDtBQUVYQyxlQUFTLEVBRkU7QUFHWEMsbUJBQWEsRUFIRjtBQUlYQyxjQUFRLENBSkcsRUFJQTtBQUNYWCxjQUFRLEVBTEcsRUFLQztBQUNaWSx1QkFBaUIsTUFOTjtBQU9YQyxzQkFBZ0IsTUFQTDtBQVFYQyxhQUFPLFNBUkk7QUFTWFgsbUJBQWE7QUFURixLQUFiOztBQVlKO0FBQ0E7QUFDQTs7QUFFSTtB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QU5GLFNBREY7QUFVRCxPQWhCRCxNQWdCTztBQUNMLGVBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxXQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxrQkFBZjtBQUFBO0FBQUEsV0FERjtBQUVFO0FBQUE7QUFBQSxjQUFLLFdBQVUsZ0JBQWY7QUFBQTtBQUFBLFdBRkY7QUFHRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsZ0JBQUssSUFBSSxLQUFLakMsS0FBTCxDQUFXaUIsS0FBWCxLQUFxQixTQUFyQixJQUFrQyxLQUFLakIsS0FBTCxDQUFXaUIsS0FBWCxLQUFxQixPQUF2RCxHQUFpRSxlQUFqRSxHQUFtRixrQkFBNUYsRUFBZ0gsV0FBVSxjQUExSCxFQUF5SSxTQUFTLGlCQUFDc0UsQ0FBRDtBQUFBLHlCQUFPLE9BQUszRixRQUFMLENBQWMsRUFBQ3FCLE9BQU8sT0FBUixFQUFkLENBQVA7QUFBQSxpQkFBbEo7QUFBQTtBQUFBLGFBREY7QUFJRTtBQUFBO0FBQUEsZ0JBQUssSUFBSSxLQUFLakIsS0FBTCxDQUFXaUIsS0FBWCxLQUFxQixPQUFyQixHQUErQixlQUEvQixHQUFpRCxrQkFBMUQsRUFBOEUsV0FBVSxjQUF4RixFQUF1RyxTQUFTLGlCQUFDc0UsQ0FBRDtBQUFBLHlCQUFPLE9BQUszRixRQUFMLENBQWMsRUFBQ3FCLE9BQU8sT0FBUixFQUFkLENBQVA7QUFBQSxpQkFBaEg7QUFBQTtBQUFBO0FBSkYsV0FIRjtBQVdFO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZixFQUE2QixTQUFTLGlCQUFDc0UsQ0FBRDtBQUFBLHVCQUFPLE9BQUtDLFFBQUwsRUFBUDtBQUFBLGVBQXRDO0FBQUE7QUFBQTtBQVhGLFNBREY7QUFpQkQ7QUFDRjs7OztFQS9hZUMsTUFBTUMsUyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrUGFzc3dvcmRsZXNzKCdlYUR6TG1BTHhiN2Z2eFFoVktUa3hXOHJFRHRNbkdaRCcsICdkYW5jaC5hdXRoMC5jb20nKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLmxvY2suZ2V0UHJvZmlsZSh0aGlzLnN0YXRlLmlkVG9rZW4sIChlcnIsIHByb2YpID0+IHtcbiAgICAgICAgaWYgKHByb2YpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHVzZXJpZDogcHJvZi51c2VyX2lkLFxuICAgICAgICAgICAgcHJvZmlsZTogcHJvZixcbiAgICAgICAgICAgIGVtYWlsX3Bob25lOiBwcm9mLmVtYWlsXG4gICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtYXN0ZXJMaXN0OiBbXSxcbiAgICAgIG5hdkxpc3Q6IFtdLFxuICAgICAgZGlzcGxheUxpc3Q6IFtdLFxuICAgICAgbGlzdGlkOiAxLCAvL2RlZmF1bHQgLSBuZWVkIHRvIGNoYW5nZSBpdCBiYXNlZCBvbiB3aGVuIHVzZXIgbG9ncyBpblxuICAgICAgdXNlcmlkOiAnJywgLy90ZW1wb3JhcmlseVxuICAgICAgY3JlYXRlRGlzcGxheWVkOiAnbm9uZScsXG4gICAgICBzaGFyZURpc3BsYXllZDogJ25vbmUnLFxuICAgICAgbG9naW46ICdkZWZhdWx0JyxcbiAgICAgIGVtYWlsX3Bob25lOiAnJ1xuICAgIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBMSVNUIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBcbiAgICAvLyBjb250cm9scyBpZiBkaXNwbGF5IGZvciBhZGRpbmcgYSBuZXcgbGlzdCBpcyB2aXNpYmxlXG4gICAgdGhpcy5kaXNwbGF5TmV3TGlzdCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdibG9jaydcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmhpZGVOZXdMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNyZWF0ZURpc3BsYXllZDogJ25vbmUnXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kaXNwbGF5U2hhcmVMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNoYXJlRGlzcGxheWVkOiAnYmxvY2snXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlU2hhcmVMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmZldGNoTGlzdHMgPSAoKSA9PiB7XG4gICAgICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgICBjb25zb2xlLmxvZygnZmV0Y2hMaXN0cycpO1xuICAgICAgdmFyIGdldFVybCA9IGAvbGlzdHMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgICAgZmV0Y2goZ2V0VXJsKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBkaXNwbGF5TGlzdCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gdmFsLmxpc3RpZCA8IG1lbW8ubGlzdGlkID8gdmFsIDogbWVtbztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBkaXNwbGF5TGlzdC5saXN0aWQsXG4gICAgICAgICAgbGlzdG5hbWU6IGRpc3BsYXlMaXN0Lmxpc3RuYW1lXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIHZpc3VhbGx5IHdoYXQgZG8geW91IHNlZSwgZG9lcyBub3QgY2hhbmdlIG1hc3Rlckxpc3Qgb3IgbmF2TGlzdFxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkLCBsaXN0bmFtZSkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxpc3RpZDogaWQsXG4gICAgICAgIGxpc3RuYW1lOiBsaXN0bmFtZVxuICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgIH07XG5cbiAgICAvLyBwb3N0cyBhIG5ldyBsaXN0IGFuZCBnZXRzIGFsbCBsaXN0cyBhbGxvd3MgLSBmb2xsb3cgcm91dGUgdG8gc2VlXG4gICAgdGhpcy5hZGRMaXN0ID0gKG5ld0xpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHZhciBhY3RpdmVMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwubGlzdGlkLCBtZW1vKTtcbiAgICAgICAgfSwgLUluZmluaXR5KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGFjdGl2ZUxpc3RcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlTGlzdCA9IChsaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbyk7XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnNoYXJlTGlzdCA9IChzaGFyZURhdGFPYmopID0+IHtcbiAgICAgIGZldGNoKCcvdXNlcmxpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzaGFyZURhdGFPYmopXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgSVRFTSBDSEFOR0VTICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB0aGlzLnVwZGF0ZVF1YW50ID0gKGl0ZW0sIGFkZE9yU3ViKSA9PiB7XG4gICAgICBpZiAoYWRkT3JTdWIgPT09ICdhZGQnKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkrKztcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09ICdzdWInKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkgPSBNYXRoLm1heChpdGVtLnF1YW50aXR5IC0gMSwgMCk7XG4gICAgICB9XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hZGRJdGVtID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxldGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBVU0VSIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8vIHRoaXMuZmV0Y2hVc2VybmFtZSA9ICgpID0+IHtcbiAgICAvLyAgIC8vIHVzZXJpZCBpcyBiZWluZyBwYXNzZWQgb24gaW4gVVJMLCB1bHRpbWF0ZWx5IHJlZmFjdG9yIG91ciB3aGVuIGF1dGggdG9rZW4gaXMgaW4gcGxhY2VcbiAgICAvLyAgIHZhciBnZXRVcmwgPSBgL3VzZXJuYW1lLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICAvLyAgIGZldGNoKGdldFVybClcbiAgICAvLyAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgLy8gICAudGhlbigoZGF0YSkgPT4ge1xuICAgIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICB1c2VybmFtZTogZGF0YS51c2VybmFtZVxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH07XG5cbiAgICAvLyB0aGlzLnNhdmVVc2VybmFtZSA9ICh1c2VyRGF0YSkgPT4ge1xuICAgIC8vICAgZmV0Y2goJy91c2VycycsIHtcbiAgICAvLyAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAvLyAgICAgaGVhZGVyczoge1xuICAgIC8vICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgLy8gICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSlcbiAgICAvLyAgIH0pXG4gICAgLy8gICAudGhlbigoYm9keSkgPT4gYm9keS5qc29uKCkpXG4gICAgLy8gICAudGhlbigocmVzKSA9PiB7XG4gICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgIHVzZXJuYW1lOiByZXMudXNlcm5hbWUsXG4gICAgLy8gICAgICAgZXJyb3I6IHJlcy5lcnJvclxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pXG4gICAgLy8gICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coJ2VycjByJywgZXJyKSk7XG4gICAgLy8gfTtcblxuICAgIHRoaXMubG9nT3V0ID0gKCkgPT4ge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaWRUb2tlbjogJycsXG4gICAgICAgIHVzZXJpZDogJycsXG4gICAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgICBuYXZMaXN0OiBbXSxcbiAgICAgICAgZGlzcGxheUxpc3Q6IFtdLFxuICAgICAgICBlbWFpbF9waG9uZTogJydcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgfVxuXG4gIC8vIGRlbGV0ZUl0ZW0oaXRlbSkge1xuICAvLyAgIGZldGNoKCcvaXRlbXMnLCB7XG4gIC8vICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAvLyAgICAgaGVhZGVyczoge1xuICAvLyAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAvLyAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gIC8vICAgICB9LFxuICAvLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgLy8gICB9KVxuICAvLyAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgLy8gICAudGhlbigoZGF0YSkgPT4ge1xuICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgLy8gICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAvLyAgIH0pXG4gIC8vIH1cblxuICBhZGRVc2VyKHVzZXJEYXRhKSB7XG4gICAgZmV0Y2goJy91c2VycycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpXG4gICAgfSlcbiAgICAudGhlbigoYm9keSkgPT4gYm9keS5qc29uKCkpXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGVtYWlsX3Bob25lOiByZXMuZW1haWxfcGhvbmVcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKCdlcnIwcicsIGVycikpO1xuICB9XG5cbiAgZmV0Y2hJdGVtcygpIHtcbiAgICB2YXIgZ2V0VXJsID0gYC9pdGVtcy8ke3RoaXMuc3RhdGUudXNlcmlkfWA7XG4gICAgZmV0Y2goZ2V0VXJsKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSlcbiAgICAvLyBzZXQgc3RhdGUgd2l0aCBpdFxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gZ290IGFsbCBpdGVtcyBhbmQgZmlsdGVyIGZvciBkZWxldGVkIGl0ZW1zXG4gIG1ha2VEaXNwbGF5RGF0YShsaXN0aWQgPSB0aGlzLnN0YXRlLmxpc3RpZCwgZGVsZXRlZFN0YXR1cyA9IGZhbHNlKSB7XG4gICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gbGlzdGlkICYmIGVudHJ5LmRlbGV0ZWQgPT09IGRlbGV0ZWRTdGF0dXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGlzcGxheUxpc3Q6IGRpc3BsYXlMaXN0XG4gICAgfSk7XG4gIH1cblxuICBzaG93TG9jaygpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5sb2dpbiA9PT0gJ3Bob25lJykge1xuICAgICAgLy8gc21zXG4gICAgICB0aGlzLmxvY2suc21zKChlcnIsIHByb2ZpbGUsIGlkVG9rZW4sIHN0YXRlKSA9PiB7XG4gICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgLy8gc2V0IEpXVCBvbiBsb2NhbHN0b3JhZ2VcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBpZFRva2VuKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHVzZXJpZDogcHJvZmlsZS51c2VyX2lkLFxuICAgICAgICAgICAgcHJvZmlsZTogcHJvZmlsZSxcbiAgICAgICAgICAgIC8vIHJlbGllcyBvbiBsb2NhbCBzdG9yYWdlLCB0cmlnZ2VycyByZW5kZXIoKVxuICAgICAgICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIGFkZCB1c2VyIHRvIGRiXG4gICAgICAgICAgdmFyIHVzZXJEYXRhID0ge307XG4gICAgICAgICAgdXNlckRhdGEuaWQgPSBwcm9maWxlLnVzZXJfaWQ7XG4gICAgICAgICAgdXNlckRhdGEuZW1haWxfcGhvbmUgPSBwcm9maWxlLmVtYWlsO1xuICAgICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPcGVuIHRoZSBsb2NrIGluIEVtYWlsIENvZGUgbW9kZSB3aXRoIHRoZSBhYmlsaXR5IHRvIGhhbmRsZSB0aGUgYXV0aGVudGljYXRpb24gaW4gcGFnZVxuICAgICAgdGhpcy5sb2NrLmVtYWlsY29kZSgoZXJyLCBwcm9maWxlLCBpZFRva2VuLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgIC8vIHNldCBKV1Qgb24gbG9jYWxzdG9yYWdlXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbik7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB1c2VyaWQ6IHByb2ZpbGUudXNlcl9pZCxcbiAgICAgICAgICAgIC8vIC8vIHByb2ZpbGUgaXMgcmV0dXJuIGZyb20gYXV0aDAgLSBoYXMgc29tZSBkYXRhIGF2YWlsYWJsZVxuICAgICAgICAgICAgLy8gcHJvZmlsZTogcHJvZmlsZSxcbiAgICAgICAgICAgIGVtYWlsX3Bob25lOiBwcm9maWxlLmVtYWlsLFxuICAgICAgICAgICAgLy8gcmVsaWVzIG9uIGxvY2FsIHN0b3JhZ2UsIHRyaWdnZXJzIHJlbmRlcigpXG4gICAgICAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAvLyAgIGVtYWlsX3Bob25lOiBwcm9maWxlLmVtYWlsXG4gICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7fTtcbiAgICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2ZpbGUudXNlcl9pZDtcbiAgICAgICAgICB1c2VyRGF0YS5lbWFpbF9waG9uZSA9IHByb2ZpbGUuZW1haWw7XG4gICAgICAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBnZXRJZFRva2VuKCkge1xuICAgIC8vIEZpcnN0LCBjaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgSldUIGluIGxvY2FsIHN0b3JhZ2VcbiAgICB2YXIgaWRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpO1xuICAgIHZhciBhdXRoSGFzaCA9IHRoaXMubG9jay5wYXJzZUhhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgIC8vIElmIHRoZXJlIGlzIG5vIEpXVCBpbiBsb2NhbCBzdG9yYWdlIGFuZCB0aGVyZSBpcyBvbmUgaW4gdGhlIFVSTCBoYXNoLFxuICAgIC8vIHNhdmUgaXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGlmICghaWRUb2tlbiAmJiBhdXRoSGFzaCkge1xuICAgICAgaWYgKGF1dGhIYXNoLmlkX3Rva2VuKSB7XG4gICAgICAgIGlkVG9rZW4gPSBhdXRoSGFzaC5pZF90b2tlbjtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aEhhc2guaWRfdG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGF1dGhIYXNoLmVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgY29uZGl0aW9uc1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc2lnbmluZyBpbicsIGF1dGhIYXNoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkVG9rZW47XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBpZiBpZHRva2VuXG4gICAgaWYgKHRoaXMuc3RhdGUuaWRUb2tlbiAmJlxuICAgICAgLy8gaWRlYWxseSB5b3UgY2FuIGJyaW5nIGluIGEgbGlicmFyeSBmb3IgdGhpcyBpZiB5b3UgbmVlZCB0byBkbyBpdCBhIGxvdFxuICAgICAgLy8gZXhwaXJlIGRhdGUgb24gdG9rZW4gZXhpc3RzXG4gICAgICBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuc3RhdGUuaWRUb2tlbi5zcGxpdCgnLicpWzFdKSkuZXhwICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIC8vIGV4cGlyZSBkYXRlIG9uIHRva2VuIGlzIG1vcmUgdGhhbiBjdXJyZW50IHRpbWVcbiAgICAgIEpTT04ucGFyc2Uod2luZG93LmF0b2IodGhpcy5zdGF0ZS5pZFRva2VuLnNwbGl0KCcuJylbMV0pKS5leHAgPiBEYXRlLm5vdygpIC8gMTAwMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8SGVhZGVyIGVtYWlsX3Bob25lPXt0aGlzLnN0YXRlLmVtYWlsX3Bob25lfSBsb2dPdXQ9e3RoaXMubG9nT3V0fS8+XG4gICAgICAgICAgPE5ld0xpc3QgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gYWRkTGlzdD17dGhpcy5hZGRMaXN0fSBjcmVhdGVEaXNwbGF5ZWQ9e3RoaXMuc3RhdGUuY3JlYXRlRGlzcGxheWVkfSBoaWRlTmV3TGlzdD17dGhpcy5oaWRlTmV3TGlzdH0vPlxuICAgICAgICAgIDxOYXZCYXIgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gbmF2TGlzdD17dGhpcy5zdGF0ZS5uYXZMaXN0fSB1cGRhdGVMaXN0aWQ9e3RoaXMudXBkYXRlTGlzdGlkfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSBkaXNwbGF5TmV3TGlzdD17dGhpcy5kaXNwbGF5TmV3TGlzdH0vPlxuICAgICAgICAgIDxUb2RvTGlzdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gbGlzdG5hbWU9e3RoaXMuc3RhdGUubGlzdG5hbWV9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IGFkZEl0ZW09e3RoaXMuYWRkSXRlbX0vPlxuICAgICAgICAgIDxCb3R0b20gdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUxpc3Q9e3RoaXMuZGVsZXRlTGlzdH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gZGlzcGxheVNoYXJlTGlzdD17dGhpcy5kaXNwbGF5U2hhcmVMaXN0fS8+XG4gICAgICAgICAgPFNoYXJlTGlzdCB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBzaGFyZUxpc3Q9e3RoaXMuc2hhcmVMaXN0fSBzaGFyZURpc3BsYXllZD17dGhpcy5zdGF0ZS5zaGFyZURpc3BsYXllZH0gaGlkZVNoYXJlTGlzdD17dGhpcy5oaWRlU2hhcmVMaXN0fSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSBsaXN0bmFtZT17dGhpcy5zdGF0ZS5saXN0bmFtZX0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1ib3gnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1ib3gtaGVhZGVyJz5MZXQncyBMaXN0aWZ5ITwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1ib3gtYm9keSc+U2VsZWN0IExvZ2luIE9wdGlvbjwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnN0YXRlLmxvZ2luID09PSAnZGVmYXVsdCcgfHwgdGhpcy5zdGF0ZS5sb2dpbiA9PT0gJ3Bob25lJyA/ICdzZWxlY3RlZExvZ2luJyA6ICdub3RTZWxlY3RlZExvZ2luJ30gY2xhc3NOYW1lPSdsb2dpbi1zZWxlY3QnIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtsb2dpbjogJ3Bob25lJ30pfT5cbiAgICAgICAgICAgICAgUGhvbmUgTnVtYmVyXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMuc3RhdGUubG9naW4gPT09ICdlbWFpbCcgPyAnc2VsZWN0ZWRMb2dpbicgOiAnbm90U2VsZWN0ZWRMb2dpbid9IGNsYXNzTmFtZT0nbG9naW4tc2VsZWN0JyBvbkNsaWNrPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7bG9naW46ICdlbWFpbCd9KX0+XG4gICAgICAgICAgICAgIEVtYWlsIEFkZHJlc3NcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1jbGljaycgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+XG4gICAgICAgICAgICBMZXQncyBHbyEgPj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG4iXX0=