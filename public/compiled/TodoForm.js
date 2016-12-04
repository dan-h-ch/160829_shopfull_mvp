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
      var preparedSubmit = {
        itemname: this.state.submitName,
        quantity: this.state.submitQuant,
        listid: this.props.listid,
        item_create_userid: this.props.userid,
        cost: this.state.submitCost,
        created_at: new Date(),
        updated_at: new Date()
      };
      this.props.addItem(preparedSubmit);
      this.setState({
        // would be cool to have randomizer for the default values
        submitName: '',
        submitQuant: 0,
        submitCost: 0
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
        null,
        React.createElement(
          "form",
          { className: "add-todo", onSubmit: this.handleSubmit.bind(this) },
          React.createElement("input", { className: "add-todo-form-input", type: "text", placeholder: "whattobuywhattobuy...", value: this.state.submitName || '', onChange: function onChange(e) {
              return _this2.updateName(e);
            } }),
          React.createElement("input", { className: "add-todo-form-button", type: "submit", value: "Add" })
        )
      );
    }
  }]);

  return TodoForm;
}(React.Component);

// removed from above when decision to get rid of cost and quant was made - code exists incase revert
// <input type="number" min="1" placeholder="howmany..." value={this.state.submitQuant || ''} onChange={(e) => this.updateQuant(e)} />
// <input type="number" min="0.01" step="0.01" placeholder="cost.." value={this.state.submitCost || ''} onChange={(e) => this.updateCost(e)} />
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvRm9ybS5qc3giXSwibmFtZXMiOlsiVG9kb0Zvcm0iLCJwcm9wcyIsInN0YXRlIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGltZSIsIkRhdGUiLCJwcmVwYXJlZFN1Ym1pdCIsIml0ZW1uYW1lIiwic3VibWl0TmFtZSIsInF1YW50aXR5Iiwic3VibWl0UXVhbnQiLCJsaXN0aWQiLCJpdGVtX2NyZWF0ZV91c2VyaWQiLCJ1c2VyaWQiLCJjb3N0Iiwic3VibWl0Q29zdCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwiYWRkSXRlbSIsInNldFN0YXRlIiwidGFyZ2V0IiwidmFsdWUiLCJwYXJzZUludCIsInBhcnNlRmxvYXQiLCJoYW5kbGVTdWJtaXQiLCJiaW5kIiwidXBkYXRlTmFtZSIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLFE7OztBQUNKLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsb0hBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYO0FBQ0E7QUFDQTtBQUhXLEtBQWI7QUFIaUI7QUFRbEI7Ozs7aUNBRVlDLEMsRUFBRztBQUNkQSxRQUFFQyxjQUFGO0FBQ0EsVUFBSUMsT0FBTyxJQUFJQyxJQUFKLEVBQVg7QUFDQSxVQUFJQyxpQkFBaUI7QUFDbkJDLGtCQUFVLEtBQUtOLEtBQUwsQ0FBV08sVUFERjtBQUVuQkMsa0JBQVUsS0FBS1IsS0FBTCxDQUFXUyxXQUZGO0FBR25CQyxnQkFBUSxLQUFLWCxLQUFMLENBQVdXLE1BSEE7QUFJbkJDLDRCQUFvQixLQUFLWixLQUFMLENBQVdhLE1BSlo7QUFLbkJDLGNBQU0sS0FBS2IsS0FBTCxDQUFXYyxVQUxFO0FBTW5CQyxvQkFBWSxJQUFJWCxJQUFKLEVBTk87QUFPbkJZLG9CQUFZLElBQUlaLElBQUo7QUFQTyxPQUFyQjtBQVNBLFdBQUtMLEtBQUwsQ0FBV2tCLE9BQVgsQ0FBbUJaLGNBQW5CO0FBQ0EsV0FBS2EsUUFBTCxDQUFjO0FBQ1o7QUFDQVgsb0JBQVksRUFGQTtBQUdaRSxxQkFBYSxDQUhEO0FBSVpLLG9CQUFZO0FBSkEsT0FBZDtBQU1EOzs7K0JBRVViLEMsRUFBRztBQUNaLFdBQUtpQixRQUFMLENBQWM7QUFDWlgsb0JBQVlOLEVBQUVrQixNQUFGLENBQVNDO0FBRFQsT0FBZDtBQUdEOzs7Z0NBRVduQixDLEVBQUc7QUFDYixXQUFLaUIsUUFBTCxDQUFjO0FBQ1pULHFCQUFhWSxTQUFTcEIsRUFBRWtCLE1BQUYsQ0FBU0MsS0FBbEI7QUFERCxPQUFkO0FBR0Q7OzsrQkFFVW5CLEMsRUFBRztBQUNaLFdBQUtpQixRQUFMLENBQWM7QUFDWkosb0JBQVlRLFdBQVdyQixFQUFFa0IsTUFBRixDQUFTQyxLQUFwQjtBQURBLE9BQWQ7QUFHRDs7OzZCQUlRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBTSxXQUFVLFVBQWhCLEVBQTJCLFVBQVUsS0FBS0csWUFBTCxDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBckM7QUFDRSx5Q0FBTyxXQUFVLHFCQUFqQixFQUF1QyxNQUFLLE1BQTVDLEVBQW1ELGFBQVksdUJBQS9ELEVBQXVGLE9BQU8sS0FBS3hCLEtBQUwsQ0FBV08sVUFBWCxJQUF5QixFQUF2SCxFQUEySCxVQUFVLGtCQUFDTixDQUFEO0FBQUEscUJBQU8sT0FBS3dCLFVBQUwsQ0FBZ0J4QixDQUFoQixDQUFQO0FBQUEsYUFBckksR0FERjtBQUVFLHlDQUFPLFdBQVUsc0JBQWpCLEVBQXdDLE1BQUssUUFBN0MsRUFBc0QsT0FBTSxLQUE1RDtBQUZGO0FBREYsT0FERjtBQVFEOzs7O0VBN0RvQnlCLE1BQU1DLFM7O0FBa0U3QjtBQUNVO0FBQ0EiLCJmaWxlIjoiVG9kb0Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC8vIGxpc3RpZDogMVxuICAgICAgLy8gc3VibWl0UXVhbnQ6IDEsXG4gICAgICAvLyBzdWJtaXRDb3N0OiAxLjk5LFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdGltZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHByZXBhcmVkU3VibWl0ID0ge1xuICAgICAgaXRlbW5hbWU6IHRoaXMuc3RhdGUuc3VibWl0TmFtZSxcbiAgICAgIHF1YW50aXR5OiB0aGlzLnN0YXRlLnN1Ym1pdFF1YW50LFxuICAgICAgbGlzdGlkOiB0aGlzLnByb3BzLmxpc3RpZCxcbiAgICAgIGl0ZW1fY3JlYXRlX3VzZXJpZDogdGhpcy5wcm9wcy51c2VyaWQsXG4gICAgICBjb3N0OiB0aGlzLnN0YXRlLnN1Ym1pdENvc3QsXG4gICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZSgpLFxuICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoKVxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5hZGRJdGVtKHByZXBhcmVkU3VibWl0KTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC8vIHdvdWxkIGJlIGNvb2wgdG8gaGF2ZSByYW5kb21pemVyIGZvciB0aGUgZGVmYXVsdCB2YWx1ZXNcbiAgICAgIHN1Ym1pdE5hbWU6ICcnLFxuICAgICAgc3VibWl0UXVhbnQ6IDAsXG4gICAgICBzdWJtaXRDb3N0OiAwXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVOYW1lKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdE5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVRdWFudChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXRRdWFudDogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVDb3N0KGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdENvc3Q6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpXG4gICAgfSk7XG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJhZGQtdG9kb1wiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRkLXRvZG8tZm9ybS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJ3aGF0dG9idXl3aGF0dG9idXkuLi5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXROYW1lIHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlTmFtZShlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRkLXRvZG8tZm9ybS1idXR0b25cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJBZGRcIiAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cblxufVxuXG4vLyByZW1vdmVkIGZyb20gYWJvdmUgd2hlbiBkZWNpc2lvbiB0byBnZXQgcmlkIG9mIGNvc3QgYW5kIHF1YW50IHdhcyBtYWRlIC0gY29kZSBleGlzdHMgaW5jYXNlIHJldmVydFxuICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIHBsYWNlaG9sZGVyPVwiaG93bWFueS4uLlwiIHZhbHVlPXt0aGlzLnN0YXRlLnN1Ym1pdFF1YW50IHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlUXVhbnQoZSl9IC8+XG4gICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwLjAxXCIgc3RlcD1cIjAuMDFcIiBwbGFjZWhvbGRlcj1cImNvc3QuLlwiIHZhbHVlPXt0aGlzLnN0YXRlLnN1Ym1pdENvc3QgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVDb3N0KGUpfSAvPiJdfQ==