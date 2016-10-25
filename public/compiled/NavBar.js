"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar(props) {
    _classCallCheck(this, NavBar);

    var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(NavBar, [{
    key: "handleClick",
    value: function handleClick(e) {
      this.props.addList(this.props.newListName);
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var time = new Date();
      console.log(time);
      var preparedSubmit = {
        listname: this.state.submitListName,
        create_userid: this.props.userid,
        created_at: new Date(),
        updated_at: new Date()
      };
      console.log(preparedSubmit);
      this.props.addList(preparedSubmit);
      this.setState({
        // would be cool to have randomizer for the default values
        submitListName: "new list"
      });
    }
  }, {
    key: "updateListName",
    value: function updateListName(e) {
      this.setState({
        submitListName: e.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "nav-container" },
        React.createElement(
          "ul",
          { className: "nav-bar" },
          this.props.navList.map(function (list) {
            return React.createElement(NavBarItem, { key: list.id, navList: list, updateListid: _this2.props.updateListid });
          }),
          React.createElement(
            "li",
            null,
            React.createElement(
              "form",
              { className: "submitForm", onSubmit: this.handleSubmit.bind(this) },
              React.createElement("input", { type: "text", placeholder: "newlist...", value: this.state.submitListName || '', onChange: function onChange(e) {
                  return _this2.updateListName(e);
                } }),
              React.createElement("input", { type: "submit", value: "New List!" })
            )
          )
        )
      );
    }
  }]);

  return NavBar;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OYXZCYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxNOzs7QUFDSixrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztnQ0FFVyxDLEVBQUc7QUFDYixXQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0Q7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7QUFDQSxVQUFJLE9BQU8sSUFBSSxJQUFKLEVBQVg7QUFDQSxjQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsY0FERjtBQUVuQix1QkFBZSxLQUFLLEtBQUwsQ0FBVyxNQUZQO0FBR25CLG9CQUFZLElBQUksSUFBSixFQUhPO0FBSW5CLG9CQUFZLElBQUksSUFBSjtBQUpPLE9BQXJCO0FBTUEsY0FBUSxHQUFSLENBQVksY0FBWjtBQUNBLFdBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsY0FBbkI7QUFDQSxXQUFLLFFBQUwsQ0FBYztBQUNaO0FBQ0Esd0JBQWdCO0FBRkosT0FBZDtBQU1EOzs7bUNBRWMsQyxFQUFHO0FBQ2hCLFdBQUssUUFBTCxDQUFjO0FBQ1osd0JBQWdCLEVBQUUsTUFBRixDQUFTO0FBRGIsT0FBZDtBQUdEOzs7NkJBRVE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZUFBZjtBQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsU0FBZDtBQUNHLGVBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsR0FBbkIsQ0FBdUIsVUFBQyxJQUFEO0FBQUEsbUJBQVUsb0JBQUMsVUFBRCxJQUFZLEtBQUssS0FBSyxFQUF0QixFQUEwQixTQUFTLElBQW5DLEVBQXlDLGNBQWMsT0FBSyxLQUFMLENBQVcsWUFBbEUsR0FBVjtBQUFBLFdBQXZCLENBREg7QUFFRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsZ0JBQU0sV0FBVSxZQUFoQixFQUE2QixVQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUF2QztBQUNFLDZDQUFPLE1BQUssTUFBWixFQUFtQixhQUFZLFlBQS9CLEVBQTRDLE9BQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxJQUE2QixFQUFoRixFQUFvRixVQUFVLGtCQUFDLENBQUQ7QUFBQSx5QkFBTyxPQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBUDtBQUFBLGlCQUE5RixHQURGO0FBRUUsNkNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sV0FBM0I7QUFGRjtBQURGO0FBRkY7QUFERixPQURGO0FBYUQ7Ozs7RUFuRGtCLE1BQU0sUyIsImZpbGUiOiJOYXZCYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBOYXZCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHt9XG4gIH1cblxuICBoYW5kbGVDbGljayhlKSB7XG4gICAgdGhpcy5wcm9wcy5hZGRMaXN0KHRoaXMucHJvcHMubmV3TGlzdE5hbWUpXG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHZhciB0aW1lID0gbmV3IERhdGUoKVxuICAgIGNvbnNvbGUubG9nKHRpbWUpXG4gICAgdmFyIHByZXBhcmVkU3VibWl0ID0ge1xuICAgICAgbGlzdG5hbWU6IHRoaXMuc3RhdGUuc3VibWl0TGlzdE5hbWUsXG4gICAgICBjcmVhdGVfdXNlcmlkOiB0aGlzLnByb3BzLnVzZXJpZCxcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZSgpXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHByZXBhcmVkU3VibWl0KVxuICAgIHRoaXMucHJvcHMuYWRkTGlzdChwcmVwYXJlZFN1Ym1pdClcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC8vIHdvdWxkIGJlIGNvb2wgdG8gaGF2ZSByYW5kb21pemVyIGZvciB0aGUgZGVmYXVsdCB2YWx1ZXNcbiAgICAgIHN1Ym1pdExpc3ROYW1lOiBcIm5ldyBsaXN0XCIsXG4gICAgICAvLyBzdWJtaXRRdWFudDogMSxcbiAgICAgIC8vIHN1Ym1pdENvc3Q6IDkuOTlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlTGlzdE5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TGlzdE5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXYtY29udGFpbmVyXCI+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYtYmFyXCI+XG4gICAgICAgICAge3RoaXMucHJvcHMubmF2TGlzdC5tYXAoKGxpc3QpID0+IDxOYXZCYXJJdGVtIGtleT17bGlzdC5pZH0gbmF2TGlzdD17bGlzdH0gdXBkYXRlTGlzdGlkPXt0aGlzLnByb3BzLnVwZGF0ZUxpc3RpZH0vPil9XG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic3VibWl0Rm9ybVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJuZXdsaXN0Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0TGlzdE5hbWUgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVMaXN0TmFtZShlKX0gLz5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk5ldyBMaXN0IVwiIC8+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG5cbn0iXX0=