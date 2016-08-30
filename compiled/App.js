"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      masterList: []
    };

    // lots of smells with these ajax calls
    _this.addItem = function (newItem) {
      var that = _this;
      $.ajax({
        type: "POST",
        url: "/items",
        contentType: "application/json",
        data: JSON.stringify(newItem),
        success: function success(data) {
          console.log(data);
          that.setState({
            masterList: data
          });
        },
        error: function error(err) {
          console.log("err: ", err);
        }
      });
    };

    _this.deleteItem = function (item) {
      var that = _this;
      $.ajax({
        type: "DELETE",
        url: "/items",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function success(data) {
          console.log(data);
          that.setState({
            masterList: data
          });
        },
        error: function error(err) {
          console.log("err: ", err);
        }
      });
    };

    _this.fetchData = function (options, callback) {
      $.ajax({
        type: "GET",
        url: "/items",
        contentType: "application/json",
        success: function success(data) {
          callback(data);
          // console.log(this)
          // this.setState({
          //   masterList: data
          // })
        },
        error: function error(err) {
          console.log("err: ", err);
        }
      });
    };

    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          null,
          "Nav bar here"
        ),
        React.createElement(TodoForm, { todoList: this.state.masterList, addItem: this.addItem }),
        React.createElement(TodoList, { todoList: this.state.masterList, deleteItem: this.deleteItem })
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchData({}, function (data) {
        this.setState({
          masterList: data
        });
      }.bind(this));
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEc7OztBQUNKLGVBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVk7QUFERCxLQUFiOztBQUlBO0FBQ0EsVUFBSyxPQUFMLEdBQWUsVUFBQyxPQUFELEVBQWE7QUFDMUIsVUFBSSxZQUFKO0FBQ0EsUUFBRSxJQUFGLENBQU87QUFDTCxjQUFNLE1BREQ7QUFFTCxhQUFLLFFBRkE7QUFHTCxxQkFBYSxrQkFIUjtBQUlMLGNBQU0sS0FBSyxTQUFMLENBQWUsT0FBZixDQUpEO0FBS0wsaUJBQVMsaUJBQVMsSUFBVCxFQUFlO0FBQ3RCLGtCQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsZUFBSyxRQUFMLENBQWM7QUFDWix3QkFBWTtBQURBLFdBQWQ7QUFHRCxTQVZJO0FBV0wsZUFBTyxlQUFTLEdBQVQsRUFBYztBQUNuQixrQkFBUSxHQUFSLENBQVksT0FBWixFQUFxQixHQUFyQjtBQUNEO0FBYkksT0FBUDtBQWVELEtBakJEOztBQW1CQSxVQUFLLFVBQUwsR0FBa0IsVUFBQyxJQUFELEVBQVU7QUFDMUIsVUFBSSxZQUFKO0FBQ0EsUUFBRSxJQUFGLENBQU87QUFDTCxjQUFNLFFBREQ7QUFFTCxhQUFLLFFBRkE7QUFHTCxxQkFBYSxrQkFIUjtBQUlMLGNBQU0sS0FBSyxTQUFMLENBQWUsSUFBZixDQUpEO0FBS0wsaUJBQVMsaUJBQVMsSUFBVCxFQUFlO0FBQ3RCLGtCQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsZUFBSyxRQUFMLENBQWM7QUFDWix3QkFBWTtBQURBLFdBQWQ7QUFHRCxTQVZJO0FBV0wsZUFBTyxlQUFTLEdBQVQsRUFBYztBQUNuQixrQkFBUSxHQUFSLENBQVksT0FBWixFQUFxQixHQUFyQjtBQUNEO0FBYkksT0FBUDtBQWVELEtBakJEOztBQW1CQSxVQUFLLFNBQUwsR0FBaUIsVUFBQyxPQUFELEVBQVUsUUFBVixFQUF1QjtBQUN0QyxRQUFFLElBQUYsQ0FBTztBQUNMLGNBQU0sS0FERDtBQUVMLGFBQUssUUFGQTtBQUdMLHFCQUFhLGtCQUhSO0FBSUwsaUJBQVMsaUJBQVMsSUFBVCxFQUFlO0FBQ3RCLG1CQUFTLElBQVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELFNBVkk7QUFXTCxlQUFPLGVBQVMsR0FBVCxFQUFjO0FBQ25CLGtCQUFRLEdBQVIsQ0FBWSxPQUFaLEVBQXFCLEdBQXJCO0FBQ0Q7QUFiSSxPQUFQO0FBZUQsS0FoQkQ7O0FBOUNpQjtBQWdFbEI7Ozs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFVBQS9CLEVBQTJDLFNBQVMsS0FBSyxPQUF6RCxHQUZGO0FBR0UsNEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsVUFBL0IsRUFBMkMsWUFBWSxLQUFLLFVBQTVEO0FBSEYsT0FERjtBQU9EOzs7d0NBRW1CO0FBQ2xCLFdBQUssU0FBTCxDQUFlLEVBQWYsRUFBbUIsVUFBUyxJQUFULEVBQWU7QUFDaEMsYUFBSyxRQUFMLENBQWM7QUFDWixzQkFBWTtBQURBLFNBQWQ7QUFHRCxPQUprQixDQUlqQixJQUppQixDQUlaLElBSlksQ0FBbkI7QUFLRDs7OztFQW5GZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtYXN0ZXJMaXN0OiBbXVxuICAgIH1cblxuICAgIC8vIGxvdHMgb2Ygc21lbGxzIHdpdGggdGhlc2UgYWpheCBjYWxsc1xuICAgIHRoaXMuYWRkSXRlbSA9IChuZXdJdGVtKSA9PiB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICB1cmw6IFwiL2l0ZW1zXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobmV3SXRlbSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmRlbGV0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICB1cmw6IFwiL2l0ZW1zXCIsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmZldGNoRGF0YSA9IChvcHRpb25zLCBjYWxsYmFjaykgPT4ge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgdXJsOiBcIi9pdGVtc1wiLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpXG4gICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgLy8gICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgICAgLy8gfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2Pk5hdiBiYXIgaGVyZTwvZGl2PlxuICAgICAgICA8VG9kb0Zvcm0gdG9kb0xpc3Q9e3RoaXMuc3RhdGUubWFzdGVyTGlzdH0gYWRkSXRlbT17dGhpcy5hZGRJdGVtfS8+XG4gICAgICAgIDxUb2RvTGlzdCB0b2RvTGlzdD17dGhpcy5zdGF0ZS5tYXN0ZXJMaXN0fSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19Lz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuZmV0Y2hEYXRhKHt9LCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgfSlcbiAgICB9LmJpbmQodGhpcykpXG4gIH1cbn1cblxuXG4iXX0=