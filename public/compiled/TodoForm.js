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
      // listid: 1
      // submitQuant: 1,
      // submitCost: 1.99,
    };
    return _this;
  }

  _createClass(TodoForm, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var time = new Date();
      console.log(time);
      var preparedSubmit = {
        itemname: this.state.submitName,
        quantity: this.state.submitQuant,
        listid: this.props.listid,
        userid: 0,
        cost: this.state.submitCost,
        created_at: new Date(),
        updated_at: new Date()
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
          React.createElement("input", { type: "number", min: "1", placeholder: "howmany...", value: this.state.submitQuant, onChange: function onChange(e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvRm9ybS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxvSEFDWCxLQURXOztBQUdqQixVQUFLLEtBQUwsR0FBYTtBQUNYO0FBQ0E7QUFDQTtBQUhXLEtBQWI7QUFIaUI7QUFRbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsVUFBSSxPQUFPLElBQUksSUFBSixFQUFYO0FBQ0EsY0FBUSxHQUFSLENBQVksSUFBWjtBQUNBLFVBQUksaUJBQWlCO0FBQ25CLGtCQUFVLEtBQUssS0FBTCxDQUFXLFVBREY7QUFFbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsV0FGRjtBQUduQixnQkFBUSxLQUFLLEtBQUwsQ0FBVyxNQUhBO0FBSW5CLGdCQUFRLENBSlc7QUFLbkIsY0FBTSxLQUFLLEtBQUwsQ0FBVyxVQUxFO0FBTW5CLG9CQUFZLElBQUksSUFBSixFQU5PO0FBT25CLG9CQUFZLElBQUksSUFBSjtBQVBPLE9BQXJCO0FBU0EsV0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixjQUFuQjtBQUNBLFdBQUssUUFBTCxDQUFjO0FBQ1o7QUFDQSxvQkFBWSxpQkFGQTtBQUdaLHFCQUFhLENBSEQ7QUFJWixvQkFBWTtBQUpBLE9BQWQ7QUFNRDs7OytCQUVVLEMsRUFBRztBQUNaLFdBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVksRUFBRSxNQUFGLENBQVM7QUFEVCxPQUFkO0FBR0Q7OztnQ0FFVyxDLEVBQUc7QUFDYixXQUFLLFFBQUwsQ0FBYztBQUNaLHFCQUFhLFNBQVMsRUFBRSxNQUFGLENBQVMsS0FBbEI7QUFERCxPQUFkO0FBR0Q7OzsrQkFFVSxDLEVBQUc7QUFDWixXQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFZLFdBQVcsRUFBRSxNQUFGLENBQVMsS0FBcEI7QUFEQSxPQUFkO0FBR0Q7Ozs2QkFJUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxTQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQU0sV0FBVSxZQUFoQixFQUE2QixVQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUF2QztBQUNFLHlDQUFPLE1BQUssTUFBWixFQUFtQixhQUFZLHVCQUEvQixFQUF1RCxPQUFPLEtBQUssS0FBTCxDQUFXLFVBQXpFLEVBQXFGLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssVUFBTCxDQUFnQixDQUFoQixDQUFQO0FBQUEsYUFBL0YsR0FERjtBQUVFLHlDQUFPLE1BQUssUUFBWixFQUFxQixLQUFJLEdBQXpCLEVBQTZCLGFBQVksWUFBekMsRUFBc0QsT0FBTyxLQUFLLEtBQUwsQ0FBVyxXQUF4RSxFQUFxRixVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBUDtBQUFBLGFBQS9GLEdBRkY7QUFHRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsS0FBSSxNQUF6QixFQUFnQyxNQUFLLE1BQXJDLEVBQTRDLGFBQVksUUFBeEQsRUFBaUUsT0FBTyxLQUFLLEtBQUwsQ0FBVyxVQUFuRixFQUErRixVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBUDtBQUFBLGFBQXpHLEdBSEY7QUFJRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxXQUEzQjtBQUpGO0FBREYsT0FERjtBQVVEOzs7O0VBaEVvQixNQUFNLFMiLCJmaWxlIjoiVG9kb0Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gbGlzdGlkOiAxXG4gICAgICAvLyBzdWJtaXRRdWFudDogMSxcbiAgICAgIC8vIHN1Ym1pdENvc3Q6IDEuOTksXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB2YXIgdGltZSA9IG5ldyBEYXRlKClcbiAgICBjb25zb2xlLmxvZyh0aW1lKVxuICAgIHZhciBwcmVwYXJlZFN1Ym1pdCA9IHtcbiAgICAgIGl0ZW1uYW1lOiB0aGlzLnN0YXRlLnN1Ym1pdE5hbWUsXG4gICAgICBxdWFudGl0eTogdGhpcy5zdGF0ZS5zdWJtaXRRdWFudCxcbiAgICAgIGxpc3RpZDogdGhpcy5wcm9wcy5saXN0aWQsXG4gICAgICB1c2VyaWQ6IDAsXG4gICAgICBjb3N0OiB0aGlzLnN0YXRlLnN1Ym1pdENvc3QsXG4gICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZSgpLFxuICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoKVxuICAgIH1cbiAgICB0aGlzLnByb3BzLmFkZEl0ZW0ocHJlcGFyZWRTdWJtaXQpXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAvLyB3b3VsZCBiZSBjb29sIHRvIGhhdmUgcmFuZG9taXplciBmb3IgdGhlIGRlZmF1bHQgdmFsdWVzXG4gICAgICBzdWJtaXROYW1lOiBcInNvbWV0aGluZyBzaGlueVwiLFxuICAgICAgc3VibWl0UXVhbnQ6IDEsXG4gICAgICBzdWJtaXRDb3N0OiA5Ljk5XG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZU5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TmFtZTogZS50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlUXVhbnQoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0UXVhbnQ6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVDb3N0KGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdENvc3Q6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpXG4gICAgfSlcbiAgfVxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkdG9kb1wiPlxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzdWJtaXRGb3JtXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwid2hhdHRvYnV5d2hhdHRvYnV5Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0TmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZU5hbWUoZSl9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgcGxhY2Vob2xkZXI9XCJob3dtYW55Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0UXVhbnR9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVRdWFudChlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjAuMDFcIiBzdGVwPVwiMC4wMVwiIHBsYWNlaG9sZGVyPVwiY29zdC4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0Q29zdH0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZUNvc3QoZSl9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk11c3QgQnV5IVwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG5cblxufSJdfQ==