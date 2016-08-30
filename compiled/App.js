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

    _this.updateList = function (newItem) {
      var newMasterList = _this.state.masterList.concat([newItem]);
      _this.setState({
        masterList: newMasterList
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
        React.createElement(TodoForm, { todoList: this.state.masterList, updateList: this.updateList }),
        React.createElement(TodoList, { todoList: this.state.masterList, deleteItem: this.deleteItem })
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      fetchData({}, function (data) {
        this.setState({
          masterList: data
        });
      }.bind(this));
    }
  }]);

  return App;
}(React.Component);

var fetchData = function fetchData(options, callback) {
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

var sendData = function sendData(options, callback) {
  console.log("postingdata");
  $.ajax({
    type: "POST",
    url: "/items",
    contentType: "application/json"

  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLEc7OztBQUNKLGVBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVk7QUFERCxLQUFiOztBQUlBLFVBQUssVUFBTCxHQUFrQixVQUFDLE9BQUQsRUFBYTtBQUM3QixVQUFJLGdCQUFnQixNQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLE1BQXRCLENBQTZCLENBQUMsT0FBRCxDQUE3QixDQUFwQjtBQUNBLFlBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVk7QUFEQSxPQUFkO0FBR0QsS0FMRDs7QUFPQSxVQUFLLFVBQUwsR0FBa0IsVUFBQyxJQUFELEVBQVU7QUFDMUIsVUFBSSxZQUFKO0FBQ0EsUUFBRSxJQUFGLENBQU87QUFDTCxjQUFNLFFBREQ7QUFFTCxhQUFLLFFBRkE7QUFHTCxxQkFBYSxrQkFIUjtBQUlMLGNBQU0sS0FBSyxTQUFMLENBQWUsSUFBZixDQUpEO0FBS0wsaUJBQVMsaUJBQVMsSUFBVCxFQUFlO0FBQ3RCLGtCQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsZUFBSyxRQUFMLENBQWM7QUFDWix3QkFBWTtBQURBLFdBQWQ7QUFHRCxTQVZJO0FBV0wsZUFBTyxlQUFTLEdBQVQsRUFBYztBQUNuQixrQkFBUSxHQUFSLENBQVksT0FBWixFQUFxQixHQUFyQjtBQUNEO0FBYkksT0FBUDtBQWVELEtBakJEOztBQWRpQjtBQWlDbEI7Ozs7NkJBR1E7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLDRCQUFDLFFBQUQsSUFBVSxVQUFVLEtBQUssS0FBTCxDQUFXLFVBQS9CLEVBQTJDLFlBQVksS0FBSyxVQUE1RCxHQUZGO0FBR0UsNEJBQUMsUUFBRCxJQUFVLFVBQVUsS0FBSyxLQUFMLENBQVcsVUFBL0IsRUFBMkMsWUFBWSxLQUFLLFVBQTVEO0FBSEYsT0FERjtBQU9EOzs7d0NBRW1CO0FBQ2xCLGdCQUFVLEVBQVYsRUFBYyxVQUFTLElBQVQsRUFBZTtBQUMzQixhQUFLLFFBQUwsQ0FBYztBQUNaLHNCQUFZO0FBREEsU0FBZDtBQUdELE9BSmEsQ0FJWixJQUpZLENBSVAsSUFKTyxDQUFkO0FBS0Q7Ozs7RUFyRGUsTUFBTSxTOztBQXdEeEIsSUFBSSxZQUFZLFNBQVosU0FBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQXVCO0FBQ3JDLElBQUUsSUFBRixDQUFPO0FBQ0wsVUFBTSxLQUREO0FBRUwsU0FBSyxRQUZBO0FBR0wsaUJBQWEsa0JBSFI7QUFJTCxhQUFTLGlCQUFTLElBQVQsRUFBZTtBQUN0QixlQUFTLElBQVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELEtBVkk7QUFXTCxXQUFPLGVBQVMsR0FBVCxFQUFjO0FBQ25CLGNBQVEsR0FBUixDQUFZLE9BQVosRUFBcUIsR0FBckI7QUFDRDtBQWJJLEdBQVA7QUFlRCxDQWhCRDs7QUFrQkEsSUFBSSxXQUFXLFNBQVgsUUFBVyxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQXVCO0FBQ3BDLFVBQVEsR0FBUixDQUFZLGFBQVo7QUFDQSxJQUFFLElBQUYsQ0FBTztBQUNMLFVBQU0sTUFERDtBQUVMLFNBQUssUUFGQTtBQUdMLGlCQUFhOztBQUhSLEdBQVA7QUFNRCxDQVJEIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbWFzdGVyTGlzdDogW11cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUxpc3QgPSAobmV3SXRlbSkgPT4ge1xuICAgICAgdmFyIG5ld01hc3Rlckxpc3QgPSB0aGlzLnN0YXRlLm1hc3Rlckxpc3QuY29uY2F0KFtuZXdJdGVtXSlcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXJMaXN0OiBuZXdNYXN0ZXJMaXN0XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlSXRlbSA9IChpdGVtKSA9PiB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgIHVybDogXCIvaXRlbXNcIixcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyOiBcIiwgZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXY+TmF2IGJhciBoZXJlPC9kaXY+XG4gICAgICAgIDxUb2RvRm9ybSB0b2RvTGlzdD17dGhpcy5zdGF0ZS5tYXN0ZXJMaXN0fSB1cGRhdGVMaXN0PXt0aGlzLnVwZGF0ZUxpc3R9Lz5cbiAgICAgICAgPFRvZG9MaXN0IHRvZG9MaXN0PXt0aGlzLnN0YXRlLm1hc3Rlckxpc3R9IGRlbGV0ZUl0ZW09e3RoaXMuZGVsZXRlSXRlbX0vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgZmV0Y2hEYXRhKHt9LCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyTGlzdDogZGF0YVxuICAgICAgfSlcbiAgICB9LmJpbmQodGhpcykpXG4gIH1cbn1cblxudmFyIGZldGNoRGF0YSA9IChvcHRpb25zLCBjYWxsYmFjaykgPT4ge1xuICAkLmFqYXgoe1xuICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgdXJsOiBcIi9pdGVtc1wiLFxuICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBjYWxsYmFjayhkYXRhKVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcylcbiAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLy8gICBtYXN0ZXJMaXN0OiBkYXRhXG4gICAgICAvLyB9KVxuICAgIH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coXCJlcnI6IFwiLCBlcnIpXG4gICAgfVxuICB9KVxufVxuXG52YXIgc2VuZERhdGEgPSAob3B0aW9ucywgY2FsbGJhY2spID0+IHtcbiAgY29uc29sZS5sb2coXCJwb3N0aW5nZGF0YVwiKVxuICAkLmFqYXgoe1xuICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIHVybDogXCIvaXRlbXNcIixcbiAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG5cbiAgfSlcbn0iXX0=