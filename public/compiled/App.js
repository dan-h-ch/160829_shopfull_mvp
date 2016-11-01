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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9BcHAuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztJQUVNLEc7Ozs7O3lDQUVpQjtBQUNuQixXQUFLLElBQUwsR0FBWSxJQUFJLHFCQUFKLENBQTBCLGtDQUExQixFQUE4RCxpQkFBOUQsQ0FBWjtBQUNEOzs7d0NBRW1CO0FBQUE7O0FBQ2xCLFdBQUssUUFBTCxDQUFjO0FBQ1osaUJBQVMsS0FBSyxVQUFMO0FBREcsT0FBZCxFQUVHLFlBQU07QUFDUDtBQUNBLGVBQUssSUFBTCxDQUFVLFVBQVYsQ0FBcUIsT0FBSyxLQUFMLENBQVcsT0FBaEMsRUFBeUMsVUFBQyxHQUFELEVBQU0sSUFBTixFQUFnQjtBQUN2RCxpQkFBSyxRQUFMLENBQWM7QUFDWixvQkFBUSxLQUFLLE9BREQ7QUFFWixxQkFBUztBQUZHLFdBQWQsRUFHRyxZQUFNO0FBQ1AsbUJBQUssVUFBTDtBQUNBLG1CQUFLLFVBQUw7QUFDRCxXQU5EO0FBT0EsY0FBSSxXQUFXLEVBQWY7QUFDQSxtQkFBUyxFQUFULEdBQWMsS0FBSyxPQUFuQjtBQUNBLG1CQUFTLEtBQVQsR0FBaUIsS0FBSyxLQUF0QjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxRQUFiO0FBQ0QsU0FaRDtBQWFELE9BakJEO0FBa0JEOzs7QUFFRCxlQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWCxLQURXOztBQUdqQixVQUFLLEtBQUwsR0FBYTtBQUNYLGtCQUFZLEVBREQ7QUFFWCxlQUFTLEVBRkU7QUFHWCxtQkFBYSxFQUhGO0FBSVgsY0FBUSxDQUpHLEVBSUE7QUFDWCxjQUFRLEVBTEcsQ0FLQTtBQUxBLEtBQWI7O0FBU0o7QUFDQTtBQUNBOztBQUVJLFVBQUssVUFBTCxHQUFrQixZQUFNO0FBQ3RCO0FBQ0EsVUFBSSxxQkFBbUIsTUFBSyxLQUFMLENBQVcsTUFBbEM7QUFDQSxZQUFNLE1BQU4sRUFDQyxJQURELENBQ00sVUFBQyxHQUFEO0FBQUEsZUFBUyxJQUFJLElBQUosRUFBVDtBQUFBLE9BRE4sRUFFQyxJQUZELENBRU0sVUFBQyxJQUFELEVBQVU7QUFDZCxZQUFJLGdCQUFnQixLQUFLLE1BQUwsQ0FBWSxVQUFDLElBQUQsRUFBTyxHQUFQLEVBQWU7QUFDN0MsaUJBQU8sS0FBSyxHQUFMLENBQVMsSUFBSSxFQUFiLEVBQWlCLElBQWpCLENBQVA7QUFDRCxTQUZtQixFQUVqQixRQUZpQixDQUFwQjtBQUdBLGNBQUssUUFBTCxDQUFjO0FBQ1osbUJBQVMsSUFERztBQUVaLGtCQUFRO0FBRkksU0FBZDtBQUlELE9BVkQ7QUFXRCxLQWREOztBQWdCQTtBQUNBLFVBQUssWUFBTCxHQUFvQixVQUFDLEVBQUQsRUFBUTtBQUMxQixZQUFLLFFBQUwsQ0FBYztBQUNaLGdCQUFRO0FBREksT0FBZCxFQUVHLFlBQVc7QUFBQyxhQUFLLGVBQUw7QUFBdUIsT0FGdEM7QUFHRCxLQUpEOztBQU1BO0FBQ0EsVUFBSyxPQUFMLEdBQWUsVUFBQyxPQUFELEVBQWE7QUFDMUIsWUFBTSxRQUFOLEVBQWdCO0FBQ2QsZ0JBQVEsTUFETTtBQUVkLGlCQUFTO0FBQ1Asb0JBQVUsa0JBREg7QUFFUCwwQkFBZ0I7QUFGVCxTQUZLO0FBTWQsY0FBTSxLQUFLLFNBQUwsQ0FBZSxPQUFmO0FBTlEsT0FBaEIsRUFRQyxJQVJELENBUU0sVUFBQyxJQUFEO0FBQUEsZUFBVSxLQUFLLElBQUwsRUFBVjtBQUFBLE9BUk4sRUFTQyxJQVRELENBU00sVUFBQyxJQUFELEVBQVU7QUFDZCxZQUFJLGFBQWEsS0FBSyxNQUFMLENBQVksVUFBQyxJQUFELEVBQU8sR0FBUCxFQUFlO0FBQzFDLGlCQUFPLEtBQUssR0FBTCxDQUFTLElBQUksRUFBYixFQUFpQixJQUFqQixDQUFQO0FBQ0QsU0FGZ0IsRUFFZCxDQUFDLFFBRmEsQ0FBakI7QUFHQSxjQUFLLFFBQUwsQ0FBYztBQUNaLG1CQUFTLElBREc7QUFFWixrQkFBUTtBQUZJLFNBQWQsRUFHRyxZQUFXO0FBQUMsZUFBSyxlQUFMO0FBQXVCLFNBSHRDO0FBSUQsT0FqQkQ7QUFrQkQsS0FuQkQ7O0FBcUJBLFVBQUssVUFBTCxHQUFrQixVQUFDLElBQUQsRUFBVTtBQUMxQixZQUFNLFFBQU4sRUFBZ0I7QUFDZCxnQkFBUSxRQURNO0FBRWQsaUJBQVM7QUFDUCxvQkFBVSxrQkFESDtBQUVQLDBCQUFnQjtBQUZULFNBRks7QUFNZCxjQUFNLEtBQUssU0FBTCxDQUFlLElBQWY7QUFOUSxPQUFoQixFQVFDLElBUkQsQ0FRTSxVQUFDLElBQUQ7QUFBQSxlQUFVLEtBQUssSUFBTCxFQUFWO0FBQUEsT0FSTixFQVNDLElBVEQsQ0FTTSxVQUFDLElBQUQsRUFBVTtBQUNkLFlBQUksYUFBYSxLQUFLLE1BQUwsQ0FBWSxVQUFDLElBQUQsRUFBTyxHQUFQLEVBQWU7QUFDMUMsaUJBQU8sS0FBSyxHQUFMLENBQVMsSUFBSSxFQUFiLEVBQWlCLElBQWpCLENBQVA7QUFDRCxTQUZnQixFQUVkLENBQUMsUUFGYSxDQUFqQjtBQUdBLGNBQUssUUFBTCxDQUFjO0FBQ1osbUJBQVMsSUFERztBQUVaLGtCQUFRO0FBRkksU0FBZCxFQUdHLFlBQVc7QUFBQyxlQUFLLGVBQUw7QUFBdUIsU0FIdEM7QUFJRCxPQWpCRDtBQWtCRCxLQW5CRDs7QUFxQko7QUFDQTtBQUNBOztBQUVJLFVBQUssV0FBTCxHQUFtQixVQUFDLElBQUQsRUFBTyxRQUFQLEVBQW9CO0FBQ3JDLFVBQUksYUFBYSxLQUFqQixFQUF3QjtBQUN0QixhQUFLLFFBQUw7QUFDRCxPQUZELE1BRU8sSUFBSSxhQUFhLEtBQWpCLEVBQXdCO0FBQzdCLGFBQUssUUFBTCxHQUFnQixLQUFLLEdBQUwsQ0FBUyxLQUFLLFFBQUwsR0FBZ0IsQ0FBekIsRUFBNEIsQ0FBNUIsQ0FBaEI7QUFDRDtBQUNELFlBQU0sUUFBTixFQUFnQjtBQUNkLGdCQUFRLEtBRE07QUFFZCxpQkFBUztBQUNQLG9CQUFVLGtCQURIO0FBRVAsMEJBQWdCO0FBRlQsU0FGSztBQU1kLGNBQU0sS0FBSyxTQUFMLENBQWUsSUFBZjtBQU5RLE9BQWhCLEVBUUMsSUFSRCxDQVFNLFVBQUMsSUFBRDtBQUFBLGVBQVUsS0FBSyxJQUFMLEVBQVY7QUFBQSxPQVJOLEVBU0MsSUFURCxDQVNNLFVBQUMsSUFBRCxFQUFVO0FBQ2QsY0FBSyxRQUFMLENBQWM7QUFDWixzQkFBWTtBQURBLFNBQWQ7QUFHRCxPQWJEO0FBY0QsS0FwQkQ7O0FBc0JBLFVBQUssT0FBTCxHQUFlLFVBQUMsT0FBRCxFQUFhO0FBQzFCLFlBQU0sUUFBTixFQUFnQjtBQUNkLGdCQUFRLE1BRE07QUFFZCxpQkFBUztBQUNQLG9CQUFVLGtCQURIO0FBRVAsMEJBQWdCO0FBRlQsU0FGSztBQU1kLGNBQU0sS0FBSyxTQUFMLENBQWUsT0FBZjtBQU5RLE9BQWhCLEVBUUMsSUFSRCxDQVFNLFVBQUMsSUFBRDtBQUFBLGVBQVUsS0FBSyxJQUFMLEVBQVY7QUFBQSxPQVJOLEVBU0MsSUFURCxDQVNNLFVBQUMsSUFBRCxFQUFVO0FBQ2QsY0FBSyxRQUFMLENBQWM7QUFDWixzQkFBWTtBQURBLFNBQWQsRUFFRyxZQUFXO0FBQUMsZUFBSyxlQUFMO0FBQXVCLFNBRnRDO0FBR0QsT0FiRDtBQWNELEtBZkQ7O0FBaUJBLFVBQUssVUFBTCxHQUFrQixVQUFDLElBQUQsRUFBVTtBQUMxQixZQUFNLFFBQU4sRUFBZ0I7QUFDZCxnQkFBUSxRQURNO0FBRWQsaUJBQVM7QUFDUCxvQkFBVSxrQkFESDtBQUVQLDBCQUFnQjtBQUZULFNBRks7QUFNZCxjQUFNLEtBQUssU0FBTCxDQUFlLElBQWY7QUFOUSxPQUFoQixFQVFDLElBUkQsQ0FRTSxVQUFDLElBQUQ7QUFBQSxlQUFVLEtBQUssSUFBTCxFQUFWO0FBQUEsT0FSTixFQVNDLElBVEQsQ0FTTSxVQUFDLElBQUQsRUFBVTtBQUNkLGNBQUssUUFBTCxDQUFjO0FBQ1osc0JBQVk7QUFEQSxTQUFkLEVBRUcsWUFBVztBQUFDLGVBQUssZUFBTDtBQUF1QixTQUZ0QztBQUdELE9BYkQ7QUFjRCxLQWZEOztBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFsS2lCO0FBb0tsQjs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs0QkFFUSxRLEVBQVU7QUFDaEIsc0JBQWdCO0FBQ2QsZ0JBQVEsTUFETTtBQUVkLGlCQUFTO0FBQ1Asb0JBQVUsa0JBREg7QUFFUCwwQkFBZ0I7QUFGVCxTQUZLO0FBTWQsY0FBTSxLQUFLLFNBQUwsQ0FBZSxRQUFmO0FBTlEsT0FBaEIsRUFRQyxJQVJELENBUU0sVUFBQyxJQUFEO0FBQUEsZUFBVSxLQUFLLElBQUwsRUFBVjtBQUFBLE9BUk4sRUFTQyxJQVRELENBU00sVUFBQyxHQUFEO0FBQUEsZUFBUyxRQUFRLEdBQVIsQ0FBWSxHQUFaLENBQVQ7QUFBQSxPQVROLEVBVUMsS0FWRCxDQVVPLFVBQUMsR0FBRDtBQUFBLGVBQVMsUUFBUSxHQUFSLENBQVksT0FBWixFQUFxQixHQUFyQixDQUFUO0FBQUEsT0FWUDtBQVdEOzs7aUNBRVk7QUFBQTs7QUFDWCxVQUFJLHFCQUFtQixLQUFLLEtBQUwsQ0FBVyxNQUFsQztBQUNBLFlBQU0sTUFBTixFQUNDLElBREQsQ0FDTSxVQUFTLEdBQVQsRUFBYztBQUNsQixlQUFPLElBQUksSUFBSixFQUFQO0FBQ0QsT0FIRDtBQUlBO0FBSkEsT0FLQyxJQUxELENBS00sVUFBQyxJQUFELEVBQVU7QUFDZCxlQUFLLFFBQUwsQ0FBYztBQUNaLHNCQUFZO0FBREEsU0FBZCxFQUVHLFlBQVc7QUFBQyxlQUFLLGVBQUw7QUFBdUIsU0FGdEM7QUFHRCxPQVREO0FBVUQ7O0FBRUQ7Ozs7c0NBQ21FO0FBQUEsVUFBbkQsTUFBbUQseURBQTFDLEtBQUssS0FBTCxDQUFXLE1BQStCO0FBQUEsVUFBdkIsYUFBdUIseURBQVAsS0FBTzs7QUFDakUsVUFBSSxjQUFjLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsTUFBdEIsQ0FBNkIsVUFBQyxLQUFEO0FBQUEsZUFBVyxNQUFNLE1BQU4sS0FBaUIsTUFBakIsSUFBMkIsTUFBTSxPQUFOLEtBQWtCLGFBQXhEO0FBQUEsT0FBN0IsQ0FBbEI7QUFDQSxXQUFLLFFBQUwsQ0FBYztBQUNaLHFCQUFhO0FBREQsT0FBZDtBQUdEOzs7K0JBRVU7QUFBQTs7QUFDVDtBQUNBLFdBQUssSUFBTCxDQUFVLFNBQVYsQ0FBb0IsVUFBQyxHQUFELEVBQU0sT0FBTixFQUFlLFFBQWYsRUFBeUIsS0FBekIsRUFBbUM7QUFDckQsWUFBSSxDQUFDLEdBQUwsRUFBVTtBQUNSO0FBQ0EsdUJBQWEsT0FBYixDQUFxQixVQUFyQixFQUFpQyxRQUFqQztBQUNBLGlCQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFRLFFBQVEsT0FESjtBQUVaLHFCQUFTLE9BRkc7QUFHWjtBQUNBLHFCQUFTLE9BQUssVUFBTDtBQUpHLFdBQWQsRUFLRyxZQUFNO0FBQ1AsbUJBQUssVUFBTDtBQUNBLG1CQUFLLFVBQUw7QUFDRCxXQVJEO0FBU0E7QUFDQSxjQUFJLFdBQVcsRUFBZjtBQUNBLG1CQUFTLEVBQVQsR0FBYyxRQUFRLE9BQXRCO0FBQ0EsbUJBQVMsS0FBVCxHQUFpQixRQUFRLEtBQXpCO0FBQ0EsaUJBQUssT0FBTCxDQUFhLFFBQWI7QUFDRDtBQUNGLE9BbkJEOztBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7O2lDQUVZO0FBQ1g7QUFDQSxVQUFJLFVBQVUsYUFBYSxPQUFiLENBQXFCLFVBQXJCLENBQWQ7QUFDQSxVQUFJLFdBQVcsS0FBSyxJQUFMLENBQVUsU0FBVixDQUFvQixPQUFPLFFBQVAsQ0FBZ0IsSUFBcEMsQ0FBZjtBQUNBO0FBQ0E7QUFDQSxVQUFJLENBQUMsT0FBRCxJQUFZLFFBQWhCLEVBQTBCO0FBQ3hCLFlBQUksU0FBUyxRQUFiLEVBQXVCO0FBQ3JCLG9CQUFVLFNBQVMsUUFBbkI7QUFDQSx1QkFBYSxPQUFiLENBQXFCLFVBQXJCLEVBQWlDLFNBQVMsUUFBMUM7QUFDRDtBQUNELFlBQUksU0FBUyxLQUFiLEVBQW9CO0FBQ2xCO0FBQ0Esa0JBQVEsR0FBUixDQUFZLGtCQUFaLEVBQWdDLFFBQWhDO0FBQ0Q7QUFDRjtBQUNELGFBQU8sT0FBUDtBQUNEOzs7NkJBRVE7QUFDUCxtQkFBYSxVQUFiLENBQXdCLFVBQXhCO0FBQ0EsV0FBSyxRQUFMLENBQWM7QUFDWixpQkFBUztBQURHLE9BQWQ7QUFHRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYO0FBQ0Y7QUFDQTtBQUNBLFdBQUssS0FBTCxDQUFXLE9BQU8sSUFBUCxDQUFZLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FBbkIsQ0FBeUIsR0FBekIsRUFBOEIsQ0FBOUIsQ0FBWixDQUFYLEVBQTBELEdBQTFELEtBQWtFLFNBSGhFO0FBSUY7QUFDQSxXQUFLLEtBQUwsQ0FBVyxPQUFPLElBQVAsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCLENBQTlCLENBQVosQ0FBWCxFQUEwRCxHQUExRCxHQUFnRSxLQUFLLEdBQUwsS0FBVyxJQUw3RSxFQUttRjtBQUNqRixlQUNFO0FBQUE7QUFBQTtBQUNFLDhCQUFDLE1BQUQsSUFBUSxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTNCLEVBQW1DLFNBQVMsS0FBSyxLQUFMLENBQVcsT0FBdkQsRUFBZ0UsU0FBUyxLQUFLLE9BQTlFLEVBQXVGLGNBQWMsS0FBSyxZQUExRyxFQUF3SCxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTNJLEdBREY7QUFFRSw4QkFBQyxRQUFELElBQVUsU0FBUyxLQUFLLE9BQXhCLEVBQWlDLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBcEQsRUFBNEQsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUEvRSxHQUZGO0FBR0UsOEJBQUMsUUFBRCxJQUFVLE1BQU0sS0FBSyxJQUFyQixFQUEyQixVQUFVLEtBQUssS0FBTCxDQUFXLFdBQWhELEVBQTZELFlBQVksS0FBSyxVQUE5RSxFQUEwRixhQUFhLEtBQUssV0FBNUcsRUFBeUgsUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUE1SSxHQUhGO0FBSUUsOEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsV0FBL0IsRUFBNEMsWUFBWSxLQUFLLFVBQTdELEVBQXlFLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBNUYsRUFBb0csUUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUF2SCxHQUpGO0FBS0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGdCQUFHLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHlCQUFPLE9BQUssTUFBTCxFQUFQO0FBQUEsaUJBQVo7QUFBQTtBQUFBO0FBREY7QUFMRixTQURGO0FBV0QsT0FqQkQsTUFpQk87QUFDTCxlQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFHLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHVCQUFPLE9BQUssUUFBTCxFQUFQO0FBQUEsZUFBWjtBQUFBO0FBQUE7QUFERixTQURGO0FBS0Q7QUFDRjs7OztFQXZWZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xuLy8gdmFyIGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMubG9jayA9IG5ldyBBdXRoMExvY2tQYXNzd29yZGxlc3MoJ2VhRHpMbUFMeGI3ZnZ4UWhWS1RreFc4ckVEdE1uR1pEJywgJ2RhbmNoLmF1dGgwLmNvbScpXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgfSwgKCkgPT4ge1xuICAgICAgLy8gc2V0IG1vcmUgc3RhdGUgc3R1ZmZcbiAgICAgIHRoaXMubG9jay5nZXRQcm9maWxlKHRoaXMuc3RhdGUuaWRUb2tlbiwgKGVyciwgcHJvZikgID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgdXNlcmlkOiBwcm9mLnVzZXJfaWQsXG4gICAgICAgICAgcHJvZmlsZTogcHJvZlxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgICAgICAgdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgICAgIH0pXG4gICAgICAgIHZhciB1c2VyRGF0YSA9IHt9XG4gICAgICAgIHVzZXJEYXRhLmlkID0gcHJvZi51c2VyX2lkXG4gICAgICAgIHVzZXJEYXRhLmVtYWlsID0gcHJvZi5lbWFpbFxuICAgICAgICB0aGlzLmFkZFVzZXIodXNlckRhdGEpXG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtYXN0ZXJMaXN0OiBbXSxcbiAgICAgIG5hdkxpc3Q6IFtdLFxuICAgICAgZGlzcGxheUxpc3Q6IFtdLFxuICAgICAgbGlzdGlkOiAxLCAvL2RlZmF1bHQgLSBuZWVkIHRvIGNoYW5nZSBpdCBiYXNlZCBvbiB3aGVuIHVzZXIgbG9ncyBpblxuICAgICAgdXNlcmlkOiAnJyAvL3RlbXBvcmFyaWx5XG4gICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBMSVNUIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBcbiAgICB0aGlzLmZldGNoTGlzdHMgPSAoKSA9PiB7XG4gICAgICAvLyB1c2VyaWQgaXMgYmVpbmcgcGFzc2VkIG9uIGluIFVSTCwgdWx0aW1hdGVseSByZWZhY3RvciBvdXIgd2hlbiBhdXRoIHRva2VuIGlzIGluIHBsYWNlXG4gICAgICB2YXIgZ2V0VXJsID0gYC9saXN0cy8ke3RoaXMuc3RhdGUudXNlcmlkfWBcbiAgICAgIGZldGNoKGdldFVybClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgZGlzcGxheUxpc3RpZCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5taW4odmFsLmlkLCBtZW1vKVxuICAgICAgICB9LCBJbmZpbml0eSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YSxcbiAgICAgICAgICBsaXN0aWQ6IGRpc3BsYXlMaXN0aWRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gdmlzdWFsbHkgd2hhdCBkbyB5b3Ugc2VlLCBkb2VzIG5vdCBjaGFuZ2UgbWFzdGVyTGlzdCBvciBuYXZMaXN0XG4gICAgdGhpcy51cGRhdGVMaXN0aWQgPSAoaWQpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsaXN0aWQ6IGlkXG4gICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICB9XG5cbiAgICAvLyBwb3N0cyBhIG5ldyBsaXN0IGFuZCBnZXRzIGFsbCBsaXN0cyBhbGxvd3MgLSBmb2xsb3cgcm91dGUgdG8gc2VlXG4gICAgdGhpcy5hZGRMaXN0ID0gKG5ld0xpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZUxpc3QgPSBkYXRhLnJlZHVjZSgobWVtbywgdmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KHZhbC5pZCwgbWVtbylcbiAgICAgICAgfSwgLUluZmluaXR5KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhLFxuICAgICAgICAgIGxpc3RpZDogYWN0aXZlTGlzdFxuICAgICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVMaXN0ID0gKGxpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobGlzdClcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB2YXIgYWN0aXZlTGlzdCA9IGRhdGEucmVkdWNlKChtZW1vLCB2YWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgodmFsLmlkLCBtZW1vKVxuICAgICAgICB9LCAtSW5maW5pdHkpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5hdkxpc3Q6IGRhdGEsXG4gICAgICAgICAgbGlzdGlkOiBhY3RpdmVMaXN0XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgICAgfSlcbiAgICB9XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBJVEVNIENIQU5HRVMgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMudXBkYXRlUXVhbnQgPSAoaXRlbSwgYWRkT3JTdWIpID0+IHtcbiAgICAgIGlmIChhZGRPclN1YiA9PT0gXCJhZGRcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5KytcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09IFwic3ViXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IE1hdGgubWF4KGl0ZW0ucXVhbnRpdHkgLSAxLCAwKVxuICAgICAgfVxuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuYWRkSXRlbSA9IChuZXdJdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdJdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIC8vIC8vIG5vdCBiZWluZyB1c2VkXG4gICAgLy8gdGhpcy5maWx0ZXJEYXRhID0gKGZpbHRlck9iaikgPT4ge1xuICAgIC8vICAgJC5hamF4KHtcbiAgICAvLyAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgLy8gICAgIHVybDogXCIvZmlsdGVyXCIsXG4gICAgLy8gICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAvLyAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZmlsdGVyT2JqKSxcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vICAgICAgIGNhbGxiYWNrKGRhdGEpXG4gICAgLy8gICAgICAgLy8gY29uc29sZS5sb2codGhpcylcbiAgICAvLyAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgICAgICAvLyAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAvLyAgICAgICAvLyB9KVxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgLy8gICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuXG4gIH1cblxuICAvLyBkZWxldGVJdGVtKGl0ZW0pIHtcbiAgLy8gICBmZXRjaCgnL2l0ZW1zJywge1xuICAvLyAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgLy8gICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgLy8gICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAvLyAgICAgfSxcbiAgLy8gICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gIC8vICAgfSlcbiAgLy8gICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gIC8vICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xuICAvLyAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gIC8vICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgLy8gICB9KVxuICAvLyB9XG5cbiAgYWRkVXNlcih1c2VyRGF0YSkge1xuICAgIGZldGNoKGAvdXNlcnNgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKVxuICAgIH0pXG4gICAgLnRoZW4oKGJvZHkpID0+IGJvZHkuanNvbigpKVxuICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKHJlcykpXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiZXJyMHJcIiwgZXJyKSlcbiAgfVxuXG4gIGZldGNoSXRlbXMoKSB7XG4gICAgdmFyIGdldFVybCA9IGAvaXRlbXMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gXG4gICAgZmV0Y2goZ2V0VXJsKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICB9KVxuICAgIC8vIHNldCBzdGF0ZSB3aXRoIGl0XG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICB9KVxuICB9XG5cbiAgLy8gZ290IGFsbCBpdGVtcyBhbmQgZmlsdGVyIGZvciBkZWxldGVkIGl0ZW1zXG4gIG1ha2VEaXNwbGF5RGF0YShsaXN0aWQgPSB0aGlzLnN0YXRlLmxpc3RpZCwgZGVsZXRlZFN0YXR1cyA9IGZhbHNlKSB7XG4gICAgdmFyIGRpc3BsYXlMaXN0ID0gdGhpcy5zdGF0ZS5tYXN0ZXJMaXN0LmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lmxpc3RpZCA9PT0gbGlzdGlkICYmIGVudHJ5LmRlbGV0ZWQgPT09IGRlbGV0ZWRTdGF0dXMpXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICB9KVxuICB9XG5cbiAgc2hvd0xvY2soKSB7XG4gICAgLy8gT3BlbiB0aGUgbG9jayBpbiBFbWFpbCBDb2RlIG1vZGUgd2l0aCB0aGUgYWJpbGl0eSB0byBoYW5kbGUgdGhlIGF1dGhlbnRpY2F0aW9uIGluIHBhZ2VcbiAgICB0aGlzLmxvY2suZW1haWxjb2RlKChlcnIsIHByb2ZpbGUsIGlkX3Rva2VuLCBzdGF0ZSkgPT4ge1xuICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgLy8gc2V0IEpXVCBvbiBsb2NhbHN0b3JhZ2VcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRfdG9rZW4pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICB1c2VyaWQ6IHByb2ZpbGUudXNlcl9pZCxcbiAgICAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgICAgICAgIC8vIHJlbGllcyBvbiBsb2NhbCBzdG9yYWdlLCB0cmlnZ2VycyByZW5kZXIoKVxuICAgICAgICAgIGlkVG9rZW46IHRoaXMuZ2V0SWRUb2tlbigpXG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICB0aGlzLmZldGNoTGlzdHMoKTtcbiAgICAgICAgICB0aGlzLmZldGNoSXRlbXMoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLy8gYWRkIHVzZXIgdG8gZGJcbiAgICAgICAgdmFyIHVzZXJEYXRhID0ge31cbiAgICAgICAgdXNlckRhdGEuaWQgPSBwcm9maWxlLnVzZXJfaWRcbiAgICAgICAgdXNlckRhdGEuZW1haWwgPSBwcm9maWxlLmVtYWlsXG4gICAgICAgIHRoaXMuYWRkVXNlcih1c2VyRGF0YSlcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIC8vIHNtc1xuICAgIC8vIHRoaXMubG9jay5zbXMoKGVyciwgcHJvZmlsZSwgaWRfdG9rZW4sIHN0YXRlKSA9PiB7XG4gICAgLy8gICBpZiAoIWVycikge1xuICAgIC8vICAgICAvLyBzZXQgSldUIG9uIGxvY2Fsc3RvcmFnZVxuICAgIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBpZF90b2tlbik7XG4gICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgIHVzZXJpZDogcHJvZmlsZS51c2VyX2lkLFxuICAgIC8vICAgICAgIHByb2ZpbGU6IHByb2ZpbGUsXG4gICAgLy8gICAgICAgLy8gcmVsaWVzIG9uIGxvY2FsIHN0b3JhZ2UsIHRyaWdnZXJzIHJlbmRlcigpXG4gICAgLy8gICAgICAgaWRUb2tlbjogdGhpcy5nZXRJZFRva2VuKClcbiAgICAvLyAgICAgfSwgKCkgPT4ge1xuICAgIC8vICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgIC8vICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgIC8vICAgICB9KVxuICAgIC8vICAgICAvLyBhZGQgdXNlciB0byBkYlxuICAgIC8vICAgICB2YXIgdXNlckRhdGEgPSB7fVxuICAgIC8vICAgICB1c2VyRGF0YS5pZCA9IHByb2ZpbGUudXNlcl9pZFxuICAgIC8vICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2ZpbGUuZW1haWxcbiAgICAvLyAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKVxuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9XG5cbiAgZ2V0SWRUb2tlbigpIHtcbiAgICAvLyBGaXJzdCwgY2hlY2sgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIEpXVCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgdmFyIGlkVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKTtcbiAgICB2YXIgYXV0aEhhc2ggPSB0aGlzLmxvY2sucGFyc2VIYXNoKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAvLyBJZiB0aGVyZSBpcyBubyBKV1QgaW4gbG9jYWwgc3RvcmFnZSBhbmQgdGhlcmUgaXMgb25lIGluIHRoZSBVUkwgaGFzaCxcbiAgICAvLyBzYXZlIGl0IGluIGxvY2FsIHN0b3JhZ2VcbiAgICBpZiAoIWlkVG9rZW4gJiYgYXV0aEhhc2gpIHtcbiAgICAgIGlmIChhdXRoSGFzaC5pZF90b2tlbikge1xuICAgICAgICBpZFRva2VuID0gYXV0aEhhc2guaWRfdG9rZW5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aEhhc2guaWRfdG9rZW4pO1xuICAgICAgfVxuICAgICAgaWYgKGF1dGhIYXNoLmVycm9yKSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgY29uZGl0aW9uc1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHNpZ25pbmcgaW5cIiwgYXV0aEhhc2gpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaWRUb2tlbjtcbiAgfVxuXG4gIGxvZ091dCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaWRfdG9rZW4nKVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaWRUb2tlbjogJydcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmlkVG9rZW4gJiZcbiAgICAgIC8vIGlkZWFsbHkgeW91IGNhbiBicmluZyBpbiBhIGxpYnJhcnkgZm9yIHRoaXMgaWYgeW91IG5lZWQgdG8gZG8gaXQgYSBsb3RcbiAgICAgIC8vIGV4cGlyZSBkYXRlIG9uIHRva2VuIGV4aXN0c1xuICAgICAgSlNPTi5wYXJzZSh3aW5kb3cuYXRvYih0aGlzLnN0YXRlLmlkVG9rZW4uc3BsaXQoJy4nKVsxXSkpLmV4cCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAvLyBleHBpcmUgZGF0ZSBvbiB0b2tlbiBpcyBtb3JlIHRoYW4gY3VycmVudCB0aW1lXG4gICAgICBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRoaXMuc3RhdGUuaWRUb2tlbi5zcGxpdCgnLicpWzFdKSkuZXhwID4gRGF0ZS5ub3coKS8xMDAwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxOYXZCYXIgdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gbmF2TGlzdD17dGhpcy5zdGF0ZS5uYXZMaXN0fSBhZGRMaXN0PXt0aGlzLmFkZExpc3R9IHVwZGF0ZUxpc3RpZD17dGhpcy51cGRhdGVMaXN0aWR9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9Lz5cbiAgICAgICAgICA8VG9kb0Zvcm0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfSBsaXN0aWQ9e3RoaXMuc3RhdGUubGlzdGlkfSB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfS8+XG4gICAgICAgICAgPFRvZG9MaXN0IGxvY2s9e3RoaXMubG9ja30gdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0gdXBkYXRlUXVhbnQ9e3RoaXMudXBkYXRlUXVhbnR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IC8+XG4gICAgICAgICAgPFRvZG9Db3N0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVMaXN0PXt0aGlzLmRlbGV0ZUxpc3R9IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9Lz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGEgb25DbGljaz17KGUpID0+IHRoaXMubG9nT3V0KCl9PmxvZ291dDwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGEgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+U2lnbiBJbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICB9XG5cblxuXG59XG5cblxuIl19