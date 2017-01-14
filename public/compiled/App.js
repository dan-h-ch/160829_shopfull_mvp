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
            email_phone: prof.email
          }, function () {
            _this2.fetchLists();
            _this2.fetchItems();
          });
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
        displayList: []
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsImxvY2siLCJBdXRoMExvY2tQYXNzd29yZGxlc3MiLCJzZXRTdGF0ZSIsImlkVG9rZW4iLCJnZXRJZFRva2VuIiwiZ2V0UHJvZmlsZSIsInN0YXRlIiwiZXJyIiwicHJvZiIsInVzZXJpZCIsInVzZXJfaWQiLCJwcm9maWxlIiwiZW1haWxfcGhvbmUiLCJlbWFpbCIsImZldGNoTGlzdHMiLCJmZXRjaEl0ZW1zIiwicHJvcHMiLCJtYXN0ZXJMaXN0IiwibmF2TGlzdCIsImRpc3BsYXlMaXN0IiwibGlzdGlkIiwiY3JlYXRlRGlzcGxheWVkIiwic2hhcmVEaXNwbGF5ZWQiLCJsb2dpbiIsImRpc3BsYXlOZXdMaXN0IiwiaGlkZU5ld0xpc3QiLCJkaXNwbGF5U2hhcmVMaXN0IiwiaGlkZVNoYXJlTGlzdCIsImdldFVybCIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwicmVkdWNlIiwibWVtbyIsInZhbCIsImxpc3RuYW1lIiwidXBkYXRlTGlzdGlkIiwiaWQiLCJtYWtlRGlzcGxheURhdGEiLCJhZGRMaXN0IiwibmV3TGlzdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnNvbGUiLCJsb2ciLCJhY3RpdmVMaXN0IiwiTWF0aCIsIm1heCIsIkluZmluaXR5IiwiZGVsZXRlTGlzdCIsImxpc3QiLCJzaGFyZUxpc3QiLCJzaGFyZURhdGFPYmoiLCJ1cGRhdGVRdWFudCIsIml0ZW0iLCJhZGRPclN1YiIsInF1YW50aXR5IiwiYWRkSXRlbSIsIm5ld0l0ZW0iLCJkZWxldGVJdGVtIiwibG9nT3V0IiwibG9jYWxTdG9yYWdlIiwicmVtb3ZlSXRlbSIsInVzZXJEYXRhIiwiY2F0Y2giLCJkZWxldGVkU3RhdHVzIiwiZmlsdGVyIiwiZW50cnkiLCJkZWxldGVkIiwic21zIiwic2V0SXRlbSIsImFkZFVzZXIiLCJlbWFpbGNvZGUiLCJnZXRJdGVtIiwiYXV0aEhhc2giLCJwYXJzZUhhc2giLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhhc2giLCJpZF90b2tlbiIsImVycm9yIiwicGFyc2UiLCJhdG9iIiwic3BsaXQiLCJleHAiLCJ1bmRlZmluZWQiLCJEYXRlIiwibm93IiwiZSIsInNob3dMb2NrIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsRzs7Ozs7eUNBRWlCO0FBQ25CLFdBQUtDLElBQUwsR0FBWSxJQUFJQyxxQkFBSixDQUEwQixrQ0FBMUIsRUFBOEQsaUJBQTlELENBQVo7QUFDRDs7O3dDQUVtQjtBQUFBOztBQUNsQixXQUFLQyxRQUFMLENBQWM7QUFDWkMsaUJBQVMsS0FBS0MsVUFBTDtBQURHLE9BQWQsRUFFRyxZQUFNO0FBQ1AsZUFBS0osSUFBTCxDQUFVSyxVQUFWLENBQXFCLE9BQUtDLEtBQUwsQ0FBV0gsT0FBaEMsRUFBeUMsVUFBQ0ksR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDdEQsaUJBQUtOLFFBQUwsQ0FBYztBQUNaTyxvQkFBUUQsS0FBS0UsT0FERDtBQUVaQyxxQkFBU0gsSUFGRztBQUdaSSx5QkFBYUosS0FBS0s7QUFITixXQUFkLEVBSUcsWUFBTTtBQUNQLG1CQUFLQyxVQUFMO0FBQ0EsbUJBQUtDLFVBQUw7QUFDRCxXQVBEO0FBUUQsU0FURDtBQVVELE9BYkQ7QUFjRDs7O0FBRUQsZUFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYQSxLQURXOztBQUdqQixVQUFLVixLQUFMLEdBQWE7QUFDWFcsa0JBQVksRUFERDtBQUVYQyxlQUFTLEVBRkU7QUFHWEMsbUJBQWEsRUFIRjtBQUlYQyxjQUFRLENBSkcsRUFJQTtBQUNYWCxjQUFRLEVBTEcsRUFLQztBQUNaWSx1QkFBaUIsTUFOTjtBQU9YQyxzQkFBZ0IsTUFQTDtBQVFYQyxhQUFPO0FBUkksS0FBYjs7QUFXSjtBQUNBO0FBQ0E7O0FBRUk7QUFDQSxVQUFLQyxjQUFMLEdBQXNCLFlBQU07QUFDMUIsWUFBS3RCLFFBQUws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Z0JBQUssSUFBSSxLQUFLZCxLQUFMLENBQVdpQixLQUFYLEtBQXFCLFNBQXJCLElBQWtDLEtBQUtqQixLQUFMLENBQVdpQixLQUFYLEtBQXFCLE9BQXZELEdBQWlFLGVBQWpFLEdBQW1GLGtCQUE1RixFQUFnSCxXQUFVLGNBQTFILEVBQXlJLFNBQVMsaUJBQUNzRSxDQUFEO0FBQUEseUJBQU8sT0FBSzNGLFFBQUwsQ0FBYyxFQUFDcUIsT0FBTyxPQUFSLEVBQWQsQ0FBUDtBQUFBLGlCQUFsSjtBQUFBO0FBQUEsYUFERjtBQUlFO0FBQUE7QUFBQSxnQkFBSyxJQUFJLEtBQUtqQixLQUFMLENBQVdpQixLQUFYLEtBQXFCLE9BQXJCLEdBQStCLGVBQS9CLEdBQWlELGtCQUExRCxFQUE4RSxXQUFVLGNBQXhGLEVBQXVHLFNBQVMsaUJBQUNzRSxDQUFEO0FBQUEseUJBQU8sT0FBSzNGLFFBQUwsQ0FBYyxFQUFDcUIsT0FBTyxPQUFSLEVBQWQsQ0FBUDtBQUFBLGlCQUFoSDtBQUFBO0FBQUE7QUFKRixXQUZGO0FBVUU7QUFBQTtBQUFBLGNBQUssV0FBVSxhQUFmLEVBQTZCLFNBQVMsaUJBQUNzRSxDQUFEO0FBQUEsdUJBQU8sT0FBS0MsUUFBTCxFQUFQO0FBQUEsZUFBdEM7QUFBQTtBQUFBO0FBVkYsU0FERjtBQWdCRDtBQUNGOzs7O0VBdGFlQyxNQUFNQyxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMubG9jayA9IG5ldyBBdXRoMExvY2tQYXNzd29yZGxlc3MoJ2VhRHpMbUFMeGI3ZnZ4UWhWS1RreFc4ckVEdE1uR1pEJywgJ2RhbmNoLmF1dGgwLmNvbScpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgIH0sICgpID0+IHtcbiAgICAgIHRoaXMubG9jay5nZXRQcm9maWxlKHRoaXMuc3RhdGUuaWRUb2tlbiwgKGVyciwgcHJvZikgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VyaWQ6IHByb2YudXNlcl9pZCxcbiAgICAgICAgICBwcm9maWxlOiBwcm9mLFxuICAgICAgICAgIGVtYWlsX3Bob25lOiBwcm9mLmVtYWlsXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBkaXNwbGF5TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsIC8vZGVmYXVsdCAtIG5lZWQgdG8gY2hhbmdlIGl0IGJhc2VkIG9uIHdoZW4gdXNlciBsb2dzIGluXG4gICAgICB1c2VyaWQ6ICcnLCAvL3RlbXBvcmFyaWx5XG4gICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdub25lJyxcbiAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZScsXG4gICAgICBsb2dpbjogJ2RlZmF1bHQnXG4gICAgfTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLyAgIExJU1QgUkVMQVRFRCAgICAgLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIFxuICAgIC8vIGNvbnRyb2xzIGlmIGRpc3BsYXkgZm9yIGFkZGluZyBhIG5ldyBsaXN0IGlzIHZpc2libGVcbiAgICB0aGlzLmRpc3BsYXlOZXdMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNyZWF0ZURpc3BsYXllZDogJ2Jsb2NrJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZU5ld0xpc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3JlYXRlRGlzcGxheWVkOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmRpc3BsYXlTaGFyZUxpc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hhcmVEaXNwbGF5ZWQ6ICdibG9jaydcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmhpZGVTaGFyZUxpc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hhcmVEaXNwbGF5ZWQ6ICdub25lJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZmV0Y2hMaXN0cyA9ICgpID0+IHtcbiAgICAgIC8vIHVzZXJpZCBpcyBiZWluZyBwYXNzZWQgb24gaW4gVVJMLCB1bHRpbWF0ZWx5IHJlZmFjdG9yIG91ciB3aGVuIGF1dGggdG9rZW4gaXMgaW4gcGxhY2VcbiAgICAgIHZhciBnZXRVcmwgPSBgL2xpc3RzLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICAgIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgZGlzcGxheUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHZhbC5saXN0aWQgPCBtZW1vLmxpc3RpZCA/IHZhbCA6IG1lbW87XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhLFxuICAgICAgICAgIGxpc3RpZDogZGlzcGxheUxpc3QubGlzdGlkLFxuICAgICAgICAgIGxpc3RuYW1lOiBkaXNwbGF5TGlzdC5saXN0bmFtZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyB2aXN1YWxseSB3aGF0IGRvIHlvdSBzZWUsIGRvZXMgbm90IGNoYW5nZSBtYXN0ZXJMaXN0IG9yIG5hdkxpc3RcbiAgICB0aGlzLnVwZGF0ZUxpc3RpZCA9IChpZCwgbGlzdG5hbWUpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsaXN0aWQ6IGlkLFxuICAgICAgICBsaXN0bmFtZTogbGlzdG5hbWVcbiAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICB9O1xuXG4gICAgLy8gcG9zdHMgYSBuZXcgbGlzdCBhbmQgZ2V0cyBhbGwgbGlzdHMgYWxsb3dzIC0gZm9sbG93IHJvdXRlIHRvIHNlZVxuICAgIHRoaXMuYWRkTGlzdCA9IChuZXdMaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdMaXN0KVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB2YXIgYWN0aXZlTGlzdCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgodmFsLmxpc3RpZCwgbWVtbyk7XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmRlbGV0ZUxpc3QgPSAobGlzdCkgPT4ge1xuICAgICAgZmV0Y2goJy9saXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShsaXN0KVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBhY3RpdmVMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwuaWQsIG1lbW8pO1xuICAgICAgICB9LCAtSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhLFxuICAgICAgICAgIGxpc3RpZDogYWN0aXZlTGlzdFxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5zaGFyZUxpc3QgPSAoc2hhcmVEYXRhT2JqKSA9PiB7XG4gICAgICBmZXRjaCgnL3VzZXJsaXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2hhcmVEYXRhT2JqKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLyAgIElURU0gQ0hBTkdFUyAgICAgLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgdGhpcy51cGRhdGVRdWFudCA9IChpdGVtLCBhZGRPclN1YikgPT4ge1xuICAgICAgaWYgKGFkZE9yU3ViID09PSAnYWRkJykge1xuICAgICAgICBpdGVtLnF1YW50aXR5Kys7XG4gICAgICB9IGVsc2UgaWYgKGFkZE9yU3ViID09PSAnc3ViJykge1xuICAgICAgICBpdGVtLnF1YW50aXR5ID0gTWF0aC5tYXgoaXRlbS5xdWFudGl0eSAtIDEsIDApO1xuICAgICAgfVxuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuYWRkSXRlbSA9IChuZXdJdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdJdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgVVNFUiBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvLyB0aGlzLmZldGNoVXNlcm5hbWUgPSAoKSA9PiB7XG4gICAgLy8gICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgLy8gICB2YXIgZ2V0VXJsID0gYC91c2VybmFtZS8ke3RoaXMuc3RhdGUudXNlcmlkfWA7XG4gICAgLy8gICBmZXRjaChnZXRVcmwpXG4gICAgLy8gICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgIC8vICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgLy8gICAgICAgdXNlcm5hbWU6IGRhdGEudXNlcm5hbWVcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9KTtcbiAgICAvLyB9O1xuXG4gICAgLy8gdGhpcy5zYXZlVXNlcm5hbWUgPSAodXNlckRhdGEpID0+IHtcbiAgICAvLyAgIGZldGNoKCcvdXNlcnMnLCB7XG4gICAgLy8gICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgLy8gICAgIGhlYWRlcnM6IHtcbiAgICAvLyAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIC8vICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpXG4gICAgLy8gICB9KVxuICAgIC8vICAgLnRoZW4oKGJvZHkpID0+IGJvZHkuanNvbigpKVxuICAgIC8vICAgLnRoZW4oKHJlcykgPT4ge1xuICAgIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICB1c2VybmFtZTogcmVzLnVzZXJuYW1lLFxuICAgIC8vICAgICAgIGVycm9yOiByZXMuZXJyb3JcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9KVxuICAgIC8vICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKCdlcnIwcicsIGVycikpO1xuICAgIC8vIH07XG5cbiAgICB0aGlzLmxvZ091dCA9ICgpID0+IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpZF90b2tlbicpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlkVG9rZW46ICcnLFxuICAgICAgICB1c2VyaWQ6ICcnLFxuICAgICAgICBtYXN0ZXJMaXN0OiBbXSxcbiAgICAgICAgbmF2TGlzdDogW10sXG4gICAgICAgIGRpc3BsYXlMaXN0OiBbXVxuICAgICAgfSk7XG4gICAgfTtcblxuICB9XG5cbiAgLy8gZGVsZXRlSXRlbShpdGVtKSB7XG4gIC8vICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gIC8vICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIC8vICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgLy8gICAgIH0sXG4gIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAvLyAgIH0pXG4gIC8vICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAvLyAgIC50aGVuKChkYXRhKSA9PiB7XG4gIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAvLyAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIGFkZFVzZXIodXNlckRhdGEpIHtcbiAgICBmZXRjaCgnL3VzZXJzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSlcbiAgICB9KVxuICAgIC50aGVuKChib2R5KSA9PiBib2R5Lmpzb24oKSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZW1haWxfcGhvbmU6IHJlcy5lbWFpbF9waG9uZVxuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coJ2VycjByJywgZXJyKSk7XG4gIH1cblxuICBmZXRjaEl0ZW1zKCkge1xuICAgIHZhciBnZXRVcmwgPSBgL2l0ZW1zLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICBmZXRjaChnZXRVcmwpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuICAgIC8vIHNldCBzdGF0ZSB3aXRoIGl0XG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBnb3QgYWxsIGl0ZW1zIGFuZCBmaWx0ZXIgZm9yIGRlbGV0ZWQgaXRlbXNcbiAgbWFrZURpc3BsYXlEYXRhKGxpc3RpZCA9IHRoaXMuc3RhdGUubGlzdGlkLCBkZWxldGVkU3RhdHVzID0gZmFsc2UpIHtcbiAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBsaXN0aWQgJiYgZW50cnkuZGVsZXRlZCA9PT0gZGVsZXRlZFN0YXR1cyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dMb2NrKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmxvZ2luID09PSAncGhvbmUnKSB7XG4gICAgICAvLyBzbXNcbiAgICAgIHRoaXMubG9jay5zbXMoKGVyciwgcHJvZmlsZSwgaWRUb2tlbiwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAvLyBzZXQgSldUIG9uIGxvY2Fsc3RvcmFnZVxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkVG9rZW4pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdXNlcmlkOiBwcm9maWxlLnVzZXJfaWQsXG4gICAgICAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgICAgICAgICAgLy8gcmVsaWVzIG9uIGxvY2FsIHN0b3JhZ2UsIHRyaWdnZXJzIHJlbmRlcigpXG4gICAgICAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7fTtcbiAgICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2ZpbGUudXNlcl9pZDtcbiAgICAgICAgICB1c2VyRGF0YS5lbWFpbF9waG9uZSA9IHByb2ZpbGUuZW1haWw7XG4gICAgICAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9wZW4gdGhlIGxvY2sgaW4gRW1haWwgQ29kZSBtb2RlIHdpdGggdGhlIGFiaWxpdHkgdG8gaGFuZGxlIHRoZSBhdXRoZW50aWNhdGlvbiBpbiBwYWdlXG4gICAgICB0aGlzLmxvY2suZW1haWxjb2RlKChlcnIsIHByb2ZpbGUsIGlkVG9rZW4sIHN0YXRlKSA9PiB7XG4gICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgLy8gc2V0IEpXVCBvbiBsb2NhbHN0b3JhZ2VcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBpZFRva2VuKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHVzZXJpZDogcHJvZmlsZS51c2VyX2lkLFxuICAgICAgICAgICAgLy8gLy8gcHJvZmlsZSBpcyByZXR1cm4gZnJvbSBhdXRoMCAtIGhhcyBzb21lIGRhdGEgYXZhaWxhYmxlXG4gICAgICAgICAgICAvLyBwcm9maWxlOiBwcm9maWxlLFxuICAgICAgICAgICAgZW1haWxfcGhvbmU6IHByb2ZpbGUuZW1haWwsXG4gICAgICAgICAgICAvLyByZWxpZXMgb24gbG9jYWwgc3RvcmFnZSwgdHJpZ2dlcnMgcmVuZGVyKClcbiAgICAgICAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBhZGQgdXNlciB0byBkYlxuICAgICAgICAgIHZhciB1c2VyRGF0YSA9IHt9O1xuICAgICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZmlsZS51c2VyX2lkO1xuICAgICAgICAgIHVzZXJEYXRhLmVtYWlsX3Bob25lID0gcHJvZmlsZS5lbWFpbDtcbiAgICAgICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIGdldElkVG9rZW4oKSB7XG4gICAgLy8gRmlyc3QsIGNoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBKV1QgaW4gbG9jYWwgc3RvcmFnZVxuICAgIHZhciBpZFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgdmFyIGF1dGhIYXNoID0gdGhpcy5sb2NrLnBhcnNlSGFzaCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gSldUIGluIGxvY2FsIHN0b3JhZ2UgYW5kIHRoZXJlIGlzIG9uZSBpbiB0aGUgVVJMIGhhc2gsXG4gICAgLy8gc2F2ZSBpdCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgaWYgKCFpZFRva2VuICYmIGF1dGhIYXNoKSB7XG4gICAgICBpZiAoYXV0aEhhc2guaWRfdG9rZW4pIHtcbiAgICAgICAgaWRUb2tlbiA9IGF1dGhIYXNoLmlkX3Rva2VuO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBhdXRoSGFzaC5pZF90b2tlbik7XG4gICAgICB9XG4gICAgICBpZiAoYXV0aEhhc2guZXJyb3IpIHtcbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciBjb25kaXRpb25zXG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBzaWduaW5nIGluJywgYXV0aEhhc2gpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWRUb2tlbjtcbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIGlmIGlkdG9rZW5cbiAgICBpZiAodGhpcy5zdGF0ZS5pZFRva2VuICYmXG4gICAgICAvLyBpZGVhbGx5IHlvdSBjYW4gYnJpbmcgaW4gYSBsaWJyYXJ5IGZvciB0aGlzIGlmIHlvdSBuZWVkIHRvIGRvIGl0IGEgbG90XG4gICAgICAvLyBleHBpcmUgZGF0ZSBvbiB0b2tlbiBleGlzdHNcbiAgICAgIEpTT04ucGFyc2Uod2luZG93LmF0b2IodGhpcy5zdGF0ZS5pZFRva2VuLnNwbGl0KCcuJylbMV0pKS5leHAgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgLy8gZXhwaXJlIGRhdGUgb24gdG9rZW4gaXMgbW9yZSB0aGFuIGN1cnJlbnQgdGltZVxuICAgICAgSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0aGlzLnN0YXRlLmlkVG9rZW4uc3BsaXQoJy4nKVsxXSkpLmV4cCA+IERhdGUubm93KCkgLyAxMDAwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxIZWFkZXIgZW1haWxfcGhvbmU9e3RoaXMuc3RhdGUuZW1haWxfcGhvbmV9IGxvZ091dD17dGhpcy5sb2dPdXR9Lz5cbiAgICAgICAgICA8TmV3TGlzdCB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBhZGRMaXN0PXt0aGlzLmFkZExpc3R9IGNyZWF0ZURpc3BsYXllZD17dGhpcy5zdGF0ZS5jcmVhdGVEaXNwbGF5ZWR9IGhpZGVOZXdMaXN0PXt0aGlzLmhpZGVOZXdMaXN0fS8+XG4gICAgICAgICAgPE5hdkJhciB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBuYXZMaXN0PXt0aGlzLnN0YXRlLm5hdkxpc3R9IHVwZGF0ZUxpc3RpZD17dGhpcy51cGRhdGVMaXN0aWR9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IGRpc3BsYXlOZXdMaXN0PXt0aGlzLmRpc3BsYXlOZXdMaXN0fS8+XG4gICAgICAgICAgPFRvZG9MaXN0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBsaXN0bmFtZT17dGhpcy5zdGF0ZS5saXN0bmFtZX0gZGVsZXRlSXRlbT17dGhpcy5kZWxldGVJdGVtfSB1cGRhdGVRdWFudD17dGhpcy51cGRhdGVRdWFudH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfS8+XG4gICAgICAgICAgPEJvdHRvbSB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gZGVsZXRlTGlzdD17dGhpcy5kZWxldGVMaXN0fSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBkaXNwbGF5U2hhcmVMaXN0PXt0aGlzLmRpc3BsYXlTaGFyZUxpc3R9Lz5cbiAgICAgICAgICA8U2hhcmVMaXN0IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IHNoYXJlTGlzdD17dGhpcy5zaGFyZUxpc3R9IHNoYXJlRGlzcGxheWVkPXt0aGlzLnN0YXRlLnNoYXJlRGlzcGxheWVkfSBoaWRlU2hhcmVMaXN0PXt0aGlzLmhpZGVTaGFyZUxpc3R9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW4tYm94Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW4tYm94LWhlYWRlcic+TG9naW4gdG8gTGlzdGlmeTwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnN0YXRlLmxvZ2luID09PSAnZGVmYXVsdCcgfHwgdGhpcy5zdGF0ZS5sb2dpbiA9PT0gJ3Bob25lJyA/ICdzZWxlY3RlZExvZ2luJyA6ICdub3RTZWxlY3RlZExvZ2luJ30gY2xhc3NOYW1lPSdsb2dpbi1zZWxlY3QnIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtsb2dpbjogJ3Bob25lJ30pfT5cbiAgICAgICAgICAgICAgUGhvbmUgTnVtYmVyXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMuc3RhdGUubG9naW4gPT09ICdlbWFpbCcgPyAnc2VsZWN0ZWRMb2dpbicgOiAnbm90U2VsZWN0ZWRMb2dpbid9IGNsYXNzTmFtZT0nbG9naW4tc2VsZWN0JyBvbkNsaWNrPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7bG9naW46ICdlbWFpbCd9KX0+XG4gICAgICAgICAgICAgIEVtYWlsIEFkZHJlc3NcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1jbGljaycgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+XG4gICAgICAgICAgICBMb2dpblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cblxufVxuXG5cbiJdfQ==