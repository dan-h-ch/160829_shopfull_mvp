'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import 'whatwg-fetch';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.lock = new Auth0Lock('eaDzLmALxb7fvxQhVKTkxW8rEDtMnGZD', 'danch.auth0.com');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // this.fetchLists();
      // this.fetchItems();
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
          console.log(_this2.state.userid);
          console.log(_this2.state.profile);
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
        _this.setState({
          navList: data
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
        _this.setState({
          navList: data
        });
      });
    };

    _this.deleteList = function (listid) {};

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
      this.lock.show();
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
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (this.state.idToken) {
        return React.createElement(
          'div',
          null,
          React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, addList: this.addList, updateListid: this.updateListid }),
          React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid, userid: this.state.userid }),
          React.createElement(TodoList, { lock: this.lock, todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant, userid: this.state.userid }),
          React.createElement(TodoCost, { todoList: this.state.displayList })
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'a',
            { onClick: function onClick(e) {
                return _this4.showLock();
              } },
            'Sign In'
          )
        );
      }
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,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QUFRLEtBQUssS0FBTCxDQUFXLE1BQS9FLEdBRkY7QUFHRSw4QkFBQyxRQUFELElBQVUsTUFBTSxLQUFLLElBQXJCLEVBQTJCLFVBQVUsS0FBSyxLQUFMLENBQVcsV0FBaEQsRUFBNkQsWUFBWSxLQUFLLFVBQTlFLEVBQTBGLGFBQWEsS0FBSyxXQUE1RyxFQUF5SCxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQTVJLEdBSEY7QUFJRSw4QkFBQyxRQUFELElBQVUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxXQUEvQjtBQUpGLFNBREY7QUFRRCxPQVRELE1BU087QUFDTCxlQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFHLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHVCQUFPLE9BQUssUUFBTCxFQUFQO0FBQUEsZUFBWjtBQUFBO0FBQUE7QUFERixTQURGO0FBS0Q7QUFDRjs7OztFQXJQZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrKCdlYUR6TG1BTHhiN2Z2eFFoVktUa3hXOHJFRHRNbkdaRCcsICdkYW5jaC5hdXRoMC5jb20nKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gdGhpcy5mZXRjaExpc3RzKCk7XG4gICAgLy8gdGhpcy5mZXRjaEl0ZW1zKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpZFRva2VuOiB0aGlzLmdldElkVG9rZW4oKVxuICAgIH0sICgpID0+IHtcbiAgICAgIC8vIHNldCBtb3JlIHN0YXRlIHN0dWZmXG4gICAgICB0aGlzLmxvY2suZ2V0UHJvZmlsZSh0aGlzLnN0YXRlLmlkVG9rZW4sIChlcnIsIHByb2YpICA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHVzZXJpZDogcHJvZi51c2VyX2lkLFxuICAgICAgICAgIHByb2ZpbGU6IHByb2ZcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmV0Y2hMaXN0cygpO1xuICAgICAgICAgIHRoaXMuZmV0Y2hJdGVtcygpO1xuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnVzZXJpZClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5wcm9maWxlKVxuICAgICAgICB2YXIgdXNlckRhdGEgPSB7fVxuICAgICAgICB1c2VyRGF0YS5pZCA9IHByb2YudXNlcl9pZFxuICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IHByb2YuZW1haWxcbiAgICAgICAgdGhpcy5hZGRVc2VyKHVzZXJEYXRhKVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW10sXG4gICAgICBuYXZMaXN0OiBbXSxcbiAgICAgIGRpc3BsYXlMaXN0OiBbXSxcbiAgICAgIGxpc3RpZDogMSwgLy9kZWZhdWx0IC0gbmVlZCB0byBjaGFuZ2UgaXQgYmFzZWQgb24gd2hlbiB1c2VyIGxvZ3MgaW5cbiAgICAgIHVzZXJpZDogJycgLy90ZW1wb3JhcmlseVxuICAgIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vICAgTElTVCBSRUxBVEVEICAgICAvLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgXG4gICAgdGhpcy5mZXRjaExpc3RzID0gKCkgPT4ge1xuICAgICAgLy8gdXNlcmlkIGlzIGJlaW5nIHBhc3NlZCBvbiBpbiBVUkwsIHVsdGltYXRlbHkgcmVmYWN0b3Igb3VyIHdoZW4gYXV0aCB0b2tlbiBpcyBpbiBwbGFjZVxuICAgICAgdmFyIGdldFVybCA9IGAvbGlzdHMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gXG4gICAgICBmZXRjaChnZXRVcmwpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyB2aXN1YWxseSB3aGF0IGRvIHlvdSBzZWUsIGRvZXMgbm90IGNoYW5nZSBtYXN0ZXJMaXN0IG9yIG5hdkxpc3RcbiAgICB0aGlzLnVwZGF0ZUxpc3RpZCA9IChpZCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxpc3RpZDogaWRcbiAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgIH1cblxuICAgIC8vIHBvc3RzIGEgbmV3IGxpc3QgYW5kIGdldHMgYWxsIGxpc3RzIGFsbG93cyAtIGZvbGxvdyByb3V0ZSB0byBzZWVcbiAgICB0aGlzLmFkZExpc3QgPSAobmV3TGlzdCkgPT4ge1xuICAgICAgZmV0Y2goJy9saXN0cycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3TGlzdClcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlTGlzdCA9IChsaXN0aWQpID0+IHtcblxuICAgIH1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLyAgIElURU0gQ0hBTkdFUyAgICAgLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgdGhpcy51cGRhdGVRdWFudCA9IChpdGVtLCBhZGRPclN1YikgPT4ge1xuICAgICAgaWYgKGFkZE9yU3ViID09PSBcImFkZFwiKSB7XG4gICAgICAgIGl0ZW0ucXVhbnRpdHkrK1xuICAgICAgfSBlbHNlIGlmIChhZGRPclN1YiA9PT0gXCJzdWJcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5ID0gTWF0aC5tYXgoaXRlbS5xdWFudGl0eSAtIDEsIDApXG4gICAgICB9XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5hZGRJdGVtID0gKG5ld0l0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0l0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgIGZldGNoKCcvaXRlbXMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSlcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyAvLyBub3QgYmVpbmcgdXNlZFxuICAgIC8vIHRoaXMuZmlsdGVyRGF0YSA9IChmaWx0ZXJPYmopID0+IHtcbiAgICAvLyAgICQuYWpheCh7XG4gICAgLy8gICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIC8vICAgICB1cmw6IFwiL2ZpbHRlclwiLFxuICAgIC8vICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgLy8gICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGZpbHRlck9iaiksXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAvLyAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgIC8vICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpXG4gICAgLy8gICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7XG4gICAgLy8gICAgICAgLy8gICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgLy8gICAgICAgLy8gfSlcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9KVxuICAgIC8vIH1cblxuICB9XG5cbiAgYWRkVXNlcih1c2VyRGF0YSkge1xuICAgIGZldGNoKGAvdXNlcnNgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKVxuICAgIH0pXG4gICAgLnRoZW4oKGJvZHkpID0+IGJvZHkuanNvbigpKVxuICAgIC50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKHJlcykpXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKFwiZXJyMHJcIiwgZXJyKSlcbiAgfVxuXG4gIGZldGNoSXRlbXMoKSB7XG4gICAgdmFyIGdldFVybCA9IGAvaXRlbXMvJHt0aGlzLnN0YXRlLnVzZXJpZH1gXG4gICAgZmV0Y2goZ2V0VXJsKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICB9KVxuICAgIC8vIHNldCBzdGF0ZSB3aXRoIGl0XG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICB9KVxuICB9XG5cbiAgbWFrZURpc3BsYXlEYXRhKGxpc3RpZCA9IHRoaXMuc3RhdGUubGlzdGlkLCBkZWxldGVkU3RhdHVzID0gZmFsc2UpIHtcbiAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBsaXN0aWQgJiYgZW50cnkuZGVsZXRlZCA9PT0gZGVsZXRlZFN0YXR1cylcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRpc3BsYXlMaXN0OiBkaXNwbGF5TGlzdFxuICAgIH0pXG4gIH1cblxuICBzaG93TG9jaygpIHtcbiAgICB0aGlzLmxvY2suc2hvdygpXG4gIH1cblxuICBnZXRJZFRva2VuKCkge1xuICAgIC8vIEZpcnN0LCBjaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgSldUIGluIGxvY2FsIHN0b3JhZ2VcbiAgICB2YXIgaWRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpO1xuICAgIHZhciBhdXRoSGFzaCA9IHRoaXMubG9jay5wYXJzZUhhc2god2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgIC8vIElmIHRoZXJlIGlzIG5vIEpXVCBpbiBsb2NhbCBzdG9yYWdlIGFuZCB0aGVyZSBpcyBvbmUgaW4gdGhlIFVSTCBoYXNoLFxuICAgIC8vIHNhdmUgaXQgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGlmICghaWRUb2tlbiAmJiBhdXRoSGFzaCkge1xuICAgICAgaWYgKGF1dGhIYXNoLmlkX3Rva2VuKSB7XG4gICAgICAgIGlkVG9rZW4gPSBhdXRoSGFzaC5pZF90b2tlblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBhdXRoSGFzaC5pZF90b2tlbik7XG4gICAgICB9XG4gICAgICBpZiAoYXV0aEhhc2guZXJyb3IpIHtcbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciBjb25kaXRpb25zXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igc2lnbmluZyBpblwiLCBhdXRoSGFzaCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpZFRva2VuO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmlkVG9rZW4pIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPE5hdkJhciB1c2VyaWQ9e3RoaXMuc3RhdGUudXNlcmlkfSBuYXZMaXN0PXt0aGlzLnN0YXRlLm5hdkxpc3R9IGFkZExpc3Q9e3RoaXMuYWRkTGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnVwZGF0ZUxpc3RpZH0vPlxuICAgICAgICAgIDxUb2RvRm9ybSBhZGRJdGVtPXt0aGlzLmFkZEl0ZW19IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9IHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9Lz5cbiAgICAgICAgICA8VG9kb0xpc3QgbG9jaz17dGhpcy5sb2NrfSB0b2RvTGlzdD17dGhpcy5zdGF0ZS5kaXNwbGF5TGlzdH0gZGVsZXRlSXRlbT17dGhpcy5kZWxldGVJdGVtfSB1cGRhdGVRdWFudD17dGhpcy51cGRhdGVRdWFudH0gdXNlcmlkPXt0aGlzLnN0YXRlLnVzZXJpZH0gLz5cbiAgICAgICAgICA8VG9kb0Nvc3QgdG9kb0xpc3Q9e3RoaXMuc3RhdGUuZGlzcGxheUxpc3R9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGEgb25DbGljaz17KGUpID0+IHRoaXMuc2hvd0xvY2soKX0+U2lnbiBJbjwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfVxuICB9XG5cblxuXG59XG5cblxuIl19