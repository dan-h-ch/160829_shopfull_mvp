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
        // linting error since we are passing directly to db
        create_userid: this.props.userid,
        created_at: new Date(),
        updated_at: new Date()
      };
      // console.log(preparedSubmit)
      this.props.addList(preparedSubmit);
      this.setState({
        submitListName: '',
        submitQuant: 1,
        submitCost: 1
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
            return React.createElement(NavBarItem, { key: list.id, navList: list, listid: _this2.props.listid, updateListid: _this2.props.updateListid });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OYXZCYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxNOzs7QUFDSixrQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztnQ0FFVyxDLEVBQUc7QUFDYixXQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEtBQUssS0FBTCxDQUFXLFdBQTlCO0FBQ0Q7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7QUFDQSxVQUFJLE9BQU8sSUFBSSxJQUFKLEVBQVg7QUFDQSxjQUFRLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsY0FERjtBQUVuQjtBQUNBLHVCQUFlLEtBQUssS0FBTCxDQUFXLE1BSFA7QUFJbkIsb0JBQVksSUFBSSxJQUFKLEVBSk87QUFLbkIsb0JBQVksSUFBSSxJQUFKO0FBTE8sT0FBckI7QUFPQTtBQUNBLFdBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsY0FBbkI7QUFDQSxXQUFLLFFBQUwsQ0FBYztBQUNaLHdCQUFnQixFQURKO0FBRVoscUJBQWEsQ0FGRDtBQUdaLG9CQUFZO0FBSEEsT0FBZDtBQUtEOzs7bUNBRWMsQyxFQUFHO0FBQ2hCLFdBQUssUUFBTCxDQUFjO0FBQ1osd0JBQWdCLEVBQUUsTUFBRixDQUFTO0FBRGIsT0FBZDtBQUdEOzs7NkJBRVE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZUFBZjtBQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsU0FBZDtBQUNHLGVBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsR0FBbkIsQ0FBdUIsVUFBQyxJQUFEO0FBQUEsbUJBQVUsb0JBQUMsVUFBRCxJQUFZLEtBQUssS0FBSyxFQUF0QixFQUEwQixTQUFTLElBQW5DLEVBQXlDLFFBQVEsT0FBSyxLQUFMLENBQVcsTUFBNUQsRUFBb0UsY0FBYyxPQUFLLEtBQUwsQ0FBVyxZQUE3RixHQUFWO0FBQUEsV0FBdkIsQ0FESDtBQUVFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxnQkFBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXZDO0FBQ0UsNkNBQU8sTUFBSyxNQUFaLEVBQW1CLGFBQVksWUFBL0IsRUFBNEMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxjQUFYLElBQTZCLEVBQWhGLEVBQW9GLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHlCQUFPLE9BQUssY0FBTCxDQUFvQixDQUFwQixDQUFQO0FBQUEsaUJBQTlGLEdBREY7QUFFRSw2Q0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxXQUEzQjtBQUZGO0FBREY7QUFGRjtBQURGLE9BREY7QUFhRDs7OztFQW5Ea0IsTUFBTSxTIiwiZmlsZSI6Ik5hdkJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZSkge1xuICAgIHRoaXMucHJvcHMuYWRkTGlzdCh0aGlzLnByb3BzLm5ld0xpc3ROYW1lKTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB0aW1lID0gbmV3IERhdGUoKTtcbiAgICBjb25zb2xlLmxvZyh0aW1lKTtcbiAgICB2YXIgcHJlcGFyZWRTdWJtaXQgPSB7XG4gICAgICBsaXN0bmFtZTogdGhpcy5zdGF0ZS5zdWJtaXRMaXN0TmFtZSxcbiAgICAgIC8vIGxpbnRpbmcgZXJyb3Igc2luY2Ugd2UgYXJlIHBhc3NpbmcgZGlyZWN0bHkgdG8gZGJcbiAgICAgIGNyZWF0ZV91c2VyaWQ6IHRoaXMucHJvcHMudXNlcmlkLFxuICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoKSxcbiAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKClcbiAgICB9O1xuICAgIC8vIGNvbnNvbGUubG9nKHByZXBhcmVkU3VibWl0KVxuICAgIHRoaXMucHJvcHMuYWRkTGlzdChwcmVwYXJlZFN1Ym1pdCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXRMaXN0TmFtZTogJycsXG4gICAgICBzdWJtaXRRdWFudDogMSxcbiAgICAgIHN1Ym1pdENvc3Q6IDFcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUxpc3ROYW1lKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdExpc3ROYW1lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdi1jb250YWluZXJcIj5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdi1iYXJcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5uYXZMaXN0Lm1hcCgobGlzdCkgPT4gPE5hdkJhckl0ZW0ga2V5PXtsaXN0LmlkfSBuYXZMaXN0PXtsaXN0fSBsaXN0aWQ9e3RoaXMucHJvcHMubGlzdGlkfSB1cGRhdGVMaXN0aWQ9e3RoaXMucHJvcHMudXBkYXRlTGlzdGlkfS8+KX1cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzdWJtaXRGb3JtXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIm5ld2xpc3QuLi5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRMaXN0TmFtZSB8fCAnJ30gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZUxpc3ROYW1lKGUpfSAvPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTmV3IExpc3QhXCIgLz5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG5cbn0iXX0=