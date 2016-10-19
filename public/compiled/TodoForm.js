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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvRm9ybS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxvSEFDWCxLQURXOztBQUdqQixVQUFLLEtBQUwsR0FBYTtBQUNYO0FBQ0E7QUFDQTtBQUhXLEtBQWI7QUFIaUI7QUFRbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsVUFBSSxPQUFPLElBQUksSUFBSixFQUFYO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsVUFERjtBQUVuQixrQkFBVSxLQUFLLEtBQUwsQ0FBVyxXQUZGO0FBR25CLGdCQUFRLEtBQUssS0FBTCxDQUFXLE1BSEE7QUFJbkIsNEJBQW9CLEtBQUssS0FBTCxDQUFXLE1BSlo7QUFLbkIsY0FBTSxLQUFLLEtBQUwsQ0FBVyxVQUxFO0FBTW5CLG9CQUFZLElBQUksSUFBSixFQU5PO0FBT25CLG9CQUFZLElBQUksSUFBSjtBQVBPLE9BQXJCO0FBU0EsV0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixjQUFuQjtBQUNBLFdBQUssUUFBTCxDQUFjO0FBQ1o7QUFDQSxvQkFBWSxpQkFGQTtBQUdaLHFCQUFhLENBSEQ7QUFJWixvQkFBWTtBQUpBLE9BQWQ7QUFNRDs7OytCQUVVLEMsRUFBRztBQUNaLFdBQUssUUFBTCxDQUFjO0FBQ1osb0JBQVksRUFBRSxNQUFGLENBQVM7QUFEVCxPQUFkO0FBR0Q7OztnQ0FFVyxDLEVBQUc7QUFDYixXQUFLLFFBQUwsQ0FBYztBQUNaLHFCQUFhLFNBQVMsRUFBRSxNQUFGLENBQVMsS0FBbEI7QUFERCxPQUFkO0FBR0Q7OzsrQkFFVSxDLEVBQUc7QUFDWixXQUFLLFFBQUwsQ0FBYztBQUNaLG9CQUFZLFdBQVcsRUFBRSxNQUFGLENBQVMsS0FBcEI7QUFEQSxPQUFkO0FBR0Q7Ozs2QkFJUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxTQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQU0sV0FBVSxZQUFoQixFQUE2QixVQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUF2QztBQUNFLHlDQUFPLE1BQUssTUFBWixFQUFtQixhQUFZLHVCQUEvQixFQUF1RCxPQUFPLEtBQUssS0FBTCxDQUFXLFVBQVgsSUFBeUIsRUFBdkYsRUFBMkYsVUFBVSxrQkFBQyxDQUFEO0FBQUEscUJBQU8sT0FBSyxVQUFMLENBQWdCLENBQWhCLENBQVA7QUFBQSxhQUFyRyxHQURGO0FBRUUseUNBQU8sTUFBSyxRQUFaLEVBQXFCLEtBQUksR0FBekIsRUFBNkIsYUFBWSxZQUF6QyxFQUFzRCxPQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsSUFBMEIsRUFBdkYsRUFBMkYsVUFBVSxrQkFBQyxDQUFEO0FBQUEscUJBQU8sT0FBSyxXQUFMLENBQWlCLENBQWpCLENBQVA7QUFBQSxhQUFyRyxHQUZGO0FBR0UseUNBQU8sTUFBSyxRQUFaLEVBQXFCLEtBQUksTUFBekIsRUFBZ0MsTUFBSyxNQUFyQyxFQUE0QyxhQUFZLFFBQXhELEVBQWlFLE9BQU8sS0FBSyxLQUFMLENBQVcsVUFBWCxJQUF5QixFQUFqRyxFQUFxRyxVQUFVLGtCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBUDtBQUFBLGFBQS9HLEdBSEY7QUFJRSx5Q0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxXQUEzQjtBQUpGO0FBREYsT0FERjtBQVVEOzs7O0VBL0RvQixNQUFNLFMiLCJmaWxlIjoiVG9kb0Zvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gbGlzdGlkOiAxXG4gICAgICAvLyBzdWJtaXRRdWFudDogMSxcbiAgICAgIC8vIHN1Ym1pdENvc3Q6IDEuOTksXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB2YXIgdGltZSA9IG5ldyBEYXRlKClcbiAgICB2YXIgcHJlcGFyZWRTdWJtaXQgPSB7XG4gICAgICBpdGVtbmFtZTogdGhpcy5zdGF0ZS5zdWJtaXROYW1lLFxuICAgICAgcXVhbnRpdHk6IHRoaXMuc3RhdGUuc3VibWl0UXVhbnQsXG4gICAgICBsaXN0aWQ6IHRoaXMucHJvcHMubGlzdGlkLFxuICAgICAgaXRlbV9jcmVhdGVfdXNlcmlkOiB0aGlzLnByb3BzLnVzZXJpZCxcbiAgICAgIGNvc3Q6IHRoaXMuc3RhdGUuc3VibWl0Q29zdCxcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZSgpXG4gICAgfVxuICAgIHRoaXMucHJvcHMuYWRkSXRlbShwcmVwYXJlZFN1Ym1pdClcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC8vIHdvdWxkIGJlIGNvb2wgdG8gaGF2ZSByYW5kb21pemVyIGZvciB0aGUgZGVmYXVsdCB2YWx1ZXNcbiAgICAgIHN1Ym1pdE5hbWU6IFwic29tZXRoaW5nIHNoaW55XCIsXG4gICAgICBzdWJtaXRRdWFudDogMSxcbiAgICAgIHN1Ym1pdENvc3Q6IDkuOTlcbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlTmFtZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXROYW1lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVRdWFudChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXRRdWFudDogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZUNvc3QoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0Q29zdDogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSlcbiAgICB9KVxuICB9XG5cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhZGR0b2RvXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInN1Ym1pdEZvcm1cIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJ3aGF0dG9idXl3aGF0dG9idXkuLi5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXROYW1lIHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlTmFtZShlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBwbGFjZWhvbGRlcj1cImhvd21hbnkuLi5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRRdWFudCB8fCAnJ30gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZVF1YW50KGUpfSAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMC4wMVwiIHN0ZXA9XCIwLjAxXCIgcGxhY2Vob2xkZXI9XCJjb3N0Li5cIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRDb3N0IHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlQ29zdChlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiTXVzdCBCdXkhXCIgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cblxuXG59Il19