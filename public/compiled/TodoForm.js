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
          React.createElement("input", { type: "number", min: "1", placeholder: "howmany...", value: this.state.submitQuant || '', onChange: function onChange(e) {
              return _this2.updateQuant(e);
            } }),
          React.createElement("input", { type: "number", min: "0.01", step: "0.01", placeholder: "cost..", value: this.state.submitCost || '', onChange: function onChange(e) {
              return _this2.updateCost(e);
            } }),
          React.createElement("input", { type: "submit", value: "Must Buy!" })
        )
      );
    }
  }]);

  return TodoForm;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvRm9ybS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxvSEFDWCxLQURXOztBQUdqQixVQUFLLEtBQUwsR0FBYTtBQUNYO0FBQ0E7QUFDQTtBQUhXLEtBQWI7QUFIaUI7QUFRbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsVUFBSSxPQUFPLElBQUksSUFBSixFQUFYO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsVUFERjtBQUVuQixrQkFBVSxLQUFLLEtBQUwsQ0FBVyxXQUZGO0FBR25CLGdCQUFRLEtBQUssS0FBTCxDQUFXLE1BSEE7QUFJbkIsNEJBQW9CLEtBQUssS0FBTCxDQUFXLE1BSlo7QUFLbkIsY0FBTSxLQUFLLEtBQUwsQ0FBVyxVQUxFO0FBTW5CLG9CQUFZLElBQUksSUFBSixFQU5PO0FBT25CLG9CQUFZLElBQUksSUFBSjtBQVBPLE9BQXJCO0FBU0EsV0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixjQUFuQjtBQUNBLFdBQUssUUFBTCxDQUFjO0FBQ1o7QUFDQSxvQkFBWSxFQUZBO0FBR1oscUJBQWEsQ0FIRDtBQUlaLG9CQUFZO0FBSkEsT0FBZDtBQU1EOzs7K0JBRVUsQyxFQUFHO0FBQ1osV0FBSyxRQUFMLENBQWM7QUFDWixvQkFBWSxFQUFFLE1BQUYsQ0FBUztBQURULE9BQWQ7QUFHRDs7O2dDQUVXLEMsRUFBRztBQUNiLFdBQUssUUFBTCxDQUFjO0FBQ1oscUJBQWEsU0FBUyxFQUFFLE1BQUYsQ0FBUyxLQUFsQjtBQURELE9BQWQ7QUFHRDs7OytCQUVVLEMsRUFBRztBQUNaLFdBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVksV0FBVyxFQUFFLE1BQUYsQ0FBUyxLQUFwQjtBQURBLE9BQWQ7QUFHRDs7OzZCQUlRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFNBQWY7QUFDRTtBQUFBO0FBQUEsWUFBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXZDO0FBQ0UseUNBQU8sTUFBSyxNQUFaLEVBQW1CLGFBQVksdUJBQS9CLEVBQXVELE9BQU8sS0FBSyxLQUFMLENBQVcsVUFBWCxJQUF5QixFQUF2RixFQUEyRixVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBUDtBQUFBLGFBQXJHLEdBREY7QUFFRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsS0FBSSxHQUF6QixFQUE2QixhQUFZLFlBQXpDLEVBQXNELE9BQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxJQUEwQixFQUF2RixFQUEyRixVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBUDtBQUFBLGFBQXJHLEdBRkY7QUFHRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsS0FBSSxNQUF6QixFQUFnQyxNQUFLLE1BQXJDLEVBQTRDLGFBQVksUUFBeEQsRUFBaUUsT0FBTyxLQUFLLEtBQUwsQ0FBVyxVQUFYLElBQXlCLEVBQWpHLEVBQXFHLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssVUFBTCxDQUFnQixDQUFoQixDQUFQO0FBQUEsYUFBL0csR0FIRjtBQUlFLHlDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLFdBQTNCO0FBSkY7QUFERixPQURGO0FBVUQ7Ozs7RUEvRG9CLE1BQU0sUyIsImZpbGUiOiJUb2RvRm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAvLyBsaXN0aWQ6IDFcbiAgICAgIC8vIHN1Ym1pdFF1YW50OiAxLFxuICAgICAgLy8gc3VibWl0Q29zdDogMS45OSxcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHZhciB0aW1lID0gbmV3IERhdGUoKVxuICAgIHZhciBwcmVwYXJlZFN1Ym1pdCA9IHtcbiAgICAgIGl0ZW1uYW1lOiB0aGlzLnN0YXRlLnN1Ym1pdE5hbWUsXG4gICAgICBxdWFudGl0eTogdGhpcy5zdGF0ZS5zdWJtaXRRdWFudCxcbiAgICAgIGxpc3RpZDogdGhpcy5wcm9wcy5saXN0aWQsXG4gICAgICBpdGVtX2NyZWF0ZV91c2VyaWQ6IHRoaXMucHJvcHMudXNlcmlkLFxuICAgICAgY29zdDogdGhpcy5zdGF0ZS5zdWJtaXRDb3N0LFxuICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoKSxcbiAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKClcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5hZGRJdGVtKHByZXBhcmVkU3VibWl0KVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLy8gd291bGQgYmUgY29vbCB0byBoYXZlIHJhbmRvbWl6ZXIgZm9yIHRoZSBkZWZhdWx0IHZhbHVlc1xuICAgICAgc3VibWl0TmFtZTogJycsXG4gICAgICBzdWJtaXRRdWFudDogMCxcbiAgICAgIHN1Ym1pdENvc3Q6IDBcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlTmFtZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXROYW1lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVRdWFudChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXRRdWFudDogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUNvc3QoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0Q29zdDogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSlcbiAgICB9KVxuICB9XG5cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGR0b2RvXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInN1Ym1pdEZvcm1cIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJ3aGF0dG9idXl3aGF0dG9idXkuLi5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXROYW1lIHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlTmFtZShlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBwbGFjZWhvbGRlcj1cImhvd21hbnkuLi5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRRdWFudCB8fCAnJ30gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZVF1YW50KGUpfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMC4wMVwiIHN0ZXA9XCIwLjAxXCIgcGxhY2Vob2xkZXI9XCJjb3N0Li5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRDb3N0IHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlQ29zdChlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTXVzdCBCdXkhXCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cblxuXG59Il19