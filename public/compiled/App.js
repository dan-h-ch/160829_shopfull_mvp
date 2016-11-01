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
          React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, addList: this.addList, updateListid: this.updateListid, listid: this.state.listid }),
          React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid, userid: this.state.userid }),
          React.createElement(TodoList, { lock: this.lock, todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid }),
          React.createElement(TodoCost, { todoList: this.state.displayList, deleteList: this.deleteList, listid: this.state.listid, userid: this.state.userid }),
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
//# sourceMappingURL=data:application/json;base64,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TSxLQUFLLElBQXJCLEVBQTJCLFVBQVUsS0FBSyxLQUFMLENBQVcsV0FBaEQsRUFBNkQsWUFBWSxLQUFLLFVBQTlFLEVBQTBGLGFBQWEsS0FBSyxXQUE1RyxFQUF5SCxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTVJLEdBSEY7QUFJRSw4QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxXQUEvQixFQUE0QyxZQUFZLEtBQUssVUFBN0QsRUFBeUUsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUE1RixFQUFvRyxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQXZILEdBSkY7QUFLRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsZ0JBQUcsU0FBUyxpQkFBQyxDQUFEO0FBQUEseUJBQU8sT0FBSyxNQUFMLEVBQVA7QUFBQSxpQkFBWjtBQUFBO0FBQUE7QUFERjtBQUxGLFNBREY7QUFXRCxPQWpCRCxNQWlCTztBQUNMLGVBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGNBQUcsU0FBUyxpQkFBQyxDQUFEO0FBQUEsdUJBQU8sT0FBSyxRQUFMLEVBQVA7QUFBQSxlQUFaO0FBQUE7QUFBQTtBQURGLFNBREY7QUFLRDtBQUNGOzs7O0VBdlZlLE1BQU0sUyIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XG4vLyB2YXIgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJylcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9ja1Bhc3N3b3JkbGVzcygnZWFEekxtQUx4YjdmdnhRaFZLVGt4VzhyRUR0TW5HWkQnLCAnZGFuY2guYXV0aDAuY29tJyk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgfSwgKCkgPT4ge1xuICAgICAgLy8gc2V0IG1vcmUgc3RhdGUgc3R1ZmZcbiAgICAgIHRoaXMubG9jay5nZXRQcm9maWxlKHRoaXMuc3RhdGUuaWRUb2tlbiwgKGVyciwgcHJvZikgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VyaWQ6IHByb2YudXNlcl9pZCxcbiAgICAgICAgICBwcm9maWxlOiBwcm9mXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB1c2VyRGF0YSA9IHt9O1xuICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2YudXNlcl9pZDtcbiAgICAgICAgdXNlckRhdGEuZW1haWwgPSBwcm9mLmVtYWlsO1xuICAgICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtYXN0ZXJMaXN0OiBbXSxcbiAgICAgIG5hdkxpc3Q6IFtdLFxuICAgICAgZGlzcGxheUxpc3Q6IFtdLFxuICAgICAgbGlzdGlkOiAxLCAvL2RlZmF1bHQgLSBuZWVkIHRvIGNoYW5nZSBpdCBiYXNlZCBvbiB3aGVuIHVzZXIgbG9ncyBpblxuICAgICAgdXNlcmlkOiAnJyAvL3RlbXBvcmFyaWx5XG4gICAgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgTElTVCBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgXG4gICAgdGhpcy5mZXRjaExpc3RzID0gKCkgPT4ge1xuICAgICAgLy8gdXNlcmlkIGlzIGJlaW5nIHBhc3NlZCBvbiBpbiBVUkwsIHVsdGltYXRlbHkgcmVmYWN0b3Igb3VyIHdoZW4gYXV0aCB0b2tlbiBpcyBpbiBwbGFjZVxuICAgICAgdmFyIGdldFVybCA9IGAvbGlzdHMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gO1xuICAgICAgZmV0Y2goZ2V0VXJsKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBkaXNwbGF5TGlzdGlkID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1pbih2YWwuaWQsIG1lbW8pO1xuICAgICAgICB9LCBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBkaXNwbGF5TGlzdGlkXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIHZpc3VhbGx5IHdoYXQgZG8geW91IHNlZSwgZG9lcyBub3QgY2hhbmdlIG1hc3Rlckxpc3Qgb3IgbmF2TGlzdFxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGlzdGlkOiBpZFxuICAgICAgfSwgZnVuY3Rpb24oKSB7IHRoaXMubWFrZURpc3BsYXlEYXRhKCk7IH0pO1xuICAgIH07XG5cbiAgICAvLyBwb3N0cyBhIG5ldyBsaXN0IGFuZCBnZXRzIGFsbCBsaXN0cyBhbGxvd3MgLSBmb2xsb3cgcm91dGUgdG8gc2VlXG4gICAgdGhpcy5hZGRMaXN0ID0gKG5ld0xpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbyk7XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmRlbGV0ZUxpc3QgPSAobGlzdCkgPT4ge1xuICAgICAgZmV0Y2goJy9saXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShsaXN0KVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBhY3RpdmVMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwuaWQsIG1lbW8pO1xuICAgICAgICB9LCAtSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhLFxuICAgICAgICAgIGxpc3RpZDogYWN0aXZlTGlzdFxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgSVRFTSBDSEFOR0VTICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB0aGlzLnVwZGF0ZVF1YW50ID0gKGl0ZW0sIGFkZE9yU3ViKSA9PiB7XG4gICAgICBpZiAoYWRkT3JTdWIgPT09ICdhZGQnKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkrKztcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09ICdzdWInKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkgPSBNYXRoLm1heChpdGVtLnF1YW50aXR5IC0gMSwgMCk7XG4gICAgICB9XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hZGRJdGVtID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxldGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkgeyB0aGlzLm1ha2VEaXNwbGF5RGF0YSgpOyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cblxuXG4gICAgLy8gLy8gbm90IGJlaW5nIHVzZWRcbiAgICAvLyB0aGlzLmZpbHRlckRhdGEgPSAoZmlsdGVyT2JqKSA9PiB7XG4gICAgLy8gICAkLmFqYXgoe1xuICAgIC8vICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgdXJsOiBcIi9maWx0ZXJcIixcbiAgICAvLyAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIC8vICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShmaWx0ZXJPYmopLFxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgLy8gICAgICAgY2FsbGJhY2soZGF0YSlcbiAgICAvLyAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxuICAgIC8vICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgIC8vICAgbWFzdGVyTGlzdDogZGF0YVxuICAgIC8vICAgICAgIC8vIH0pXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG5cbiAgfVxuXG4gIC8vIGRlbGV0ZUl0ZW0oaXRlbSkge1xuICAvLyAgIGZldGNoKCcvaXRlbXMnLCB7XG4gIC8vICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAvLyAgICAgaGVhZGVyczoge1xuICAvLyAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAvLyAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gIC8vICAgICB9LFxuICAvLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgLy8gICB9KVxuICAvLyAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgLy8gICAudGhlbigoZGF0YSkgPT4ge1xuICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gIC8vICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgLy8gICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAvLyAgIH0pXG4gIC8vIH1cblxuICBhZGRVc2VyKHVzZXJEYXRhKSB7XG4gICAgZmV0Y2goJy91c2VycycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpXG4gICAgfSlcbiAgICAudGhlbigoYm9keSkgPT4gYm9keS5qc29uKCkpXG4gICAgLnRoZW4oKHJlcykgPT4gY29uc29sZS5sb2cocmVzKSlcbiAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coJ2VycjByJywgZXJyKSk7XG4gIH1cblxuICBmZXRjaEl0ZW1zKCkge1xuICAgIHZhciBnZXRVcmwgPSBgL2l0ZW1zLyR7dGhpcy5zdGF0ZS51c2VyaWR9YDtcbiAgICBmZXRjaChnZXRVcmwpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuICAgIC8vIHNldCBzdGF0ZSB3aXRoIGl0XG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICB9LCBmdW5jdGlvbigpIHsgdGhpcy5tYWtlRGlzcGxheURhdGEoKTsgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBnb3QgYWxsIGl0ZW1zIGFuZCBmaWx0ZXIgZm9yIGRlbGV0ZWQgaXRlbXNcbiAgbWFrZURpc3BsYXlEYXRhKGxpc3RpZCA9IHRoaXMuc3RhdGUubGlzdGlkLCBkZWxldGVkU3RhdHVzID0gZmFsc2UpIHtcbiAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBsaXN0aWQgJiYgZW50cnkuZGVsZXRlZCA9PT0gZGVsZXRlZFN0YXR1cyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dMb2NrKCkge1xuICAgIC8vIE9wZW4gdGhlIGxvY2sgaW4gRW1haWwgQ29kZSBtb2RlIHdpdGggdGhlIGFiaWxpdHkgdG8gaGFuZGxlIHRoZSBhdXRoZW50aWNhdGlvbiBpbiBwYWdlXG4gICAgdGhpcy5sb2NrLmVtYWlsY29kZSgoZXJyLCBwcm9maWxlLCBpZFRva2VuLCBzdGF0ZSkgPT4ge1xuICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgLy8gc2V0IEpXVCBvbiBsb2NhbHN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbik7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJpZDogcHJvZmlsZS51c2VyX2lkLFxuICAgICAgICAgIHByb2ZpbGU6IHByb2ZpbGUsXG4gICAgICAgICAgLy8gcmVsaWVzIG9uIGxvY2FsIHN0b3JhZ2UsIHRyaWdnZXJzIHJlbmRlcigpXG4gICAgICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAgICAgdmFyIHVzZXJEYXRhID0ge307XG4gICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZmlsZS51c2VyX2lkO1xuICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2ZpbGUuZW1haWw7XG4gICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAvLyBzbXNcbiAgICAvLyB0aGlzLmxvY2suc21zKChlcnIsIHByb2ZpbGUsIGlkVG9rZW4sIHN0YXRlKSA9PiB7XG4gICAgLy8gICBpZiAoIWVycikge1xuICAgIC8vICAgICAvLyBzZXQgSldUIG9uIGxvY2Fsc3RvcmFnZVxuICAgIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBpZFRva2VuKTtcbiAgICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgLy8gICAgICAgdXNlcmlkOiBwcm9maWxlLnVzZXJfaWQsXG4gICAgLy8gICAgICAgcHJvZmlsZTogcHJvZmlsZSxcbiAgICAvLyAgICAgICAvLyByZWxpZXMgb24gbG9jYWwgc3RvcmFnZSwgdHJpZ2dlcnMgcmVuZGVyKClcbiAgICAvLyAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgIC8vICAgICB9LCAoKSA9PiB7XG4gICAgLy8gICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgLy8gICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIC8vIGFkZCB1c2VyIHRvIGRiXG4gICAgLy8gICAgIHZhciB1c2VyRGF0YSA9IHt9XG4gICAgLy8gICAgIHVzZXJEYXRhLmlkID0gcHJvZmlsZS51c2VyX2lkXG4gICAgLy8gICAgIHVzZXJEYXRhLmVtYWlsID0gcHJvZmlsZS5lbWFpbFxuICAgIC8vICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpXG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gIH1cblxuICBnZXRJZFRva2VuKCkge1xuICAgIC8vIEZpcnN0LCBjaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgSldUIGluIGxvY2FsIHN0b3JhZ2VcbiAgICB2YXIgaWRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpO1xuICAgIHZhciBhdXRoSGFzaCA9IHRoaXMubG9jay5wYXJzZUhhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgIC8vIElmIHRoZXJlIGlzIG5vIEpXVCBpbiBsb2NhbCBzdG9yYWdlIGFuZCB0aGVyZSBpcyBvbmUgaW4gdGhlIFVSTCBoYXNoLFxuICAgIC8vIHNhdmUgaXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGlmICghaWRUb2tlbiAmJiBhdXRoSGFzaCkge1xuICAgICAgaWYgKGF1dGhIYXNoLmlkX3Rva2VuKSB7XG4gICAgICAgIGlkVG9rZW4gPSBhdXRoSGFzaC5pZF90b2tlbjtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aEhhc2guaWRfdG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGF1dGhIYXNoLmVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgY29uZGl0aW9uc1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc2lnbmluZyBpbicsIGF1dGhIYXNoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkVG9rZW47XG4gIH1cblxuICBsb2dPdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpZFRva2VuOiAnJ1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmlkVG9rZW4gJiZcbiAgICAgIC8vIGlkZWFsbHkgeW91IGNhbiBicmluZyBpbiBhIGxpYnJhcnkgZm9yIHRoaXMgaWYgeW91IG5lZWQgdG8gZG8gaXQgYSBsb3RcbiAgICAgIC8vIGV4cGlyZSBkYXRlIG9uIHRva2VuIGV4aXN0c1xuICAgICAgSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0aGlzLnN0YXRlLmlkVG9rZW4uc3BsaXQoJy4nKVsxXSkpLmV4cCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAvLyBleHBpcmUgZGF0ZSBvbiB0b2tlbiBpcyBtb3JlIHRoYW4gY3VycmVudCB0aW1lXG4gICAgICBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuc3RhdGUuaWRUb2tlbi5zcGxpdCgnLicpWzFdKSkuZXhwID4gRGF0ZS5ub3coKSAvIDEwMDApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPE5hdkJhciB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBuYXZMaXN0PXt0aGlzLnN0YXRlLm5hdkxpc3R9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnVwZGF0ZUxpc3RpZH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0vPlxuICAgICAgICAgIDxUb2RvRm9ybSBhZGRJdGVtPXt0aGlzLmFkZEl0ZW19IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9Lz5cbiAgICAgICAgICA8VG9kb0xpc3QgbG9jaz17dGhpcy5sb2NrfSB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gZGVsZXRlSXRlbT17dGhpcy5kZWxldGVJdGVtfSB1cGRhdGVRdWFudD17dGhpcy51cGRhdGVRdWFudH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gLz5cbiAgICAgICAgICA8VG9kb0Nvc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUxpc3Q9e3RoaXMuZGVsZXRlTGlzdH0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0vPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YSBvbkNsaWNrPXsoZSkgPT4gdGhpcy5sb2dPdXQoKX0+bG9nb3V0PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGEgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+U2lnbiBJbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG4iXX0=