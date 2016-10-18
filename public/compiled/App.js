'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import 'whatwg-fetch';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      masterList: [],
      navList: [],
      displayList: [],
      listid: 1, //default - need to change it based on when user logs in
      userid: 2 //temporarily
    };

    /////////////////////////////////
    /////   LIST RELATED     ///////
    ///////////////////////////////

    _this.fetchAllList = function () {
      var that = _this;
      fetch('/lists').then(function (res) {
        return res.json();
      }).then(function (data) {
        that.setState({
          navList: data
        });
      });
    };

    _this.updateListid = function (id) {
      var displayList = _this.state.masterList.filter(function (entry) {
        return entry.listid === id;
      });
      _this.setState({
        listid: id,
        displayList: displayList
      });
    };

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
    /////   ITEM RELATED     ///////
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

    _this.fetchData = function () {
      fetch('/items').then(function (res) {
        return res.json();
      })
      // set state with it
      .then(function (data) {
        _this.setState({
          masterList: data
        }, function () {
          this.makeDisplayData();
        });
      });
    };

    _this.makeDisplayData = function () {
      var listid = arguments.length <= 0 || arguments[0] === undefined ? _this.state.listid : arguments[0];
      var deletedStatus = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var displayList = _this.state.masterList.filter(function (entry) {
        return entry.listid === listid && entry.deleted === deletedStatus;
      });
      _this.setState({
        displayList: displayList
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
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(NavBar, { userid: this.state.userid, navList: this.state.navList, addList: this.addList, updateListid: this.updateListid }),
        React.createElement(TodoForm, { addItem: this.addItem, listid: this.state.listid }),
        React.createElement(TodoList, { todoList: this.state.displayList, deleteItem: this.deleteItem, updateQuant: this.updateQuant }),
        React.createElement(TodoCost, { todoList: this.state.displayList })
      );
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.fetchData();

      this.fetchAllList();
    }
  }]);

  return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9BcHAuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7SUFFTSxHOzs7QUFFSixlQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwR0FDWCxLQURXOztBQUdqQixVQUFLLEtBQUwsR0FBYTtBQUNYLGtCQUFZLEVBREQ7QUFFWCxlQUFTLEVBRkU7QUFHWCxtQkFBYSxFQUhGO0FBSVgsY0FBUSxDQUpHLEVBSUE7QUFDWCxjQUFRLENBTEcsQ0FLRDtBQUxDLEtBQWI7O0FBU0o7QUFDQTtBQUNBOztBQUVJLFVBQUssWUFBTCxHQUFvQixZQUFNO0FBQ3hCLFVBQUksWUFBSjtBQUNBLFlBQU0sUUFBTixFQUNDLElBREQsQ0FDTSxVQUFTLEdBQVQsRUFBYztBQUNsQixlQUFPLElBQUksSUFBSixFQUFQO0FBQ0QsT0FIRCxFQUlDLElBSkQsQ0FJTSxVQUFTLElBQVQsRUFBZTtBQUNuQixhQUFLLFFBQUwsQ0FBYztBQUNaLG1CQUFTO0FBREcsU0FBZDtBQUdELE9BUkQ7QUFTRCxLQVhEOztBQWFBLFVBQUssWUFBTCxHQUFvQixVQUFDLEVBQUQsRUFBUTtBQUMxQixVQUFJLGNBQWMsTUFBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixNQUF0QixDQUE2QixVQUFDLEtBQUQ7QUFBQSxlQUFXLE1BQU0sTUFBTixLQUFpQixFQUE1QjtBQUFBLE9BQTdCLENBQWxCO0FBQ0EsWUFBSyxRQUFMLENBQWM7QUFDWixnQkFBUSxFQURJO0FBRVoscUJBQWE7QUFGRCxPQUFkO0FBSUQsS0FORDs7QUFRQSxVQUFLLE9BQUwsR0FBZSxVQUFDLE9BQUQsRUFBYTtBQUMxQixZQUFNLFFBQU4sRUFBZ0I7QUFDZCxnQkFBUSxNQURNO0FBRWQsaUJBQVM7QUFDUCxvQkFBVSxrQkFESDtBQUVQLDBCQUFnQjtBQUZULFNBRks7QUFNZCxjQUFNLEtBQUssU0FBTCxDQUFlLE9BQWY7QUFOUSxPQUFoQixFQVFDLElBUkQsQ0FRTSxVQUFDLElBQUQ7QUFBQSxlQUFVLEtBQUssSUFBTCxFQUFWO0FBQUEsT0FSTixFQVNDLElBVEQsQ0FTTSxVQUFDLElBQUQsRUFBVTtBQUNkLGNBQUssUUFBTCxDQUFjO0FBQ1osbUJBQVM7QUFERyxTQUFkO0FBR0QsT0FiRDtBQWNELEtBZkQ7O0FBaUJBLFVBQUssVUFBTCxHQUFrQixVQUFDLE1BQUQsRUFBWSxDQUU3QixDQUZEOztBQUlKO0FBQ0E7QUFDQTs7QUFFSSxVQUFLLFdBQUwsR0FBbUIsVUFBQyxJQUFELEVBQU8sUUFBUCxFQUFvQjtBQUNyQyxVQUFJLGFBQWEsS0FBakIsRUFBd0I7QUFDdEIsYUFBSyxRQUFMO0FBQ0QsT0FGRCxNQUVPLElBQUksYUFBYSxLQUFqQixFQUF3QjtBQUM3QixhQUFLLFFBQUwsR0FBZ0IsS0FBSyxHQUFMLENBQVMsS0FBSyxRQUFMLEdBQWdCLENBQXpCLEVBQTRCLENBQTVCLENBQWhCO0FBQ0Q7QUFDRCxZQUFNLFFBQU4sRUFBZ0I7QUFDZCxnQkFBUSxLQURNO0FBRWQsaUJBQVM7QUFDUCxvQkFBVSxrQkFESDtBQUVQLDBCQUFnQjtBQUZULFNBRks7QUFNZCxjQUFNLEtBQUssU0FBTCxDQUFlLElBQWY7QUFOUSxPQUFoQixFQVFDLElBUkQsQ0FRTSxVQUFDLElBQUQ7QUFBQSxlQUFVLEtBQUssSUFBTCxFQUFWO0FBQUEsT0FSTixFQVNDLElBVEQsQ0FTTSxVQUFDLElBQUQsRUFBVTtBQUNkLGNBQUssUUFBTCxDQUFjO0FBQ1osc0JBQVk7QUFEQSxTQUFkO0FBR0QsT0FiRDtBQWNELEtBcEJEOztBQXNCQSxVQUFLLE9BQUwsR0FBZSxVQUFDLE9BQUQsRUFBYTtBQUMxQixZQUFNLFFBQU4sRUFBZ0I7QUFDZCxnQkFBUSxNQURNO0FBRWQsaUJBQVM7QUFDUCxvQkFBVSxrQkFESDtBQUVQLDBCQUFnQjtBQUZULFNBRks7QUFNZCxjQUFNLEtBQUssU0FBTCxDQUFlLE9BQWY7QUFOUSxPQUFoQixFQVFDLElBUkQsQ0FRTSxVQUFDLElBQUQ7QUFBQSxlQUFVLEtBQUssSUFBTCxFQUFWO0FBQUEsT0FSTixFQVNDLElBVEQsQ0FTTSxVQUFDLElBQUQsRUFBVTtBQUNkLGNBQUssUUFBTCxDQUFjO0FBQ1osc0JBQVk7QUFEQSxTQUFkLEVBRUcsWUFBVztBQUFDLGVBQUssZUFBTDtBQUF1QixTQUZ0QztBQUdELE9BYkQ7QUFjRCxLQWZEOztBQWlCQSxVQUFLLFVBQUwsR0FBa0IsVUFBQyxJQUFELEVBQVU7QUFDMUIsWUFBTSxRQUFOLEVBQWdCO0FBQ2QsZ0JBQVEsUUFETTtBQUVkLGlCQUFTO0FBQ1Asb0JBQVUsa0JBREg7QUFFUCwwQkFBZ0I7QUFGVCxTQUZLO0FBTWQsY0FBTSxLQUFLLFNBQUwsQ0FBZSxJQUFmO0FBTlEsT0FBaEIsRUFRQyxJQVJELENBUU0sVUFBQyxJQUFEO0FBQUEsZUFBVSxLQUFLLElBQUwsRUFBVjtBQUFBLE9BUk4sRUFTQyxJQVRELENBU00sVUFBQyxJQUFELEVBQVU7QUFDZCxjQUFLLFFBQUwsQ0FBYztBQUNaLHNCQUFZO0FBREEsU0FBZCxFQUVHLFlBQVc7QUFBQyxlQUFLLGVBQUw7QUFBdUIsU0FGdEM7QUFHRCxPQWJEO0FBY0QsS0FmRDs7QUFpQkEsVUFBSyxTQUFMLEdBQWlCLFlBQU07QUFDckIsWUFBTSxRQUFOLEVBQ0MsSUFERCxDQUNNLFVBQVMsR0FBVCxFQUFjO0FBQ2xCLGVBQU8sSUFBSSxJQUFKLEVBQVA7QUFDRCxPQUhEO0FBSUE7QUFKQSxPQUtDLElBTEQsQ0FLTSxVQUFDLElBQUQsRUFBVTtBQUNkLGNBQUssUUFBTCxDQUFjO0FBQ1osc0JBQVk7QUFEQSxTQUFkLEVBRUcsWUFBVztBQUFDLGVBQUssZUFBTDtBQUF1QixTQUZ0QztBQUdELE9BVEQ7QUFVRCxLQVhEOztBQWFBLFVBQUssZUFBTCxHQUF1QixZQUF1RDtBQUFBLFVBQXRELE1BQXNELHlEQUE3QyxNQUFLLEtBQUwsQ0FBVyxNQUFrQztBQUFBLFVBQTFCLGFBQTBCLHlEQUFWLEtBQVU7O0FBQzVFLFVBQUksY0FBYyxNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE1BQXRCLENBQTZCLFVBQUMsS0FBRDtBQUFBLGVBQVcsTUFBTSxNQUFOLEtBQWlCLE1BQWpCLElBQTJCLE1BQU0sT0FBTixLQUFrQixhQUF4RDtBQUFBLE9BQTdCLENBQWxCO0FBQ0EsWUFBSyxRQUFMLENBQWM7QUFDWixxQkFBYTtBQURELE9BQWQ7QUFHRCxLQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUE1SmlCO0FBK0psQjs7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsNEJBQUMsTUFBRCxJQUFRLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBM0IsRUFBbUMsU0FBUyxLQUFLLEtBQUwsQ0FBVyxPQUF2RCxFQUFnRSxTQUFTLEtBQUssT0FBOUUsRUFBdUYsY0FBYyxLQUFLLFlBQTFHLEdBREY7QUFFRSw0QkFBQyxRQUFELElBQVUsU0FBUyxLQUFLLE9BQXhCLEVBQWlDLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBcEQsR0FGRjtBQUdFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFdBQS9CLEVBQTRDLFlBQVksS0FBSyxVQUE3RCxFQUF5RSxhQUFhLEtBQUssV0FBM0YsR0FIRjtBQUlFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFdBQS9CO0FBSkYsT0FERjtBQVFEOzs7eUNBRW9CO0FBQ25CLFdBQUssU0FBTDs7QUFFQSxXQUFLLFlBQUw7QUFDRDs7OztFQWxMZSxNQUFNLFMiLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW10sXG4gICAgICBuYXZMaXN0OiBbXSxcbiAgICAgIGRpc3BsYXlMaXN0OiBbXSxcbiAgICAgIGxpc3RpZDogMSwgLy9kZWZhdWx0IC0gbmVlZCB0byBjaGFuZ2UgaXQgYmFzZWQgb24gd2hlbiB1c2VyIGxvZ3MgaW5cbiAgICAgIHVzZXJpZDogMiAvL3RlbXBvcmFyaWx5XG4gICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBMSVNUIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICBcbiAgICB0aGlzLmZldGNoQWxsTGlzdCA9ICgpID0+IHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGZldGNoKCcvbGlzdHMnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICBuYXZMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlTGlzdGlkID0gKGlkKSA9PiB7XG4gICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBpZClcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBsaXN0aWQ6IGlkLFxuICAgICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5hZGRMaXN0ID0gKG5ld0xpc3QpID0+IHtcbiAgICAgIGZldGNoKCcvbGlzdHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0xpc3QpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbmF2TGlzdDogZGF0YVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmRlbGV0ZUxpc3QgPSAobGlzdGlkKSA9PiB7XG5cbiAgICB9XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8gICBJVEVNIFJFTEFURUQgICAgIC8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMudXBkYXRlUXVhbnQgPSAoaXRlbSwgYWRkT3JTdWIpID0+IHtcbiAgICAgIGlmIChhZGRPclN1YiA9PT0gXCJhZGRcIikge1xuICAgICAgICBpdGVtLnF1YW50aXR5KytcbiAgICAgIH0gZWxzZSBpZiAoYWRkT3JTdWIgPT09IFwic3ViXCIpIHtcbiAgICAgICAgaXRlbS5xdWFudGl0eSA9IE1hdGgubWF4KGl0ZW0ucXVhbnRpdHkgLSAxLCAwKVxuICAgICAgfVxuICAgICAgZmV0Y2goJy9pdGVtcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5qc29uKCkpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuYWRkSXRlbSA9IChuZXdJdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdJdGVtKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1hc3Rlckxpc3Q6IGRhdGFcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7dGhpcy5tYWtlRGlzcGxheURhdGEoKX0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJywge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pXG4gICAgICB9KVxuICAgICAgLnRoZW4oKGRhdGEpID0+IGRhdGEuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgICB9LCBmdW5jdGlvbigpIHt0aGlzLm1ha2VEaXNwbGF5RGF0YSgpfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5mZXRjaERhdGEgPSAoKSA9PiB7XG4gICAgICBmZXRjaCgnL2l0ZW1zJylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgICAgfSlcbiAgICAgIC8vIHNldCBzdGF0ZSB3aXRoIGl0XG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge3RoaXMubWFrZURpc3BsYXlEYXRhKCl9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLm1ha2VEaXNwbGF5RGF0YSA9IChsaXN0aWQgPSB0aGlzLnN0YXRlLmxpc3RpZCwgZGVsZXRlZFN0YXR1cyA9IGZhbHNlKSA9PiB7XG4gICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkubGlzdGlkID09PSBsaXN0aWQgJiYgZW50cnkuZGVsZXRlZCA9PT0gZGVsZXRlZFN0YXR1cylcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkaXNwbGF5TGlzdDogZGlzcGxheUxpc3RcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gLy8gbm90IGJlaW5nIHVzZWRcbiAgICAvLyB0aGlzLmZpbHRlckRhdGEgPSAoZmlsdGVyT2JqKSA9PiB7XG4gICAgLy8gICAkLmFqYXgoe1xuICAgIC8vICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgdXJsOiBcIi9maWx0ZXJcIixcbiAgICAvLyAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIC8vICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShmaWx0ZXJPYmopLFxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgLy8gICAgICAgY2FsbGJhY2soZGF0YSlcbiAgICAvLyAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKVxuICAgIC8vICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgIC8vICAgbWFzdGVyTGlzdDogZGF0YVxuICAgIC8vICAgICAgIC8vIH0pXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcImVycjogXCIsIGVycilcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG5cblxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIHVzZXJpZD17dGhpcy5zdGF0ZS51c2VyaWR9IG5hdkxpc3Q9e3RoaXMuc3RhdGUubmF2TGlzdH0gYWRkTGlzdD17dGhpcy5hZGRMaXN0fSB1cGRhdGVMaXN0aWQ9e3RoaXMudXBkYXRlTGlzdGlkfS8+XG4gICAgICAgIDxUb2RvRm9ybSBhZGRJdGVtPXt0aGlzLmFkZEl0ZW19IGxpc3RpZD17dGhpcy5zdGF0ZS5saXN0aWR9Lz5cbiAgICAgICAgPFRvZG9MaXN0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fSBkZWxldGVJdGVtPXt0aGlzLmRlbGV0ZUl0ZW19IHVwZGF0ZVF1YW50PXt0aGlzLnVwZGF0ZVF1YW50fSAgLz5cbiAgICAgICAgPFRvZG9Db3N0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLmRpc3BsYXlMaXN0fS8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5mZXRjaERhdGEoKTtcblxuICAgIHRoaXMuZmV0Y2hBbGxMaXN0KCk7XG4gIH1cblxufVxuXG5cbiJdfQ==