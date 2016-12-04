'use strict';

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
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      if (this.state.submitName === '' || this.state.submitName === undefined) {
        e.preventDefault();
        console.log('did not submit');
      } else {
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
    }
  }, {
    key: 'updateName',
    value: function updateName(e) {
      this.setState({
        submitName: e.target.value
      });
    }
  }, {
    key: 'updateQuant',
    value: function updateQuant(e) {
      this.setState({
        submitQuant: parseInt(e.target.value)
      });
    }
  }, {
    key: 'updateCost',
    value: function updateCost(e) {
      this.setState({
        submitCost: parseFloat(e.target.value)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'add-todo-container' },
        React.createElement(
          'form',
          { className: 'add-todo', onSubmit: this.handleSubmit.bind(this) },
          React.createElement('input', { className: 'add-todo-form-input', type: 'text', placeholder: 'Task', value: this.state.submitName || '', onChange: function onChange(e) {
              return _this2.updateName(e);
            } }),
          React.createElement('input', { className: 'add-todo-form-button', type: 'submit', value: 'Add' })
        )
      );
    }
  }]);

  return TodoForm;
}(React.Component);

// removed from above when decision to get rid of cost and quant was made - code exists incase revert
// <input type="number" min="1" placeholder="howmany..." value={this.state.submitQuant || ''} onChange={(e) => this.updateQuant(e)} />
// <input type="number" min="0.01" step="0.01" placeholder="cost.." value={this.state.submitCost || ''} onChange={(e) => this.updateCost(e)} />
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvRm9ybS5qc3giXSwibmFtZXMiOlsiVG9kb0Zvcm0iLCJwcm9wcyIsInN0YXRlIiwiZSIsInN1Ym1pdE5hbWUiLCJ1bmRlZmluZWQiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJ0aW1lIiwiRGF0ZSIsInByZXBhcmVkU3VibWl0IiwiaXRlbW5hbWUiLCJxdWFudGl0eSIsInN1Ym1pdFF1YW50IiwibGlzdGlkIiwiaXRlbV9jcmVhdGVfdXNlcmlkIiwidXNlcmlkIiwiY29zdCIsInN1Ym1pdENvc3QiLCJjcmVhdGVkX2F0IiwidXBkYXRlZF9hdCIsImFkZEl0ZW0iLCJzZXRTdGF0ZSIsInRhcmdldCIsInZhbHVlIiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0IiwiaGFuZGxlU3VibWl0IiwiYmluZCIsInVwZGF0ZU5hbWUiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxROzs7QUFDSixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLG9IQUNYQSxLQURXOztBQUdqQixVQUFLQyxLQUFMLEdBQWE7QUFDWDtBQUNBO0FBQ0E7QUFIVyxLQUFiO0FBSGlCO0FBUWxCOzs7O2lDQUVZQyxDLEVBQUc7QUFDZCxVQUFJLEtBQUtELEtBQUwsQ0FBV0UsVUFBWCxLQUEwQixFQUExQixJQUFnQyxLQUFLRixLQUFMLENBQVdFLFVBQVgsS0FBMEJDLFNBQTlELEVBQXlFO0FBQ3ZFRixVQUFFRyxjQUFGO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDRCxPQUhELE1BR087QUFDTEwsVUFBRUcsY0FBRjtBQUNBLFlBQUlHLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0EsWUFBSUMsaUJBQWlCO0FBQ25CQyxvQkFBVSxLQUFLVixLQUFMLENBQVdFLFVBREY7QUFFbkJTLG9CQUFVLEtBQUtYLEtBQUwsQ0FBV1ksV0FGRjtBQUduQkMsa0JBQVEsS0FBS2QsS0FBTCxDQUFXYyxNQUhBO0FBSW5CQyw4QkFBb0IsS0FBS2YsS0FBTCxDQUFXZ0IsTUFKWjtBQUtuQkMsZ0JBQU0sS0FBS2hCLEtBQUwsQ0FBV2lCLFVBTEU7QUFNbkJDLHNCQUFZLElBQUlWLElBQUosRUFOTztBQU9uQlcsc0JBQVksSUFBSVgsSUFBSjtBQVBPLFNBQXJCO0FBU0EsYUFBS1QsS0FBTCxDQUFXcUIsT0FBWCxDQUFtQlgsY0FBbkI7QUFDQSxhQUFLWSxRQUFMLENBQWM7QUFDWjtBQUNBbkIsc0JBQVksRUFGQTtBQUdaVSx1QkFBYSxDQUhEO0FBSVpLLHNCQUFZO0FBSkEsU0FBZDtBQU1EO0FBQ0Y7OzsrQkFFVWhCLEMsRUFBRztBQUNaLFdBQUtvQixRQUFMLENBQWM7QUFDWm5CLG9CQUFZRCxFQUFFcUIsTUFBRixDQUFTQztBQURULE9BQWQ7QUFHRDs7O2dDQUVXdEIsQyxFQUFHO0FBQ2IsV0FBS29CLFFBQUwsQ0FBYztBQUNaVCxxQkFBYVksU0FBU3ZCLEVBQUVxQixNQUFGLENBQVNDLEtBQWxCO0FBREQsT0FBZDtBQUdEOzs7K0JBRVV0QixDLEVBQUc7QUFDWixXQUFLb0IsUUFBTCxDQUFjO0FBQ1pKLG9CQUFZUSxXQUFXeEIsRUFBRXFCLE1BQUYsQ0FBU0MsS0FBcEI7QUFEQSxPQUFkO0FBR0Q7Ozs2QkFJUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxvQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFNLFdBQVUsVUFBaEIsRUFBMkIsVUFBVSxLQUFLRyxZQUFMLENBQWtCQyxJQUFsQixDQUF1QixJQUF2QixDQUFyQztBQUNFLHlDQUFPLFdBQVUscUJBQWpCLEVBQXVDLE1BQUssTUFBNUMsRUFBbUQsYUFBWSxNQUEvRCxFQUFzRSxPQUFPLEtBQUszQixLQUFMLENBQVdFLFVBQVgsSUFBeUIsRUFBdEcsRUFBMEcsVUFBVSxrQkFBQ0QsQ0FBRDtBQUFBLHFCQUFPLE9BQUsyQixVQUFMLENBQWdCM0IsQ0FBaEIsQ0FBUDtBQUFBLGFBQXBILEdBREY7QUFFRSx5Q0FBTyxXQUFVLHNCQUFqQixFQUF3QyxNQUFLLFFBQTdDLEVBQXNELE9BQU0sS0FBNUQ7QUFGRjtBQURGLE9BREY7QUFRRDs7OztFQWxFb0I0QixNQUFNQyxTOztBQXVFN0I7QUFDVTtBQUNBIiwiZmlsZSI6IlRvZG9Gb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kb0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAvLyBsaXN0aWQ6IDFcbiAgICAgIC8vIHN1Ym1pdFF1YW50OiAxLFxuICAgICAgLy8gc3VibWl0Q29zdDogMS45OSxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5zdWJtaXROYW1lID09PSAnJyB8fCB0aGlzLnN0YXRlLnN1Ym1pdE5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc29sZS5sb2coJ2RpZCBub3Qgc3VibWl0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciB0aW1lID0gbmV3IERhdGUoKTtcbiAgICAgIHZhciBwcmVwYXJlZFN1Ym1pdCA9IHtcbiAgICAgICAgaXRlbW5hbWU6IHRoaXMuc3RhdGUuc3VibWl0TmFtZSxcbiAgICAgICAgcXVhbnRpdHk6IHRoaXMuc3RhdGUuc3VibWl0UXVhbnQsXG4gICAgICAgIGxpc3RpZDogdGhpcy5wcm9wcy5saXN0aWQsXG4gICAgICAgIGl0ZW1fY3JlYXRlX3VzZXJpZDogdGhpcy5wcm9wcy51c2VyaWQsXG4gICAgICAgIGNvc3Q6IHRoaXMuc3RhdGUuc3VibWl0Q29zdCxcbiAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoKSxcbiAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoKVxuICAgICAgfTtcbiAgICAgIHRoaXMucHJvcHMuYWRkSXRlbShwcmVwYXJlZFN1Ym1pdCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgLy8gd291bGQgYmUgY29vbCB0byBoYXZlIHJhbmRvbWl6ZXIgZm9yIHRoZSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICBzdWJtaXROYW1lOiAnJyxcbiAgICAgICAgc3VibWl0UXVhbnQ6IDAsXG4gICAgICAgIHN1Ym1pdENvc3Q6IDBcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TmFtZTogZS50YXJnZXQudmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVF1YW50KGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdFF1YW50OiBwYXJzZUludChlLnRhcmdldC52YWx1ZSlcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUNvc3QoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0Q29zdDogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSlcbiAgICB9KTtcbiAgfVxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkLXRvZG8tY29udGFpbmVyXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImFkZC10b2RvXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJhZGQtdG9kby1mb3JtLWlucHV0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlRhc2tcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXROYW1lIHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlTmFtZShlKX0gLz5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYWRkLXRvZG8tZm9ybS1idXR0b25cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJBZGRcIiAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cblxufVxuXG4vLyByZW1vdmVkIGZyb20gYWJvdmUgd2hlbiBkZWNpc2lvbiB0byBnZXQgcmlkIG9mIGNvc3QgYW5kIHF1YW50IHdhcyBtYWRlIC0gY29kZSBleGlzdHMgaW5jYXNlIHJldmVydFxuICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIHBsYWNlaG9sZGVyPVwiaG93bWFueS4uLlwiIHZhbHVlPXt0aGlzLnN0YXRlLnN1Ym1pdFF1YW50IHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlUXVhbnQoZSl9IC8+XG4gICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwLjAxXCIgc3RlcD1cIjAuMDFcIiBwbGFjZWhvbGRlcj1cImNvc3QuLlwiIHZhbHVlPXt0aGlzLnN0YXRlLnN1Ym1pdENvc3QgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVDb3N0KGUpfSAvPiJdfQ==