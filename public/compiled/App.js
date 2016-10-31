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
      if (addOrSub === "add") {
        item.quantity++;
      } else if (addOrSub === "sub") {
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
        return console.log("err0r", err);
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
      this.lock.emailcode(function (err, profile, id_token, state) {
        if (!err) {
          // set JWT on localstorage
          localStorage.setItem('id_token', id_token);
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
      // this.lock.sms((err, profile, id_token, state) => {
      //   if (!err) {
      //     // set JWT on localstorage
      //     localStorage.setItem('id_token', id_token);
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
          console.log("Error signing in", authHash);
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
//# sourceMappingURL=data:application/json;base64,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RUFBMkIsVUFBVSxLQUFLLEtBQUwsQ0FBVyxXQUFoRCxFQUE2RCxZQUFZLEtBQUssVUFBOUUsRUFBMEYsYUFBYSxLQUFLLFdBQTVHLEVBQXlILFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBNUksR0FIRjtBQUlFLDhCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFdBQS9CLEVBQTRDLFlBQVksS0FBSyxVQUE3RCxFQUF5RSxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTVGLEVBQW9HLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBdkgsR0FKRjtBQUtFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxnQkFBRyxTQUFTLGlCQUFDLENBQUQ7QUFBQSx5QkFBTyxPQUFLLE1BQUwsRUFBUDtBQUFBLGlCQUFaO0FBQUE7QUFBQTtBQURGO0FBTEYsU0FERjtBQVdELE9BaEJELE1BZ0JPO0FBQ0wsZUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBRyxTQUFTLGlCQUFDLENBQUQ7QUFBQSx1QkFBTyxPQUFLLFFBQUwsRUFBUDtBQUFBLGVBQVo7QUFBQTtBQUFBO0FBREYsU0FERjtBQUtEO0FBQ0Y7Ozs7RUF0VmUsTUFBTSxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAnd2hhdHdnLWZldGNoJztcbi8vIHZhciBqd3QgPSByZXF1aXJlKCdqc29ud2VidG9rZW4nKVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrUGFzc3dvcmRsZXNzKCdlYUR6TG1BTHhiN2Z2eFFoVktUa3hXOHJFRHRNbkdaRCcsICdkYW5jaC5hdXRoMC5jb20nKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgIH0sICgpID0+IHtcbiAgICAgIC8vIHNldCBtb3JlIHN0YXRlIHN0dWZmXG4gICAgICB0aGlzLmxvY2suZ2V0UHJvZmlsZSh0aGlzLnN0YXRlLmlkVG9rZW4sIChlcnIsIHByb2YpICA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJpZDogcHJvZi51c2VyX2lkLFxuICAgICAgICAgIHByb2ZpbGU6IHByb2ZcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICB9KVxuICAgICAgICB2YXIgdXNlckRhdGEgPSB7fVxuICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2YudXNlcl9pZFxuICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2YuZW1haWxcbiAgICAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW10sXG4gICAgICBuYXZMaXN0OiBbXSxcbiAgICAgIGRpc3BsYXlMaXN0OiBbXSxcbiAgICAgIGxpc3RpZDogMSwgLy9kZWZhdWx0IC0gbmVlZCB0byBjaGFuZ2UgaXQgYmFzZWQgb24gd2hlbiB1c2VyIGxvZ3MgaW5cbiAgICAgIHVzZXJpZDogJycgLy90ZW1wb3JhcmlseVxuICAgIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgTElTVCBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgXG4gICAgdGhpcy5mZXRjaExpc3RzID0gKCkgPT4ge1xuICAgICAgLy8gdXNlcmlkIGlzIGJlaW5nIHBhc3NlZCBvbiBpbiBVUkwsIHVsdGltYXRlbHkgcmVmYWN0b3Igb3VyIHdoZW4gYXV0aCB0b2tlbiBpcyBpbiBwbGFjZVxuICAgICAgdmFyIGdldFVybCA9IGAvbGlzdHMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gXG4gICAgICBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGRpc3BsYXlMaXN0aWQgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWluKHZhbC5pZCwgbWVtbylcbiAgICAgICAgfSwgSW5maW5pdHkpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBkaXNwbGF5TGlzdGlkXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIHZpc3VhbGx5IHdoYXQgZG8geW91IHNlZSwgZG9lcyBub3QgY2hhbmdlIG1hc3Rlckxpc3Qgb3IgbmF2TGlzdFxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGlzdGlkOiBpZFxuICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgfVxuXG4gICAgLy8gcG9zdHMgYSBuZXcgbGlzdCBhbmQgZ2V0cyBhbGwgbGlzdHMgYWxsb3dzIC0gZm9sbG93IHJvdXRlIHRvIHNlZVxuICAgIHRoaXMuYWRkTGlzdCA9IChuZXdMaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdMaXN0KVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHZhciBhY3RpdmVMaXN0ID0gZGF0YS5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCh2YWwuaWQsIG1lbW8pXG4gICAgICAgIH0sIC1JbmZpbml0eSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGFjdGl2ZUxpc3RcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlTGlzdCA9IChsaXN0KSA9PiB7XG4gICAgICBmZXRjaCgnL2xpc3RzJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbylcbiAgICAgICAgfSwgLUluZmluaXR5KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhLFxuICAgICAgICAgIGxpc3RpZDogYWN0aXZlTGlzdFxuICAgICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICAgIH0pXG4gICAgfVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgSVRFTSBDSEFOR0VTICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICB0aGlzLnVwZGF0ZVF1YW50ID0gKGl0ZW0sIGFkZE9yU3ViKSA9PiB7XG4gICAgICBpZiAoYWRkT3JTdWIgPT09IFwiYWRkXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSsrXG4gICAgICB9IGVsc2UgaWYgKGFkZE9yU3ViID09PSBcInN1YlwiKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkgPSBNYXRoLm1heChpdGVtLnF1YW50aXR5IC0gMSwgMClcbiAgICAgIH1cbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmFkZEl0ZW0gPSAobmV3SXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3SXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmRlbGV0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgICB9KVxuICAgIH1cblxuXG5cbiAgICAvLyAvLyBub3QgYmVpbmcgdXNlZFxuICAgIC8vIHRoaXMuZmlsdGVyRGF0YSA9IChmaWx0ZXJPYmopID0+IHtcbiAgICAvLyAgICQuYWpheCh7XG4gICAgLy8gICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIC8vICAgICB1cmw6IFwiL2ZpbHRlclwiLFxuICAgIC8vICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgLy8gICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGZpbHRlck9iaiksXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAvLyAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgIC8vICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpXG4gICAgLy8gICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7XG4gICAgLy8gICAgICAgLy8gICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgLy8gICAgICAgLy8gfSlcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9KVxuICAgIC8vIH1cblxuICB9XG5cbiAgLy8gZGVsZXRlSXRlbShpdGVtKSB7XG4gIC8vICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgLy8gICAgIG1ldGhvZDogJ0RFTEVURScsXG4gIC8vICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gIC8vICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgLy8gICAgIH0sXG4gIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKVxuICAvLyAgIH0pXG4gIC8vICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAvLyAgIC50aGVuKChkYXRhKSA9PiB7XG4gIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgLy8gICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAvLyAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIGFkZFVzZXIodXNlckRhdGEpIHtcbiAgICBmZXRjaChgL3VzZXJzYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSlcbiAgICB9KVxuICAgIC50aGVuKChib2R5KSA9PiBib2R5Lmpzb24oKSlcbiAgICAudGhlbigocmVzKSA9PiBjb25zb2xlLmxvZyhyZXMpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhcImVycjByXCIsIGVycikpXG4gIH1cblxuICBmZXRjaEl0ZW1zKCkge1xuICAgIHZhciBnZXRVcmwgPSBgL2l0ZW1zLyR7dGhpcy5zdGF0ZS51c2VyaWR9YFxuICAgIGZldGNoKGdldFVybClcbiAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgfSlcbiAgICAvLyBzZXQgc3RhdGUgd2l0aCBpdFxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgfSlcbiAgfVxuXG4gIC8vIGdvdCBhbGwgaXRlbXMgYW5kIGZpbHRlciBmb3IgZGVsZXRlZCBpdGVtc1xuICBtYWtlRGlzcGxheURhdGEobGlzdGlkID0gdGhpcy5zdGF0ZS5saXN0aWQsIGRlbGV0ZWRTdGF0dXMgPSBmYWxzZSkge1xuICAgIHZhciBkaXNwbGF5TGlzdCA9IHRoaXMuc3RhdGUubWFzdGVyTGlzdC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5saXN0aWQgPT09IGxpc3RpZCAmJiBlbnRyeS5kZWxldGVkID09PSBkZWxldGVkU3RhdHVzKVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZGlzcGxheUxpc3Q6IGRpc3BsYXlMaXN0XG4gICAgfSlcbiAgfVxuXG4gIHNob3dMb2NrKCkge1xuICAgIC8vIE9wZW4gdGhlIGxvY2sgaW4gRW1haWwgQ29kZSBtb2RlIHdpdGggdGhlIGFiaWxpdHkgdG8gaGFuZGxlIHRoZSBhdXRoZW50aWNhdGlvbiBpbiBwYWdlXG4gICAgdGhpcy5sb2NrLmVtYWlsY29kZSgoZXJyLCBwcm9maWxlLCBpZF90b2tlbiwgc3RhdGUpID0+IHtcbiAgICAgIGlmICghZXJyKSB7XG4gICAgICAgIC8vIHNldCBKV1Qgb24gbG9jYWxzdG9yYWdlXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkX3Rva2VuKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcmlkOiBwcm9maWxlLnVzZXJfaWQsXG4gICAgICAgICAgcHJvZmlsZTogcHJvZmlsZSxcbiAgICAgICAgICAvLyByZWxpZXMgb24gbG9jYWwgc3RvcmFnZSwgdHJpZ2dlcnMgcmVuZGVyKClcbiAgICAgICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC8vIGFkZCB1c2VyIHRvIGRiXG4gICAgICAgIHZhciB1c2VyRGF0YSA9IHt9XG4gICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZmlsZS51c2VyX2lkXG4gICAgICAgIHVzZXJEYXRhLmVtYWlsID0gcHJvZmlsZS5lbWFpbFxuICAgICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAvLyBzbXNcbiAgICAvLyB0aGlzLmxvY2suc21zKChlcnIsIHByb2ZpbGUsIGlkX3Rva2VuLCBzdGF0ZSkgPT4ge1xuICAgIC8vICAgaWYgKCFlcnIpIHtcbiAgICAvLyAgICAgLy8gc2V0IEpXVCBvbiBsb2NhbHN0b3JhZ2VcbiAgICAvLyAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRfdG9rZW4pO1xuICAgIC8vICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICB1c2VyaWQ6IHByb2ZpbGUudXNlcl9pZCxcbiAgICAvLyAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgIC8vICAgICAgIC8vIHJlbGllcyBvbiBsb2NhbCBzdG9yYWdlLCB0cmlnZ2VycyByZW5kZXIoKVxuICAgIC8vICAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgLy8gICAgIH0sICgpID0+IHtcbiAgICAvLyAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAvLyAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAvLyAgICAgdmFyIHVzZXJEYXRhID0ge31cbiAgICAvLyAgICAgdXNlckRhdGEuaWQgPSBwcm9maWxlLnVzZXJfaWRcbiAgICAvLyAgICAgdXNlckRhdGEuZW1haWwgPSBwcm9maWxlLmVtYWlsXG4gICAgLy8gICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSlcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfVxuXG4gIGdldElkVG9rZW4oKSB7XG4gICAgLy8gRmlyc3QsIGNoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBKV1QgaW4gbG9jYWwgc3RvcmFnZVxuICAgIHZhciBpZFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgdmFyIGF1dGhIYXNoID0gdGhpcy5sb2NrLnBhcnNlSGFzaCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gSldUIGluIGxvY2FsIHN0b3JhZ2UgYW5kIHRoZXJlIGlzIG9uZSBpbiB0aGUgVVJMIGhhc2gsXG4gICAgLy8gc2F2ZSBpdCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgaWYgKCFpZFRva2VuICYmIGF1dGhIYXNoKSB7XG4gICAgICBpZiAoYXV0aEhhc2guaWRfdG9rZW4pIHtcbiAgICAgICAgaWRUb2tlbiA9IGF1dGhIYXNoLmlkX3Rva2VuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGF1dGhIYXNoLmlkX3Rva2VuKTtcbiAgICAgIH1cbiAgICAgIGlmIChhdXRoSGFzaC5lcnJvcikge1xuICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIGNvbmRpdGlvbnNcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBzaWduaW5nIGluXCIsIGF1dGhIYXNoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlkVG9rZW47XG4gIH1cblxuICBsb2dPdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJylcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46ICcnXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5pZFRva2VuICYmXG4gICAgICAvLyBleHBpcmUgZGF0ZSBvbiB0b2tlbiBleGlzdHNcbiAgICAgIEpTT04ucGFyc2Uod2luZG93LmF0b2IodGhpcy5zdGF0ZS5pZFRva2VuLnNwbGl0KCcuJylbMV0pKS5leHAgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgLy8gZXhwaXJlIGRhdGUgb24gdG9rZW4gaXMgbW9yZSB0aGFuIGN1cnJlbnQgdGltZVxuICAgICAgSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0aGlzLnN0YXRlLmlkVG9rZW4uc3BsaXQoJy4nKVsxXSkpLmV4cCA+IERhdGUubm93KCkvMTAwMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8TmF2QmFyIHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IG5hdkxpc3Q9e3RoaXMuc3RhdGUubmF2TGlzdH0gYWRkTGlzdD17dGhpcy5hZGRMaXN0fSB1cGRhdGVMaXN0aWQ9e3RoaXMudXBkYXRlTGlzdGlkfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfS8+XG4gICAgICAgICAgPFRvZG9Gb3JtIGFkZEl0ZW09e3RoaXMuYWRkSXRlbX0gbGlzdGlkPXt0aGlzLnN0YXRlLmxpc3RpZH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0vPlxuICAgICAgICAgIDxUb2RvTGlzdCBsb2NrPXt0aGlzLmxvY2t9IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnVwZGF0ZVF1YW50fSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSAvPlxuICAgICAgICAgIDxUb2RvQ29zdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gZGVsZXRlTGlzdD17dGhpcy5kZWxldGVMaXN0fSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfS8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxhIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmxvZ091dCgpfT5sb2dvdXQ8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxhIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnNob3dMb2NrKCl9PlNpZ24gSW48L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgfVxuXG5cblxufVxuXG5cbiJdfQ==