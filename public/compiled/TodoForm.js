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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvRm9ybS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxvSEFDWCxLQURXOztBQUdqQixVQUFLLEtBQUwsR0FBYTtBQUNYO0FBQ0E7QUFDQTtBQUhXLEtBQWI7QUFIaUI7QUFRbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsVUFBSSxPQUFPLElBQUksSUFBSixFQUFYO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsVUFERjtBQUVuQixrQkFBVSxLQUFLLEtBQUwsQ0FBVyxXQUZGO0FBR25CLGdCQUFRLEtBQUssS0FBTCxDQUFXLE1BSEE7QUFJbkIsNEJBQW9CLEtBQUssS0FBTCxDQUFXLE1BSlo7QUFLbkIsY0FBTSxLQUFLLEtBQUwsQ0FBVyxVQUxFO0FBTW5CLG9CQUFZLElBQUksSUFBSixFQU5PO0FBT25CLG9CQUFZLElBQUksSUFBSjtBQVBPLE9BQXJCO0FBU0EsV0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixjQUFuQjtBQUNBLFdBQUssUUFBTCxDQUFjO0FBQ1o7QUFDQSxvQkFBWSxFQUZBO0FBR1oscUJBQWEsQ0FIRDtBQUlaLG9CQUFZO0FBSkEsT0FBZDtBQU1EOzs7K0JBRVUsQyxFQUFHO0FBQ1osV0FBSyxRQUFMLENBQWM7QUFDWixvQkFBWSxFQUFFLE1BQUYsQ0FBUztBQURULE9BQWQ7QUFHRDs7O2dDQUVXLEMsRUFBRztBQUNiLFdBQUssUUFBTCxDQUFjO0FBQ1oscUJBQWEsU0FBUyxFQUFFLE1BQUYsQ0FBUyxLQUFsQjtBQURELE9BQWQ7QUFHRDs7OytCQUVVLEMsRUFBRztBQUNaLFdBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVksV0FBVyxFQUFFLE1BQUYsQ0FBUyxLQUFwQjtBQURBLE9BQWQ7QUFHRDs7OzZCQUlRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFNBQWY7QUFDRTtBQUFBO0FBQUEsWUFBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXZDO0FBQ0UseUNBQU8sTUFBSyxNQUFaLEVBQW1CLGFBQVksdUJBQS9CLEVBQXVELE9BQU8sS0FBSyxLQUFMLENBQVcsVUFBWCxJQUF5QixFQUF2RixFQUEyRixVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBUDtBQUFBLGFBQXJHLEdBREY7QUFFRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsS0FBSSxHQUF6QixFQUE2QixhQUFZLFlBQXpDLEVBQXNELE9BQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxJQUEwQixFQUF2RixFQUEyRixVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBUDtBQUFBLGFBQXJHLEdBRkY7QUFHRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsS0FBSSxNQUF6QixFQUFnQyxNQUFLLE1BQXJDLEVBQTRDLGFBQVksUUFBeEQsRUFBaUUsT0FBTyxLQUFLLEtBQUwsQ0FBVyxVQUFYLElBQXlCLEVBQWpHLEVBQXFHLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssVUFBTCxDQUFnQixDQUFoQixDQUFQO0FBQUEsYUFBL0csR0FIRjtBQUlFLHlDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLFdBQTNCO0FBSkY7QUFERixPQURGO0FBVUQ7Ozs7RUEvRG9CLE1BQU0sUyIsImZpbGUiOiJUb2RvRm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gbGlzdGlkOiAxXG4gICAgICAvLyBzdWJtaXRRdWFudDogMSxcbiAgICAgIC8vIHN1Ym1pdENvc3Q6IDEuOTksXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB0aW1lID0gbmV3IERhdGUoKTtcbiAgICB2YXIgcHJlcGFyZWRTdWJtaXQgPSB7XG4gICAgICBpdGVtbmFtZTogdGhpcy5zdGF0ZS5zdWJtaXROYW1lLFxuICAgICAgcXVhbnRpdHk6IHRoaXMuc3RhdGUuc3VibWl0UXVhbnQsXG4gICAgICBsaXN0aWQ6IHRoaXMucHJvcHMubGlzdGlkLFxuICAgICAgaXRlbV9jcmVhdGVfdXNlcmlkOiB0aGlzLnByb3BzLnVzZXJpZCxcbiAgICAgIGNvc3Q6IHRoaXMuc3RhdGUuc3VibWl0Q29zdCxcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZSgpXG4gICAgfTtcbiAgICB0aGlzLnByb3BzLmFkZEl0ZW0ocHJlcGFyZWRTdWJtaXQpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLy8gd291bGQgYmUgY29vbCB0byBoYXZlIHJhbmRvbWl6ZXIgZm9yIHRoZSBkZWZhdWx0IHZhbHVlc1xuICAgICAgc3VibWl0TmFtZTogJycsXG4gICAgICBzdWJtaXRRdWFudDogMCxcbiAgICAgIHN1Ym1pdENvc3Q6IDBcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TmFtZTogZS50YXJnZXQudmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVF1YW50KGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdFF1YW50OiBwYXJzZUludChlLnRhcmdldC52YWx1ZSlcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUNvc3QoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0Q29zdDogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSlcbiAgICB9KTtcbiAgfVxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkdG9kb1wiPlxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzdWJtaXRGb3JtXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwid2hhdHRvYnV5d2hhdHRvYnV5Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0TmFtZSB8fCAnJ30gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZU5hbWUoZSl9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgcGxhY2Vob2xkZXI9XCJob3dtYW55Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0UXVhbnQgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVRdWFudChlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjAuMDFcIiBzdGVwPVwiMC4wMVwiIHBsYWNlaG9sZGVyPVwiY29zdC4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0Q29zdCB8fCAnJ30gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZUNvc3QoZSl9IC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIk11c3QgQnV5IVwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuXG5cbn0iXX0=