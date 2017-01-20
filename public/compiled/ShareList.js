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
          null,
          'Share This List'
        ),
        React.createElement(
          'div',
          null,
          'Enter username to share with'
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'form',
            { className: 'share-list', onSubmit: this.handleSubmit.bind(this) },
            React.createElement('input', { className: 'share-list-form-input', type: 'text', placeholder: 'username', value: this.state.share_email_phone || '', onChange: function onChange(e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9TaGFyZUxpc3QuanN4Il0sIm5hbWVzIjpbIlNoYXJlTGlzdCIsInByb3BzIiwic3RhdGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmVwYXJlZFN1Ym1pdCIsImxpc3RpZCIsImVtYWlsX3Bob25lIiwic2hhcmVfZW1haWxfcGhvbmUiLCJzaGFyZUxpc3QiLCJzZXRTdGF0ZSIsImhpZGVTaGFyZUxpc3QiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsInNoYXJlRGlzcGxheWVkIiwiaGFuZGxlU3VibWl0IiwiYmluZCIsInVwZGF0ZVNoYXJlVXNlcm5hbWUiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxTOzs7QUFFSixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHNIQUNYQSxLQURXOztBQUdqQixVQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztpQ0FFWUMsQyxFQUFHO0FBQ2RBLFFBQUVDLGNBQUY7QUFDQSxVQUFJQyxpQkFBaUI7QUFDbkJDLGdCQUFRLEtBQUtMLEtBQUwsQ0FBV0ssTUFEQTtBQUVuQjtBQUNBQyxxQkFBYSxLQUFLTCxLQUFMLENBQVdNO0FBSEwsT0FBckI7QUFLQTtBQUNBLFdBQUtQLEtBQUwsQ0FBV1EsU0FBWCxDQUFxQkosY0FBckI7QUFDQSxXQUFLSyxRQUFMLENBQWM7QUFDWkYsMkJBQW1CO0FBRFAsT0FBZDtBQUdBLFdBQUtHLGFBQUw7QUFDRDs7O29DQUVlO0FBQ2QsV0FBS1YsS0FBTCxDQUFXVSxhQUFYO0FBQ0Q7Ozt3Q0FFbUJSLEMsRUFBRztBQUNyQixXQUFLTyxRQUFMLENBQWM7QUFDWkYsMkJBQW1CTCxFQUFFUyxNQUFGLENBQVNDO0FBRGhCLE9BQWQ7QUFHRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSUMsUUFBUTtBQUNWQyxpQkFBUyxLQUFLZCxLQUFMLENBQVdlO0FBRFYsT0FBWjtBQUdBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZixFQUFpQyxPQUFPRixLQUF4QztBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsV0FBZixFQUEyQixTQUFTLGlCQUFDWCxDQUFEO0FBQUEscUJBQU8sT0FBS1EsYUFBTCxFQUFQO0FBQUEsYUFBcEM7QUFBQTtBQUFBLFNBREY7QUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSkY7QUFLRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBTEY7QUFNRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBS00sWUFBTCxDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkM7QUFDRSwyQ0FBTyxXQUFVLHVCQUFqQixFQUF5QyxNQUFLLE1BQTlDLEVBQXFELGFBQVksVUFBakUsRUFBNEUsT0FBTyxLQUFLaEIsS0FBTCxDQUFXTSxpQkFBWCxJQUFnQyxFQUFuSCxFQUF1SCxVQUFVLGtCQUFDTCxDQUFEO0FBQUEsdUJBQU8sT0FBS2dCLG1CQUFMLENBQXlCaEIsQ0FBekIsQ0FBUDtBQUFBLGVBQWpJLEdBREY7QUFFRSwyQ0FBTyxXQUFVLHdCQUFqQixFQUEwQyxNQUFLLFFBQS9DLEVBQXdELE9BQU0sUUFBOUQ7QUFGRjtBQURGO0FBTkYsT0FERjtBQWVEOzs7O0VBcERxQmlCLE1BQU1DLFMiLCJmaWxlIjoiU2hhcmVMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2hhcmVMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBwcmVwYXJlZFN1Ym1pdCA9IHtcbiAgICAgIGxpc3RpZDogdGhpcy5wcm9wcy5saXN0aWQsXG4gICAgICAvLyBsaW50aW5nIGVycm9yIHNpbmNlIHdlIGFyZSBwYXNzaW5nIGRpcmVjdGx5IHRvIGRiXG4gICAgICBlbWFpbF9waG9uZTogdGhpcy5zdGF0ZS5zaGFyZV9lbWFpbF9waG9uZVxuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2cocHJlcGFyZWRTdWJtaXQpXG4gICAgdGhpcy5wcm9wcy5zaGFyZUxpc3QocHJlcGFyZWRTdWJtaXQpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hhcmVfZW1haWxfcGhvbmU6ICcnLFxuICAgIH0pO1xuICAgIHRoaXMuaGlkZVNoYXJlTGlzdCgpO1xuICB9XG5cbiAgaGlkZVNoYXJlTGlzdCgpIHtcbiAgICB0aGlzLnByb3BzLmhpZGVTaGFyZUxpc3QoKTtcbiAgfVxuXG4gIHVwZGF0ZVNoYXJlVXNlcm5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hhcmVfZW1haWxfcGhvbmU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5zaGFyZURpc3BsYXllZFxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdWJtaXQtbmV3LWxpc3QnIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0b3AtY2xvc2UnIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhpZGVTaGFyZUxpc3QoKX0+XG4gICAgICAgICAgY2xvc2VcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+U2hhcmUgVGhpcyBMaXN0PC9kaXY+XG4gICAgICAgIDxkaXY+RW50ZXIgdXNlcm5hbWUgdG8gc2hhcmUgd2l0aDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNoYXJlLWxpc3RcIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwic2hhcmUtbGlzdC1mb3JtLWlucHV0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInVzZXJuYW1lXCIgdmFsdWU9e3RoaXMuc3RhdGUuc2hhcmVfZW1haWxfcGhvbmUgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVTaGFyZVVzZXJuYW1lKGUpfSAvPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInNoYXJlLWxpc3QtZm9ybS1idXR0b25cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTaGFyZSFcIiAvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19