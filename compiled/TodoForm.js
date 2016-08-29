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
      submitCost: 0.99
    };
    return _this;
  }

  _createClass(TodoForm, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var preparedSubmit = {
        name: this.state.submitName,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1RvZG9Gb3JtLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sUTs7O0FBQ0osb0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLG9IQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhO0FBQ1gsa0JBQVksU0FERDtBQUVYLG1CQUFhLENBRkY7QUFHWCxrQkFBWTtBQUhELEtBQWI7QUFIaUI7QUFRbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsY0FBTSxLQUFLLEtBQUwsQ0FBVyxVQURFO0FBRW5CLGtCQUFVLEtBQUssS0FBTCxDQUFXLFdBRkY7QUFHbkIsY0FBTSxLQUFLLEtBQUwsQ0FBVztBQUhFLE9BQXJCO0FBS0EsV0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixjQUF0QjtBQUNBLFdBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVksU0FEQTtBQUVaLHFCQUFhLENBRkQ7QUFHWixvQkFBWTtBQUhBLE9BQWQ7QUFLRDs7OytCQUVVLEMsRUFBRztBQUNaLFdBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVksRUFBRSxNQUFGLENBQVM7QUFEVCxPQUFkO0FBR0Q7OztnQ0FFVyxDLEVBQUc7QUFDYixXQUFLLFFBQUwsQ0FBYztBQUNaLHFCQUFhLFNBQVMsRUFBRSxNQUFGLENBQVMsS0FBbEI7QUFERCxPQUFkO0FBR0Q7OzsrQkFFVSxDLEVBQUc7QUFDWixXQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFZLFdBQVcsRUFBRSxNQUFGLENBQVMsS0FBcEI7QUFEQSxPQUFkO0FBR0Q7Ozs2QkFJUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxTQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQU0sV0FBVSxZQUFoQixFQUE2QixVQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUF2QztBQUNFLHlDQUFPLE1BQUssTUFBWixFQUFtQixhQUFZLHVCQUEvQixFQUF1RCxPQUFPLEtBQUssS0FBTCxDQUFXLFVBQXpFLEVBQXFGLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssVUFBTCxDQUFnQixDQUFoQixDQUFQO0FBQUEsYUFBL0YsR0FERjtBQUVFLHlDQUFPLE1BQUssUUFBWixFQUFxQixhQUFZLFlBQWpDLEVBQThDLE9BQU8sS0FBSyxLQUFMLENBQVcsV0FBaEUsRUFBNkUsVUFBVSxrQkFBQyxDQUFEO0FBQUEscUJBQU8sT0FBSyxXQUFMLENBQWlCLENBQWpCLENBQVA7QUFBQSxhQUF2RixHQUZGO0FBR0UseUNBQU8sTUFBSyxRQUFaLEVBQXFCLEtBQUksTUFBekIsRUFBZ0MsTUFBSyxNQUFyQyxFQUE0QyxhQUFZLFFBQXhELEVBQWlFLE9BQU8sS0FBSyxLQUFMLENBQVcsVUFBbkYsRUFBK0YsVUFBVSxrQkFBQyxDQUFEO0FBQUEscUJBQU8sT0FBSyxVQUFMLENBQWdCLENBQWhCLENBQVA7QUFBQSxhQUF6RyxHQUhGO0FBSUUseUNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sV0FBM0I7QUFKRjtBQURGLE9BREY7QUFVRDs7OztFQXpEb0IsTUFBTSxTIiwiZmlsZSI6IlRvZG9Gb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kb0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHN1Ym1pdE5hbWU6IFwibmV3SXRlbVwiLFxuICAgICAgc3VibWl0UXVhbnQ6IDEsXG4gICAgICBzdWJtaXRDb3N0OiAwLjk5XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB2YXIgcHJlcGFyZWRTdWJtaXQgPSB7XG4gICAgICBuYW1lOiB0aGlzLnN0YXRlLnN1Ym1pdE5hbWUsXG4gICAgICBxdWFudGl0eTogdGhpcy5zdGF0ZS5zdWJtaXRRdWFudCxcbiAgICAgIGNvc3Q6IHRoaXMuc3RhdGUuc3VibWl0Q29zdFxuICAgIH1cbiAgICB0aGlzLnByb3BzLnVwZGF0ZUxpc3QocHJlcGFyZWRTdWJtaXQpXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXROYW1lOiBcIm5ld0l0ZW1cIixcbiAgICAgIHN1Ym1pdFF1YW50OiAxLFxuICAgICAgc3VibWl0Q29zdDogMC45OVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVOYW1lKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdE5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZVF1YW50KGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdFF1YW50OiBwYXJzZUludChlLnRhcmdldC52YWx1ZSlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlQ29zdChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXRDb3N0OiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKVxuICAgIH0pXG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFkZHRvZG9cIj5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic3VibWl0Rm9ybVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIndoYXR0b2J1eXdoYXR0b2J1eS4uLlwiIHZhbHVlPXt0aGlzLnN0YXRlLnN1Ym1pdE5hbWV9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVOYW1lKGUpfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJob3dtYW55Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0UXVhbnR9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVRdWFudChlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjAuMDFcIiBzdGVwPVwiMC4wMVwiIHBsYWNlaG9sZGVyPVwiY29zdC4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0Q29zdH0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZUNvc3QoZSl9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk11c3QgQnV5IVwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG5cblxufSJdfQ==