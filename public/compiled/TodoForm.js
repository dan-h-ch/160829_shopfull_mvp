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
        { className: "addtodo" },
        React.createElement(
          "form",
          { className: "submitForm", onSubmit: this.handleSubmit.bind(this) },
          React.createElement("input", { type: "text", placeholder: "whattobuywhattobuy...", value: this.state.submitName || '', onChange: function onChange(e) {
              return _this2.updateName(e);
            } }),
          React.createElement("input", { type: "submit", value: "Must Buy!" })
        )
      );
    }
  }]);

  return TodoForm;
}(React.Component);

// removed from above when decision to get rid of cost and quant was made - code exists incase revert
// <input type="number" min="1" placeholder="howmany..." value={this.state.submitQuant || ''} onChange={(e) => this.updateQuant(e)} />
// <input type="number" min="0.01" step="0.01" placeholder="cost.." value={this.state.submitCost || ''} onChange={(e) => this.updateCost(e)} />
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvRm9ybS5qc3giXSwibmFtZXMiOlsiVG9kb0Zvcm0iLCJwcm9wcyIsInN0YXRlIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGltZSIsIkRhdGUiLCJwcmVwYXJlZFN1Ym1pdCIsIml0ZW1uYW1lIiwic3VibWl0TmFtZSIsInF1YW50aXR5Iiwic3VibWl0UXVhbnQiLCJsaXN0aWQiLCJpdGVtX2NyZWF0ZV91c2VyaWQiLCJ1c2VyaWQiLCJjb3N0Iiwic3VibWl0Q29zdCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwiYWRkSXRlbSIsInNldFN0YXRlIiwidGFyZ2V0IiwidmFsdWUiLCJwYXJzZUludCIsInBhcnNlRmxvYXQiLCJoYW5kbGVTdWJtaXQiLCJiaW5kIiwidXBkYXRlTmFtZSIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLFE7OztBQUNKLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsb0hBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYO0FBQ0E7QUFDQTtBQUhXLEtBQWI7QUFIaUI7QUFRbEI7Ozs7aUNBRVlDLEMsRUFBRztBQUNkQSxRQUFFQyxjQUFGO0FBQ0EsVUFBSUMsT0FBTyxJQUFJQyxJQUFKLEVBQVg7QUFDQSxVQUFJQyxpQkFBaUI7QUFDbkJDLGtCQUFVLEtBQUtOLEtBQUwsQ0FBV08sVUFERjtBQUVuQkMsa0JBQVUsS0FBS1IsS0FBTCxDQUFXUyxXQUZGO0FBR25CQyxnQkFBUSxLQUFLWCxLQUFMLENBQVdXLE1BSEE7QUFJbkJDLDRCQUFvQixLQUFLWixLQUFMLENBQVdhLE1BSlo7QUFLbkJDLGNBQU0sS0FBS2IsS0FBTCxDQUFXYyxVQUxFO0FBTW5CQyxvQkFBWSxJQUFJWCxJQUFKLEVBTk87QUFPbkJZLG9CQUFZLElBQUlaLElBQUo7QUFQTyxPQUFyQjtBQVNBLFdBQUtMLEtBQUwsQ0FBV2tCLE9BQVgsQ0FBbUJaLGNBQW5CO0FBQ0EsV0FBS2EsUUFBTCxDQUFjO0FBQ1o7QUFDQVgsb0JBQVksRUFGQTtBQUdaRSxxQkFBYSxDQUhEO0FBSVpLLG9CQUFZO0FBSkEsT0FBZDtBQU1EOzs7K0JBRVViLEMsRUFBRztBQUNaLFdBQUtpQixRQUFMLENBQWM7QUFDWlgsb0JBQVlOLEVBQUVrQixNQUFGLENBQVNDO0FBRFQsT0FBZDtBQUdEOzs7Z0NBRVduQixDLEVBQUc7QUFDYixXQUFLaUIsUUFBTCxDQUFjO0FBQ1pULHFCQUFhWSxTQUFTcEIsRUFBRWtCLE1BQUYsQ0FBU0MsS0FBbEI7QUFERCxPQUFkO0FBR0Q7OzsrQkFFVW5CLEMsRUFBRztBQUNaLFdBQUtpQixRQUFMLENBQWM7QUFDWkosb0JBQVlRLFdBQVdyQixFQUFFa0IsTUFBRixDQUFTQyxLQUFwQjtBQURBLE9BQWQ7QUFHRDs7OzZCQUlRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFNBQWY7QUFDRTtBQUFBO0FBQUEsWUFBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBS0csWUFBTCxDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkM7QUFDRSx5Q0FBTyxNQUFLLE1BQVosRUFBbUIsYUFBWSx1QkFBL0IsRUFBdUQsT0FBTyxLQUFLeEIsS0FBTCxDQUFXTyxVQUFYLElBQXlCLEVBQXZGLEVBQTJGLFVBQVUsa0JBQUNOLENBQUQ7QUFBQSxxQkFBTyxPQUFLd0IsVUFBTCxDQUFnQnhCLENBQWhCLENBQVA7QUFBQSxhQUFyRyxHQURGO0FBRUUseUNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sV0FBM0I7QUFGRjtBQURGLE9BREY7QUFRRDs7OztFQTdEb0J5QixNQUFNQyxTOztBQWtFN0I7QUFDVTtBQUNBIiwiZmlsZSI6IlRvZG9Gb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kb0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAvLyBsaXN0aWQ6IDFcbiAgICAgIC8vIHN1Ym1pdFF1YW50OiAxLFxuICAgICAgLy8gc3VibWl0Q29zdDogMS45OSxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBwcmVwYXJlZFN1Ym1pdCA9IHtcbiAgICAgIGl0ZW1uYW1lOiB0aGlzLnN0YXRlLnN1Ym1pdE5hbWUsXG4gICAgICBxdWFudGl0eTogdGhpcy5zdGF0ZS5zdWJtaXRRdWFudCxcbiAgICAgIGxpc3RpZDogdGhpcy5wcm9wcy5saXN0aWQsXG4gICAgICBpdGVtX2NyZWF0ZV91c2VyaWQ6IHRoaXMucHJvcHMudXNlcmlkLFxuICAgICAgY29zdDogdGhpcy5zdGF0ZS5zdWJtaXRDb3N0LFxuICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoKSxcbiAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKClcbiAgICB9O1xuICAgIHRoaXMucHJvcHMuYWRkSXRlbShwcmVwYXJlZFN1Ym1pdCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAvLyB3b3VsZCBiZSBjb29sIHRvIGhhdmUgcmFuZG9taXplciBmb3IgdGhlIGRlZmF1bHQgdmFsdWVzXG4gICAgICBzdWJtaXROYW1lOiAnJyxcbiAgICAgIHN1Ym1pdFF1YW50OiAwLFxuICAgICAgc3VibWl0Q29zdDogMFxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTmFtZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXROYW1lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUXVhbnQoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0UXVhbnQ6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlQ29zdChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXRDb3N0OiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKVxuICAgIH0pO1xuICB9XG5cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGR0b2RvXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInN1Ym1pdEZvcm1cIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJ3aGF0dG9idXl3aGF0dG9idXkuLi5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXROYW1lIHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlTmFtZShlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTXVzdCBCdXkhXCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG5cbn1cblxuLy8gcmVtb3ZlZCBmcm9tIGFib3ZlIHdoZW4gZGVjaXNpb24gdG8gZ2V0IHJpZCBvZiBjb3N0IGFuZCBxdWFudCB3YXMgbWFkZSAtIGNvZGUgZXhpc3RzIGluY2FzZSByZXZlcnRcbiAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBwbGFjZWhvbGRlcj1cImhvd21hbnkuLi5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRRdWFudCB8fCAnJ30gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZVF1YW50KGUpfSAvPlxuICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMC4wMVwiIHN0ZXA9XCIwLjAxXCIgcGxhY2Vob2xkZXI9XCJjb3N0Li5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRDb3N0IHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlQ29zdChlKX0gLz4iXX0=