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
        username: this.state.shareUsername
      };
      // console.log(preparedSubmit)
      this.props.shareList(preparedSubmit);
      this.setState({
        shareUsername: ''
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
        shareUsername: e.target.value
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
          null,
          'Share This List'
        ),
        React.createElement(
          'div',
          null,
          'props ',
          this.props.shareDisplayed
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
            { className: 'submitForm', onSubmit: this.handleSubmit.bind(this) },
            React.createElement('input', { type: 'text', placeholder: 'username', value: this.state.shareUsername || '', onChange: function onChange(e) {
                return _this2.updateShareUsername(e);
              } }),
            React.createElement('input', { type: 'submit', value: 'Share!' })
          )
        ),
        React.createElement(
          'div',
          { onClick: function onClick(e) {
              return _this2.hideShareList();
            } },
          'close'
        )
      );
    }
  }]);

  return ShareList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9TaGFyZUxpc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxTOzs7QUFFSixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7QUFDQSxVQUFJLGlCQUFpQjtBQUNuQixnQkFBUSxLQUFLLEtBQUwsQ0FBVyxNQURBO0FBRW5CO0FBQ0Esa0JBQVUsS0FBSyxLQUFMLENBQVc7QUFIRixPQUFyQjtBQUtBO0FBQ0EsV0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixjQUFyQjtBQUNBLFdBQUssUUFBTCxDQUFjO0FBQ1osdUJBQWU7QUFESCxPQUFkO0FBR0EsV0FBSyxhQUFMO0FBQ0Q7OztvQ0FFZTtBQUNkLFdBQUssS0FBTCxDQUFXLGFBQVg7QUFDRDs7O3dDQUVtQixDLEVBQUc7QUFDckIsV0FBSyxRQUFMLENBQWM7QUFDWix1QkFBZSxFQUFFLE1BQUYsQ0FBUztBQURaLE9BQWQ7QUFHRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSSxRQUFRO0FBQ1YsaUJBQVMsS0FBSyxLQUFMLENBQVc7QUFEVixPQUFaO0FBR0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmLEVBQWlDLE9BQU8sS0FBeEM7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFZLGVBQUssS0FBTCxDQUFXO0FBQXZCLFNBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSEY7QUFJRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXZDO0FBQ0UsMkNBQU8sTUFBSyxNQUFaLEVBQW1CLGFBQVksVUFBL0IsRUFBMEMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxhQUFYLElBQTRCLEVBQTdFLEVBQWlGLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHVCQUFPLE9BQUssbUJBQUwsQ0FBeUIsQ0FBekIsQ0FBUDtBQUFBLGVBQTNGLEdBREY7QUFFRSwyQ0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxRQUEzQjtBQUZGO0FBREYsU0FKRjtBQVVFO0FBQUE7QUFBQSxZQUFLLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssYUFBTCxFQUFQO0FBQUEsYUFBZDtBQUFBO0FBQUE7QUFWRixPQURGO0FBZ0JEOzs7O0VBckRxQixNQUFNLFMiLCJmaWxlIjoiU2hhcmVMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2hhcmVMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBwcmVwYXJlZFN1Ym1pdCA9IHtcbiAgICAgIGxpc3RpZDogdGhpcy5wcm9wcy5saXN0aWQsXG4gICAgICAvLyBsaW50aW5nIGVycm9yIHNpbmNlIHdlIGFyZSBwYXNzaW5nIGRpcmVjdGx5IHRvIGRiXG4gICAgICB1c2VybmFtZTogdGhpcy5zdGF0ZS5zaGFyZVVzZXJuYW1lXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcmVwYXJlZFN1Ym1pdClcbiAgICB0aGlzLnByb3BzLnNoYXJlTGlzdChwcmVwYXJlZFN1Ym1pdCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaGFyZVVzZXJuYW1lOiAnJyxcbiAgICB9KTtcbiAgICB0aGlzLmhpZGVTaGFyZUxpc3QoKTtcbiAgfVxuXG4gIGhpZGVTaGFyZUxpc3QoKSB7XG4gICAgdGhpcy5wcm9wcy5oaWRlU2hhcmVMaXN0KCk7XG4gIH1cblxuICB1cGRhdGVTaGFyZVVzZXJuYW1lKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNoYXJlVXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5zaGFyZURpc3BsYXllZFxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdzdWJtaXQtbmV3LWxpc3QnIHN0eWxlPXtzdHlsZX0+XG4gICAgICAgIDxkaXY+U2hhcmUgVGhpcyBMaXN0PC9kaXY+XG4gICAgICAgIDxkaXY+cHJvcHMge3RoaXMucHJvcHMuc2hhcmVEaXNwbGF5ZWR9PC9kaXY+XG4gICAgICAgIDxkaXY+RW50ZXIgdXNlcm5hbWUgdG8gc2hhcmUgd2l0aDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInN1Ym1pdEZvcm1cIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInVzZXJuYW1lXCIgdmFsdWU9e3RoaXMuc3RhdGUuc2hhcmVVc2VybmFtZSB8fCAnJ30gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZVNoYXJlVXNlcm5hbWUoZSl9IC8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2hhcmUhXCIgLz5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhpZGVTaGFyZUxpc3QoKX0+XG4gICAgICAgICAgY2xvc2VcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19