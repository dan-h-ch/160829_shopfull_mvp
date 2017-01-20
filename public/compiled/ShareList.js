'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShareList = function (_React$Component) {
  _inherits(ShareList, _React$Component);

  function ShareList(props) {
    _classCallCheck(this, ShareList);

    var _this = _possibleConstructorReturn(this, (ShareList.__proto__ || Object.getPrototypeOf(ShareList)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ShareList, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var preparedSubmit = {
        listid: this.props.listid,
        // linting error since we are passing directly to db
        email_phone: this.state.share_email_phone
      };
      // console.log(preparedSubmit)
      this.props.shareList(preparedSubmit);
      this.setState({
        share_email_phone: ''
      });
      this.hideShareList();
    }
  }, {
    key: 'hideShareList',
    value: function hideShareList() {
      this.props.hideShareList();
    }
  }, {
    key: 'updateShareUsername',
    value: function updateShareUsername(e) {
      this.setState({
        share_email_phone: e.target.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        display: this.props.shareDisplayed
      };
      return React.createElement(
        'div',
        { className: 'submit-new-list', style: style },
        React.createElement(
          'div',
          { className: 'top-close', onClick: function onClick(e) {
              return _this2.hideShareList();
            } },
          'close'
        ),
        React.createElement(
          'div',
          { className: 'share-title' },
          'Share ',
          React.createElement(
            'u',
            null,
            this.props.listname
          )
        ),
        React.createElement(
          'div',
          { className: 'share-body' },
          'Enter an email or phone number to share with'
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'form',
            { className: 'share-list', onSubmit: this.handleSubmit.bind(this) },
            React.createElement('input', { className: 'share-list-form-input', type: 'text', placeholder: 'email or phone number', value: this.state.share_email_phone || '', onChange: function onChange(e) {
                return _this2.updateShareUsername(e);
              } }),
            React.createElement('input', { className: 'share-list-form-button', type: 'submit', value: 'Share!' })
          )
        )
      );
    }
  }]);

  return ShareList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9TaGFyZUxpc3QuanN4Il0sIm5hbWVzIjpbIlNoYXJlTGlzdCIsInByb3BzIiwic3RhdGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmVwYXJlZFN1Ym1pdCIsImxpc3RpZCIsImVtYWlsX3Bob25lIiwic2hhcmVfZW1haWxfcGhvbmUiLCJzaGFyZUxpc3QiLCJzZXRTdGF0ZSIsImhpZGVTaGFyZUxpc3QiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsInNoYXJlRGlzcGxheWVkIiwibGlzdG5hbWUiLCJoYW5kbGVTdWJtaXQiLCJiaW5kIiwidXBkYXRlU2hhcmVVc2VybmFtZSIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLFM7OztBQUVKLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBSGlCO0FBSWxCOzs7O2lDQUVZQyxDLEVBQUc7QUFDZEEsUUFBRUMsY0FBRjtBQUNBLFVBQUlDLGlCQUFpQjtBQUNuQkMsZ0JBQVEsS0FBS0wsS0FBTCxDQUFXSyxNQURBO0FBRW5CO0FBQ0FDLHFCQUFhLEtBQUtMLEtBQUwsQ0FBV007QUFITCxPQUFyQjtBQUtBO0FBQ0EsV0FBS1AsS0FBTCxDQUFXUSxTQUFYLENBQXFCSixjQUFyQjtBQUNBLFdBQUtLLFFBQUwsQ0FBYztBQUNaRiwyQkFBbUI7QUFEUCxPQUFkO0FBR0EsV0FBS0csYUFBTDtBQUNEOzs7b0NBRWU7QUFDZCxXQUFLVixLQUFMLENBQVdVLGFBQVg7QUFDRDs7O3dDQUVtQlIsQyxFQUFHO0FBQ3JCLFdBQUtPLFFBQUwsQ0FBYztBQUNaRiwyQkFBbUJMLEVBQUVTLE1BQUYsQ0FBU0M7QUFEaEIsT0FBZDtBQUdEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFJQyxRQUFRO0FBQ1ZDLGlCQUFTLEtBQUtkLEtBQUwsQ0FBV2U7QUFEVixPQUFaO0FBR0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmLEVBQWlDLE9BQU9GLEtBQXhDO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxXQUFmLEVBQTJCLFNBQVMsaUJBQUNYLENBQUQ7QUFBQSxxQkFBTyxPQUFLUSxhQUFMLEVBQVA7QUFBQSxhQUFwQztBQUFBO0FBQUEsU0FERjtBQUlFO0FBQUE7QUFBQSxZQUFLLFdBQVUsYUFBZjtBQUFBO0FBQW1DO0FBQUE7QUFBQTtBQUFJLGlCQUFLVixLQUFMLENBQVdnQjtBQUFmO0FBQW5DLFNBSkY7QUFLRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFlBQWY7QUFBQTtBQUFBLFNBTEY7QUFNRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBS0MsWUFBTCxDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkM7QUFDRSwyQ0FBTyxXQUFVLHVCQUFqQixFQUF5QyxNQUFLLE1BQTlDLEVBQXFELGFBQVksdUJBQWpFLEVBQXlGLE9BQU8sS0FBS2pCLEtBQUwsQ0FBV00saUJBQVgsSUFBZ0MsRUFBaEksRUFBb0ksVUFBVSxrQkFBQ0wsQ0FBRDtBQUFBLHVCQUFPLE9BQUtpQixtQkFBTCxDQUF5QmpCLENBQXpCLENBQVA7QUFBQSxlQUE5SSxHQURGO0FBRUUsMkNBQU8sV0FBVSx3QkFBakIsRUFBMEMsTUFBSyxRQUEvQyxFQUF3RCxPQUFNLFFBQTlEO0FBRkY7QUFERjtBQU5GLE9BREY7QUFlRDs7OztFQXBEcUJrQixNQUFNQyxTIiwiZmlsZSI6IlNoYXJlTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNoYXJlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgcHJlcGFyZWRTdWJtaXQgPSB7XG4gICAgICBsaXN0aWQ6IHRoaXMucHJvcHMubGlzdGlkLFxuICAgICAgLy8gbGludGluZyBlcnJvciBzaW5jZSB3ZSBhcmUgcGFzc2luZyBkaXJlY3RseSB0byBkYlxuICAgICAgZW1haWxfcGhvbmU6IHRoaXMuc3RhdGUuc2hhcmVfZW1haWxfcGhvbmVcbiAgICB9O1xuICAgIC8vIGNvbnNvbGUubG9nKHByZXBhcmVkU3VibWl0KVxuICAgIHRoaXMucHJvcHMuc2hhcmVMaXN0KHByZXBhcmVkU3VibWl0KTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNoYXJlX2VtYWlsX3Bob25lOiAnJyxcbiAgICB9KTtcbiAgICB0aGlzLmhpZGVTaGFyZUxpc3QoKTtcbiAgfVxuXG4gIGhpZGVTaGFyZUxpc3QoKSB7XG4gICAgdGhpcy5wcm9wcy5oaWRlU2hhcmVMaXN0KCk7XG4gIH1cblxuICB1cGRhdGVTaGFyZVVzZXJuYW1lKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNoYXJlX2VtYWlsX3Bob25lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IHRoaXMucHJvcHMuc2hhcmVEaXNwbGF5ZWRcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nc3VibWl0LW5ldy1saXN0JyBzdHlsZT17c3R5bGV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndG9wLWNsb3NlJyBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oaWRlU2hhcmVMaXN0KCl9PlxuICAgICAgICAgIGNsb3NlXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2hhcmUtdGl0bGUnPlNoYXJlIDx1Pnt0aGlzLnByb3BzLmxpc3RuYW1lfTwvdT48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NoYXJlLWJvZHknPkVudGVyIGFuIGVtYWlsIG9yIHBob25lIG51bWJlciB0byBzaGFyZSB3aXRoPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2hhcmUtbGlzdFwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJzaGFyZS1saXN0LWZvcm0taW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiZW1haWwgb3IgcGhvbmUgbnVtYmVyXCIgdmFsdWU9e3RoaXMuc3RhdGUuc2hhcmVfZW1haWxfcGhvbmUgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVTaGFyZVVzZXJuYW1lKGUpfSAvPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInNoYXJlLWxpc3QtZm9ybS1idXR0b25cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTaGFyZSFcIiAvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19