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
          { className: 'new-list-title' },
          'Create New list'
        ),
        React.createElement(
          'div',
          { className: 'new-list-body' },
          'Give your new list a name.'
        ),
        React.createElement(
          'div',
          null,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OZXdMaXN0LmpzeCJdLCJuYW1lcyI6WyJOZXdMaXN0IiwicHJvcHMiLCJzdGF0ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRpbWUiLCJEYXRlIiwicHJlcGFyZWRTdWJtaXQiLCJsaXN0bmFtZSIsInN1Ym1pdExpc3ROYW1lIiwiY3JlYXRlX3VzZXJpZCIsInVzZXJpZCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwiYWRkTGlzdCIsInNldFN0YXRlIiwic3VibWl0UXVhbnQiLCJzdWJtaXRDb3N0IiwiaGlkZU5ld0xpc3QiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsImNyZWF0ZURpc3BsYXllZCIsImhhbmRsZVN1Ym1pdCIsImJpbmQiLCJ1cGRhdGVMaXN0TmFtZSIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLE87OztBQUVKLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsa0hBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBSGlCO0FBSWxCOzs7O2lDQUVZQyxDLEVBQUc7QUFDZEEsUUFBRUMsY0FBRjtBQUNBLFVBQUlDLE9BQU8sSUFBSUMsSUFBSixFQUFYO0FBQ0EsVUFBSUMsaUJBQWlCO0FBQ25CQyxrQkFBVSxLQUFLTixLQUFMLENBQVdPLGNBREY7QUFFbkI7QUFDQUMsdUJBQWUsS0FBS1QsS0FBTCxDQUFXVSxNQUhQO0FBSW5CQyxvQkFBWSxJQUFJTixJQUFKLEVBSk87QUFLbkJPLG9CQUFZLElBQUlQLElBQUo7QUFMTyxPQUFyQjtBQU9BO0FBQ0EsV0FBS0wsS0FBTCxDQUFXYSxPQUFYLENBQW1CUCxjQUFuQjtBQUNBLFdBQUtRLFFBQUwsQ0FBYztBQUNaTix3QkFBZ0IsRUFESjtBQUVaTyxxQkFBYSxDQUZEO0FBR1pDLG9CQUFZO0FBSEEsT0FBZDtBQUtBLFdBQUtDLFdBQUw7QUFDRDs7O21DQUVjZixDLEVBQUc7QUFDaEIsV0FBS1ksUUFBTCxDQUFjO0FBQ1pOLHdCQUFnQk4sRUFBRWdCLE1BQUYsQ0FBU0M7QUFEYixPQUFkO0FBR0Q7OztrQ0FFYTtBQUNaLFdBQUtuQixLQUFMLENBQVdpQixXQUFYO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUlHLFFBQVE7QUFDVkMsaUJBQVMsS0FBS3JCLEtBQUwsQ0FBV3NCO0FBRFYsT0FBWjtBQUdBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZixFQUFpQyxPQUFPRixLQUF4QztBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsV0FBZixFQUEyQixTQUFTLGlCQUFDbEIsQ0FBRDtBQUFBLHFCQUFPLE9BQUtlLFdBQUwsRUFBUDtBQUFBLGFBQXBDO0FBQUE7QUFBQSxTQURGO0FBSUU7QUFBQTtBQUFBLFlBQUssV0FBVSxnQkFBZjtBQUFBO0FBQUEsU0FKRjtBQU9FO0FBQUE7QUFBQSxZQUFLLFdBQVUsZUFBZjtBQUFBO0FBQUEsU0FQRjtBQVFFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFNLFdBQVUsVUFBaEIsRUFBMkIsVUFBVSxLQUFLTSxZQUFMLENBQWtCQyxJQUFsQixDQUF1QixJQUF2QixDQUFyQztBQUNFLDJDQUFPLFdBQVUscUJBQWpCLEVBQXVDLE1BQUssTUFBNUMsRUFBbUQsYUFBWSxXQUEvRCxFQUEyRSxPQUFPLEtBQUt2QixLQUFMLENBQVdPLGNBQVgsSUFBNkIsRUFBL0csRUFBbUgsVUFBVSxrQkFBQ04sQ0FBRDtBQUFBLHVCQUFPLE9BQUt1QixjQUFMLENBQW9CdkIsQ0FBcEIsQ0FBUDtBQUFBLGVBQTdILEdBREY7QUFFRSwyQ0FBTyxXQUFVLHNCQUFqQixFQUF3QyxNQUFLLFFBQTdDLEVBQXNELE9BQU0sUUFBNUQ7QUFGRjtBQURGO0FBUkYsT0FERjtBQWlCRDs7OztFQTNEbUJ3QixNQUFNQyxTIiwiZmlsZSI6Ik5ld0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBOZXdMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB0aW1lID0gbmV3IERhdGUoKTtcbiAgICB2YXIgcHJlcGFyZWRTdWJtaXQgPSB7XG4gICAgICBsaXN0bmFtZTogdGhpcy5zdGF0ZS5zdWJtaXRMaXN0TmFtZSxcbiAgICAgIC8vIGxpbnRpbmcgZXJyb3Igc2luY2Ugd2UgYXJlIHBhc3NpbmcgZGlyZWN0bHkgdG8gZGJcbiAgICAgIGNyZWF0ZV91c2VyaWQ6IHRoaXMucHJvcHMudXNlcmlkLFxuICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoKSxcbiAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKClcbiAgICB9O1xuICAgIC8vIGNvbnNvbGUubG9nKHByZXBhcmVkU3VibWl0KVxuICAgIHRoaXMucHJvcHMuYWRkTGlzdChwcmVwYXJlZFN1Ym1pdCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXRMaXN0TmFtZTogJycsXG4gICAgICBzdWJtaXRRdWFudDogMSxcbiAgICAgIHN1Ym1pdENvc3Q6IDFcbiAgICB9KTtcbiAgICB0aGlzLmhpZGVOZXdMaXN0KCk7XG4gIH1cblxuICB1cGRhdGVMaXN0TmFtZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdWJtaXRMaXN0TmFtZTogZS50YXJnZXQudmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIGhpZGVOZXdMaXN0KCkge1xuICAgIHRoaXMucHJvcHMuaGlkZU5ld0xpc3QoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiB0aGlzLnByb3BzLmNyZWF0ZURpc3BsYXllZFxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdWJtaXQtbmV3LWxpc3QnIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0b3AtY2xvc2UnIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhpZGVOZXdMaXN0KCl9PlxuICAgICAgICAgIGNsb3NlXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmV3LWxpc3QtdGl0bGUnPlxuICAgICAgICAgIENyZWF0ZSBOZXcgbGlzdFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J25ldy1saXN0LWJvZHknPkdpdmUgeW91ciBuZXcgbGlzdCBhIG5hbWUuPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwibmV3LWxpc3RcIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwibmV3LWxpc3QtZm9ybS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJMaXN0IG5hbWVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zdWJtaXRMaXN0TmFtZSB8fCAnJ30gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZUxpc3ROYW1lKGUpfSAvPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cIm5ldy1saXN0LWZvcm0tYnV0dG9uXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiQ3JlYXRlXCIgLz5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSJdfQ==