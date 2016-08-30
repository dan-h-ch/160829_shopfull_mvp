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
        listid: 0,
        userid: 0,
        cost: this.state.submitCost
        // no timestamps currently
        // created_at: new Date.now(),
        // updated_at: new Date.now()
      };
      this.props.addItem(preparedSubmit);
      this.setState({
        // would be cool to have randomizer for the default values
        submitName: "something shiny",
        submitQuant: 1,
        submitCost: 9.99
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9Gb3JtLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sUTs7O0FBQ0osb0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLG9IQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVksU0FERDtBQUVYLG1CQUFhLENBRkY7QUFHWCxrQkFBWTtBQUhELEtBQWI7QUFIaUI7QUFRbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsVUFERjtBQUVuQixrQkFBVSxLQUFLLEtBQUwsQ0FBVyxXQUZGO0FBR25CLGdCQUFRLENBSFc7QUFJbkIsZ0JBQVEsQ0FKVztBQUtuQixjQUFNLEtBQUssS0FBTCxDQUFXO0FBQ2pCO0FBQ0E7QUFDQTtBQVJtQixPQUFyQjtBQVVBLFdBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsY0FBbkI7QUFDQSxXQUFLLFFBQUwsQ0FBYztBQUNaO0FBQ0Esb0JBQVksaUJBRkE7QUFHWixxQkFBYSxDQUhEO0FBSVosb0JBQVk7QUFKQSxPQUFkO0FBTUQ7OzsrQkFFVSxDLEVBQUc7QUFDWixXQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFZLEVBQUUsTUFBRixDQUFTO0FBRFQsT0FBZDtBQUdEOzs7Z0NBRVcsQyxFQUFHO0FBQ2IsV0FBSyxRQUFMLENBQWM7QUFDWixxQkFBYSxTQUFTLEVBQUUsTUFBRixDQUFTLEtBQWxCO0FBREQsT0FBZDtBQUdEOzs7K0JBRVUsQyxFQUFHO0FBQ1osV0FBSyxRQUFMLENBQWM7QUFDWixvQkFBWSxXQUFXLEVBQUUsTUFBRixDQUFTLEtBQXBCO0FBREEsT0FBZDtBQUdEOzs7NkJBSVE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsU0FBZjtBQUNFO0FBQUE7QUFBQSxZQUFNLFdBQVUsWUFBaEIsRUFBNkIsVUFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkM7QUFDRSx5Q0FBTyxNQUFLLE1BQVosRUFBbUIsYUFBWSx1QkFBL0IsRUFBdUQsT0FBTyxLQUFLLEtBQUwsQ0FBVyxVQUF6RSxFQUFxRixVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBUDtBQUFBLGFBQS9GLEdBREY7QUFFRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsYUFBWSxZQUFqQyxFQUE4QyxPQUFPLEtBQUssS0FBTCxDQUFXLFdBQWhFLEVBQTZFLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssV0FBTCxDQUFpQixDQUFqQixDQUFQO0FBQUEsYUFBdkYsR0FGRjtBQUdFLHlDQUFPLE1BQUssUUFBWixFQUFxQixLQUFJLE1BQXpCLEVBQWdDLE1BQUssTUFBckMsRUFBNEMsYUFBWSxRQUF4RCxFQUFpRSxPQUFPLEtBQUssS0FBTCxDQUFXLFVBQW5GLEVBQStGLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssVUFBTCxDQUFnQixDQUFoQixDQUFQO0FBQUEsYUFBekcsR0FIRjtBQUlFLHlDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLFdBQTNCO0FBSkY7QUFERixPQURGO0FBVUQ7Ozs7RUEvRG9CLE1BQU0sUyIsImZpbGUiOiJUb2RvRm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdWJtaXROYW1lOiBcIm5ld0l0ZW1cIixcbiAgICAgIHN1Ym1pdFF1YW50OiAxLFxuICAgICAgc3VibWl0Q29zdDogMS45OSxcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHZhciBwcmVwYXJlZFN1Ym1pdCA9IHtcbiAgICAgIGl0ZW1uYW1lOiB0aGlzLnN0YXRlLnN1Ym1pdE5hbWUsXG4gICAgICBxdWFudGl0eTogdGhpcy5zdGF0ZS5zdWJtaXRRdWFudCxcbiAgICAgIGxpc3RpZDogMCxcbiAgICAgIHVzZXJpZDogMCxcbiAgICAgIGNvc3Q6IHRoaXMuc3RhdGUuc3VibWl0Q29zdFxuICAgICAgLy8gbm8gdGltZXN0YW1wcyBjdXJyZW50bHlcbiAgICAgIC8vIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlLm5vdygpLFxuICAgICAgLy8gdXBkYXRlZF9hdDogbmV3IERhdGUubm93KClcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5hZGRJdGVtKHByZXBhcmVkU3VibWl0KVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLy8gd291bGQgYmUgY29vbCB0byBoYXZlIHJhbmRvbWl6ZXIgZm9yIHRoZSBkZWZhdWx0IHZhbHVlc1xuICAgICAgc3VibWl0TmFtZTogXCJzb21ldGhpbmcgc2hpbnlcIixcbiAgICAgIHN1Ym1pdFF1YW50OiAxLFxuICAgICAgc3VibWl0Q29zdDogOS45OVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVOYW1lKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdE5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZVF1YW50KGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdFF1YW50OiBwYXJzZUludChlLnRhcmdldC52YWx1ZSlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQ29zdChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXRDb3N0OiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKVxuICAgIH0pXG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZHRvZG9cIj5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic3VibWl0Rm9ybVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIndoYXR0b2J1eXdoYXR0b2J1eS4uLlwiIHZhbHVlPXt0aGlzLnN0YXRlLnN1Ym1pdE5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVOYW1lKGUpfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJob3dtYW55Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0UXVhbnR9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVRdWFudChlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjAuMDFcIiBzdGVwPVwiMC4wMVwiIHBsYWNlaG9sZGVyPVwiY29zdC4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0Q29zdH0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZUNvc3QoZSl9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk11c3QgQnV5IVwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG5cblxufSJdfQ==