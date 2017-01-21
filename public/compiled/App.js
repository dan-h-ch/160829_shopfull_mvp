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
              email_phone: prof.email || prof.phone_number.slice(1)
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
      var getUrl = '/lists/' + _this.state.userid;
      fetch(getUrl).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.length > 0) {
          var displayList = data.reduce(function (memo, val) {
            return val.listid < memo.listid ? val : memo;
          });
          _this.setState({
            navList: data,
            listid: displayList.listid,
            listname: displayList.listname
          });
        }
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
              email_phone: profile.phone_number.slice(1),
              // relies on local storage, triggers render()
              idToken: _this5.getIdToken()
            }, function () {
              _this5.fetchLists();
              _this5.fetchItems();
            });
            // add user to db
            var userData = {};
            userData.id = profile.user_id;
            userData.email_phone = profile.phone_number.slice(1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsImxvY2siLCJBdXRoMExvY2tQYXNzd29yZGxlc3MiLCJzZXRTdGF0ZSIsImlkVG9rZW4iLCJnZXRJZFRva2VuIiwiZ2V0UHJvZmlsZSIsInN0YXRlIiwiZXJyIiwicHJvZiIsInVzZXJpZCIsInVzZXJfaWQiLCJwcm9maWxlIiwiZW1haWxfcGhvbmUiLCJlbWFpbCIsInBob25lX251bWJlciIsInNsaWNlIiwiZmV0Y2hMaXN0cyIsImZldGNoSXRlbXMiLCJwcm9wcyIsIm1hc3Rlckxpc3QiLCJuYXZMaXN0IiwiZGlzcGxheUxpc3QiLCJsaXN0aWQiLCJjcmVhdGVEaXNwbGF5ZWQiLCJzaGFyZURpc3BsYXllZCIsImxvZ2luIiwiZGlzcGxheU5ld0xpc3QiLCJoaWRlTmV3TGlzdCIsImRpc3BsYXlTaGFyZUxpc3QiLCJoaWRlU2hhcmVMaXN0IiwiZ2V0VXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJsZW5ndGgiLCJyZWR1Y2UiLCJtZW1vIiwidmFsIiwibGlzdG5hbWUiLCJ1cGRhdGVMaXN0aWQiLCJpZCIsIm1ha2VEaXNwbGF5RGF0YSIsImFkZExpc3QiLCJuZXdMaXN0IiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiYWN0aXZlTGlzdCIsIk1hdGgiLCJtYXgiLCJJbmZpbml0eSIsImRlbGV0ZUxpc3QiLCJsaXN0Iiwic2hhcmVMaXN0Iiwic2hhcmVEYXRhT2JqIiwiY29uc29sZSIsImxvZyIsInVwZGF0ZVF1YW50IiwiaXRlbSIsImFkZE9yU3ViIiwicXVhbnRpdHkiLCJhZGRJdGVtIiwibmV3SXRlbSIsImRlbGV0ZUl0ZW0iLCJsb2dPdXQiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwidXNlckRhdGEiLCJjYXRjaCIsImRlbGV0ZWRTdGF0dXMiLCJmaWx0ZXIiLCJlbnRyeSIsImRlbGV0ZWQiLCJzbXMiLCJzZXRJdGVtIiwiYWRkVXNlciIsImVtYWlsY29kZSIsImdldEl0ZW0iLCJhdXRoSGFzaCIsInBhcnNlSGFzaCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaGFzaCIsImlkX3Rva2VuIiwiZXJyb3IiLCJwYXJzZSIsImF0b2IiLCJzcGxpdCIsImV4cCIsInVuZGVmaW5lZCIsIkRhdGUiLCJub3ciLCJlIiwic2hvd0xvY2siLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxHOzs7Ozt5Q0FFaUI7QUFDbkIsV0FBS0MsSUFBTCxHQUFZLElBQUlDLHFCQUFKLENBQTBCLGtDQUExQixFQUE4RCxpQkFBOUQsQ0FBWjtBQUNEOzs7d0NBRW1CO0FBQUE7O0FBQ2xCLFdBQUtDLFFBQUwsQ0FBYztBQUNaQyxpQkFBUyxLQUFLQyxVQUFMO0FBREcsT0FBZCxFQUVHLFlBQU07QUFDUCxlQUFLSixJQUFMLENBQVVLLFVBQVYsQ0FBcUIsT0FBS0MsS0FBTCxDQUFXSCxPQUFoQyxFQUF5QyxVQUFDSSxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUN0RCxjQUFJQSxJQUFKLEVBQVU7QUFDUixtQkFBS04sUUFBTCxDQUFjO0FBQ1pPLHNCQUFRRCxLQUFLRSxPQUREO0FBRVpDLHVCQUFTSCxJQUZHO0FBR1pJLDJCQUFhSixLQUFLSyxLQUFMLElBQWNMLEtBQUtNLFlBQUwsQ0FBa0JDLEtBQWxCLENBQXdCLENBQXhCO0FBSGYsYUFBZCxFQUlHLFlBQU07QUFDUCxxQkFBS0MsVUFBTDtBQUNBLHFCQUFLQyxVQUFMO0FBQ0QsYUFQRDtBQVFEO0FBQ0YsU0FYRDtBQVlELE9BZkQ7QUFnQkQ7OztBQUVELGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWEEsS0FEVzs7QUFHakIsVUFBS1osS0FBTCxHQUFhO0FBQ1hhLGtCQUFZLEVBREQ7QUFFWEMsZUFBUyxFQUZFO0FBR1hDLG1CQUFhLEVBSEY7QUFJWEMsY0FBUSxDQUpHLEVBSUE7QUFDWGIsY0FBUSxFQUxHLEVBS0M7QUFDWmMsdUJBQWlCLE1BTk47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aUJEO0FBQ0Y7Ozs7RUEvYWVDLE1BQU1DLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9ja1Bhc3N3b3JkbGVzcygnZWFEekxtQUx4YjdmdnhRaFZLVGt4VzhyRUR0TW5HWkQnLCAnZGFuY2guYXV0aDAuY29tJyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5sb2NrLmdldFByb2ZpbGUodGhpcy5zdGF0ZS5pZFRva2VuLCAoZXJyLCBwcm9mKSA9PiB7XG4gICAgICAgIGlmIChwcm9mKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB1c2VyaWQ6IHByb2YudXNlcl9pZCxcbiAgICAgICAgICAgIHByb2ZpbGU6IHByb2YsXG4gICAgICAgICAgICBlbWFpbF9waG9uZTogcHJvZi5lbWFpbCB8fCBwcm9mLnBob25lX251bWJlci5zbGljZSgxKSxcbiAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgbmF2TGlzdDogW10sXG4gICAgICBkaXNwbGF5TGlzdDogW10sXG4gICAgICBsaXN0aWQ6IDEsIC8vZGVmYXVsdCAtIG5lZWQgdG8gY2hhbmdlIGl0IGJhc2VkIG9uIHdoZW4gdXNlciBsb2dzIGluXG4gICAgICB1c2VyaWQ6ICcnLCAvL3RlbXBvcmFyaWx5XG4gICAgICBjcmVhdGVEaXNwbGF5ZWQ6ICdub25lJyxcbiAgICAgIHNoYXJlRGlzcGxheWVkOiAnbm9uZScsXG4gICAgICBsb2dpbjogJ2RlZmF1bHQnLFxuICAgICAgZW1haWxfcGhvbmU6ICcnXG4gICAgfTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLyAgIExJU1QgUkVMQVRFRCAgICAgLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIFxuICAgIC8vIGNvbnRyb2xzIGlmIGRpc3BsYXkgZm9yIGFkZGluZyBhIG5ldyBsaXN0IGlzIHZpc2libGVcbiAgICB0aGlzLmRpc3BsYXlOZXdMaXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNyZWF0ZURpc3BsYXllZDogJ2Jsb2NrJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZU5ld0xpc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3JlYXRlRGlzcGxheWVkOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmRpc3BsYXlTaGFyZUxpc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hhcmVEaXNwbGF5ZWQ6ICdibG9jaydcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmhpZGVTaGFyZUxpc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hhcmVEaXNwbGF5ZWQ6ICdub25lJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZmV0Y2hMaXN0cyA9ICgpID0+IHtcbiAgICAgIC8vIHVzZXJpZCBpcyBiZWluZyBwYXNzZWQgb24gaW4gVVJMLCB1bHRpbWF0ZWx5IHJlZmFjdG9yIG91ciB3aGVuIGF1dGggdG9rZW4gaXMgaW4gcGxhY2VcbiAgICAgIHZhciBnZXRVcmwgPSBgL2xpc3RzLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICAgIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIGRpc3BsYXlMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC5saXN0aWQgPCBtZW1vLmxpc3RpZCA/IHZhbCA6IG1lbW87ICAgICAgICAgIFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICAgIGxpc3RpZDogZGlzcGxheUxpc3QubGlzdGlkLFxuICAgICAgICAgICAgbGlzdG5hbWU6IGRpc3BsYXlMaXN0Lmxpc3RuYW1lXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyB2aXN1YWxseSB3aGF0IGRvIHlvdSBzZWUsIGRvZXMgbm90IGNoYW5nZSBtYXN0ZXJMaXN0IG9yIG5hdkxpc3RcbiAgICB0aGlzLnVwZGF0ZUxpc3RpZCA9IChpZCwgbGlzdG5hbWUpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsaXN0aWQ6IGlkLFxuICAgICAgICBsaXN0bmFtZTogbGlzdG5hbWVcbiAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICB9O1xuXG4gICAgLy8gcG9zdHMgYSBuZXcgbGlzdCBhbmQgZ2V0cyBhbGwgbGlzdHMgYWxsb3dzIC0gZm9sbG93IHJvdXRlIHRvIHNlZVxuICAgIHRoaXMuYWRkTGlzdCA9IChuZXdMaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdMaXN0KVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBhY3RpdmVMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwubGlzdGlkLCBtZW1vKTtcbiAgICAgICAgfSwgLUluZmluaXR5KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGFjdGl2ZUxpc3RcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlTGlzdCA9IChsaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbyk7XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnNoYXJlTGlzdCA9IChzaGFyZURhdGFPYmopID0+IHtcbiAgICAgIGZldGNoKCcvdXNlcmxpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzaGFyZURhdGFPYmopXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgSVRFTSBDSEFOR0VTICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB0aGlzLnVwZGF0ZVF1YW50ID0gKGl0ZW0sIGFkZE9yU3ViKSA9PiB7XG4gICAgICBpZiAoYWRkT3JTdWIgPT09ICdhZGQnKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkrKztcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09ICdzdWInKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkgPSBNYXRoLm1heChpdGVtLnF1YW50aXR5IC0gMSwgMCk7XG4gICAgICB9XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hZGRJdGVtID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxldGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBVU0VSIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8vIHRoaXMuZmV0Y2hVc2VybmFtZSA9ICgpID0+IHtcbiAgICAvLyAgIC8vIHVzZXJpZCBpcyBiZWluZyBwYXNzZWQgb24gaW4gVVJMLCB1bHRpbWF0ZWx5IHJlZmFjdG9yIG91ciB3aGVuIGF1dGggdG9rZW4gaXMgaW4gcGxhY2VcbiAgICAvLyAgIHZhciBnZXRVcmwgPSBgL3VzZXJuYW1lLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICAvLyAgIGZldGNoKGdldFVybClcbiAgICAvLyAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgLy8gICAudGhlbigoZGF0YSkgPT4ge1xuICAgIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICB1c2VybmFtZTogZGF0YS51c2VybmFtZVxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pO1xuICAgIC8vIH07XG5cbiAgICAvLyB0aGlzLnNhdmVVc2VybmFtZSA9ICh1c2VyRGF0YSkgPT4ge1xuICAgIC8vICAgZmV0Y2goJy91c2VycycsIHtcbiAgICAvLyAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAvLyAgICAgaGVhZGVyczoge1xuICAgIC8vICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgLy8gICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSlcbiAgICAvLyAgIH0pXG4gICAgLy8gICAudGhlbigoYm9keSkgPT4gYm9keS5qc29uKCkpXG4gICAgLy8gICAudGhlbigocmVzKSA9PiB7XG4gICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgIHVzZXJuYW1lOiByZXMudXNlcm5hbWUsXG4gICAgLy8gICAgICAgZXJyb3I6IHJlcy5lcnJvclxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pXG4gICAgLy8gICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coJ2VycjByJywgZXJyKSk7XG4gICAgLy8gfTtcblxuICAgIHRoaXMubG9nT3V0ID0gKCkgPT4ge1xuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaWRUb2tlbjogJycsXG4gICAgICAgIHVzZXJpZDogJycsXG4gICAgICAgIG1hc3Rlckxpc3Q6IFtdLFxuICAgICAgICBuYXZMaXN0OiBbXSxcbiAgICAgICAgZGlzcGxheUxpc3Q6IFtdLFxuICAgICAgICBlbWFpbF9waG9uZTogJydcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgfVxuXG4gIC8vIGRlbGV0ZUl0ZW0oaXRlbSkge1xuICAvLyAgIGZldGNoKCcvaXRlbXMnLCB7XG4gIC8vICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAvLyAgICAgaGVhZGVyczoge1xuICAvLyAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAvLyAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gIC8vICAgICB9LFxuICAvLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgLy8gICB9KVxuICAvLyAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgLy8gICAudGhlbigoZGF0YSkgPT4ge1xuICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgLy8gICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAvLyAgIH0pXG4gIC8vIH1cblxuICBhZGRVc2VyKHVzZXJEYXRhKSB7XG4gICAgZmV0Y2goJy91c2VycycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpXG4gICAgfSlcbiAgICAudGhlbigoYm9keSkgPT4gYm9keS5qc29uKCkpXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGVtYWlsX3Bob25lOiByZXMuZW1haWxfcGhvbmVcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKCdlcnIwcicsIGVycikpO1xuICB9XG5cbiAgZmV0Y2hJdGVtcygpIHtcbiAgICB2YXIgZ2V0VXJsID0gYC9pdGVtcy8ke3RoaXMuc3RhdGUudXNlcmlkfWA7XG4gICAgZmV0Y2goZ2V0VXJsKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSlcbiAgICAvLyBzZXQgc3RhdGUgd2l0aCBpdFxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gZ290IGFsbCBpdGVtcyBhbmQgZmlsdGVyIGZvciBkZWxldGVkIGl0ZW1zXG4gIG1ha2VEaXNwbGF5RGF0YShsaXN0aWQgPSB0aGlzLnN0YXRlLmxpc3RpZCwgZGVsZXRlZFN0YXR1cyA9IGZhbHNlKSB7XG4gICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gbGlzdGlkICYmIGVudHJ5LmRlbGV0ZWQgPT09IGRlbGV0ZWRTdGF0dXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGlzcGxheUxpc3Q6IGRpc3BsYXlMaXN0XG4gICAgfSk7XG4gIH1cblxuICBzaG93TG9jaygpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5sb2dpbiA9PT0gJ3Bob25lJykge1xuICAgICAgLy8gc21zXG4gICAgICB0aGlzLmxvY2suc21zKChlcnIsIHByb2ZpbGUsIGlkVG9rZW4sIHN0YXRlKSA9PiB7XG4gICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgLy8gc2V0IEpXVCBvbiBsb2NhbHN0b3JhZ2VcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBpZFRva2VuKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHVzZXJpZDogcHJvZmlsZS51c2VyX2lkLFxuICAgICAgICAgICAgZW1haWxfcGhvbmU6IHByb2ZpbGUucGhvbmVfbnVtYmVyLnNsaWNlKDEpLFxuICAgICAgICAgICAgLy8gcmVsaWVzIG9uIGxvY2FsIHN0b3JhZ2UsIHRyaWdnZXJzIHJlbmRlcigpXG4gICAgICAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7fTtcbiAgICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2ZpbGUudXNlcl9pZDtcbiAgICAgICAgICB1c2VyRGF0YS5lbWFpbF9waG9uZSA9IHByb2ZpbGUucGhvbmVfbnVtYmVyLnNsaWNlKDEpO1xuICAgICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPcGVuIHRoZSBsb2NrIGluIEVtYWlsIENvZGUgbW9kZSB3aXRoIHRoZSBhYmlsaXR5IHRvIGhhbmRsZSB0aGUgYXV0aGVudGljYXRpb24gaW4gcGFnZVxuICAgICAgdGhpcy5sb2NrLmVtYWlsY29kZSgoZXJyLCBwcm9maWxlLCBpZFRva2VuLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgIC8vIHNldCBKV1Qgb24gbG9jYWxzdG9yYWdlXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbik7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB1c2VyaWQ6IHByb2ZpbGUudXNlcl9pZCxcbiAgICAgICAgICAgIC8vIC8vIHByb2ZpbGUgaXMgcmV0dXJuIGZyb20gYXV0aDAgLSBoYXMgc29tZSBkYXRhIGF2YWlsYWJsZVxuICAgICAgICAgICAgLy8gcHJvZmlsZTogcHJvZmlsZSxcbiAgICAgICAgICAgIGVtYWlsX3Bob25lOiBwcm9maWxlLmVtYWlsLFxuICAgICAgICAgICAgLy8gcmVsaWVzIG9uIGxvY2FsIHN0b3JhZ2UsIHRyaWdnZXJzIHJlbmRlcigpXG4gICAgICAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAvLyAgIGVtYWlsX3Bob25lOiBwcm9maWxlLmVtYWlsXG4gICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAgICAgICB2YXIgdXNlckRhdGEgPSB7fTtcbiAgICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2ZpbGUudXNlcl9pZDtcbiAgICAgICAgICB1c2VyRGF0YS5lbWFpbF9waG9uZSA9IHByb2ZpbGUuZW1haWw7XG4gICAgICAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBnZXRJZFRva2VuKCkge1xuICAgIC8vIEZpcnN0LCBjaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgSldUIGluIGxvY2FsIHN0b3JhZ2VcbiAgICB2YXIgaWRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpO1xuICAgIHZhciBhdXRoSGFzaCA9IHRoaXMubG9jay5wYXJzZUhhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgIC8vIElmIHRoZXJlIGlzIG5vIEpXVCBpbiBsb2NhbCBzdG9yYWdlIGFuZCB0aGVyZSBpcyBvbmUgaW4gdGhlIFVSTCBoYXNoLFxuICAgIC8vIHNhdmUgaXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGlmICghaWRUb2tlbiAmJiBhdXRoSGFzaCkge1xuICAgICAgaWYgKGF1dGhIYXNoLmlkX3Rva2VuKSB7XG4gICAgICAgIGlkVG9rZW4gPSBhdXRoSGFzaC5pZF90b2tlbjtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aEhhc2guaWRfdG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGF1dGhIYXNoLmVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgY29uZGl0aW9uc1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc2lnbmluZyBpbicsIGF1dGhIYXNoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkVG9rZW47XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBpZiBpZHRva2VuXG4gICAgaWYgKHRoaXMuc3RhdGUuaWRUb2tlbiAmJlxuICAgICAgLy8gaWRlYWxseSB5b3UgY2FuIGJyaW5nIGluIGEgbGlicmFyeSBmb3IgdGhpcyBpZiB5b3UgbmVlZCB0byBkbyBpdCBhIGxvdFxuICAgICAgLy8gZXhwaXJlIGRhdGUgb24gdG9rZW4gZXhpc3RzXG4gICAgICBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuc3RhdGUuaWRUb2tlbi5zcGxpdCgnLicpWzFdKSkuZXhwICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIC8vIGV4cGlyZSBkYXRlIG9uIHRva2VuIGlzIG1vcmUgdGhhbiBjdXJyZW50IHRpbWVcbiAgICAgIEpTT04ucGFyc2Uod2luZG93LmF0b2IodGhpcy5zdGF0ZS5pZFRva2VuLnNwbGl0KCcuJylbMV0pKS5leHAgPiBEYXRlLm5vdygpIC8gMTAwMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8SGVhZGVyIGVtYWlsX3Bob25lPXt0aGlzLnN0YXRlLmVtYWlsX3Bob25lfSBsb2dPdXQ9e3RoaXMubG9nT3V0fS8+XG4gICAgICAgICAgPE5ld0xpc3QgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gYWRkTGlzdD17dGhpcy5hZGRMaXN0fSBjcmVhdGVEaXNwbGF5ZWQ9e3RoaXMuc3RhdGUuY3JlYXRlRGlzcGxheWVkfSBoaWRlTmV3TGlzdD17dGhpcy5oaWRlTmV3TGlzdH0vPlxuICAgICAgICAgIDxOYXZCYXIgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gbmF2TGlzdD17dGhpcy5zdGF0ZS5uYXZMaXN0fSB1cGRhdGVMaXN0aWQ9e3RoaXMudXBkYXRlTGlzdGlkfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSBkaXNwbGF5TmV3TGlzdD17dGhpcy5kaXNwbGF5TmV3TGlzdH0vPlxuICAgICAgICAgIDxUb2RvTGlzdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gbGlzdG5hbWU9e3RoaXMuc3RhdGUubGlzdG5hbWV9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IGFkZEl0ZW09e3RoaXMuYWRkSXRlbX0vPlxuICAgICAgICAgIDxCb3R0b20gdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUxpc3Q9e3RoaXMuZGVsZXRlTGlzdH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gZGlzcGxheVNoYXJlTGlzdD17dGhpcy5kaXNwbGF5U2hhcmVMaXN0fS8+XG4gICAgICAgICAgPFNoYXJlTGlzdCB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBzaGFyZUxpc3Q9e3RoaXMuc2hhcmVMaXN0fSBzaGFyZURpc3BsYXllZD17dGhpcy5zdGF0ZS5zaGFyZURpc3BsYXllZH0gaGlkZVNoYXJlTGlzdD17dGhpcy5oaWRlU2hhcmVMaXN0fSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSBsaXN0bmFtZT17dGhpcy5zdGF0ZS5saXN0bmFtZX0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1ib3gnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1ib3gtaGVhZGVyJz5MZXQncyBMaXN0aWZ5ITwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1ib3gtYm9keSc+U2VsZWN0IExvZ2luIE9wdGlvbjwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnN0YXRlLmxvZ2luID09PSAnZGVmYXVsdCcgfHwgdGhpcy5zdGF0ZS5sb2dpbiA9PT0gJ3Bob25lJyA/ICdzZWxlY3RlZExvZ2luJyA6ICdub3RTZWxlY3RlZExvZ2luJ30gY2xhc3NOYW1lPSdsb2dpbi1zZWxlY3QnIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtsb2dpbjogJ3Bob25lJ30pfT5cbiAgICAgICAgICAgICAgUGhvbmUgTnVtYmVyXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMuc3RhdGUubG9naW4gPT09ICdlbWFpbCcgPyAnc2VsZWN0ZWRMb2dpbicgOiAnbm90U2VsZWN0ZWRMb2dpbid9IGNsYXNzTmFtZT0nbG9naW4tc2VsZWN0JyBvbkNsaWNrPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7bG9naW46ICdlbWFpbCd9KX0+XG4gICAgICAgICAgICAgIEVtYWlsIEFkZHJlc3NcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbi1jbGljaycgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+XG4gICAgICAgICAgICBMZXQncyBHbyEgPj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG4iXX0=