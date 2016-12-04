'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewList = function (_React$Component) {
  _inherits(NewList, _React$Component);

  function NewList(props) {
    _classCallCheck(this, NewList);

    var _this = _possibleConstructorReturn(this, (NewList.__proto__ || Object.getPrototypeOf(NewList)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(NewList, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var time = new Date();
      var preparedSubmit = {
        listname: this.state.submitListName,
        // linting error since we are passing directly to db
        create_userid: this.props.userid,
        created_at: new Date(),
        updated_at: new Date()
      };
      // console.log(preparedSubmit)
      this.props.addList(preparedSubmit);
      this.setState({
        submitListName: '',
        submitQuant: 1,
        submitCost: 1
      });
      this.hideNewList();
    }
  }, {
    key: 'updateListName',
    value: function updateListName(e) {
      this.setState({
        submitListName: e.target.value
      });
    }
  }, {
    key: 'hideNewList',
    value: function hideNewList() {
      this.props.hideNewList();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        display: this.props.createDisplayed
      };
      return React.createElement(
        'div',
        { className: 'submit-new-list', style: style },
        React.createElement(
          'div',
          { className: 'top-close', onClick: function onClick(e) {
              return _this2.hideNewList();
            } },
          'close'
        ),
        React.createElement(
          'div',
          { className: 'popup-body' },
          'Create a new list'
        ),
        React.createElement(
          'div',
          { className: 'popup-body' },
          React.createElement(
            'form',
            { className: 'new-list', onSubmit: this.handleSubmit.bind(this) },
            React.createElement('input', { className: 'new-list-form-input', type: 'text', placeholder: 'List name', value: this.state.submitListName || '', onChange: function onChange(e) {
                return _this2.updateListName(e);
              } }),
            React.createElement('input', { className: 'new-list-form-button', type: 'submit', value: 'Create' })
          )
        )
      );
    }
  }]);

  return NewList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OZXdMaXN0LmpzeCJdLCJuYW1lcyI6WyJOZXdMaXN0IiwicHJvcHMiLCJzdGF0ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRpbWUiLCJEYXRlIiwicHJlcGFyZWRTdWJtaXQiLCJsaXN0bmFtZSIsInN1Ym1pdExpc3ROYW1lIiwiY3JlYXRlX3VzZXJpZCIsInVzZXJpZCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwiYWRkTGlzdCIsInNldFN0YXRlIiwic3VibWl0UXVhbnQiLCJzdWJtaXRDb3N0IiwiaGlkZU5ld0xpc3QiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsImNyZWF0ZURpc3BsYXllZCIsImhhbmRsZVN1Ym1pdCIsImJpbmQiLCJ1cGRhdGVMaXN0TmFtZSIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLE87OztBQUVKLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsa0hBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBSGlCO0FBSWxCOzs7O2lDQUVZQyxDLEVBQUc7QUFDZEEsUUFBRUMsY0FBRjtBQUNBLFVBQUlDLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0EsVUFBSUMsaUJBQWlCO0FBQ25CQyxrQkFBVSxLQUFLTixLQUFMLENBQVdPLGNBREY7QUFFbkI7QUFDQUMsdUJBQWUsS0FBS1QsS0FBTCxDQUFXVSxNQUhQO0FBSW5CQyxvQkFBWSxJQUFJTixJQUFKLEVBSk87QUFLbkJPLG9CQUFZLElBQUlQLElBQUo7QUFMTyxPQUFyQjtBQU9BO0FBQ0EsV0FBS0wsS0FBTCxDQUFXYSxPQUFYLENBQW1CUCxjQUFuQjtBQUNBLFdBQUtRLFFBQUwsQ0FBYztBQUNaTix3QkFBZ0IsRUFESjtBQUVaTyxxQkFBYSxDQUZEO0FBR1pDLG9CQUFZO0FBSEEsT0FBZDtBQUtBLFdBQUtDLFdBQUw7QUFDRDs7O21DQUVjZixDLEVBQUc7QUFDaEIsV0FBS1ksUUFBTCxDQUFjO0FBQ1pOLHdCQUFnQk4sRUFBRWdCLE1BQUYsQ0FBU0M7QUFEYixPQUFkO0FBR0Q7OztrQ0FFYTtBQUNaLFdBQUtuQixLQUFMLENBQVdpQixXQUFYO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUlHLFFBQVE7QUFDVkMsaUJBQVMsS0FBS3JCLEtBQUwsQ0FBV3NCO0FBRFYsT0FBWjtBQUdBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZixFQUFpQyxPQUFPRixLQUF4QztBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsV0FBZixFQUEyQixTQUFTLGlCQUFDbEIsQ0FBRDtBQUFBLHFCQUFPLE9BQUtlLFdBQUwsRUFBUDtBQUFBLGFBQXBDO0FBQUE7QUFBQSxTQURGO0FBSUU7QUFBQTtBQUFBLFlBQUssV0FBVSxZQUFmO0FBQUE7QUFBQSxTQUpGO0FBT0U7QUFBQTtBQUFBLFlBQUssV0FBVSxZQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQU0sV0FBVSxVQUFoQixFQUEyQixVQUFVLEtBQUtNLFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCLElBQXZCLENBQXJDO0FBQ0UsMkNBQU8sV0FBVSxxQkFBakIsRUFBdUMsTUFBSyxNQUE1QyxFQUFtRCxhQUFZLFdBQS9ELEVBQTJFLE9BQU8sS0FBS3ZCLEtBQUwsQ0FBV08sY0FBWCxJQUE2QixFQUEvRyxFQUFtSCxVQUFVLGtCQUFDTixDQUFEO0FBQUEsdUJBQU8sT0FBS3VCLGNBQUwsQ0FBb0J2QixDQUFwQixDQUFQO0FBQUEsZUFBN0gsR0FERjtBQUVFLDJDQUFPLFdBQVUsc0JBQWpCLEVBQXdDLE1BQUssUUFBN0MsRUFBc0QsT0FBTSxRQUE1RDtBQUZGO0FBREY7QUFQRixPQURGO0FBZ0JEOzs7O0VBMURtQndCLE1BQU1DLFMiLCJmaWxlIjoiTmV3TGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5ld0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBwcmVwYXJlZFN1Ym1pdCA9IHtcbiAgICAgIGxpc3RuYW1lOiB0aGlzLnN0YXRlLnN1Ym1pdExpc3ROYW1lLFxuICAgICAgLy8gbGludGluZyBlcnJvciBzaW5jZSB3ZSBhcmUgcGFzc2luZyBkaXJlY3RseSB0byBkYlxuICAgICAgY3JlYXRlX3VzZXJpZDogdGhpcy5wcm9wcy51c2VyaWQsXG4gICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZSgpLFxuICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoKVxuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2cocHJlcGFyZWRTdWJtaXQpXG4gICAgdGhpcy5wcm9wcy5hZGRMaXN0KHByZXBhcmVkU3VibWl0KTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdExpc3ROYW1lOiAnJyxcbiAgICAgIHN1Ym1pdFF1YW50OiAxLFxuICAgICAgc3VibWl0Q29zdDogMVxuICAgIH0pO1xuICAgIHRoaXMuaGlkZU5ld0xpc3QoKTtcbiAgfVxuXG4gIHVwZGF0ZUxpc3ROYW1lKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdExpc3ROYW1lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgaGlkZU5ld0xpc3QoKSB7XG4gICAgdGhpcy5wcm9wcy5oaWRlTmV3TGlzdCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IHRoaXMucHJvcHMuY3JlYXRlRGlzcGxheWVkXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3N1Ym1pdC1uZXctbGlzdCcgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RvcC1jbG9zZScgb25DbGljaz17KGUpID0+IHRoaXMuaGlkZU5ld0xpc3QoKX0+XG4gICAgICAgICAgY2xvc2VcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwb3B1cC1ib2R5Jz5cbiAgICAgICAgICBDcmVhdGUgYSBuZXcgbGlzdFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BvcHVwLWJvZHknPlxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cIm5ldy1saXN0XCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cIm5ldy1saXN0LWZvcm0taW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTGlzdCBuYW1lXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0TGlzdE5hbWUgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVMaXN0TmFtZShlKX0gLz5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJuZXctbGlzdC1mb3JtLWJ1dHRvblwiIHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkNyZWF0ZVwiIC8+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iXX0=