"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoForm = function (_React$Component) {
  _inherits(TodoForm, _React$Component);

  function TodoForm(props) {
    _classCallCheck(this, TodoForm);

    var _this = _possibleConstructorReturn(this, (TodoForm.__proto__ || Object.getPrototypeOf(TodoForm)).call(this, props));

    _this.state = {
      submitName: "newItem",
      submitQuant: 1,
      submitCost: 1.99
    };
    return _this;
  }

  _createClass(TodoForm, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var preparedSubmit = {
        itemname: this.state.submitName,
        quantity: this.state.submitQuant,
        cost: this.state.submitCost
      };
      this.props.updateList(preparedSubmit);
      this.setState({
        submitName: "newItem",
        submitQuant: 1,
        submitCost: 0.99
      });
    }
  }, {
    key: "updateName",
    value: function updateName(e) {
      this.setState({
        submitName: e.target.value
      });
    }
  }, {
    key: "updateQuant",
    value: function updateQuant(e) {
      this.setState({
        submitQuant: parseInt(e.target.value)
      });
    }
  }, {
    key: "updateCost",
    value: function updateCost(e) {
      this.setState({
        submitCost: parseFloat(e.target.value)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "addtodo" },
        React.createElement(
          "form",
          { className: "submitForm", onSubmit: this.handleSubmit.bind(this) },
          React.createElement("input", { type: "text", placeholder: "whattobuywhattobuy...", value: this.state.submitName, onChange: function onChange(e) {
              return _this2.updateName(e);
            } }),
          React.createElement("input", { type: "number", placeholder: "howmany...", value: this.state.submitQuant, onChange: function onChange(e) {
              return _this2.updateQuant(e);
            } }),
          React.createElement("input", { type: "number", min: "0.01", step: "0.01", placeholder: "cost..", value: this.state.submitCost, onChange: function onChange(e) {
              return _this2.updateCost(e);
            } }),
          React.createElement("input", { type: "submit", value: "Must Buy!" })
        )
      );
    }
  }]);

  return TodoForm;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9Gb3JtLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sUTs7O0FBQ0osb0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLG9IQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVksU0FERDtBQUVYLG1CQUFhLENBRkY7QUFHWCxrQkFBWTtBQUhELEtBQWI7QUFIaUI7QUFRbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsVUFERjtBQUVuQixrQkFBVSxLQUFLLEtBQUwsQ0FBVyxXQUZGO0FBR25CLGNBQU0sS0FBSyxLQUFMLENBQVc7QUFIRSxPQUFyQjtBQUtBLFdBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsY0FBdEI7QUFDQSxXQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFZLFNBREE7QUFFWixxQkFBYSxDQUZEO0FBR1osb0JBQVk7QUFIQSxPQUFkO0FBS0Q7OzsrQkFFVSxDLEVBQUc7QUFDWixXQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFZLEVBQUUsTUFBRixDQUFTO0FBRFQsT0FBZDtBQUdEOzs7Z0NBRVcsQyxFQUFHO0FBQ2IsV0FBSyxRQUFMLENBQWM7QUFDWixxQkFBYSxTQUFTLEVBQUUsTUFBRixDQUFTLEtBQWxCO0FBREQsT0FBZDtBQUdEOzs7K0JBRVUsQyxFQUFHO0FBQ1osV0FBSyxRQUFMLENBQWM7QUFDWixvQkFBWSxXQUFXLEVBQUUsTUFBRixDQUFTLEtBQXBCO0FBREEsT0FBZDtBQUdEOzs7NkJBSVE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsU0FBZjtBQUNFO0FBQUE7QUFBQSxZQUFNLFdBQVUsWUFBaEIsRUFBNkIsVUFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkM7QUFDRSx5Q0FBTyxNQUFLLE1BQVosRUFBbUIsYUFBWSx1QkFBL0IsRUFBdUQsT0FBTyxLQUFLLEtBQUwsQ0FBVyxVQUF6RSxFQUFxRixVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBUDtBQUFBLGFBQS9GLEdBREY7QUFFRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsYUFBWSxZQUFqQyxFQUE4QyxPQUFPLEtBQUssS0FBTCxDQUFXLFdBQWhFLEVBQTZFLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssV0FBTCxDQUFpQixDQUFqQixDQUFQO0FBQUEsYUFBdkYsR0FGRjtBQUdFLHlDQUFPLE1BQUssUUFBWixFQUFxQixLQUFJLE1BQXpCLEVBQWdDLE1BQUssTUFBckMsRUFBNEMsYUFBWSxRQUF4RCxFQUFpRSxPQUFPLEtBQUssS0FBTCxDQUFXLFVBQW5GLEVBQStGLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssVUFBTCxDQUFnQixDQUFoQixDQUFQO0FBQUEsYUFBekcsR0FIRjtBQUlFLHlDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLFdBQTNCO0FBSkY7QUFERixPQURGO0FBVUQ7Ozs7RUF6RG9CLE1BQU0sUyIsImZpbGUiOiJUb2RvRm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdWJtaXROYW1lOiBcIm5ld0l0ZW1cIixcbiAgICAgIHN1Ym1pdFF1YW50OiAxLFxuICAgICAgc3VibWl0Q29zdDogMS45OVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdmFyIHByZXBhcmVkU3VibWl0ID0ge1xuICAgICAgaXRlbW5hbWU6IHRoaXMuc3RhdGUuc3VibWl0TmFtZSxcbiAgICAgIHF1YW50aXR5OiB0aGlzLnN0YXRlLnN1Ym1pdFF1YW50LFxuICAgICAgY29zdDogdGhpcy5zdGF0ZS5zdWJtaXRDb3N0XG4gICAgfVxuICAgIHRoaXMucHJvcHMudXBkYXRlTGlzdChwcmVwYXJlZFN1Ym1pdClcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdE5hbWU6IFwibmV3SXRlbVwiLFxuICAgICAgc3VibWl0UXVhbnQ6IDEsXG4gICAgICBzdWJtaXRDb3N0OiAwLjk5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZU5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TmFtZTogZS50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlUXVhbnQoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0UXVhbnQ6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVDb3N0KGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdENvc3Q6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpXG4gICAgfSlcbiAgfVxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkdG9kb1wiPlxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzdWJtaXRGb3JtXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwid2hhdHRvYnV5d2hhdHRvYnV5Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0TmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZU5hbWUoZSl9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cImhvd21hbnkuLi5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRRdWFudH0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZVF1YW50KGUpfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMC4wMVwiIHN0ZXA9XCIwLjAxXCIgcGxhY2Vob2xkZXI9XCJjb3N0Li5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRDb3N0fSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlQ29zdChlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTXVzdCBCdXkhXCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cblxuXG59Il19