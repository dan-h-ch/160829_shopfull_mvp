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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9TaGFyZUxpc3QuanN4Il0sIm5hbWVzIjpbIlNoYXJlTGlzdCIsInByb3BzIiwic3RhdGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmVwYXJlZFN1Ym1pdCIsImxpc3RpZCIsInVzZXJuYW1lIiwic2hhcmVVc2VybmFtZSIsInNoYXJlTGlzdCIsInNldFN0YXRlIiwiaGlkZVNoYXJlTGlzdCIsInRhcmdldCIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2hhcmVEaXNwbGF5ZWQiLCJoYW5kbGVTdWJtaXQiLCJiaW5kIiwidXBkYXRlU2hhcmVVc2VybmFtZSIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLFM7OztBQUVKLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBSGlCO0FBSWxCOzs7O2lDQUVZQyxDLEVBQUc7QUFDZEEsUUFBRUMsY0FBRjtBQUNBLFVBQUlDLGlCQUFpQjtBQUNuQkMsZ0JBQVEsS0FBS0wsS0FBTCxDQUFXSyxNQURBO0FBRW5CO0FBQ0FDLGtCQUFVLEtBQUtMLEtBQUwsQ0FBV007QUFIRixPQUFyQjtBQUtBO0FBQ0EsV0FBS1AsS0FBTCxDQUFXUSxTQUFYLENBQXFCSixjQUFyQjtBQUNBLFdBQUtLLFFBQUwsQ0FBYztBQUNaRix1QkFBZTtBQURILE9BQWQ7QUFHQSxXQUFLRyxhQUFMO0FBQ0Q7OztvQ0FFZTtBQUNkLFdBQUtWLEtBQUwsQ0FBV1UsYUFBWDtBQUNEOzs7d0NBRW1CUixDLEVBQUc7QUFDckIsV0FBS08sUUFBTCxDQUFjO0FBQ1pGLHVCQUFlTCxFQUFFUyxNQUFGLENBQVNDO0FBRFosT0FBZDtBQUdEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFJQyxRQUFRO0FBQ1ZDLGlCQUFTLEtBQUtkLEtBQUwsQ0FBV2U7QUFEVixPQUFaO0FBR0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmLEVBQWlDLE9BQU9GLEtBQXhDO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBWSxlQUFLYixLQUFMLENBQVdlO0FBQXZCLFNBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSEY7QUFJRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBS0MsWUFBTCxDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkM7QUFDRSwyQ0FBTyxNQUFLLE1BQVosRUFBbUIsYUFBWSxVQUEvQixFQUEwQyxPQUFPLEtBQUtoQixLQUFMLENBQVdNLGFBQVgsSUFBNEIsRUFBN0UsRUFBaUYsVUFBVSxrQkFBQ0wsQ0FBRDtBQUFBLHVCQUFPLE9BQUtnQixtQkFBTCxDQUF5QmhCLENBQXpCLENBQVA7QUFBQSxlQUEzRixHQURGO0FBRUUsMkNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sUUFBM0I7QUFGRjtBQURGLFNBSkY7QUFVRTtBQUFBO0FBQUEsWUFBSyxTQUFTLGlCQUFDQSxDQUFEO0FBQUEscUJBQU8sT0FBS1EsYUFBTCxFQUFQO0FBQUEsYUFBZDtBQUFBO0FBQUE7QUFWRixPQURGO0FBZ0JEOzs7O0VBckRxQlMsTUFBTUMsUyIsImZpbGUiOiJTaGFyZUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTaGFyZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHByZXBhcmVkU3VibWl0ID0ge1xuICAgICAgbGlzdGlkOiB0aGlzLnByb3BzLmxpc3RpZCxcbiAgICAgIC8vIGxpbnRpbmcgZXJyb3Igc2luY2Ugd2UgYXJlIHBhc3NpbmcgZGlyZWN0bHkgdG8gZGJcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnN0YXRlLnNoYXJlVXNlcm5hbWVcbiAgICB9O1xuICAgIC8vIGNvbnNvbGUubG9nKHByZXBhcmVkU3VibWl0KVxuICAgIHRoaXMucHJvcHMuc2hhcmVMaXN0KHByZXBhcmVkU3VibWl0KTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNoYXJlVXNlcm5hbWU6ICcnLFxuICAgIH0pO1xuICAgIHRoaXMuaGlkZVNoYXJlTGlzdCgpO1xuICB9XG5cbiAgaGlkZVNoYXJlTGlzdCgpIHtcbiAgICB0aGlzLnByb3BzLmhpZGVTaGFyZUxpc3QoKTtcbiAgfVxuXG4gIHVwZGF0ZVNoYXJlVXNlcm5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hhcmVVc2VybmFtZTogZS50YXJnZXQudmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiB0aGlzLnByb3BzLnNoYXJlRGlzcGxheWVkXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3N1Ym1pdC1uZXctbGlzdCcgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgPGRpdj5TaGFyZSBUaGlzIExpc3Q8L2Rpdj5cbiAgICAgICAgPGRpdj5wcm9wcyB7dGhpcy5wcm9wcy5zaGFyZURpc3BsYXllZH08L2Rpdj5cbiAgICAgICAgPGRpdj5FbnRlciB1c2VybmFtZSB0byBzaGFyZSB3aXRoPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic3VibWl0Rm9ybVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwidXNlcm5hbWVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zaGFyZVVzZXJuYW1lIHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlU2hhcmVVc2VybmFtZShlKX0gLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTaGFyZSFcIiAvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgb25DbGljaz17KGUpID0+IHRoaXMuaGlkZVNoYXJlTGlzdCgpfT5cbiAgICAgICAgICBjbG9zZVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iXX0=