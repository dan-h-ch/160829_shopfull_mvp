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
        userid: this.props.userid,
        created_at: new Date(),
        updated_at: new Date()
      };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OYXZCYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxNOzs7QUFDSixrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztnQ0FFVyxDLEVBQUc7QUFDYixXQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0Q7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7QUFDQSxVQUFJLE9BQU8sSUFBSSxJQUFKLEVBQVg7QUFDQSxjQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsY0FERjtBQUVuQixnQkFBUSxLQUFLLEtBQUwsQ0FBVyxNQUZBO0FBR25CLG9CQUFZLElBQUksSUFBSixFQUhPO0FBSW5CLG9CQUFZLElBQUksSUFBSjtBQUpPLE9BQXJCO0FBTUEsV0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixjQUFuQjtBQUNBLFdBQUssUUFBTCxDQUFjO0FBQ1o7QUFDQSx3QkFBZ0I7QUFGSixPQUFkO0FBTUQ7OzttQ0FFYyxDLEVBQUc7QUFDaEIsV0FBSyxRQUFMLENBQWM7QUFDWix3QkFBZ0IsRUFBRSxNQUFGLENBQVM7QUFEYixPQUFkO0FBR0Q7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxlQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSxTQUFkO0FBQ0csZUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixHQUFuQixDQUF1QixVQUFDLElBQUQ7QUFBQSxtQkFBVSxvQkFBQyxVQUFELElBQVksS0FBSyxLQUFLLEVBQXRCLEVBQTBCLFNBQVMsSUFBbkMsRUFBeUMsY0FBYyxPQUFLLEtBQUwsQ0FBVyxZQUFsRSxHQUFWO0FBQUEsV0FBdkIsQ0FESDtBQUVFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxnQkFBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXZDO0FBQ0UsNkNBQU8sTUFBSyxNQUFaLEVBQW1CLGFBQVksWUFBL0IsRUFBNEMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxjQUFYLElBQTZCLEVBQWhGLEVBQW9GLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHlCQUFPLE9BQUssY0FBTCxDQUFvQixDQUFwQixDQUFQO0FBQUEsaUJBQTlGLEdBREY7QUFFRSw2Q0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxXQUEzQjtBQUZGO0FBREY7QUFGRjtBQURGLE9BREY7QUFhRDs7OztFQWxEa0IsTUFBTSxTIiwiZmlsZSI6Ik5hdkJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge31cbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICB0aGlzLnByb3BzLmFkZExpc3QodGhpcy5wcm9wcy5uZXdMaXN0TmFtZSlcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpXG4gICAgY29uc29sZS5sb2codGltZSlcbiAgICB2YXIgcHJlcGFyZWRTdWJtaXQgPSB7XG4gICAgICBsaXN0bmFtZTogdGhpcy5zdGF0ZS5zdWJtaXRMaXN0TmFtZSxcbiAgICAgIHVzZXJpZDogdGhpcy5wcm9wcy51c2VyaWQsXG4gICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZSgpLFxuICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoKVxuICAgIH1cbiAgICB0aGlzLnByb3BzLmFkZExpc3QocHJlcGFyZWRTdWJtaXQpXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAvLyB3b3VsZCBiZSBjb29sIHRvIGhhdmUgcmFuZG9taXplciBmb3IgdGhlIGRlZmF1bHQgdmFsdWVzXG4gICAgICBzdWJtaXRMaXN0TmFtZTogXCJuZXcgbGlzdFwiLFxuICAgICAgLy8gc3VibWl0UXVhbnQ6IDEsXG4gICAgICAvLyBzdWJtaXRDb3N0OiA5Ljk5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUxpc3ROYW1lKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdExpc3ROYW1lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2LWNvbnRhaW5lclwiPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2LWJhclwiPlxuICAgICAgICAgIHt0aGlzLnByb3BzLm5hdkxpc3QubWFwKChsaXN0KSA9PiA8TmF2QmFySXRlbSBrZXk9e2xpc3QuaWR9IG5hdkxpc3Q9e2xpc3R9IHVwZGF0ZUxpc3RpZD17dGhpcy5wcm9wcy51cGRhdGVMaXN0aWR9Lz4pfVxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInN1Ym1pdEZvcm1cIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwibmV3bGlzdC4uLlwiIHZhbHVlPXt0aGlzLnN0YXRlLnN1Ym1pdExpc3ROYW1lIHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlTGlzdE5hbWUoZSl9IC8+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXcgTGlzdCFcIiAvPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuXG59Il19